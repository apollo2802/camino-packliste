import test from "node:test";
import assert from "node:assert/strict";
import app from "../dist/server/index.js";

const ACCESS_CODE = "test-access-code";
const SESSION_SECRET = "test-session-secret-that-is-long-enough";

function berlinDay(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Berlin", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(date);
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${value.year}-${value.month}-${value.day}`;
}

function createEnvironment() {
  const rows = new Map();
  const state = { value: null, updatedAt: null };
  const attempts = new Map();
  const env = {
    ACCESS_CODE,
    SESSION_SECRET,
    DB: {
      prepare(sql) {
        let values = [];
        return {
          bind(...nextValues) { values = nextValues; return this; },
          async first() {
            if (sql.includes("FROM login_attempts")) return attempts.get(values[0]) || null;
            if (sql.includes("FROM camino_state")) return state.value === null ? null : { payload: state.value, updated_at: state.updatedAt };
            if (sql.includes("FROM camino_visit_daily")) {
              const [cutoff] = values;
              const selected = [...rows.values()].filter((row) => !cutoff || row.day >= cutoff);
              return { visitors: new Set(selected.map((row) => row.visitor_hash)).size, page_views: selected.reduce((sum, row) => sum + row.page_views, 0) };
            }
            return null;
          },
          async run() {
            if (sql.startsWith("INSERT INTO camino_state")) { state.value = values[0]; state.updatedAt = values[1]; }
            else if (sql.startsWith("INSERT INTO login_attempts")) attempts.set(values[0], { failures: 1, window_started: values[1] });
            else if (sql.startsWith("INSERT INTO camino_visit_daily")) {
              const key = `${values[0]}:${values[1]}`;
              const previous = rows.get(key);
              rows.set(key, { day: values[0], visitor_hash: values[1], page_views: (previous?.page_views || 0) + 1 });
            }
            return { success: true };
          }
        };
      },
      async batch(statements) { return Promise.all(statements.map((statement) => statement.run())); }
    }
  };
  return { env, rows };
}

async function recordVisit(env, visitorId, origin = "https://example.test") {
  return app.fetch(new Request("https://example.test/api/public-visit", {
    method: "POST",
    headers: { origin, "content-type": "application/json" },
    body: JSON.stringify({ visitorId })
  }), env);
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

test("repeat loads increment page views but keep one visitor", async () => {
  const { env } = createEnvironment();
  assert.equal((await recordVisit(env, "11111111-1111-4111-8111-111111111111")).status, 200);
  assert.equal((await recordVisit(env, "11111111-1111-4111-8111-111111111111")).status, 200);
  const stats = await authenticatedStats(env);
  assert.deepEqual(stats.today, { visitors: 1, pageViews: 2 });
});

test("a second UUID creates a second visitor", async () => {
  const { env } = createEnvironment();
  await recordVisit(env, "11111111-1111-4111-8111-111111111111");
  await recordVisit(env, "22222222-2222-4222-8222-222222222222");
  assert.deepEqual((await authenticatedStats(env)).today, { visitors: 2, pageViews: 2 });
});

test("malformed visitor ids return 400", async () => {
  const { env } = createEnvironment();
  assert.equal((await recordVisit(env, "not-a-uuid")).status, 400);
});

test("cross-origin POST returns 403", async () => {
  const { env } = createEnvironment();
  assert.equal((await recordVisit(env, "11111111-1111-4111-8111-111111111111", "https://evil.example")).status, 403);
});

test("rows older than the seven-day cutoff affect only total", async () => {
  const { env, rows } = createEnvironment();
  rows.set(`2020-01-01:old`, { day: "2020-01-01", visitor_hash: "old", page_views: 3 });
  await recordVisit(env, "11111111-1111-4111-8111-111111111111");
  const stats = await authenticatedStats(env);
  assert.deepEqual(stats.sevenDays, { visitors: 1, pageViews: 1 });
  assert.deepEqual(stats.total, { visitors: 2, pageViews: 4 });
});

test("visitor stats require authentication", async () => {
  const { env } = createEnvironment();
  const response = await app.fetch(new Request("https://example.test/api/visitor-stats"), env);
  assert.equal(response.status, 401);
});
