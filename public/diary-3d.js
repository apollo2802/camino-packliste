import * as THREE from "https://esm.sh/three@0.180.0";
import { OrbitControls } from "https://esm.sh/three@0.180.0/examples/jsm/controls/OrbitControls.js";

const TILE_SIZE = 256;
const MAX_TILES = 24;
// One map unit equals 0.55 km everywhere. Terrain receives the same fixed
// 1.35× vertical exaggeration for every stage, so slopes remain comparable.
const MAP_UNITS_PER_KILOMETER = .55;
const VERTICAL_EXAGGERATION = 1.35;

function metersPerTile(latitude, zoom) {
  return 40_075_016.68557849 * Math.cos(latitude * Math.PI / 180) / (2 ** zoom);
}

function tilePoint(lon, lat, zoom) {
  const scale = 2 ** zoom;
  const radians = lat * Math.PI / 180;
  return {
    x: (lon + 180) / 360 * scale,
    y: (1 - Math.asinh(Math.tan(radians)) / Math.PI) / 2 * scale
  };
}

function chooseTileGrid(track) {
  const lats = track.map((point) => point[0]);
  const lons = track.map((point) => point[1]);
  const bounds = {
    minLat: Math.min(...lats), maxLat: Math.max(...lats),
    minLon: Math.min(...lons), maxLon: Math.max(...lons)
  };
  const latPad = Math.max(.002, (bounds.maxLat - bounds.minLat) * .12);
  const lonPad = Math.max(.002, (bounds.maxLon - bounds.minLon) * .12);
  bounds.minLat -= latPad; bounds.maxLat += latPad;
  bounds.minLon -= lonPad; bounds.maxLon += lonPad;

  for (let zoom = 15; zoom >= 9; zoom -= 1) {
    const northWest = tilePoint(bounds.minLon, bounds.maxLat, zoom);
    const southEast = tilePoint(bounds.maxLon, bounds.minLat, zoom);
    const minX = Math.floor(northWest.x);
    const maxX = Math.floor(southEast.x);
    const minY = Math.floor(northWest.y);
    const maxY = Math.floor(southEast.y);
    const columns = maxX - minX + 1;
    const rows = maxY - minY + 1;
    if (columns * rows <= MAX_TILES && columns <= 6 && rows <= 6) {
      return { zoom, minX, maxX, minY, maxY, columns, rows };
    }
  }
  throw new Error("Route extent is too large");
}

function loadImage(url, signal) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    const abort = () => reject(new DOMException("Aborted", "AbortError"));
    image.onload = () => { signal?.removeEventListener("abort", abort); resolve(image); };
    image.onerror = () => reject(new Error(`Image failed: ${url}`));
    signal?.addEventListener("abort", abort, { once: true });
    image.src = url;
  });
}

function decodeTerrarium(data, offset) {
  return data[offset] * 256 + data[offset + 1] + data[offset + 2] / 256 - 32768;
}

async function buildMosaics(grid, signal) {
  const width = grid.columns * TILE_SIZE;
  const height = grid.rows * TILE_SIZE;
  const mapCanvas = document.createElement("canvas");
  const demCanvas = document.createElement("canvas");
  mapCanvas.width = demCanvas.width = width;
  mapCanvas.height = demCanvas.height = height;
  const mapContext = mapCanvas.getContext("2d");
  const demContext = demCanvas.getContext("2d", { willReadFrequently: true });
  mapContext.fillStyle = "#d8dfc8";
  mapContext.fillRect(0, 0, width, height);
  demContext.fillStyle = "rgb(128,0,0)";
  demContext.fillRect(0, 0, width, height);

  const jobs = [];
  for (let y = grid.minY; y <= grid.maxY; y += 1) {
    for (let x = grid.minX; x <= grid.maxX; x += 1) {
      const dx = (x - grid.minX) * TILE_SIZE;
      const dy = (y - grid.minY) * TILE_SIZE;
      jobs.push(Promise.allSettled([
        loadImage(`https://a.tile.opentopomap.org/${grid.zoom}/${x}/${y}.png`, signal),
        loadImage(`https://s3.amazonaws.com/elevation-tiles-prod/terrarium/${grid.zoom}/${x}/${y}.png`, signal)
      ]).then(([map, dem]) => {
        if (map.status === "fulfilled") mapContext.drawImage(map.value, dx, dy, TILE_SIZE, TILE_SIZE);
        if (dem.status === "fulfilled") demContext.drawImage(dem.value, dx, dy, TILE_SIZE, TILE_SIZE);
      }));
    }
  }
  await Promise.all(jobs);
  return { mapCanvas, demCanvas, demPixels: demContext.getImageData(0, 0, width, height), width, height };
}

