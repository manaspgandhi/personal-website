"use client";

import { useRef, useCallback, useEffect, useState } from "react";

const COLOR_STOPS = [
  { h: 15, s: 80, l: 57 },   // coral/ember
  { h: 40, s: 85, l: 55 },   // gold
  { h: 220, s: 75, l: 60 },  // electric blue
  { h: 170, s: 70, l: 55 },  // teal
  { h: 280, s: 65, l: 62 },  // purple
  { h: 340, s: 75, l: 58 },  // magenta/pink
];

function lerpColor(colors: typeof COLOR_STOPS, t: number) {
  const clamped = Math.max(0, Math.min(1, t));
  const segment = clamped * (colors.length - 1);
  const i = Math.floor(segment);
  const frac = segment - i;
  const a = colors[Math.min(i, colors.length - 1)];
  const b = colors[Math.min(i + 1, colors.length - 1)];
  return {
    h: a.h + (b.h - a.h) * frac,
    s: a.s + (b.s - a.s) * frac,
    l: a.l + (b.l - a.l) * frac,
  };
}

const DEFAULT_COLOR = "#ede8e2";
const GLOW_RADIUS = 250; // px — how far the color bleeds
const EASE = 0.1;

export default function HeroName() {
  const containerRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const cursorRef = useRef({ x: 0, y: 0, active: false });
  const smoothCursorRef = useRef({ x: 0, y: 0 });
  const letterColorsRef = useRef<string[]>([]);
  const rafRef = useRef<number | null>(null);

  const firstName = "MANAS";
  const lastName = "GANDHI";
  const allLetters = firstName + lastName;
  const [, forceUpdate] = useState(0);

  // Initialize colors
  useEffect(() => {
    letterColorsRef.current = new Array(allLetters.length).fill(DEFAULT_COLOR);
  }, [allLetters.length]);

  const animate = useCallback(() => {
    const cursor = cursorRef.current;
    const smooth = smoothCursorRef.current;

    if (cursor.active) {
      smooth.x += (cursor.x - smooth.x) * EASE;
      smooth.y += (cursor.y - smooth.y) * EASE;
    }

    const letters = letterRefs.current;
    let changed = false;

    for (let i = 0; i < letters.length; i++) {
      const el = letters[i];
      if (!el) continue;

      let targetColor = DEFAULT_COLOR;

      if (cursor.active) {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = smooth.x - cx;
        const dy = smooth.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < GLOW_RADIUS) {
          const t = 1 - dist / GLOW_RADIUS;
          // Use cursor's horizontal position relative to container for color
          const containerRect = containerRef.current?.getBoundingClientRect();
          const normalizedX = containerRect
            ? (smooth.x - containerRect.left) / containerRect.width
            : 0.5;
          const color = lerpColor(COLOR_STOPS, normalizedX);
          const intensity = t * t; // quadratic falloff for smoother feel
          // Blend between default and glow color
          targetColor = `hsl(${color.h}, ${color.s}%, ${color.l + (100 - color.l) * intensity * 0.3}%)`;
          // For closer letters, use full saturation
          if (intensity > 0.3) {
            targetColor = `hsl(${color.h}, ${color.s}%, ${color.l}%)`;
          }
        }
      }

      if (letterColorsRef.current[i] !== targetColor) {
        letterColorsRef.current[i] = targetColor;
        el.style.color = targetColor;
        el.style.textShadow =
          targetColor !== DEFAULT_COLOR
            ? `0 0 40px ${targetColor}, 0 0 80px ${targetColor}33`
            : "none";
        changed = true;
      }
    }

    // Reset letters smoothly when cursor leaves
    if (!cursor.active) {
      let anyNotDefault = false;
      for (let i = 0; i < letters.length; i++) {
        const el = letters[i];
        if (!el) continue;
        if (letterColorsRef.current[i] !== DEFAULT_COLOR) {
          anyNotDefault = true;
          letterColorsRef.current[i] = DEFAULT_COLOR;
          el.style.color = DEFAULT_COLOR;
          el.style.textShadow = "none";
          el.style.transition = "color 0.6s ease, text-shadow 0.6s ease";
          setTimeout(() => {
            if (el) el.style.transition = "";
          }, 600);
        }
      }
      if (!anyNotDefault) return; // stop animation loop
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY, active: true };
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(animate);
      }
    },
    [animate]
  );

  const handleMouseLeave = useCallback(() => {
    cursorRef.current.active = false;
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const setLetterRef = useCallback(
    (index: number) => (el: HTMLSpanElement | null) => {
      letterRefs.current[index] = el;
    },
    []
  );

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="cursor-default"
    >
      <div className="hero-name-line" aria-label="Manas">
        {firstName.split("").map((char, i) => (
          <span
            key={i}
            ref={setLetterRef(i)}
            className="hero-letter"
            style={{ "--i": i, color: DEFAULT_COLOR } as React.CSSProperties}
          >
            {char}
          </span>
        ))}
      </div>
      <div className="hero-name-line" aria-label="Gandhi">
        {lastName.split("").map((char, i) => (
          <span
            key={i}
            ref={setLetterRef(i + firstName.length)}
            className="hero-letter"
            style={{
              "--i": i + firstName.length,
              color: DEFAULT_COLOR,
            } as React.CSSProperties}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}
