"use client";

import { useRef, useCallback, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

const MAX_ROTATION = 7;
const SCALE = 1.025;
const PERSPECTIVE = 1000;

export default function TiltCard({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    const glow = glowRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((centerY - y) / centerY) * MAX_ROTATION;
    const rotateY = ((x - centerX) / centerX) * MAX_ROTATION;

    el.style.transform = `perspective(${PERSPECTIVE}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${SCALE})`;
    el.style.transition = "transform 0.08s ease-out";

    if (glow) {
      glow.style.opacity = "1";
      glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.06) 0%, transparent 60%)`;
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    const glow = glowRef.current;
    if (!el) return;

    el.style.transform = `perspective(${PERSPECTIVE}px) rotateX(0deg) rotateY(0deg) scale(1)`;
    el.style.transition = "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)";

    if (glow) {
      glow.style.opacity = "0";
    }
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 rounded-[inherit] z-10 opacity-0 transition-opacity duration-300"
      />
      {children}
    </div>
  );
}
