"use client";
import { RigidBody } from "@react-three/rapier";
import { PORTAL_PLACEMENTS } from "@/data/track";

// Mario colors
const COLORS = {
  ground: "#c84c0c",
  groundDark: "#a03000",
  brick: "#c84c0c",
  question: "#f8b800",
  questionDark: "#c87800",
  pipe: "#00a800",
  pipeLight: "#00d800",
  coin: "#f8b800",
};

// Ground block
function GroundBlock({ position }: { position: [number, number, number] }) {
  return (
    <RigidBody type="fixed" position={position} colliders="cuboid">
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={COLORS.ground} />
      </mesh>
      {/* Brick pattern lines */}
      <mesh position={[0, 0, 0.51]}>
        <planeGeometry args={[1, 0.05]} />
        <meshBasicMaterial color={COLORS.groundDark} />
      </mesh>
      <mesh position={[0, 0.25, 0.51]}>
        <planeGeometry args={[1, 0.05]} />
        <meshBasicMaterial color={COLORS.groundDark} />
      </mesh>
    </RigidBody>
  );
}

// Brick block
function BrickBlock({ position }: { position: [number, number, number] }) {
  return (
    <RigidBody type="fixed" position={position} colliders="cuboid">
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={COLORS.brick} />
      </mesh>
    </RigidBody>
  );
}

// Question block with coin
function QuestionBlock({ position, coinId }: { position: [number, number, number]; coinId: string }) {
  return (
    <RigidBody type="fixed" position={position} colliders="cuboid">
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={COLORS.question} />
      </mesh>
      {/* Question mark */}
      <mesh position={[0, 0, 0.51]}>
        <planeGeometry args={[0.4, 0.6]} />
        <meshBasicMaterial color={COLORS.questionDark} />
      </mesh>
    </RigidBody>
  );
}

// Pipe (portal to portfolio)
function Pipe({ position, height = 2, portalData }: { position: [number, number, number]; height?: number; portalData?: typeof PORTAL_PLACEMENTS[0] }) {
  return (
    <RigidBody type="fixed" position={position} colliders="cuboid">
      <group>
        {/* Pipe body */}
        <mesh position={[0, height / 2 - 0.5, 0]}>
          <boxGeometry args={[1.5, height, 1.5]} />
          <meshBasicMaterial color={COLORS.pipe} />
        </mesh>
        {/* Pipe rim */}
        <mesh position={[0, height - 0.3, 0]}>
          <boxGeometry args={[1.8, 0.5, 1.8]} />
          <meshBasicMaterial color={COLORS.pipeLight} />
        </mesh>
        {/* Label */}
        {portalData && (
          <mesh position={[0, height + 0.5, 0]}>
            <planeGeometry args={[2, 0.5]} />
            <meshBasicMaterial color="#000" transparent opacity={0.7} />
          </mesh>
        )}
      </group>
    </RigidBody>
  );
}

// Floating coin
function Coin({ position, id }: { position: [number, number, number]; id: string }) {
  return (
    <group position={position}>
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.5, 0.5, 0.1]} />
        <meshBasicMaterial color={COLORS.coin} />
      </mesh>
    </group>
  );
}

// Platform
function Platform({ position, width }: { position: [number, number, number]; width: number }) {
  return (
    <RigidBody type="fixed" position={position} colliders="cuboid">
      <mesh>
        <boxGeometry args={[width, 0.5, 1]} />
        <meshBasicMaterial color={COLORS.brick} />
      </mesh>
    </RigidBody>
  );
}

export default function Level() {
  // Generate level layout
  const groundBlocks: [number, number, number][] = [];

  // Ground floor - long stretch
  for (let x = -10; x < 100; x++) {
    groundBlocks.push([x, 0, 0]);
    groundBlocks.push([x, -1, 0]);
  }

  // Platforms at various heights
  const platforms: { pos: [number, number, number]; width: number }[] = [
    { pos: [5, 3, 0], width: 3 },
    { pos: [12, 4, 0], width: 4 },
    { pos: [20, 3, 0], width: 2 },
    { pos: [25, 5, 0], width: 3 },
    { pos: [32, 4, 0], width: 5 },
    { pos: [40, 3, 0], width: 3 },
    { pos: [45, 6, 0], width: 2 },
    { pos: [52, 4, 0], width: 4 },
    { pos: [60, 5, 0], width: 3 },
    { pos: [68, 3, 0], width: 4 },
    { pos: [75, 5, 0], width: 3 },
    { pos: [82, 4, 0], width: 5 },
  ];

  // Question blocks
  const questionBlocks: { pos: [number, number, number]; id: string }[] = [
    { pos: [8, 5, 0], id: "q1" },
    { pos: [15, 6, 0], id: "q2" },
    { pos: [28, 7, 0], id: "q3" },
    { pos: [35, 6, 0], id: "q4" },
    { pos: [48, 8, 0], id: "q5" },
    { pos: [55, 7, 0], id: "q6" },
    { pos: [65, 6, 0], id: "q7" },
    { pos: [78, 7, 0], id: "q8" },
  ];

  // Pipes (linked to portfolio items)
  const pipes: { pos: [number, number, number]; height: number; portal: typeof PORTAL_PLACEMENTS[0] | undefined }[] = PORTAL_PLACEMENTS.slice(0, 8).map((portal, i) => ({
    pos: [10 + i * 10, 1, 0] as [number, number, number],
    height: 2 + (i % 3),
    portal,
  }));

  // Coins
  const coins: { pos: [number, number, number]; id: string }[] = [
    { pos: [3, 2, 0], id: "c1" },
    { pos: [4, 2, 0], id: "c2" },
    { pos: [5, 2, 0], id: "c3" },
    { pos: [18, 5, 0], id: "c4" },
    { pos: [19, 5, 0], id: "c5" },
    { pos: [30, 6, 0], id: "c6" },
    { pos: [31, 6, 0], id: "c7" },
    { pos: [32, 6, 0], id: "c8" },
    { pos: [43, 4, 0], id: "c9" },
    { pos: [44, 4, 0], id: "c10" },
    { pos: [58, 6, 0], id: "c11" },
    { pos: [59, 6, 0], id: "c12" },
    { pos: [70, 5, 0], id: "c13" },
    { pos: [71, 5, 0], id: "c14" },
  ];

  return (
    <group>
      {/* Ground */}
      {groundBlocks.map((pos, i) => (
        <GroundBlock key={`ground-${i}`} position={pos} />
      ))}

      {/* Platforms */}
      {platforms.map((p, i) => (
        <Platform key={`platform-${i}`} position={p.pos} width={p.width} />
      ))}

      {/* Question blocks */}
      {questionBlocks.map((q, i) => (
        <QuestionBlock key={`question-${i}`} position={q.pos} coinId={q.id} />
      ))}

      {/* Pipes */}
      {pipes.map((p, i) => (
        <Pipe key={`pipe-${i}`} position={p.pos} height={p.height} portalData={p.portal} />
      ))}

      {/* Coins */}
      {coins.map((c, i) => (
        <Coin key={`coin-${i}`} position={c.pos} id={c.id} />
      ))}
    </group>
  );
}
