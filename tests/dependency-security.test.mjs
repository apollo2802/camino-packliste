import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";

const require = createRequire(import.meta.url);
const nextPackagePath = require.resolve("next/package.json");
const nextRequire = createRequire(nextPackagePath);

function installedVersion(packageName, resolver = require) {
  let directory = dirname(resolver.resolve(packageName));
  while (!existsSync(join(directory, "package.json"))) directory = dirname(directory);
  const packagePath = join(directory, "package.json");
  return JSON.parse(readFileSync(packagePath, "utf8")).version;
}

function versionAtLeast(actual, minimum) {
  const actualParts = actual.split(".").map(Number);
  const minimumParts = minimum.split(".").map(Number);
  return minimumParts.every((part, index) => {
    const previousMatches = minimumParts.slice(0, index).every((previous, previousIndex) => actualParts[previousIndex] === previous);
    return !previousMatches || actualParts[index] >= part;
  });
}

test("installed Next.js version includes October 2026 security fixes", () => {
  const version = installedVersion("next");
  assert.equal(versionAtLeast(version, "16.4.1"), true, `Next.js ${version} is below 16.4.1`);
});

test("installed sharp version includes the librsvg fix", () => {
  const version = installedVersion("sharp", nextRequire);
  assert.equal(versionAtLeast(version, "0.35.5"), true, `sharp ${version} is below 0.35.5`);
});

test("installed browser baseline mapping cannot terminate the build on invalid input", () => {
  const version = installedVersion("baseline-browser-mapping", nextRequire);
  assert.equal(versionAtLeast(version, "2.11.0"), true, `baseline-browser-mapping ${version} is below 2.11.0`);
});

test("source-map-js includes indexed section offset fix", () => {
  const postcssRequire = createRequire(nextRequire.resolve("postcss"));
  assert.equal(versionAtLeast(installedVersion("source-map-js", postcssRequire), "1.2.2"), true);
});
