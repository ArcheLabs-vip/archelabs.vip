import type { PortfolioProject } from "../../content/portfolio";

export function ProjectImage({ project, thumbnail = false, className }: {
  project: PortfolioProject;
  thumbnail?: boolean;
  className?: string;
}) {
  return (
    <img
      src={thumbnail ? project.thumbnail ?? project.image : project.image}
      srcSet={thumbnail ? undefined : project.imageSrcSet}
      sizes={thumbnail ? undefined : "(min-width: 1280px) 920px, (min-width: 1024px) 65vw, 95vw"}
      alt={thumbnail ? "" : project.imageAlt}
      width={project.imageWidth}
      height={project.imageHeight}
      loading="lazy"
      className={className}
      onError={(event) => {
        const image = event.currentTarget;
        if (image.dataset.fallback) return;
        image.dataset.fallback = "true";
        image.removeAttribute("srcset");
        image.src = project.image;
      }}
    />
  );
}
