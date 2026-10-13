import * as THREE from "three";

/**
 * Get a point on the curve at parameter t [0, 1]
 */
export function getPointAtT(
  curve: THREE.CatmullRomCurve3,
  t: number
): THREE.Vector3 {
  return curve.getPointAt(t);
}

/**
 * Get the tangent (forward direction) at parameter t
 */
export function getTangentAtT(
  curve: THREE.CatmullRomCurve3,
  t: number
): THREE.Vector3 {
  return curve.getTangentAt(t).normalize();
}

/**
 * Get the right-hand normal (perpendicular on XZ plane) at parameter t
 */
export function getNormalAtT(
  curve: THREE.CatmullRomCurve3,
  t: number
): THREE.Vector3 {
  const tangent = getTangentAtT(curve, t);
  // Cross with world up to get right vector
  const up = new THREE.Vector3(0, 1, 0);
  return new THREE.Vector3().crossVectors(tangent, up).normalize();
}

/**
 * Sample the curve at `count` evenly-spaced points and return
 * left/right edge positions for the road mesh.
 */
export function sampleTrackEdges(
  curve: THREE.CatmullRomCurve3,
  halfWidth: number,
  count: number
): { left: THREE.Vector3[]; right: THREE.Vector3[]; centers: THREE.Vector3[] } {
  const left: THREE.Vector3[] = [];
  const right: THREE.Vector3[] = [];
  const centers: THREE.Vector3[] = [];

  for (let i = 0; i <= count; i++) {
    const t = i / count;
    const center = getPointAtT(curve, t);
    const normal = getNormalAtT(curve, t);

    centers.push(center.clone());
    left.push(center.clone().add(normal.clone().multiplyScalar(-halfWidth)));
    right.push(center.clone().add(normal.clone().multiplyScalar(halfWidth)));
  }

  return { left, right, centers };
}
