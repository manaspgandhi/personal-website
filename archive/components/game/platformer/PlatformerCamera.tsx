"use client";
import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface PlatformerCameraProps {
  playerX: number;
  playerY: number;
}

export default function PlatformerCamera({ playerX, playerY }: PlatformerCameraProps) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 5, 20));

  useFrame(() => {
    // Side-scrolling camera - follows player X, stays at fixed Y and Z
    targetPos.current.x = playerX;
    targetPos.current.y = Math.max(5, playerY + 3); // Keep some minimum height
    targetPos.current.z = 15;

    // Smooth camera follow
    camera.position.lerp(targetPos.current, 0.1);
    camera.lookAt(playerX, playerY + 2, 0);
  });

  return null;
}
