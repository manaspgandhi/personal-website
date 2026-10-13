"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// NES Mario color palette
const MARIO_COLORS = {
  pipeGreen: "#00a800",
  pipeDarkGreen: "#008000",
  pipeHighlight: "#00d800",
  questionBlock: "#f8b800",
  questionBlockDark: "#c87800",
  brickRed: "#c84c0c",
  brickDark: "#a03000",
};

interface TreeProps {
  position: [number, number, number];
  scale?: number;
  type?: "pine" | "deciduous";
}

// Mario Pipe
function Pipe({ position, scale = 1 }: TreeProps) {
  const height = 2 + scale;
  return (
    <group position={position}>
      {/* Pipe body */}
      <mesh position={[0, height / 2, 0]}>
        <cylinderGeometry args={[1.2 * scale, 1.2 * scale, height, 8]} />
        <meshBasicMaterial color={MARIO_COLORS.pipeGreen} />
      </mesh>
      {/* Pipe rim */}
      <mesh position={[0, height + 0.3, 0]}>
        <cylinderGeometry args={[1.5 * scale, 1.5 * scale, 0.6, 8]} />
        <meshBasicMaterial color={MARIO_COLORS.pipeHighlight} />
      </mesh>
      {/* Dark edge line */}
      <mesh position={[0, height / 2, 1.21 * scale]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.2, height]} />
        <meshBasicMaterial color={MARIO_COLORS.pipeDarkGreen} />
      </mesh>
    </group>
  );
}

// Question Block
function QuestionBlock({ position, scale = 1 }: TreeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Subtle bob animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = 1.5 + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.1;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef} position={[0, 1.5, 0]}>
        <boxGeometry args={[2 * scale, 2 * scale, 2 * scale]} />
        <meshBasicMaterial color={MARIO_COLORS.questionBlock} />
      </mesh>
      {/* Question mark (simplified as dark square) */}
      <mesh position={[0, 1.5, 1.01 * scale]}>
        <planeGeometry args={[0.8 * scale, 1.2 * scale]} />
        <meshBasicMaterial color={MARIO_COLORS.questionBlockDark} />
      </mesh>
    </group>
  );
}

interface TreeFieldProps {
  positions: Array<{
    pos: [number, number, number];
    scale: number;
    type: "pine" | "deciduous";
  }>;
}

export default function Trees({ positions }: TreeFieldProps) {
  return (
    <group>
      {positions.map((tree, i) =>
        tree.type === "pine" ? (
          <Pipe key={i} position={tree.pos} scale={tree.scale * 0.8} />
        ) : (
          <QuestionBlock key={i} position={tree.pos} scale={tree.scale * 0.6} />
        )
      )}
    </group>
  );
}

// Generate tree positions for environment
export function generateTreePositions(
  trackCurve: THREE.CatmullRomCurve3,
  count: number,
  minDistance: number,
  maxDistance: number,
  seed: number = 12345
): Array<{ pos: [number, number, number]; scale: number; type: "pine" | "deciduous" }> {
  const positions: Array<{ pos: [number, number, number]; scale: number; type: "pine" | "deciduous" }> = [];

  // Simple seeded random
  const seededRandom = (s: number) => {
    const x = Math.sin(s) * 10000;
    return x - Math.floor(x);
  };

  for (let i = 0; i < count; i++) {
    const t = i / count;
    const point = trackCurve.getPointAt(t);
    const tangent = trackCurve.getTangentAt(t);

    // Get perpendicular direction
    const perpendicular = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();

    // Random offset from track (both sides)
    const r1 = seededRandom(seed + i * 3);
    const r2 = seededRandom(seed + i * 3 + 1);
    const r3 = seededRandom(seed + i * 3 + 2);

    const side = r1 > 0.5 ? 1 : -1;
    const distance = minDistance + r2 * (maxDistance - minDistance);

    const x = point.x + perpendicular.x * distance * side;
    const z = point.z + perpendicular.z * distance * side;

    positions.push({
      pos: [x, 0, z],
      scale: 0.7 + r3 * 0.6,
      type: r1 > 0.4 ? "pine" : "deciduous",
    });
  }

  return positions;
}
