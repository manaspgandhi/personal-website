"use client";
import { useGameStore } from "@/components/game/stores/gameStore";
import { projects, experiences } from "@/data/portfolio";
import { PORTAL_PLACEMENTS } from "@/data/track";
import { useCallback, useEffect } from "react";

export default function PortalOverlay() {
  const activeOverlay = useGameStore((s) => s.activeOverlay);
  const mode = useGameStore((s) => s.mode);
  const setActiveOverlay = useGameStore((s) => s.setActiveOverlay);
  const setMode = useGameStore((s) => s.setMode);
  const resumeTimer = useGameStore((s) => s.resumeTimer);

  const dismiss = useCallback(() => {
    const state = useGameStore.getState();
    if (state.mode === "finished") return; // Don't dismiss on finish
    setActiveOverlay(null);
    setMode("playing");
    resumeTimer();
  }, [setActiveOverlay, setMode, resumeTimer]);

  // Keyboard dismiss
  useEffect(() => {
    if (!activeOverlay) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        dismiss();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeOverlay, dismiss]);

  if (!activeOverlay || mode === "finished") return null;

  // Find the portal placement
  const placement = PORTAL_PLACEMENTS.find((p) => p.id === activeOverlay);
  if (!placement) return null;

  // Find the matching project or experience
  const isProject = placement.type === "project";
  const project = isProject ? projects.find((p) => p.title === placement.title) : null;
  const experience = !isProject ? experiences.find((e) => e.company === placement.title) : null;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(5, 5, 5, 0.85)",
        backdropFilter: "blur(8px)",
        zIndex: 100,
      }}
      onClick={dismiss}
    >
      <div
        style={{
          background: "#161616",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "14px",
          padding: "clamp(28px, 4vw, 40px)",
          maxWidth: "560px",
          width: "90%",
          position: "relative",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: project?.color ?? "#e85d3a",
            opacity: 0.8,
          }}
        />

        {isProject && project ? (
          <>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: project.color,
                display: "block",
                marginBottom: "8px",
                marginTop: "8px",
              }}
            >
              {project.category}
            </span>
            <h3
              style={{
                fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
                fontWeight: 700,
                color: "#ede8e2",
                marginBottom: "12px",
                letterSpacing: "-0.02em",
              }}
            >
              {project.title}
            </h3>
            <p
              style={{
                fontSize: "0.9rem",
                color: "#8a8580",
                lineHeight: 1.7,
                marginBottom: "20px",
              }}
            >
              {project.desc}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {project.tags.map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: "monospace",
                    fontSize: "0.7rem",
                    padding: "3px 10px",
                    background: "rgba(232,93,58,0.08)",
                    color: "#e85d3a",
                    borderRadius: "999px",
                    border: "1px solid rgba(232,93,58,0.15)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </>
        ) : experience ? (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: "16px", marginBottom: "16px", flexWrap: "wrap" }}>
              <div>
                <h3 style={{ fontSize: "clamp(1.15rem, 2vw, 1.35rem)", fontWeight: 700, color: "#ede8e2", marginBottom: "4px", letterSpacing: "-0.02em" }}>
                  {experience.company}
                </h3>
                <span style={{ fontSize: "0.9rem", color: "#8a8580" }}>{experience.role}</span>
              </div>
              <span style={{ fontFamily: "monospace", fontSize: "0.78rem", color: "#4a4540", whiteSpace: "nowrap" }}>
                {experience.date}
              </span>
            </div>
            <ul style={{ marginBottom: "16px", listStyle: "none", padding: 0 }}>
              {experience.details.map((d, i) => (
                <li
                  key={i}
                  style={{
                    position: "relative",
                    paddingLeft: "20px",
                    fontSize: "0.9rem",
                    color: "#8a8580",
                    lineHeight: 1.7,
                    marginBottom: "10px",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "10px",
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background: "#e85d3a",
                      opacity: 0.6,
                    }}
                  />
                  {d}
                </li>
              ))}
            </ul>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {experience.tags.map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: "monospace",
                    fontSize: "0.7rem",
                    padding: "3px 10px",
                    background: "rgba(232,93,58,0.08)",
                    color: "#e85d3a",
                    borderRadius: "999px",
                    border: "1px solid rgba(232,93,58,0.15)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </>
        ) : null}

        <button
          onClick={dismiss}
          style={{
            display: "block",
            margin: "24px auto 0",
            fontFamily: "monospace",
            fontSize: "0.85rem",
            padding: "10px 28px",
            background: "transparent",
            color: "#e85d3a",
            border: "1px solid rgba(232,93,58,0.3)",
            borderRadius: "999px",
            cursor: "pointer",
            letterSpacing: "0.05em",
          }}
        >
          Continue Racing [Space]
        </button>
      </div>
    </div>
  );
}
