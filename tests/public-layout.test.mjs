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
