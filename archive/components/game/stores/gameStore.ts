import { create } from "zustand";

export type GameMode = "loading" | "ready" | "playing" | "paused" | "finished";

export interface GameState {
  mode: GameMode;
  timerMs: number;
  timerRunning: boolean;
  collectedPortals: Set<string>;
  activeOverlay: string | null; // portal id
  speed: number;
  kartPosition: [number, number, number];
  kartRotationY: number;

  // Actions
  setMode: (mode: GameMode) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  tickTimer: (deltaMs: number) => void;
  collectPortal: (id: string) => void;
  setActiveOverlay: (id: string | null) => void;
  setSpeed: (speed: number) => void;
  setKartPosition: (pos: [number, number, number]) => void;
  setKartRotationY: (rot: number) => void;
  reset: () => void;
}

export const TOTAL_PORTALS = 14;

export const useGameStore = create<GameState>((set, get) => ({
  mode: "loading",
  timerMs: 0,
  timerRunning: false,
  collectedPortals: new Set<string>(),
  activeOverlay: null,
  speed: 0,
  kartPosition: [0, 1, 0],
  kartRotationY: 0,

  setMode: (mode) => set({ mode }),

  startTimer: () => set({ timerRunning: true, timerMs: 0 }),
  pauseTimer: () => set({ timerRunning: false }),
  resumeTimer: () => set({ timerRunning: true }),
  tickTimer: (deltaMs) => {
    const state = get();
    if (state.timerRunning) {
      set({ timerMs: state.timerMs + deltaMs });
    }
  },

  collectPortal: (id) => {
    const state = get();
    const next = new Set(state.collectedPortals);
    next.add(id);
    const finished = next.size >= TOTAL_PORTALS;
    set({
      collectedPortals: next,
      mode: finished ? "finished" : "paused",
      activeOverlay: id,
      timerRunning: false,
    });
  },

  setActiveOverlay: (id) => set({ activeOverlay: id }),

  setSpeed: (speed) => set({ speed }),
  setKartPosition: (pos) => set({ kartPosition: pos }),
  setKartRotationY: (rot) => set({ kartRotationY: rot }),

  reset: () =>
    set({
      mode: "ready",
      timerMs: 0,
      timerRunning: false,
      collectedPortals: new Set<string>(),
      activeOverlay: null,
      speed: 0,
      kartPosition: [0, 1, 0],
      kartRotationY: 0,
    }),
}));
