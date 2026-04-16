"use client";

import { useEffect, useRef, useState } from "react";
import { ProjectShowcase } from "@/components/projects/ProjectShowcase";
import { projects } from "@/data/portfolio";

export function ProjectsSection() {
  const [isInView, setIsInView] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  function scroll(direction: "left" | "right") {
    const container = containerRef.current;
    if (!container) return;
    container.scrollBy({ left: direction === "left" ? -500 : 500, behavior: "smooth" });
  }

  function scrollToIndex(index: number) {
    const container = containerRef.current;
    if (!container) return;
    const child = container.children[index] as HTMLElement;
    child?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }

  // Seção em view via evento do SectionFlowTracker
  useEffect(() => {
    function onSectionSignal(event: Event) {
      const detail = (event as CustomEvent).detail;
      if (!detail) return;
      if (detail.activeSection === "projetos") setIsInView(true);
      else if (detail.activeSection === "stack" || detail.activeSection === "contato") setIsInView(false);
    }
    window.addEventListener("portfolio:section-signal", onSectionSignal as EventListener);
    return () => window.removeEventListener("portfolio:section-signal", onSectionSignal as EventListener);
  }, []);

  // IntersectionObserver para rastrear slide visível e atualizar dots
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Array.from(container.children).indexOf(entry.target as HTMLElement);
            if (idx !== -1) setActiveIndex(idx);
          }
        }
      },
      { root: container, threshold: 0.5 }
    );

    Array.from(container.children).forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);

  return (
    <section data-flow-key="projetos" className="w-full px-6 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center flex items-center justify-center gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em]" style={{ color: "var(--accent-soft)" }}>
              Projetos
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl" style={{ color: "var(--foreground)" }}>
              Alguns projetos
            </h2>
          </div>
          <span
            className="self-end pb-1 text-sm font-mono"
            style={{ color: "var(--foreground-subtle)" }}
          >
            {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        <div className="mt-12 relative">
          <div
            ref={containerRef}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth hide-scrollbar"
          >
            {projects.map((project, index) => (
              <div
                key={project.title}
                className="flex-shrink-0 w-full snap-start"
                style={{ minWidth: "min(100%, 650px)" }}
                aria-label={project.title}
              >
                <ProjectShowcase
                  project={project}
                  index={index}
                  isActive={isInView}
                  flowProgress={0}
                  isCarousel={true}
                />
              </div>
            ))}
          </div>

          {/* Botões laterais — visíveis a partir de lg (sem gap) */}
          <button
            type="button"
            onClick={() => scroll("left")}
            className="hidden lg:flex absolute -left-2 top-1/2 -translate-y-1/2 -translate-x-full rounded-full p-3 transition-all duration-200 hover:scale-110 z-10"
            style={{
              border: "1px solid var(--border-strong)",
              background: "var(--background-elevated)",
              color: "var(--foreground)",
              boxShadow: "var(--shadow-card)",
            }}
            aria-label="Scroll projetos para esquerda"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => scroll("right")}
            className="hidden lg:flex absolute -right-2 top-1/2 -translate-y-1/2 translate-x-full rounded-full p-3 transition-all duration-200 hover:scale-110 z-10"
            style={{
              border: "1px solid var(--border-strong)",
              background: "var(--background-elevated)",
              color: "var(--foreground)",
              boxShadow: "var(--shadow-card)",
            }}
            aria-label="Scroll projetos para direita"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Botões mobile */}
          <div className="mt-4 flex lg:hidden justify-center gap-2 mb-4">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="rounded-lg p-2 transition-all duration-200 hover:scale-110"
              style={{
                border: "1px solid var(--border-strong)",
                background: "var(--background-elevated)",
                color: "var(--foreground)",
              }}
              aria-label="Scroll projetos para esquerda"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="rounded-lg p-2 transition-all duration-200 hover:scale-110"
              style={{
                border: "1px solid var(--border-strong)",
                background: "var(--background-elevated)",
                color: "var(--foreground)",
              }}
              aria-label="Scroll projetos para direita"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots — estado ativo rastreado pelo IntersectionObserver */}
          <div className="mt-4 flex justify-center gap-2">
            {projects.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToIndex(idx)}
                className="h-2.5 rounded-full transition-all duration-300"
                style={{
                  width: idx === activeIndex ? "2rem" : "0.625rem",
                  background: idx === activeIndex ? "var(--accent-soft)" : "var(--border-strong)",
                }}
                aria-label={`Ir para projeto ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
