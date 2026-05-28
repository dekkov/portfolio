import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import jettCursor from "@/assets/jett.jpg";

export function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (reduce) return;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse) return;
    setEnabled(true);
  }, [reduce]);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.classList.add("has-custom-cursor");

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <img
      ref={dotRef}
      src={jettCursor}
      alt=""
      draggable={false}
      className="pointer-events-none fixed top-0 left-0 z-[80] w-10 h-10 object-contain select-none"
      aria-hidden
    />
  );
}
