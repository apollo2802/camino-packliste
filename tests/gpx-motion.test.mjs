import test from "node:test";
import assert from "node:assert/strict";

let motion;
try {
  await import("../public/gpx-motion.js");
  motion = globalThis.CaminoGpxMotion;
} catch (_) {
  motion = null;
}

const timedPoint = (lat, minutes, lon = -8) => ({
  point: [lat, lon, 0],
  time: new Date(Date.UTC(2026, 7, 30, 8, minutes)).toISOString()
});

test("moving average excludes a recorded pause while the speed profile keeps it", () => {
  assert.ok(motion, "GPX motion analyser must be available");
  const result = motion.analyze([
    timedPoint(41, 0),
    timedPoint(41.009, 12),
    timedPoint(41.009, 42),
    timedPoint(41.018, 54)
  ]);

  assert.ok(result.averageSpeed > 4.99 && result.averageSpeed < 5.02);
  assert.equal(result.speedProfile.length, 4);
  assert.ok(result.speedProfile[0] > 4.99 && result.speedProfile[0] < 5.02);
  assert.ok(result.speedProfile[1] > 4.99 && result.speedProfile[1] < 5.02);
  assert.equal(result.speedProfile[2], 0);
  assert.ok(result.speedProfile[3] > 4.99 && result.speedProfile[3] < 5.02);
});

test("sub-walking GPS drift counts as a stop", () => {
  assert.ok(motion, "GPX motion analyser must be available");
  const result = motion.analyze([
    timedPoint(41, 0),
    timedPoint(41.0001, 10),
    timedPoint(41.0091, 22)
  ]);

  assert.ok(result.averageSpeed > 4.99 && result.averageSpeed < 5.02);
  assert.deepEqual(result.speedProfile.slice(0, 2), [0, 0]);
});

test("missing point timestamps suppress speed without losing route distance", () => {
  assert.ok(motion, "GPX motion analyser must be available");
  const result = motion.analyze([
    { point: [41, -8, 0], time: "" },
    { point: [41.009, -8, 0], time: "" }
  ]);

  assert.ok(result.distance > 0.99 && result.distance < 1.01);
  assert.equal(result.averageSpeed, 0);
  assert.deepEqual(result.speedProfile, []);
});

test("replacing GPX data preserves the written stage fields", () => {
  assert.ok(motion, "GPX motion analyser must be available");
  const entry = {
    id: "stage-1",
    date: "2026-08-30",
    title: "Mein Titel",
    from: "Porto",
    to: "Matosinhos",
    privateNotes: { de: "Privat", ru: "Личное" },
    publicNotes: { de: "Öffentlich", en: "Public", ru: "Публично" },
    published: true,
    weather: { date: "2026-08-30", code: 1 },
    gpxName: "old.gpx",
    stats: { distance: 1 },
    track: [[0, 0, 0]]
  };
  const replacement = {
    gpxName: "new.gpx",
    stats: { distance: 12.4, averageSpeed: 4.8 },
    track: [[41, -8, 2], [41.1, -8.1, 5]],
    weather: { date: "2026-08-30", code: 2 }
  };

  motion.replaceEntryRoute(entry, replacement);

  assert.equal(entry.title, "Mein Titel");
  assert.equal(entry.from, "Porto");
  assert.equal(entry.to, "Matosinhos");
  assert.deepEqual(entry.privateNotes, { de: "Privat", ru: "Личное" });
  assert.deepEqual(entry.publicNotes, { de: "Öffentlich", en: "Public", ru: "Публично" });
  assert.equal(entry.published, true);
  assert.equal(entry.gpxName, "new.gpx");
  assert.deepEqual(entry.stats, replacement.stats);
  assert.deepEqual(entry.track, replacement.track);
  assert.deepEqual(entry.weather, replacement.weather);
});
