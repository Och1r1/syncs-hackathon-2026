/**
 * Fanorona — 3D board renderer
 * ------------------------------------------------------------------
 * Draws the carved board from assets/fanorona_html5.glb and stands the
 * playing stones on it. All rules, turn handling and the AI stay in
 * game2.html; this file only *renders* that state and forwards pointer
 * intent back through the window.FANORONA bridge.
 *
 * The .glb is a Tripo scan of a wooden board object — the Fanorona grid
 * is not painted on it, so the lines are drawn as geometry just above
 * the surface. If the model or WebGL is unavailable the page silently
 * falls back to the flat SVG diagram, which is fully playable.
 * ------------------------------------------------------------------
 */

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

const G = window.FANORONA;
window.__FANORONA_3D = "loading";
const MODEL_URL = "assets/fanorona_html5.glb";
const DRACO_PATH =
  "https://cdn.jsdelivr.net/npm/three@0.169.0/examples/jsm/libs/draco/";

/* ---- calibration -------------------------------------------------
   The model is ~0.98 × 0.60 × 0.14 in its own units and stands upright,
   so it is scaled up, laid flat, and centred. INSET is the share of the
   top face the 9×5 grid occupies — nudge it if you swap the model. */
const SCALE = 10;
const INSET = 0.86;

const stage = document.getElementById("stage3d");
const canvas = document.getElementById("canvas3d");
const msg = document.getElementById("stage3dMsg");
const msgText = document.getElementById("stage3dText");
const spinner = msg.querySelector(".spinner");
const svgBoard = document.getElementById("board");

function fail(text) {
  spinner.hidden = true;
  msgText.innerHTML = text;
  const note = document.getElementById("boardNote");
  if (note) {
    note.innerHTML = text;
    note.hidden = false;
  }
  window.__FANORONA_3D = "failed";
  use2D();
}

// The board is 3D. This is the error path only — no WebGL, no model, no CDN —
// where the flat SVG diagram takes over so the game stays playable.
function use2D() {
  stage.hidden = true;
  svgBoard.hidden = false;
  const cam = document.getElementById("cameraCard");
  if (cam) cam.hidden = true;
}

if (!window.WebGLRenderingContext) {
  fail("This browser has no WebGL, so the flat board is being used instead.");
  throw new Error("no webgl");
}

/* ================================================================
   Scene
   ================================================================ */
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: false,
});
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1c150e);

const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

const camera = new THREE.PerspectiveCamera(38, 884 / 500, 0.1, 200);
const HOME = new THREE.Vector3(0, 11.5, 12.5);
camera.position.copy(HOME);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.minDistance = 7;
controls.maxDistance = 30;
controls.minPolarAngle = 0.12;
controls.maxPolarAngle = 1.36; // never drop under the table
controls.enablePan = false;
controls.target.set(0, 0, 0);

const key = new THREE.DirectionalLight(0xfff1d6, 2.1);
key.position.set(6, 12, 7);
key.castShadow = true;
key.shadow.mapSize.set(2048, 2048);
key.shadow.bias = -0.0012;
const sc = key.shadow.camera;
sc.left = -8;
sc.right = 8;
sc.top = 6;
sc.bottom = -6;
sc.near = 1;
sc.far = 40;
scene.add(key);
scene.add(new THREE.HemisphereLight(0xf3e4c0, 0x2a1e12, 0.55));
const rim = new THREE.DirectionalLight(0xd0a65f, 0.5);
rim.position.set(-7, 5, -6);
scene.add(rim);

/* ================================================================
   Grid geometry — filled in once the model's size is known
   ================================================================ */
let STEP = 1,
  SURFACE = 0;
const boardGroup = new THREE.Group();
scene.add(boardGroup);

const pieceLayer = new THREE.Group();
const markerLayer = new THREE.Group();
scene.add(pieceLayer, markerLayer);

const worldOf = (i) =>
  new THREE.Vector3(
    (G.colOf(i) - (G.COLS - 1) / 2) * STEP,
    SURFACE,
    (G.rowOf(i) - (G.ROWS - 1) / 2) * STEP,
  );

