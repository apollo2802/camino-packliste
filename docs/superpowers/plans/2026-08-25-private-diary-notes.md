# Private Diary Notes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Store, create, display, and edit separate German and Russian private notes for every diary stage without exposing either note publicly.

**Architecture:** Replace the legacy scalar `note` with canonical `privateNotes: { de, ru }` during client-side state normalization. Reuse the existing new-stage form and edit dialog, while keeping `publishedEntries()` as the server-side privacy boundary.

**Tech Stack:** Next.js static markup, browser JavaScript, Node test runner, generated Worker-style server

**Spec:** `docs/superpowers/specs/2026-08-25-private-notes-visitors-weather-design.md`

## Global Constraints

- No automatic translation; both note values are entered manually.
- Legacy `note` migrates to `privateNotes.de`; `privateNotes.ru` defaults to an empty string.
- Neither `privateNotes` nor legacy `note` may appear in `/api/public-diary`.
- Keep each note at the existing private-note limit of 2,400 characters.

---

### Task 1: Canonical private-note model and privacy regression tests

**Files:**
- Modify: `tests/public-diary.test.mjs`
- Modify: `tests/public-layout.test.mjs`
- Modify: `public/app.js`

**Interfaces:**
- Consumes: legacy diary entries with `note?: string`.
- Produces: `normalizePrivateNotes(entry) -> { de: string, ru: string }` and normalized entries with `privateNotes`.

- [ ] **Step 1: Write failing privacy and migration tests**

Add an API regression case to `tests/public-diary.test.mjs`:

```js
test("public diary excludes German and Russian private notes", async () => {
  const env = environment({ diary: [{
    id: "stage-1", published: true, title: "Stage",
    privateNotes: { de: "GEHEIM DE", ru: "СЕКРЕТ RU" },
    publicNotes: { de: "Öffentlich", en: "", ru: "" }, track: []
  }] });
  const response = await app.fetch(new Request("https://example.test/api/public-diary"), env);
  assert.doesNotMatch(JSON.stringify(await response.json()), /GEHEIM DE|СЕКРЕТ RU|privateNotes/);
});
```

Add source assertions to `tests/public-layout.test.mjs` for `normalizePrivateNotes`, legacy `entry.note`, and both canonical language keys.

- [ ] **Step 2: Run the focused tests and verify RED**

Run: `node scripts/build.mjs && node --test tests/public-diary.test.mjs tests/public-layout.test.mjs`

Expected: FAIL because `normalizePrivateNotes` and the new private fields do not exist.

- [ ] **Step 3: Implement canonical normalization**

In `public/app.js`, add:

```js
function normalizePrivateNotes(entry) {
  return {
    de: String(entry?.privateNotes?.de || entry?.note || "").slice(0, 2400),
    ru: String(entry?.privateNotes?.ru || "").slice(0, 2400)
  };
}
```

Change `normalizeState()` to store `privateNotes: normalizePrivateNotes(entry)` and remove the canonical `note` property. Keep the public server mapping unchanged except for tests proving that it never copies private fields.

- [ ] **Step 4: Run the focused tests and verify GREEN**

Run: `node scripts/build.mjs && node --test tests/public-diary.test.mjs tests/public-layout.test.mjs`

Expected: PASS.

- [ ] **Step 5: Commit the model migration**

```bash
git add public/app.js tests/public-diary.test.mjs tests/public-layout.test.mjs
git commit -m "refactor: migrate diary private notes"
```

---

### Task 2: German and Russian private-note form fields

**Files:**
- Modify: `app/page.js`
- Modify: `public/app.js`
- Modify: `app/globals.css`
- Modify: `tests/public-layout.test.mjs`

**Interfaces:**
- Consumes: `normalizePrivateNotes(entry)` from Task 1.
- Produces: DOM ids `diary-note-de`, `diary-note-ru`, `diary-edit-note-de`, and `diary-edit-note-ru`.

