"use client";

import { profile, projects } from "@/data/portfolio";
import Image from "next/image";
import { useEffect, useState } from "react";

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export function HeroSection() {
  const [progress, setProgress] = useState(0);
  const featuredProject = projects.find((project) => project.featured) ?? projects[0];

  useEffect(() => {
    let rafId = 0;
    let lastProgress = -1;

    function applyProgress() {
      const maxRange = window.innerHeight * 0.4;
      const raw = clamp(window.scrollY / maxRange, 0, 1);

      // Sistema de gatilho: quando passa de 15% do scroll, acelera a transição
      let next;
      if (raw > 0.15) {
        // Acelera a progressão após o gatilho
        const adjustedProgress = (raw - 0.15) / 0.85;
        next = 0.15 + easeOutCubic(adjustedProgress) * 0.85;
      } else {
        // Progressão suave no início
        next = easeOutCubic(raw / 0.15) * 0.15;
      }

      if (Math.abs(next - lastProgress) > 0.008) {
        lastProgress = next;
        setProgress(next);
      }
    }

    function onScroll() {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(applyProgress);
    }

    applyProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const firstStateOpacity = 1 - progress;
  const secondStateOpacity = progress;

  return (
    <section className="relative">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-6rem] top-[-4rem] h-72 w-72 rounded-full bg-indigo-500/22 blur-3xl" />
        <div className="absolute right-[-4rem] top-[4rem] h-80 w-80 rounded-full bg-indigo-300/14 blur-3xl" />
        <div className="absolute bottom-[-4rem] left-[20%] h-72 w-72 rounded-full bg-blue-500/12 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(88,101,242,0.16),transparent_28%),linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_28%)]" />
      </div>

      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 px-6 py-8 sm:px-8 lg:grid-cols-2 lg:gap-12 lg:px-10 lg:py-10">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/25 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-100">
            <span className="h-2 w-2 rounded-full bg-indigo-300" />
            {profile.role} com foco em produtos
          </div>

          <div className="relative mt-6 min-h-[8rem] sm:min-h-[9rem] lg:min-h-[10rem]">
            <h2
              className="max-w-3xl text-2xl font-semibold leading-[1.1] text-white transition-all duration-500 sm:text-3xl lg:text-[3rem]"
              style={{
                opacity: firstStateOpacity,
                transform: `translateY(${(progress * -14).toFixed(1)}px)`,
              }}
            >
              Construo interfaces modernas e produtos digitais com foco em utilidade real.
            </h2>

            <p
              className="absolute inset-0 max-w-2xl text-base leading-8 text-slate-200 transition-all duration-500 sm:text-lg"
              style={{
                opacity: secondStateOpacity,
                transform: `translateY(${((1 - progress) * 14).toFixed(1)}px)`,
              }}
            >
              {profile.description}
            </p>
          </div>
        </div>

        <div className="relative lg:pt-2">
          <div className="relative h-[24rem] sm:h-[28rem] md:h-[30rem] max-h-[70vh] sm:max-h-[75vh] lg:max-h-none">
            <article
              className="absolute inset-0 rounded-[28px] border border-white/10 bg-gradient-to-br from-white/10 via-[#101018]/90 to-indigo-500/12 p-3 shadow-2xl backdrop-blur-xl transition-all duration-500"
              style={{
                opacity: secondStateOpacity,
                transform: `translateY(${(progress * -10).toFixed(1)}px)`,
                pointerEvents: secondStateOpacity > 0.5 ? "auto" : "none",
              }}
            >
              <div className="mb-2.5 flex items-center justify-between gap-3 border-b border-white/10 pb-2.5">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">Perfil</p>
                  <h3 className="mt-1.5 text-lg font-semibold text-white">{profile.name}</h3>
                </div>
                <span className="rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3 py-1 text-xs font-medium text-indigo-200">
                  GitHub
                </span>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-slate-950/80 p-2.5 flex flex-col h-[calc(100%-90px)] sm:h-[calc(100%-95px)]">
                <div className="relative w-full flex-1 overflow-hidden rounded-[14px]">
                  <Image
                    src="https://github.com/MrRafha.png?size=500"
                    alt="Foto de perfil do GitHub"
                    className="h-full w-full rounded-[14px] object-cover"
                    width={500}
                    height={500}
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  />
                </div>

                <div className="mt-2.5 grid gap-1.5 sm:grid-cols-3 hidden sm:grid">
                  <div className="rounded-lg border border-white/10 bg-white/5 p-2">
                    <p className="text-xs uppercase tracking-wide text-slate-400">Área</p>
                    <p className="mt-0.5 text-xs font-medium text-white">Frontend & Produto</p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/5 p-2">
                    <p className="text-xs uppercase tracking-wide text-slate-400">Stack</p>
                    <p className="mt-0.5 text-xs font-medium text-white">React + Next</p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/5 p-2">
                    <p className="text-xs uppercase tracking-wide text-slate-400">Especialidade</p>
                    <p className="mt-0.5 text-xs font-medium text-white">Interfaces modernas & Chat bots</p>
                  </div>
                </div>
              </div>
            </article>

            <article
              className="absolute inset-0 rounded-[28px] border border-white/10 bg-gradient-to-br from-white/10 via-[#101018]/90 to-indigo-500/12 p-3 shadow-2xl backdrop-blur-xl transition-all duration-500 flex flex-col"
              style={{
                opacity: firstStateOpacity,
                transform: `translateY(${((1 - progress) * 10).toFixed(1)}px)`,
                pointerEvents: firstStateOpacity > 0.5 ? "auto" : "none",
              }}
            >
              <div className="mb-2.5 flex items-center justify-between gap-3 border-b border-white/10 pb-2.5">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">Destaque</p>
                  <h3 className="mt-1.5 text-lg font-semibold text-white">{featuredProject.title}</h3>
                </div>
                <span className="rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3 py-1 text-xs font-medium text-indigo-200">
                  Em evolucao
                </span>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-slate-950/80 p-3 flex-1 overflow-y-auto">
                <div className="mb-2.5 flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>

                <div className="space-y-2.5">
                  <div className="rounded-xl border border-indigo-500/20 bg-slate-900 p-2.5">
                    <p className="text-xs font-medium text-white">Visao de produto</p>
                    <p className="mt-1.5 text-xs leading-5 text-slate-300">{featuredProject.description}</p>
                  </div>

                  <div className="grid gap-2.5 sm:grid-cols-2">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
                      <p className="text-xs text-slate-400">Stack base</p>
                      <p className="mt-1 text-xs font-medium text-white">{featuredProject.stack.slice(0, 4).join(", ")}</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
                      <p className="text-xs text-slate-400">Direcao</p>
                      <p className="mt-1 text-xs font-medium text-white">Utilidade real com identidade forte</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>

      {/* Scroll down indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-slate-400 uppercase tracking-wider">Scroll</span>
        <svg className="h-6 w-6 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
