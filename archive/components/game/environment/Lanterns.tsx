"use client";
import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface LanternProps {
  position: [number, number, number];
  color?: string;
  intensity?: number;
}

function Lantern({ position, color = "#ff8844", intensity = 3 }: LanternProps) {
  const lightRef = useRef<THREE.PointLight>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  // Subtle flickering effect
  useFrame((state) => {
    if (lightRef.current && glowRef.current) {
      const flicker = 0.9 + Math.sin(state.clock.elapsedTime * 5 + position[0]) * 0.1;
      lightRef.current.intensity = intensity * flicker;
    }
  });

  return (
    <group position={position}>
      {/* Lantern post */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.1, 3, 6]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.3} />
      </mesh>

      {/* Lantern cage/frame */}
      <mesh position={[0, 3.2, 0]} castShadow>
        <boxGeometry args={[0.5, 0.6, 0.5]} />
        <meshStandardMaterial
          color="#2a2a2a"
          roughness={0.7}
          metalness={0.4}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Top cap */}
      <mesh position={[0, 3.6, 0]}>
        <coneGeometry args={[0.35, 0.3, 4]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.3} />
      </mesh>

      {/* Inner glow cube */}
      <mesh ref={glowRef} position={[0, 3.2, 0]}>
        <boxGeometry args={[0.3, 0.4, 0.3]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={3}
          toneMapped={false}
        />
      </mesh>

      {/* Point light for illumination - no shadows to avoid texture unit limit */}
      <pointLight
        ref={lightRef}
        position={[0, 3.2, 0]}
        color={color}
        intensity={intensity}
        distance={20}
        decay={1.5}
      />
    </group>
  );
}

interface LanternsProps {
  positions: Array<{
    pos: [number, number, number];
    color?: string;
  }>;
}

export default function Lanterns({ positions }: LanternsProps) {
  return (
    <group>
      {positions.map((lantern, i) => (
        <Lantern
          key={i}
          position={lantern.pos}
          color={lantern.color || "#ff8844"}
        />
      ))}
    </group>
  );
}

// Generate lantern positions along track - limit count to avoid hitting WebGL limits
export function generateLanternPositions(
  trackCurve: THREE.CatmullRomCurve3,
  count: number,
  distance: number,
  seed: number = 54321
): Array<{ pos: [number, number, number]; color?: string }> {
  // Cap at 10 lanterns to stay within WebGL texture unit limits
  count = Math.min(count, 10);
  const positions: Array<{ pos: [number, number, number]; color?: string }> = [];

  const seededRandom = (s: number) => {
    const x = Math.sin(s) * 10000;
    return x - Math.floor(x);
  };

  const colors = ["#ff8844", "#ffaa66", "#ff9955", "#ffbb77"];

  for (let i = 0; i < count; i++) {
    const t = i / count;
    const point = trackCurve.getPointAt(t);
    const tangent = trackCurve.getTangentAt(t);

    // Get perpendicular direction
    const perpendicular = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();

    // Alternate sides
    const side = i % 2 === 0 ? 1 : -1;

    const x = point.x + perpendicular.x * distance * side;
    const z = point.z + perpendicular.z * distance * side;

    const colorIndex = Math.floor(seededRandom(seed + i) * colors.length);

    positions.push({
      pos: [x, 0, z],
      color: colors[colorIndex],
    });
  }

  return positions;
}
