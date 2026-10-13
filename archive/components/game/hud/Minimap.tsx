"use client";
import { useRef, useEffect, useMemo } from "react";
import { useGameStore } from "@/components/game/stores/gameStore";
import { createTrackCurve, TRACK_ZONES } from "@/data/track";

const SIZE = 140;
const PADDING = 10;

export default function Minimap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const kartPosition = useGameStore((s) => s.kartPosition);

  // Sample track points once
  const trackData = useMemo(() => {
    const curve = createTrackCurve();
    const points: { x: number; z: number; t: number }[] = [];
    const sampleCount = 200;
    for (let i = 0; i <= sampleCount; i++) {
      const t = i / sampleCount;
      const p = curve.getPointAt(t);
      points.push({ x: p.x, z: p.z, t });
    }

    // Find bounds
    let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
    for (const p of points) {
      minX = Math.min(minX, p.x);
      maxX = Math.max(maxX, p.x);
      minZ = Math.min(minZ, p.z);
      maxZ = Math.max(maxZ, p.z);
    }

    const rangeX = maxX - minX || 1;
    const rangeZ = maxZ - minZ || 1;
    const scale = (SIZE - PADDING * 2) / Math.max(rangeX, rangeZ);

    return { points, minX, minZ, rangeX, rangeZ, scale };
  }, []);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    const { points, minX, minZ, scale } = trackData;

    ctx.clearRect(0, 0, SIZE, SIZE);

    // Draw track segments colored by zone
    ctx.lineWidth = 2;
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const zone = TRACK_ZONES.find((z) => p1.t >= z.start && p1.t < z.end);
      ctx.strokeStyle = zone?.color ?? "#333";
      ctx.beginPath();
      ctx.moveTo(PADDING + (p1.x - minX) * scale, PADDING + (p1.z - minZ) * scale);
      ctx.lineTo(PADDING + (p2.x - minX) * scale, PADDING + (p2.z - minZ) * scale);
      ctx.stroke();
    }

    // Draw kart dot
    const kx = PADDING + (kartPosition[0] - minX) * scale;
    const kz = PADDING + (kartPosition[2] - minZ) * scale;
    ctx.beginPath();
    ctx.arc(kx, kz, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#e85d3a";
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1;
    ctx.stroke();
  }, [kartPosition, trackData]);

  return (
    <canvas
      ref={canvasRef}
      width={SIZE}
      height={SIZE}
      style={{
        width: SIZE,
        height: SIZE,
        borderRadius: "8px",
        background: "rgba(5,5,5,0.7)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    />
  );
}
