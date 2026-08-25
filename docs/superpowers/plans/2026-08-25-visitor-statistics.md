# Visitor Statistics Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Count approximate anonymous visitors/devices and page views for today, the last seven days, and all time, visible only in the protected area.

**Architecture:** A same-origin public endpoint HMAC-hashes a random browser-local identifier and upserts one row per Berlin calendar day and visitor hash. A protected aggregate endpoint feeds a compact internal dashboard; no IP address, user-agent, referrer, location, or raw identifier is stored.

**Tech Stack:** Worker-style Fetch API server, D1/SQLite-compatible SQL, PostgreSQL adapter, browser `localStorage`, Node test runner

**Spec:** `docs/superpowers/specs/2026-08-25-private-notes-visitors-weather-design.md`

## Global Constraints

- Store only `day`, HMAC visitor hash, and per-day page-view count.
- Use timezone `Europe/Berlin` for today and the inclusive seven-day window.
- `POST /api/public-visit` is public but same-origin and schema validated.
- `GET /api/visitor-stats` requires the existing valid session.
- Tracking failures never block or visually disturb the public page.

---

### Task 1: Visitor persistence and authenticated aggregation API

**Files:**
- Create: `tests/visitor-stats.test.mjs`
- Modify: `scripts/build.mjs`
- Modify: `scripts/preview.mjs`

**Interfaces:**
- Consumes: `SESSION_SECRET`, `env.DB`, `hmac(message, secret)`, and existing session validation.
- Produces: table `camino_visit_daily`, `POST /api/public-visit`, and `GET /api/visitor-stats` returning `{ today, sevenDays, total }`, each with `{ visitors, pageViews }`.

- [ ] **Step 1: Build the in-memory test database and failing endpoint tests**

Create `tests/visitor-stats.test.mjs` with a fake DB that records rows in a `Map` keyed by `${day}:${visitorHash}`. Its `run()` handles the visit upsert; its `first()` computes `COUNT(DISTINCT visitor_hash)` and `SUM(page_views)` for the bound date range.

Test these exact behaviors:

```js
test("repeat loads increment page views but keep one visitor", async () => {
  await recordVisit(env, "11111111-1111-4111-8111-111111111111");
  await recordVisit(env, "11111111-1111-4111-8111-111111111111");
  const stats = await authenticatedStats(env);
  assert.deepEqual(stats.today, { visitors: 1, pageViews: 2 });
});

test("visitor stats require authentication", async () => {
  const response = await app.fetch(new Request("https://example.test/api/visitor-stats"), env);
  assert.equal(response.status, 401);
});
```

Also assert: a second UUID creates a second visitor; malformed ids return 400; cross-origin POST returns 403; rows older than the seven-day cutoff affect only `total`.

- [ ] **Step 2: Run the endpoint tests and verify RED**

Run: `node scripts/build.mjs && node --test tests/visitor-stats.test.mjs`

Expected: FAIL because the routes and schema do not exist.

- [ ] **Step 3: Add the portable schema**

In `scripts/build.mjs`, define and include in `ensureSchema()`:

```sql
CREATE TABLE IF NOT EXISTS camino_visit_daily (
  day TEXT NOT NULL,
  visitor_hash TEXT NOT NULL,
  page_views INTEGER NOT NULL,
  PRIMARY KEY (day, visitor_hash)
)
```

Add the same behavior to the preview server's in-memory DB so local visual testing supports both endpoints.

- [ ] **Step 4: Add Berlin date and validation helpers**

Implement:

```js
function berlinDay(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Berlin", year: "numeric", month: "2-digit", day: "2-digit"
  }).formatToParts(date);
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return value.year + "-" + value.month + "-" + value.day;
}

function validVisitorId(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}
```

Compute the seven-day cutoff from a noon UTC anchor to avoid DST date drift, then format it through `berlinDay()`.

- [ ] **Step 5: Implement the public write endpoint**

Require `Origin === url.origin`, JSON content type, a body below 1 KB, and exactly a valid `visitorId`. Derive `visitorHash = await hmac("visitor:" + visitorId, sessionSecret)` and run:

```sql
INSERT INTO camino_visit_daily (day, visitor_hash, page_views)
VALUES (?, ?, 1)
ON CONFLICT(day, visitor_hash)
DO UPDATE SET page_views = camino_visit_daily.page_views + 1
```

Return `{ ok: true }` without exposing the hash.

- [ ] **Step 6: Implement the protected read endpoint**

After `hasValidSession()`, query today, `day >= sevenDayCutoff`, and all rows. Normalize PostgreSQL string counts with `Number(value) || 0`, and return:

```js
{
  today: { visitors: 0, pageViews: 0 },
  sevenDays: { visitors: 0, pageViews: 0 },
  total: { visitors: 0, pageViews: 0 }
}
```

- [ ] **Step 7: Run endpoint tests and verify GREEN**

Run: `node scripts/build.mjs && node --test tests/visitor-stats.test.mjs`

Expected: PASS.

- [ ] **Step 8: Commit the server feature**

```bash
git add scripts/build.mjs scripts/preview.mjs tests/visitor-stats.test.mjs
git commit -m "feat: add anonymous visitor statistics API"
```

---

### Task 2: Public page-view recorder

