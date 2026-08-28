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

test("mobile hero reserves space for the absolutely positioned note", async () => {
  const css = await readFile(new URL("../public/camino.css", import.meta.url), "utf8");
  const mobileStyles = css.slice(css.indexOf("@media(max-width:760px)"));
  assert.match(mobileStyles, /\.public-hero-content\{[^}]*padding-bottom:/);
});

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

test("public route animation renders follow and fullscreen controls", async () => {
  const script = await readFile(new URL("../public/camino.js", import.meta.url), "utf8");
  const mapRenderer = script.slice(script.indexOf("function map(entry)"), script.indexOf("function elevation(entry)"));

  assert.match(mapRenderer, /data-tour-follow checked/);
  assert.match(mapRenderer, /data-tour-fullscreen/);
  assert.match(mapRenderer, /data-tour-fullscreen-label/);
  assert.doesNotMatch(mapRenderer, /data-tour-export|data-tour-download/);
});

test("public route offers terrain and city views", async () => {
  const script = await readFile(new URL("../public/camino.js", import.meta.url), "utf8");
  const mapRenderer = script.slice(script.indexOf("function map(entry)"), script.indexOf("function elevation(entry)"));
  const mountStart = script.indexOf("function mountPublicTours()");
  const tourMount = script.slice(mountStart, script.indexOf("document.querySelectorAll(\"[data-language]\")", mountStart));

  assert.match(mapRenderer, /data-tour-city-map/);
  assert.match(mapRenderer, /data-tour-view="terrain"/);
  assert.match(mapRenderer, /data-tour-view="city"/);
  assert.match(tourMount, /cityError:t\("cityError"\)/);
});

test("public route timeline stays at the top in normal and fullscreen views", async () => {
  const css = await readFile(new URL("../public/camino.css", import.meta.url), "utf8");
  const controls = css.match(/\.public-tour-controls\{([^}]*)\}/)?.[1] || "";

  assert.match(controls, /top:\.75rem/);
  assert.doesNotMatch(controls, /bottom:/);
  assert.match(css, /\.public-tour:fullscreen\{[^}]*width:100vw;[^}]*min-height:100vh/);
  assert.match(css, /\.public-tour:fullscreen \.public-route-canvas\{[^}]*height:100vh/);
});

test("public route action icons are not stretched by the map SVG rule", async () => {
  const css = await readFile(new URL("../public/camino.css", import.meta.url), "utf8");
  const actionIcon = css.match(/\.public-tour-action svg\{([^}]*)\}/)?.[1] || "";
  const mobileStyles = css.slice(css.indexOf("@media(max-width:760px)"));

  assert.match(actionIcon, /min-height:0/);
  assert.match(mobileStyles, /\.public-tour-action svg\{[^}]*height:19px;[^}]*min-height:0/);
});

test("route animation follows weather and precedes elevation in both diaries", async () => {
  const publicScript = await readFile(new URL("../public/camino.js", import.meta.url), "utf8");
  const publicCard = publicScript.slice(publicScript.indexOf("function card(entry"), publicScript.indexOf("function render()"));
  const publicMarkup = publicCard.slice(publicCard.indexOf("<div class=\"public-feature-copy\">"));
  const privateScript = await readFile(new URL("../public/app.js", import.meta.url), "utf8");
  const privateCard = privateScript.slice(privateScript.indexOf("return `<article class=\"diary-entry\">"), privateScript.indexOf("}).join(\"\");", privateScript.indexOf("return `<article class=\"diary-entry\">")));

  assert.ok(publicMarkup.indexOf("weather(entry)") < publicMarkup.indexOf("mapMarkup"));
  assert.ok(publicMarkup.indexOf("mapMarkup") < publicMarkup.indexOf("stats(entry)"));
  assert.ok(publicMarkup.indexOf("stats(entry)") < publicMarkup.indexOf("elevation(entry)"));
  assert.ok(privateCard.indexOf("diaryWeatherMarkup(entry.weather)") < privateCard.indexOf("<div class=\"diary-map\">"));
  assert.ok(privateCard.indexOf("<div class=\"diary-map\">") < privateCard.indexOf("statMarkup"));
});

