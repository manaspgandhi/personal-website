"use client";
import { Suspense, useState, useCallback, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import PlatformerGame from "./PlatformerGame";

export default function PlatformerView() {
  const [started, setStarted] = useState(false);
  const [coins, setCoins] = useState(0);

  // Start game on key press
  useEffect(() => {
    if (started) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter" || e.key === "w" || e.key === "W") {
        setStarted(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [started]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#5c94fc",
        overflow: "hidden",
      }}
    >
      <Canvas
        camera={{ fov: 60, near: 0.1, far: 500, position: [0, 5, 15] }}
        gl={{ antialias: false }} // Crisp pixel look
        style={{ width: "100%", height: "100%", imageRendering: "pixelated" }}
      >
        <Suspense fallback={null}>
          {started && <PlatformerGame />}
        </Suspense>
      </Canvas>

      {/* HUD */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          display: "flex",
          gap: 20,
          zIndex: 50,
        }}
      >
        <div
          style={{
            background: "#000",
            padding: "8px 16px",
            border: "4px solid #fff",
          }}
        >
          <div style={{ fontSize: "0.7rem", color: "#f8b800", fontFamily: "monospace" }}>
            COINS
          </div>
          <div style={{ fontFamily: "monospace", fontSize: "1.2rem", color: "#fff", fontWeight: "bold" }}>
            ★ {String(coins).padStart(2, "0")}
          </div>
        </div>
      </div>

      {/* Start Screen */}
      {!started && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              background: "#000",
              padding: "30px 50px",
              border: "8px solid #fff",
              textAlign: "center",
            }}
          >
            <h1
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                color: "#e81224",
                marginBottom: 8,
                fontFamily: "monospace",
                textShadow: "4px 4px 0 #000",
              }}
            >
              PORTFOLIO WORLD
            </h1>
            <p
              style={{
                fontFamily: "monospace",
                fontSize: "0.9rem",
                color: "#fff",
                marginBottom: 24,
              }}
            >
              COLLECT COINS & ENTER PIPES!
            </p>
            <div
              style={{
                display: "inline-block",
                padding: "10px 20px",
                background: "#e81224",
                border: "4px solid #fff",
                marginBottom: 20,
              }}
            >
              <span style={{ fontSize: "1rem", fontWeight: "bold", color: "#fff", fontFamily: "monospace" }}>
                PRESS START
              </span>
            </div>
            <div style={{ color: "#f8b800", fontFamily: "monospace", fontSize: "0.8rem", marginTop: 8 }}>
              ← → or A D - MOVE
            </div>
            <div style={{ color: "#f8b800", fontFamily: "monospace", fontSize: "0.8rem" }}>
              ↑ or W or SPACE - JUMP
            </div>
          </div>
        </div>
      )}

      {/* Controls hint */}
      {started && (
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#000",
            padding: "8px 16px",
            border: "4px solid #fff",
            fontFamily: "monospace",
            fontSize: "0.75rem",
            color: "#f8b800",
          }}
        >
          ← → MOVE | SPACE JUMP
        </div>
      )}
    </div>
  );
}
