import { useCallback, useState, type ComponentType } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Gauge,
  Layers3,
  LifeBuoy,
  MousePointerClick,
  PanelTop,
  Plus,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { Brand } from "./components/Brand";
import { Navbar } from "./components/Navbar";
import { PlanModal } from "./components/PlanModal";
import { Preloader } from "./components/Preloader";
import { ProjectShowcase } from "./components/ProjectShowcase";
import { Reveal } from "./components/Reveal";
import {
  archeCare,
  differentials,
  faqItems,
  navItems,
  pillars,
  plans,
  processSteps,
  projectPreviews,
  services,
  type Plan,
  type Service,
} from "./content/site";

type IconComponent = ComponentType<{
  size?: number | string;
  strokeWidth?: number | string;
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
}>;

const serviceIcons: Record<Service["id"], IconComponent> = {
  "landing-pages": PanelTop,
  "content-panel": Layers3,
  "arche-care": LifeBuoy,
};

const differentialIcons: IconComponent[] = [Workflow, ShieldCheck, Gauge, MousePointerClick];

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

  return (
    <>
      {loading && <Preloader onComplete={handlePreloaderComplete} />}
    <div className="min-h-[100dvh] bg-obsidian text-ink">
      <Navbar items={navItems} onStartProject={() => setSelectedPlan(recommendedPlan)} />

      <main id="conteudo">
        <section id="topo" className="relative min-h-[calc(100dvh-72px)] overflow-hidden">
          <div className="technical-grid technical-grid-fade absolute inset-0 opacity-60" aria-hidden="true" />
          <div className="page-shell relative grid min-h-[calc(100dvh-72px)] grid-cols-1 items-center gap-10 py-12 md:grid-cols-12 md:py-16">
            <Reveal className="md:col-span-7">
              <p className="eyebrow">LANDING PAGES / NEGÓCIOS</p>
              <h1 className="display-balance mt-5 font-display text-[clamp(2.85rem,5vw,4.1rem)] font-medium leading-[0.95] tracking-[-0.065em] text-ink">
                <span className="block">Landing pages criadas</span>
                <span className="block text-[#b9c0cc]">para gerar oportunidades.</span>
              </h1>
              <p className="body-pretty mt-7 max-w-xl text-base leading-relaxed text-muted md:text-lg">
                Estratégia, design e desenvolvimento para transformar visitas em contatos e conversas comerciais.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  className="button button-primary"
                  type="button"
                  onClick={() => setSelectedPlan(recommendedPlan)}
                >
                  Iniciar projeto
                  <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.7} />
                </button>
                <a className="button button-secondary" href="#projetos">
                  Ver projetos
                  <ArrowRight aria-hidden="true" size={17} strokeWidth={1.7} />
                </a>
              </div>
            </Reveal>

            <Reveal className="md:col-span-5" delay={0.08}>
              <ProjectShowcase projects={projectPreviews} />
            </Reveal>
          </div>
        </section>

        <section id="sobre" className="section-space border-t soft-divider">
          <div className="page-shell grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-8">
            <Reveal className="md:col-span-5">
              <SectionIntro
                title="Especialização no que precisa funcionar."
                body="A Arche Labs cria Landing Pages para negócios que precisam apresentar valor, organizar a mensagem e gerar conversas comerciais."
              />
            </Reveal>

            <div className="md:col-start-7 md:col-span-6">
              {pillars.map((pillar, index) => (
                <Reveal key={pillar.title} delay={index * 0.06}>
                  <article className="grid grid-cols-[3.5rem_1fr] gap-5 border-t soft-divider py-7 first:pt-0 md:grid-cols-[5rem_1fr]">
                    <span className="font-mono text-sm text-electric-light">{pillar.number}</span>
                    <div>
                      <h3 className="font-display text-2xl font-medium tracking-[-0.04em] text-ink">
                        {pillar.title}
                      </h3>
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                        {pillar.description}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="servicos" className="section-space bg-graphite/55">
          <div className="page-shell">
            <Reveal>
              <p className="eyebrow">SERVIÇOS ATUAIS</p>
              <div className="mt-5">
                <SectionIntro
                  title="Uma oferta simples, sem pacotes confusos."
                  body="Landing Pages como produto principal, com edição de conteúdo e continuidade técnica quando fizer sentido para o negócio."
                />
              </div>
            </Reveal>

            <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-2">
              {services.map((service, index) => {
                const Icon = serviceIcons[service.id];
                const isPrimary = service.id === "landing-pages";

                return (
                  <Reveal
                    key={service.id}
                    className={isPrimary ? "md:col-span-7 md:row-span-2" : "md:col-span-5"}
                    delay={index * 0.06}
                  >
                    <article
                      className={`surface surface-interactive group h-full rounded-2xl p-6 transition-transform duration-300 md:p-8 ${
                        isPrimary ? "technical-grid min-h-[30rem]" : "min-h-[14.5rem]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-6">
                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/[0.1] bg-obsidian text-electric-light">
                          <Icon aria-hidden="true" size={21} strokeWidth={1.6} />
                        </span>
                        <span className="font-mono text-xs text-muted">{service.price}</span>
                      </div>
                      <div className={isPrimary ? "mt-24 md:mt-32" : "mt-10"}>
                        <h3 className="max-w-lg font-display text-3xl font-medium tracking-[-0.045em] text-ink md:text-4xl">
                          {service.name}
                        </h3>
                        <p className="body-pretty mt-4 max-w-xl text-sm leading-relaxed text-muted">
                          {service.description}
                        </p>
                        {isPrimary ? (
                          <ul className="mt-7 grid gap-3 sm:grid-cols-3">
                            {service.highlights.map((highlight) => (
                              <li key={highlight} className="text-sm leading-relaxed text-[#c8ced8]">
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
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
              <div className="surface grid min-h-[28rem] grid-cols-1 overflow-hidden rounded-2xl md:grid-cols-12">
                <div className="flex flex-col justify-between p-7 md:col-span-5 md:p-10">
                  <div>
                    <p className="font-mono text-[0.7rem] tracking-[0.08em] text-electric-light">
                      PORTFÓLIO EM PREPARAÇÃO
                    </p>
                    <h3 className="mt-5 font-display text-3xl font-medium tracking-[-0.045em] md:text-5xl">
                      Este espaço será ocupado por trabalho publicado.
                    </h3>
                  </div>
                  <button
                    className="button button-ghost mt-10 w-fit"
                    type="button"
                    onClick={() => setSelectedPlan(recommendedPlan)}
                  >
                    Iniciar projeto
                    <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.7} />
                  </button>
                </div>
                <div className="relative min-h-[20rem] overflow-hidden border-t border-white/[0.08] md:col-span-7 md:border-l md:border-t-0">
                  <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src="/assets/brand/arche-labs-logo-optimized.jpg"
                    alt="Símbolo oficial da Arche Labs"
                    width="1254"
                    height="1254"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-graphite/70 via-transparent to-transparent" aria-hidden="true" />
                </div>
              </div>
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
                    <article className="border-t soft-divider py-8 md:min-h-52">
                      <div className="flex items-center justify-between">
                        <Icon aria-hidden="true" className="text-electric-light" size={22} strokeWidth={1.55} />
                        <span className="font-mono text-xs text-muted">{item.number}</span>
                      </div>
                      <h3 className="mt-8 max-w-lg font-display text-2xl font-medium tracking-[-0.04em] text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">{item.description}</p>
                    </article>
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
                <PlanCard plan={plans[0]} onSelect={setSelectedPlan} />
              </Reveal>
              <Reveal className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1" delay={0.08}>
                <PlanCard plan={plans[1]} onSelect={setSelectedPlan} />
              </Reveal>
              <Reveal className="lg:col-span-5 lg:row-start-2" delay={0.05}>
                <PlanCard plan={plans[2]} onSelect={setSelectedPlan} />
              </Reveal>
            </div>

            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">
              Os prazos começam após o recebimento das informações e materiais necessários. Domínio e serviços de terceiros não estão incluídos no preço padrão.
            </p>
          </div>
        </section>

        <section id="arche-care" aria-labelledby="arche-care-heading" className="section-space">
          <div className="page-shell">
            <Reveal>
              <div className="surface-strong grid overflow-hidden rounded-2xl md:grid-cols-12">
                <div className="technical-grid p-7 md:col-span-5 md:p-10 lg:p-12">
                  <LifeBuoy aria-hidden="true" className="text-electric-light" size={28} strokeWidth={1.5} />
                  <h2 id="arche-care-heading" className="mt-12 font-display text-4xl font-medium tracking-[-0.05em] md:text-6xl">
                    Seu site publicado. A operação continua.
                  </h2>
                  <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
                    {archeCare.positioning}
                  </p>
                  <p className="mt-10 font-display text-5xl font-medium tracking-[-0.055em]">
                    {archeCare.price}
                    <span className="ml-1 font-sans text-base font-normal tracking-normal text-muted">
                      {archeCare.cadence}
                    </span>
                  </p>
                </div>
                <div className="border-t border-white/[0.08] p-7 md:col-span-7 md:border-l md:border-t-0 md:p-10 lg:p-12">
                  <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                    {archeCare.includes.map((item) => (
                      <div key={item} className="flex items-center gap-3 border-b border-white/[0.07] pb-4 text-sm text-[#c8ced8]">
                        <Check aria-hidden="true" className="shrink-0 text-electric-light" size={16} strokeWidth={1.8} />
                        {item}
                      </div>
                    ))}
                  </div>
                  <p className="mt-8 text-sm leading-relaxed text-muted">
                    Pequenas alterações incluem {archeCare.smallChangesDefinition.toLowerCase()}
                  </p>
                  <button
                    className="button button-secondary mt-8"
                    type="button"
                    onClick={() => setSelectedPlan(recommendedPlan)}
                  >
                    Iniciar projeto
                    <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.7} />
                  </button>
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
          <div className="closing-cta__glow" aria-hidden="true" />
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
                  <button
                    className="button closing-cta__button"
                    type="button"
                    onClick={() => setSelectedPlan(recommendedPlan)}
                  >
                    Tirar meu projeto do papel
                    <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.8} />
                  </button>
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
            <a href="#planos" className="text-sm text-muted hover:text-ink">
              Planos
            </a>
            <a href="#faq" className="text-sm text-muted hover:text-ink">
              FAQ
            </a>
          </nav>
          <p className="font-mono text-xs text-muted md:col-span-2 md:text-right">
            © {new Date().getFullYear()} Arche Labs
          </p>
        </div>
      </footer>

      <PlanModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
    </div>
    </>
  );
}
