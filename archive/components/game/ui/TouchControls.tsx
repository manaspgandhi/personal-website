"use client";
import { useCallback, useEffect, useState } from "react";
import type { InputState } from "@/components/game/hooks/useInput";

interface TouchControlsProps {
  inputRef: React.RefObject<InputState>;
}

export default function TouchControls({ inputRef }: TouchControlsProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const handlePress = useCallback(
    (key: keyof InputState, value: boolean) => {
      if (inputRef.current) {
        inputRef.current[key] = value;
      }
    },
    [inputRef]
  );

  if (!isMobile) return null;

  const buttonStyle: React.CSSProperties = {
    width: 56,
    height: 56,
    borderRadius: "50%",
    background: "rgba(232, 93, 58, 0.15)",
    border: "1px solid rgba(232, 93, 58, 0.3)",
    color: "#e85d3a",
    fontSize: "1.2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    userSelect: "none",
    touchAction: "none",
    cursor: "pointer",
  };

  return (
    <div
      style={{
        position: "absolute",
        bottom: 20,
        left: 20,
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
      }}
    >
      {/* Forward */}
      <button
        style={buttonStyle}
        onTouchStart={() => handlePress("forward", true)}
        onTouchEnd={() => handlePress("forward", false)}
        onMouseDown={() => handlePress("forward", true)}
        onMouseUp={() => handlePress("forward", false)}
      >
        &#9650;
      </button>

      <div style={{ display: "flex", gap: 6 }}>
        {/* Left */}
        <button
          style={buttonStyle}
          onTouchStart={() => handlePress("left", true)}
          onTouchEnd={() => handlePress("left", false)}
          onMouseDown={() => handlePress("left", true)}
          onMouseUp={() => handlePress("left", false)}
        >
          &#9664;
        </button>

        {/* Backward */}
        <button
          style={buttonStyle}
          onTouchStart={() => handlePress("backward", true)}
          onTouchEnd={() => handlePress("backward", false)}
          onMouseDown={() => handlePress("backward", true)}
          onMouseUp={() => handlePress("backward", false)}
        >
          &#9660;
        </button>

        {/* Right */}
        <button
          style={buttonStyle}
          onTouchStart={() => handlePress("right", true)}
          onTouchEnd={() => handlePress("right", false)}
          onMouseDown={() => handlePress("right", true)}
          onMouseUp={() => handlePress("right", false)}
        >
          &#9654;
        </button>
      </div>
    </div>
  );
}
