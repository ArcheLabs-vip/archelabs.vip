import { type ReactNode, type ElementType } from "react";
import { useInView } from "../hooks/useInView";
import { cn } from "../utils/cn";

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <Tag
      ref={ref}
      className={cn("reveal", inView && "is-visible", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="eyebrow">{children}</span>
      <span className="blue-rule w-12" />
      <span className="font-mono text-[0.65rem] tracking-[0.1em] text-muted">ARCH / {index}</span>
    </div>
  );
}

export function SectionHeading({
  index,
  label,
  title,
  body,
  className,
}: {
  index: string;
  label: string;
  title: ReactNode;
  body?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <Reveal>
        <SectionLabel index={index}>{label}</SectionLabel>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="display mt-7 text-[clamp(2.4rem,5vw,4.2rem)] text-ink">{title}</h2>
      </Reveal>
      {body && (
        <Reveal delay={140}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">{body}</p>
        </Reveal>
      )}
    </div>
  );
}

export function ArrowIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}
