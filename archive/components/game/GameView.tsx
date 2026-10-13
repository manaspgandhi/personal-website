"use client";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGameStore } from "./stores/gameStore";
import { useInput } from "./hooks/useInput";
import { useGameTimer } from "./hooks/useGameTimer";
import GameCanvas from "./GameCanvas";
import HUD from "./hud/HUD";
import EndScreen from "./hud/EndScreen";
import PortalOverlay from "./portal/PortalOverlay";
import LoadingScreen from "./ui/LoadingScreen";
import TouchControls from "./ui/TouchControls";

export default function GameView() {
  const mode = useGameStore((s) => s.mode);
  const setMode = useGameStore((s) => s.setMode);
  const startTimer = useGameStore((s) => s.startTimer);
  const inputRef = useInput();
  useGameTimer();

  const [loadProgress, setLoadProgress] = useState(0);
  const debugRef = useRef("initializing...");
  const [debugText, setDebugText] = useState("");

  // Update debug display
  useEffect(() => {
    const interval = setInterval(() => {
      setDebugText(debugRef.current);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Simulate loading progress
  useEffect(() => {
    if (mode !== "loading") return;
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setLoadProgress(100);
        setTimeout(() => {
          setMode("ready");
        }, 400);
      } else {
        setLoadProgress(progress);
      }
    }, 200);
    return () => clearInterval(interval);
  }, [mode, setMode]);

  // Start game on any key when ready
  const handleStart = useCallback(() => {
    if (mode === "ready") {
      setMode("playing");
      startTimer();
    }
  }, [mode, setMode, startTimer]);

  useEffect(() => {
    if (mode !== "ready") return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter" || e.key === "w" || e.key === "W" || e.key === "ArrowUp") {
        e.preventDefault();
        handleStart();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [mode, handleStart]);

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
        camera={{ fov: 60, near: 0.1, far: 500, position: [0, 5, 10] }}
        gl={{ antialias: true, alpha: false }}
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <GameCanvas inputRef={inputRef} debugRef={debugRef} />
        </Suspense>
      </Canvas>

      {/* Debug overlay - hidden in production */}
      {false && (
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: 20,
            fontFamily: "monospace",
            fontSize: "0.7rem",
            color: "#0f0",
            background: "rgba(0,0,0,0.7)",
            padding: "6px 10px",
            borderRadius: 4,
            zIndex: 999,
            maxWidth: "50vw",
            wordBreak: "break-all",
          }}
        >
          {debugText}
        </div>
      )}

      {/* HTML Overlays */}
      {mode === "loading" && <LoadingScreen progress={loadProgress} />}

      {mode === "ready" && (
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
              imageRendering: "pixelated",
            }}
          >
            <h1
              style={{
                fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
                fontWeight: "bold",
                color: "#e81224",
                marginBottom: 8,
                fontFamily: "monospace",
                textShadow: "4px 4px 0 #000, -2px -2px 0 #f8b800",
                letterSpacing: "0.05em",
              }}
            >
              PORTFOLIO KART
            </h1>
            <p
              style={{
                fontFamily: "monospace",
                fontSize: "0.9rem",
                color: "#fff",
                marginBottom: 24,
              }}
            >
              DRIVE THROUGH PORTALS!
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
              W A S D - MOVE
            </div>
            <div style={{ color: "#f8b800", fontFamily: "monospace", fontSize: "0.8rem" }}>
              SPACE - BRAKE
            </div>
          </div>
        </div>
      )}

      <HUD />
      <PortalOverlay />
      <EndScreen />
      <TouchControls inputRef={inputRef} />
    </div>
  );
}
