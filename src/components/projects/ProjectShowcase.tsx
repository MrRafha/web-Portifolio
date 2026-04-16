"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Project } from "@/types/portfolio";

type ProjectShowcaseProps = {
  project: Project;
  index: number;
  isActive: boolean;
  flowProgress: number;
  isCarousel?: boolean;
};

export function ProjectShowcase({ project, index, isActive, flowProgress, isCarousel = false }: ProjectShowcaseProps) {
  const [current, setCurrent] = useState(0);
  const [imageModal, setImageModal] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const articleRef = useRef<HTMLElement>(null);
  const total = project.gallery.length;

  const motionOpacity = isCarousel ? 1 : isActive ? 1 : 0.6;
  const motionScale = isCarousel ? 1 : isActive ? 1 + flowProgress * 0.008 : 0.982;
  const motionY = isCarousel ? 0 : isActive ? 0 : 16;
  const isMobileProject = project.title === "Hello Kitty Water Reminder";
  const objectFit = isMobileProject ? "object-contain" : "object-cover";

  // Mouse parallax
  function onMouseMove(e: React.MouseEvent<HTMLElement>) {
    const el = articleRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const my = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    el.style.setProperty("--mouse-x", String(mx));
    el.style.setProperty("--mouse-y", String(my));
  }

  function onMouseLeave() {
    const el = articleRef.current;
    if (!el) return;
    el.style.setProperty("--mouse-x", "0");
    el.style.setProperty("--mouse-y", "0");
  }

  // Fechar modal com Escape
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setImageModal(false);
    }
    if (imageModal) {
      document.addEventListener("keydown", onKeyDown);
      return () => document.removeEventListener("keydown", onKeyDown);
    }
  }, [imageModal]);

  // Reset do imageLoaded ao trocar de slide
  useEffect(() => {
    setImageLoaded(false);
  }, [current]);

  function prev() { setCurrent((p) => (p - 1 + total) % total); }
  function next() { setCurrent((p) => (p + 1) % total); }

  const currentSlide = project.gallery[current];

  return (
    <>
      <article
        ref={articleRef}
        className="rounded-[28px] p-4 backdrop-blur transition-all duration-700 lg:p-5 min-h-[420px] group/card"
        style={{
          border: "1px solid var(--border)",
          background: "var(--background-elevated)",
          boxShadow: "var(--shadow-card)",
          opacity: motionOpacity,
          transform: `translateY(${motionY}px) scale(${motionScale})`,
          "--mouse-x": "0",
          "--mouse-y": "0",
        } as React.CSSProperties}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] h-full">
          {/* Painel de texto — move levemente contra o mouse */}
          <div
            className="flex flex-col justify-between transition-transform duration-500"
            style={{ transform: "translate(calc(var(--mouse-x) * -4px), calc(var(--mouse-y) * -4px))" }}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium" style={{ color: "var(--accent-soft)" }}>
                {project.category}
              </p>
              {project.featured ? (
                <span
                  className="rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    border: "1px solid var(--border-accent)",
                    background: "var(--accent-bg)",
                    color: "var(--accent-soft)",
                  }}
                >
                  Principal
                </span>
              ) : null}
            </div>

            <h3 className="mt-3 text-xl font-semibold sm:text-2xl" style={{ color: "var(--foreground)" }}>
              {project.title}
            </h3>
            <p className="mt-3 text-sm leading-6" style={{ color: "var(--foreground-muted)" }}>
              {project.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full px-3 py-1 text-sm font-mono"
                  style={{
                    border: "1px solid var(--border)",
                    background: "var(--accent-bg)",
                    color: "var(--foreground-muted)",
                  }}
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {project.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="rounded-xl p-2"
                  style={{ border: "1px solid var(--border)", background: "var(--background-surface)" }}
                >
                  <p className="text-xs font-medium" style={{ color: "var(--foreground)" }}>
                    {highlight}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Ver projeto: ${project.title} (abre em nova aba)`}
                  className="rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-[1.02]"
                  style={{
                    background: "var(--accent)",
                    color: "var(--foreground-on-accent)",
                  }}
                >
                  Ver projeto
                </a>
              ) : (
                <span
                  className="rounded-xl px-4 py-2 text-sm font-medium cursor-default"
                  style={{
                    border: "1px solid var(--border)",
                    background: "var(--background-surface)",
                    color: "var(--foreground-subtle)",
                  }}
                >
                  Em desenvolvimento
                </span>
              )}
              {project.repo ? (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Repositório: ${project.title} (abre em nova aba)`}
                  className="rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-[1.02]"
                  style={{
                    border: "1px solid var(--border)",
                    background: "var(--background-surface)",
                    color: "var(--foreground-muted)",
                  }}
                >
                  Repositório
                </a>
              ) : null}
            </div>
          </div>

          {/* Painel de galeria — move na direção do mouse */}
          <div
            className="rounded-[24px] p-2.5 transition-all duration-500"
            style={{
              border: "1px solid var(--border)",
              background: "var(--background-surface)",
              transform: "translate(calc(var(--mouse-x) * 8px), calc(var(--mouse-y) * 6px)) scale(1.01)",
            }}
          >
            <div className="mb-2 flex items-center justify-between gap-2">
              <div>
                <p className="text-xs uppercase tracking-[0.22em]" style={{ color: "var(--accent-soft)" }}>
                  Galeria
                </p>
                <p className="mt-1 text-sm" style={{ color: "var(--foreground-muted)" }}>
                  Slide {current + 1} de {total}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prev}
                  className="rounded-lg px-3 py-1.5 text-sm transition-all duration-200 hover:scale-[1.04]"
                  style={{
                    border: "1px solid var(--border)",
                    background: "var(--background-elevated)",
                    color: "var(--foreground)",
                  }}
                  aria-label="Slide anterior"
                >
                  Anterior
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="rounded-lg px-3 py-1.5 text-sm transition-all duration-200 hover:scale-[1.04]"
                  style={{
                    border: "1px solid var(--border)",
                    background: "var(--background-elevated)",
                    color: "var(--foreground)",
                  }}
                  aria-label="Próximo slide"
                >
                  Próximo
                </button>
              </div>
            </div>

            <div
              className="rounded-xl p-3"
              style={{
                border: "1px solid var(--border-accent)",
                background: `linear-gradient(135deg, var(--accent-bg), var(--background-elevated))`,
              }}
            >
              {/* Imagem com shimmer e fade-in */}
              <div
                className="relative w-full h-40 rounded-lg overflow-hidden mb-2 cursor-pointer group"
                style={{ border: "1px solid var(--border)", background: "var(--background)" }}
                onClick={() => setImageModal(true)}
              >
                {!imageLoaded && (
                  <div className="absolute inset-0 skeleton rounded-lg" />
                )}
                <Image
                  src={currentSlide.image}
                  alt={currentSlide.title}
                  fill
                  className={`${objectFit} transition-all duration-500 group-hover:scale-[1.03]`}
                  style={{ opacity: imageLoaded ? 1 : 0, transition: "opacity 400ms ease" }}
                  onLoad={() => setImageLoaded(true)}
                  priority={false}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <svg className="h-10 w-10 text-white drop-shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>

              <div
                className="rounded-lg p-3"
                style={{ border: "1px solid var(--border)", background: "var(--glass-bg-strong)" }}
              >
                <p className="text-xs uppercase tracking-[0.18em]" style={{ color: "var(--accent-soft)" }}>
                  Preview
                </p>
                <h4 className="mt-1.5 text-lg font-semibold" style={{ color: "var(--foreground)" }}>
                  {currentSlide.title}
                </h4>
                <p className="mt-1.5 text-xs leading-5" style={{ color: "var(--foreground-muted)" }}>
                  {currentSlide.caption}
                </p>
              </div>
            </div>

            <div className="mt-2 flex gap-1.5">
              {project.gallery.map((slide, slideIndex) => (
                <button
                  key={slide.title}
                  type="button"
                  onClick={() => setCurrent(slideIndex)}
                  aria-label={`Abrir slide ${slideIndex + 1}`}
                  className="h-2.5 rounded-full transition-all duration-300"
                  style={{
                    width: slideIndex === current ? "2rem" : "0.625rem",
                    background: slideIndex === current ? "var(--accent-soft)" : "var(--border-strong)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* Modal de imagem acessível */}
      {imageModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Imagem ampliada: ${currentSlide.title}`}
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ background: "rgba(0,0,0,0.85)" }}
          onClick={() => setImageModal(false)}
        >
          <button
            type="button"
            onClick={() => setImageModal(false)}
            autoFocus
            className="absolute top-4 right-4 transition-opacity hover:opacity-70"
            style={{ color: "var(--foreground)" }}
            aria-label="Fechar imagem ampliada"
          >
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div
            className="relative max-w-4xl max-h-[80vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={currentSlide.image}
              alt={currentSlide.title}
              width={1200}
              height={800}
              className={`w-full h-auto rounded-lg ${objectFit}`}
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
