import { useMemo, useState } from "react";
import { addons, brl, plans, waLink } from "../data";
import { ArrowIcon, Reveal, SectionHeading } from "./Reveal";
import { buildWhatsAppLink } from "../../lib/whatsapp";
import { cn } from "../utils/cn";

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-electric-light" aria-hidden>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function Pricing() {
  const [planId, setPlanId] = useState("pro");
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [observation, setObservation] = useState("");
  const plan = plans.find((p) => p.id === planId)!;

  const total = useMemo(
    () => plan.price + addons.filter((a) => selected[a.id] && !a.recurring).reduce((s, a) => s + a.price, 0),
    [plan, selected]
  );

  const message = useMemo(() => buildWhatsAppLink({
    plan: plan.name,
    price: `${plan.priceLabel ? plan.priceLabel + " " : ""}${brl(total)}${selected.care ? " + Arche Care (mensal, sob consulta)" : ""}`,
    contentPanel: !!selected.panel,
    care: !!selected.care,
    observation,
  }).message, [plan, selected, total, observation]);

  return (
    <section id="planos" className="relative overflow-hidden border-y border-white/8 bg-graphite/55 py-28 sm:py-36">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-electric/10 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          index="005"
          label="Planos"
          title={
            <>
              O nível certo para o <span className="text-highlight">momento do negócio.</span>
            </>
          }
          body="Escopo, prazo e revisões definidos antes do desenvolvimento. Escolha um plano, monte seu pedido e envie direto pelo WhatsApp."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {plans.map((p, i) => {
            const isSel = p.id === planId;
            return (
              <Reveal key={p.id} delay={i * 100}>
                <button
                  onClick={() => setPlanId(p.id)}
                  aria-pressed={isSel}
                  className={cn(
                    "relative flex h-full w-full flex-col rounded-2xl border p-6 text-left transition-all duration-500 md:p-8",
                    isSel
                      ? "edge-light border-electric/60 bg-surface shadow-[0_2.5rem_7rem_rgba(0,65,201,0.16)] lg:-translate-y-2"
                      : "border-white/[0.09] bg-graphite hover:border-white/25"
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      {p.featured && (
                        <span className="mb-4 inline-block rounded-md bg-electric px-2.5 py-1 font-mono text-[0.66rem] font-semibold tracking-[0.08em] text-white">
                          RECOMENDADO
                        </span>
                      )}
                      <h3 className="font-display text-2xl font-semibold tracking-[-0.04em] text-ink md:text-3xl">{p.name}</h3>
                    </div>
                    <span
                      className={cn(
                        "mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-md border transition",
                        isSel ? "border-electric bg-electric text-[11px] text-white" : "border-white/20"
                      )}
                    >
                      {isSel && "✓"}
                    </span>
                  </div>
                  <div className="mt-1 font-mono text-[0.68rem] text-muted">{p.sections}</div>

                  <div className="mt-7">
                    {p.priceLabel && <div className="font-mono text-[0.68rem] text-muted">{p.priceLabel}</div>}
                    <div className="font-display text-4xl font-medium tracking-[-0.05em] text-ink md:text-5xl">{brl(p.price)}</div>
                    <div className="mt-1 text-xs text-muted">pagamento único</div>
                  </div>

                  <p className="mt-5 text-sm leading-relaxed text-muted">{p.desc}</p>

                  <div className="mt-7 grid grid-cols-2 gap-3 border-y border-white/[0.08] py-5">
                    <div>
                      <p className="font-mono text-[0.64rem] tracking-[0.08em] text-muted">PRAZO</p>
                      <p className="mt-2 text-sm font-semibold text-ink">{p.deadline}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[0.64rem] tracking-[0.08em] text-muted">REVISÕES</p>
                      <p className="mt-2 text-sm font-semibold text-ink">{p.revisions}</p>
                    </div>
                  </div>

                  <ul className="mt-7 grid gap-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-3 text-sm leading-relaxed text-[#c8ced8]">
                        <Check />
                        {f}
                      </li>
                    ))}
                  </ul>
                </button>
              </Reveal>
            );
          })}
        </div>

        {/* configurador */}
        <Reveal delay={100} className="mt-8">
          <div className="care-brand-plane overflow-hidden rounded-2xl border border-white/[0.12] p-6 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-start">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-glow">
                  CONFIGURE SEU PROJETO
                </div>
                <h3 className="mt-2 font-display text-2xl font-semibold tracking-[-0.035em] text-ink">
                  Adicionais opcionais e observações
                </h3>
                <div className="mt-5 grid gap-3 xl:grid-cols-2">
                  {addons.map((a) => {
                    const on = !!selected[a.id];
                    return (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() => setSelected((s) => ({ ...s, [a.id]: !s[a.id] }))}
                        aria-pressed={on}
                        className={cn(
                          "flex items-start gap-3.5 rounded-xl border p-4 text-left transition",
                          on
                            ? "border-electric-light bg-electric/15"
                            : "border-white/[0.1] bg-obsidian/70 hover:border-white/25"
                        )}
                      >
                        <span
                          className={cn(
                            "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded border text-xs transition",
                            on
                              ? "border-electric-light bg-electric text-ink"
                              : "border-white/25 bg-transparent"
                          )}
                        >
                          {on && "✓"}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                            <span className="font-display font-semibold text-ink">{a.name}</span>
                            <span className="font-mono text-xs text-glow">{a.recurring ? "Mensal · sob consulta" : `+ ${brl(a.price)}`}</span>
                          </span>
                          <span className="mt-1 block text-[13px] leading-relaxed text-muted">
                            {a.desc}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="project-note"
                    className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted"
                  >
                    Conte um pouco sobre o projeto (opcional)
                  </label>
                  <input
                    id="project-note"
                    type="text"
                    value={observation}
                    onChange={(e) => setObservation(e.target.value)}
                    placeholder="Ex.: preciso apresentar meus serviços e receber pedidos pelo WhatsApp."
                    className="w-full rounded-xl border border-white/[0.12] bg-obsidian/85 px-4 py-3 text-sm text-ink placeholder:text-muted/60 focus:border-electric-light focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4 rounded-xl border border-white/[0.12] bg-obsidian p-6 text-ink">
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/[0.08] pb-3">
                  <span className="font-display text-lg font-semibold text-ink">{plan.name}</span>
                  <span className="font-mono text-xs text-glow">{plan.deadline}</span>
                </div>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-muted">
                    RESUMO DO PEDIDO
                  </div>
                  <div className="mt-1 font-display text-4xl font-bold tracking-[-0.04em] text-ink">
                    {plan.priceLabel && <span className="mb-1 block text-xs font-normal tracking-normal text-muted">{plan.priceLabel}</span>}
                    {brl(total)}
                  </div>
                  <div className="mt-2 space-y-1 font-mono text-xs text-muted">
                    {addons.map((a) => (
                      <div key={a.id}>
                        {a.name}: {selected[a.id] ? (a.recurring ? "Sim (mensal, sob consulta)" : `Sim (+ ${brl(a.price)})`) : "Não"}
                      </div>
                    ))}
                  </div>
                </div>
                <a
                  href={waLink(message)}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-2 flex min-h-[3.125rem] items-center justify-between rounded-lg border border-electric bg-electric px-5 py-3 font-semibold text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition hover:border-electric-light hover:bg-electric-light"
                >
                  Continuar no WhatsApp
                  <ArrowIcon />
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <p className="mx-auto mt-8 max-w-2xl text-center text-[13px] text-muted">
          Os prazos começam após o recebimento das informações e materiais necessários. Domínio e
          serviços de terceiros não estão incluídos no preço padrão.
        </p>
      </div>
    </section>
  );
}
