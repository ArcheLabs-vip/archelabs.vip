import { useState } from "react";
import { EMAIL, faqs, waLink } from "../data";
import { ArrowIcon, Reveal, SectionHeading } from "./Reveal";
import { cn } from "../utils/cn";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative py-28 sm:py-36">
      <div className="mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            index="007"
            label="Perguntas"
            title={
              <>
                Antes de <span className="text-highlight">começar.</span>
              </>
            }
            body="Escopo, propriedade, prazos e continuidade explicados de forma direta."
          />
          <Reveal delay={200}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={waLink("Olá! Tenho uma dúvida sobre os planos da Arche Labs.")} target="_blank" rel="noreferrer" className="btn btn-secondary">
                Perguntar no WhatsApp
                <ArrowIcon />
              </a>
              <a href={`mailto:${EMAIL}`} className="btn btn-secondary !border-transparent !bg-transparent text-muted hover:text-ink">
                {EMAIL}
              </a>
            </div>
          </Reveal>
        </div>

        <div className="border-t border-white/10">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 50} className="border-b border-white/10">
                <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} aria-controls={`faq-answer-${i}`} id={`faq-question-${i}`} className="group flex w-full items-center gap-6 py-6 text-left">
                  <span className="font-mono text-xs text-muted">0{i + 1}</span>
                  <span
                    className={cn(
                      "flex-1 font-display text-lg font-medium tracking-[-0.025em] transition sm:text-xl",
                      isOpen ? "text-ink" : "text-soft group-hover:text-ink"
                    )}
                  >
                    {f.q}
                  </span>
                  <span
                    className={cn(
                      "relative grid h-9 w-9 shrink-0 place-items-center rounded-md border transition-all duration-300",
                      isOpen ? "rotate-45 border-electric bg-electric text-white" : "border-white/15 text-electric-light group-hover:border-white/40"
                    )}
                  >
                    <span className="absolute h-px w-3.5 bg-current" />
                    <span className="absolute h-3.5 w-px bg-current" />
                  </span>
                </button>
                <div id={`faq-answer-${i}`} role="region" aria-labelledby={`faq-question-${i}`} aria-hidden={!isOpen} inert={!isOpen} className={cn("grid transition-all duration-500", isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                  <div className="overflow-hidden">
                    <p className="max-w-xl pb-7 pl-10 text-sm leading-[1.75] text-muted sm:text-[15px]">{f.a}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
