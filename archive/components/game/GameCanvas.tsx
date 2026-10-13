"use client";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
import Track from "./track/Track";
import TrackZones from "./track/TrackZones";
import TrackEnvironment from "./track/TrackEnvironment";
import EnvironmentManager from "./environment/EnvironmentManager";
import Kart from "./kart/Kart";
import PortalManager from "./portal/PortalManager";
import type { InputState } from "./hooks/useInput";

interface GameCanvasProps {
  inputRef: React.RefObject<InputState>;
  debugRef: React.MutableRefObject<string>;
}

export default function GameCanvas({ inputRef, debugRef }: GameCanvasProps) {
  return (
    <Physics gravity={[0, -20, 0]}>
      <TrackEnvironment />
      <Track />
      <TrackZones />
      {/* No more boundaries - free roaming! */}
      <EnvironmentManager />

      {/* Ground plane collider */}
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[250, 0.1, 250]} position={[0, -0.1, 0]} friction={0.8} />
      </RigidBody>

      <Kart position={[0, 2, 0]} inputRef={inputRef} debugRef={debugRef} />
      <PortalManager />
    </Physics>
  );
}
