"use client";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

export default function PostProcessing() {
  return (
    <EffectComposer>
      {/* Bloom for emissive materials (lanterns, kart lights, portals) */}
      <Bloom
        intensity={0.8}
        luminanceThreshold={0.6}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      {/* Subtle vignette for cinematic feel */}
      <Vignette
        eskil={false}
        offset={0.3}
        darkness={0.6}
      />
    </EffectComposer>
  );
}
