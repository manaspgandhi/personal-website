"use client";

// Classic NES Mario Bros color palette
const MARIO_COLORS = {
  sky: "#5c94fc",        // Classic Mario blue sky
  ground: "#00a800",     // Bright green grass
  dirt: "#c84c0c",       // Brown/orange dirt
  brick: "#c84c0c",      // Brick color
};

export default function TrackEnvironment() {
  return (
    <>
      {/* Ground - bright Mario green */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <planeGeometry args={[500, 500]} />
        <meshBasicMaterial color={MARIO_COLORS.ground} />
      </mesh>

      {/* Sky color - set via fog and background */}
      <color attach="background" args={[MARIO_COLORS.sky]} />
      <fog attach="fog" args={[MARIO_COLORS.sky, 150, 400]} />

      {/* Flat lighting for that retro look - no shadows */}
      <ambientLight intensity={1.2} color="#ffffff" />
      <directionalLight position={[50, 100, 50]} intensity={0.5} color="#ffffff" />
    </>
  );
}
