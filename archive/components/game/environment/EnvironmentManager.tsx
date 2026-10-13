"use client";
import { useMemo } from "react";
import { createTrackCurve } from "@/data/track";
import Trees, { generateTreePositions } from "./Trees";
import Grass, { generateGrassPositions } from "./Grass";
import Bushes, { generateBushPositions } from "./Bushes";
import Rocks, { generateRockPositions } from "./Rocks";
import Water from "./Water";

export default function EnvironmentManager() {
  // Generate all environment positions once
  const { treePositions, grassPositions, bushPositions, rockPositions } =
    useMemo(() => {
      const curve = createTrackCurve();

      return {
        // Pipes and question blocks
        treePositions: generateTreePositions(curve, 50, 15, 60, 12345),
        // Simple grass tufts
        grassPositions: generateGrassPositions(curve, 40, 10, 40, 11111),
        // Mario bushes
        bushPositions: generateBushPositions(curve, 35, 12, 45, 22222),
        // Brick blocks
        rockPositions: generateRockPositions(curve, 25, 14, 50, 33333),
      };
    }, []);

  return (
    <group>
      <Trees positions={treePositions} />
      <Grass positions={grassPositions} />
      <Bushes positions={bushPositions} />
      <Rocks positions={rockPositions} />
      <Water />
    </group>
  );
}
