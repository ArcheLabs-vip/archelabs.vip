import { useState } from "react";
import { steps } from "../data";
import { Reveal, SectionHeading } from "./Reveal";
import { cn } from "../utils/cn";

export function Process() {
  const [active, setActive] = useState(0);
  const s = steps[active];

  return (
    <section id="processo" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeading
            index="004"
            label="Processo"
            title={
              <>
                Do briefing à publicação, <span className="text-highlight">sem improviso.</span>
              </>
            }
          />
          <p className="max-w-sm text-base leading-relaxed text-muted lg:pb-2">
            Seis etapas. Responsabilidades claras de cada lado. Você sempre sabe onde o projeto está e o que vem depois.
          </p>
        </div>

        {/* stepper */}
        <Reveal delay={100} className="mt-16">
          <div className="relative">
            <div className="absolute left-0 right-0 top-5 h-px bg-white/10" />
            <div
              className="absolute left-0 top-5 h-px bg-electric-light shadow-[0_0_10px_rgba(52,133,255,0.8)] transition-all duration-700"
              style={{ width: `${(active / (steps.length - 1)) * 100}%` }}
            />
            <ol className="relative grid grid-cols-6 gap-2">
              {steps.map((st, i) => (
                <li key={st.title} className="flex flex-col items-center sm:items-start">
                  <button
                    onClick={() => setActive(i)}
                    className="group flex flex-col items-center gap-3 sm:items-start"
                    aria-current={active === i ? "step" : undefined}
                  >
                    <span
                      className={cn(
                        "grid h-10 w-10 place-items-center rounded-md border font-mono text-xs transition-all duration-500",
                        i < active && "border-electric bg-electric text-white",
                        i === active && "scale-110 border-electric-light bg-surface text-ink shadow-[0_0_20px_rgba(52,133,255,0.35)]",
                        i > active && "border-white/12 bg-obsidian text-muted group-hover:border-white/30"
                      )}
                    >
                      {i < active ? "✓" : `0${i + 1}`}
                    </span>
                    <span className={cn("hidden text-sm font-medium transition sm:block", i === active ? "text-ink" : "text-muted/70 group-hover:text-soft")}>
                      {st.title}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        {/* detalhe */}
        <div key={active} className="mt-12 grid animate-[fadein_0.5s_ease] gap-4 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div className="surface-strong edge-light rounded-2xl p-8 sm:p-10">
            <div className="font-mono text-xs text-electric-light">Etapa 0{active + 1} / 06</div>
            <h3 className="mt-4 font-display text-4xl font-medium tracking-[-0.05em] text-ink sm:text-5xl">{s.title}</h3>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">{s.text}</p>
            <div className="mt-8 flex gap-2">
              <button
                onClick={() => setActive((a) => Math.max(0, a - 1))}
                disabled={active === 0}
                className="btn btn-secondary !min-h-[2.6rem] !px-4 !text-[0.82rem] disabled:opacity-30"
              >
                ← Anterior
              </button>
              <button
                onClick={() => setActive((a) => Math.min(steps.length - 1, a + 1))}
                disabled={active === steps.length - 1}
                className="btn btn-primary !min-h-[2.6rem] !px-4 !text-[0.82rem] disabled:opacity-30"
              >
                Próxima →
              </button>
            </div>
          </div>
          <div className="surface rounded-2xl p-8">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
              <span className="h-2 w-2 rounded-sm bg-soft" /> Você
            </div>
            <p className="mt-5 font-display text-xl font-medium leading-snug tracking-[-0.03em] text-ink sm:text-2xl">{s.you}</p>
          </div>
          <div className="rounded-2xl border border-electric/40 bg-electric/[0.08] p-8">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-glow">
              <span className="h-2 w-2 rounded-sm bg-electric-light" /> Arche Labs
            </div>
            <p className="mt-5 font-display text-xl font-medium leading-snug tracking-[-0.03em] text-ink sm:text-2xl">{s.us}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
