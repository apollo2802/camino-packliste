import test from "node:test";
import assert from "node:assert/strict";
import app from "../dist/server/index.js";

function createEnvironment() {
  let photo = null;
  const files = new Map();
  const env = {
    ACCESS_CODE: "test-access-code",
    SESSION_SECRET: "test-session-secret-that-is-long-enough",
    DB: {
      prepare(sql) {
        let values = [];
        return {
          bind(...nextValues) { values = nextValues; return this; },
          async first() {
            if (sql.includes("FROM login_attempts")) return null;
            if (sql.includes("FROM camino_state")) return { payload: JSON.stringify({ diary: [] }), updated_at: 1 };
            if (sql.includes("FROM camino_public_photo")) return photo;
            return null;
          },
          async run() {
            if (sql.startsWith("INSERT INTO camino_public_photo")) photo = { media_key: values[0], updated_at: values[1] };
            if (sql.startsWith("DELETE FROM camino_public_photo")) photo = null;
            return { success: true };
          }
        };
      },
      async batch(statements) { return Promise.all(statements.map((statement) => statement.run())); }
    },
    MEDIA: {
      async put(key, value) { files.set(key, Buffer.from(value)); },
      async get(key) {
        const value = files.get(key);
        return value ? { async arrayBuffer() { return value.buffer.slice(value.byteOffset, value.byteOffset + value.byteLength); } } : null;
      },
      async delete(key) { files.delete(key); }
    }
  };
  return { env, getPhoto: () => photo, files };
}

async function login(env) {
  const response = await app.fetch(new Request("https://example.test/login", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: env.ACCESS_CODE })
  }), env);
  return response.headers.get("set-cookie").split(";")[0];
}

test("public photo upload owns its metadata on the server", async () => {
  const { env, getPhoto, files } = createEnvironment();
  const cookie = await login(env);
  const jpeg = Uint8Array.from([0xff, 0xd8, 0xff, 0xdb, 0x00, 0x01]);

  const upload = await app.fetch(new Request("https://example.test/api/public-photo", {
    method: "POST",
    headers: { cookie, origin: "https://example.test", "content-type": "image/jpeg" },
    body: jpeg
  }), env);

  assert.equal(upload.status, 200);
  assert.match(getPhoto()?.media_key || "", /^public-photo-[a-zA-Z0-9-]+\.jpg$/);
  assert.ok(getPhoto().updated_at <= 2_147_483_647, "photo timestamp must fit the PostgreSQL INTEGER column");
  assert.equal(files.has(getPhoto().media_key), true);
  const firstKey = getPhoto().media_key;

  const replacement = await app.fetch(new Request("https://example.test/api/public-photo", {
    method: "POST",
    headers: { cookie, origin: "https://example.test", "content-type": "image/jpeg" },
    body: jpeg
  }), env);
  assert.equal(replacement.status, 200);
  assert.notEqual(getPhoto().media_key, firstKey);
  assert.equal(files.has(firstKey), true, "the previous image remains available during the replacement grace period");

  const image = await app.fetch(new Request("https://example.test/media/public-photo.jpg"), env);
  assert.equal(image.status, 200);
  assert.equal(image.headers.get("cache-control"), "no-store");

  const publicDiary = await app.fetch(new Request("https://example.test/api/public-diary"), env);
  const body = await publicDiary.json();
  assert.match(body.photo?.url || "", /^\/media\/public-photo\.jpg\?v=\d+$/);
});

test("public photo upload rejects bytes that are not a JPEG", async () => {
  const { env, getPhoto } = createEnvironment();
  const cookie = await login(env);

  const response = await app.fetch(new Request("https://example.test/api/public-photo", {
    method: "POST",
    headers: { cookie, origin: "https://example.test", "content-type": "image/jpeg" },
    body: "not-a-jpeg"
  }), env);

  assert.equal(response.status, 415);
  assert.equal(getPhoto(), null);
});
