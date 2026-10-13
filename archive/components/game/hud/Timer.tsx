"use client";
import { useGameStore } from "@/components/game/stores/gameStore";

export default function Timer() {
  const timerMs = useGameStore((s) => s.timerMs);
  const mins = Math.floor(timerMs / 60000);
  const secs = Math.floor((timerMs % 60000) / 1000);
  const ms = Math.floor((timerMs % 1000) / 10);

  return (
    <div
      style={{
        background: "#000",
        padding: "8px 16px",
        border: "4px solid #fff",
        imageRendering: "pixelated",
      }}
    >
      <div style={{ fontSize: "0.7rem", color: "#f8b800", marginBottom: 4, fontFamily: "monospace", letterSpacing: "0.1em" }}>
        TIME
      </div>
      <div style={{ fontFamily: "monospace", fontSize: "1.4rem", color: "#fff", fontWeight: "bold", letterSpacing: "0.05em" }}>
        {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
      </div>
    </div>
  );
}