**Files:**
- Modify: `public/camino.js`
- Modify: `tests/public-layout.test.mjs`

**Interfaces:**
- Consumes: `POST /api/public-visit` from Task 1.
- Produces: `recordPublicVisit()` and local-storage key `camino-visitor-id-v1`.

- [ ] **Step 1: Write a failing source contract test**

Add to `tests/public-layout.test.mjs`:

```js
test("public page records an anonymous same-origin visit", async () => {
  const script = await readFile(new URL("../public/camino.js", import.meta.url), "utf8");
  assert.match(script, /camino-visitor-id-v1/);
  assert.match(script, /crypto\.randomUUID\(\)/);
  assert.match(script, /fetch\("\/api\/public-visit"/);
  assert.match(script, /credentials:"omit"/);
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `node --test --test-name-pattern="records an anonymous" tests/public-layout.test.mjs`

Expected: FAIL on the missing storage key.

- [ ] **Step 3: Implement fire-and-forget recording**

Add `recordPublicVisit()` to `public/camino.js`. Reuse a valid stored UUID or generate one with `crypto.randomUUID()`, store it in `localStorage`, then call:

```js
fetch("/api/public-visit", {
  method: "POST",
  credentials: "omit",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ visitorId })
}).catch(() => {});
```

Invoke it exactly once after initial page setup, independently of `/api/public-diary` success.

- [ ] **Step 4: Run the source test and syntax check**

Run: `node --test tests/public-layout.test.mjs && node --check public/camino.js`

Expected: PASS.

- [ ] **Step 5: Commit the recorder**

```bash
git add public/camino.js tests/public-layout.test.mjs
git commit -m "feat: record anonymous public page views"
```

---

### Task 3: Protected visitor dashboard

**Files:**
- Modify: `app/page.js`
- Modify: `app/globals.css`
- Modify: `public/app.js`
- Modify: `tests/public-layout.test.mjs`

**Interfaces:**
- Consumes: `GET /api/visitor-stats` from Task 1.
- Produces: `#visitor-stats`, six metric values, and `loadVisitorStats()`.

- [ ] **Step 1: Write failing dashboard markup tests**

Assert that `app/page.js` contains `id="visitor-stats"`, `data-visitor-period="today"`, `data-visitor-period="sevenDays"`, and `data-visitor-period="total"`; assert that `public/app.js` fetches `/api/visitor-stats` with `credentials: "same-origin"`.

- [ ] **Step 2: Run the test and verify RED**

Run: `node --test --test-name-pattern="visitor" tests/public-layout.test.mjs`

Expected: FAIL on the absent dashboard.

- [ ] **Step 3: Add translated dashboard markup**

Place a compact `visitor-stats` section next to the existing public-photo administration. For each period, render two values with translated labels for visitors and page views. Add DE/EN/RU keys for title, today, last seven days, total, visitors, page views, loading, and unavailable.

- [ ] **Step 4: Fetch and render protected statistics**

Implement `loadVisitorStats()` to fetch the protected endpoint, coerce every value with `Number`, render locale-aware integers, and show the translated unavailable status on failure. Call it during protected-page initialization; do not tie it to diary state synchronization.

- [ ] **Step 5: Style desktop and mobile cards**

Use a three-column period grid on desktop and one column below the existing phone breakpoint. Each period shows visitors and page views side-by-side with sufficient contrast and no fixed height.

- [ ] **Step 6: Run focused tests and checks**

Run: `node --test tests/public-layout.test.mjs tests/visitor-stats.test.mjs && node --check public/app.js && git diff --check`

Expected: PASS.

- [ ] **Step 7: Commit the dashboard**

```bash
git add app/page.js app/globals.css public/app.js tests/public-layout.test.mjs
git commit -m "feat: show protected visitor statistics"
```

---

### Task 4: Visitor-statistics end-to-end verification

**Files:**
- Verify: `scripts/build.mjs`
- Verify: `scripts/preview.mjs`
- Verify: `public/camino.js`
- Verify: `public/app.js`

**Interfaces:**
- Consumes: all visitor-statistics tasks.
- Produces: verified counts, access control, and responsive dashboard.

- [ ] **Step 1: Run the full suite**

Run: `pnpm test && node --check public/app.js && node --check public/camino.js && node --check scripts/build.mjs && git diff --check`

Expected: all tests PASS.

- [ ] **Step 2: Verify counting in the preview server**

Start `pnpm start`, open `/` twice in the same browser, then open `/intern`.

Expected: today shows one visitor and two page views.

- [ ] **Step 3: Verify a second anonymous device**

Delete only `camino-visitor-id-v1`, reload `/`, and return to `/intern`.

Expected: today shows two visitors and three page views.

- [ ] **Step 4: Verify protected access and mobile layout**

Confirm an unauthenticated request to `/api/visitor-stats` returns 401. At 390×844, capture the visitor dashboard.

Expected: all six metrics are readable without horizontal scrolling; the public page remains normal if `/api/public-visit` is blocked.

- [ ] **Step 5: Commit any QA correction only if tracked files changed**

After rerunning the affected test:

```bash
git add scripts/build.mjs scripts/preview.mjs public/camino.js public/app.js app/page.js app/globals.css tests
git commit -m "test: verify visitor statistics flow"
```
