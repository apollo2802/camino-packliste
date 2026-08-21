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
