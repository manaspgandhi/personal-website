"use client";
import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { RapierRigidBody } from "@react-three/rapier";
import * as THREE from "three";

const CAMERA_BACK = 10;
const CAMERA_UP = 5;
const CAMERA_LERP = 3;
const LOOK_AHEAD = 4;

interface KartCameraProps {
  rigidBodyRef: React.RefObject<RapierRigidBody | null>;
}

export default function KartCamera({ rigidBodyRef }: KartCameraProps) {
  const { camera } = useThree();
  const idealPos = useRef(new THREE.Vector3(0, CAMERA_UP, CAMERA_BACK));
  const idealLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((_, delta) => {
    const rb = rigidBodyRef.current;
    if (!rb) return;

    const pos = rb.translation();
    const rotation = rb.rotation();
    const quat = new THREE.Quaternion(rotation.x, rotation.y, rotation.z, rotation.w);
    const forward = new THREE.Vector3(0, 0, 1).applyQuaternion(quat);

    // Ideal camera position: behind and above the kart
    const targetPos = new THREE.Vector3(
      pos.x - forward.x * CAMERA_BACK,
      pos.y + CAMERA_UP,
      pos.z - forward.z * CAMERA_BACK
    );

    // Ideal look-at: ahead of the kart
    const targetLookAt = new THREE.Vector3(
      pos.x + forward.x * LOOK_AHEAD,
      pos.y + 1,
      pos.z + forward.z * LOOK_AHEAD
    );

    const clampedDelta = Math.min(delta, 0.05);
    const lerpFactor = 1 - Math.exp(-CAMERA_LERP * clampedDelta);

    idealPos.current.lerp(targetPos, lerpFactor);
    idealLookAt.current.lerp(targetLookAt, lerpFactor);

    camera.position.copy(idealPos.current);
    camera.lookAt(idealLookAt.current);
  });

  return null;
}
