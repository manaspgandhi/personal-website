"use client";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody } from "@react-three/rapier";
import { useGameStore } from "@/components/game/stores/gameStore";
import * as THREE from "three";

const MAX_SPEED = 25;
const ACCEL = 0.5;
const BRAKE = 0.3;
const STEER_SPEED = 0.04; // radians per frame, applied directly to rotation
const FRICTION = 0.98;

interface KartControllerProps {
  rigidBodyRef: React.RefObject<RapierRigidBody | null>;
  inputRef: React.RefObject<{ forward: boolean; backward: boolean; left: boolean; right: boolean }>;
  debugRef: React.MutableRefObject<string>;
}

export default function KartController({ rigidBodyRef, inputRef, debugRef }: KartControllerProps) {
  const savedVelocity = useRef<{ x: number; y: number; z: number } | null>(null);

  useFrame(() => {
    const rb = rigidBodyRef.current;
    const input = inputRef.current;
    if (!rb) {
      debugRef.current = "no rigidbody ref";
      return;
    }
    if (!input) {
      debugRef.current = "no input ref";
      return;
    }

    const mode = useGameStore.getState().mode;

    // When paused/finished, zero velocity
    if (mode === "paused" || mode === "finished") {
      if (!savedVelocity.current) {
        const vel = rb.linvel();
        savedVelocity.current = { x: vel.x, y: vel.y, z: vel.z };
      }
      rb.setLinvel({ x: 0, y: 0, z: 0 }, true);
      rb.setAngvel({ x: 0, y: 0, z: 0 }, true);
      debugRef.current = `mode=${mode} (paused)`;
      return;
    }

    // Restore velocity when resuming
    if (savedVelocity.current && mode === "playing") {
      rb.setLinvel(savedVelocity.current, true);
      savedVelocity.current = null;
    }

    if (mode !== "playing") {
      debugRef.current = `mode=${mode}`;
      return;
    }

    // Steering — directly set rotation (bypass angular physics / ground friction)
    const rotation = rb.rotation();
    const quat = new THREE.Quaternion(rotation.x, rotation.y, rotation.z, rotation.w);
    const euler = new THREE.Euler().setFromQuaternion(quat, "YXZ");

    const vel = rb.linvel();
    const horizontalSpeed = Math.sqrt(vel.x * vel.x + vel.z * vel.z);

    if (horizontalSpeed > 0.3) {
      if (input.left) euler.y += STEER_SPEED;
      if (input.right) euler.y -= STEER_SPEED;
      const newQuat = new THREE.Quaternion().setFromEuler(euler);
      rb.setRotation({ x: newQuat.x, y: newQuat.y, z: newQuat.z, w: newQuat.w }, true);
    }
    // Zero angular velocity so physics doesn't fight our rotation
    rb.setAngvel({ x: 0, y: 0, z: 0 }, true);

    // Forward direction from (possibly updated) rotation
    const forward = new THREE.Vector3(0, 0, 1).applyQuaternion(
      new THREE.Quaternion().setFromEuler(euler)
    );

    // Get current velocity
    let vx = vel.x;
    let vy = vel.y;
    let vz = vel.z;

    // Apply acceleration directly to velocity
    if (input.forward) {
      vx += forward.x * ACCEL;
      vz += forward.z * ACCEL;
    }
    if (input.backward) {
      vx -= forward.x * BRAKE;
      vz -= forward.z * BRAKE;
    }

    // Speed cap
    if (horizontalSpeed > MAX_SPEED) {
      const scale = MAX_SPEED / horizontalSpeed;
      vx *= scale;
      vz *= scale;
    }

    // Friction
    vx *= FRICTION;
    vz *= FRICTION;

    // Set velocity directly
    rb.setLinvel({ x: vx, y: vy, z: vz }, true);

    // Update store
    const store = useGameStore.getState();
    store.setSpeed(horizontalSpeed);
    const pos = rb.translation();
    store.setKartPosition([pos.x, pos.y, pos.z]);
    store.setKartRotationY(euler.y);

    const fwd = input.forward ? "W" : "";
    const bwd = input.backward ? "S" : "";
    const lft = input.left ? "A" : "";
    const rgt = input.right ? "D" : "";
    debugRef.current = `playing | spd=${horizontalSpeed.toFixed(1)} | pos=(${pos.x.toFixed(1)},${pos.y.toFixed(1)},${pos.z.toFixed(1)}) | keys=[${fwd}${bwd}${lft}${rgt}]`;
  });

  return null;
}
