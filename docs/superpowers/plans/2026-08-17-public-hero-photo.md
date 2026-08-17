# Public Hero Photo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Das unabhängige öffentliche Camino-Foto als kompakte Karte rechts im Hero anzeigen und den bisherigen großen Fotoblock entfernen.

**Architecture:** Das vorhandene Element `#public-journey-photo` wird in `.public-hero-content` verschoben und bleibt weiterhin allein durch `public/camino.js` gesteuert. CSS Grid übernimmt die Desktop-Anordnung; ein Mobile-Breakpoint setzt die Fotokarte innerhalb des Hero unter die Überschrift. API, Upload und öffentlicher Datenfluss bleiben unverändert.

**Tech Stack:** Statisches HTML, CSS, Vanilla JavaScript, Node-Test-Runner

## Global Constraints

- Die bestehende öffentliche Foto-API und Uploadlogik bleiben unverändert.
- Ohne Foto darf keine leere rechte Spalte sichtbar sein.
- Mobil bleibt das Foto innerhalb des grünen Hero-Bereichs.
- Der eigenständige große Fotoblock unter dem Hero entfällt.

---

### Task 1: Hero-Fotokarte verschieben und responsiv gestalten

**Files:**
- Modify: `public/camino.html:24-36`
- Modify: `public/camino.css:3-6,12`
- Create: `tests/public-layout.test.mjs`

**Interfaces:**
- Consumes: `publicPhoto.url` und die bestehenden DOM-IDs `public-journey-photo`, `public-journey-photo-image`
- Produces: dieselben DOM-IDs innerhalb von `.public-hero-content`; `public/camino.js` benötigt keine Änderung

- [ ] **Step 1: Failing layout test schreiben**

```js
import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("public photo is rendered inside the hero instead of main content", async () => {
  const html = await readFile(new URL("../public/camino.html", import.meta.url), "utf8");
  const heroStart = html.indexOf('<header class="public-hero"');
  const heroEnd = html.indexOf("</header>", heroStart);
  const photo = html.indexOf('id="public-journey-photo"');
  assert.ok(photo > heroStart && photo < heroEnd);
  assert.equal(html.indexOf('id="public-journey-photo"', photo + 1), -1);
});
```

- [ ] **Step 2: Test ausführen und erwartetes Scheitern bestätigen**

Run: `pnpm test`

Expected: FAIL, weil `#public-journey-photo` noch nach `</header>` liegt.

- [ ] **Step 3: HTML minimal verschieben**

In `public/camino.html` wird die bestehende Fotosektion direkt nach der Überschrift innerhalb von `.public-hero-content` eingesetzt:

```html
<section class="public-journey-photo" id="public-journey-photo" hidden>
  <figure><img id="public-journey-photo-image" alt="Unser Camino" loading="eager"></figure>
</section>
```

Der bisherige identische Block im `<main>` wird entfernt.

- [ ] **Step 4: Desktop- und Mobil-CSS ergänzen**

Desktop verwendet ein Grid mit Text links und Fotokarte rechts. Die Fotokarte erhält `aspect-ratio: 3 / 2`, `object-fit: cover`, `object-position: 50% 42%`, rund 22 Pixel Radius, einen hellen Rahmen und einen dezenten Schatten. Ohne Foto wechselt `.public-hero-content` über `:has(.public-journey-photo[hidden])` auf eine Spalte.

Mobil unter 760 Pixeln wird `.public-hero-content` einspaltig. Die Überschrift bleibt zuerst, die Fotokarte folgt direkt danach und nutzt die volle verfügbare Breite innerhalb des Hero.

- [ ] **Step 5: Automatische Prüfungen ausführen**

Run: `pnpm test && node --check public/camino.js && git diff --check`

Expected: Produktions-Build erfolgreich, alle Tests PASS, keine Syntax- oder Whitespacefehler.

- [ ] **Step 6: Lokal visuell prüfen**

Run: `PORT=3022 pnpm start`

Im Browser `http://127.0.0.1:3022/` öffnen und prüfen:

- Desktop: Foto rechts neben der Hero-Überschrift.
- Mobil: Foto innerhalb des grünen Hero-Bereichs unter der Überschrift.
- Kein großer Fotoblock zwischen Hero und letzter Etappe.

- [ ] **Step 7: Commit erstellen**

```bash
git add public/camino.html public/camino.css tests/public-layout.test.mjs
git commit -m "Move public photo into hero"
```
