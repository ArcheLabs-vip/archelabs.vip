import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Brand } from "./Brand";

type NavItem = {
  label: string;
  href: string;
};

type NavbarProps = {
  items: NavItem[];
  onStartProject: () => void;
};

export function Navbar({ items, onStartProject }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-obsidian/85 backdrop-blur-xl">
      <div className="page-shell flex h-[72px] items-center justify-between gap-6">
        <a href="#topo" aria-label="Arche Labs, voltar ao início">
          <Brand compact />
        </a>

        <nav aria-label="Navegação principal" className="hidden items-center gap-8 lg:flex">
          {items.map((item) => (
            <a
              key={item.href}
              className="text-sm font-medium text-muted hover:text-ink"
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <button className="button button-primary" type="button" onClick={onStartProject}>
            Iniciar projeto
            <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.7} />
          </button>
        </div>

        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/[0.12] text-ink lg:hidden"
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X size={21} strokeWidth={1.7} /> : <Menu size={21} strokeWidth={1.7} />}
        </button>
      </div>

      {isOpen ? (
        <div id="mobile-navigation" className="border-t border-white/[0.07] bg-obsidian lg:hidden">
          <nav aria-label="Navegação móvel" className="page-shell flex flex-col py-5">
            {items.map((item) => (
              <a
                key={item.href}
                className="border-b border-white/[0.07] py-4 text-base font-medium text-ink"
                href={item.href}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              className="border-b border-white/[0.07] py-4 text-base font-medium text-ink"
              href="#planos"
              onClick={() => setIsOpen(false)}
            >
              Planos
            </a>
            <a
              className="border-b border-white/[0.07] py-4 text-base font-medium text-ink"
              href="#faq"
              onClick={() => setIsOpen(false)}
            >
              FAQ
            </a>
            <button
              className="button button-primary mt-5 w-full"
              type="button"
              onClick={() => {
                setIsOpen(false);
                onStartProject();
              }}
            >
              Iniciar projeto
              <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.7} />
            </button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
