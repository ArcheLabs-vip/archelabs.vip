import { useEffect, useRef } from "react";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { Anatomy } from "./components/Anatomy";
import { Differentials } from "./components/Differentials";
import { Showcase } from "./components/Showcase";
import { Process } from "./components/Process";
import { Pricing } from "./components/Pricing";
import { Care } from "./components/Care";
import { Testimonials } from "./components/Testimonials";
import { FAQ } from "./components/FAQ";
import { FinalCTA, Footer, WhatsAppFloat } from "./components/Footer";

/* Brilho que segue o cursor (mesmo efeito do site original) */
function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover)").matches) return;
    let raf = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--glow-x", `${e.clientX}px`);
        el.style.setProperty("--glow-y", `${e.clientY}px`);
        el.style.opacity = "1";
      });
    };
    const leave = () => (el.style.opacity = "0");
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <div ref={ref} className="cursor-glow" aria-hidden />;
}

export default function App() {
  return (
    <div className="relative min-h-[100dvh] bg-obsidian text-ink">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-electric focus:px-4 focus:py-2 focus:text-white"
      >
        Ir para o conteúdo
      </a>
      <CursorGlow />
      <Nav />
      <main id="conteudo" className="relative">
        <Hero />
        <Marquee />
        <Anatomy />
        <Differentials />
        <Showcase />
        <Process />
        <Pricing />
        <Care />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
