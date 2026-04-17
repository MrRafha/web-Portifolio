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
      const maxRange = window.innerHeight * 0.25;
      const raw = clamp(window.scrollY / maxRange, 0, 1);

      let next;
      if (raw > 0.15) {
        const adjustedProgress = (raw - 0.15) / 0.85;
        next = 0.15 + easeOutCubic(adjustedProgress) * 0.85;
      } else {
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
  const scrollIndicatorOpacity = Math.max(0, 1 - progress * 4);

  return (
    <section className="relative">
      {/* Orbs de fundo com parallax em 3 camadas */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute left-[-6rem] top-[-4rem] h-72 w-72 rounded-full blur-3xl"
          style={{
            background: "var(--accent-glow)",
            opacity: 0.9,
            transform: `translateY(${progress * 0.15 * 260}px)`,
          }}
        />
        <div
          className="absolute right-[-4rem] top-[4rem] h-80 w-80 rounded-full blur-3xl"
          style={{
            background: "var(--accent-glow)",
            opacity: 0.65,
            transform: `translateY(${progress * 0.30 * 260}px)`,
          }}
        />
        <div
          className="absolute bottom-[-4rem] left-[20%] h-72 w-72 rounded-full blur-3xl"
          style={{
            background: "var(--accent-glow)",
            opacity: 0.55,
            transform: `translateY(${progress * 0.50 * 260}px)`,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(88,101,242,0.16),transparent_28%),linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_28%)]" />
      </div>

      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 px-6 py-8 sm:px-8 lg:grid-cols-2 lg:gap-12 lg:px-10 lg:py-10">
        {/* Coluna de texto */}
        <div>
          <div
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm"
            style={{
              borderColor: "var(--border-accent)",
              background: "var(--accent-bg)",
              color: "var(--accent-soft)",
            }}
          >
            <span className="h-2 w-2 rounded-full" style={{ background: "var(--accent-soft)" }} />
            {profile.role} com foco em produtos
          </div>

          <div className="relative mt-6 min-h-[8rem] sm:min-h-[9rem] lg:min-h-[10rem]">
            <h1
              className="max-w-3xl text-2xl font-bold leading-[1.1] sm:text-3xl lg:text-[3rem]"
              style={{
                color: "var(--foreground)",
                opacity: firstStateOpacity,
                transform: `translateY(${(progress * -14).toFixed(1)}px)`,
              }}
            >
              Construo interfaces modernas e produtos digitais com foco em utilidade real.
            </h1>

            <p
              className="absolute inset-0 max-w-2xl text-base leading-8 sm:text-lg"
              style={{
                color: "var(--foreground-muted)",
                opacity: secondStateOpacity,
                transform: `translateY(${((1 - progress) * 14).toFixed(1)}px)`,
              }}
            >
              {profile.description}
            </p>
          </div>
        </div>

        {/* Coluna dos cards */}
        <div className="relative lg:pt-2">
          <div className="relative h-[24rem] sm:h-[28rem] md:h-[30rem] max-h-[70vh] sm:max-h-[75vh] lg:max-h-none">

            {/* Card de perfil */}
            <article
              className="absolute inset-0 rounded-[28px] p-3 shadow-2xl backdrop-blur-xl flex flex-col"
              style={{
                border: "1px solid var(--border)",
                background: "var(--glass-bg)",
                boxShadow: "var(--shadow-float)",
                opacity: secondStateOpacity,
                transform: `translateY(${(progress * -10).toFixed(1)}px)`,
                pointerEvents: secondStateOpacity > 0.5 ? "auto" : "none",
              }}
            >
              <div
                className="mb-2.5 flex items-center justify-between gap-3 pb-2.5"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <div>
                  <p
                    className="text-xs uppercase tracking-[0.2em]"
                    style={{ color: "var(--accent-soft)" }}
                  >
                    Perfil
                  </p>
                  <h3 className="mt-1.5 text-lg font-semibold" style={{ color: "var(--foreground)" }}>
                    {profile.name}
                  </h3>
                </div>
                <span
                  className="rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    border: "1px solid var(--border-accent)",
                    background: "var(--accent-bg)",
                    color: "var(--accent-soft)",
                  }}
                >
                  GitHub
                </span>
              </div>

              <div
                className="rounded-[24px] p-2.5 flex flex-col h-[calc(100%-90px)] sm:h-[calc(100%-95px)]"
                style={{ border: "1px solid var(--border)", background: "var(--glass-bg-strong)" }}
              >
                <div className="relative w-full flex-1 overflow-hidden rounded-[14px]">
                  <Image
                    src="https://github.com/MrRafha.png?size=500"
                    alt="Foto de perfil do GitHub"
                    className="h-full w-full rounded-[14px] object-cover"
                    style={{ transform: `translateY(${progress * -6}px)` }}
                    width={500}
                    height={500}
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  />
                </div>

                <div
                  className="mt-2.5 grid gap-1.5 sm:grid-cols-3 hidden sm:grid"
                  style={{ transform: `translateY(${progress * -3}px)` }}
                >
                  {[
                    { label: "Área", value: "Frontend & Produto" },
                    { label: "Stack", value: "React + Next" },
                    { label: "Especialidade", value: "Interfaces & Chatbots" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-lg p-2"
                      style={{ border: "1px solid var(--border)", background: "var(--accent-bg)" }}
                    >
                      <p className="text-xs uppercase tracking-wide" style={{ color: "var(--foreground-subtle)" }}>
                        {item.label}
                      </p>
                      <p className="mt-0.5 text-xs font-medium" style={{ color: "var(--foreground)" }}>
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            {/* Card do projeto em destaque */}
            <article
              className="absolute inset-0 rounded-[28px] p-3 shadow-2xl backdrop-blur-xl flex flex-col"
              style={{
                border: "1px solid var(--border)",
                background: "var(--glass-bg)",
                boxShadow: "var(--shadow-float)",
                opacity: firstStateOpacity,
                transform: `translateY(${((1 - progress) * 10).toFixed(1)}px)`,
                pointerEvents: firstStateOpacity > 0.5 ? "auto" : "none",
              }}
            >
              <div
                className="mb-2.5 flex items-center justify-between gap-3 pb-2.5"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--accent-soft)" }}>
                    Destaque
                  </p>
                  <h3 className="mt-1.5 text-lg font-semibold" style={{ color: "var(--foreground)" }}>
                    {featuredProject.title}
                  </h3>
                </div>
                <span
                  className="rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    border: "1px solid var(--border-accent)",
                    background: "var(--accent-bg)",
                    color: "var(--accent-soft)",
                  }}
                >
                  Em evolução
                </span>
              </div>

              <div
                className="rounded-[24px] p-3 flex-1 overflow-y-auto"
                style={{ border: "1px solid var(--border)", background: "var(--glass-bg-strong)" }}
              >
                <div className="mb-2.5 flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>

                <div className="space-y-2.5">
                  <div
                    className="rounded-xl p-2.5"
                    style={{ border: "1px solid var(--border-accent)", background: "var(--background)" }}
                  >
                    <p className="text-xs font-medium" style={{ color: "var(--foreground)" }}>
                      Visão de produto
                    </p>
                    <p className="mt-1.5 text-xs leading-5" style={{ color: "var(--foreground-muted)" }}>
                      {featuredProject.description}
                    </p>
                  </div>

                  <div className="grid gap-2.5 sm:grid-cols-2">
                    <div
                      className="rounded-xl p-2.5"
                      style={{ border: "1px solid var(--border)", background: "var(--accent-bg)" }}
                    >
                      <p className="text-xs" style={{ color: "var(--foreground-subtle)" }}>Stack base</p>
                      <p className="mt-1 text-xs font-medium" style={{ color: "var(--foreground)" }}>
                        {featuredProject.stack.slice(0, 4).join(", ")}
                      </p>
                    </div>
                    <div
                      className="rounded-xl p-2.5"
                      style={{ border: "1px solid var(--border)", background: "var(--accent-bg)" }}
                    >
                      <p className="text-xs" style={{ color: "var(--foreground-subtle)" }}>Direção</p>
                      <p className="mt-1 text-xs font-medium" style={{ color: "var(--foreground)" }}>
                        Utilidade real com identidade forte
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>

      {/* Scroll indicator — desaparece ao começar a rolar */}
      <div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 motion-safe:animate-bounce transition-opacity duration-300"
        style={{ opacity: scrollIndicatorOpacity }}
      >
        <span className="text-xs uppercase tracking-wider" style={{ color: "var(--foreground-subtle)" }}>
          Scroll
        </span>
        <svg className="h-6 w-6" style={{ color: "var(--accent-soft)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
