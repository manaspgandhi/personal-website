"use client";
import { useGameStore } from "@/components/game/stores/gameStore";
import { TOTAL_PORTALS } from "@/components/game/stores/gameStore";

export default function PortalCounter() {
  const count = useGameStore((s) => s.collectedPortals.size);

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
        COINS
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ color: "#f8b800", fontSize: "1.2rem" }}>★</span>
        <span style={{ fontFamily: "monospace", fontSize: "1.2rem", color: "#fff", fontWeight: "bold" }}>
          {String(count).padStart(2, "0")} / {TOTAL_PORTALS}
        </span>
      </div>
    </div>
  );
}