function makeWalker() {
  const group = new THREE.Group();
  const jacket = new THREE.MeshStandardMaterial({ color: 0xf2b134, roughness: .75 });
  const trousers = new THREE.MeshStandardMaterial({ color: 0x243746, roughness: .82 });
  const backpack = new THREE.MeshStandardMaterial({ color: 0xb83b3b, roughness: .8 });
  const skin = new THREE.MeshStandardMaterial({ color: 0xc98c6b, roughness: .8 });
  const hat = new THREE.MeshStandardMaterial({ color: 0x2d5b4c, roughness: .82 });
  const poleMaterial = new THREE.MeshStandardMaterial({ color: 0x5b4635, roughness: .88 });
  const white = new THREE.MeshBasicMaterial({ color: 0xfff7e8, transparent: true, opacity: .92 });

  const body = new THREE.Mesh(new THREE.CapsuleGeometry(.13, .26, 4, 8), jacket);
  body.position.y = .48;
  group.add(body);
  const pack = new THREE.Mesh(new THREE.BoxGeometry(.22, .3, .13), backpack);
  pack.position.set(0, .5, .12);
  group.add(pack);
  const head = new THREE.Mesh(new THREE.SphereGeometry(.105, 12, 8), skin);
  head.position.y = .83;
  group.add(head);
  const brim = new THREE.Mesh(new THREE.CylinderGeometry(.16, .16, .035, 16), hat);
  brim.position.y = .91;
  group.add(brim);
  const crown = new THREE.Mesh(new THREE.CylinderGeometry(.1, .12, .1, 16), hat);
  crown.position.y = .96;
  group.add(crown);
  const legGeometry = new THREE.CapsuleGeometry(.035, .27, 3, 6);
  const leftLeg = new THREE.Group();
  const rightLeg = new THREE.Group();
  const leftLegMesh = new THREE.Mesh(legGeometry, trousers);
  const rightLegMesh = leftLegMesh.clone();
  leftLegMesh.position.y = rightLegMesh.position.y = -.17;
  leftLeg.position.set(-.065, .35, 0);
  rightLeg.position.set(.065, .35, 0);
  leftLeg.add(leftLegMesh);
  rightLeg.add(rightLegMesh);
  group.add(leftLeg, rightLeg);
  const armGeometry = new THREE.CapsuleGeometry(.027, .22, 3, 6);
  const leftArm = new THREE.Group();
  const rightArm = new THREE.Group();
  const leftArmMesh = new THREE.Mesh(armGeometry, jacket);
  const rightArmMesh = leftArmMesh.clone();
  leftArmMesh.position.y = rightArmMesh.position.y = -.13;
  leftArm.position.set(-.14, .62, 0);
  rightArm.position.set(.14, .62, -.015);
  leftArm.rotation.z = -.28;
  rightArm.rotation.z = .34;
  rightArm.rotation.x = -.22;
  leftArm.add(leftArmMesh);
  rightArm.add(rightArmMesh);
  group.add(leftArm, rightArm);
  const trekkingPole = new THREE.Group();
  trekkingPole.position.set(.25, .67, -.08);
  trekkingPole.rotation.z = -.12;
  trekkingPole.rotation.x = -.18;
  const poleShaft = new THREE.Mesh(new THREE.CylinderGeometry(.013, .019, .78, 8), poleMaterial);
  poleShaft.position.y = -.39;
  trekkingPole.add(poleShaft);
  group.add(trekkingPole);
  const poleGrip = new THREE.Mesh(new THREE.CylinderGeometry(.026, .026, .12, 8), hat);
  poleGrip.position.y = .015;
  trekkingPole.add(poleGrip);
  const ring = new THREE.Mesh(new THREE.RingGeometry(.22, .31, 24), white);
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = .025;
  group.add(ring);
  group.scale.setScalar(.928);
  group.userData = { leftLeg, rightLeg, leftArm, rightArm, trekkingPole };
  return group;
}

function makeElevationHud(elevations) {
  const canvas = document.createElement("canvas");
  canvas.width = 768;
  canvas.height = 192;
  const context = canvas.getContext("2d");
  const min = Math.min(...elevations);
  const max = Math.max(...elevations);
  const span = Math.max(1, max - min);
  const left = 34;
  const right = 734;
  const top = 24;
  const bottom = 158;
  let displayedFraction = -1;

  function profilePoint(index) {
    const x = left + index / Math.max(1, elevations.length - 1) * (right - left);
    const y = top + (max - elevations[index]) / span * (bottom - top);
    return [x, y];
  }

  function update(fraction) {
    const clamped = Math.max(0, Math.min(1, fraction));
    if (Math.abs(clamped - displayedFraction) < .0005) return;
    displayedFraction = clamped;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "rgba(255,247,232,.94)";
    context.beginPath();
    context.roundRect(8, 8, 752, 176, 30);
    context.fill();
    context.beginPath();
    elevations.forEach((_, index) => {
      const [x, y] = profilePoint(index);
      if (!index) context.moveTo(x, y);
      else context.lineTo(x, y);
    });
    context.lineTo(right, bottom);
    context.lineTo(left, bottom);
    context.closePath();
    context.fillStyle = "rgba(227,174,59,.2)";
    context.fill();
    context.beginPath();
    elevations.forEach((_, index) => {
      const [x, y] = profilePoint(index);
      if (!index) context.moveTo(x, y);
      else context.lineTo(x, y);
    });
    context.strokeStyle = "#d9a72d";
    context.lineWidth = 4;
    context.lineJoin = "round";
    context.stroke();
    const scaled = clamped * (elevations.length - 1);
    const index = Math.min(elevations.length - 2, Math.floor(scaled));
    const mix = scaled - index;
    const elevation = elevations[index] + (elevations[index + 1] - elevations[index]) * mix;
    const markerX = left + clamped * (right - left);
    const markerY = top + (max - elevation) / span * (bottom - top);
    context.beginPath();
    context.arc(markerX, markerY, 14, 0, Math.PI * 2);
    context.fillStyle = "rgba(232,74,42,.2)";
    context.fill();
    context.beginPath();
    context.arc(markerX, markerY, 7, 0, Math.PI * 2);
    context.fillStyle = "#e84a2a";
    context.fill();
    context.strokeStyle = "#fff7e8";
    context.lineWidth = 4;
    context.stroke();
  }

  update(0);
  return { canvas, update };
}

