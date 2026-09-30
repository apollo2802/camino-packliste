import test from "node:test";
import assert from "node:assert/strict";
import app from "../dist/server/index.js";
import { sqliteEnvironment } from "./helpers/sqlite-environment.mjs";

const ACCESS_CODE = "test-access-code";
const SESSION_SECRET = "test-session-secret-that-is-long-enough";

function berlinDay(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Berlin", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(date);
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${value.year}-${value.month}-${value.day}`;
}

async function createEnvironment(t) {
  const result = sqliteEnvironment(t);
  await app.fetch(new Request("https://example.test/"), result.env);
  return result;
}

async function recordVisit(env, visitorId, origin = "https://example.test") {
  return app.fetch(new Request("https://example.test/api/public-visit", {
    method: "POST",
    headers: { origin, "content-type": "application/json" },
    body: JSON.stringify({ visitorId })
  }), env);
}

async function expectedVisitorHash(visitorId) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(SESSION_SECRET), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode("visitor:" + visitorId));
  return Array.from(new Uint8Array(signature), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function authenticatedStats(env) {
  const login = await app.fetch(new Request("https://example.test/login", {
    method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ code: ACCESS_CODE })
  }), env);
  const cookie = login.headers.get("set-cookie").split(";")[0];
  const response = await app.fetch(new Request("https://example.test/api/visitor-stats", { headers: { cookie } }), env);
  assert.equal(response.status, 200);
  return response.json();
}

test("repeat loads increment page views but keep one visitor", async (t) => {
  const { env } = await createEnvironment(t);
  assert.equal((await recordVisit(env, "11111111-1111-4111-8111-111111111111")).status, 200);
  assert.equal((await recordVisit(env, "11111111-1111-4111-8111-111111111111")).status, 200);
  const stats = await authenticatedStats(env);
  assert.deepEqual(stats.today, { visitors: 1, pageViews: 2 });
});

test("a second UUID creates a second visitor", async (t) => {
  const { env } = await createEnvironment(t);
  await recordVisit(env, "11111111-1111-4111-8111-111111111111");
  await recordVisit(env, "22222222-2222-4222-8222-222222222222");
  assert.deepEqual((await authenticatedStats(env)).today, { visitors: 2, pageViews: 2 });
});

test("malformed visitor ids return 400", async (t) => {
  const { env } = await createEnvironment(t);
  assert.equal((await recordVisit(env, "not-a-uuid")).status, 400);
});

test("cross-origin POST returns 403", async (t) => {
  const { env } = await createEnvironment(t);
  assert.equal((await recordVisit(env, "11111111-1111-4111-8111-111111111111", "https://evil.example")).status, 403);
});

test("rows older than the seven-day cutoff affect only total", async (t) => {
  const { env, connection } = await createEnvironment(t);
  connection.exec("INSERT INTO camino_visit_daily VALUES ('2020-01-01', 'old', 3)");
  await recordVisit(env, "11111111-1111-4111-8111-111111111111");
  const stats = await authenticatedStats(env);
  assert.deepEqual(stats.sevenDays, { visitors: 1, pageViews: 1 });
  assert.deepEqual(stats.total, { visitors: 2, pageViews: 4 });
});

test("seven-day boundary follows the Berlin calendar across CEST midnight", async (t) => {
  const { env, connection } = await createEnvironment(t);
  const realDate = Date;
  const fixedNow = new realDate("2026-03-29T22:30:00.000Z");
  globalThis.Date = class extends realDate {
    constructor(...args) { super(...(args.length ? args : [fixedNow])); }
    static now() { return fixedNow.getTime(); }
  };
  try {
    connection.exec("INSERT INTO camino_visit_daily VALUES ('2026-03-23', 'old', 5), ('2026-03-24', 'boundary', 2)");
    const stats = await authenticatedStats(env);
    assert.deepEqual(stats.sevenDays, { visitors: 1, pageViews: 2 });
    assert.deepEqual(stats.total, { visitors: 2, pageViews: 7 });
  } finally {
    globalThis.Date = realDate;
  }
});

test("raw visitor ids are neither persisted nor returned", async (t) => {
  const { env, connection } = await createEnvironment(t);
  const visitorId = "33333333-3333-4333-8333-333333333333";
  const response = await recordVisit(env, visitorId);
  assert.equal(response.status, 200);
  const stored = connection.prepare("SELECT * FROM camino_visit_daily").get();
  assert.ok(stored);
  assert.equal(stored.visitor_hash, await expectedVisitorHash(visitorId));
  assert.notEqual(stored.visitor_hash, visitorId);
  assert.doesNotMatch(JSON.stringify(stored), new RegExp(visitorId));
  assert.deepEqual(await response.json(), { ok: true });
});

test("visitor stats require authentication", async (t) => {
  const { env } = await createEnvironment(t);
  const response = await app.fetch(new Request("https://example.test/api/visitor-stats"), env);
  assert.equal(response.status, 401);
});
