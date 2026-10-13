"use client";

import { useEffect, useRef } from "react";

export default function HeroOrbs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const vh = window.innerHeight;
        // Only apply parallax while hero is visible
        if (y < vh * 1.5) {
          if (orb1Ref.current)
            orb1Ref.current.style.transform = `translate(0, ${y * 0.25}px)`;
          if (orb2Ref.current)
            orb2Ref.current.style.transform = `translate(0, ${y * -0.15}px)`;
          if (orb3Ref.current)
            orb3Ref.current.style.transform = `translate(-50%, calc(-50% + ${y * 0.35}px))`;
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <div ref={orb1Ref} className="orb orb-1" />
      <div ref={orb2Ref} className="orb orb-2" />
      <div ref={orb3Ref} className="orb orb-3" />
    </div>
  );
}
