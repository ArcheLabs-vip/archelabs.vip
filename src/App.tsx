import { useCallback, useState, type ComponentType } from "react";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Check,
  DatabaseBackup,
  Gauge,
  LifeBuoy,
  MousePointerClick,
  Plus,
  ShieldCheck,
  Workflow,
  Wrench,
} from "lucide-react";
import { AnimatedNumber } from "./components/AnimatedNumber";
import { Brand } from "./components/Brand";
import { CursorGlow } from "./components/CursorGlow";
import { MagneticWrap } from "./components/MagneticWrap";
import { Navbar } from "./components/Navbar";
import { PlanModal } from "./components/PlanModal";
import { PortfolioDeck } from "./components/PortfolioDeck";
import { Preloader } from "./components/Preloader";
import { ProjectShowcase } from "./components/ProjectShowcase";
import { Reveal } from "./components/Reveal";
import { SplitText } from "./components/SplitText";
import { TestimonialMarquee } from "./components/TestimonialMarquee";
import { TiltCard } from "./components/TiltCard";
import { useParallax } from "./hooks/useParallax";
import {
  archeCare,
  careFeatures,
  differentials,
  faqItems,
  navItems,
  plans,
  processSteps,
  projectPreviews,
  testimonials,
  type Plan,
} from "./content/site";

type IconComponent = ComponentType<{
  size?: number | string;
  strokeWidth?: number | string;
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
}>;



const differentialIcons: IconComponent[] = [Workflow, ShieldCheck, Gauge, MousePointerClick];

const careIconMap: Record<string, { Icon: IconComponent; animation: string }> = {
  activity: { Icon: Activity, animation: "care-icon-pulse" },
  shield: { Icon: ShieldCheck, animation: "care-icon-glow" },
  database: { Icon: DatabaseBackup, animation: "care-icon-glow" },
  wrench: { Icon: Wrench, animation: "care-icon-spin" },
};

function SectionIntro({ title, body }: { title: string; body: string }) {
  return (
    <div className="max-w-3xl">
      <h2 className="display-balance font-display text-4xl font-medium leading-[1.02] tracking-[-0.055em] text-ink md:text-6xl">
        {title}
      </h2>
      <p className="body-pretty mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
        {body}
      </p>
    </div>
  );
}