- [ ] **Step 1: Write failing markup tests**

Add to `tests/public-layout.test.mjs`:

```js
test("private diary creates and edits German and Russian notes", async () => {
  const html = await readFile(new URL("../app/page.js", import.meta.url), "utf8");
  const script = await readFile(new URL("../public/app.js", import.meta.url), "utf8");
  for (const id of ["diary-note-de", "diary-note-ru", "diary-edit-note-de", "diary-edit-note-ru"]) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
  assert.match(script, /privateNotes:\s*\{/);
  assert.match(script, /els\.diaryEditNoteRu\.value/);
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `node --test --test-name-pattern="private diary creates" tests/public-layout.test.mjs`

Expected: FAIL on missing element ids.

- [ ] **Step 3: Add translated form and dialog markup**

Replace the single private textarea in `app/page.js` with a `fieldset` containing German and Russian textareas. Add the same two fields to `#diary-edit-dialog`. Use translation keys:

```js
"diary.privateNotes": "Private Tagesnotizen",
"diary.privateNoteDe": "Deutsch",
"diary.privateNoteRu": "Russisch"
```

Provide corresponding English and Russian UI translations in `public/app.js`; these labels describe languages and do not translate note content.

- [ ] **Step 4: Wire creation, rendering, and editing**

Add DOM references for all four ids. New entries store:

```js
privateNotes: {
  de: els.diaryNoteDe.value.trim().slice(0, 2400),
  ru: els.diaryNoteRu.value.trim().slice(0, 2400)
}
```

In `renderDiary()`, render non-empty notes with explicit language labels. When opening the editor, populate both fields from `normalizePrivateNotes(entry)`. On save, replace `entry.privateNotes` and execute `delete entry.note`.

- [ ] **Step 5: Style the grouped private fields**

Reuse the visual grammar of `.diary-public-notes`; introduce `.diary-private-notes` only where a distinct selector is needed. Ensure both fieldsets span the full form width and remain a single column below the existing mobile breakpoint.

- [ ] **Step 6: Run focused tests and syntax checks**

Run: `node --test tests/public-layout.test.mjs && node --check public/app.js && git diff --check`

Expected: PASS with no syntax or whitespace errors.

- [ ] **Step 7: Commit the UI**

```bash
git add app/page.js app/globals.css public/app.js tests/public-layout.test.mjs
git commit -m "feat: add Russian private diary notes"
```

---

### Task 3: End-to-end private-note verification

**Files:**
- Verify: `app/page.js`
- Verify: `public/app.js`
- Verify: `scripts/build.mjs`

**Interfaces:**
- Consumes: the complete private-note feature from Tasks 1 and 2.
- Produces: verified desktop/mobile behavior and proof that public JSON remains private-note-free.

- [ ] **Step 1: Run the full automated suite**

Run: `pnpm test && node --check public/app.js && node --check scripts/build.mjs && git diff --check`

Expected: all tests PASS.

- [ ] **Step 2: Verify creation and editing in the local preview**

Run: `pnpm start`, open `/intern`, create one stage with different German and Russian private notes, reopen it through „Etappe bearbeiten“, change both values, and save.

Expected: both values reload unchanged and are visibly distinguished by language.

- [ ] **Step 3: Verify the privacy boundary**

Open `/api/public-diary` and inspect the created entry.

Expected: the response contains public descriptions but contains no `privateNotes`, `note`, German private text, or Russian private text.

- [ ] **Step 4: Verify mobile layout**

Set the browser viewport to 390×844, reopen the editor, and capture a screenshot.

Expected: both private note fields, cancel, save, and close controls are reachable without horizontal clipping.

- [ ] **Step 5: Commit any test-only correction, if the QA cycle required one**

If no tracked file changed, skip this commit. Otherwise run the focused test again, then:

```bash
git add app/page.js app/globals.css public/app.js tests/public-diary.test.mjs tests/public-layout.test.mjs
git commit -m "test: verify multilingual private notes"
```
