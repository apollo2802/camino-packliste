# Compact Public Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce the public page hero's visual height by about 20 percent while preserving the existing headline, photo card, responsive layout, and footer note.

**Architecture:** Keep the existing HTML and component structure unchanged. Make a focused CSS-only spacing adjustment, protected by the existing public-layout test file and verified in the local preview at desktop and mobile widths.

**Tech Stack:** Static HTML/CSS, Node.js built-in test runner, project production build, local preview server

## Global Constraints

- Keep the desktop headline and hero photo at their current sizes.
- Keep the two-column desktop and one-column mobile arrangements.
- Keep the hero note fully visible without overlapping content.
- Do not change the image crop, aspect ratio, border radius, or typography.
- Reduce only excess vertical space, with an approximately 20 percent desktop height reduction.

---

### Task 1: Compact the public hero spacing

**Files:**
- Modify: `public/camino.css:3-6,12`
- Test: `tests/public-layout.test.mjs`

**Interfaces:**
- Consumes: Existing `.public-hero`, `.public-hero-content`, `.public-journey-photo`, and `.public-hero-note` selectors.
- Produces: A shorter responsive hero without any HTML or JavaScript changes.

- [ ] **Step 1: Write the failing layout regression test**

Add a test that reads the delivered stylesheet, isolates the desktop and mobile hero rules, and asserts the new compact height and spacing contract:

```js
test("public hero uses compact desktop and mobile spacing", async () => {
  const css = await readFile(new URL("../public/camino.css", import.meta.url), "utf8");
  const desktopHero = css.match(/\.public-hero\{([^}]*)\}/)?.[1] || "";
  const desktopContent = css.match(/\.public-hero-content\{([^}]*)\}/)?.[1] || "";
  const mobileStyles = css.slice(css.indexOf("@media(max-width:760px)"));

  assert.match(desktopHero, /min-height:min\(610px,80vh\)/);
  assert.match(desktopContent, /padding-top:clamp\(4\.5rem,10vw,9rem\)/);
  assert.match(mobileStyles, /\.public-hero\{min-height:600px\}/);
  assert.match(mobileStyles, /\.public-hero-content\{[^}]*padding-top:5rem;[^}]*padding-bottom:4\.5rem/);
});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```bash
node --test tests/public-layout.test.mjs
```

Expected: FAIL because the current stylesheet still uses `min(760px,100vh)`, the larger desktop padding, and the `680px` mobile minimum.

- [ ] **Step 3: Apply the minimal CSS change**

Update only these declarations:

```css
.public-hero{min-height:min(610px,80vh);padding:0 clamp(1rem,5vw,5rem) clamp(3.5rem,7vw,6rem)}
.public-hero-content{padding-top:clamp(4.5rem,10vw,9rem)}

@media(max-width:760px){
  .public-hero{min-height:600px}
  .public-hero-content{padding-top:5rem;padding-bottom:4.5rem}
}
```

Preserve every other declaration in the existing minified selector blocks.

- [ ] **Step 4: Run focused and complete verification**

Run:

```bash
node --test tests/public-layout.test.mjs
pnpm test
git diff --check
```

Expected: The focused layout tests and all project tests pass, the production build succeeds, and the diff check emits no errors.

- [ ] **Step 5: Visually verify the responsive result**

Reload `http://127.0.0.1:3023/` after rebuilding. Check desktop and a viewport at or below 760px. Confirm that the headline and photo retain their size, the Hero is visibly shorter, the mobile photo remains below the title, and the diary note does not overlap either.

- [ ] **Step 6: Commit the implementation**

```bash
git add public/camino.css tests/public-layout.test.mjs
git commit -m "style: compact public hero"
```
