"use client";
import { useMemo } from "react";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { createTrackCurve, TRACK_HALF_WIDTH, TRACK_SAMPLE_COUNT } from "@/data/track";
import { sampleTrackEdges } from "@/components/game/utils/spline";
import * as THREE from "three";

export default function TrackBoundaries() {
  const walls = useMemo(() => {
    const curve = createTrackCurve();
    // Push walls out further from track edge
    const wallOffset = TRACK_HALF_WIDTH + 1.5;
    const { left, right } = sampleTrackEdges(curve, wallOffset, TRACK_SAMPLE_COUNT);

    const segments: Array<{
      position: [number, number, number];
      rotation: [number, number, number];
      size: [number, number, number];
    }> = [];

    // Use smaller step for smoother boundaries
    const step = 2;
    const wallHeight = 3;
    const wallThickness = 0.3;

    for (let i = 0; i < TRACK_SAMPLE_COUNT; i += step) {
      const nextI = Math.min(i + step, TRACK_SAMPLE_COUNT);

      // Left wall
      const lMid = new THREE.Vector3().addVectors(left[i], left[nextI]).multiplyScalar(0.5);
      const lLen = left[i].distanceTo(left[nextI]) + 0.1; // slight overlap
      const lDir = new THREE.Vector3().subVectors(left[nextI], left[i]);
      const lAngle = Math.atan2(lDir.x, lDir.z);

      segments.push({
        position: [lMid.x, wallHeight / 2, lMid.z],
        rotation: [0, lAngle, 0],
        size: [wallThickness, wallHeight, lLen],
      });

      // Right wall
      const rMid = new THREE.Vector3().addVectors(right[i], right[nextI]).multiplyScalar(0.5);
      const rLen = right[i].distanceTo(right[nextI]) + 0.1;
      const rDir = new THREE.Vector3().subVectors(right[nextI], right[i]);
      const rAngle = Math.atan2(rDir.x, rDir.z);

      segments.push({
        position: [rMid.x, wallHeight / 2, rMid.z],
        rotation: [0, rAngle, 0],
        size: [wallThickness, wallHeight, rLen],
      });
    }

    return segments;
  }, []);

  return (
    <>
      {walls.map((wall, i) => (
        <RigidBody key={i} type="fixed" colliders={false} position={wall.position} rotation={wall.rotation}>
          <CuboidCollider args={[wall.size[0] / 2, wall.size[1] / 2, wall.size[2] / 2]} />
        </RigidBody>
      ))}
    </>
  );
}
