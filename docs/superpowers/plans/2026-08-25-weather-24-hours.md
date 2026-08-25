# 24-Hour Weather Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extend the current-location hourly forecast from 12 to 24 hourly cards and visibly mark the first hour of the next calendar day.

**Architecture:** Keep the existing two-day Open-Meteo request and horizontal card scroller. The renderer detects the first date change within the 24-card slice and adds a localized day-boundary label plus a visual divider to that hour card.

**Tech Stack:** Browser JavaScript, Open-Meteo forecast API, CSS, Node test runner

**Spec:** `docs/superpowers/specs/2026-08-25-private-notes-visitors-weather-design.md`

## Global Constraints

- Render exactly 24 available consecutive hourly entries starting at `hourIndex`.
- Do not add another weather API or increase `forecast_days` beyond the existing value `2`.
- Mark only the first date change in the displayed sequence.
- Translate the boundary label as `Morgen`, `Tomorrow`, and `Завтра`.
- Preserve horizontal scrolling and phone usability.

---

### Task 1: 24-hour renderer and next-day boundary

**Files:**
- Create: `tests/weather-hourly.test.mjs`
- Modify: `public/app.js`
- Modify: `app/page.js`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: existing `hourly.time`, `hourIndex`, `weatherCode()`, `timeOnly()`, and `t()`.
- Produces: 24 `.weather-hour` elements; at most one `.starts-next-day` element containing `.weather-day-label`.

- [ ] **Step 1: Write failing renderer contract tests**

Create `tests/weather-hourly.test.mjs`:

```js
import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("hourly forecast renders 24 hours and marks the next day", async () => {
  const script = await readFile(new URL("../public/app.js", import.meta.url), "utf8");
  const renderer = script.slice(script.indexOf("function renderWeather()"), script.indexOf("renderActiveWeather = renderWeather"));
  assert.match(renderer, /slice\(hourIndex, hourIndex \+ 24\)/);
  assert.match(renderer, /starts-next-day/);
  assert.match(renderer, /weather\.tomorrow/);
  assert.match(renderer, /weather-day-label/);
});

test("24-hour copy is translated in all interface languages", async () => {
  const script = await readFile(new URL("../public/app.js", import.meta.url), "utf8");
  assert.equal((script.match(/"weather\.hourlyCopy": "[^"]*24/g) || []).length, 3);
  assert.match(script, /"weather\.tomorrow": "Morgen"/);
  assert.match(script, /"weather\.tomorrow": "Tomorrow"/);
  assert.match(script, /"weather\.tomorrow": "Завтра"/);
});
```

- [ ] **Step 2: Run the tests and verify RED**

Run: `node --test tests/weather-hourly.test.mjs`

Expected: FAIL because the renderer still slices 12 hours.

- [ ] **Step 3: Update translated copy**

Change `weather.hourlyCopy` in DE/EN/RU to the next 24 hours and add `weather.tomorrow` with the exact values from the global constraints. Change the static German fallback in `app/page.js` from 12 to 24 hours.

- [ ] **Step 4: Implement boundary detection**

Before mapping, create `const displayedHours = hourly.time.slice(hourIndex, hourIndex + 24)`. During mapping, compare `String(value).slice(0, 10)` with the previous displayed value's date. Use a `nextDayMarked` boolean so only the first change receives the class and label:

```js
const startsNextDay = !nextDayMarked && offset > 0 &&
  String(value).slice(0, 10) !== String(displayedHours[offset - 1]).slice(0, 10);
if (startsNextDay) nextDayMarked = true;
const dayLabel = startsNextDay
  ? `<span class="weather-day-label">${escapeHTML(t("weather.tomorrow"))}</span>`
  : "";
```

Include `starts-next-day` in that article's class while keeping `is-now` behavior unchanged.

- [ ] **Step 5: Style the visual divider**

Add a stronger left border and extra left margin to `.weather-hour.starts-next-day`. Position `.weather-day-label` within the card, using the gold accent and a readable uppercase size. Do not rely on color alone: the text label is mandatory.

- [ ] **Step 6: Run focused tests and checks**

Run: `node --test tests/weather-hourly.test.mjs tests/public-layout.test.mjs && node --check public/app.js && git diff --check`

Expected: PASS.

- [ ] **Step 7: Commit the weather extension**

```bash
git add public/app.js app/page.js app/globals.css tests/weather-hourly.test.mjs
git commit -m "feat: extend hourly weather to 24 hours"
```

---

### Task 2: Rendered desktop and mobile weather verification

**Files:**
- Verify: `public/app.js`
- Verify: `app/globals.css`
- Verify: `app/page.js`

**Interfaces:**
- Consumes: the 24-hour renderer from Task 1.
- Produces: screenshot evidence of a legible next-day boundary.

- [ ] **Step 1: Run the full suite**

Run: `pnpm test && node --check public/app.js && git diff --check`

Expected: all tests PASS.

- [ ] **Step 2: Prepare deterministic visual data**

Use a temporary, untracked local debug fixture that reuses the production weather classes and renders 24 cards from 18:00 through 17:00, with the `00:00` card marked `.starts-next-day` and labeled `Morgen`. Do not commit the fixture.

- [ ] **Step 3: Inspect desktop layout**

At 1280×900, open the hourly details and scroll across the midnight boundary.

Expected: 24 cards exist, `Morgen · 00:00` is immediately understandable, and the divider does not obscure adjacent values.

- [ ] **Step 4: Inspect phone layout and all labels**

At 390×844, repeat the check for German, English, and Russian labels.

Expected: horizontal scrolling remains smooth, the marked card is fully visible, and `Morgen`, `Tomorrow`, and `Завтра` do not overflow.

- [ ] **Step 5: Remove the temporary fixture and verify cleanliness**

Remove the exact temporary debug file, then run:

```bash
git status --short
git diff --check
```

Expected: no debug fixture appears; only intended feature files are modified.

- [ ] **Step 6: Commit a visual correction only if Task 2 changed production files**

After rerunning `node --test tests/weather-hourly.test.mjs`:

```bash
git add public/app.js app/page.js app/globals.css tests/weather-hourly.test.mjs
git commit -m "fix: refine next-day weather marker"
```
