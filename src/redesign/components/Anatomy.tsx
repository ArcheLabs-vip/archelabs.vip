import { useAnimationVisibility } from "../hooks/useAnimationVisibility";
import { useEffect, useState } from "react";
import { SectionHeading } from "./Reveal";
import { cn } from "../utils/cn";

const parts = [
  {
    key: "promessa",
    name: "Promessa",
    question: "“O que é isso? É pra mim?”",
    answer: "Em 3 segundos o visitante entende o que você faz, para quem, e por que deveria continuar rolando.",
  },
  {
    key: "prova",
    name: "Prova",
    question: "“Posso confiar?”",
    answer: "Números, avaliações e rostos reais reduzem o risco percebido antes de qualquer pedido.",
  },
  {
    key: "oferta",
    name: "Oferta",
    question: "“O que eu ganho com isso?”",
    answer: "Benefícios concretos, organizados em hierarquia — não uma lista de tudo o que você faz.",
  },
  {
    key: "objecoes",
    name: "Objeções",
    question: "“E se não der certo?”",
    answer: "As dúvidas que travam a decisão são respondidas no lugar certo, antes que virem desistência.",
  },
  {
    key: "acao",
    name: "Ação",
    question: "“Como eu começo?”",
    answer: "Um próximo passo único, óbvio e sempre ao alcance do polegar. Normalmente: WhatsApp.",
  },
];

function Phone({ active }: { active: number }) {
  const block = (i: number) =>
    cn(
      "relative rounded-lg transition-all duration-500",
      active === i
        ? "bg-electric/15 ring-1 ring-electric-light shadow-[0_0_30px_rgba(18,103,244,0.25)] scale-[1.02]"
        : "bg-white/[0.03] ring-1 ring-white/8 opacity-50"
    );
  return (
    <div className="relative mx-auto w-[280px] rounded-[40px] border border-white/12 bg-surface p-3 shadow-[0_60px_120px_-40px_rgba(18,103,244,0.4)]">
      <div className="absolute left-1/2 top-5 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-obsidian" />
      <div className="space-y-2.5 overflow-hidden rounded-[30px] bg-obsidian px-3 pb-4 pt-12">
        <div className={cn(block(0), "p-3")}>
          <div className="h-2 w-16 rounded bg-electric-light/70" />
          <div className="mt-2.5 h-3.5 w-11/12 rounded bg-ink/70" />
          <div className="mt-1.5 h-3.5 w-3/4 rounded bg-ink/70" />
          <div className="mt-3 h-1.5 w-full rounded bg-ink/20" />
          <div className="mt-1 h-1.5 w-4/5 rounded bg-ink/20" />
          <div className="mt-3 h-6 w-28 rounded bg-electric" />
        </div>
        <div className={cn(block(1), "grid grid-cols-3 gap-1.5 p-2.5")}>
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-md bg-ink/10 p-1.5">
              <div className="h-2.5 w-8 rounded bg-ink/60" />
              <div className="mt-1 h-1 w-10 rounded bg-ink/20" />
            </div>
          ))}
        </div>
        <div className={cn(block(2), "space-y-1.5 p-2.5")}>
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-md bg-electric-light/60" />
              <div className="h-1.5 flex-1 rounded bg-ink/30" />
            </div>
          ))}
        </div>
        <div className={cn(block(3), "space-y-1.5 p-2.5")}>
          {[0, 1].map((i) => (
            <div key={i} className="flex items-center justify-between rounded-md bg-ink/5 px-2 py-1.5">
              <div className="h-1.5 w-24 rounded bg-ink/40" />
              <div className="text-[10px] text-ink/50">+</div>
            </div>
          ))}
        </div>
        <div className={cn(block(4), "flex items-center justify-center p-3")}>
          <div className="flex h-8 w-full items-center justify-center gap-1.5 rounded-md bg-wa text-[10px] font-semibold text-obsidian">
            Chamar no WhatsApp
          </div>
        </div>
      </div>
    </div>
  );
}

export function Anatomy() {
  const { ref, running } = useAnimationVisibility<HTMLElement>();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || !running) return;
    const id = setInterval(() => setActive((a) => (a + 1) % parts.length), 3200);
    return () => clearInterval(id);
  }, [paused, running]);

  return (
    <section ref={ref} id="anatomia" className="relative overflow-hidden border-b border-white/8 bg-deep py-28 sm:py-36">
      <div className="technical-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <SectionHeading
            index="001"
            label="O método"
            title={
              <>
                Uma página não é um folheto.
                <br />
                <span className="text-highlight">É um argumento.</span>
              </>
            }
          />
          <p className="max-w-sm text-base leading-relaxed text-muted lg:pb-2">
            Todo visitante chega com as mesmas cinco perguntas — nesta ordem. Cada seção que construímos existe para responder uma delas.
          </p>
        </div>

        <div
          className="mt-20 grid items-center gap-16 lg:grid-cols-[1fr_auto]"
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <ol className="divide-y divide-white/8 border-y border-white/8">
            {parts.map((p, i) => (
              <li key={p.key}>
                <button
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group grid w-full grid-cols-[3rem_1fr] items-start gap-4 py-6 text-left sm:grid-cols-[4rem_10rem_1fr] sm:gap-6"
                  aria-pressed={active === i}
                >
                  <span className={cn("font-mono text-sm transition", active === i ? "text-electric-light" : "text-muted/50")}>
                    0{i + 1}
                  </span>
                  <span
                    className={cn(
                      "font-display text-2xl font-medium tracking-[-0.04em] transition sm:text-3xl",
                      active === i ? "text-ink" : "text-ink/40 group-hover:text-ink/70"
                    )}
                  >
                    {p.name}
                  </span>
                  <span className="col-span-2 col-start-2 sm:col-span-1 sm:col-start-3">
                    <span className={cn("block text-base transition sm:text-lg", active === i ? "text-ink" : "text-muted/60")}>
                      {p.question}
                    </span>
                    <span
                      className={cn(
                        "grid transition-all duration-500",
                        active === i ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <span className="overflow-hidden text-[15px] leading-relaxed text-muted">{p.answer}</span>
                    </span>
                  </span>
                </button>
                <div className="h-px bg-white/5">
                  {active === i && (
                    <div
                      key={`run-${active}-${paused}`}
                      className="h-px bg-electric-light"
                      style={paused ? { width: "100%" } : { animation: "grow 3.2s linear both" }}
                    />
                  )}
                </div>
              </li>
            ))}
          </ol>
          <Phone active={active} />
        </div>
      </div>
    </section>
  );
}
