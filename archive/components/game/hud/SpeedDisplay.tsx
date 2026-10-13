"use client";
import { useGameStore } from "@/components/game/stores/gameStore";

export default function SpeedDisplay() {
  const speed = useGameStore((s) => s.speed);
  const displaySpeed = Math.round(speed * 10);

  return (
    <div
      style={{
        background: "#000",
        padding: "8px 16px",
        border: "4px solid #fff",
        imageRendering: "pixelated",
        textAlign: "right",
      }}
    >
      <div style={{ fontSize: "0.7rem", color: "#f8b800", marginBottom: 4, fontFamily: "monospace", letterSpacing: "0.1em" }}>
        SPEED
      </div>
      <div style={{ fontFamily: "monospace", fontSize: "1.2rem", color: "#fff", fontWeight: "bold" }}>
        {String(displaySpeed).padStart(3, "0")}
      </div>
    </div>
  );
}
