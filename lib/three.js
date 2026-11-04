// The parts of Three.js the dot scenes use, imported from its source files one by one, so the bundle carries those classes
// and what they depend on rather than the whole library. Everything the field and the case-study scenes touch is here;
// add to this list before using anything else from three.
export { WebGLRenderer } from "three/src/renderers/WebGLRenderer.js";
export { Scene } from "three/src/scenes/Scene.js";
export { PerspectiveCamera } from "three/src/cameras/PerspectiveCamera.js";
export { BufferGeometry } from "three/src/core/BufferGeometry.js";
export { BufferAttribute } from "three/src/core/BufferAttribute.js";
export { Raycaster } from "three/src/core/Raycaster.js";
export { Points } from "three/src/objects/Points.js";
export { LineSegments } from "three/src/objects/LineSegments.js";
export { Line } from "three/src/objects/Line.js";
export { Mesh } from "three/src/objects/Mesh.js";
export { Group } from "three/src/objects/Group.js";
export { LineBasicMaterial } from "three/src/materials/LineBasicMaterial.js";
export { LineDashedMaterial } from "three/src/materials/LineDashedMaterial.js";
export { ShaderMaterial } from "three/src/materials/ShaderMaterial.js";
export { MeshBasicMaterial } from "three/src/materials/MeshBasicMaterial.js";
export { Vector2 } from "three/src/math/Vector2.js";
export { Vector3 } from "three/src/math/Vector3.js";
export { Quaternion } from "three/src/math/Quaternion.js";
export { Plane } from "three/src/math/Plane.js";
export { Color } from "three/src/math/Color.js";
export { OctahedronGeometry } from "three/src/geometries/OctahedronGeometry.js";
export { EdgesGeometry } from "three/src/geometries/EdgesGeometry.js";
export { DoubleSide } from "three/src/constants.js";
