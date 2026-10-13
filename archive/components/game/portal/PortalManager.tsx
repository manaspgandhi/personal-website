"use client";
import { useMemo } from "react";
import { createTrackCurve, PORTAL_PLACEMENTS, TRACK_ZONES } from "@/data/track";
import { getPointAtT, getTangentAtT } from "@/components/game/utils/spline";
import { useGameStore } from "@/components/game/stores/gameStore";
import Portal from "./Portal";
import * as THREE from "three";

export default function PortalManager() {
  const collectPortal = useGameStore((s) => s.collectPortal);

  const portals = useMemo(() => {
    const curve = createTrackCurve();

    return PORTAL_PLACEMENTS.map((placement) => {
      const point = getPointAtT(curve, placement.t);
      const tangent = getTangentAtT(curve, placement.t);
      // Portal faces perpendicular to track direction
      const angle = Math.atan2(tangent.x, tangent.z);

      // Find zone color
      const zone = TRACK_ZONES.find(
        (z) => placement.t >= z.start && placement.t < z.end
      );
      const color = zone?.color ?? "#e85d3a";

      return {
        ...placement,
        position: [point.x, 3, point.z] as [number, number, number],
        rotation: angle,
        color,
      };
    });
  }, []);

  const handleCollect = (id: string) => {
    const state = useGameStore.getState();
    if (state.collectedPortals.has(id)) return;
    collectPortal(id);
  };

  return (
    <>
      {portals.map((p) => (
        <Portal
          key={p.id}
          id={p.id}
          position={p.position}
          rotation={p.rotation}
          color={p.color}
          label={p.title}
          type={p.type}
          onCollect={handleCollect}
        />
      ))}
    </>
  );
}
