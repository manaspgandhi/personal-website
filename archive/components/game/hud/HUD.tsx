"use client";
import Timer from "./Timer";
import SpeedDisplay from "./SpeedDisplay";
import PortalCounter from "./PortalCounter";
import Minimap from "./Minimap";
import { useGameStore } from "@/components/game/stores/gameStore";

export default function HUD() {
  const mode = useGameStore((s) => s.mode);

  if (mode !== "playing" && mode !== "paused") return null;

  return (
    <>
      {/* Top-left: Timer + portal counter */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          zIndex: 50,
        }}
      >
        <Timer />
        <PortalCounter />
      </div>

      {/* Top-right: Speed */}
      <div
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 50,
        }}
      >
        <SpeedDisplay />
      </div>

      {/* Bottom-right: Minimap */}
      <div
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          zIndex: 50,
        }}
      >
        <Minimap />
      </div>
    </>
  );
}
