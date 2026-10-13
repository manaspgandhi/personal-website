"use client";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import type { RapierRigidBody } from "@react-three/rapier";
import * as THREE from "three";

// Mario colors
const MARIO_RED = "#e81224";
const MARIO_SKIN = "#ffb898";
const MARIO_BROWN = "#6b4423";

interface PlayerProps {
  onPositionUpdate: (x: number, y: number) => void;
  onCoinCollect?: (coinId: string) => void;
}

export default function Player({ onPositionUpdate }: PlayerProps) {
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const isGrounded = useRef(true);
  const facingRight = useRef(true);
  const keys = useRef({ left: false, right: false, jump: false });

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") keys.current.left = true;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") keys.current.right = true;
      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W" || e.key === " ") keys.current.jump = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") keys.current.left = false;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") keys.current.right = false;
      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W" || e.key === " ") keys.current.jump = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame(() => {
    if (!rigidBodyRef.current) return;

    const velocity = rigidBodyRef.current.linvel();
    const position = rigidBodyRef.current.translation();

    // Movement
    const moveSpeed = 8;
    let newVelX = 0;

    if (keys.current.left) {
      newVelX = -moveSpeed;
      facingRight.current = false;
    }
    if (keys.current.right) {
      newVelX = moveSpeed;
      facingRight.current = true;
    }

    // Apply horizontal movement
    rigidBodyRef.current.setLinvel({ x: newVelX, y: velocity.y, z: 0 }, true);

    // Jump - only when grounded
    if (keys.current.jump && isGrounded.current) {
      rigidBodyRef.current.setLinvel({ x: velocity.x, y: 12, z: 0 }, true);
      isGrounded.current = false;
      keys.current.jump = false; // Prevent holding jump
    }

    // Check if grounded (simple check based on velocity)
    if (Math.abs(velocity.y) < 0.1 && position.y < 2) {
      isGrounded.current = true;
    }

    // Update camera position
    onPositionUpdate(position.x, position.y);

    // Reset if fallen
    if (position.y < -10) {
      rigidBodyRef.current.setTranslation({ x: 0, y: 5, z: 0 }, true);
      rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
    }
  });

  return (
    <RigidBody
      ref={rigidBodyRef}
      position={[0, 3, 0]}
      colliders={false}
      mass={1}
      lockRotations
      linearDamping={0.5}
      onCollisionEnter={() => {
        isGrounded.current = true;
      }}
    >
      <CuboidCollider args={[0.4, 0.5, 0.4]} />

      {/* Mario body - simple blocky style */}
      <group>
        {/* Body */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.8, 0.6, 0.8]} />
          <meshBasicMaterial color={MARIO_RED} />
        </mesh>

        {/* Head */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[0.6, 0.5, 0.6]} />
          <meshBasicMaterial color={MARIO_SKIN} />
        </mesh>

        {/* Hat */}
        <mesh position={[0, 0.8, 0]}>
          <boxGeometry args={[0.7, 0.2, 0.7]} />
          <meshBasicMaterial color={MARIO_RED} />
        </mesh>

        {/* Hat brim */}
        <mesh position={[0.2, 0.65, 0]}>
          <boxGeometry args={[0.4, 0.1, 0.5]} />
          <meshBasicMaterial color={MARIO_RED} />
        </mesh>

        {/* Legs */}
        <mesh position={[-0.2, -0.5, 0]}>
          <boxGeometry args={[0.3, 0.4, 0.3]} />
          <meshBasicMaterial color={MARIO_BROWN} />
        </mesh>
        <mesh position={[0.2, -0.5, 0]}>
          <boxGeometry args={[0.3, 0.4, 0.3]} />
          <meshBasicMaterial color={MARIO_BROWN} />
        </mesh>
      </group>
    </RigidBody>
  );
}
