import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { ProjectImage } from "./ProjectImage";
import { portfolioProjects } from "../../content/portfolio";

it("falls back to the original when a thumbnail fails, without retrying endlessly", () => {
  const { container } = render(<ProjectImage project={portfolioProjects[0]} thumbnail />);
  const image = container.querySelector("img")!;
  fireEvent.error(image);
  expect(image).toHaveAttribute("src", portfolioProjects[0].image);
  fireEvent.error(image);
  expect(image).toHaveAttribute("src", portfolioProjects[0].image);
});

it("drops failed responsive sources before retrying the original", () => {
  render(<ProjectImage project={portfolioProjects[1]} />);
  const image = screen.getByAltText(portfolioProjects[1].imageAlt);
  expect(image).toHaveAttribute("srcset");
  fireEvent.error(image);
  expect(image).not.toHaveAttribute("srcset");
  expect(image).toHaveAttribute("src", portfolioProjects[1].image);
});
