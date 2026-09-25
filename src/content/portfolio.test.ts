import { describe, expect, it } from "vitest";
import { collectionPlans, portfolioProjects, projectCollections } from "./portfolio";

describe("published template catalogue", () => {
  it("has unique IDs and assigns every template to an available plan/collection", () => {
    expect(new Set(portfolioProjects.map(project => project.id)).size).toBe(portfolioProjects.length);
    const collectionIds = projectCollections.map(collection => collection.id);
    for (const project of portfolioProjects) {
      expect(collectionIds).toContain(project.collectionId);
      expect(collectionPlans.some(plan => plan.collections.includes(project.collectionId))).toBe(true);
    }
    expect(collectionPlans.find(plan => plan.id === "start")?.collections).toEqual(["essencial", "presenca"]);
    expect(collectionPlans.find(plan => plan.id === "pro")?.collections).toContain("aura");
  });

  it("keeps thumbnails and full-size images consistent with responsive sources", () => {
    for (const project of portfolioProjects) {
      const sources = project.imageSrcSet!.split(", ").map(source => source.split(" ")[0]);
      expect(sources).toContain(project.image);
      expect(sources).toContain(project.thumbnail);
      expect(new Set(sources).size).toBe(3);
      for (const source of sources) {
        expect(source).toBeTruthy();
        expect(source).toMatch(/^\/assets\/projects\/.+\.webp$/);
      }
    }
  });
});
