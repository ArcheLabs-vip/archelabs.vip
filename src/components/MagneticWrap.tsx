import { useEffect, useRef, type PropsWithChildren } from "react";
import { useReducedMotion, canHover } from "../hooks/useMotionPrefs";

interface MagneticWrapProps {
  /** Pull strength — 0 (no pull) to 1 (follows cursor). Default 0.35. */
  strength?: number;
  className?: string;
}

/**
 * Wrapper that subtly pulls its children toward the cursor on hover.
 * Disabled on touch devices and reduced motion.
 */
export function MagneticWrap({
  children,
  strength = 0.35,
  className = "",
}: PropsWithChildren<MagneticWrapProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || !canHover()) return;

    let rafId = 0;

    const handleMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = (e.clientX - centerX) * strength;
        const dy = (e.clientY - centerY) * strength;

        el.style.transform = `translate(${dx}px, ${dy}px)`;
      });
    };

    const handleLeave = () => {
      cancelAnimationFrame(rafId);
      el.style.transform = "";
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(rafId);
    };
  }, [strength, reduced]);

  return (
    <div ref={ref} className={`magnetic-wrap ${className}`}>
      {children}
    </div>
  );
}
