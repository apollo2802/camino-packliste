import test from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import { readFile } from "node:fs/promises";

test("terrain grid loads the three-times-expanded geographic context around a route", async () => {
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
    { zoom:13, minX:4264, maxX:4266, minY:2731, maxY:2734, columns:3, rows:4 }
  );
});

test("terrain view keeps only a minimal distance fog", async () => {
  const source = await readFile(new URL("../public/diary-3d.js", import.meta.url), "utf8");

  assert.match(source, /scene\.fog = new THREE\.Fog\(0xdcebf2, 45, 60\)/);
});
