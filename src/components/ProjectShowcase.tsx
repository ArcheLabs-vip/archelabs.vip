import { useEffect, useMemo, useState } from "react";
import type { ProjectPreview } from "../content/portfolio";

interface ProjectShowcaseProps {
  projects: ProjectPreview[];
}

const ROTATION_INTERVAL = 4600;

export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const displayedProjects = useMemo(() => projects.slice(0, 3), [projects]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(media.matches);

    updatePreference();
    media.addEventListener("change", updatePreference);
    return () => media.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (displayedProjects.length < 2 || reduceMotion) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % displayedProjects.length);
    }, ROTATION_INTERVAL);

    return () => window.clearInterval(interval);
  }, [displayedProjects.length, reduceMotion]);

  const safeActiveIndex = displayedProjects.length
    ? activeIndex % displayedProjects.length
    : 0;
  const activeProject = displayedProjects[safeActiveIndex];
  const positions = useMemo(
    () =>
      displayedProjects.map(
        (_, index) =>
          (index - safeActiveIndex + displayedProjects.length) %
          displayedProjects.length,
      ),
    [displayedProjects, safeActiveIndex],
  );

  if (!activeProject) return null;

  return (
    <section
      className="project-showcase"
      aria-label="Prévia animada de trabalhos da Arche Labs"
    >
      <div className="project-showcase__stage" aria-live="off">
        {displayedProjects.map((project, index) => (
          <figure
            key={`${project.name}-${project.category}`}
            className="project-showcase__card"
            data-position={positions[index]}
            aria-hidden={index !== activeIndex}
          >
            <img
              src={project.image}
              alt={index === safeActiveIndex ? project.imageAlt : ""}
              width={project.imageWidth}
              height={project.imageHeight}
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