test("elevation charts label their two measures and use a round HTML progress marker", async () => {
  const publicScript = await readFile(new URL("../public/camino.js", import.meta.url), "utf8");
  const privateScript = await readFile(new URL("../public/app.js", import.meta.url), "utf8");

  assert.match(publicScript, /public-elevation-legend/);
  assert.match(publicScript, /data-elevation-marker/);
  assert.match(publicScript, /public-elevation-marker[^>]*style="position:absolute/);
  assert.match(privateScript, /diary-elevation-legend/);
  assert.match(privateScript, /diary-elevation-marker[^>]*data-elevation-marker/);
});

test("both diary views load the marker-aware animation module revision", async () => {
  const publicScript = await readFile(new URL("../public/camino.js", import.meta.url), "utf8");
  const privateScript = await readFile(new URL("../public/app.js", import.meta.url), "utf8");

  assert.match(publicScript, /diary-3d\.js\?v=42/);
  assert.match(privateScript, /diary-3d\.js\?v=42/);
});

test("private diary offers three manual public descriptions and stage editing", async () => {
  const html = await readFile(new URL("../app/page.js", import.meta.url), "utf8");
  const script = await readFile(new URL("../public/app.js", import.meta.url), "utf8");

  for (const language of ["de", "en", "ru"]) {
    assert.match(html, new RegExp(`id="diary-public-note-${language}"`));
    assert.match(html, new RegExp(`id="diary-edit-public-note-${language}"`));
  }
  assert.match(html, /id="diary-edit-title"/);
  assert.match(script, /data-diary-edit=/);
  assert.doesNotMatch(script, /window\.prompt\(t\("diary\.publicNotePrompt"/);
});

test("private diary normalizes canonical multilingual private notes", async () => {
  const script = await readFile(new URL("../public/app.js", import.meta.url), "utf8");

  assert.match(script, /function normalizePrivateNotes\(entry\)/);
  assert.match(script, /entry\?\.privateNotes\?\.de/);
  assert.match(script, /entry\?\.privateNotes\?\.ru/);
  assert.match(script, /entry\?\.note/);
  assert.match(script, /privateNotes:\s*normalizePrivateNotes\(entry\)/);
  assert.doesNotMatch(script, /\n\s*note:\s*String\(entry\.note/);
});

test("private diary creates and edits German and Russian notes", async () => {
  const html = await readFile(new URL("../app/page.js", import.meta.url), "utf8");
  const script = await readFile(new URL("../public/app.js", import.meta.url), "utf8");
  for (const id of ["diary-note-de", "diary-note-ru", "diary-edit-note-de", "diary-edit-note-ru"]) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
  assert.match(script, /privateNotes:\s*\{/);
  assert.match(script, /els\.diaryEditNoteRu\.value/);
});

test("public diary selects its language and falls back to German", async () => {
  const script = await readFile(new URL("../public/camino.js", import.meta.url), "utf8");
  const selector = script.slice(script.indexOf("function publicDescription"), script.indexOf("function card(entry"));

  assert.match(selector, /publicNotes\?\.\[language\]/);
  assert.match(selector, /publicNotes\?\.de/);
  assert.match(selector, /entry\.publicNote/);
});

test("public language switch remains available on mobile", async () => {
  const css = await readFile(new URL("../public/camino.css", import.meta.url), "utf8");
  const mobileStyles = css.slice(css.indexOf("@media(max-width:760px)"));

  assert.match(mobileStyles, /\.public-languages\{display:inline-flex\}/);
  assert.match(mobileStyles, /\.public-private-link\{display:none\}/);
});

test("public page records an anonymous same-origin visit", async () => {
  const script = await readFile(new URL("../public/camino.js", import.meta.url), "utf8");
  assert.match(script, /camino-visitor-id-v1/);
  assert.match(script, /crypto\.randomUUID\(\)/);
  assert.match(script, /fetch\("\/api\/public-visit"/);
  assert.match(script, /credentials:"omit"/);
});

test("protected diary includes visitor statistics dashboard", async () => {
  const html = await readFile(new URL("../app/page.js", import.meta.url), "utf8");
  const script = await readFile(new URL("../public/app.js", import.meta.url), "utf8");
  assert.match(html, /id="visitor-stats"/);
  for (const period of ["today", "sevenDays", "total"]) {
    assert.match(html, new RegExp(`data-visitor-period="${period}"`));
  }
  assert.match(script, /fetch\("\/api\/visitor-stats"/);
  assert.match(script, /credentials:\s*["']same-origin["']/);
  assert.match(script, /function loadVisitorStats\(\)/);
});

test("visitor statistics preserve state and reformat after language changes", async () => {
  const script = await readFile(new URL("../public/app.js", import.meta.url), "utf8");
  assert.match(script, /let visitorStatsData = null/);
  assert.match(script, /let visitorStatsState = "loading"/);
  assert.match(script, /function renderVisitorStats\(\)/);
  assert.match(script, /renderVisitorStats\(\);\s*\n\s*}\s*\n\s*\n\s*function setLanguage/);
  assert.match(script, /value\.toLocaleString\(languageLocale\(\)\)/);
  assert.match(script, /visitorStatsState = "ready"/);
  assert.match(script, /visitorStatsState = "unavailable"/);
});
