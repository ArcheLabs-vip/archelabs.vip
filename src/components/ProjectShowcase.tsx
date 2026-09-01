import { useEffect, useMemo, useState } from "react";
import type { ProjectPreview } from "../content/site";

interface ProjectShowcaseProps {
  projects: ProjectPreview[];
}

const ROTATION_INTERVAL = 4600;

export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(media.matches);

    updatePreference();
    media.addEventListener("change", updatePreference);
    return () => media.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (projects.length < 2 || reduceMotion) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % projects.length);
    }, ROTATION_INTERVAL);

    return () => window.clearInterval(interval);
  }, [projects.length, reduceMotion]);

  const activeProject = projects[activeIndex];
  const positions = useMemo(
    () => projects.map((_, index) => (index - activeIndex + projects.length) % projects.length),
    [activeIndex, projects],
  );

  if (!activeProject) return null;

  return (
    <section
      className="project-showcase"
      aria-label="Prévia animada de trabalhos da Arche Labs"
    >
      <div className="project-showcase__stage" aria-live="off">
        {projects.map((project, index) => (
          <figure
            key={`${project.name}-${project.category}`}
            className="project-showcase__card"
            data-position={positions[index]}
            aria-hidden={index !== activeIndex}
          >
            <img
              src={project.image}
              alt={index === activeIndex ? project.imageAlt : ""}
              width="1440"
              height={project.image.includes("mobile") ? "11907" : "900"}
              fetchPriority={index === 0 ? "high" : "auto"}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              style={{ objectPosition: project.imagePosition }}
            />
          </figure>
        ))}
      </div>

      <div className="project-showcase__footer">
        <p className="project-showcase__category">{activeProject.category}</p>
        <p className="project-showcase__name">{activeProject.name}</p>
      </div>
    </section>
  );
}
