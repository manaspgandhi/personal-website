"use client";

interface ViewToggleProps {
  isGame: boolean;
  onToggle: () => void;
}

export default function ViewToggle({ isGame, onToggle }: ViewToggleProps) {
  return (
    <button
      onClick={onToggle}
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 1000,
        fontFamily: "system-ui, -apple-system, sans-serif",
        fontSize: "0.8rem",
        fontWeight: 500,
        padding: "10px 20px",
        background: "rgba(0, 0, 0, 0.7)",
        color: "#fff",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        borderRadius: "10px",
        cursor: "pointer",
        backdropFilter: "blur(12px)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
        e.currentTarget.style.transform = "translateY(-1px)";
        e.currentTarget.style.boxShadow = "0 6px 24px rgba(0, 0, 0, 0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(0, 0, 0, 0.7)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.3)";
      }}
    >
      {isGame ? "View Traditional Portfolio" : "Play Portfolio Kart"}
    </button>
  );
}
