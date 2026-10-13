"use client";
import * as THREE from "three";
import { RigidBody } from "@react-three/rapier";

// NES Mario brick colors
const BRICK_COLOR = "#c84c0c";
const BRICK_DARK = "#a03000";

interface RockProps {
  position: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
}

// Mario brick block
function Rock({ position, scale = 1, rotation = [0, 0, 0] }: RockProps) {
  return (
    <RigidBody
      position={position}
      rotation={rotation}
      colliders="cuboid"
      mass={scale * 3}
      restitution={0.1}
      friction={0.9}
      linearDamping={0.5}
      angularDamping={0.5}
    >
      <group scale={scale}>
        {/* Main brick */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshBasicMaterial color={BRICK_COLOR} />
        </mesh>
        {/* Brick lines (mortar) */}
        <mesh position={[0, 0.5, 0.76]}>
          <planeGeometry args={[1.5, 0.1]} />
          <meshBasicMaterial color={BRICK_DARK} />
        </mesh>
        <mesh position={[0, 0.9, 0.76]}>
          <planeGeometry args={[1.5, 0.1]} />
          <meshBasicMaterial color={BRICK_DARK} />
        </mesh>
      </group>
    </RigidBody>
  );
}

interface RocksProps {
  positions: Array<{
    pos: [number, number, number];
    scale: number;
    rotation: [number, number, number];
  }>;
}

export default function Rocks({ positions }: RocksProps) {
  return (
    <group>
      {positions.map((rock, i) => (
        <Rock key={i} position={rock.pos} scale={rock.scale} rotation={rock.rotation} />
      ))}
    </group>
  );
}

// Generate rock positions
export function generateRockPositions(
  trackCurve: THREE.CatmullRomCurve3,
  count: number,
  minDistance: number,
  maxDistance: number,
  seed: number = 33333
): Array<{ pos: [number, number, number]; scale: number; rotation: [number, number, number] }> {
  const positions: Array<{ pos: [number, number, number]; scale: number; rotation: [number, number, number] }> = [];

  const seededRandom = (s: number) => {
    const x = Math.sin(s) * 10000;
    return x - Math.floor(x);
  };

  for (let i = 0; i < count; i++) {
    const t = seededRandom(seed + i * 11);
    const point = trackCurve.getPointAt(t);
    const tangent = trackCurve.getTangentAt(t);

    const perpendicular = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();

    const r1 = seededRandom(seed + i * 3);
    const r2 = seededRandom(seed + i * 3 + 1);
    const r3 = seededRandom(seed + i * 3 + 2);
    const r4 = seededRandom(seed + i * 3 + 3);
    const r5 = seededRandom(seed + i * 3 + 4);
    const r6 = seededRandom(seed + i * 3 + 5);

    const side = r1 > 0.5 ? 1 : -1;
    const distance = minDistance + r2 * (maxDistance - minDistance);

    const x = point.x + perpendicular.x * distance * side;
    const z = point.z + perpendicular.z * distance * side;

    positions.push({
      pos: [x, 0, z],
      scale: 0.3 + r3 * 1.2,
      rotation: [r4 * Math.PI * 0.2, r5 * Math.PI * 2, r6 * Math.PI * 0.2],
    });
  }

  return positions;
}
