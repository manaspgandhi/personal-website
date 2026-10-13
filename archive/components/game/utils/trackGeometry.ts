import * as THREE from "three";
import { sampleTrackEdges } from "./spline";

/**
 * Generate a road BufferGeometry from a CatmullRom spline.
 * Creates a quad strip connecting left and right edges.
 */
export function createTrackGeometry(
  curve: THREE.CatmullRomCurve3,
  halfWidth: number,
  sampleCount: number
): THREE.BufferGeometry {
  const { left, right } = sampleTrackEdges(curve, halfWidth, sampleCount);
  const vertCount = (sampleCount + 1) * 2;
  const positions = new Float32Array(vertCount * 3);
  const uvs = new Float32Array(vertCount * 2);

  for (let i = 0; i <= sampleCount; i++) {
    const li = i * 2;
    const ri = i * 2 + 1;
    const t = i / sampleCount;

    // Left vertex
    positions[li * 3] = left[i].x;
    positions[li * 3 + 1] = left[i].y;
    positions[li * 3 + 2] = left[i].z;
    uvs[li * 2] = 0;
    uvs[li * 2 + 1] = t;

    // Right vertex
    positions[ri * 3] = right[i].x;
    positions[ri * 3 + 1] = right[i].y;
    positions[ri * 3 + 2] = right[i].z;
    uvs[ri * 2] = 1;
    uvs[ri * 2 + 1] = t;
  }

  // Build index buffer for the quad strip
  const indices: number[] = [];
  for (let i = 0; i < sampleCount; i++) {
    const bl = i * 2;
    const br = i * 2 + 1;
    const tl = (i + 1) * 2;
    const tr = (i + 1) * 2 + 1;

    indices.push(bl, br, tl);
    indices.push(br, tr, tl);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  return geometry;
}

/**
 * Generate boundary wall positions (arrays of {position, rotation, size})
 * for invisible collider walls along both edges.
 */
export interface WallSegment {
  position: [number, number, number];
  rotation: [number, number, number];
  size: [number, number, number];
}

export function createBoundaryWalls(
  curve: THREE.CatmullRomCurve3,
  halfWidth: number,
  sampleCount: number,
  wallHeight: number = 4
): WallSegment[] {
  const walls: WallSegment[] = [];
  const { left, right } = sampleTrackEdges(curve, halfWidth, sampleCount);
  const step = 4; // every 4th sample for perf

  for (let i = 0; i < sampleCount; i += step) {
    const nextI = Math.min(i + step, sampleCount);

    // Left wall
    const lMid = new THREE.Vector3()
      .addVectors(left[i], left[nextI])
      .multiplyScalar(0.5);
    const lLen = left[i].distanceTo(left[nextI]);
    const lDir = new THREE.Vector3().subVectors(left[nextI], left[i]);
    const lAngle = Math.atan2(lDir.x, lDir.z);

    walls.push({
      position: [lMid.x, wallHeight / 2, lMid.z],
      rotation: [0, lAngle, 0],
      size: [0.5, wallHeight, lLen],
    });

    // Right wall
    const rMid = new THREE.Vector3()
      .addVectors(right[i], right[nextI])
      .multiplyScalar(0.5);
    const rLen = right[i].distanceTo(right[nextI]);
    const rDir = new THREE.Vector3().subVectors(right[nextI], right[i]);
    const rAngle = Math.atan2(rDir.x, rDir.z);

    walls.push({
      position: [rMid.x, wallHeight / 2, rMid.z],
      rotation: [0, rAngle, 0],
      size: [0.5, wallHeight, rLen],
    });
  }

  return walls;
}
