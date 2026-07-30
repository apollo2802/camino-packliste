import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { resolve } from "node:path";
import { Pool } from "pg";
import app from "../dist/server/index.js";

const port = Number(process.env.PORT || 3000);
const accessCode = process.env.ACCESS_CODE || "";
const sessionSecret = process.env.SESSION_SECRET || "";
const databaseUrl = process.env.DATABASE_URL || "";
const databaseConfigured = databaseUrl || (
  process.env.PGHOST &&
  process.env.PGUSER &&
  process.env.PGPASSWORD &&
  process.env.PGDATABASE
);
const sequenceRoot = resolve("dist/client/packing-sequence");

if (accessCode.length < 10 || sessionSecret.length < 32 || !databaseConfigured) {
  console.error("Zugangscode, Sitzungsschlüssel und Datenbankverbindung müssen gesetzt sein.");
  process.exit(1);
}

const pool = new Pool({
  ...(databaseUrl ? { connectionString: databaseUrl } : {}),
  max: 5,
  idleTimeoutMillis: 30_000,
});

function postgresSql(sql) {
  let index = 0;
  return sql.replace(/\?/g, () => `$${++index}`);
}

function statement(sql) {
  let values = [];
  const prepared = {
    bind(...nextValues) {
      values = nextValues;
      return prepared;
    },
    async first() {
      const result = await pool.query(postgresSql(sql), values);
      return result.rows[0] || null;
    },
    async run(client = pool) {
      const result = await client.query(postgresSql(sql), values);
      return { success: true, changes: result.rowCount || 0 };
    },
  };
  return prepared;
}

const database = {
  prepare: statement,
  async batch(statements) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const results = [];
      for (const prepared of statements) results.push(await prepared.run(client));
      await client.query("COMMIT");
      return results;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },
};

function requestUrl(request) {
  const forwardedProtocol = String(request.headers["x-forwarded-proto"] || "")
    .split(",")[0]
    .trim();
  const protocol = forwardedProtocol === "https" ? "https" : "http";
  const host = String(request.headers["x-forwarded-host"] || request.headers.host || `localhost:${port}`)
    .split(",")[0]
    .trim();
  return `${protocol}://${host}${request.url}`;
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    request.on("data", (chunk) => {
      size += chunk.length;
      if (size > 220_000) {
        reject(Object.assign(new Error("Payload too large"), { status: 413 }));
        request.destroy();
        return;
      }
      chunks.push(chunk);
    });
    request.on("end", () => resolve(Buffer.concat(chunks)));
    request.on("error", reject);
  });
}

const server = createServer(async (request, response) => {
  try {
    if (request.url === "/healthz") {
      await pool.query("SELECT 1");
      response.writeHead(200, { "content-type": "text/plain; charset=utf-8" });
      response.end("ok");
      return;
    }

    const assetPath = new URL(requestUrl(request)).pathname;
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

    const headers = new Headers();
    for (const [name, value] of Object.entries(request.headers)) {
      if (Array.isArray(value)) value.forEach((entry) => headers.append(name, entry));
      else if (value !== undefined) headers.set(name, value);
    }

    const init = { method: request.method, headers };
    if (!["GET", "HEAD"].includes(request.method)) {
      init.body = await readBody(request);
    }

    const result = await app.fetch(new Request(requestUrl(request), init), {
      ACCESS_CODE: accessCode,
      SESSION_SECRET: sessionSecret,
      DB: database,
    });

    response.writeHead(result.status, Object.fromEntries(result.headers));
    response.end(Buffer.from(await result.arrayBuffer()));
  } catch (error) {
    const status = error.status || 500;
    if (!response.headersSent) {
      response.writeHead(status, {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "no-store",
      });
    }
    response.end(status === 413 ? "Anfrage zu groß" : "Interner Serverfehler");
    if (status === 500) console.error(error);
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Camino-Packliste läuft auf Port ${port}.`);
});

async function shutdown() {
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
