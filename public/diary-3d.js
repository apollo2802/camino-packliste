import * as THREE from "https://esm.sh/three@0.180.0";
import { OrbitControls } from "https://esm.sh/three@0.180.0/examples/jsm/controls/OrbitControls.js";

const TILE_SIZE = 256;
const MAX_TILES = 24;

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
  const leftLeg = new THREE.Mesh(new THREE.CapsuleGeometry(.035, .27, 3, 6), trousers);
  const rightLeg = leftLeg.clone();
  leftLeg.position.set(-.065, .19, 0);
  rightLeg.position.set(.065, .19, 0);
  group.add(leftLeg, rightLeg);
  const leftArm = new THREE.Mesh(new THREE.CapsuleGeometry(.027, .22, 3, 6), jacket);
  const rightArm = leftArm.clone();
  leftArm.position.set(-.16, .49, 0);
  rightArm.position.set(.16, .49, -.015);
  leftArm.rotation.z = -.42;
  rightArm.rotation.z = .58;
  rightArm.rotation.x = -.36;
  group.add(leftArm, rightArm);
  const trekkingPole = new THREE.Mesh(new THREE.CylinderGeometry(.013, .019, .78, 8), poleMaterial);
  trekkingPole.position.set(.29, .31, -.12);
  trekkingPole.rotation.z = -.14;
  trekkingPole.rotation.x = -.2;
  group.add(trekkingPole);
  const poleGrip = new THREE.Mesh(new THREE.CylinderGeometry(.026, .026, .12, 8), hat);
  poleGrip.position.set(.235, .69, -.04);
  poleGrip.rotation.z = -.14;
  poleGrip.rotation.x = -.2;
  group.add(poleGrip);
  const ring = new THREE.Mesh(new THREE.RingGeometry(.22, .31, 24), white);
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = .025;
  group.add(ring);
  group.scale.setScalar(1.16);
  group.userData = { leftLeg, rightLeg, leftArm, rightArm, trekkingPole };
  return group;
}

function routeCurve(track, grid, terrainWidth, terrainDepth, baseElevation, verticalScale) {
  const points = track.map(([lat, lon, elevation]) => {
    const tile = tilePoint(lon, lat, grid.zoom);
    const u = (tile.x - grid.minX) / grid.columns;
    const v = (tile.y - grid.minY) / grid.rows;
    return new THREE.Vector3(
      (u - .5) * terrainWidth,
      (elevation - baseElevation) * verticalScale + .12,
      (v - .5) * terrainDepth
    );
  });
  return new THREE.CatmullRomCurve3(points, false, "centripetal", .18);
}

export function mountDiaryTour(root, entry, translations) {
  const canvas = root.querySelector("canvas");
  const loading = root.querySelector("[data-tour-loading]");
  const playButton = root.querySelector("[data-tour-play]");
  const progress = root.querySelector("[data-tour-progress]");
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

  async function initialize() {
    try {
      const grid = chooseTileGrid(entry.track);
      const mosaics = await buildMosaics(grid, abortController.signal);
      if (destroyed) return;
      const elevations = entry.track.map((point) => point[2]);
      const baseElevation = Math.min(...elevations) - 22;
      const elevationSpan = Math.max(50, Math.max(...elevations) - Math.min(...elevations));
      const verticalScale = Math.min(.018, 2.7 / elevationSpan);
      const terrainWidth = 12;
      const terrainDepth = terrainWidth * grid.rows / grid.columns;

      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "high-performance" });
      renderer.setPixelRatio(Math.min(2, devicePixelRatio || 1));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xdcebf2);
      scene.fog = new THREE.Fog(0xdcebf2, 17, 28);
      const camera = new THREE.PerspectiveCamera(35, 1, .1, 80);
      camera.position.set(9.7, 9.1, 11.2);
      controls = new OrbitControls(camera, canvas);
      controls.enableDamping = true;
      controls.dampingFactor = .07;
      controls.minDistance = 5;
      controls.maxDistance = 25;
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

      const curve = routeCurve(entry.track, grid, terrainWidth, terrainDepth, baseElevation, verticalScale);
      const routeBounds = new THREE.Box3().setFromPoints(curve.getPoints(160));
      const routeCenter = routeBounds.getCenter(new THREE.Vector3());
      const routeSize = routeBounds.getSize(new THREE.Vector3());
      const routeSpan = Math.max(6, routeSize.x, routeSize.z);
      controls.target.copy(routeCenter);
      camera.position.set(
        routeCenter.x + routeSpan * .82,
        routeCenter.y + routeSpan * .78,
        routeCenter.z + routeSpan * .96
      );
      controls.update();
      const segments = Math.max(280, entry.track.length * 4);
      const casing = new THREE.Mesh(new THREE.TubeGeometry(curve, segments, .105, 7, false), new THREE.MeshStandardMaterial({ color: 0xfff7e8, roughness: .7, depthTest: true }));
      casing.renderOrder = 3;
      scene.add(casing);
      const route = new THREE.Mesh(new THREE.TubeGeometry(curve, segments, .067, 7, false), new THREE.MeshStandardMaterial({ color: 0xffcd30, emissive: 0xd69816, emissiveIntensity: .08, roughness: .58, depthTest: true }));
      route.renderOrder = 4;
      scene.add(route);
      const walker = makeWalker();
      walker.position.copy(curve.getPointAt(0));
      scene.add(walker);

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
        if (playing) {
          if (!startedAt) startedAt = time;
          fraction = Math.min(1, startFraction + (time - startedAt) / 24000);
          progress.value = String(Math.round(fraction * 1000));
        }
        const point = curve.getPointAt(fraction);
        const ahead = curve.getPointAt(Math.min(1, fraction + .003));
        walker.position.copy(point);
        walker.position.y += .09;
        walker.lookAt(ahead.x, point.y, ahead.z);
        const stride = Math.sin(time / 105) * .55;
        walker.userData.leftLeg.rotation.x = stride;
        walker.userData.rightLeg.rotation.x = -stride;
        walker.userData.leftArm.rotation.x = -stride * .58;
        walker.userData.rightArm.rotation.x = -.36 + stride * .34;
        walker.userData.trekkingPole.rotation.x = -.2 + stride * .08;
        walker.position.y += Math.abs(Math.sin(time / 105)) * .025;
        if (playing) {
          const direction = ahead.clone().sub(point).normalize();
          const cameraTarget = point.clone();
          cameraTarget.y += .48;
          const desiredCamera = cameraTarget.clone()
            .addScaledVector(direction, -4.25)
            .add(new THREE.Vector3(1.45, 3.35, 0));
          camera.position.lerp(desiredCamera, .055);
          controls.target.lerp(cameraTarget, .075);
        }
        controls.update();
        renderer.render(scene, camera);
        if (playing && fraction >= 1) {
          playing = false;
          playButton.textContent = translations.replay;
          playButton.classList.remove("playing");
        }
        animationFrame = requestAnimationFrame(draw);
      }

      playButton.addEventListener("click", () => {
        if (fraction >= 1) fraction = 0;
        playing = !playing;
        startFraction = fraction;
        startedAt = 0;
        playButton.textContent = playing ? translations.pause : translations.play;
        playButton.classList.toggle("playing", playing);
      });
      progress.addEventListener("input", () => {
        fraction = Number(progress.value) / 1000;
        startFraction = fraction;
        startedAt = 0;
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
    cancelAnimationFrame(animationFrame);
    cancelAnimationFrame(resizeFrame);
    if (root._diary3dResize) window.removeEventListener("resize", root._diary3dResize);
    controls?.dispose();
    renderer?.dispose();
  };
}
