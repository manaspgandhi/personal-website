"use client";
import * as THREE from "three";
import { RigidBody } from "@react-three/rapier";

// NES Mario bush - simple rounded shape
const BUSH_GREEN = "#00a800";
const BUSH_DARK = "#008000";

interface BushProps {
  position: [number, number, number];
  scale?: number;
}

function Bush({ position, scale = 1 }: BushProps) {
  return (
    <RigidBody
      position={position}
      colliders="ball"
      mass={0.5 * scale}
      restitution={0.3}
      friction={0.5}
      linearDamping={0.8}
      angularDamping={0.8}
    >
      <group scale={scale}>
        {/* Mario-style bush - 3 connected circles */}
        <mesh position={[0, 0.6, 0]}>
          <sphereGeometry args={[0.8, 8, 6]} />
          <meshBasicMaterial color={BUSH_GREEN} />
        </mesh>
        <mesh position={[-0.7, 0.5, 0]}>
          <sphereGeometry args={[0.6, 8, 6]} />
          <meshBasicMaterial color={BUSH_GREEN} />
        </mesh>
        <mesh position={[0.7, 0.5, 0]}>
          <sphereGeometry args={[0.6, 8, 6]} />
          <meshBasicMaterial color={BUSH_GREEN} />
        </mesh>
      </group>
    </RigidBody>
  );
}

interface BushesProps {
  positions: Array<{
    pos: [number, number, number];
    scale: number;
  }>;
}

export default function Bushes({ positions }: BushesProps) {
  return (
    <group>
      {positions.map((bush, i) => (
        <Bush key={i} position={bush.pos} scale={bush.scale} />
      ))}
    </group>
  );
}

// Generate bush positions
export function generateBushPositions(
  trackCurve: THREE.CatmullRomCurve3,
  count: number,
  minDistance: number,
  maxDistance: number,
  seed: number = 22222
): Array<{ pos: [number, number, number]; scale: number }> {
  const positions: Array<{ pos: [number, number, number]; scale: number }> = [];

  const seededRandom = (s: number) => {
    const x = Math.sin(s) * 10000;
    return x - Math.floor(x);
  };

  for (let i = 0; i < count; i++) {
    const t = seededRandom(seed + i * 5);
    const point = trackCurve.getPointAt(t);
    const tangent = trackCurve.getTangentAt(t);

    const perpendicular = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();

    const r1 = seededRandom(seed + i * 3);
    const r2 = seededRandom(seed + i * 3 + 1);
    const r3 = seededRandom(seed + i * 3 + 2);

    const side = r1 > 0.5 ? 1 : -1;
    const distance = minDistance + r2 * (maxDistance - minDistance);

    const x = point.x + perpendicular.x * distance * side;
    const z = point.z + perpendicular.z * distance * side;

    positions.push({
      pos: [x, 0, z],
      scale: 0.6 + r3 * 0.8,
    });
  }

  return positions;
}
