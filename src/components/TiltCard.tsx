import {
  useEffect,
  useRef,
  type CSSProperties,
  type PropsWithChildren,
} from "react";
import { useReducedMotion, canHover } from "../hooks/useMotionPrefs";

interface TiltCardProps {
  /** Maximum tilt angle in degrees (default 5). */
  maxDeg?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Wrapper that applies a subtle 3-D tilt + light-shimmer on hover.
 * Falls back to a plain div on touch devices and reduced motion.
 */
export function TiltCard({
  children,
  maxDeg = 5,
  className = "",
  style,
}: PropsWithChildren<TiltCardProps>) {
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
        const x = (e.clientX - rect.left) / rect.width; // 0 → 1
        const y = (e.clientY - rect.top) / rect.height;
        const rotateX = (0.5 - y) * maxDeg * 2;
        const rotateY = (x - 0.5) * maxDeg * 2;

        el.style.transform =
          `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        // Update shimmer highlight position
        el.style.setProperty("--shimmer-x", `${x * 100}%`);
        el.style.setProperty("--shimmer-y", `${y * 100}%`);
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
  }, [maxDeg, reduced]);

  return (
    <div ref={ref} className={`tilt-card ${className}`} style={style}>
      {children}
    </div>
  );
}
