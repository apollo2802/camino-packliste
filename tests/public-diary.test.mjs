import test from "node:test";
import assert from "node:assert/strict";
import app from "../dist/server/index.js";

test("content security policy permits the GPX place lookup", async () => {
  const response = await app.fetch(new Request("https://example.test/intern"), environment({ diary: [] }));
  assert.match(response.headers.get("content-security-policy") || "", /connect-src[^;]*https:\/\/nominatim\.openstreetmap\.org/);
});

function environment(payload) {
  return {
    ACCESS_CODE: "test-access-code",
    SESSION_SECRET: "test-session-secret-that-is-long-enough",
    DB: {
      prepare(sql) {
        return {
          bind() { return this; },
          async run() { return { success: true, changes: 1 }; },
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

test("public diary excludes German and Russian private notes", async () => {
  const env = environment({ diary: [{
    id: "stage-1", published: true, title: "Stage",
    privateNotes: { de: "GEHEIM DE", ru: "СЕКРЕТ RU" },
    publicNotes: { de: "Öffentlich", en: "", ru: "" }, track: []
  }] });
  const response = await app.fetch(new Request("https://example.test/api/public-diary"), env);

  assert.doesNotMatch(JSON.stringify(await response.json()), /GEHEIM DE|СЕКРЕТ RU|privateNotes/);
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

test("public diary exposes all three manually written descriptions", async () => {
  const env = environment({
    diary: [{
      id: "stage-1",
      published: true,
      title: "Stage",
      note: "PRIVATE NOTE",
      publicNotes: { de: "Deutsch", en: "English", ru: "Русский" },
      track: []
    }]
  });

  const response = await app.fetch(new Request("https://example.test/api/public-diary"), env);
  const body = await response.json();

  assert.deepEqual(body.entries[0].publicNotes, { de: "Deutsch", en: "English", ru: "Русский" });
  assert.equal(body.entries[0].publicNote, "Deutsch");
  assert.doesNotMatch(JSON.stringify(body), /PRIVATE NOTE/);
});

test("legacy public descriptions migrate to the German field", async () => {
  const env = environment({
    diary: [{ id: "stage-1", published: true, title: "Stage", publicNote: "Alter Text", track: [] }]
  });

  const response = await app.fetch(new Request("https://example.test/api/public-diary"), env);
  const body = await response.json();

  assert.deepEqual(body.entries[0].publicNotes, { de: "Alter Text", en: "", ru: "" });
  assert.equal(body.entries[0].publicNote, "Alter Text");
});

test("public diary exposes the average speed and profile for the elevation chart", async () => {
  const env = environment({
    diary: [{
      id: "stage-1", published: true, title: "Stage", publicNote: "Public summary", track: [[41, -8, 20], [41.01, -8.01, 40]],
      stats: { distance: 2.5, ascent: 20, descent: 0, min: 20, max: 40, averageSpeed: 4.3, speedProfile: [3.8, 4.8] }
    }]
  });

  const response = await app.fetch(new Request("https://example.test/api/public-diary"), env);
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.entries[0].stats.averageSpeed, 4.3);
  assert.deepEqual(body.entries[0].stats.speedProfile, [3.8, 4.8]);
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

test("public page links to the separate packing-list demo", async () => {
  const response = await app.fetch(new Request("https://example.test/"), environment({ diary: [] }));
  const html = await response.text();
  assert.match(html, /href="\/packliste"/);
  assert.doesNotMatch(html, /class="public-pack-item"/);
});

test("packing-list demo is public and excludes private management sections", async () => {
  const env = environment({ diary: [{ note: "PRIVATE NOTE" }], labels: { profiles: { p1: "PRIVATE NAME" } } });
  for (const path of ["/packliste", "/packliste/"]) {
    const response = await app.fetch(new Request(`https://example.test${path}`), env);
    const html = await response.text();
    assert.equal(response.status, 200);
    assert.match(html, /data-pack-demo="true"/);
    assert.match(html, /id="checklist"/);
    assert.match(html, /id="search-input"/);
    assert.doesNotMatch(html, /PRIVATE NOTE|PRIVATE NAME|<section class="diary-section"|<section class="visitor-stats"|<form class="add-item"|href="\/logout"/);
  }
});

test("content security policy permits local blob images for photo conversion", async () => {
  const response = await app.fetch(new Request("https://example.test/intern"), environment({ diary: [] }));
  const policy = response.headers.get("content-security-policy") || "";
  const imagePolicy = policy.match(/img-src ([^;]+)/)?.[1] || "";

  assert.match(imagePolicy, /(?:^|\s)blob:(?:\s|$)/);
});
