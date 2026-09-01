import { useEffect, useRef, useState } from "react";
import type { Testimonial } from "../content/site";

type TestimonialMarqueeProps = {
  testimonials: Testimonial[];
};

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="testimonial-card">
      <blockquote className="testimonial-card__quote">“{testimonial.quote}”</blockquote>
      <footer className="testimonial-card__author">
        <span className="testimonial-card__monogram" aria-hidden="true">
          {testimonial.initials}
        </span>
        <span>
          <strong>{testimonial.name}</strong>
          <small>{testimonial.context}</small>
        </span>
      </footer>
    </article>
  );
}

export function TestimonialMarquee({ testimonials }: TestimonialMarqueeProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(() => !document.hidden);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "120px 0px" },
    );
    const handleVisibilityChange = () => setIsDocumentVisible(!document.hidden);

    observer.observe(root);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`testimonial-marquee ${isVisible && isDocumentVisible ? "is-running" : ""}`}
      aria-label="Avaliações de clientes"
    >
      <div className="testimonial-marquee__track">
        {[false, true].map((isDuplicate) => (
          <div
            className="testimonial-marquee__group"
            aria-hidden={isDuplicate ? "true" : undefined}
            key={isDuplicate ? "duplicate" : "original"}
          >
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
