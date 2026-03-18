"use client";

import { useState } from "react";
import Image from "next/image";
import type { Project } from "@/types/portfolio";

type ProjectShowcaseProps = {
  project: Project;
  index: number;
  isActive: boolean;
  flowProgress: number;
  isCarousel?: boolean;
};

const gradients = [
  "from-indigo-500/24 via-[#11111a] to-blue-500/20",
  "from-blue-500/20 via-[#11111a] to-indigo-500/24",
  "from-indigo-400/22 via-[#101018] to-violet-500/16",
  "from-violet-500/16 via-[#11111a] to-blue-500/18",
];

export function ProjectShowcase({ project, index, isActive, flowProgress, isCarousel = false }: ProjectShowcaseProps) {
  const [current, setCurrent] = useState(0);
  const [imageModal, setImageModal] = useState(false);
  const total = project.gallery.length;

  function prev() {
    setCurrent((prevIndex) => (prevIndex - 1 + total) % total);
  }

  function next() {
    setCurrent((prevIndex) => (prevIndex + 1) % total);
  }

  const currentSlide = project.gallery[current];
  const gradient = gradients[index % gradients.length];
  const motionOpacity = isCarousel ? 1 : isActive ? 1 : 0.6;
  const motionScale = isCarousel ? 1 : isActive ? 1 + flowProgress * 0.008 : 0.982;
  const motionY = isCarousel ? 0 : isActive ? 0 : 16;
  const glow = isActive && !isCarousel ? "shadow-[0_0_0_1px_rgba(88,101,242,0.25),0_18px_45px_rgba(88,101,242,0.16)]" : "";
  const isMobileProject = project.title === "Hello Kitty Water Reminder";
  const objectFit = isMobileProject ? "object-contain" : "object-cover";

  return (
    <article
      className={`rounded-[28px] border border-white/10 bg-white/5 p-4 backdrop-blur transition-all duration-700 ${glow} lg:p-5 min-h-[420px]`}
      style={{
        opacity: motionOpacity,
        transform: `translateY(${motionY}px) scale(${motionScale})`,
      }}
    >
      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] h-full">
        <div className="flex flex-col justify-between">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-indigo-300">{project.category}</p>
            {project.featured ? (
              <span className="rounded-full border border-indigo-400/25 bg-indigo-500/12 px-3 py-1 text-xs font-medium text-indigo-100">
                Principal
              </span>
            ) : null}
          </div>

          <h3 className="mt-3 text-xl font-semibold text-white sm:text-2xl">{project.title}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">{project.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {project.highlights.map((highlight) => (
              <div key={highlight} className="rounded-xl border border-white/10 bg-slate-950/60 p-2">
                <p className="text-xs font-medium text-white">{highlight}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.href ? (
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
              >
                Ver projeto
              </a>
            ) : null}
            {project.repo ? (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/5"
              >
                Repositorio
              </a>
            ) : null}
          </div>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-[#0f0f18]/78 p-2.5 transition-all duration-700" style={{ transform: `scale(${isActive ? 1 : 0.99})` }}>
          <div className="mb-2 flex items-center justify-between gap-2">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-indigo-300">Galeria</p>
              <p className="mt-1 text-sm text-slate-300">
                Slide {current + 1} de {total}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prev}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white transition hover:bg-white/10"
                aria-label="Slide anterior"
              >
                Anterior
              </button>
              <button
                type="button"
                onClick={next}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white transition hover:bg-white/10"
                aria-label="Proximo slide"
              >
                Proximo
              </button>
            </div>
          </div>

          <div className={`rounded-xl border border-white/10 bg-gradient-to-br ${gradient} p-3`}>
            <div
              className="relative w-full h-40 rounded-lg overflow-hidden border border-white/10 bg-[#0b0b12]/72 mb-2 cursor-pointer group"
              onClick={() => setImageModal(true)}
            >
              <Image
                src={currentSlide.image}
                alt={currentSlide.title}
                fill
                className={objectFit}
                priority={false}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <svg className="h-12 w-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zM8 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                </svg>
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-[#0b0b12]/72 p-3">
              <p className="text-xs uppercase tracking-[0.18em] text-indigo-300">Preview</p>
              <h4 className="mt-1.5 text-lg font-semibold text-white">{currentSlide.title}</h4>
              <p className="mt-1.5 text-xs leading-5 text-slate-300">{currentSlide.caption}</p>
            </div>
          </div>

          <div className="mt-2 flex gap-1.5">
            {project.gallery.map((slide, slideIndex) => (
              <button
                key={slide.title}
                type="button"
                onClick={() => setCurrent(slideIndex)}
                aria-label={`Abrir slide ${slideIndex + 1}`}
                className={`h-2.5 rounded-full transition ${
                  slideIndex === current ? "w-8 bg-indigo-300" : "w-2.5 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal de imagem */}
      {imageModal && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setImageModal(false)}
        >
          <button
            type="button"
            onClick={() => setImageModal(false)}
            className="absolute top-4 right-4 text-white hover:text-slate-300 transition"
            aria-label="Fechar modal"
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
    </article>
  );
}
