import GUI from "lil-gui";
import * as THREE from "three";
import { Timer } from "three/addons/misc/Timer.js";
import { Sky } from "three/addons/objects/Sky.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

// floor
const floorAlphaTexture = textureLoader.load("./floor/alpha.webp");
const floorColorTexture = textureLoader.load(
  "./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.webp"
);
const floorARMTexture = textureLoader.load(
  "./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.webp"
);
const floorNormalTexture = textureLoader.load(
  "./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.webp"
);
const floorDisplacementTexture = textureLoader.load(
  "./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.webp"
);

floorColorTexture.colorSpace = THREE.SRGBColorSpace;

const floorRepeatTexture = {
  x: 8,
  y: 8,
  wrapS: THREE.RepeatWrapping,
  wrapT: THREE.RepeatWrapping,
};
floorColorTexture.repeat.set(floorRepeatTexture.x, floorRepeatTexture.y);
floorARMTexture.repeat.set(floorRepeatTexture.x, floorRepeatTexture.y);
floorNormalTexture.repeat.set(floorRepeatTexture.x, floorRepeatTexture.y);
floorDisplacementTexture.repeat.set(floorRepeatTexture.x, floorRepeatTexture.y);
floorColorTexture.wrapS = floorRepeatTexture.wrapS;
floorColorTexture.wrapT = floorRepeatTexture.wrapT;
floorARMTexture.wrapS = floorRepeatTexture.wrapS;
floorARMTexture.wrapT = floorRepeatTexture.wrapT;
floorNormalTexture.wrapS = floorRepeatTexture.wrapS;
floorNormalTexture.wrapT = floorRepeatTexture.wrapT;
floorDisplacementTexture.wrapS = floorRepeatTexture.wrapS;
floorDisplacementTexture.wrapT = floorRepeatTexture.wrapT;

// wall
const wallColorTexture = textureLoader.load(
  "./wall/castle_brick_broken_06_1k/castle_brick_broken_06_diff_1k.webp"
);
const wallNormalTexture = textureLoader.load(
  "./wall/castle_brick_broken_06_1k/castle_brick_broken_06_nor_gl_1k.webp"
);
const wallARMTexture = textureLoader.load(
  "./wall/castle_brick_broken_06_1k/castle_brick_broken_06_arm_1k.webp"
);

wallColorTexture.colorSpace = THREE.SRGBColorSpace;

// roof
const roofColorTexture = textureLoader.load(
  "./roof/clay_roof_tiles_1k/clay_roof_tiles_diff_1k.webp"
);
const roofNormalTexture = textureLoader.load(
  "./roof/clay_roof_tiles_1k/clay_roof_tiles_nor_gl_1k.webp"
);
const roofARMTexture = textureLoader.load(
  "./roof/clay_roof_tiles_1k/clay_roof_tiles_arm_1k.webp"
);

roofColorTexture.colorSpace = THREE.SRGBColorSpace;

const roofRepeatTexture = {
  x: 5,
  y: 1.2,
  wrapS: THREE.RepeatWrapping,
  wrapT: THREE.RepeatWrapping,
};
roofColorTexture.repeat.set(roofRepeatTexture.x, roofRepeatTexture.y);
roofARMTexture.repeat.set(roofRepeatTexture.x, roofRepeatTexture.y);
roofNormalTexture.repeat.set(roofRepeatTexture.x, roofRepeatTexture.y);
roofColorTexture.wrapS = roofRepeatTexture.wrapS;
roofARMTexture.wrapS = roofRepeatTexture.wrapS;
roofNormalTexture.wrapS = roofRepeatTexture.wrapS;
roofColorTexture.wrapT = roofRepeatTexture.wrapT;
roofARMTexture.wrapT = roofRepeatTexture.wrapT;
roofNormalTexture.wrapT = roofRepeatTexture.wrapT;

// bushe
const bushColorTexture = textureLoader.load(
  "./bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.webp"
);
const bushNormalTexture = textureLoader.load(
  "./bush/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.webp"
);
const bushARMTexture = textureLoader.load(
  "./bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.webp"
);

bushColorTexture.colorSpace = THREE.SRGBColorSpace;

