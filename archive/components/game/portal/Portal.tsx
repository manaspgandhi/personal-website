"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { CylinderCollider, RigidBody } from "@react-three/rapier";
import { Text, Billboard } from "@react-three/drei";
import { useGameStore } from "@/components/game/stores/gameStore";
import * as THREE from "three";

interface PortalProps {
  id: string;
  position: [number, number, number];
  rotation: number; // Y rotation to face along track
  color: string;
  label: string;
  type: "project" | "experience";
  onCollect: (id: string) => void;
}

export default function Portal({ id, position, rotation, color, label, type, onCollect }: PortalProps) {
  const torusRef = useRef<THREE.Mesh>(null);
  const collected = useGameStore((s) => s.collectedPortals.has(id));

  useFrame((_, delta) => {
    if (torusRef.current && !collected) {
      torusRef.current.rotation.z += delta * 1.5;
    }
  });

  if (collected) {
    // Show a dimmed, static ring for collected portals
    return (
      <group position={position} rotation={[0, rotation, 0]}>
        <mesh rotation={[0, 0, 0]}>
          <torusGeometry args={[3, 0.15, 8, 32]} />
          <meshStandardMaterial color="#333" transparent opacity={0.3} />
        </mesh>
      </group>
    );
  }

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Spinning torus ring */}
      <mesh ref={torusRef}>
        <torusGeometry args={[3, 0.2, 16, 48]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={3}
          toneMapped={false}
        />
      </mesh>

      {/* Inner glow disc */}
      <mesh>
        <circleGeometry args={[2.8, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>

      {/* Label */}
      <Billboard position={[0, 4.5, 0]}>
        <Text
          fontSize={0.7}
          color={color}
          anchorX="center"
          anchorY="middle"
          font={undefined}
        >
          {label}
        </Text>
        <Text
          fontSize={0.35}
          color="#888"
          anchorX="center"
          anchorY="middle"
          position={[0, -0.6, 0]}
          font={undefined}
        >
          {type === "project" ? "PROJECT" : "EXPERIENCE"}
        </Text>
      </Billboard>

      {/* Sensor collider for collection */}
      <RigidBody type="fixed" colliders={false} sensor>
        <CylinderCollider
          args={[3, 3]}
          sensor
          onIntersectionEnter={(e) => {
            if (e.other.rigidBodyObject?.name === "kart") {
              onCollect(id);
            }
          }}
        />
      </RigidBody>
    </group>
  );
}