function terrainElevationAt(lat, lon, grid, mosaics) {
  const tile = tilePoint(lon, lat, grid.zoom);
  const u = Math.max(0, Math.min(1, (tile.x - grid.minX) / grid.columns));
  const v = Math.max(0, Math.min(1, (tile.y - grid.minY) / grid.rows));
  const x = Math.round(u * (mosaics.width - 1));
  const y = Math.round(v * (mosaics.height - 1));
  const elevation = decodeTerrarium(mosaics.demPixels.data, (y * mosaics.width + x) * 4);
  return elevation > -500 && elevation < 9000 ? elevation : null;
}

function routeCurve(track, grid, terrainWidth, terrainDepth, baseElevation, verticalScale, mosaics) {
  const points = track.map(([lat, lon, gpxElevation]) => {
    const tile = tilePoint(lon, lat, grid.zoom);
    const u = (tile.x - grid.minX) / grid.columns;
    const v = (tile.y - grid.minY) / grid.rows;
    const terrainElevation = terrainElevationAt(lat, lon, grid, mosaics) ?? gpxElevation;
    return new THREE.Vector3(
      (u - .5) * terrainWidth,
      (terrainElevation - baseElevation) * verticalScale + .018,
      (v - .5) * terrainDepth
    );
  });
  return new THREE.CatmullRomCurve3(points, false, "centripetal", .18);
}

function makeTrailTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 256;
  const context = canvas.getContext("2d");
  context.fillStyle = "#a98961";
  context.fillRect(0, 0, 128, 256);
  const earthGradient = context.createLinearGradient(0, 0, 128, 0);
  earthGradient.addColorStop(0, "#71583f");
  earthGradient.addColorStop(.12, "#987650");
  earthGradient.addColorStop(.32, "#b89a70");
  earthGradient.addColorStop(.68, "#b89a70");
  earthGradient.addColorStop(.88, "#987650");
  earthGradient.addColorStop(1, "#71583f");
  context.fillStyle = earthGradient;
  context.fillRect(0, 0, 128, 256);
  for (let index = 0; index < 90; index += 1) {
    const x = 14 + ((index * 47) % 100);
    const y = (index * 83) % 256;
    const radius = 1 + (index % 4) * .55;
    context.beginPath();
    context.ellipse(x, y, radius * 1.6, radius, (index % 7) * .31, 0, Math.PI * 2);
    context.fillStyle = index % 3 ? "rgba(237,220,181,.38)" : "rgba(80,59,42,.26)";
    context.fill();
  }
  context.strokeStyle = "rgba(255,205,48,.92)";
  context.lineWidth = 4;
  context.setLineDash([22, 18]);
  context.beginPath();
  context.moveTo(64, 0);
  context.lineTo(64, 256);
  context.stroke();
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 8;
  return texture;
}