const bushRepeatTexture = {
  x: 2,
  y: 1,
  wrapS: THREE.RepeatWrapping,
  wrapT: THREE.RepeatWrapping,
};
bushColorTexture.repeat.set(bushRepeatTexture.x, bushRepeatTexture.y);
bushARMTexture.repeat.set(bushRepeatTexture.x, bushRepeatTexture.y);
bushNormalTexture.repeat.set(bushRepeatTexture.x, bushRepeatTexture.y);
bushColorTexture.wrapS = bushRepeatTexture.wrapS;
bushColorTexture.wrapT = bushRepeatTexture.wrapT;
bushARMTexture.wrapS = bushRepeatTexture.wrapS;
bushARMTexture.wrapT = bushRepeatTexture.wrapT;
bushNormalTexture.wrapS = bushRepeatTexture.wrapS;
bushNormalTexture.wrapT = bushRepeatTexture.wrapT;

// grave
const graveColorTexture = textureLoader.load(
  "./grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.webp"
);
const graveNormalTexture = textureLoader.load(
  "./grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.webp"
);
const graveARMTexture = textureLoader.load(
  "./grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.webp"
);

graveColorTexture.colorSpace = THREE.SRGBColorSpace;

const graveRepeatTexture = {
  x: 0.3,
  y: 0.4,
  wrapS: THREE.RepeatWrapping,
  wrapT: THREE.RepeatWrapping,
};
graveColorTexture.repeat.set(graveRepeatTexture.x, graveRepeatTexture.y);
graveARMTexture.repeat.set(graveRepeatTexture.x, graveRepeatTexture.y);
graveNormalTexture.repeat.set(graveRepeatTexture.x, graveRepeatTexture.y);
graveColorTexture.wrapS = graveRepeatTexture.wrapS;
graveARMTexture.wrapS = graveRepeatTexture.wrapS;
graveNormalTexture.wrapS = graveRepeatTexture.wrapS;
graveColorTexture.wrapT = graveRepeatTexture.wrapT;
graveARMTexture.wrapT = graveRepeatTexture.wrapT;
graveNormalTexture.wrapT = graveRepeatTexture.wrapT;

// door
const doorColorTexture = textureLoader.load("./door/color.webp");
const doorNormalTexture = textureLoader.load("./door/normal.webp");
const doorAmbientOcclusionTexture = textureLoader.load(
  "./door/ambientOcclusion.webp"
);
const doorAlphaTexture = textureLoader.load("./door/alpha.webp");
const doorRoughnessTexture = textureLoader.load("./door/roughness.webp");
const doorMetalnessTexture = textureLoader.load("./door/metalness.webp");
const doorHeightTexture = textureLoader.load("./door/height.webp");

doorColorTexture.colorSpace = THREE.SRGBColorSpace;

// floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20, 100, 100),
  new THREE.MeshStandardMaterial({
    alphaMap: floorAlphaTexture,
    transparent: true,
    map: floorColorTexture,
    aoMap: floorARMTexture,
    roughnessMap: floorARMTexture,
    metalnessMap: floorARMTexture,
    normalMap: floorNormalTexture,
    displacementMap: floorDisplacementTexture,
    displacementScale: 0.3,
    displacementBias: -0.17,
  })
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

gui
  .add(floor.material, "displacementScale")
  .min(0)
  .max(1)
  .step(0.001)
  .name("floor displacement scale");
gui
  .add(floor.material, "displacementBias")
  .min(-1)
  .max(1)
  .step(0.001)
  .name("floor displacement bias");

// Create a group for the house
const house = new THREE.Group();
scene.add(house);

// walls
const houseSizes = {
  width: 4,
  height: 2.5,
  depth: 4,
};
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(houseSizes.width, houseSizes.height, houseSizes.depth),
  new THREE.MeshStandardMaterial({
    map: wallColorTexture,
    normalMap: wallNormalTexture,
    aoMap: wallARMTexture,
    roughnessMap: wallARMTexture,
    metalnessMap: wallARMTexture,
  })
);
walls.position.y += houseSizes.height / 2;
house.add(walls);

// roof
const roofSizes = {
  radius: 3.5,
  height: 1.5,
  radialSegments: 4,
};
const roofGeometry = new THREE.ConeGeometry(
  roofSizes.radius,
  roofSizes.height,
  roofSizes.radialSegments
);

