import { useEffect, useState } from "react";

type PreloaderProps = {
  onComplete: () => void;
};

export function Preloader({ onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState<"logo" | "text" | "exit" | "done">("logo");

  useEffect(() => {
    // Check reduced motion preference
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      // Skip animation entirely for reduced motion
      const t = setTimeout(() => {
        setPhase("done");
        onComplete();
      }, 400);
      return () => clearTimeout(t);
    }

    // Phase 1 → Phase 2: show text after logo appears
    const t1 = setTimeout(() => setPhase("text"), 900);
    // Phase 2 → Phase 3: exit after text appears
    const t2 = setTimeout(() => setPhase("exit"), 1700);
    // Phase 3 → done: unmount after exit animation
    const t3 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 2600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  useEffect(() => {
    // Lock scroll during preloader
    document.body.classList.add("preloader-lock");
    return () => {
      document.body.classList.remove("preloader-lock");
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`preloader ${phase === "exit" ? "preloader--exit" : ""}`}
      aria-hidden="true"
    >
      {/* Ambient glow */}
      <div className="preloader__glow" />

      <div className="preloader__content">
        {/* Logo */}
        <div
          className={`preloader__logo ${
            phase !== "logo" || phase === "logo" ? "preloader__logo--in" : ""
          }`}
        >
          <img
            src="/assets/brand/arche-labs-logo-optimized.jpg"
            alt=""
            width="128"
            height="128"
          />
        </div>

        {/* Text */}
        <span
          className={`preloader__text ${
            phase === "text" || phase === "exit" ? "preloader__text--in" : ""
          }`}
        >
          ARCHE LABS
        </span>

        {/* Progress line */}
        <div className="preloader__line-track">
          <div className="preloader__line-fill" />
        </div>
      </div>
    </div>
  );
}
