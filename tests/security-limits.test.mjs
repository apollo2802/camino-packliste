import test from "node:test";
import assert from "node:assert/strict";
import app from "../dist/server/index.js";
import { sqliteEnvironment } from "./helpers/sqlite-environment.mjs";

function login(env, index, code = "wrong") {
  return app.fetch(new Request("https://example.test/login", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "cf-connecting-ip": `192.0.2.${index}`,
      "x-forwarded-for": `198.51.100.${index}, 10.0.0.1`,
      "x-real-ip": `203.0.113.${index}`
    },
    body: new URLSearchParams({ code })
  }), env);
}

function visit(env, index) {
  return app.fetch(new Request("https://example.test/api/public-visit", {
    method: "POST", headers: { origin: "https://example.test", "content-type": "application/json" },
    body: JSON.stringify({ visitorId: `00000000-0000-4000-8000-${String(index).padStart(12, "0")}` })
  }), env);
}

function freezeTime(t) {
  const OriginalDate = Date;
  let now = new OriginalDate("2026-09-30T10:00:00Z").getTime();
  globalThis.Date = class extends OriginalDate {
    constructor(...args) { super(...(args.length ? args : [now])); }
    static now() { return now; }
  };
  t.after(() => { globalThis.Date = OriginalDate; });
  return (milliseconds) => { now += milliseconds; };
}

test("rotating all forwarding headers cannot reset the shared login budget", async (t) => {
  freezeTime(t);
  const { env, connection } = sqliteEnvironment(t);
  for (let index = 1; index <= 20; index++) assert.equal((await login(env, index)).status, 401);
  assert.equal((await login(env, 21)).status, 429);
  assert.equal(connection.prepare("SELECT COUNT(*) AS n FROM login_attempts").get().n, 1);
});

test("parallel login guesses cannot overrun the shared budget", async (t) => {
  freezeTime(t);
  const { env } = sqliteEnvironment(t);
  const results = await Promise.all(Array.from({ length: 40 }, (_, index) => login(env, index + 1)));
  assert.equal(results.filter((response) => response.status === 401).length, 20);
  assert.equal(results.filter((response) => response.status === 429).length, 20);
});

test("login budget survives environment recreation and expires after fifteen minutes", async (t) => {
  const advance = freezeTime(t);
  const { env } = sqliteEnvironment(t);
  for (let index = 1; index <= 20; index++) await login(env, index);
  assert.equal((await login({ ...env }, 99, env.ACCESS_CODE)).status, 429);
  advance(900_000);
  const response = await login({ ...env }, 100, env.ACCESS_CODE);
  assert.equal(response.status, 303);
  assert.match(response.headers.get("set-cookie"), /HttpOnly.*Secure.*SameSite=Strict/);
});

test("a legitimate login clears the failure budget before another user signs in", async (t) => {
  const { env } = sqliteEnvironment(t);
  for (let index = 1; index <= 19; index++) await login(env, index);
  assert.equal((await login(env, 20, env.ACCESS_CODE)).status, 303);
  assert.equal((await login(env, 21, env.ACCESS_CODE)).status, 303);
});

test("malformed login bodies consume the same bounded budget", async (t) => {
  freezeTime(t);
  const { env } = sqliteEnvironment(t);
  for (let index = 1; index <= 20; index++) {
    const response = await app.fetch(new Request("https://example.test/login", {
      method: "POST", headers: { "content-type": "application/json", "cf-connecting-ip": String(index) }, body: "{}"
    }), env);
    assert.equal(response.status, 400);
  }
  assert.equal((await login(env, 21, env.ACCESS_CODE)).status, 429);
});

test("visitor write budget caps distinct IDs and recovers next minute", async (t) => {
  const advance = freezeTime(t);
  const { env, connection } = sqliteEnvironment(t);
  for (let index = 1; index <= 60; index++) assert.equal((await visit(env, index)).status, 200);
  assert.equal((await visit(env, 61)).status, 429);
  assert.equal(connection.prepare("SELECT COUNT(*) AS n FROM camino_visit_daily").get().n, 60);
  assert.equal((await visit({ ...env }, 62)).status, 429);
  advance(60_000);
  assert.equal((await visit(env, 63)).status, 200);
});

test("parallel visitor writes cannot exceed sixty accepted writes per minute", async (t) => {
  freezeTime(t);
  const { env, connection } = sqliteEnvironment(t);
  const results = await Promise.all(Array.from({ length: 100 }, (_, index) => visit(env, index + 1)));
  assert.equal(results.filter((response) => response.status === 200).length, 60);
  assert.equal(results.filter((response) => response.status === 429).length, 40);
  assert.equal(connection.prepare("SELECT COUNT(*) AS n FROM camino_visit_daily").get().n, 60);
});

test("visitor capacity preserves old rows and repeat views without admitting new daily keys", async (t) => {
  const advance = freezeTime(t);
  const { env, connection } = sqliteEnvironment(t);
  assert.equal((await visit(env, 1)).status, 200);
  connection.exec("BEGIN");
  const seed = connection.prepare("INSERT INTO camino_visit_daily (day, visitor_hash, page_views) VALUES ('2020-01-01', ?, 1)");
  for (let index = 1; index < 10_000; index++) seed.run(`historical-${index}`);
  connection.exec("COMMIT");
  assert.equal((await visit(env, 2)).status, 429);
  assert.equal((await visit(env, 1)).status, 200);
  assert.equal(connection.prepare("SELECT COUNT(*) AS n FROM camino_visit_daily").get().n, 10_000);
  assert.equal(connection.prepare("SELECT SUM(page_views) AS n FROM camino_visit_daily").get().n, 10_001);
  advance(86_400_000);
  assert.equal((await visit(env, 1)).status, 429, "a known visitor on a new day still needs a new row");
  assert.equal(connection.prepare("SELECT COUNT(*) AS n FROM camino_visit_daily").get().n, 10_000);
});

test("parallel requests at storage capacity admit only the final available row", async (t) => {
  freezeTime(t);
  const { env, connection } = sqliteEnvironment(t);
  await app.fetch(new Request("https://example.test/"), env);
  connection.exec("BEGIN");
  const seed = connection.prepare("INSERT INTO camino_visit_daily VALUES ('2020-01-01', ?, 1)");
  for (let index = 1; index < 10_000; index++) seed.run(`historical-${index}`);
  connection.exec("COMMIT");
  const results = await Promise.all([visit(env, 1), visit(env, 2), visit(env, 3)]);
  assert.equal(results.filter((response) => response.status === 200).length, 1);
  assert.equal(results.filter((response) => response.status === 429).length, 2);
  assert.equal(connection.prepare("SELECT COUNT(*) AS n FROM camino_visit_daily").get().n, 10_000);
});

test("repeat views also obey the rate limit and caller tokens cannot authorize a write", async (t) => {
  freezeTime(t);
  const { env, connection } = sqliteEnvironment(t);
  for (let index = 0; index < 60; index++) assert.equal((await visit(env, 1)).status, 200);
  assert.equal((await visit(env, 1)).status, 429);
  const forged = await app.fetch(new Request("https://example.test/api/public-visit", {
    method: "POST", headers: { origin: "https://example.test", "content-type": "application/json" },
    body: JSON.stringify({ visitorId: "00000000-0000-4000-8000-000000000002", token: "attacker" })
  }), env);
  assert.equal(forged.status, 400);
  assert.equal(connection.prepare("SELECT SUM(page_views) AS n FROM camino_visit_daily").get().n, 60);
});