// Adjust UVs
const uvs = roofGeometry.attributes.uv;
const angle = (7 * Math.PI) / 180;
for (let i = 0; i < uvs.count; i++) {
  const u = uvs.getX(i);
  const v = uvs.getY(i);

  // Rotation UVs by 7 degrees
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const newU = u * cos - v * sin;
  const newV = u * sin + v * cos;

  uvs.setXY(i, newU, newV);
}

const roof = new THREE.Mesh(
  roofGeometry,
  new THREE.MeshStandardMaterial({
    map: roofColorTexture,
    normalMap: roofNormalTexture,
    aoMap: roofARMTexture,
    roughnessMap: roofARMTexture,
    metalnessMap: roofARMTexture,
  })
);
roof.position.y += houseSizes.height + roofSizes.height / 2;
roof.rotation.y = Math.PI / 4;
house.add(roof);

// door
const doorSizes = {
  width: 2.2,
  height: 2.2,
};
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(doorSizes.width, doorSizes.height, 100, 100),
  new THREE.MeshStandardMaterial({
    transparent: true,
    map: doorColorTexture,
    normalMap: doorNormalTexture,
    aoMap: doorAmbientOcclusionTexture,
    alphaMap: doorAlphaTexture,
    roughnessMap: doorRoughnessTexture,
    metalnessMap: doorMetalnessTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.15,
    displacementBias: -0.04,
  })
);
door.position.y = 1;
door.position.z = houseSizes.depth / 2 + 0.001;
house.add(door);

// bushes
const bushesSizes = {
  radius: 1,
  widthSegments: 16,
  heightSegments: 16,
};
const bushesGeometry = new THREE.SphereGeometry(
  bushesSizes.radius,
  bushesSizes.widthSegments,
  bushesSizes.heightSegments
);
const bushesMaterial = new THREE.MeshStandardMaterial({
  color: "#ccffcc",
  map: bushColorTexture,
  normalMap: bushNormalTexture,
  aoMap: bushARMTexture,
  roughnessMap: bushARMTexture,
  metalnessMap: bushARMTexture,
});

// bushes 1
const bushes1 = new THREE.Mesh(bushesGeometry, bushesMaterial);
bushes1.scale.set(0.5, 0.5, 0.5);
bushes1.position.set(0.8, 0.2, 2.2);
bushes1.rotation.x = -0.75;

// bushes 2
const bushes2 = new THREE.Mesh(bushesGeometry, bushesMaterial);
bushes2.scale.set(0.4, 0.4, 0.4);
bushes2.position.set(1.4, 0.1, 2.1);
bushes2.rotation.x = -0.75;
// bushes 3
const bushes3 = new THREE.Mesh(bushesGeometry, bushesMaterial);
bushes3.scale.set(0.4, 0.4, 0.4);
bushes3.position.set(-0.8, 0.1, 2.2);
bushes3.rotation.x = -0.75;
// bushes 4
const bushes4 = new THREE.Mesh(bushesGeometry, bushesMaterial);
bushes4.scale.set(0.15, 0.15, 0.15);
bushes4.position.set(-1, 0.05, 2.6);
bushes4.rotation.x = -0.75;
house.add(bushes1, bushes2, bushes3, bushes4);

// graves
const gravesSizes = {
  width: 0.6,
  height: 0.8,
  depth: 0.2,
};
const gravesGeometry = new THREE.BoxGeometry(
  gravesSizes.width,
  gravesSizes.height,
  gravesSizes.depth
);
const gravesMaterial = new THREE.MeshStandardMaterial({
  map: graveColorTexture,
  normalMap: graveNormalTexture,
  aoMap: graveARMTexture,
  roughnessMap: graveARMTexture,
  metalnessMap: graveARMTexture,
});

const graves = new THREE.Group();
scene.add(graves);

for (let i = 0; i < 30; i++) {
  const angle = Math.random() * Math.PI * 2;
  const radius = 3 + Math.random() * 4;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  // mesh
  const grave = new THREE.Mesh(gravesGeometry, gravesMaterial);
  grave.position.set(x, 0, z);
  grave.position.y = (Math.random() * gravesSizes.height) / 2;

  const randomRotation = (Math.random() - 0.5) * 0.4;
  grave.rotation.set(randomRotation, randomRotation, randomRotation);

  graves.add(grave);
}

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#86cdff", 0.275);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight("#86cdff", 1);
directionalLight.position.set(3, 2, -8);
scene.add(directionalLight);

