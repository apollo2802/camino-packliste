import {
  copyFileSync,
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const next = resolve("node_modules/.bin/next");
rmSync("dist", { force: true, recursive: true });
rmSync("out", { force: true, recursive: true });

const result = spawnSync(next, ["build"], { stdio: "inherit" });

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

function filesBelow(directory) {
  return readdirSync(directory).flatMap((name) => {
    const path = resolve(directory, name);
    return statSync(path).isDirectory() ? filesBelow(path) : [path];
  });
}

let html = readFileSync("out/index.html", "utf8");
const css = filesBelow("out/_next/static")
  .filter((path) => path.endsWith(".css"))
  .map((path) => readFileSync(path, "utf8"))
  .join("\n");
const appScript = readFileSync("public/app.js", "utf8").replace(
  /<\/script/gi,
  "<\\/script",
);

html = html
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
  .replace(/<link\b[^>]*href=["']\/_next\/[^>]*>/gi, "")
  .replace("</head>", `<style>${css}</style></head>`)
  .replace("</body>", `<script>${appScript}</script></body>`);

const loginHtml = `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="robots" content="noindex,nofollow,noarchive">
  <title>Anmelden · Unsere Camino-Packliste</title>
  <style>
    :root{color-scheme:light;--ink:#17312f;--paper:#f5f0e5;--teal:#0d5f5a;--gold:#e3ae3b;--line:rgba(23,49,47,.16)}
    *{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;padding:24px;color:var(--ink);background:radial-gradient(circle at 80% 10%,rgba(227,174,59,.22),transparent 24rem),linear-gradient(145deg,#083f3c,#0d5f5a 58%,#28766e);font-family:Inter,ui-sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
    main{width:min(100%,460px);background:#fffdf8;border:1px solid rgba(255,255,255,.35);border-radius:28px;padding:clamp(26px,7vw,46px);box-shadow:0 30px 80px rgba(0,0,0,.22)}
    .top{display:flex;align-items:center;justify-content:space-between;gap:18px}.languages{display:inline-flex;padding:3px;border:1px solid var(--line);border-radius:999px;background:#f3f5f1}.languages button{width:auto;min-width:38px;margin:0;padding:8px 9px;border-radius:999px;color:#6b7975;background:transparent;font-size:12px}.languages button.active{color:white;background:var(--teal)}
    .mark{width:46px;height:46px;display:grid;place-items:center;border-radius:50%;background:#edf4f1;color:var(--teal);font-size:22px}
    .eyebrow{margin:28px 0 10px;color:var(--teal);font-size:12px;font-weight:800;letter-spacing:.17em;text-transform:uppercase}
    h1{margin:0;font:500 clamp(38px,10vw,58px)/.95 Georgia,serif;letter-spacing:-.045em}p{color:#61716d;line-height:1.6}
    label{display:block;margin:28px 0 8px;font-size:13px;font-weight:750}input{width:100%;border:1px solid var(--line);border-radius:13px;padding:14px 15px;font:inherit;outline:none}input:focus{border-color:var(--teal);box-shadow:0 0 0 4px rgba(13,95,90,.12)}
    button{width:100%;margin-top:12px;border:0;border-radius:13px;padding:14px;background:var(--teal);color:white;font:750 16px inherit;cursor:pointer}button:hover{background:#084b47}.languages button:hover{color:white;background:#28766e}
    .error{padding:11px 13px;border-radius:12px;background:#fff0ec;color:#9a3f2f;font-size:13px}.note{margin-top:20px;font-size:12px;color:#7b8985}
  </style>
</head>
<body>
  <main>
    <div class="top">
      <div class="mark" aria-hidden="true">✦</div>
      <div class="languages" role="group" aria-label="Sprache auswählen" data-login-aria="language">
        <button type="button" data-login-language="de" aria-pressed="true">DE</button>
        <button type="button" data-login-language="ru" aria-pressed="false">RU</button>
      </div>
    </div>
    <p class="eyebrow" data-login-key="eyebrow">Private Camino-Packliste</p>
    <h1>Bom caminho.</h1>
    <p data-login-key="copy">Gebt euren gemeinsamen Zugangscode ein. Danach werden Häkchen und Gewichte sicher zwischen euren Geräten synchronisiert.</p>
    {{ERROR}}
    <form method="post" action="/login">
      <input id="login-language" name="language" type="hidden" value="de">
      <label for="access-code" data-login-key="label">Gemeinsamer Zugangscode</label>
      <input id="access-code" name="code" type="password" required autocomplete="current-password" autofocus>
      <button type="submit" data-login-key="submit">Packliste öffnen</button>
    </form>
    <p class="note" data-login-key="note">Nur Personen mit dem Zugangscode können die Packliste sehen.</p>
  </main>
  <script>
    (function () {
      var copy = {
        de: {
          title: "Anmelden · Unsere Camino-Packliste",
          language: "Sprache auswählen",
          eyebrow: "Private Camino-Packliste",
          copy: "Gebt euren gemeinsamen Zugangscode ein. Danach werden Häkchen und Gewichte sicher zwischen euren Geräten synchronisiert.",
          label: "Gemeinsamer Zugangscode",
          submit: "Packliste öffnen",
          note: "Nur Personen mit dem Zugangscode können die Packliste sehen."
        },
        ru: {
          title: "Вход · Наш список вещей для Камино",
          language: "Выбрать язык",
          eyebrow: "Личный список вещей для Камино",
          copy: "Введите ваш общий код доступа. После входа отметки и вес будут безопасно синхронизироваться между устройствами.",
          label: "Общий код доступа",
          submit: "Открыть список",
          note: "Список увидят только те, у кого есть код доступа."
        }
      };
      var stored = "";
      try { stored = localStorage.getItem("camino-language-v1") || ""; } catch (_) {}
      var language = stored === "ru" ? "ru" : "de";
      function applyLanguage() {
        var values = copy[language];
        document.documentElement.lang = language;
        document.title = values.title;
        document.querySelectorAll("[data-login-key]").forEach(function (element) {
          element.textContent = values[element.dataset.loginKey];
        });
        document.querySelectorAll("[data-login-aria]").forEach(function (element) {
          element.setAttribute("aria-label", values[element.dataset.loginAria]);
        });
        document.querySelectorAll("[data-login-language]").forEach(function (button) {
          var active = button.dataset.loginLanguage === language;
          button.classList.toggle("active", active);
          button.setAttribute("aria-pressed", String(active));
        });
        var error = document.querySelector("[data-login-error]");
        if (error) error.textContent = error.getAttribute("data-" + language);
        document.getElementById("login-language").value = language;
      }
      document.querySelectorAll("[data-login-language]").forEach(function (button) {
        button.addEventListener("click", function () {
          language = button.dataset.loginLanguage === "ru" ? "ru" : "de";
          try { localStorage.setItem("camino-language-v1", language); } catch (_) {}
          applyLanguage();
        });
      });
      applyLanguage();
    })();
  </script>
</body>
</html>`;

const stateSchemaSql = `CREATE TABLE IF NOT EXISTS camino_state (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  payload TEXT NOT NULL,
  updated_at INTEGER NOT NULL
)`;
const attemptsSchemaSql = `CREATE TABLE IF NOT EXISTS login_attempts (
  key TEXT PRIMARY KEY,
  failures INTEGER NOT NULL,
  window_started INTEGER NOT NULL
)`;

const worker = `const INDEX_HTML = ${JSON.stringify(html)};
const LOGIN_HTML = ${JSON.stringify(loginHtml)};
const STATE_SCHEMA_SQL = ${JSON.stringify(stateSchemaSql)};
const ATTEMPTS_SCHEMA_SQL = ${JSON.stringify(attemptsSchemaSql)};
const SESSION_COOKIE = "camino_session";
const SESSION_SECONDS = 60 * 60 * 24 * 30;
const encoder = new TextEncoder();

const SECURITY_HEADERS = {
  "cache-control": "private, no-store",
  "content-security-policy": "default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; font-src 'none'; object-src 'none'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'",
  "cross-origin-opener-policy": "same-origin",
  "permissions-policy": "camera=(), microphone=(), geolocation=()",
  "referrer-policy": "no-referrer",
  "x-content-type-options": "nosniff",
  "x-frame-options": "DENY",
  "x-robots-tag": "noindex, nofollow, noarchive, noimageindex",
};

function response(body, options = {}) {
  const headers = new Headers(SECURITY_HEADERS);
  headers.set("content-type", options.contentType || "text/html; charset=utf-8");
  for (const [key, value] of Object.entries(options.headers || {})) headers.set(key, value);
  return new Response(body, { status: options.status || 200, headers });
}

function json(data, status = 200) {
  return response(JSON.stringify(data), { status, contentType: "application/json; charset=utf-8" });
}

function loginPage(message = "", status = 200) {
  const messages = {
    attempts: ["Zu viele Versuche. Bitte wartet 15 Minuten.", "Слишком много попыток. Подождите 15 минут."],
    code: ["Der Zugangscode ist nicht richtig.", "Неверный код доступа."],
  };
  const selected = messages[message];
  const error = selected ? '<p class="error" role="alert" data-login-error data-de="' + selected[0] + '" data-ru="' + selected[1] + '"></p>' : "";
  return response(LOGIN_HTML.replace("{{ERROR}}", error), { status });
}

function cookieValue(request, name) {
  const source = request.headers.get("cookie") || "";
  for (const part of source.split(";")) {
    const index = part.indexOf("=");
    if (index > 0 && part.slice(0, index).trim() === name) return part.slice(index + 1).trim();
  }
  return "";
}

function toHex(bytes) {
  return Array.from(new Uint8Array(bytes), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function sha256(value) {
  return toHex(await crypto.subtle.digest("SHA-256", encoder.encode(value)));
}

async function hmac(value, secret) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return toHex(await crypto.subtle.sign("HMAC", key, encoder.encode(value)));
}

async function secureEqual(left, right) {
  const [a, b] = await Promise.all([sha256(left), sha256(right)]);
  let difference = a.length ^ b.length;
  for (let index = 0; index < Math.max(a.length, b.length); index += 1) {
    difference |= (a.charCodeAt(index % a.length) || 0) ^ (b.charCodeAt(index % b.length) || 0);
  }
  return difference === 0;
}

async function createSession(secret) {
  const expires = Date.now() + SESSION_SECONDS * 1000;
  return expires + "." + await hmac(String(expires), secret);
}

async function hasValidSession(request, secret) {
  const token = cookieValue(request, SESSION_COOKIE);
  const separator = token.indexOf(".");
  if (separator < 1) return false;
  const expires = Number(token.slice(0, separator));
  const signature = token.slice(separator + 1);
  if (!Number.isFinite(expires) || expires <= Date.now() || expires > Date.now() + (SESSION_SECONDS + 300) * 1000) return false;
  return secureEqual(signature, await hmac(String(expires), secret));
}

async function ensureSchema(env) {
  if (!env.DB) throw new Error("Der gemeinsame Speicher ist nicht verfügbar.");
  await env.DB.batch([
    env.DB.prepare(STATE_SCHEMA_SQL),
    env.DB.prepare(ATTEMPTS_SCHEMA_SQL),
  ]);
}

function clientAddress(request) {
  const forwarded = request.headers.get("x-forwarded-for") || "";
  return request.headers.get("cf-connecting-ip") ||
    forwarded.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
}

async function failedTooOften(request, env) {
  const key = await sha256(clientAddress(request));
  const now = Math.floor(Date.now() / 1000);
  const row = await env.DB.prepare("SELECT failures, window_started FROM login_attempts WHERE key = ?").bind(key).first();
  return row && now - Number(row.window_started) < 900 && Number(row.failures) >= 5;
}

async function recordFailedLogin(request, env) {
  const key = await sha256(clientAddress(request));
  const now = Math.floor(Date.now() / 1000);
  await env.DB.prepare("INSERT INTO login_attempts (key, failures, window_started) VALUES (?, 1, ?) ON CONFLICT(key) DO UPDATE SET failures = CASE WHEN ? - window_started > 900 THEN 1 ELSE failures + 1 END, window_started = CASE WHEN ? - window_started > 900 THEN ? ELSE window_started END")
    .bind(key, now, now, now, now).run();
}

async function clearFailedLogins(request, env) {
  const key = await sha256(clientAddress(request));
  await env.DB.prepare("DELETE FROM login_attempts WHERE key = ?").bind(key).run();
}

function validState(value) {
  if (!value || typeof value !== "object") return false;
  const baseIsValid = ["p1", "p2", "shared"].every((profile) =>
    value.checked && value.checked[profile] && typeof value.checked[profile] === "object" &&
    value.weights && value.weights[profile] && typeof value.weights[profile] === "object" &&
    value.custom && Array.isArray(value.custom[profile])
  );
  if (!baseIsValid || value.labels === undefined) return baseIsValid;
  return value.labels && typeof value.labels.profiles === "object" &&
    ["p1", "p2", "shared"].every((profile) =>
      value.labels.items && value.labels.items[profile] && typeof value.labels.items[profile] === "object"
    );
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const accessCode = env.ACCESS_CODE || "";
    const sessionSecret = env.SESSION_SECRET || "";
    if (!accessCode || !sessionSecret) return response("Die Anmeldung ist noch nicht eingerichtet.", { status: 503 });

    try {
      await ensureSchema(env);
    } catch (_) {
      return response("Der gemeinsame Speicher ist vorübergehend nicht verfügbar.", { status: 503 });
    }

    if (url.pathname === "/login" && request.method === "POST") {
      if (await failedTooOften(request, env)) return loginPage("attempts", 429);
      const form = await request.formData();
      const submitted = String(form.get("code") || "");
      if (!(await secureEqual(submitted, accessCode))) {
        await recordFailedLogin(request, env);
        return loginPage("code", 401);
      }
      await clearFailedLogins(request, env);
      const session = await createSession(sessionSecret);
      const secure = url.protocol === "https:" ? "; Secure" : "";
      return response(null, {
        status: 303,
        headers: {
          location: "/",
          "set-cookie": SESSION_COOKIE + "=" + session + "; Path=/; HttpOnly" + secure + "; SameSite=Strict; Max-Age=" + SESSION_SECONDS,
        },
      });
    }

    if (url.pathname === "/logout") {
      const secure = url.protocol === "https:" ? "; Secure" : "";
      return response(null, {
        status: 303,
        headers: {
          location: "/",
          "set-cookie": SESSION_COOKIE + "=; Path=/; HttpOnly" + secure + "; SameSite=Strict; Max-Age=0",
        },
      });
    }

    const authenticated = await hasValidSession(request, sessionSecret);
    if (!authenticated) {
      if (url.pathname === "/" || url.pathname === "/index.html") return loginPage();
      return json({ error: "Nicht angemeldet" }, 401);
    }

    if (url.pathname === "/api/state") {
      if (request.method === "GET") {
        const row = await env.DB.prepare("SELECT payload, updated_at FROM camino_state WHERE id = 1").first();
        return json({ state: row ? JSON.parse(row.payload) : null, updatedAt: row ? row.updated_at : null });
      }
      if (request.method === "PUT") {
        const origin = request.headers.get("origin");
        if (origin && origin !== url.origin) return json({ error: "Ungültige Herkunft" }, 403);
        const contentLength = Number(request.headers.get("content-length") || 0);
        if (contentLength > 200000) return json({ error: "Daten zu groß" }, 413);
        let body;
        try { body = await request.json(); } catch (_) { return json({ error: "Ungültige Daten" }, 400); }
        if (!validState(body.state)) return json({ error: "Ungültiger Packlistenstand" }, 400);
        const payload = JSON.stringify(body.state);
        if (payload.length > 200000) return json({ error: "Daten zu groß" }, 413);
        const updatedAt = Math.floor(Date.now() / 1000);
        await env.DB.prepare("INSERT INTO camino_state (id, payload, updated_at) VALUES (1, ?, ?) ON CONFLICT(id) DO UPDATE SET payload = excluded.payload, updated_at = excluded.updated_at")
          .bind(payload, updatedAt).run();
        return json({ ok: true, updatedAt });
      }
      return json({ error: "Methode nicht erlaubt" }, 405);
    }

    if (url.pathname === "/" || url.pathname === "/index.html") return response(INDEX_HTML);
    return response("Not found", { status: 404, contentType: "text/plain; charset=utf-8" });
  },
};
`;

mkdirSync("dist/server", { recursive: true });
mkdirSync("dist/client", { recursive: true });
mkdirSync("dist/.openai", { recursive: true });
writeFileSync("dist/server/index.js", worker);
if (existsSync("public/packing-sequence")) {
  cpSync("public/packing-sequence", "dist/client/packing-sequence", { recursive: true });
}
if (existsSync(".openai/hosting.json")) {
  copyFileSync(".openai/hosting.json", "dist/.openai/hosting.json");
}
if (existsSync("drizzle")) {
  cpSync("drizzle", "dist/.openai/drizzle", { recursive: true });
}
