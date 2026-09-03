import { useEffect, useRef } from "react";
import { useReducedMotion, canHover } from "./useMotionPrefs";

/**
 * Applies a subtle parallax offset to the referenced element based on its
 * distance from the viewport center. Returns a ref to attach.
 *
 * @param factor — how strongly the element drifts (0.04 – 0.12 recommended).
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  factor = 0.08,
) {
  const ref = useRef<T | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    // Gentler on touch devices
    const effectiveFactor = canHover() ? factor : factor * 0.35;

    let rafId = 0;

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = window.innerHeight / 2;
        const offset = (elementCenter - viewportCenter) * effectiveFactor * -1;

        el.style.transform = `translate3d(0, ${offset}px, 0)`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [factor, reduced]);

  return ref;
}
