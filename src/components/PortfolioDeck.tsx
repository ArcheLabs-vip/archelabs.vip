import { useMemo, useState } from "react";
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [round, setRound] = useState(1);

  const deck = useMemo<DeckItem[]>(
    () => VARIANTS.flatMap((variant) => {
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
    }),
    [projects],
  );

  const orderedDeck = useMemo(
    () => deck.map((_, offset) => deck[(activeIndex + offset) % deck.length]),
    [activeIndex, deck],
  );

  if (deck.length === 0) return null;
  const activeProject = orderedDeck[0];

  const dealAgain = () => {
    setActiveIndex((current) => (current + 2) % deck.length);
    setRound((current) => current + 1);
  };

  return (
    <div className="portfolio-deck">
      <header className="portfolio-deck__toolbar">
        <div className="portfolio-deck__imagine">
          <p>01 · Explorar</p>
          <div className="portfolio-deck__deal">
            <span>rodada {String(round).padStart(2, "0")} · coleção arche</span>
            <button type="button" onClick={dealAgain} aria-label="Embaralhar projetos">
              <Dices aria-hidden="true" size={14} strokeWidth={1.8} />
              Embaralhar
            </button>
          </div>
        </div>
        <p className="portfolio-deck__commit">02 · Em foco</p>
      </header>

      <div className="portfolio-deck__layout">
        <div className="portfolio-deck__grid" aria-label="Selecione uma visão do projeto">
          {orderedDeck.map((project, index) => (
            <button
              key={`${project.id}-${round}`}
              className="portfolio-tile"
              data-active={index === 0}
              type="button"
              onClick={() => setActiveIndex(deck.findIndex((item) => item.id === project.id))}
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

      <p className="portfolio-deck__note">Psst… seis decisões de uma mesma landing page, sem case inventado.</p>
    </div>
  );
}
