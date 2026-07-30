import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { resolve } from "node:path";
import app from "../dist/server/index.js";

const port = Number(process.env.PORT || 3000);
const sequenceRoot = resolve("dist/client/packing-sequence");
const state = { value: null, updatedAt: null };
const attempts = new Map();

function createStatement(sql) {
  let values = [];
  return {
    bind(...nextValues) {
      values = nextValues;
      return this;
    },
    async first() {
      if (sql.includes("FROM camino_state")) {
        return state.value === null ? null : { payload: state.value, updated_at: state.updatedAt };
      }
      if (sql.includes("FROM login_attempts")) {
        return attempts.get(values[0]) || null;
      }
      return null;
    },
    async run() {
      if (sql.startsWith("INSERT INTO camino_state")) {
        state.value = values[0];
        state.updatedAt = values[1];
      } else if (sql.startsWith("INSERT INTO login_attempts")) {
        const current = attempts.get(values[0]);
        const now = values[1];
        attempts.set(values[0], !current || now - current.window_started > 900
          ? { failures: 1, window_started: now }
          : { failures: current.failures + 1, window_started: current.window_started });
      } else if (sql.startsWith("DELETE FROM login_attempts")) {
        attempts.delete(values[0]);
      }
      return { success: true };
    },
  };
}

const env = {
  ACCESS_CODE: process.env.ACCESS_CODE || "camino-test",
  SESSION_SECRET: process.env.SESSION_SECRET || "local-preview-session-secret",
  DB: {
    prepare: createStatement,
    async batch(statements) {
      return Promise.all(statements.map((statement) => statement.run()));
    },
  },
};

createServer(async (request, response) => {
  const url = `http://${request.headers.host || `localhost:${port}`}${request.url}`;
  const assetPath = new URL(url).pathname;
  const assetMatch = assetPath.match(/^\/packing-sequence\/(desktop|mobile)\/(frame-\d{4}\.webp)$/);
  if (assetMatch && ["GET", "HEAD"].includes(request.method)) {
    const file = resolve(sequenceRoot, assetMatch[1], assetMatch[2]);
    response.writeHead(200, {
      "content-type": "image/webp",
      "cache-control": "public, max-age=31536000, immutable",
      "x-content-type-options": "nosniff",
    });
    if (request.method === "HEAD") response.end();
    else createReadStream(file).on("error", () => response.destroy()).pipe(response);
    return;
  }
  const init = { method: request.method, headers: request.headers };
  if (!["GET", "HEAD"].includes(request.method)) {
    init.body = request;
    init.duplex = "half";
  }
  const result = await app.fetch(new Request(url, init), env);

  response.writeHead(result.status, Object.fromEntries(result.headers));
  response.end(Buffer.from(await result.arrayBuffer()));
}).listen(port, "0.0.0.0", () => {
  console.log(`Preview: http://localhost:${port}`);
});
