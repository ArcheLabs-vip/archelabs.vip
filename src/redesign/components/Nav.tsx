import { useEffect, useRef, useState } from "react";
import { waLink } from "../data";
import { ArrowIcon } from "./Reveal";
import { cn } from "../utils/cn";
import { Brand } from "../../components/Brand";

const links = [
  { href: "#anatomia", label: "Método" },
  { href: "#trabalhos", label: "Projetos" },
  { href: "#processo", label: "Processo" },
  { href: "#planos", label: "Planos" },
  { href: "#arche-care", label: "Arche Care" },
  { href: "#faq", label: "FAQ" },
];

export function Mark({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <span className={cn("brand-crop inline-block shrink-0", className)} style={{ width: size, height: size }} aria-hidden="true">
      <img src="/assets/brand/arche-labs-logo-128.webp" alt="" width="64" height="64" />
    </span>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <a href="#top" className={cn("flex items-center gap-2.5 text-ink", className)} aria-label="Arche Labs — início">
      <Brand compact />
    </a>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-500", scrolled ? "py-3" : "py-5")}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav
          className={cn(
            "flex items-center justify-between rounded-xl border px-4 py-2.5 transition-all duration-500 sm:px-5",
            scrolled
              ? "border-white/10 bg-obsidian/75 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl"
              : "border-transparent bg-transparent"
          )}
        >
          <Logo />
          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="rounded-lg px-3.5 py-1.5 text-sm text-soft transition hover:bg-white/[0.06] hover:text-ink">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <a
              href={waLink("Olá! Quero iniciar um projeto de landing page com a Arche Labs.")}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary !hidden !min-h-[2.6rem] !px-4 !text-[0.85rem] sm:!inline-flex"
            >
              Iniciar projeto
              <ArrowIcon size={15} />
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              className="grid h-10 w-10 place-items-center rounded-lg border border-white/12 lg:hidden"
              ref={menuButton}
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-controls="mobile-navigation"
              aria-expanded={open}
            >
              <div className="relative h-3 w-4">
                <span className={cn("absolute left-0 h-[1.5px] w-4 bg-ink transition", open ? "top-1.5 rotate-45" : "top-0")} />
                <span className={cn("absolute left-0 top-1.5 h-[1.5px] w-4 bg-ink transition", open && "opacity-0")} />
                <span className={cn("absolute left-0 h-[1.5px] w-4 bg-ink transition", open ? "top-1.5 -rotate-45" : "top-3")} />
              </div>
            </button>
          </div>
        </nav>
        <div
          id="mobile-navigation"
          inert={!open}
          aria-hidden={!open}
          className={cn(
            "mt-2 overflow-hidden rounded-2xl border bg-graphite/95 backdrop-blur-xl transition-all duration-500 lg:hidden",
            open ? "max-h-[28rem] border-white/10 opacity-100" : "max-h-0 border-transparent opacity-0"
          )}
        >
          <ul className="p-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-base text-soft hover:bg-white/[0.05] hover:text-ink"
                >
                  {l.label}
                  <span className="font-mono text-xs text-muted">→</span>
                </a>
              </li>
            ))}
            <li className="p-1 pt-2">
              <a
                href={waLink("Olá! Quero iniciar um projeto de landing page com a Arche Labs.")}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary w-full"
              >
                Iniciar projeto pelo WhatsApp
                <ArrowIcon />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
