import { useAnimationVisibility } from "../hooks/useAnimationVisibility";
import { cn } from "../utils/cn";
import { testimonials } from "../data";
import { SectionHeading } from "./Reveal";

function Card({ q, tag, mono }: { q: string; tag: string; mono: string }) {
  return (
    <figure className="surface flex w-[340px] shrink-0 flex-col justify-between gap-8 rounded-2xl p-7 sm:w-[400px]">
      <div className="flex items-center justify-between">
        <span className="font-display text-5xl font-medium leading-none text-electric-light">“</span>
        <span className="rounded-md border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">{tag}</span>
      </div>
      <blockquote className="font-display text-[1.25rem] font-medium leading-snug tracking-[-0.02em] text-ink">{q}</blockquote>
      <figcaption className="flex items-center gap-3">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-electric-light/45 bg-electric/15 font-mono text-[0.62rem] font-semibold tracking-[0.04em] text-[#8db8ff]">
          {mono}
        </span>
        <span className="grid gap-0.5">
          <strong className="text-[0.78rem] font-semibold text-ink">Relato ilustrativo</strong>
          <small className="font-mono text-[0.65rem] text-muted">Exemplo de experiência · {tag.toLowerCase()}</small>
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const { ref, running } = useAnimationVisibility<HTMLElement>();
  const row = [...testimonials, ...testimonials];
  return (
    <section ref={ref} id="sobre" className="relative overflow-hidden border-y border-white/8 bg-deep py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            index="006"
            label="Relatos"
            title={
              <>
                Experiências que <span className="text-highlight">falam por si.</span>
              </>
            }
            body="Exemplos ilustrativos de como uma presença digital clara pode melhorar a experiência de um negócio. Não são depoimentos de clientes."
          />
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted" aria-hidden>
            Exemplos ilustrativos / Arche Labs
          </p>
        </div>
      </div>
      <div className="group relative mt-16">
        <div className={cn("flex w-max animate-marquee-slow gap-4 px-4 group-hover:[animation-play-state:paused]", !running && "[animation-play-state:paused]!")}>
          {row.map((t, i) => (
            <div key={i} aria-hidden={i >= testimonials.length || undefined}><Card q={t.q} tag={t.tag} mono="EX" /></div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-deep to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-deep to-transparent sm:w-40" />
      </div>
    </section>
  );
}
