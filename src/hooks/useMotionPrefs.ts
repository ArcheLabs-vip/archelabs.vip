import { useEffect, useState } from "react";

/**
 * Returns `true` when the user prefers reduced motion.
 * Reacts to live changes of the OS preference.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setReduced(mql.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return reduced;
}

/**
 * Returns `true` when the primary pointer can hover (i.e. not a touch device).
 * Safe to call during render — returns a static snapshot.
 */
export function canHover(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover)").matches
  );
}
