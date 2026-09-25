import { useAnimationVisibility } from "../hooks/useAnimationVisibility";
import { cn } from "../utils/cn";
import { niches } from "../data";
import { Mark } from "./Nav";

export function Marquee() {
  const { ref, running } = useAnimationVisibility<HTMLElement>();
  const items = [...niches, ...niches];
  return (
    <section ref={ref} aria-label="Nichos atendidos" className="relative overflow-hidden border-y border-white/8 bg-deep py-5">
      <div className={cn("flex w-max animate-marquee items-center gap-10 whitespace-nowrap", !running && "[animation-play-state:paused]!")}>
        {items.map((n, i) => (
          <div key={i} aria-hidden={i >= niches.length || undefined} className="flex items-center gap-10">
            <span className="font-display text-2xl font-medium tracking-[-0.04em] text-soft/80 sm:text-3xl">{n}</span>
            <Mark size={14} className="text-electric-light/70" />
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-deep to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-deep to-transparent" />
    </section>
  );
}
