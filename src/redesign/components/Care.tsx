import { useEffect, useRef, useState } from "react";
import { careItems } from "../data";
import { ArrowIcon, Reveal } from "./Reveal";
import { cn } from "../utils/cn";

const icons: Record<string, React.ReactNode> = {
  activity: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
  ),
  shield: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>
  ),
  database: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>
  ),
  wrench: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>
  ),
};

/* Recriação do "security core" do site original */
function SecurityCore() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let intersects = false;
    const update = () => setInView(intersects && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      intersects = entry.isIntersecting;
      update();
    }, { threshold: 0.3 });
    observer.observe(el);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  return (
    <div ref={ref} className={cn("security-core relative grid h-80 w-80 shrink-0 place-items-center", inView && "is-visible")} aria-hidden>
      {/* brackets */}
      <div
        className="relative col-start-1 row-start-1 h-52 w-52"
      >
        {(["tl", "tr", "bl", "br"] as const).map((pos) => (
          <span
            key={pos}
            className={cn(
              "absolute h-9 w-9 border-electric-light/40",
              pos === "tl" && "left-0 top-0 rounded-tl-md border-l-2 border-t-2",
              pos === "tr" && "right-0 top-0 rounded-tr-md border-r-2 border-t-2",
              pos === "bl" && "bottom-0 left-0 rounded-bl-md border-b-2 border-l-2",
              pos === "br" && "bottom-0 right-0 rounded-br-md border-b-2 border-r-2"
            )}
            style={{ boxShadow: "0 0 12px rgba(52,133,255,0.15)" }}
          />
        ))}
        {/* scanner */}
        <span
          className="absolute left-0 top-0 h-px w-full"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(52,133,255,0.8), transparent)",
            boxShadow: "0 0 10px rgba(52,133,255,0.8)",
            animation: "core-scan 3.5s ease-in-out 1s infinite alternate both",
            animationPlayState: inView ? "running" : "paused",
          }}
        />
      </div>
      {/* ring */}
      <span
        className="col-start-1 row-start-1 h-[9.5rem] w-[9.5rem] rounded-full border border-electric-light/20"
        style={{
          background: "radial-gradient(circle, rgba(52,133,255,0.08) 0%, transparent 60%)",
          animation: "core-pulse 4s ease-in-out 1.5s infinite",
          animationPlayState: inView ? "running" : "paused",
        }}
      />
      {/* gear */}
      <span
        className="col-start-1 row-start-1 h-28 w-28 rounded-full border-2 border-dashed border-electric-light/35"
        style={{ animation: "core-spin 15s linear infinite", animationPlayState: inView ? "running" : "paused" }}
      />
      {/* center */}
      <span
        className="relative z-10 col-start-1 row-start-1 grid h-16 w-16 place-items-center rounded-full border border-electric-light/40 bg-surface text-electric-light"
        style={{ boxShadow: "0 0 2rem rgba(18,103,244,0.3), inset 0 0 1rem rgba(18,103,244,0.2)" }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
      </span>
    </div>
  );
}

export function Care() {
  return (
    <section id="arche-care" aria-labelledby="arche-care-heading" className="py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="surface-strong overflow-hidden rounded-2xl">
            <div className="grid md:grid-cols-12">
              <div className="relative isolate overflow-hidden p-7 md:col-span-6 md:p-10 lg:p-12">
                <div className="technical-grid pointer-events-none absolute inset-0 opacity-30 [background-size:32px_32px] [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]" />
                <div className="relative">
                  <div className="inline-flex items-center gap-2 rounded-full border border-electric-light/15 bg-electric/[0.06] px-3 py-1.5">
                    <span className="live-dot" aria-hidden />
                    <span className="font-mono text-[0.68rem] tracking-[0.05em] text-electric-light">Operacional</span>
                  </div>
                  <div className="eyebrow mt-8">Arche Care · Manutenção contínua</div>
                  <h2 id="arche-care-heading" className="display mt-4 text-4xl text-ink md:text-5xl lg:text-6xl">
                    Seu site no ar. <span className="text-muted">A operação continua.</span>
                  </h2>
                  <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
                    Depois do lançamento, você escolhe: autonomia total com todos os acessos, ou o Arche Care cuidando de monitoramento, segurança, backups e pequenas alterações — para o site seguir convertendo sem ocupar a sua agenda.
                  </p>
                  <a className="btn btn-secondary mt-10" href="#planos">
                    Incluir ao escolher um plano
                    <ArrowIcon />
                  </a>
                </div>
              </div>
              <div className="hidden items-center justify-center border-l border-white/[0.08] md:col-span-6 md:flex">
                <SecurityCore />
              </div>
            </div>

            <div className="border-t border-white/[0.08] p-7 md:p-10 lg:p-12">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {careItems.map((c, i) => (
                  <Reveal key={c.icon} delay={i * 60}>
                    <article className="group h-full rounded-xl border border-white/[0.07] bg-graphite/60 p-5 transition duration-400 hover:-translate-y-0.5 hover:border-electric-light/30 hover:shadow-[0_8px_2rem_rgba(18,103,244,0.1)]">
                      <div className="grid h-10 w-10 place-items-center rounded-lg border border-electric-light/15 bg-electric/10 text-electric-light">
                        {icons[c.icon]}
                      </div>
                      <h3 className="mt-4 text-sm font-semibold text-ink">{c.title}</h3>
                      <p className="mt-2 text-[0.8rem] leading-relaxed text-muted">{c.detail}</p>
                    </article>
                  </Reveal>
                ))}
              </div>
              <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted">
                <span className="text-electric-light">ℹ</span> Pequenas alterações incluem ajustes de textos, imagens, preços e horários. Novas seções ou mudanças de estrutura são orçadas à parte.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
