import * as THREE from "three";

// ~25 control points for a closed CatmullRom circuit on the XZ plane
// y=0 for all points (flat track)
export const TRACK_CONTROL_POINTS: [number, number, number][] = [
  [0, 0, 0],
  [30, 0, -10],
  [60, 0, -5],
  [80, 0, -25],
  [100, 0, -50],
  [90, 0, -80],
  [65, 0, -95],
  [40, 0, -100],
  [15, 0, -90],
  [-10, 0, -75],
  [-30, 0, -85],
  [-55, 0, -80],
  [-70, 0, -60],
  [-80, 0, -35],
  [-90, 0, -10],
  [-85, 0, 15],
  [-70, 0, 35],
  [-50, 0, 50],
  [-30, 0, 55],
  [-10, 0, 45],
  [5, 0, 30],
  [15, 0, 15],
  [10, 0, 5],
];

export const TRACK_HALF_WIDTH = 8;
export const TRACK_SAMPLE_COUNT = 500;

// Zone definitions by spline parameter range [0, 1]
export interface TrackZone {
  name: string;
  start: number;
  end: number;
  color: string;
}

export const TRACK_ZONES: TrackZone[] = [
  { name: "AI / Startup", start: 0.0, end: 0.22, color: "#e85d3a" },
  { name: "Systems / Hardware", start: 0.22, end: 0.42, color: "#3a7ee8" },
  { name: "Data / Engineering", start: 0.42, end: 0.58, color: "#3ae87b" },
  { name: "Emerging Tech", start: 0.58, end: 0.78, color: "#8a3ae8" },
  { name: "Applied ML", start: 0.78, end: 1.0, color: "#e8c43a" },
];

// Portal placement: spline parameter + which portfolio item
export type PortalType = "project" | "experience";

export interface PortalPlacement {
  id: string;
  t: number; // spline parameter [0,1]
  type: PortalType;
  title: string; // matches project.title or experience.company
}

export const PORTAL_PLACEMENTS: PortalPlacement[] = [
  // Zone 1: AI / Startup (0.00 - 0.22)
  { id: "p-articulate", t: 0.04, type: "project", title: "Articulate" },
  { id: "e-articulate", t: 0.08, type: "experience", title: "Articulate" },
  { id: "p-sarvaj", t: 0.13, type: "project", title: "Sarvaj.ai" },
  { id: "e-sarvaj", t: 0.18, type: "experience", title: "Sarvaj.ai" },

  // Zone 2: Systems / Hardware (0.22 - 0.42)
  { id: "p-goatos", t: 0.26, type: "project", title: "GoatOS" },
  { id: "p-goatmicro", t: 0.32, type: "project", title: "GoatMicroprocessor" },
  { id: "p-gpucnn", t: 0.38, type: "project", title: "GPU Accelerated CNN" },

  // Zone 3: Data / Engineering (0.42 - 0.58)
  { id: "p-stocks", t: 0.46, type: "project", title: "Stocks Research Agent" },
  { id: "e-target", t: 0.50, type: "experience", title: "Target" },
  { id: "e-sandia", t: 0.55, type: "experience", title: "Sandia National Laboratories" },

  // Zone 4: Emerging Tech (0.58 - 0.78)
  { id: "p-quantum", t: 0.62, type: "project", title: "Quantum Options Pricing" },
  { id: "p-kadena", t: 0.68, type: "project", title: "Subscribe Kadena" },
  { id: "p-robot", t: 0.74, type: "project", title: "Robot Arm Sorter" },

  // Zone 5: Applied ML (0.78 - 1.0)
  { id: "e-xclusive", t: 0.85, type: "experience", title: "Xclusive Sports Management" },
];

// Helper to build the THREE.CatmullRomCurve3
export function createTrackCurve(): THREE.CatmullRomCurve3 {
  const points = TRACK_CONTROL_POINTS.map(
    ([x, y, z]) => new THREE.Vector3(x, y, z)
  );
  return new THREE.CatmullRomCurve3(points, true, "catmullrom", 0.5);
}
