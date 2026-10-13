"use client";
import { useEffect, useRef } from "react";

export interface InputState {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
}

export function useInput() {
  const inputRef = useRef<InputState>({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "w":
        case "W":
        case "ArrowUp":
          inputRef.current.forward = true;
          break;
        case "s":
        case "S":
        case "ArrowDown":
          inputRef.current.backward = true;
          break;
        case "a":
        case "A":
        case "ArrowLeft":
          inputRef.current.left = true;
          break;
        case "d":
        case "D":
        case "ArrowRight":
          inputRef.current.right = true;
          break;
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      switch (e.key) {
        case "w":
        case "W":
        case "ArrowUp":
          inputRef.current.forward = false;
          break;
        case "s":
        case "S":
        case "ArrowDown":
          inputRef.current.backward = false;
          break;
        case "a":
        case "A":
        case "ArrowLeft":
          inputRef.current.left = false;
          break;
        case "d":
        case "D":
        case "ArrowRight":
          inputRef.current.right = false;
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  return inputRef;
}
