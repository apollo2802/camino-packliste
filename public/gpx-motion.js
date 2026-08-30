(function installCaminoGpxMotion(root) {
  "use strict";

  const MOVING_SPEED_THRESHOLD = 0.8;

  function radians(value) {
    return value * Math.PI / 180;
  }

  function haversine(left, right) {
    const radius = 6371;
    const lat = radians(right[0] - left[0]);
    const lon = radians(right[1] - left[1]);
    const value = Math.sin(lat / 2) ** 2
      + Math.cos(radians(left[0])) * Math.cos(radians(right[0])) * Math.sin(lon / 2) ** 2;
    return radius * 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value));
  }

  function analyze(recordedPoints) {
    const points = Array.isArray(recordedPoints) ? recordedPoints : [];
    const timestamps = points.map((item) => Date.parse(item?.time || ""));
    const hasCompleteTiming = points.length > 1 && timestamps.every(Number.isFinite);
    const segmentDistances = [];
    const segmentSpeeds = [];
    let distance = 0;
    let movingDistance = 0;
    let movingHours = 0;

    for (let index = 1; index < points.length; index += 1) {
      const segmentDistance = haversine(points[index - 1].point, points[index].point);
      segmentDistances.push(segmentDistance);
      distance += segmentDistance;
      if (!hasCompleteTiming) continue;
      const elapsedHours = (timestamps[index] - timestamps[index - 1]) / 3_600_000;
      const rawSpeed = Number.isFinite(elapsedHours) && elapsedHours > 0 ? segmentDistance / elapsedHours : 0;
      const speed = rawSpeed >= MOVING_SPEED_THRESHOLD ? rawSpeed : 0;
      segmentSpeeds.push(speed);
      if (speed > 0) {
        movingDistance += segmentDistance;
        movingHours += elapsedHours;
      }
    }

    const averageSpeed = movingHours > 0 ? movingDistance / movingHours : 0;
    const speedProfile = hasCompleteTiming && segmentSpeeds.length
      ? [segmentSpeeds[0], ...segmentSpeeds]
      : [];
    return { distance, averageSpeed, speedProfile };
  }

  function replaceEntryRoute(entry, gpx) {
    if (!entry || !gpx) return entry;
    entry.gpxName = gpx.gpxName || "";
    entry.stats = gpx.stats || null;
    entry.track = Array.isArray(gpx.track) ? gpx.track : [];
    entry.weather = gpx.weather || null;
    return entry;
  }

  root.CaminoGpxMotion = { analyze, replaceEntryRoute };
})(globalThis);
