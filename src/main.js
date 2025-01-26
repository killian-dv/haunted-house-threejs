import GUI from "lil-gui";
import * as THREE from "three";
import { Timer } from "three/addons/misc/Timer.js";
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
 * House
 */

// floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial()
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

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
  new THREE.MeshStandardMaterial()
);
walls.position.y += houseSizes.height / 2;
house.add(walls);

// roof
const roofSizes = {
  radius: 3.5,
  height: 1.5,
  radialSegments: 4,
};
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(
    roofSizes.radius,
    roofSizes.height,
    roofSizes.radialSegments
  ),
  new THREE.MeshStandardMaterial()
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
  new THREE.PlaneGeometry(doorSizes.width, doorSizes.height),
  new THREE.MeshStandardMaterial({ color: "red" })
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
const bushesMaterial = new THREE.MeshStandardMaterial();

// bushes 1
const bushes1 = new THREE.Mesh(bushesGeometry, bushesMaterial);
bushes1.scale.set(0.5, 0.5, 0.5);
bushes1.position.set(0.8, 0.2, 2.2);

// bushes 2
const bushes2 = new THREE.Mesh(bushesGeometry, bushesMaterial);
bushes2.scale.set(0.4, 0.4, 0.4);
bushes2.position.set(1.4, 0.1, 2.1);

// bushes 3
const bushes3 = new THREE.Mesh(bushesGeometry, bushesMaterial);
bushes3.scale.set(0.4, 0.4, 0.4);
bushes3.position.set(-0.8, 0.1, 2.2);

// bushes 4
const bushes4 = new THREE.Mesh(bushesGeometry, bushesMaterial);
bushes4.scale.set(0.15, 0.15, 0.15);
bushes4.position.set(-1, 0.05, 2.6);
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
const gravesMaterial = new THREE.MeshStandardMaterial();

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
const ambientLight = new THREE.AmbientLight("#ffffff", 0.5);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight("#ffffff", 1.5);
directionalLight.position.set(3, 2, -8);
scene.add(directionalLight);

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

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const timer = new Timer();

const tick = () => {
  // Timer
  timer.update();
  const elapsedTime = timer.getElapsed();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
