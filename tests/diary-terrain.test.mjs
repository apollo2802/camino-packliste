import test from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import { readFile } from "node:fs/promises";

test("terrain grid keeps short inland routes at a useful local zoom", async () => {
  const source = await readFile(new URL("../public/diary-3d.js", import.meta.url), "utf8");
  const executable = source
    .replace(/^import .*;\n/gm, "")
    .replace("export function mountDiaryTour", "function mountDiaryTour")
    .concat("\nglobalThis.chooseTileGridForTest = chooseTileGrid;");
  const context = {};
  vm.runInNewContext(executable, context);

  const grid = context.chooseTileGridForTest([
    [51.25, 7.45, 300],
    [51.26, 7.46, 320]
  ]);

  assert.deepEqual(
    { zoom:grid.zoom, minX:grid.minX, maxX:grid.maxX, minY:grid.minY, maxY:grid.maxY, columns:grid.columns, rows:grid.rows },
    { zoom:15, minX:17061, maxX:17064, minY:10930, maxY:10935, columns:4, rows:6 }
  );
});

test("terrain view keeps only a minimal distance fog", async () => {
  const source = await readFile(new URL("../public/diary-3d.js", import.meta.url), "utf8");

  assert.match(source, /scene\.fog = new THREE\.Fog\(0xdcebf2, 45, 60\)/);
});

test("coastal stages keep a compact context and reserve more land than ocean", async () => {
  const source = await readFile(new URL("../public/diary-3d.js", import.meta.url), "utf8");
  const executable = source
    .replace(/^import .*;\n/gm, "")
    .replace("export function mountDiaryTour", "function mountDiaryTour")
    .concat("\nglobalThis.terrainContextForTest = terrainContextForTrack;");
  const context = {};
  vm.runInNewContext(executable, context);

  const result = context.terrainContextForTest([
    [41.15, -8.75, 20],
    [41.35, -8.61, 15]
  ]);

  assert.deepEqual(
    JSON.parse(JSON.stringify(result)),
    {
      minLat: 41.06,
      maxLat: 41.44,
      minLon: -8.76575,
      maxLon: -8.43,
      coastal: true,
      landDirection: 1
    }
  );
});
