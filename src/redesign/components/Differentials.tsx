import { useEffect, useState } from "react";
import { differentials } from "../data";
import { Reveal, SectionHeading } from "./Reveal";
import { useAnimationVisibility } from "../hooks/useAnimationVisibility";
import { cn } from "../utils/cn";

function Gauge() {
  const { ref, running, reducedMotion } = useAnimationVisibility<HTMLDivElement>();
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!running) return;
    let raf = 0;
    const s = performance.now();
    const tick = (t: number) => {
      const k = Math.min(1, (t - s) / 1600);
      setV(Math.round(98 * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running]);
  const value = reducedMotion ? 98 : v;
  const C = 2 * Math.PI * 42;
  return (
    <div ref={ref} className="flex flex-wrap items-center gap-4 sm:gap-6">
      <div className="relative h-28 w-28 shrink-0">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r="42" fill="none" stroke="#fff" strokeOpacity="0.08" strokeWidth="8" />
          <circle
            cx="50" cy="50" r="42" fill="none" stroke="#22c55e" strokeWidth="8" strokeLinecap="butt"
            strokeDasharray={C} strokeDashoffset={C * (1 - value / 100)}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center font-display text-4xl font-medium tracking-tight">{value}</div>
      </div>
      <div className="space-y-2 font-mono text-[11px]">
        {[
          ["Carregamento", "0,8 s"],
          ["Layout estável", "Sim"],
          ["Navegação", "Fluida"],
        ].map(([a, b]) => (
          <div key={a} className="flex w-36 justify-between border-b border-white/8 pb-1.5">
            <span className="text-muted">{a}</span>
            <span className="text-[#22c55e]">{b}</span>
          </div>
        ))}
      </div>
      <p className="w-full text-xs text-muted">Indicadores ilustrativos de performance.</p>
    </div>
  );
}

function Ownership() {
  return (
    <div className="rounded-lg border border-white/10 bg-obsidian p-4 font-mono text-[11px]">
      <div className="mb-3 flex items-center justify-between text-muted">
        <span>titularidade.txt</span>
        <span className="rounded bg-electric/15 px-1.5 py-0.5 text-glow">verificado</span>
      </div>
      {["Domínio", "Código-fonte", "Hospedagem", "Contas e acessos"].map((k) => (
        <div key={k} className="flex items-center justify-between border-t border-dashed border-white/10 py-2">
          <span className="text-soft">{k}</span>
          <span className="flex items-center gap-1.5">
            <span className="text-ink">seu nome</span>
            <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-electric text-[9px] text-white">✓</span>
          </span>
        </div>
      ))}
    </div>
  );
}

function Checklist() {
  const { ref, running, reducedMotion } = useAnimationVisibility<HTMLUListElement>();
  const items = ["Briefing recebido", "Estrutura aprovada", "Versão navegável", "No ar"];
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setN((x) => (x + 1) % (items.length + 2)), 1100);
    return () => clearInterval(id);
  }, [items.length, running]);
  const completed = reducedMotion ? items.length : n;
  return (
    <ul ref={ref} className="space-y-2">
      {items.map((it, i) => (
        <li
          key={it}
          className={cn(
            "flex items-center gap-3 rounded-lg border px-3 py-2 text-sm transition-all duration-500",
            i < completed ? "border-electric/50 bg-electric/10 text-ink" : "border-white/8 text-muted/60"
          )}
        >
          <span className={cn("grid h-4 w-4 place-items-center rounded-full border text-[9px]", i < completed ? "border-electric bg-electric text-white" : "border-white/20")}>
            {i < completed ? "✓" : ""}
          </span>
          {it}
          <span className="ml-auto hidden shrink-0 font-mono text-[10px] opacity-60 sm:block">etapa 0{i + 1}</span>
        </li>
      ))}
    </ul>
  );
}

function ConvertVisual() {
  return (
    <div className="relative flex h-full min-h-40 items-center justify-center">
      <div className="technical-grid absolute inset-0 rounded-lg opacity-60 [background-size:24px_24px]" />
      <div className="relative">
        <div className="rounded-lg bg-wa px-6 py-3 text-sm font-semibold text-obsidian shadow-[0_10px_30px_-8px_rgba(37,211,102,0.7)]">
          Falar no WhatsApp
        </div>
        <span className="pulse-ring absolute inset-0 rounded-lg border-2 border-wa" />
        <svg className="absolute -bottom-6 right-2 h-7 w-7 drop-shadow" viewBox="0 0 24 24" fill="#f5f7fa" stroke="#05060b" strokeWidth="1.2">
          <path d="M5 3l14 8-6 1.5L10 19z" />
        </svg>
      </div>
    </div>
  );
}

export function Differentials() {
  const visuals = [<Checklist key="c" />, <Ownership key="o" />, <Gauge key="g" />, <ConvertVisual key="v" />];
  return (
    <section className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          index="002"
          label="Diferenciais"
          title={
            <>
              Clareza no processo. <span className="text-soft">Controle nos ativos.</span>
            </>
          }
          body="Os diferenciais estão na forma de organizar, construir e entregar cada projeto."
        />

        <div className="mt-16 grid gap-4 md:grid-cols-6">
          {differentials.map((d, i) => (
            <Reveal
              key={d.title}
              delay={i * 90}
              className={cn(
                "surface group flex min-w-0 flex-col justify-between gap-10 rounded-2xl p-7 transition duration-500 hover:-translate-y-0.5 hover:border-electric-light/40 sm:p-8",
                i === 0 && "md:col-span-3",
                i === 1 && "md:col-span-3",
                i === 2 && "md:col-span-4",
                i === 3 && "md:col-span-2"
              )}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-electric-light">0{i + 1}</span>
                  <span className="rounded-md border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                    {d.tag}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-2xl font-medium leading-tight tracking-[-0.04em] text-ink sm:text-3xl">{d.title}</h3>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">{d.text}</p>
              </div>
              <div>{visuals[i]}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
