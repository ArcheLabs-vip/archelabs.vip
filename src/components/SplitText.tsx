import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { useReducedMotion } from "../hooks/useMotionPrefs";

interface TextLine {
  text: string;
  className?: string;
}

interface SplitTextProps {
  /** Array of lines — each rendered as a `<span className="block">`. */
  lines: TextLine[];
  /** Heading level to render. Default "h1". */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
  /** Seconds between each word reveal. Default 0.055. */
  stagger?: number;
  /** Base delay before the first word starts. Default 0.1. */
  baseDelay?: number;
}

/**
 * Splits heading text into individually animated words that reveal
 * with staggered opacity + translateY + blur on viewport entry.
 */
export function SplitText({
  lines,
  as: Tag = "h1",
  className = "",
  stagger = 0.055,
  baseDelay = 0.1,
}: SplitTextProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "50px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  let wordIndex = 0;
  const isRevealed = reduced || isVisible;

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, lineIdx) => {
        const words = line.text.split(" ");
        return (
          <span key={lineIdx} className={`block ${line.className ?? ""}`}>
            {words.map((word, wi) => {
              const delay = baseDelay + wordIndex * stagger;
              wordIndex++;
              return (
                <span key={`${lineIdx}-${wi}`}>
                  <span
                    className={`split-word ${isRevealed ? "split-word--visible" : ""}`}
                    style={{ "--word-delay": `${delay}s` } as CSSProperties}
                  >
                    {word}
                  </span>
                  {wi < words.length - 1 && " "}
                </span>
              );
            })}
          </span>
        );
      })}
    </Tag>
  );
}
