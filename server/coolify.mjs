import { createServer } from "node:http";
import { createHmac, timingSafeEqual } from "node:crypto";
import { createReadStream } from "node:fs";
import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
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
const uploadRoot = resolve(process.env.UPLOAD_DIR || "data/uploads");
await mkdir(uploadRoot, { recursive: true });

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

function mediaPath(key) {
  if (/^public-photo-[a-zA-Z0-9-]+\.jpg$/.test(key)) return resolve(uploadRoot, key);
  throw new Error("Invalid media key");
}

const media = {
  async put(key, value) {
    await writeFile(mediaPath(key), Buffer.from(value));
  },
  async get(key) {
    try {
      const value = await readFile(mediaPath(key));
      return {
        async arrayBuffer() {
          return value.buffer.slice(value.byteOffset, value.byteOffset + value.byteLength);
        },
      };
    } catch (error) {
      if (error?.code === "ENOENT") return null;
      throw error;
    }
  },
  async delete(key) {
    try {
      await unlink(mediaPath(key));
    } catch (error) {
      if (error?.code !== "ENOENT") throw error;
    }
  },
  deleteLater(key) {
    const cleanup = setTimeout(() => media.delete(key).catch((error) => console.error(error)), 60_000);
    cleanup.unref?.();
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

function readBody(request, limit = 220_000) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    request.on("data", (chunk) => {
      size += chunk.length;
      if (size > limit) {
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

function hasValidUploadSession(cookieHeader, secret) {
  const cookie = String(cookieHeader || "").split(";").map((part) => part.trim())
    .find((part) => part.startsWith("camino_session="));
  const token = cookie ? cookie.slice("camino_session=".length) : "";
  const separator = token.indexOf(".");
  if (separator < 1) return false;
  const expires = Number(token.slice(0, separator));
  const signature = token.slice(separator + 1);
  const maxLifetime = 60 * 60 * 24 * 30 + 300;
  if (!Number.isFinite(expires) || expires <= Date.now() || expires > Date.now() + maxLifetime * 1000) return false;
  const expected = createHmac("sha256", secret).update(String(expires)).digest("hex");
  const suppliedBytes = Buffer.from(signature, "utf8");
  const expectedBytes = Buffer.from(expected, "utf8");
  return suppliedBytes.length === expectedBytes.length && timingSafeEqual(suppliedBytes, expectedBytes);
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

    const requestPath = new URL(requestUrl(request)).pathname;
    const uploadRequest = requestPath === "/api/public-photo";
    const init = { method: request.method, headers };
    if (!["GET", "HEAD"].includes(request.method)) {
      if (uploadRequest && !hasValidUploadSession(request.headers.cookie, sessionSecret)) {
        request.resume();
      } else {
        init.body = await readBody(request, uploadRequest ? 2_500_000 : 220_000);
      }
    }

    const result = await app.fetch(new Request(requestUrl(request), init), {
      ACCESS_CODE: accessCode,
      SESSION_SECRET: sessionSecret,
      DB: database,
      MEDIA: media,
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
