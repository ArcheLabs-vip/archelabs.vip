import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../../hooks/useMotionPrefs";

/** Pause decorative work outside the viewport, in hidden tabs, or with reduced motion. */
export function useAnimationVisibility<T extends Element>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let intersects = false;
    const update = () => setVisible(intersects && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      intersects = entry.isIntersecting;
      update();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  return { ref, running: visible && !reducedMotion, reducedMotion };
}
