/**
 * Shagai Horse Race — 3D camel dice
 * ------------------------------------------------------------------
 * Renders the four "dice" of the race as camel models from
 * assets/camel_web_optimized.glb. All race rules, turn handling and the
 * opponent live in game3.html; this file only *throws* the dice: it is
 * handed four face indices and animates the camels into the resting
 * poses that stand for those faces.
 *
 * Real shagai are sheep anklebones that land on one of four sides —
 * horse, camel, sheep or goat. This exhibit substitutes a scanned camel
 * for the bone, so the landed face is read from how the camel comes to
 * rest: upright, turned, or down on either flank.
 *
 * If WebGL, the CDN or the model is unavailable the page falls back to
 * its flat bone dice and stays fully playable.
 * ------------------------------------------------------------------
 */

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

const BRIDGE = window.SHAGAI_DICE;
const MODEL_URL = "assets/camel_web_optimized.glb";
const NUM_DICE = 4;

/* Resting pose per shagai face. The camel keeps its footing for the two
   narrow faces and goes down on a flank for the two broad ones — the
   same read as a real anklebone. */
const POSE = [
  { x: 0, y: 0, z: 0 }, // 0 horse  — upright, facing the player
  { x: 0, y: Math.PI / 2, z: 0 }, // 1 camel  — upright, turned side-on
  { x: 0, y: 0, z: Math.PI / 2 }, // 2 sheep  — down on the near flank
  { x: 0, y: 0, z: -Math.PI / 2 }, // 3 goat   — down on the far flank
];

const stage = document.getElementById("diceStage");
const canvas = document.getElementById("diceCanvas");
const msg = document.getElementById("diceStageMsg");

function fail(text) {
  if (msg) msg.textContent = text;
  BRIDGE.status = "failed";
  BRIDGE.onstatus(text);
}

if (!window.WebGLRenderingContext) {
  fail("This browser has no WebGL, so the flat bone dice are being used.");
  throw new Error("no webgl");
}

/* ================================================================
   Scene
   ================================================================ */
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x2a2114);

const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

const camera = new THREE.PerspectiveCamera(34, 16 / 9, 0.1, 200);

const key = new THREE.DirectionalLight(0xfff1d6, 2.2);
key.position.set(4, 9, 6);
key.castShadow = true;
key.shadow.mapSize.set(2048, 2048);
key.shadow.bias = -0.0015;
scene.add(key);
scene.add(new THREE.HemisphereLight(0xf3e4c0, 0x2a1e12, 0.6));
const rim = new THREE.DirectionalLight(0xd0a65f, 0.55);
rim.position.set(-6, 4, -5);
scene.add(rim);

/* The felt the camels are cast onto — the tray from the exhibit. */
const felt = new THREE.Mesh(
  new THREE.PlaneGeometry(60, 60),
  new THREE.MeshStandardMaterial({ color: 0x6b5533, roughness: 0.95 }),
);
felt.rotation.x = -Math.PI / 2;
felt.receiveShadow = true;
scene.add(felt);

/* ================================================================
   Dice
   ================================================================ */
const dice = []; // { group, pivot, spin }
let ready = false;
let STEP = 1;
let HALF_H = 0.5; // half the camel's standing height, in scene units
let HALF_L = 0.5; // half its body length — the height when it lies on a flank

/* How high the pivot must sit for a given pose to rest on the felt. */
const restY = (face) => (face < 2 ? HALF_H : HALF_L);

const loader = new GLTFLoader();

