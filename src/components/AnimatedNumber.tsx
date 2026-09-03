import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../hooks/useMotionPrefs";

interface AnimatedNumberProps {
  /** Target integer to count up to. */
  target: number;
  /** Zero-pad to this length (e.g. 2 → "01"). Default 2. */
  pad?: number;
  /** Animation duration in ms. Default 900. */
  duration?: number;
  className?: string;
}

/**
 * Counts from 0 to `target` with an ease-out cubic curve when the
 * element enters the viewport. Falls back to the final value when
 * the user prefers reduced motion.
 */
export function AnimatedNumber({
  target,
  pad = 2,
  duration = 900,
  className = "",
}: AnimatedNumberProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setValue(target);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, reduced]);

  const display = pad > 0 ? String(value).padStart(pad, "0") : String(value);

  return (
    <span ref={ref} className={`animated-number ${className}`}>
      {display}
    </span>
  );
}
