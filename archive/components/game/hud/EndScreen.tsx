"use client";
import { useGameStore, TOTAL_PORTALS } from "@/components/game/stores/gameStore";

export default function EndScreen() {
  const mode = useGameStore((s) => s.mode);
  const timerMs = useGameStore((s) => s.timerMs);
  const reset = useGameStore((s) => s.reset);

  if (mode !== "finished") return null;

  const mins = Math.floor(timerMs / 60000);
  const secs = Math.floor((timerMs % 60000) / 1000);
  const ms = Math.floor((timerMs % 1000) / 10);
  const timeStr = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}.${String(ms).padStart(2, "0")}`;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(5, 5, 5, 0.9)",
        backdropFilter: "blur(12px)",
        zIndex: 200,
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 480 }}>
        <h2
          style={{
            fontFamily: "monospace",
            fontSize: "0.85rem",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "#e85d3a",
            marginBottom: 16,
          }}
        >
          Lap Complete
        </h2>
        <div
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            color: "#ede8e2",
            letterSpacing: "-0.02em",
            marginBottom: 8,
          }}
        >
          {timeStr}
        </div>
        <p
          style={{
            fontFamily: "monospace",
            fontSize: "0.85rem",
            color: "#8a8580",
            marginBottom: 40,
          }}
        >
          All {TOTAL_PORTALS} portals collected
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={reset}
            style={{
              fontFamily: "monospace",
              fontSize: "0.85rem",
              padding: "12px 32px",
              background: "#e85d3a",
              color: "#050505",
              border: "none",
              borderRadius: "999px",
              cursor: "pointer",
              fontWeight: 700,
              letterSpacing: "0.05em",
            }}
          >
            Race Again
          </button>
        </div>

        <div
          style={{
            marginTop: 40,
            display: "flex",
            gap: 20,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {[
            { href: "mailto:manaspgandhi@gmail.com", label: "Email" },
            { href: "https://linkedin.com/in/manas-gandhi", label: "LinkedIn" },
            { href: "https://github.com/manaspgandhi", label: "GitHub" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto") ? undefined : "noopener"}
              style={{
                fontFamily: "monospace",
                fontSize: "0.8rem",
                color: "#8a8580",
                textDecoration: "none",
                padding: "8px 16px",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "999px",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
