import { useEffect, useState } from "react";
import { EMAIL, INSTAGRAM_URL, waLink } from "../data";
import { Logo } from "./Nav";
import { Reveal } from "./Reveal";
import { cn } from "../utils/cn";
import { Check } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="closing-cta relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24" aria-labelledby="closing-cta-title">
      <div className="closing-cta__glow" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <div className="closing-cta__panel">
            <div className="closing-cta__topline">
              <p className="font-mono text-[11px] tracking-[0.16em] text-accent-light">PRÓXIMO PROJETO</p>
              <p className="closing-cta__index" aria-hidden="true">ARCH / 008</p>
            </div>
            <div className="closing-cta__content">
              <div className="closing-cta__statement">
                <h2 id="closing-cta-title" className="font-display text-5xl font-medium leading-[1.05] tracking-[-0.04em] md:text-7xl">
                  Sua empresa merece <span>mais</span> do que apenas estar online.
                </h2>
                <p className="closing-cta__support">
                  Transforme sua presença digital em uma experiência que apresenta seu valor,
                  inspira confiança e conduz o cliente para a próxima ação.
                </p>
              </div>
              <aside className="closing-cta__action" aria-label="Comece seu projeto">
                <p className="closing-cta__action-label">UM SITE PENSADO PARA</p>
                <ul className="closing-cta__benefits">
                  {["Comunicar com clareza", "Fortalecer sua marca", "Gerar novas oportunidades"].map((benefit) => (
                    <li key={benefit}>
                      <Check aria-hidden="true" size={15} strokeWidth={2} className="shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <a href="#planos" className="closing-cta__button inline-flex items-center justify-center rounded-lg font-semibold transition">
                  Tirar meu projeto do papel
                </a>
                <p className="closing-cta__note">Conte sua ideia e receba um escopo inicial.</p>
              </aside>
            </div>
            <div className="closing-cta__footer" aria-hidden="true">
              <span>Estratégia</span>
              <span>Design</span>
              <span>Desenvolvimento</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="px-4 pb-10 pt-16 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="relative isolate border-b border-ink/10 [container-type:inline-size]">
          <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden pb-12 select-none" aria-hidden="true">
            <div className="whitespace-nowrap font-display text-[16cqw] font-medium leading-none tracking-[-0.04em] text-ink/[0.04]">ARCHE LABS</div>
          </div>
          <div className="grid gap-10 pb-12 md:grid-cols-[1.5fr_1fr_1fr]">
            <div>
              <Logo />
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
                Landing pages estratégicas para negócios que querem transformar visitas em conversas comerciais.
              </p>
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-electric-light">Navegação</div>
              <ul className="mt-4 space-y-2 text-sm">
                {[
                  ["#anatomia", "Método"],
                  ["#trabalhos", "Trabalhos"],
                  ["#processo", "Processo"],
                  ["#planos", "Planos"],
                  ["#faq", "Perguntas"],
                ].map(([h, l]) => (
                  <li key={h}>
                    <a href={h} className="text-ink/70 transition hover:text-accent-light">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-electric-light">Contato</div>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <a href={waLink("Olá, Arche Labs!")} target="_blank" rel="noreferrer" className="text-ink/70 transition hover:text-accent-light">WhatsApp</a>
                </li>
                <li>
                  <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="text-ink/70 transition hover:text-accent-light">Instagram</a>
                </li>
                <li>
                  <a href={`mailto:${EMAIL}`} className="text-ink/70 transition hover:text-accent-light">{EMAIL}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between gap-4 pt-8 text-xs text-muted sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} Arche Labs. Todos os direitos reservados.</span>
          <span className="font-mono">ἀρχή — o princípio de toda presença.</span>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppFloat() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <a
      href={waLink("Olá! Vim pelo site da Arche Labs e quero saber mais.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className={cn(
        "fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] p-3.5 text-white shadow-[0_15px_40px_-10px_rgba(37,211,102,0.8)] transition-all duration-500 hover:scale-105 sm:pr-5",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      )}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.200-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 1.900-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z"/></svg>
      <span className="hidden text-sm font-semibold sm:inline">Fale conosco</span>
    </a>
  );
}