loader.load(
  MODEL_URL,
  (gltf) => {
    const proto = gltf.scene;

    proto.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(proto);
    const size = box.getSize(new THREE.Vector3());
    const centre = box.getCenter(new THREE.Vector3());

    // Normalise: sit the camel on the origin, one unit tall.
    const unit = 1 / Math.max(size.x, size.y, size.z);
    proto.position.sub(centre);
    proto.scale.setScalar(unit);

    // Rest height per pose: standing, the camel's own height clears the felt;
    // down on a flank it is the body length that stands vertical instead.
    HALF_H = (size.y * unit) / 2;
    HALF_L = (size.x * unit) / 2;

    proto.traverse((o) => {
      if (!o.isMesh) return;
      o.castShadow = true;
      o.receiveShadow = true;
      if (o.material) {
        o.material.envMapIntensity = 0.9;
        o.material.roughness = Math.min(1, (o.material.roughness ?? 1) * 0.95);
      }
    });

    STEP = 1.5;
    for (let i = 0; i < NUM_DICE; i++) {
      // pivot spins; group holds the model so its own centring survives
      const pivot = new THREE.Group();
      const model = i === 0 ? proto : proto.clone(true);
      pivot.add(model);

      const group = new THREE.Group();
      group.position.set((i - (NUM_DICE - 1) / 2) * STEP, restY(0), 0);
      group.add(pivot);
      scene.add(group);

      dice.push({ group, pivot, baseY: restY(0) });
      setPose(dice[i], 0, 0);
    }

    // Frame all four.
    const span = STEP * NUM_DICE;
    camera.position.set(0, span * 0.62, span * 1.15);
    camera.lookAt(0, 0.35, 0);

    const sc = key.shadow.camera;
    sc.left = -span;
    sc.right = span;
    sc.top = span * 0.7;
    sc.bottom = -span * 0.7;
    sc.near = 1;
    sc.far = 40;
    sc.updateProjectionMatrix();

    ready = true;
    BRIDGE.status = "ready";
    if (msg) msg.hidden = true;
    resize();
    BRIDGE.onstatus("ready");
  },
  undefined,
  () => {
    fail(
      "The camel model could not be loaded, so the flat bone dice are being used.",
    );
  },
);

function setPose(die, face, extraSpins) {
  const p = POSE[face];
  die.pivot.rotation.set(p.x, p.y + Math.PI * 2 * (extraSpins || 0), p.z);
}

/* ================================================================
   Throwing
   ================================================================ */
let animating = false;

/**
 * Tumble the camels and settle them on `faces` (four indices into POSE).
 * Resolves once every camel has stopped moving.
 */
BRIDGE.roll = function roll(faces) {
  if (!ready || animating) return Promise.resolve();
  animating = true;

  const DUR = 1150;
  const start = performance.now();

  const legs = dice.map((die, i) => {
    const from = {
      x: die.pivot.rotation.x,
      y: die.pivot.rotation.y,
      z: die.pivot.rotation.z,
    };
    const p = POSE[faces[i]];
    // always turn forwards, with a couple of extra spins for the tumble
    const to = {
      x: from.x + Math.PI * 4 + shortestTo(from.x, p.x),
      y: from.y + Math.PI * 6 + shortestTo(from.y, p.y),
      z: from.z + Math.PI * 2 + shortestTo(from.z, p.z),
    };
    return {
      die,
      from,
      to,
      fromY: die.group.position.y,
      toY: restY(faces[i]),
      delay: i * 90,
      hop: 1.1 + Math.random() * 0.5,
    };
  });

  return new Promise((resolve) => {
    function frame(now) {
      let done = true;
      for (const leg of legs) {
        const t = clamp01((now - start - leg.delay) / DUR);
        if (t < 1) done = false;
        const e = easeOut(t);
        leg.die.pivot.rotation.set(
          lerp(leg.from.x, leg.to.x, e),
          lerp(leg.from.y, leg.to.y, e),
          lerp(leg.from.z, leg.to.z, e),
        );
        // arc up and back down onto the felt at the new pose's rest height
        leg.die.group.position.y =
          lerp(leg.fromY, leg.toY, e) + Math.sin(Math.PI * clamp01(t)) * leg.hop;
      }
      if (done) {
        legs.forEach((leg, i) => {
          setPose(leg.die, faces[i], 0);
          leg.die.baseY = leg.toY;
          leg.die.group.position.y = leg.toY;
        });
        animating = false;
        resolve();
        return;
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  });
};

/* Turn `to` into the nearest equivalent angle ahead of `from`. */
function shortestTo(from, to) {
  const cur = ((from % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
  let d = (((to - cur) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
  return d;
}
const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const lerp = (a, b, t) => a + (b - a) * t;
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

/* ================================================================
   Loop
   ================================================================ */
function resize() {
  if (!stage) return;
  const w = stage.clientWidth || 1;
  const h = stage.clientHeight || 1;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h, false);
}
new ResizeObserver(resize).observe(stage);

const idleFrom = performance.now();
(function tick(now) {
  requestAnimationFrame(tick);
  if (ready && !animating) {
    // a slow drift so the case never looks frozen
    const t = ((now || idleFrom) - idleFrom) / 1000;
    for (let i = 0; i < dice.length; i++) {
      dice[i].group.position.y = dice[i].baseY + Math.sin(t * 1.1 + i) * 0.03;
    }
  }
  renderer.render(scene, camera);
})();
