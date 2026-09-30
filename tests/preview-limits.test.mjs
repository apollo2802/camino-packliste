import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:net";
import { spawn } from "node:child_process";
import { once } from "node:events";

test("preview HTTP backend enforces both limits without disrupting an existing session", { timeout: 20_000 }, async (t) => {
  const reservation = createServer();
  reservation.listen(0, "127.0.0.1");
  await once(reservation, "listening");
  const port = reservation.address().port;
  await new Promise((resolve) => reservation.close(resolve));
  const server = spawn(process.execPath, ["scripts/preview.mjs"], {
    cwd: new URL("../", import.meta.url),
    env: { ...process.env, PORT: String(port), ACCESS_CODE: "preview-test-code", SESSION_SECRET: "preview-test-session-secret-that-is-long-enough" },
    stdio: ["ignore", "pipe", "pipe"]
  });
  t.after(async () => {
    if (server.exitCode === null) {
      const exited = once(server, "exit");
      server.kill();
      await exited;
    }
  });
  await Promise.race([
    once(server.stdout, "data"),
    once(server, "exit").then(([code]) => { throw new Error(`Preview exited before listening: ${code}`); })
  ]);
  const origin = `http://127.0.0.1:${port}`;
  const login = (code, index) => fetch(`${origin}/login`, {
    method: "POST", redirect: "manual",
    headers: { "content-type": "application/x-www-form-urlencoded", "cf-connecting-ip": `192.0.2.${index}` },
    body: new URLSearchParams({ code })
  });
  const success = await login("preview-test-code", 0);
  assert.equal(success.status, 303);
  const cookie = success.headers.get("set-cookie").split(";")[0];
  for (let index = 1; index <= 20; index++) assert.equal((await login("wrong", index)).status, 401);
  assert.equal((await login("wrong", 21)).status, 429);
  assert.equal((await fetch(`${origin}/api/state`, { headers: { cookie } })).status, 200);
  const visits = await Promise.all(Array.from({ length: 100 }, (_, index) => fetch(`${origin}/api/public-visit`, {
    method: "POST", headers: { origin, "content-type": "application/json" },
    body: JSON.stringify({ visitorId: `00000000-0000-4000-8000-${String(index).padStart(12, "0")}` })
  })));
  assert.equal(visits.filter((response) => response.status === 200).length, 60);
  assert.equal(visits.filter((response) => response.status === 429).length, 40);
  const stats = await fetch(`${origin}/api/visitor-stats`, { headers: { cookie } });
  assert.equal(stats.status, 200);
  assert.deepEqual((await stats.json()).today, { visitors: 60, pageViews: 60 });
  assert.equal((await fetch(`${origin}/packliste`)).status, 200);
});
