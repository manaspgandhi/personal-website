"use client";
import { useMemo } from "react";
import { createTrackCurve, TRACK_HALF_WIDTH, TRACK_SAMPLE_COUNT } from "@/data/track";
import { createTrackGeometry } from "@/components/game/utils/trackGeometry";
import { sampleTrackEdges } from "@/components/game/utils/spline";
import { Line } from "@react-three/drei";

// Mario brick road colors
const ROAD_COLOR = "#c84c0c";  // Brick orange/brown
const ROAD_DARK = "#a03000";

export default function Track() {
  const { geometry, leftEdge, rightEdge } = useMemo(() => {
    const curve = createTrackCurve();
    const geo = createTrackGeometry(curve, TRACK_HALF_WIDTH, TRACK_SAMPLE_COUNT);
    const { left, right } = sampleTrackEdges(curve, TRACK_HALF_WIDTH - 0.3, TRACK_SAMPLE_COUNT);

    return {
      geometry: geo,
      leftEdge: left.map((p) => [p.x, 0.15, p.z] as [number, number, number]),
      rightEdge: right.map((p) => [p.x, 0.15, p.z] as [number, number, number]),
    };
  }, []);

  return (
    <group>
      {/* Main track surface - Mario brick color */}
      <mesh geometry={geometry} position={[0, 0.1, 0]}>
        <meshBasicMaterial color={ROAD_COLOR} />
      </mesh>

      {/* Yellow edge lines like Mario Kart */}
      <Line points={leftEdge} color="#f8b800" lineWidth={3} />
      <Line points={rightEdge} color="#f8b800" lineWidth={3} />
    </group>
  );
}
