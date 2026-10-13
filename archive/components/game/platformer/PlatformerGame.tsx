"use client";
import { useState, useCallback } from "react";
import { Physics } from "@react-three/rapier";
import Player from "./Player";
import Level from "./Level";
import PlatformerCamera from "./PlatformerCamera";

// Mario sky blue
const SKY_COLOR = "#5c94fc";

export default function PlatformerGame() {
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 3 });

  const handlePositionUpdate = useCallback((x: number, y: number) => {
    setPlayerPos({ x, y });
  }, []);

  return (
    <>
      {/* Sky background */}
      <color attach="background" args={[SKY_COLOR]} />

      {/* Flat Mario lighting */}
      <ambientLight intensity={1.2} />
      <directionalLight position={[10, 20, 10]} intensity={0.5} />

      {/* No fog for clean pixel look */}

      <Physics gravity={[0, -25, 0]}>
        <Player onPositionUpdate={handlePositionUpdate} />
        <Level />
      </Physics>

      <PlatformerCamera playerX={playerPos.x} playerY={playerPos.y} />
    </>
  );
}