function PlanCard({ plan, onSelect }: { plan: Plan; onSelect: (plan: Plan) => void }) {
  const visibleIncludes = plan.includes.filter((item) => !item.startsWith("Uso de IA"));
  const featureLimit = plan.featured ? visibleIncludes.length : 5;

  return (
    <article
      className={`relative flex h-full flex-col rounded-2xl border p-6 md:p-8 ${
        plan.featured
          ? "edge-light border-electric/50 bg-surface shadow-[0_2.5rem_7rem_rgba(0,65,201,0.16)]"
          : "border-white/[0.09] bg-graphite"
      }`}
    >
      {plan.badge ? (
        <span className="mb-8 w-fit rounded-md bg-electric px-2.5 py-1 font-mono text-[0.66rem] font-semibold tracking-[0.08em] text-white">
          {plan.badge.toUpperCase()}
        </span>
      ) : null}

      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-display text-2xl font-semibold tracking-[-0.04em] text-ink md:text-3xl">
          {plan.name}
        </h3>
        <span className="font-mono text-[0.68rem] text-muted">{plan.sections}</span>
      </div>

      <p className="mt-7 font-display text-4xl font-medium tracking-[-0.05em] text-ink md:text-5xl">
        {plan.price}
      </p>
      <p className="body-pretty mt-5 text-sm leading-relaxed text-muted">{plan.description}</p>

      <div className="mt-7 grid grid-cols-2 gap-3 border-y border-white/[0.08] py-5">
        <div>
          <p className="font-mono text-[0.64rem] tracking-[0.08em] text-muted">PRAZO</p>
          <p className="mt-2 text-sm font-semibold text-ink">{plan.deadline}</p>
        </div>
        <div>
          <p className="font-mono text-[0.64rem] tracking-[0.08em] text-muted">REVISÕES</p>
          <p className="mt-2 text-sm font-semibold text-ink">{plan.revisionsLabel}</p>
        </div>
      </div>

      <ul className="mt-7 grid gap-3" aria-label={`Incluso no ${plan.name}`}>
        {visibleIncludes.slice(0, featureLimit).map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-[#c8ced8]">
            <Check
              aria-hidden="true"
              className="mt-0.5 shrink-0 text-electric-light"
              size={16}
              strokeWidth={1.8}
            />
            {item}
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={`button mt-8 w-full ${plan.featured ? "button-primary" : "button-secondary"}`}
        onClick={() => onSelect(plan)}
      >
        {plan.ctaLabel}
        <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.7} />
      </button>
    </article>
  );
}

export function App() {
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const recommendedPlan = plans.find((plan) => plan.featured) ?? plans[0];
  const handlePreloaderComplete = useCallback(() => setLoading(false), []);

  // Parallax refs for decorative elements
  const parallaxGridRef = useParallax(0.06);
  const parallaxGlowRef = useParallax(0.1);
  const parallaxOrbitRef = useParallax(0.04);

  return (
    <>
      {loading && <Preloader onComplete={handlePreloaderComplete} />}
    <CursorGlow />
    <div className="min-h-[100dvh] bg-obsidian text-ink">
      <Navbar items={navItems} onStartProject={() => setSelectedPlan(recommendedPlan)} />

      <main id="conteudo">
        <section id="topo" className="relative min-h-[calc(100dvh-72px)] overflow-hidden">
          <div ref={parallaxGridRef} className="technical-grid technical-grid-fade absolute inset-0 opacity-60" aria-hidden="true" />
          <div className="page-shell relative grid min-h-[calc(100dvh-72px)] grid-cols-1 items-center gap-10 py-12 md:grid-cols-12 md:py-16">
            <Reveal className="md:col-span-7">
              <p className="eyebrow">ARCHE LABS — PRESENÇA QUE CONVERTE</p>
              <SplitText
                className="display-balance mt-5 font-display text-[clamp(2.85rem,5vw,4.1rem)] font-medium leading-[0.95] tracking-[-0.065em] text-ink"
                lines={[
                  { text: "Landing pages criadas" },
                  { text: "para gerar oportunidades.", className: "text-[#b9c0cc]" },
                ]}
              />
              <p className="body-pretty mt-7 max-w-xl text-base leading-relaxed text-muted md:text-lg">
                Estratégia, design e desenvolvimento para transformar visitas em contatos e conversas comerciais.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <MagneticWrap>
                  <button
                    className="button button-primary"
                    type="button"
                    onClick={() => setSelectedPlan(recommendedPlan)}
                  >
                    Iniciar projeto
                    <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.7} />
                  </button>
                </MagneticWrap>
                <MagneticWrap>
                  <a className="button button-secondary" href="#projetos">
                    Ver projetos
                    <ArrowRight aria-hidden="true" size={17} strokeWidth={1.7} />
                  </a>
                </MagneticWrap>
              </div>
            </Reveal>

            <Reveal className="md:col-span-5" delay={0.08}>
              <ProjectShowcase projects={projectPreviews} />
            </Reveal>
          </div>
        </section>

        <section id="sobre" className="testimonial-section border-y soft-divider">
          <div className="page-shell testimonial-section__intro">
            <Reveal>
              <SectionIntro
                title="Experiências que falam por si."
                body="Relatos de quem precisava transformar uma oferta dispersa em uma presença digital clara, profissional e pronta para iniciar conversas."
              />
            </Reveal>
            <p className="testimonial-section__note" aria-hidden="true">
              EXPERIÊNCIAS DE CLIENTES / ARCHE LABS
            </p>
          </div>

          <Reveal className="page-shell testimonial-section__rail" delay={0.06}>
            <TestimonialMarquee testimonials={testimonials} />
          </Reveal>
        </section>



        <section id="projetos" className="section-space">
          <div className="page-shell">
            <Reveal>
              <SectionIntro
                title="Projetos reais, apresentados com contexto."
                body="Sem cases inventados. Os primeiros trabalhos serão publicados aqui com problema, solução e resultado."
              />
            </Reveal>

            <Reveal className="mt-14" delay={0.06}>
              <PortfolioDeck
                projects={projectPreviews}
                onStartProject={() => setSelectedPlan(recommendedPlan)}
              />
            </Reveal>
          </div>
        </section>

        <section id="diferenciais" className="section-space border-y soft-divider bg-[#080a11]">
          <div className="page-shell">
            <Reveal>
              <SectionIntro
                title="Clareza no processo. Controle nos ativos."
                body="Os diferenciais estão na forma de organizar, construir e entregar cada projeto."
              />
            </Reveal>

            <div className="mt-14 grid grid-cols-1 gap-x-14 md:grid-cols-2">
              {differentials.map((item, index) => {
                const Icon = differentialIcons[index];
                return (
                  <Reveal key={item.title} delay={(index % 2) * 0.06}>
                    <TiltCard>
                      <article className="border-t soft-divider py-8 md:min-h-52">
                        <div className="flex items-center justify-between">
                          <Icon aria-hidden="true" className="text-electric-light" size={22} strokeWidth={1.55} />
                          <AnimatedNumber target={index + 1} pad={2} className="font-mono text-xs text-muted" />
                        </div>
                        <h3 className="mt-8 max-w-lg font-display text-2xl font-medium tracking-[-0.04em] text-ink">
                          {item.title}
                        </h3>
                        <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">{item.description}</p>
                      </article>
                    </TiltCard>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section id="processo" className="section-space overflow-hidden">
          <div className="page-shell">
            <Reveal>
              <SectionIntro
                title="Do briefing à publicação, sem improviso."
                body="Cada etapa reduz dúvidas, concentra decisões e mantém o projeto avançando com responsabilidade clara."
              />
            </Reveal>

            <div className="process-rail -mr-[var(--page-pad)] mt-14 overflow-hidden pr-[var(--page-pad)]">
              <div className="flex w-max animate-marquee border-t border-white/[0.12] hover:[animation-play-state:paused]">
                {[...processSteps, ...processSteps].map((step, index) => {
                  const isDuplicate = index >= processSteps.length;
                  return (
                    <Reveal 
                      key={`${step.label}-${index}`} 
                      delay={isDuplicate ? 0 : (index % processSteps.length) * 0.045}
                      className="w-[85vw] shrink-0 sm:w-[22rem] md:w-[20rem]"
                    >
                      <article className={`relative h-full min-h-64 border-l border-white/[0.08] px-5 py-7 ${index === 0 ? 'border-l-0' : ''}`}>
                        <span className="absolute -top-[5px] left-5 h-2.5 w-2.5 bg-electric" aria-hidden="true" />
                        <span className="font-mono text-xs text-electric-light">{step.number}</span>
                        <h3 className="mt-20 font-display text-xl font-medium tracking-[-0.035em] text-ink">
                          {step.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-muted">{step.description}</p>
                      </article>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="planos" className="section-space bg-graphite/55">
          <div className="page-shell">
            <Reveal>
              <SectionIntro
                title="Escolha o nível certo para o momento do negócio."
                body="Três formas de começar, com escopo, prazo e revisões definidos antes do desenvolvimento."
              />
            </Reveal>

            <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:grid-rows-2">
              <Reveal className="lg:col-span-5 lg:row-start-1">
                <TiltCard maxDeg={3}>
                  <PlanCard plan={plans[0]} onSelect={setSelectedPlan} />
                </TiltCard>
              </Reveal>
              <Reveal className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1" delay={0.08}>
                <TiltCard maxDeg={3}>
                  <PlanCard plan={plans[1]} onSelect={setSelectedPlan} />
                </TiltCard>
              </Reveal>
              <Reveal className="lg:col-span-5 lg:row-start-2" delay={0.05}>
                <TiltCard maxDeg={3}>
                  <PlanCard plan={plans[2]} onSelect={setSelectedPlan} />
                </TiltCard>
              </Reveal>
            </div>

            <div className="mt-6 rounded-xl border border-white/[0.07] bg-white/[0.02] px-5 py-4">
              <p className="max-w-3xl text-sm leading-relaxed text-muted">
                Os prazos começam após o recebimento das informações e materiais necessários. Domínio e serviços de terceiros não estão incluídos no preço padrão.
              </p>
            </div>
          </div>
        </section>

        <section id="arche-care" aria-labelledby="arche-care-heading" className="section-space">
          <div className="page-shell">
            <Reveal>
              <div className="surface-strong overflow-hidden rounded-2xl">
                <div className="grid md:grid-cols-12">
                  {/* Left: Copy + Status + CTA */}
                  <div className="technical-grid relative p-7 md:col-span-6 md:p-10 lg:p-12">
                    <div className="live-status">
                      <span className="live-dot" aria-hidden="true" />
                      <span className="font-mono text-[0.68rem] tracking-[0.05em] text-electric-light">
                        Operacional
                      </span>
                    </div>

                    <h2 id="arche-care-heading" className="mt-10 font-display text-4xl font-medium tracking-[-0.05em] md:text-5xl lg:text-6xl">
                      Seu site no ar.{" "}
                      <span className="text-muted">A operação continua.</span>
                    </h2>

                    <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
                      {archeCare.positioning}
                    </p>

                    <a
                      className="button button-secondary mt-10"
                      href="#planos"
                    >
                      Incluir ao escolher um plano
                      <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.7} />
                    </a>
                  </div>

                  {/* Right: Security Core (desktop) */}
                  <div className="hidden items-center justify-center border-l border-white/[0.08] md:col-span-6 md:flex">
                    <div ref={parallaxOrbitRef} className="security-core-container group" aria-hidden="true">
                      <div className="security-core-animator">
                        <div className="security-core-brackets">
                          <div className="bracket top-left" />
                          <div className="bracket top-right" />
                          <div className="bracket bottom-left" />
                          <div className="bracket bottom-right" />
                          <div className="security-core-scanner" />
                        </div>
                      </div>
                      <div className="security-core-ring" />
                      <div className="security-core-gear" />
                      <div className="security-core-center">
                        <LifeBuoy className="text-electric-light transition-transform duration-500 group-hover:scale-110" size={24} strokeWidth={1.5} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom: Feature Cards */}
                <div className="border-t border-white/[0.08] p-7 md:p-10 lg:p-12">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {careFeatures.map((feature, index) => {
                      const mapped = careIconMap[feature.icon];
                      const FeatureIcon = mapped?.Icon ?? LifeBuoy;
                      const iconAnim = mapped?.animation ?? "";

                      return (
                        <Reveal key={feature.icon} delay={index * 0.06}>
                          <TiltCard>
                            <article className="care-card h-full">
                              <div className="care-card__icon">
                                <FeatureIcon
                                  aria-hidden="true"
                                  className={iconAnim}
                                  size={18}
                                  strokeWidth={1.6}
                                />
                              </div>
                              <h3 className="mt-4 text-sm font-semibold text-ink">
                                {feature.title}
                              </h3>
                              <p className="mt-2 text-[0.8rem] leading-relaxed text-muted">
                                {feature.detail}
                              </p>
                            </article>
                          </TiltCard>
                        </Reveal>
                      );
                    })}
                  </div>

                  <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted">
                    <span className="text-electric-light">ℹ</span>{" "}
                    Pequenas alterações incluem {archeCare.smallChangesDefinition.toLowerCase()}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="faq" className="section-space border-t soft-divider bg-[#080a11]">
          <div className="page-shell">
            <Reveal>
              <SectionIntro
                title="Perguntas antes de começar."
                body="Escopo, propriedade, prazos e continuidade explicados de forma direta."
              />
            </Reveal>

            <div className="mt-14 grid grid-cols-1 gap-x-12 md:grid-cols-2">
              {[faqItems.slice(0, 4), faqItems.slice(4)].map((column, columnIndex) => (
                <div key={columnIndex}>
                  {column.map((item) => (
                    <details key={item.question} className="border-t soft-divider py-5 last:border-b">
                      <summary className="flex cursor-pointer items-center justify-between gap-6 text-left font-display text-lg font-medium tracking-[-0.025em] text-ink">
                        {item.question}
                        <Plus
                          aria-hidden="true"
                          className="faq-icon shrink-0 text-electric-light"
                          size={19}
                          strokeWidth={1.7}
                        />
                      </summary>
                      <p className="body-pretty max-w-xl pt-4 text-sm leading-[1.75] text-muted">
                        {item.answer}
                      </p>
                    </details>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="closing-cta section-space relative overflow-hidden" aria-labelledby="closing-cta-title">
          <div className="technical-grid absolute inset-0 opacity-40" aria-hidden="true" />
          <div ref={parallaxGlowRef} className="closing-cta__glow" aria-hidden="true" />
          <Reveal className="page-shell relative">
            <div className="closing-cta__panel">
              <div className="closing-cta__topline">
                <p className="eyebrow">PRÓXIMO PROJETO</p>
                <p className="closing-cta__index" aria-hidden="true">ARCH / 001</p>
              </div>

              <div className="closing-cta__content">
                <div className="closing-cta__statement">
                  <h2
                    id="closing-cta-title"
                    className="display-balance font-display text-5xl font-medium leading-[0.96] tracking-[-0.06em] md:text-7xl"
                  >
                    Sua empresa merece <span>mais</span> do que apenas estar online.
                  </h2>
                  <p className="body-pretty closing-cta__support">
                    Transforme sua presença digital em uma experiência que apresenta seu valor,
                    inspira confiança e conduz o cliente para a próxima ação.
                  </p>
                </div>

                <aside className="closing-cta__action" aria-label="Comece seu projeto">
                  <p className="closing-cta__action-label">UM SITE PENSADO PARA</p>
                  <ul className="closing-cta__benefits">
                    {[
                      "Comunicar com clareza",
                      "Fortalecer sua marca",
                      "Gerar novas oportunidades",
                    ].map((benefit) => (
                      <li key={benefit}>
                        <Check aria-hidden="true" size={15} strokeWidth={2} />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <MagneticWrap className="w-full">
                    <button
                      className="button closing-cta__button"
                      type="button"
                      onClick={() => setSelectedPlan(recommendedPlan)}
                    >
                      Tirar meu projeto do papel
                      <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.8} />
                    </button>
                  </MagneticWrap>
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
        </section>
      </main>

      <footer className="border-t soft-divider py-10">
        <div className="page-shell grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-5">
            <Brand />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Sites que conectam. Resultados que ficam.
            </p>
          </div>
          <nav aria-label="Navegação do rodapé" className="flex flex-wrap gap-x-7 gap-y-3 md:col-span-5 md:justify-end">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-sm text-muted hover:text-ink">
                {item.label}
              </a>
            ))}
            <a href="#faq" className="text-sm text-muted hover:text-ink">
              FAQ
            </a>
          </nav>
          <p className="font-mono text-xs text-muted md:col-span-2 md:text-right">
            © {new Date().getFullYear()} Arche Labs
          </p>
        </div>
      </footer>

      <PlanModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} onChangePlan={setSelectedPlan} />
    </div>
    </>
  );
}
