import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { PortfolioProject } from "../content/portfolio";
import { PortfolioDeck } from "./PortfolioDeck";

function makeProject(index: number): PortfolioProject {
  return {
    id: `project-${index}`,
    status: "demo",
    name: `Projeto ${index}`,
    category: "Landing page",
    description: `Descrição do projeto ${index}`,
    image: `/project-${index}.webp`,
    imageAlt: `Prévia do projeto ${index}`,
    imageWidth: 1440,
    imageHeight: 900,
  };
}

describe("PortfolioDeck", () => {
  it("mantém seis itens visíveis e percorre coleções maiores", () => {
    const projects = Array.from({ length: 7 }, (_, index) => makeProject(index + 1));

    render(<PortfolioDeck projects={projects} onStartProject={vi.fn()} />);

    expect(screen.getByRole("heading", { name: "Projeto 1" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Projeto 7" })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Ver mais projetos" }));

    expect(screen.getByRole("heading", { name: "Projeto 7" })).toBeInTheDocument();
  });

  it("oculta o controle de paginação quando a coleção cabe em uma rodada", () => {
    render(<PortfolioDeck projects={[makeProject(1)]} onStartProject={vi.fn()} />);

    expect(screen.getByRole("heading", { name: "Projeto 1" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Ver mais projetos" })).not.toBeInTheDocument();
  });

  it("apresenta um estado vazio quando ainda não há projetos", () => {
    render(<PortfolioDeck projects={[]} onStartProject={vi.fn()} />);

    expect(screen.getByRole("status")).toHaveTextContent(
      "Os primeiros projetos estão sendo preparados",
    );
  });
});
