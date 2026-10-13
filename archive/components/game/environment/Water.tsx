"use client";

// Mario water color - bright blue
const WATER_BLUE = "#0058f8";
const WATER_LIGHT = "#3cbcfc";

export default function Water() {
  return (
    <group>
      {/* Pond 1 - square Mario style */}
      <mesh position={[-55, 0.05, 25]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial color={WATER_BLUE} />
      </mesh>

      {/* Pond 2 */}
      <mesh position={[65, 0.05, -55]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[16, 16]} />
        <meshBasicMaterial color={WATER_BLUE} />
      </mesh>

      {/* Pond 3 */}
      <mesh position={[30, 0.05, 40]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 12]} />
        <meshBasicMaterial color={WATER_LIGHT} />
      </mesh>
    </group>
  );
}
