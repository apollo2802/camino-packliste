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
