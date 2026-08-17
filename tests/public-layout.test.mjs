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
