import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useAnimationVisibility } from "../hooks/useAnimationVisibility";
import { waLink } from "../data";
import { ArrowIcon } from "./Reveal";
import { cn } from "../utils/cn";

function useLoop(duration = 8000) {
  const [p, setP] = useState(0);
  const { ref, running, reducedMotion } = useAnimationVisibility<HTMLDivElement>();
  useEffect(() => {
    if (!running) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      setP(((t - start) % duration) / duration);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration, running]);
  return { ref, p: reducedMotion ? 1 : p };
}

const Section = ({ label, h, children }: { label: string; h: string; children?: ReactNode }) => (
  <div className={cn("relative", h)}>
    {children}
    <span className="absolute right-1 top-1 rounded bg-electric/15 px-1 font-mono text-[8px] uppercase tracking-widest text-glow">
      {label}
    </span>
  </div>
);

/* Wireframe técnico (estado inicial) */
const Wire = () => (
  <div className="technical-grid absolute inset-0 space-y-2 bg-graphite p-4 [background-size:24px_24px]">
    <Section label="nav" h="h-6">
      <div className="flex h-full items-center justify-between rounded border border-dashed border-white/20 px-2">
        <div className="h-2 w-10 rounded bg-white/20" />
        <div className="h-3 w-12 rounded border border-dashed border-white/30" />
      </div>
    </Section>
    <Section label="hero · promessa" h="h-36">
      <div className="flex h-full items-center gap-3 rounded border border-dashed border-white/20 p-3">
        <div className="flex-1 space-y-2">
          <div className="h-3 w-4/5 rounded bg-white/25" />
          <div className="h-3 w-3/5 rounded bg-white/25" />
          <div className="h-1.5 w-full rounded bg-white/10" />
          <div className="h-1.5 w-4/5 rounded bg-white/10" />
          <div className="mt-3 h-5 w-20 rounded border border-dashed border-electric-light" />
        </div>
        <div className="relative h-full w-2/5 rounded border border-dashed border-white/20">
          <svg className="absolute inset-0 h-full w-full text-white/15" preserveAspectRatio="none">
            <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" />
            <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" />
          </svg>
        </div>
      </div>
    </Section>
    <Section label="prova social" h="h-12">
      <div className="grid h-full grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded border border-dashed border-white/20" />
        ))}
      </div>
    </Section>
    <Section label="oferta" h="h-20">
      <div className="grid h-full grid-cols-2 gap-2">
        <div className="rounded border border-dashed border-white/20" />
        <div className="rounded border border-dashed border-electric-light/70" />
      </div>
    </Section>
    <Section label="cta final" h="h-12">
      <div className="flex h-full items-center justify-center rounded border border-dashed border-white/20">
        <div className="h-5 w-28 rounded border border-dashed border-electric-light" />
      </div>
    </Section>
  </div>
);

/* Página final do cliente (exemplo: academia) */
const Final = () => (
  <div className="absolute inset-0 overflow-hidden bg-graphite">
    <img
      src="/assets/projects/essencial/essencial-academias.webp"
      alt="Landing page da coleção Essencial para academias"
      srcSet="/assets/projects/essencial/essencial-academias-480.webp 480w, /assets/projects/essencial/essencial-academias-960.webp 960w, /assets/projects/essencial/essencial-academias.webp 1400w"
      sizes="(min-width: 1024px) 560px, 90vw"
      width="1400"
      height="900"
      className="h-full w-full object-cover object-top"
    />
  </div>
);

