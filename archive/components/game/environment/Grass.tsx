"use client";
import * as THREE from "three";

// Mario-style simple grass tuft
const GRASS_GREEN = "#00d800";

interface GrassPatchProps {
  position: [number, number, number];
  count?: number;
  radius?: number;
}

function GrassPatch({ position }: GrassPatchProps) {
  return (
    <group position={position}>
      {/* Simple Mario grass - just a few triangles */}
      <mesh position={[0, 0.3, 0]}>
        <coneGeometry args={[0.15, 0.6, 3]} />
        <meshBasicMaterial color={GRASS_GREEN} />
      </mesh>
      <mesh position={[-0.2, 0.25, 0.1]}>
        <coneGeometry args={[0.12, 0.5, 3]} />
        <meshBasicMaterial color={GRASS_GREEN} />
      </mesh>
      <mesh position={[0.2, 0.25, -0.1]}>
        <coneGeometry args={[0.12, 0.5, 3]} />
        <meshBasicMaterial color={GRASS_GREEN} />
      </mesh>
    </group>
  );
}

interface GrassFieldProps {
  positions: Array<[number, number, number]>;
}

export default function Grass({ positions }: GrassFieldProps) {
  return (
    <group>
      {positions.map((pos, i) => (
        <GrassPatch key={i} position={pos} count={20 + Math.floor(Math.random() * 20)} />
      ))}
    </group>
  );
}

// Generate grass patch positions
export function generateGrassPositions(
  trackCurve: THREE.CatmullRomCurve3,
  count: number,
  minDistance: number,
  maxDistance: number,
  seed: number = 11111
): Array<[number, number, number]> {
  const positions: Array<[number, number, number]> = [];

  const seededRandom = (s: number) => {
    const x = Math.sin(s) * 10000;
    return x - Math.floor(x);
  };

  for (let i = 0; i < count; i++) {
    const t = seededRandom(seed + i * 7) ;
    const point = trackCurve.getPointAt(t);
    const tangent = trackCurve.getTangentAt(t);

    const perpendicular = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();

    const r1 = seededRandom(seed + i * 3);
    const r2 = seededRandom(seed + i * 3 + 1);

    const side = r1 > 0.5 ? 1 : -1;
    const distance = minDistance + r2 * (maxDistance - minDistance);

    const x = point.x + perpendicular.x * distance * side;
    const z = point.z + perpendicular.z * distance * side;

    positions.push([x, 0, z]);
  }

  return positions;
}
