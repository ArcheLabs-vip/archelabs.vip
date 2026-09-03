import { useEffect, useRef } from "react";
import { useReducedMotion, canHover } from "../hooks/useMotionPrefs";

/**
 * Fixed overlay that renders a soft radial glow following the cursor.
 * Disabled on touch devices and when the user prefers reduced motion.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !canHover()) return;

    const el = ref.current;
    if (!el) return;

    let rafId = 0;

    const handleMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        el.style.setProperty("--glow-x", `${e.clientX}px`);
        el.style.setProperty("--glow-y", `${e.clientY}px`);
        el.style.opacity = "1";
      });
    };

    const handleLeave = () => {
      cancelAnimationFrame(rafId);
      el.style.opacity = "0";
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(rafId);
    };
  }, [reduced]);

  // Don't render anything for touch-only devices
  if (typeof window !== "undefined" && !canHover()) return null;

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}