function buildGrid() {
  const pts = [];
  for (let r = 0; r < G.ROWS; r++) {
    for (let c = 0; c < G.COLS; c++) {
      const a = worldOf(G.idx(r, c));
      // draw each link once: right, down, down-right, down-left
      for (const [dr, dc] of [
        [0, 1],
        [1, 0],
        [1, 1],
        [1, -1],
      ]) {
        const nr = r + dr,
          nc = c + dc;
        if (nr >= G.ROWS || nc < 0 || nc >= G.COLS) continue;
        // diagonals exist only where the strong lines meet
        if (dr && dc && !G.isStrong(r, c)) continue;
        const b = worldOf(G.idx(nr, nc));
        pts.push(a.x, a.y, a.z, b.x, b.y, b.z);
      }
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
  const lines = new THREE.LineSegments(
    geo,
    new THREE.LineBasicMaterial({
      color: 0xd8b26a,
      transparent: true,
      opacity: 0.5,
    }),
  );
  lines.renderOrder = 2;
  boardGroup.add(lines);

  // A small stud at every intersection so the points read clearly.
  const studGeo = new THREE.SphereGeometry(STEP * 0.035, 10, 8);
  const studMat = new THREE.MeshStandardMaterial({
    color: 0xc9a227,
    roughness: 0.5,
    metalness: 0.35,
  });
  const studs = new THREE.InstancedMesh(studGeo, studMat, G.COLS * G.ROWS);
  const m = new THREE.Matrix4();
  for (let i = 0; i < G.COLS * G.ROWS; i++) {
    m.setPosition(worldOf(i));
    studs.setMatrixAt(i, m);
  }
  boardGroup.add(studs);
}

/* ================================================================
   Materials
   ================================================================ */
const MAT = {
  w: new THREE.MeshStandardMaterial({
    color: 0xefdcb4,
    roughness: 0.42,
    metalness: 0.04,
  }),
  b: new THREE.MeshStandardMaterial({
    color: 0x241c14,
    roughness: 0.45,
    metalness: 0.12,
  }),
  wDoomed: new THREE.MeshStandardMaterial({
    color: 0xe9c3b4,
    roughness: 0.42,
    emissive: 0xb03020,
    emissiveIntensity: 1.0,
  }),
  bDoomed: new THREE.MeshStandardMaterial({
    color: 0x241c14,
    roughness: 0.45,
    emissive: 0x8f2418,
    emissiveIntensity: 1.1,
  }),
  // Legal-move glow. Capturing is compulsory, so these are exactly the pieces
  // the rules will let you touch this turn. Verdigris, not gold: gold on an
  // ivory stone is all but invisible, and gold is already the "you may move
  // here" colour on the destination rings.
  wReady: new THREE.MeshStandardMaterial({
    color: 0xd8ecdf,
    roughness: 0.4,
    metalness: 0.04,
    emissive: 0x10a892,
    emissiveIntensity: 0.55,
  }),
  bReady: new THREE.MeshStandardMaterial({
    color: 0x1c2c28,
    roughness: 0.45,
    metalness: 0.12,
    emissive: 0x14c4a8,
    emissiveIntensity: 0.85,
  }),
};
const RING_MOVE = new THREE.MeshBasicMaterial({
  color: 0xd0a65f,
  transparent: true,
  opacity: 0.85,
  side: THREE.DoubleSide,
});
const RING_CAP = new THREE.MeshBasicMaterial({
  color: 0xe07a5f,
  transparent: true,
  opacity: 0.9,
  side: THREE.DoubleSide,
});
const RING_READY = new THREE.MeshBasicMaterial({
  color: 0x3fe0cc,
  transparent: true,
  opacity: 0.7,
  side: THREE.DoubleSide,
});
const RING_SEL = new THREE.MeshBasicMaterial({
  color: 0x9dfff0,
  transparent: true,
  opacity: 0.95,
  side: THREE.DoubleSide,
});

let pieceGeo, ringGeo, selRingGeo, readyRingGeo;
function buildKit() {
  pieceGeo = new THREE.CylinderGeometry(
    STEP * 0.33,
    STEP * 0.36,
    STEP * 0.2,
    28,
  );
  ringGeo = new THREE.RingGeometry(STEP * 0.2, STEP * 0.3, 28);
  selRingGeo = new THREE.RingGeometry(STEP * 0.4, STEP * 0.47, 32);
  readyRingGeo = new THREE.RingGeometry(STEP * 0.38, STEP * 0.47, 32);
}

/* ================================================================
   Sync: board state -> meshes
   ================================================================ */
const meshes = new Map(); // piece id -> mesh
let ready = false;

function sync() {
  if (!ready) return;
  const board = G.board();
  const doomed = G.doomed();
  const selected = G.selected();
  const alive = new Set();

  for (let i = 0; i < board.length; i++) {
    const cell = board[i];
    if (!cell) continue;
    alive.add(cell.id);
    let mesh = meshes.get(cell.id);
    if (!mesh) {
      mesh = new THREE.Mesh(pieceGeo, MAT.w);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      const p = worldOf(i);
      mesh.position.set(p.x, p.y + STEP * 0.1, p.z);
      mesh.userData.spawn = performance.now();
      meshes.set(cell.id, mesh);
      pieceLayer.add(mesh);
    }
    const white = cell.owner === G.WHITE;
    const isDoomed = doomed.indexOf(i) !== -1;
    const isReady = !isDoomed && G.pickable(i);
    mesh.material = isDoomed
      ? white
        ? MAT.wDoomed
        : MAT.bDoomed
      : isReady
        ? white
          ? MAT.wReady
          : MAT.bReady
        : white
          ? MAT.w
          : MAT.b;
    const p = worldOf(i);
    // selected piece floats a little so it is unmistakable
    mesh.userData.target = new THREE.Vector3(
      p.x,
      p.y + STEP * 0.1 + (selected === i ? STEP * 0.22 : 0),
      p.z,
    );
  }

  for (const [id, mesh] of [...meshes]) {
    if (alive.has(id)) continue;
    meshes.delete(id);
    mesh.userData.dying = performance.now();
  }

  // markers
  markerLayer.clear();

  // Ring every stone that has a legal move, so the playable set is obvious
  // before you touch anything.
  for (let i = 0; i < board.length; i++) {
    if (!board[i] || i === selected || !G.pickable(i)) continue;
    const p = worldOf(i);
    const ready = new THREE.Mesh(readyRingGeo, RING_READY);
    ready.rotation.x = -Math.PI / 2;
    ready.position.set(p.x, p.y + 0.01, p.z);
    ready.userData.ready = true;
    markerLayer.add(ready);
  }

  if (selected !== null) {
    const s = worldOf(selected);
    const sel = new THREE.Mesh(selRingGeo, RING_SEL);
    sel.rotation.x = -Math.PI / 2;
    sel.position.set(s.x, s.y + 0.012, s.z);
    markerLayer.add(sel);

    for (const d of G.destinations()) {
      const p = worldOf(d.to);
      const ring = new THREE.Mesh(ringGeo, d.capture ? RING_CAP : RING_MOVE);
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(p.x, p.y + 0.012, p.z);
      ring.userData.pulse = true;
      markerLayer.add(ring);
    }
  }
  for (const v of doomed) {
    const p = worldOf(v);
    const ring = new THREE.Mesh(selRingGeo, RING_CAP);
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(p.x, p.y + 0.014, p.z);
    markerLayer.add(ring);
  }
}
G.onSync(sync);

/* ================================================================
   Pointer -> intersection
   ================================================================ */
const ray = new THREE.Raycaster();
const ndc = new THREE.Vector2();
let plane = null;
const hitPoint = new THREE.Vector3();
let hovered = null;
let downAt = null;

function pointAt(ev) {
  const rect = canvas.getBoundingClientRect();
  ndc.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
  ndc.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1;
  ray.setFromCamera(ndc, camera);
  if (!ray.ray.intersectPlane(plane, hitPoint)) return null;
  const c = Math.round(hitPoint.x / STEP + (G.COLS - 1) / 2);
  const r = Math.round(hitPoint.z / STEP + (G.ROWS - 1) / 2);
  if (r < 0 || r >= G.ROWS || c < 0 || c >= G.COLS) return null;
  const i = G.idx(r, c);
  // ignore clicks that land well outside the nearest point
  return worldOf(i).distanceTo(hitPoint) > STEP * 0.48 ? null : i;
}

canvas.addEventListener("pointermove", (ev) => {
  if (!ready) return;
  const i = pointAt(ev);
  if (i !== hovered) {
    hovered = i;
    G.hover(i);
    const live =
      i !== null &&
      (G.pickable(i) ||
        G.destinations().some((d) => d.to === i));
    canvas.classList.toggle("pointing", live);
  }
});
canvas.addEventListener("pointerleave", () => {
  hovered = null;
  G.hover(null);
  canvas.classList.remove("pointing");
});
canvas.addEventListener("pointerdown", (ev) => {
  downAt = { x: ev.clientX, y: ev.clientY };
});
canvas.addEventListener("pointerup", (ev) => {
  if (!ready || !downAt) return;
  const moved = Math.hypot(ev.clientX - downAt.x, ev.clientY - downAt.y);
  downAt = null;
  if (moved > 6) return; // that was an orbit drag, not a click
  const i = pointAt(ev);
  if (i !== null) G.point(i);
});

/* ================================================================
   Camera controls
   ================================================================ */
document.getElementById("resetCamBtn").addEventListener("click", () => {
  camera.position.copy(HOME);
  controls.target.set(0, 0, 0);
  controls.update();
});
document.getElementById("topCamBtn").addEventListener("click", () => {
  camera.position.set(0, 17, 0.01);
  controls.target.set(0, 0, 0);
  controls.update();
});

function resize() {
  const w = stage.clientWidth,
    h = stage.clientHeight;
  if (!w || !h) return;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
new ResizeObserver(resize).observe(stage);

/* ================================================================
   Load the carved board
   ================================================================ */
const draco = new DRACOLoader().setDecoderPath(DRACO_PATH);
const loader = new GLTFLoader().setDRACOLoader(draco);

loader.load(
  MODEL_URL,
  (gltf) => {
    const model = gltf.scene;
    // The mesh stands upright in its own space: lay it flat, centre it, scale it.
    model.rotation.x = -Math.PI / 2;
    model.scale.setScalar(SCALE);
    model.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const centre = box.getCenter(new THREE.Vector3());
    model.position.sub(new THREE.Vector3(centre.x, box.min.y, centre.z));

    model.traverse((o) => {
      if (!o.isMesh) return;
      o.castShadow = true;
      o.receiveShadow = true;
      if (o.material) {
        o.material.roughness = Math.min(1, (o.material.roughness ?? 1) * 0.9);
        o.material.envMapIntensity = 0.8;
      }
    });
    boardGroup.add(model);

    // Fit the 9×5 grid to the top face with a uniform (square-celled) step.
    SURFACE = size.y;
    STEP = Math.min(
      (size.x * INSET) / (G.COLS - 1),
      (size.z * INSET) / (G.ROWS - 1),
    );
    plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -SURFACE);

    buildKit();
    buildGrid();

    // Frame the board.
    const span = Math.max(size.x, size.z);
    controls.minDistance = span * 0.7;
    controls.maxDistance = span * 3.2;
    HOME.set(0, span * 1.05, span * 1.15);
    camera.position.copy(HOME);
    controls.target.set(0, SURFACE * 0.5, 0);
    controls.update();

    // Shadow frustum to match the real board size.
    sc.left = -span;
    sc.right = span;
    sc.top = span * 0.8;
    sc.bottom = -span * 0.8;
    sc.updateProjectionMatrix();

    ready = true;
    window.__FANORONA_3D = "ready";
    msg.hidden = true;
    stage.hidden = false;
    svgBoard.hidden = true;
    resize();
    sync();
  },
  (ev) => {
    if (ev.total) {
      msgText.textContent =
        "Loading the carved board… " +
        Math.round((ev.loaded / ev.total) * 100) +
        "%";
    }
  },
  (err) => {
    console.error("[fanorona] model failed to load", err);
    fail(
      "The 3D board could not be loaded — playing on the flat diagram instead.<br><br>" +
        "If you opened this file directly, serve the folder instead: <code>python -m http.server</code>",
    );
  },
);

/* ================================================================
   Render loop
   ================================================================ */
const clock = new THREE.Clock();
function tick() {
  requestAnimationFrame(tick);
  const t = performance.now();
  const dt = Math.min(clock.getDelta(), 0.05);

  // glide pieces to their squares
  for (const mesh of [...pieceLayer.children]) {
    if (mesh.userData.dying) {
      const k = (t - mesh.userData.dying) / 320;
      if (k >= 1) {
        pieceLayer.remove(mesh);
        continue;
      }
      mesh.scale.setScalar(1 - k);
      mesh.position.y += dt * 1.4;
      continue;
    }
    if (mesh.userData.target) mesh.position.lerp(mesh.userData.target, 0.22);
    if (mesh.userData.spawn) {
      const k = Math.min(1, (t - mesh.userData.spawn) / 260);
      mesh.scale.setScalar(0.6 + 0.4 * k);
      if (k === 1) mesh.userData.spawn = 0;
    }
  }

  const pulse = 1 + Math.sin(t / 260) * 0.11;
  const glow = 0.5 + Math.sin(t / 420) * 0.5; // 0 .. 1
  MAT.wReady.emissiveIntensity = 0.34 + glow * 0.4;
  MAT.bReady.emissiveIntensity = 0.5 + glow * 0.7;
  RING_READY.opacity = 0.5 + glow * 0.4;
  for (const m of markerLayer.children) {
    if (m.userData.pulse) m.scale.setScalar(pulse);
    else if (m.userData.ready) m.scale.setScalar(1 + (pulse - 1) * 0.45);
  }

  controls.update();
  renderer.render(scene, camera);
}
tick();

/* Exposed for headless tests and console debugging (window.__fanorona3d). */
export const __test = {
  get STEP() {
    return STEP;
  },
  get SURFACE() {
    return SURFACE;
  },
  worldOf,
  pointAt,
  sync,
  camera,
  controls,
  boardGroup,
  pieceLayer,
  markerLayer,
  MAT,
};
window.__fanorona3d = __test;
