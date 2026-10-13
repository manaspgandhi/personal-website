"use client";
import { useRef } from "react";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { RapierRigidBody } from "@react-three/rapier";
import KartModel from "./KartModel";
import KartController from "./KartController";
import KartCamera from "./KartCamera";

interface KartProps {
  position: [number, number, number];
  inputRef: React.RefObject<{ forward: boolean; backward: boolean; left: boolean; right: boolean }>;
  debugRef: React.MutableRefObject<string>;
}

export default function Kart({ position, inputRef, debugRef }: KartProps) {
  const rigidBodyRef = useRef<RapierRigidBody>(null);

  return (
    <>
      <RigidBody
        ref={rigidBodyRef}
        type="dynamic"
        position={position}
        colliders={false}
        mass={1}
        linearDamping={0}
        angularDamping={0}
        enabledRotations={[false, true, false]}
        name="kart"
      >
        <CuboidCollider args={[0.9, 0.4, 1.3]} position={[0, 0.4, 0]} />
        <KartModel />
      </RigidBody>

      <KartController rigidBodyRef={rigidBodyRef} inputRef={inputRef} debugRef={debugRef} />
      <KartCamera rigidBodyRef={rigidBodyRef} />
    </>
  );
}