function makeTrailGeometry(curve, segments, width) {
  const positions = [];
  const uvs = [];
  const indices = [];
  const side = new THREE.Vector3();
  for (let index = 0; index <= segments; index += 1) {
    const fraction = index / segments;
    const point = curve.getPointAt(fraction);
    const tangent = curve.getTangentAt(fraction);
    side.set(-tangent.z, 0, tangent.x).normalize();
    const irregularWidth = width * (1 + Math.sin(index * 1.71) * .055 + Math.sin(index * .37) * .035);
    const left = point.clone().addScaledVector(side, irregularWidth * .5);
    const right = point.clone().addScaledVector(side, -irregularWidth * .5);
    positions.push(left.x, left.y, left.z, right.x, right.y, right.z);
    const textureProgress = fraction * 24;
    uvs.push(0, textureProgress, 1, textureProgress);
    if (index < segments) {
      const offset = index * 2;
      indices.push(offset, offset + 2, offset + 1, offset + 1, offset + 2, offset + 3);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

export function mountDiaryTour(root, entry, translations) {
  const canvas = root.querySelector("canvas");
  const loading = root.querySelector("[data-tour-loading]");
  const playButton = root.querySelector("[data-tour-play]");
  const progress = root.querySelector("[data-tour-progress]");
  const speedButton = root.querySelector("[data-tour-speed]");
  const resetButton = root.querySelector("[data-tour-reset]");
  const fullscreenButton = root.querySelector("[data-tour-fullscreen]");
  const fullscreenLabel = root.querySelector("[data-tour-fullscreen-label]");
  const menuToggle = root.querySelector("[data-tour-menu-toggle]");
  const menuPanel = root.querySelector("[data-tour-menu-panel]");
  const followCamera = root.querySelector("[data-tour-follow]");
  const exportButton = root.querySelector("[data-tour-export]");
  const downloadLink = root.querySelector("[data-tour-download]");
  const diaryEntry = root.closest(".diary-entry");
  const elevationProfile = diaryEntry?.querySelector("[data-elevation-profile]");
  const elevationMarkers = [...(diaryEntry?.querySelectorAll("[data-elevation-marker]") || [])];
  const profileElevations = entry.track.map((point) => Number(point[2]) || 0);
  const profileMin = Math.min(...profileElevations);
  const profileMax = Math.max(...profileElevations);
  const profileSpan = Math.max(1, profileMax - profileMin);
  const abortController = new AbortController();
  let destroyed = false;
  let renderer;
  let controls;
  let animationFrame = 0;
  let resizeFrame = 0;
  let playing = false;
  let fraction = 0;
  let startedAt = 0;
  let startFraction = 0;
  let playbackRate = 1;
  let exporting = false;
  let activeRecorder = null;
  let readyExport = null;
  let exportSurface = null;
  let exportContext = null;
  const exportDate = (() => {
    const date = new Date(`${entry.date}T12:00:00`);
    if (Number.isNaN(date.getTime())) return entry.date || "";
    return new Intl.DateTimeFormat(document.documentElement.lang || "de", { day: "2-digit", month: "long", year: "numeric" }).format(date);
  })();
  const exportRoute = [entry.from, entry.to].filter(Boolean).join(" → ") || entry.title || "Camino";
  const setPlayButtonLabel = (label) => {
    playButton.setAttribute("aria-label", label);
    playButton.setAttribute("title", label);
  };

  function updateElevationMarker(value) {
    if (!elevationMarkers.length || entry.track.length < 2) return;
    const clamped = Math.max(0, Math.min(1, value));
    const scaled = clamped * (entry.track.length - 1);
    const index = Math.min(entry.track.length - 2, Math.floor(scaled));
    const mix = scaled - index;
    const elevation = profileElevations[index] + (profileElevations[index + 1] - profileElevations[index]) * mix;
    const x = clamped * 640;
    const y = 6 + (profileMax - elevation) / profileSpan * 58;
    elevationMarkers.forEach((marker) => {
      marker.setAttribute("cx", x.toFixed(1));
      marker.setAttribute("cy", y.toFixed(1));
    });
    elevationProfile?.setAttribute("aria-valuenow", String(Math.round(clamped * 100)));
    elevationProfile?.setAttribute("aria-valuetext", `${Math.round(clamped * 100)}%`);
  }

  async function initialize() {
    try {
      const grid = chooseTileGrid(entry.track);
      const mosaics = await buildMosaics(grid, abortController.signal);
      if (destroyed) return;
      const elevations = entry.track.map((point) => point[2]);
      const averageLatitude = entry.track.reduce((sum, point) => sum + point[0], 0) / entry.track.length;
      const baseElevation = Math.min(...elevations) - 22;
      const horizontalUnitsPerMeter = MAP_UNITS_PER_KILOMETER / 1000;
      const verticalScale = horizontalUnitsPerMeter * VERTICAL_EXAGGERATION;
      const tileLengthKilometers = metersPerTile(averageLatitude, grid.zoom) / 1000;
      const terrainWidth = grid.columns * tileLengthKilometers * MAP_UNITS_PER_KILOMETER;
      const terrainDepth = grid.rows * tileLengthKilometers * MAP_UNITS_PER_KILOMETER;
      const terrainSpan = Math.max(terrainWidth, terrainDepth);

      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "high-performance" });
      renderer.setPixelRatio(Math.min(2, devicePixelRatio || 1));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xdcebf2);
      scene.fog = new THREE.Fog(0xdcebf2, 17, 28);
      const camera = new THREE.PerspectiveCamera(35, 1, .1, 80);
      scene.add(camera);
      camera.position.set(9.7, 9.1, 11.2);
      controls = new OrbitControls(camera, canvas);
      controls.enableDamping = true;
      controls.dampingFactor = .07;
      controls.minDistance = Math.max(.55, terrainSpan * .25);
      controls.maxDistance = Math.max(8, terrainSpan * 2.4);
      controls.maxPolarAngle = Math.PI * .47;
      controls.target.set(0, .35, 0);

      scene.add(new THREE.HemisphereLight(0xf5fafc, 0x8c977e, 1.15));
      const sun = new THREE.DirectionalLight(0xfff4de, 1.25);
      sun.position.set(-6, 12, 8);
      sun.castShadow = true;
      scene.add(sun);

      const texture = new THREE.CanvasTexture(mosaics.mapCanvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
      const geometry = new THREE.PlaneGeometry(terrainWidth, terrainDepth, 110, Math.max(60, Math.round(110 * grid.rows / grid.columns)));
      const positions = geometry.attributes.position;
      for (let index = 0; index < positions.count; index += 1) {
        const u = positions.getX(index) / terrainWidth + .5;
        const v = .5 - positions.getY(index) / terrainDepth;
        const x = Math.max(0, Math.min(mosaics.width - 1, Math.round(u * (mosaics.width - 1))));
        const y = Math.max(0, Math.min(mosaics.height - 1, Math.round(v * (mosaics.height - 1))));
        const elevation = decodeTerrarium(mosaics.demPixels.data, (y * mosaics.width + x) * 4);
        const safeElevation = elevation > -500 && elevation < 9000 ? elevation : baseElevation;
        positions.setZ(index, (safeElevation - baseElevation) * verticalScale);
      }
      geometry.computeVertexNormals();
      geometry.rotateX(-Math.PI / 2);
      const terrain = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ map: texture, roughness: .91, metalness: 0 }));
      terrain.receiveShadow = true;
      scene.add(terrain);

      const curve = routeCurve(entry.track, grid, terrainWidth, terrainDepth, baseElevation, verticalScale, mosaics);
      const routeBounds = new THREE.Box3().setFromPoints(curve.getPoints(160));
      const routeCenter = routeBounds.getCenter(new THREE.Vector3());
      const routeSize = routeBounds.getSize(new THREE.Vector3());
      const routeSpan = Math.max(terrainSpan * .9, routeSize.x, routeSize.z);
      controls.target.copy(routeCenter);
      camera.position.set(
        routeCenter.x + routeSpan * .82,
        routeCenter.y + routeSpan * .78,
        routeCenter.z + routeSpan * .96
      );
      controls.update();
      const overviewCameraPosition = camera.position.clone();
      const overviewTarget = controls.target.clone();
      const segments = Math.max(280, entry.track.length * 4);
      const trail = new THREE.Mesh(
        makeTrailGeometry(curve, segments, .25),
        new THREE.MeshStandardMaterial({ map: makeTrailTexture(), roughness: .96, metalness: 0, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: -1 })
      );
      trail.renderOrder = 3;
      trail.receiveShadow = true;
      scene.add(trail);
      const walker = makeWalker();
      walker.scale.multiplyScalar(Math.max(.35, Math.min(.928, terrainSpan * .15)) * .5);
      walker.position.copy(curve.getPointAt(0));
      scene.add(walker);
      const elevationHud = makeElevationHud(profileElevations);
      const upAxis = new THREE.Vector3(0, 1, 0);
      const targetWalkerQuaternion = new THREE.Quaternion();
      const smoothedDirection = curve.getTangentAt(0);
      smoothedDirection.y = 0;
      smoothedDirection.normalize();
      const smoothedCameraDirection = smoothedDirection.clone();
      const cameraSide = new THREE.Vector3();
      const cameraLift = new THREE.Vector3(0, Math.max(.9, terrainSpan * .29), 0);
      targetWalkerQuaternion.setFromAxisAngle(upAxis, Math.atan2(smoothedDirection.x, smoothedDirection.z) + Math.PI);
      walker.quaternion.copy(targetWalkerQuaternion);
      let previousFrameTime = 0;

      function composeExportFrame() {
        if (!exportContext || !exportSurface) return;
        exportContext.clearRect(0, 0, exportSurface.width, exportSurface.height);
        exportContext.drawImage(canvas, 0, 0, 1080, 1080);
        const headerGradient = exportContext.createLinearGradient(0, 0, 0, 250);
        headerGradient.addColorStop(0, "rgba(5,34,32,.9)");
        headerGradient.addColorStop(1, "rgba(5,34,32,0)");
        exportContext.fillStyle = headerGradient;
        exportContext.fillRect(0, 0, 1080, 270);
        exportContext.fillStyle = "#ffcd30";
        exportContext.font = "700 28px system-ui, sans-serif";
        exportContext.fillText(exportDate.toUpperCase(), 66, 78);
        exportContext.fillStyle = "#fff7e8";
        exportContext.font = "700 48px Georgia, serif";
        exportContext.fillText(exportRoute, 66, 142, 948);
        if (entry.stats?.distance) {
          exportContext.fillStyle = "rgba(255,247,232,.82)";
          exportContext.font = "600 25px system-ui, sans-serif";
          exportContext.fillText(`${Number(entry.stats.distance).toLocaleString(document.documentElement.lang || "de", { maximumFractionDigits: 1 })} km`, 66, 188);
        }
        exportContext.drawImage(elevationHud.canvas, 54, 810, 972, 243);
      }

      function resize() {
        const rect = canvas.getBoundingClientRect();
        const width = Math.max(320, Math.round(rect.width));
        const height = Math.max(250, Math.round(rect.height));
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }

      function draw(time = 0) {
        if (destroyed) return;
        const deltaSeconds = previousFrameTime ? Math.min(.05, Math.max(.001, (time - previousFrameTime) / 1000)) : 1 / 60;
        previousFrameTime = time;
        if (playing) {
          if (!startedAt) startedAt = time;
          fraction = Math.min(1, startFraction + (time - startedAt) / (24000 / playbackRate));
          progress.value = String(Math.round(fraction * 1000));
        }
        updateElevationMarker(fraction);
        const point = curve.getPointAt(fraction);
        const direction = curve.getTangentAt(fraction);
        direction.y = 0;
        direction.normalize();
        smoothedDirection.lerp(direction, 1 - Math.exp(-5.5 * deltaSeconds)).normalize();
        smoothedCameraDirection.lerp(direction, 1 - Math.exp(-2.4 * deltaSeconds)).normalize();
        walker.position.copy(point);
        walker.position.y += .09;
        const routeHeading = Math.atan2(smoothedDirection.x, smoothedDirection.z);
        targetWalkerQuaternion.setFromAxisAngle(upAxis, routeHeading + Math.PI);
        walker.quaternion.slerp(targetWalkerQuaternion, 1 - Math.exp(-12 * deltaSeconds));
        const stride = Math.sin(time / 175) * .38;
        walker.userData.leftLeg.rotation.x = stride;
        walker.userData.rightLeg.rotation.x = -stride;
        walker.userData.leftArm.rotation.x = -stride * .72;
        walker.userData.rightArm.rotation.x = -.22 + stride * .48;
        walker.userData.trekkingPole.rotation.x = -.18 + stride * .18;
        walker.position.y += Math.abs(Math.sin(time / 175)) * .018;
        if (exporting) elevationHud.update(fraction);
        if (playing && followCamera?.checked) {
          const cameraTarget = point.clone().addScaledVector(smoothedCameraDirection, .3 * playbackRate);
          cameraTarget.y += .48;
          cameraSide.set(smoothedCameraDirection.z, 0, -smoothedCameraDirection.x).multiplyScalar(1.15);
          const desiredCamera = cameraTarget.clone()
            .addScaledVector(smoothedCameraDirection, -4.5)
            .add(cameraSide)
            .add(cameraLift);
          camera.position.lerp(desiredCamera, 1 - Math.exp(-1.55 * deltaSeconds));
          controls.target.lerp(cameraTarget, 1 - Math.exp(-3.4 * deltaSeconds));
        }
        controls.update();
        renderer.render(scene, camera);
        if (exporting) composeExportFrame();
        if (playing && fraction >= 1) {
          playing = false;
          setPlayButtonLabel(translations.replay);
          playButton.classList.remove("playing");
          if (exporting && activeRecorder?.state === "recording") activeRecorder.stop();
        }
        animationFrame = requestAnimationFrame(draw);
      }

      playButton.addEventListener("click", () => {
        if (fraction >= 1) fraction = 0;
        playing = !playing;
        startFraction = fraction;
        startedAt = 0;
        setPlayButtonLabel(playing ? translations.pause : translations.play);
        playButton.classList.toggle("playing", playing);
      });
      progress.addEventListener("input", () => {
        fraction = Number(progress.value) / 1000;
        startFraction = fraction;
        startedAt = 0;
      });
      const setProfileFraction = (value, pause = false) => {
        fraction = Math.max(0, Math.min(1, value));
        startFraction = fraction;
        startedAt = 0;
        progress.value = String(Math.round(fraction * 1000));
        updateElevationMarker(fraction);
        if (pause && playing) {
          playing = false;
          setPlayButtonLabel(translations.play);
          playButton.classList.remove("playing");
        }
      };
      const profileValueFromEvent = (event) => {
        const rect = elevationProfile.getBoundingClientRect();
        return (event.clientX - rect.left) / Math.max(1, rect.width);
      };
      let activeProfilePointer = null;
      const onProfilePointerDown = (event) => {
        activeProfilePointer = event.pointerId;
        elevationProfile.setPointerCapture?.(event.pointerId);
        setProfileFraction(profileValueFromEvent(event), true);
      };
      const onProfilePointerMove = (event) => {
        if (event.pointerId === activeProfilePointer) setProfileFraction(profileValueFromEvent(event), true);
      };
      const onProfilePointerEnd = (event) => {
        if (event.pointerId !== activeProfilePointer) return;
        elevationProfile.releasePointerCapture?.(event.pointerId);
        activeProfilePointer = null;
      };
      const onProfileKeyDown = (event) => {
        const increment = event.shiftKey ? .1 : .02;
        if (event.key === "Home") setProfileFraction(0, true);
        else if (event.key === "End") setProfileFraction(1, true);
        else if (["ArrowLeft", "ArrowDown"].includes(event.key)) setProfileFraction(fraction - increment, true);
        else if (["ArrowRight", "ArrowUp"].includes(event.key)) setProfileFraction(fraction + increment, true);
        else return;
        event.preventDefault();
      };
      elevationProfile?.addEventListener("pointerdown", onProfilePointerDown);
      elevationProfile?.addEventListener("pointermove", onProfilePointerMove);
      elevationProfile?.addEventListener("pointerup", onProfilePointerEnd);
      elevationProfile?.addEventListener("pointercancel", onProfilePointerEnd);
      elevationProfile?.addEventListener("keydown", onProfileKeyDown);
      root._diaryElevationProfileCleanup = () => {
        elevationProfile?.removeEventListener("pointerdown", onProfilePointerDown);
        elevationProfile?.removeEventListener("pointermove", onProfilePointerMove);
        elevationProfile?.removeEventListener("pointerup", onProfilePointerEnd);
        elevationProfile?.removeEventListener("pointercancel", onProfilePointerEnd);
        elevationProfile?.removeEventListener("keydown", onProfileKeyDown);
      };
      speedButton?.addEventListener("click", () => {
        playbackRate = playbackRate === 1 ? 2 : 1;
        speedButton.textContent = `${playbackRate}×`;
        speedButton.setAttribute("aria-pressed", String(playbackRate === 2));
        if (playing) {
          startFraction = fraction;
          startedAt = 0;
        }
      });
      const setMenuOpen = (open) => {
        if (!menuToggle || !menuPanel) return;
        menuToggle.setAttribute("aria-expanded", String(open));
        menuPanel.hidden = !open;
      };
      const onMenuPointerDown = (event) => {
        if (!root.querySelector(".diary-tour-menu")?.contains(event.target)) setMenuOpen(false);
      };
      const onMenuKeyDown = (event) => {
        if (event.key === "Escape") setMenuOpen(false);
      };
      menuToggle?.addEventListener("click", () => setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true"));
      document.addEventListener("pointerdown", onMenuPointerDown);
      document.addEventListener("keydown", onMenuKeyDown);
      root._diaryMenuPointerDown = onMenuPointerDown;
      root._diaryMenuKeyDown = onMenuKeyDown;
      resetButton?.addEventListener("click", () => {
        setMenuOpen(false);
        if (followCamera) followCamera.checked = false;
        camera.position.copy(overviewCameraPosition);
        controls.target.copy(overviewTarget);
        controls.update();
      });
      const onFullscreenChange = () => {
        const active = document.fullscreenElement === root;
        if (fullscreenButton) {
          const label = active ? translations.exitFullscreen : translations.fullscreen;
          fullscreenButton.setAttribute("aria-label", label);
          fullscreenButton.setAttribute("title", label);
          if (fullscreenLabel) fullscreenLabel.textContent = label;
        }
        window.requestAnimationFrame(resize);
      };
      if (!root.requestFullscreen || !document.exitFullscreen) {
        if (fullscreenButton) fullscreenButton.hidden = true;
      } else {
        fullscreenButton?.addEventListener("click", async () => {
          setMenuOpen(false);
          if (document.fullscreenElement === root) await document.exitFullscreen();
          else await root.requestFullscreen();
        });
        document.addEventListener("fullscreenchange", onFullscreenChange);
        root._diaryFullscreenChange = onFullscreenChange;
      }

      exportButton?.addEventListener("click", async () => {
        setMenuOpen(false);
        if (exporting) return;
        if (readyExport) {
          const link = document.createElement("a");
          link.href = readyExport.url;
          link.download = readyExport.filename;
          link.style.display = "none";
          document.body.append(link);
          link.click();
          link.remove();
          URL.revokeObjectURL(readyExport.url);
          readyExport = null;
          exportButton.textContent = translations.export;
          return;
        }
        if (!canvas.captureStream || typeof MediaRecorder === "undefined") {
          exportButton.textContent = translations.exportError;
          window.setTimeout(() => { exportButton.textContent = translations.export; }, 2600);
          return;
        }
        const mimeTypes = [
          "video/mp4;codecs=avc1.42E01E",
          "video/webm;codecs=vp9",
          "video/webm;codecs=vp8",
          "video/webm"
        ];
        const mimeType = mimeTypes.find((type) => MediaRecorder.isTypeSupported(type)) || "";
        const previous = {
          fraction,
          cameraPosition: camera.position.clone(),
          target: controls.target.clone(),
          follow: followCamera?.checked,
          walkerScale: walker.scale.clone()
        };
        const chunks = [];
        try {
          exporting = true;
          exportButton.disabled = true;
          exportButton.textContent = translations.exporting;
          playButton.disabled = true;
          if (followCamera) {
            followCamera.disabled = true;
          }
          if (speedButton) speedButton.disabled = true;
          renderer.setPixelRatio(1);
          renderer.setSize(1080, 1080, false);
          camera.aspect = 1;
          camera.updateProjectionMatrix();
          elevationHud.update(0);
          fraction = 0;
          startFraction = 0;
          startedAt = 0;
          previousFrameTime = 0;
          const exportStartPoint = curve.getPointAt(0);
          const exportStartDirection = curve.getTangentAt(0);
          exportStartDirection.y = 0;
          exportStartDirection.normalize();
          smoothedDirection.copy(exportStartDirection);
          smoothedCameraDirection.copy(exportStartDirection);
          targetWalkerQuaternion.setFromAxisAngle(upAxis, Math.atan2(smoothedDirection.x, smoothedDirection.z) + Math.PI);
          walker.quaternion.copy(targetWalkerQuaternion);
          walker.scale.copy(previous.walkerScale).multiplyScalar(.5);
          const exportCameraTarget = exportStartPoint.clone().addScaledVector(smoothedCameraDirection, .3 * playbackRate);
          exportCameraTarget.y += .48;
          if (followCamera?.checked) {
            cameraSide.set(smoothedCameraDirection.z, 0, -smoothedCameraDirection.x).multiplyScalar(1.15);
            camera.position.copy(exportCameraTarget).addScaledVector(smoothedCameraDirection, -4.5).add(cameraSide).add(cameraLift);
            controls.target.copy(exportCameraTarget);
          } else {
            camera.position.copy(previous.cameraPosition);
            controls.target.copy(previous.target);
          }
          controls.update();
          exportSurface = document.createElement("canvas");
          exportSurface.width = 1080;
          exportSurface.height = 1080;
          exportContext = exportSurface.getContext("2d");
          renderer.render(scene, camera);
          composeExportFrame();
          const stream = exportSurface.captureStream(30);
          activeRecorder = new MediaRecorder(stream, mimeType ? { mimeType, videoBitsPerSecond: 8_000_000 } : undefined);
          activeRecorder.addEventListener("dataavailable", (event) => {
            if (event.data?.size) chunks.push(event.data);
          });
          const finished = new Promise((resolve, reject) => {
            activeRecorder.addEventListener("stop", resolve, { once: true });
            activeRecorder.addEventListener("error", reject, { once: true });
          });
          activeRecorder.start(250);
          playing = true;
          setPlayButtonLabel(translations.pause);
          playButton.classList.add("playing");
          await finished;
          const actualType = activeRecorder.mimeType || mimeType || "video/webm";
          const extension = actualType.includes("mp4") ? "mp4" : "webm";
          const blob = new Blob(chunks, { type: actualType });
          if (!blob.size) throw new Error("Recorded video is empty");
          const url = URL.createObjectURL(blob);
          const safeTitle = String(entry.title || "camino-etappe").toLowerCase().replace(/[^a-z0-9äöüß]+/gi, "-").replace(/^-|-$/g, "");
          readyExport = {
            url,
            filename: `${entry.date || "camino"}-${safeTitle || "etappe"}-3d.${extension}`
          };
          downloadLink.href = readyExport.url;
          downloadLink.download = readyExport.filename;
          downloadLink.hidden = false;
          exportButton.hidden = true;
        } catch (error) {
          console.warn("Camino diary video export failed", error);
          exportButton.textContent = translations.exportError;
          await new Promise((resolve) => window.setTimeout(resolve, 2200));
        } finally {
          exporting = false;
          exportSurface = null;
          exportContext = null;
          activeRecorder = null;
          playing = false;
          fraction = previous.fraction;
          startFraction = fraction;
          startedAt = 0;
          walker.scale.copy(previous.walkerScale);
          progress.value = String(Math.round(fraction * 1000));
          camera.position.copy(previous.cameraPosition);
          controls.target.copy(previous.target);
          if (followCamera) {
            followCamera.checked = previous.follow;
            followCamera.disabled = false;
          }
          playButton.disabled = false;
          if (speedButton) speedButton.disabled = false;
          setPlayButtonLabel(fraction >= 1 ? translations.replay : translations.play);
          playButton.classList.remove("playing");
          exportButton.disabled = false;
          exportButton.textContent = readyExport ? translations.exportReady : translations.export;
          renderer.setPixelRatio(Math.min(2, devicePixelRatio || 1));
          resize();
        }
      });
      downloadLink?.addEventListener("click", () => {
        setMenuOpen(false);
        const completedExport = readyExport;
        window.setTimeout(() => {
          if (completedExport) URL.revokeObjectURL(completedExport.url);
          if (readyExport === completedExport) readyExport = null;
          downloadLink.hidden = true;
          downloadLink.removeAttribute("href");
          exportButton.hidden = false;
          exportButton.textContent = translations.export;
        }, 30000);
      });
      const onResize = () => {
        cancelAnimationFrame(resizeFrame);
        resizeFrame = requestAnimationFrame(resize);
      };
      window.addEventListener("resize", onResize, { passive: true });
      root._diary3dResize = onResize;
      resize();
      loading.hidden = true;
      draw();
    } catch (error) {
      if (error?.name === "AbortError" || destroyed) return;
      console.warn("Camino diary 3D map failed", error);
      loading.textContent = translations.error;
      loading.classList.add("error");
    }
  }

  initialize();
  return () => {
    destroyed = true;
    abortController.abort();
    if (activeRecorder?.state === "recording") activeRecorder.stop();
    if (readyExport) URL.revokeObjectURL(readyExport.url);
    cancelAnimationFrame(animationFrame);
    cancelAnimationFrame(resizeFrame);
    if (root._diary3dResize) window.removeEventListener("resize", root._diary3dResize);
    if (root._diaryFullscreenChange) document.removeEventListener("fullscreenchange", root._diaryFullscreenChange);
    if (root._diaryMenuPointerDown) document.removeEventListener("pointerdown", root._diaryMenuPointerDown);
    if (root._diaryMenuKeyDown) document.removeEventListener("keydown", root._diaryMenuKeyDown);
    root._diaryElevationProfileCleanup?.();
    controls?.dispose();
    renderer?.dispose();
  };
}