// point door light
const doorLight = new THREE.PointLight("#ff7d46", 5);
doorLight.position.set(0, 2.2, 2.5);
scene.add(doorLight);

/**
 * Ghosts
 */

const ghost1 = new THREE.PointLight("#8800ff", 6);
const ghost2 = new THREE.PointLight("#ff0088", 6);
const ghost3 = new THREE.PointLight("#ff0000", 6);
scene.add(ghost1, ghost2, ghost3);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.maxPolarAngle = Math.PI / 2.1;
controls.minDistance = 3;
controls.maxDistance = 10;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Shadows
 */
// renderer
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// cast and receive shadows
directionalLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;

walls.castShadow = true;
walls.receiveShadow = true;

roof.castShadow = true;
roof.receiveShadow = true;

door.castShadow = true;
door.receiveShadow = true;

floor.receiveShadow = true;

graves.children.forEach((grave) => {
  grave.castShadow = true;
  grave.receiveShadow = true;
});

// mapping
directionalLight.shadow.mapSize.set(256, 256);
directionalLight.shadow.camera.far = 20;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.top = 8;
directionalLight.shadow.camera.bottom = -8;
directionalLight.shadow.camera.left = -8;
directionalLight.shadow.camera.right = 8;

ghost1.shadow.mapSize.set(256, 256);
ghost1.shadow.camera.far = 10;

ghost2.shadow.mapSize.set(256, 256);
ghost2.shadow.camera.far = 10;

ghost3.shadow.mapSize.set(256, 256);
ghost3.shadow.camera.far = 10;

/**
 * Sky
 */
const sky = new Sky();
sky.scale.set(100, 100, 100);
scene.add(sky);

sky.material.uniforms.turbidity.value = 10;
sky.material.uniforms.rayleigh.value = 3;
sky.material.uniforms.mieCoefficient.value = 0.01;
sky.material.uniforms.mieDirectionalG.value = 0.95;
sky.material.uniforms.sunPosition.value.set(0.3, -0.038, -0.95);

// add sky settings to gui
gui
  .add(sky.material.uniforms.turbidity, "value")
  .min(0)
  .max(20)
  .step(0.001)
  .name("turbidity");
gui
  .add(sky.material.uniforms.rayleigh, "value")
  .min(0)
  .max(10)
  .step(0.001)
  .name("rayleigh");
gui
  .add(sky.material.uniforms.mieCoefficient, "value")
  .min(0)
  .max(0.1)
  .step(0.001)
  .name("mie coefficient");
gui
  .add(sky.material.uniforms.mieDirectionalG, "value")
  .min(0)
  .max(1)
  .step(0.001)
  .name("mie directional g");

/**
 * Fog
 */
const fog = new THREE.FogExp2("#1d343f", 0.1); // same color as the sky
scene.fog = fog;

/**
 * Animate
 */
const timer = new Timer();

const tick = () => {
  // Timer
  timer.update();
  const elapsedTime = timer.getElapsed();

  // Flicker the doorLight
  doorLight.intensity = 5 + Math.random() * 2;

  // ghost animation
  const ghost1Angle = elapsedTime * 0.5;
  ghost1.position.x = Math.cos(ghost1Angle) * 4;
  ghost1.position.z = Math.sin(ghost1Angle) * 4;
  ghost1.position.y =
    Math.sin(ghost1Angle) *
    Math.sin(ghost1Angle * 2.34) *
    Math.sin(ghost1Angle * 3.45);

  const ghost2Angle = -elapsedTime * 0.38;
  ghost2.position.x = Math.cos(ghost2Angle) * 5;
  ghost2.position.z = Math.sin(ghost2Angle) * 5;
  ghost2.position.y =
    Math.sin(ghost2Angle) *
    Math.sin(ghost1Angle * 2.34) *
    Math.sin(ghost1Angle * 3.45);

  const ghost3Angle = elapsedTime * 0.23;
  ghost3.position.x = Math.cos(ghost3Angle) * 6;
  ghost3.position.z = Math.sin(ghost3Angle) * 6;
  ghost3.position.y =
    Math.sin(ghost3Angle) *
    Math.sin(ghost3Angle * 2.34) *
    Math.sin(ghost3Angle * 3.45);

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
