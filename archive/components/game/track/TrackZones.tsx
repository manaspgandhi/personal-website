"use client";
import { useMemo } from "react";
import * as THREE from "three";
import { Line } from "@react-three/drei";
import { createTrackCurve, TRACK_HALF_WIDTH, TRACK_SAMPLE_COUNT, TRACK_ZONES } from "@/data/track";
import { sampleTrackEdges } from "@/components/game/utils/spline";

function ZoneLine({ points, color }: { points: THREE.Vector3[]; color: string }) {
  const pts = useMemo(
    () => points.map((p) => [p.x, p.y, p.z] as [number, number, number]),
    [points]
  );

  return <Line points={pts} color={color} lineWidth={2} />;
}

export default function TrackZones() {
  const zones = useMemo(() => {
    const curve = createTrackCurve();
    const { left, right } = sampleTrackEdges(curve, TRACK_HALF_WIDTH, TRACK_SAMPLE_COUNT);

    return TRACK_ZONES.map((zone) => {
      const startIdx = Math.floor(zone.start * TRACK_SAMPLE_COUNT);
      const endIdx = Math.ceil(zone.end * TRACK_SAMPLE_COUNT);
      const leftSlice = left.slice(startIdx, endIdx + 1).map(p => p.clone().setY(0.05));
      const rightSlice = right.slice(startIdx, endIdx + 1).map(p => p.clone().setY(0.05));
      return { ...zone, leftPoints: leftSlice, rightPoints: rightSlice };
    });
  }, []);

  return (
    <group>
      {zones.map((zone) => (
        <group key={zone.name}>
          <ZoneLine points={zone.leftPoints} color={zone.color} />
          <ZoneLine points={zone.rightPoints} color={zone.color} />
        </group>
      ))}
    </group>
  );
}
