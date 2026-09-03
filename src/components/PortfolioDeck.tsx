import { useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, Dices } from "lucide-react";
import type { PortfolioProject } from "../content/portfolio";

interface PortfolioDeckProps {
  projects: PortfolioProject[];
  onStartProject: () => void;
}

const PAGE_SIZE = 6;

export function PortfolioDeck({ projects, onStartProject }: PortfolioDeckProps) {
  const [offset, setOffset] = useState(0);
  const [round, setRound] = useState(1);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(
    () => projects[0]?.id ?? null,
  );

  const visibleProjects = useMemo(() => {
    if (projects.length === 0) return [];

    const safeOffset = offset % projects.length;
    const visibleCount = Math.min(PAGE_SIZE, projects.length);
    const page = Array.from(
      { length: visibleCount },
      (_, index) => projects[(safeOffset + index) % projects.length],
    );
    const activeProject = page.find((project) => project.id === activeProjectId);

    if (!activeProject) return page;

    return [
      activeProject,
      ...page.filter((project) => project.id !== activeProject.id),
    ];
  }, [activeProjectId, offset, projects]);

  const activeProject = visibleProjects[0];
  const canShowMore = projects.length > PAGE_SIZE;
  const demoCount = projects.filter((project) => project.status === "demo").length;

  const dealAgain = () => {
    if (!canShowMore) return;

    const nextOffset = (offset + PAGE_SIZE) % projects.length;
    setOffset(nextOffset);
    setActiveProjectId(projects[nextOffset]?.id ?? null);
    setRound((current) => current + 1);
  };

  if (!activeProject) {
    return (
      <div className="portfolio-deck portfolio-deck--empty" role="status">
        <p>Os primeiros projetos estão sendo preparados para esta coleção.</p>
      </div>
    );
  }

  const collectionNote =
    demoCount === 0
      ? "Cases reais da Arche Labs, apresentados com contexto."
      : demoCount === projects.length
        ? "Demonstrações da própria Arche Labs, mantidas enquanto os primeiros cases são produzidos."
        : demoCount === 1
          ? "1 demonstração permanece na coleção e será substituída por um case real."
          : `${demoCount} demonstrações permanecem na coleção e serão substituídas por cases reais.`;

  return (
    <div className="portfolio-deck">
      <header className="portfolio-deck__toolbar">
        <div className="portfolio-deck__imagine">
          <p>01 · Explorar</p>
          {canShowMore ? (
            <div className="portfolio-deck__deal">
              <span>rodada {String(round).padStart(2, "0")} · coleção arche</span>
              <button type="button" onClick={dealAgain} aria-label="Ver mais projetos">
                <Dices aria-hidden="true" size={14} strokeWidth={1.8} />
                Ver mais
              </button>
            </div>
          ) : null}
        </div>
        <p className="portfolio-deck__commit">02 · Em foco</p>
      </header>

      <div className="portfolio-deck__layout">
        <div className="portfolio-deck__grid" aria-label="Selecione uma visão do projeto">
          {visibleProjects.map((project, index) => (
            <button
              key={`${project.id}-${round}`}
              className="portfolio-tile"
              data-active={index === 0}
              type="button"
              onClick={() => setActiveProjectId(project.id)}
              aria-pressed={index === 0}
            >
              <span className="portfolio-tile__visual">
                <img
                  src={project.image}
                  alt=""
                  width={project.imageWidth}
                  height={project.imageHeight}
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: project.imagePosition }}
                />
              </span>
              <span className="portfolio-tile__meta">
                <span>{project.category}</span>
                <strong>{project.name}</strong>
              </span>
            </button>
          ))}
        </div>

        <p className="portfolio-deck__mobile-commit" aria-hidden="true">02 · Em foco</p>

        <div className="portfolio-deck__commit-column">
          <article className="portfolio-feature" key={`${activeProject.id}-${round}`} aria-live="polite">
            <div className="portfolio-feature__visual">
              <img
                src={activeProject.image}
                alt={activeProject.imageAlt}
                width={activeProject.imageWidth}
                height={activeProject.imageHeight}
                loading="lazy"
                decoding="async"
                style={{ objectPosition: activeProject.imagePosition }}
              />
              <span>Selecionado</span>
            </div>
            <div className="portfolio-feature__content">
              <p>{activeProject.category}</p>
              <h3>{activeProject.name}</h3>
              <p className="portfolio-feature__description">{activeProject.description}</p>
              <button type="button" onClick={onStartProject}>
                Criar o próximo
                <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.8} />
              </button>
            </div>
          </article>
          <p className="portfolio-feature__links">
            A composição muda; a clareza fica
            <ArrowRight aria-hidden="true" size={14} strokeWidth={1.6} />
          </p>
        </div>
      </div>

      <p className="portfolio-deck__note">{collectionNote}</p>
    </div>
  );
}
