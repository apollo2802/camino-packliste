import test from "node:test";
import assert from "node:assert/strict";
import app from "../dist/server/index.js";

function environment(payload) {
  return {
    ACCESS_CODE: "test-access-code",
    SESSION_SECRET: "test-session-secret-that-is-long-enough",
    DB: {
      prepare(sql) {
        return {
          bind() { return this; },
          async run() { return { success: true }; },
          async first() {
            if (sql.includes("FROM camino_state")) return { payload: JSON.stringify(payload), updated_at: 1 };
            if (sql.includes("FROM camino_public_photo")) return null;
            return null;
          }
        };
      },
      async batch(statements) {
        return Promise.all(statements.map((statement) => statement.run()));
      }
    }
  };
}

test("public diary never falls back to the private note", async () => {
  const env = environment({
    diary: [{ id: "stage-1", published: true, title: "Stage", note: "PRIVATE NOTE", publicNote: "", track: [] }]
  });

  const response = await app.fetch(new Request("https://example.test/api/public-diary"), env);
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.entries[0].publicNote, "");
  assert.doesNotMatch(JSON.stringify(body), /PRIVATE NOTE/);
});

test("public diary preserves an explicit public description", async () => {
  const env = environment({
    diary: [{ id: "stage-1", published: true, title: "Stage", note: "PRIVATE NOTE", publicNote: "Public summary", track: [] }]
  });

  const response = await app.fetch(new Request("https://example.test/api/public-diary"), env);
  const body = await response.json();

  assert.equal(body.entries[0].publicNote, "Public summary");
  assert.doesNotMatch(JSON.stringify(body), /PRIVATE NOTE/);
});

test("legacy diary image objects are not publicly served", async () => {
  const env = environment({ diary: [] });
  env.MEDIA = {
    async get() { return { async arrayBuffer() { return new TextEncoder().encode("private").buffer; } }; }
  };

  const response = await app.fetch(new Request("https://example.test/media/diary/private-stage.jpg"), env);

  assert.equal(response.status, 401);
});

test("content security policy permits archived weather requests", async () => {
  const response = await app.fetch(new Request("https://example.test/"), environment({ diary: [] }));
  const policy = response.headers.get("content-security-policy") || "";

  assert.match(policy, /https:\/\/archive-api\.open-meteo\.com/);
});

test("content security policy permits local blob images for photo conversion", async () => {
  const response = await app.fetch(new Request("https://example.test/intern"), environment({ diary: [] }));
  const policy = response.headers.get("content-security-policy") || "";
  const imagePolicy = policy.match(/img-src ([^;]+)/)?.[1] || "";

  assert.match(imagePolicy, /(?:^|\s)blob:(?:\s|$)/);
});
