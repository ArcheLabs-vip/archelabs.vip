import { useState } from "react";
import { ArrowRight, ArrowUpRight, Dices } from "lucide-react";
import type { ProjectPreview } from "../content/site";

interface PortfolioDeckProps {
  projects: ProjectPreview[];
  onStartProject: () => void;
}

interface DeckItem extends ProjectPreview {
  id: string;
}

const VARIANTS = [
  { id: "impacto", source: 0, name: "Primeiro impacto", category: "Narrativa", description: "Uma abertura direta, com proposta clara e dois caminhos de ação.", imagePosition: "center top" },
  { id: "oferta", source: 1, name: "Oferta sem ruído", category: "Conversão", description: "Escopos e preços organizados para transformar comparação em decisão.", imagePosition: "center top" },
  { id: "identidade", source: 0, name: "Identidade em cena", category: "Direção visual", description: "A marca entra como prova visual sem competir com a mensagem principal.", imagePosition: "right top" },
  { id: "mensagem", source: 0, name: "Mensagem direta", category: "Conteúdo", description: "Título, argumento e ação cabem no primeiro olhar, sem excesso de contexto.", imagePosition: "left top" },
  { id: "planos", source: 1, name: "Escolha de plano", category: "Interação", description: "Preço, prazo e escopo permanecem visíveis no momento da escolha.", imagePosition: "right top" },
  { id: "comparacao", source: 1, name: "Comparação clara", category: "Arquitetura", description: "As diferenças entre ofertas aparecem antes que a dúvida interrompa a decisão.", imagePosition: "left top" },
] as const;

export function PortfolioDeck({ projects, onStartProject }: PortfolioDeckProps) {
  const [round, setRound] = useState(1);

  // Initialize the pool and queue once
  const [state, setState] = useState(() => {
    const baseDeck = VARIANTS.flatMap((variant) => {
      const source = projects[variant.source];
      if (!source) return [];
      return [{
        ...source,
        id: variant.id,
        name: variant.name,
        category: variant.category,
        description: variant.description,
        imagePosition: "imagePosition" in variant ? variant.imagePosition : source.imagePosition,
      }];
    });

    // Mocking 18 projects to demonstrate the queue logic requested
    const fullPool = [
      ...baseDeck.map(d => ({ ...d, id: `${d.id}-1` })),
      ...baseDeck.map(d => ({ ...d, id: `${d.id}-2`, name: `${d.name} 2` })),
      ...baseDeck.map(d => ({ ...d, id: `${d.id}-3`, name: `${d.name} 3` })),
    ];

    const initialVisible = fullPool.slice(0, 6);
    const remainingQueue = fullPool.slice(6);

    return {
      visible: initialVisible,
      // Queue starts with the remaining items, and the initially visible items go to the end
      queue: [...remainingQueue, ...initialVisible]
    };
  });

  const activeProject = state.visible[0];

  const dealAgain = () => {
    setState((prev) => {
      // Take the next 6 items from the front of the queue
      const nextVisible = prev.queue.slice(0, 6);
      // Put them at the back of the queue
      const nextQueue = [...prev.queue.slice(6), ...nextVisible];
      return {
        visible: nextVisible,
        queue: nextQueue
      };
    });
    setRound((current) => current + 1);
  };

  const handleProjectClick = (clickedProject: DeckItem) => {
    setState((prev) => {
      // Move the clicked project to the front, shift others to the right
      const others = prev.visible.filter(p => p.id !== clickedProject.id);
      return {
        ...prev,
        visible: [clickedProject, ...others]
      };
    });
  };

  if (state.visible.length === 0) return null;

  return (
    <div className="portfolio-deck">
      <header className="portfolio-deck__toolbar">
        <div className="portfolio-deck__imagine">
          <p>01 · Explorar</p>
          <div className="portfolio-deck__deal">
            <span>rodada {String(round).padStart(2, "0")} · coleção arche</span>
            <button type="button" onClick={dealAgain} aria-label="Ver mais projetos">
              <Dices aria-hidden="true" size={14} strokeWidth={1.8} />
              Ver mais
            </button>
          </div>
        </div>
        <p className="portfolio-deck__commit">02 · Em foco</p>
      </header>

      <div className="portfolio-deck__layout">
        <div className="portfolio-deck__grid" aria-label="Selecione uma visão do projeto">
          {state.visible.map((project, index) => (
            <button
              key={`${project.id}-${round}`}
              className="portfolio-tile"
              data-active={index === 0}
              type="button"
              onClick={() => handleProjectClick(project)}
              aria-pressed={index === 0}
            >
              <span className="portfolio-tile__visual">
                <img src={project.image} alt="" width="1440" height={project.image.includes("mobile") ? "11907" : "900"} loading="lazy" decoding="async" style={{ objectPosition: project.imagePosition }} />
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
              <img src={activeProject.image} alt={activeProject.imageAlt} width="1440" height={activeProject.image.includes("mobile") ? "11907" : "900"} loading="lazy" decoding="async" style={{ objectPosition: activeProject.imagePosition }} />
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

      <p className="portfolio-deck__note">Psst… seis landing pages diferentes criadas por nós, sem case inventado.</p>
    </div>
  );
}