function Bracket({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  return (
    <span
      className={cn(
        "pointer-events-none absolute h-6 w-6 border-electric-light/60",
        pos === "tl" && "-left-3 -top-3 rounded-tl-md border-l-2 border-t-2",
        pos === "tr" && "-right-3 -top-3 rounded-tr-md border-r-2 border-t-2",
        pos === "bl" && "-bottom-3 -left-3 rounded-bl-md border-b-2 border-l-2",
        pos === "br" && "-bottom-3 -right-3 rounded-br-md border-b-2 border-r-2"
      )}
      style={{ boxShadow: "0 0 12px rgba(52,133,255,0.15)" }}
    />
  );
}

function BuildMockup() {
  const { ref, p } = useLoop(8000);
  const scan = Math.min(1, Math.max(0, (p - 0.12) / 0.5));
  const done = scan >= 1;
  const showToast = p > 0.7 && p < 0.97;
  const wire = useMemo(() => <Wire />, []);
  const final = useMemo(() => <Final />, []);

  return (
    <div ref={ref} className="relative">
      <Bracket pos="tl" />
      <Bracket pos="tr" />
      <Bracket pos="bl" />
      <Bracket pos="br" />

      <div className="relative overflow-hidden rounded-xl border border-white/12 bg-graphite shadow-[0_2.5rem_7rem_rgba(0,65,201,0.18)]">
        <div className="flex items-center gap-2 border-b border-white/8 bg-surface px-3 py-2">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          </div>
          <div className="mx-auto flex items-center gap-1.5 rounded-md bg-obsidian px-3 py-1 font-mono text-[10px] text-muted">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
            seunegocio.com.br
          </div>
          <div className={cn("w-10 font-mono text-[9px]", done ? "text-[#22c55e]" : "text-glow")}>
            {done ? "100%" : `${Math.round(scan * 100)}%`}
          </div>
        </div>
        <div className="relative h-[330px] sm:h-[360px]">
          {wire}
          <div className="absolute inset-0" style={{ clipPath: `inset(0 0 ${100 - scan * 100}% 0)` }}>
            {final}
          </div>
          {scan > 0 && scan < 1 && (
            <div
              className="pointer-events-none absolute inset-x-0 h-px bg-electric-light shadow-[0_0_20px_4px_rgba(52,133,255,0.6)]"
              style={{ top: `${scan * 100}%` }}
            >
              <span className="absolute right-2 -top-4 rounded bg-electric px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-widest text-white">
                construindo
              </span>
            </div>
          )}
        </div>
      </div>

      {/* toast whatsapp */}
      <div
        className={cn(
          "surface-strong absolute -bottom-6 -left-3 flex items-center gap-3 rounded-xl px-4 py-3 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.9)] transition-all duration-500 sm:-left-10",
          showToast ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        )}
      >
        <div className="relative grid h-9 w-9 place-items-center rounded-full bg-wa text-obsidian">
          <span className="pulse-ring absolute inset-0 rounded-full bg-wa" />
          <svg className="relative" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z"/></svg>
        </div>
        <div>
          <div className="text-[13px] font-semibold leading-tight text-ink">Novo contato pelo WhatsApp</div>
          <div className="font-mono text-[10px] text-muted">agora · via landing page</div>
        </div>
      </div>

      {/* spec tag */}
      <div className="surface-strong absolute -right-3 -top-5 rounded-lg px-3 py-2 font-mono text-[10px] leading-tight shadow-lg sm:-right-8">
        <div className="text-[#22c55e]">Carregamento rápido</div>
        <div className="text-muted">mobile first</div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-24 sm:pt-40 lg:pb-32">
      <div className="technical-grid pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-electric/15 blur-[140px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
        <div>
          <div className="mb-8 inline-flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] py-1.5 pl-1.5 pr-4">
            <span className="rounded-md bg-electric px-2 py-1 font-mono text-[10px] tracking-widest text-white">ἀρχή</span>
            <span className="text-[13px] text-soft">
              <span className="font-display font-medium text-ink">archē</span> — o princípio, a origem.
            </span>
          </div>

          <h1 className="display text-[clamp(3rem,7.4vw,6rem)] tracking-[-0.065em] text-ink">
            Toda venda
            <br />
            começa em uma{" "}
            <span className="relative inline-block text-highlight">
              página.
              <svg className="absolute -bottom-1 left-0 w-full text-electric" viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden>
                <path
                  d="M2 8 H298"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  style={{ strokeDasharray: 1000, animation: "draw 1.6s 0.5s var(--ease-precise) both" }}
                />
              </svg>
            </span>
          </h1>

          <p className="mt-8 max-w-lg text-base leading-relaxed text-muted md:text-lg">
            Estratégia, design e desenvolvimento de landing pages que transformam visitas em
            <span className="font-medium text-ink"> contatos e conversas comerciais</span> — com prazo, escopo e preço definidos antes de começar.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={waLink("Olá! Quero iniciar um projeto de landing page com a Arche Labs.")}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              Iniciar meu projeto
              <ArrowIcon />
            </a>
            <a href="#planos" className="btn btn-secondary">
              Ver planos · a partir de R$ 997
            </a>
          </div>

          <dl className="mt-14 grid max-w-lg grid-cols-3 divide-x divide-white/10 border-y border-white/10">
            {[
              ["3 dias", "entrega mais rápida"],
              ["100%", "dos ativos no seu nome"],
              ["0", "improviso no processo"],
            ].map(([a, b]) => (
              <div key={b} className="px-4 py-4 first:pl-0">
                <dt className="font-display text-3xl font-medium tracking-[-0.04em] text-ink">{a}</dt>
                <dd className="mt-1 text-xs leading-snug text-muted">{b}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:pl-14">
          <BuildMockup />
        </div>
      </div>
    </section>
  );
}
