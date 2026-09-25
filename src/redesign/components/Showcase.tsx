import { useRef, useState } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { waLink } from "../data";
import { collectionPlans, projectCollections, portfolioProjects } from "../../content/portfolio";
import { ArrowIcon, Reveal, SectionLabel } from "./Reveal";
import { ProjectImage } from "./ProjectImage";
import { cn } from "../utils/cn";

export function Showcase() {
  const [planId, setPlanId] = useState("start");
  const plan = collectionPlans.find((entry) => entry.id === planId)!;
  const collections = projectCollections.filter((entry) => plan.collections.includes(entry.id));
  const [selectedCollections, setSelectedCollections] = useState<Record<string, string>>({});
  const collection = selectedCollections[planId] ?? collections[0].id;
  const collectionDetails = collections.find((entry) => entry.id === collection)!;
  const [selectedTemplates, setSelectedTemplates] = useState<Record<string, string>>({});
  const templates = portfolioProjects.filter((project) => project.collectionId === collection);
  const item = templates.find((project) => project.id === selectedTemplates[collection]) ?? templates[0];
  const galleryRef = useRef<HTMLDivElement>(null);
  const index = templates.indexOf(item);
  function selectTemplate(id: string) {
    setSelectedTemplates((previous) => ({ ...previous, [collection]: id }));
  }
  function step(direction: number) {
    if (!templates.length) return;
    const next = templates[(index + direction + templates.length) % templates.length];
    selectTemplate(next.id);
    const gallery = galleryRef.current;
    const button = gallery?.querySelector<HTMLButtonElement>(`[data-template="${next.id}"]`);
    if (gallery && button) gallery.scrollTo({
      left: button.offsetLeft - (gallery.clientWidth - button.clientWidth) / 2,
      top: button.offsetTop - (gallery.clientHeight - button.clientHeight) / 2,
      behavior: "instant",
    });
  }

  return (
    <section id="trabalhos" className="relative border-t border-white/[0.08] py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Reveal>
              <SectionLabel index="003">Projetos</SectionLabel>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-8 max-w-3xl font-display text-[clamp(2.25rem,4.8vw,4rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-ink">
                A composição muda.{" "}
                <span className="text-electric-light">A clareza fica.</span>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
                Escolha seu plano, descubra as coleções e encontre o template para o seu negócio.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-10 flex gap-6 border-b border-white/10 sm:mt-12" role="group" aria-label="Planos das coleções">
          {collectionPlans.map((entry) => (
            <button key={entry.id} type="button" aria-pressed={planId === entry.id} onClick={() => setPlanId(entry.id)}
              className={cn("min-h-14 border-b-2 px-1 pb-4 pt-2 font-display text-lg font-semibold transition sm:text-xl", planId === entry.id ? "border-electric-light text-ink" : "border-transparent text-muted hover:text-ink")}>
              {entry.name}
            </button>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex max-w-full gap-1 rounded-xl bg-surface p-1" role="group" aria-label={`Coleções do ${plan.name}`}>
            {collections.map((entry) => (
              <button key={entry.id} type="button" aria-pressed={collection === entry.id} onClick={() => setSelectedCollections((previous) => ({ ...previous, [planId]: entry.id }))}
                className={cn("min-h-11 rounded-lg px-3 py-2 text-sm font-semibold transition sm:px-5", collection === entry.id ? "bg-electric text-white" : "text-muted hover:bg-white/5 hover:text-ink")}>
                {entry.name}
              </button>
            ))}
          </div>
          <span className="text-xs text-muted">{templates.length ? `${templates.length} templates para explorar` : "Em breve"}</span>
        </div>
        {item ? (
        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-8">
          <div className="order-2 min-w-0 lg:order-1">
            <p className="mb-3 text-sm font-medium text-soft">Escolha seu template</p>
            <div ref={galleryRef} key={collection} role="group" aria-label="Templates disponíveis"
              className="relative flex gap-3 overflow-x-auto overscroll-contain pb-3 lg:grid lg:max-h-[580px] lg:grid-cols-2 lg:overflow-y-auto lg:overflow-x-hidden lg:p-1 lg:pr-3">
              {templates.map((project) => {
                const selected = project.id === item.id;
                return (
                  <button key={project.id} data-template={project.id} type="button" aria-pressed={selected} onClick={() => selectTemplate(project.id)}
                    className={cn("group relative w-36 shrink-0 overflow-hidden rounded-lg border text-left transition lg:w-full", selected ? "border-electric-light bg-electric/10" : "border-white/10 bg-graphite hover:border-white/30")}>
                    <ProjectImage project={project} thumbnail
                      className={cn("aspect-[14/9] w-full object-cover object-top transition-opacity", !selected && "opacity-65 group-hover:opacity-100")} />
                    {selected && <span className="absolute right-1.5 top-1.5 grid h-5 w-5 place-items-center rounded-full bg-electric text-white"><Check size={12} aria-hidden="true" /></span>}
                    <span className={cn("block min-h-12 px-2.5 py-2.5 text-xs font-medium leading-snug", selected ? "text-ink" : "text-soft")}>{project.name.replace(/^[^ ]+ /, "")}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="order-1 min-w-0 lg:order-2">
            <div className="overflow-hidden rounded-xl border border-white/12 bg-graphite">
              <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
                <div className="flex gap-1.5" aria-hidden="true">{[0,1,2].map((dot) => <span key={dot} className="h-2 w-2 rounded-full bg-white/20" />)}</div>
                <span className="truncate text-xs text-muted">{item.name}</span>
                <span className="shrink-0 font-mono text-[10px] text-muted">{String(index + 1).padStart(2,"0")} / {templates.length}</span>
              </div>
              <ProjectImage key={item.id} project={item} className="block aspect-[14/9] w-full object-cover object-top" />
            </div>
            <div className="mt-5 flex items-start justify-between gap-4">
              <div aria-live="polite" aria-atomic="true">
                <h3 className="font-display text-xl font-semibold tracking-[-0.03em] text-ink sm:text-2xl">{item.name.replace(/^[^ ]+ /, "")}</h3>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">{item.description}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button type="button" onClick={() => step(-1)} aria-label="Template anterior" className="grid h-11 w-11 place-items-center rounded-lg border border-white/15 text-soft transition hover:border-electric-light hover:text-ink"><ChevronLeft size={18} aria-hidden="true" /></button>
                <button type="button" onClick={() => step(1)} aria-label="Próximo template" className="grid h-11 w-11 place-items-center rounded-lg border border-white/15 text-soft transition hover:border-electric-light hover:text-ink"><ChevronRight size={18} aria-hidden="true" /></button>
              </div>
            </div>
            <a href={waLink(`Olá! Tenho interesse no ${plan.name}, com o template "${item.name}" da ${collectionDetails.name}, para o meu negócio.`)} target="_blank" rel="noreferrer" className="btn btn-primary mt-6 w-full justify-center sm:w-auto">
              Quero esse template <ArrowIcon size={15} />
            </a>
          </div>
        </div>
        ) : (
          <div className="mt-6 rounded-xl border border-white/10 bg-graphite px-6 py-12 sm:px-10 sm:py-16" role="status">
            <h3 className="font-display text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl">{collectionDetails.name}</h3>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">
              Os templates desta coleção estarão disponíveis aqui em breve. Novas coleções serão adicionadas ao catálogo.
            </p>
            <button type="button" onClick={() => setPlanId("start")} className="btn btn-secondary mt-7">
              Explorar coleções do Start <ArrowIcon size={15} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
