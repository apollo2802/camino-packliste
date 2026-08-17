import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("Coolify compose persists uploaded media in a named volume", async () => {
  const compose = await readFile(new URL("../docker-compose.yml", import.meta.url), "utf8");

  assert.match(compose, /- camino_media:\/app\/data/);
  assert.match(compose, /\n  camino_media:\s*(?:\n|$)/);
});

test("Coolify rejects unauthenticated photo uploads before buffering the body", async () => {
  const server = await readFile(new URL("../server/coolify.mjs", import.meta.url), "utf8");
  const authCheck = server.indexOf("if (uploadRequest && !hasValidUploadSession");
  const bodyRead = server.indexOf("await readBody(request, uploadRequest ? 2_500_000 : 220_000)");

  assert.notEqual(authCheck, -1);
  assert.notEqual(bodyRead, -1);
  assert.ok(authCheck < bodyRead);
});
