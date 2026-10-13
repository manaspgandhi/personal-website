"use client";

interface LoadingScreenProps {
  progress: number; // 0-100
}

export default function LoadingScreen({ progress }: LoadingScreenProps) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#050505",
        zIndex: 300,
      }}
    >
      <h1
        style={{
          fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
          fontWeight: 800,
          color: "#ede8e2",
          letterSpacing: "-0.02em",
          marginBottom: 8,
        }}
      >
        Manas Gandhi
      </h1>
      <p
        style={{
          fontFamily: "monospace",
          fontSize: "0.85rem",
          color: "#4a4540",
          marginBottom: 40,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        Portfolio Kart
      </p>

      <div
        style={{
          width: "clamp(200px, 40vw, 320px)",
          height: 3,
          background: "#1a1a1a",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "#e85d3a",
            borderRadius: 2,
            transition: "width 0.3s ease",
          }}
        />
      </div>

      <span
        style={{
          fontFamily: "monospace",
          fontSize: "0.75rem",
          color: "#4a4540",
          marginTop: 12,
        }}
      >
        {Math.round(progress)}%
      </span>
    </div>
  );
}
