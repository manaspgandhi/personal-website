"use client";

// Mario Kart inspired colors - red kart like Mario's
const KART_RED = "#e81224";
const KART_DARK = "#a00000";
const KART_YELLOW = "#f8b800";
const WHEEL_BLACK = "#181818";

export default function KartModel() {
  return (
    <group>
      {/* Main body - blocky Mario style */}
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[1.8, 0.5, 2.6]} />
        <meshBasicMaterial color={KART_RED} />
      </mesh>

      {/* Body stripe */}
      <mesh position={[0, 0.35, 0.01]}>
        <boxGeometry args={[0.4, 0.52, 2.62]} />
        <meshBasicMaterial color={KART_YELLOW} />
      </mesh>

      {/* Cockpit back */}
      <mesh position={[0, 0.7, -0.3]}>
        <boxGeometry args={[1.2, 0.4, 1.0]} />
        <meshBasicMaterial color={KART_DARK} />
      </mesh>

      {/* Front bumper */}
      <mesh position={[0, 0.25, 1.4]}>
        <boxGeometry args={[1.6, 0.3, 0.3]} />
        <meshBasicMaterial color={KART_YELLOW} />
      </mesh>

      {/* Rear bumper */}
      <mesh position={[0, 0.25, -1.4]}>
        <boxGeometry args={[1.6, 0.3, 0.3]} />
        <meshBasicMaterial color={KART_YELLOW} />
      </mesh>

      {/* Steering wheel */}
      <mesh position={[0, 0.7, 0.2]} rotation={[-0.3, 0, 0]}>
        <torusGeometry args={[0.2, 0.05, 6, 8]} />
        <meshBasicMaterial color={WHEEL_BLACK} />
      </mesh>

      {/* Wheels - chunky Mario style */}
      {[
        [-0.95, 0.22, 0.9],
        [0.95, 0.22, 0.9],
        [-0.95, 0.22, -0.9],
        [0.95, 0.22, -0.9],
      ].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          {/* Tire */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.3, 0.3, 0.25, 8]} />
            <meshBasicMaterial color={WHEEL_BLACK} />
          </mesh>
          {/* Hub */}
          <mesh rotation={[0, 0, Math.PI / 2]} position={[i % 2 === 0 ? -0.13 : 0.13, 0, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 0.05, 6]} />
            <meshBasicMaterial color={KART_YELLOW} />
          </mesh>
        </group>
      ))}

      {/* Number 1 on side (simplified) */}
      <mesh position={[0.91, 0.4, 0]}>
        <boxGeometry args={[0.02, 0.3, 0.1]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-0.91, 0.4, 0]}>
        <boxGeometry args={[0.02, 0.3, 0.1]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}
