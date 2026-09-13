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

test("installed Next.js version contains the Windows and AVIF RCE fixes", () => {
  const version = installedVersion("next");
  assert.equal(versionAtLeast(version, "16.3.3"), true, `Next.js ${version} is below 16.3.3`);
});

test("installed sharp version contains the libheif fixes", () => {
  const version = installedVersion("sharp", nextRequire);
  assert.equal(versionAtLeast(version, "0.35.4"), true, `sharp ${version} is below 0.35.4`);
});

test("installed browser baseline mapping cannot terminate the build on invalid input", () => {
  const version = installedVersion("baseline-browser-mapping", nextRequire);
  assert.equal(versionAtLeast(version, "2.11.0"), true, `baseline-browser-mapping ${version} is below 2.11.0`);
});
