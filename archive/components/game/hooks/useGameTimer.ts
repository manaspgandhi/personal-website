"use client";
import { useEffect, useRef } from "react";
import { useGameStore } from "@/components/game/stores/gameStore";

export function useGameTimer() {
  const lastTime = useRef<number | null>(null);

  useEffect(() => {
    let raf: number;

    const tick = (time: number) => {
      if (lastTime.current !== null) {
        const delta = time - lastTime.current;
        useGameStore.getState().tickTimer(delta);
      }
      lastTime.current = time;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      lastTime.current = null;
    };
  }, []);
}
