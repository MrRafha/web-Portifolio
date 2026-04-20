"use client";

import { profile, projects } from "@/data/portfolio";

export function HeroSection() {
  const featuredProject = projects.find((project) => project.featured) ?? projects[0];

  return (
    <section className="relative">
      {/* Orbs de fundo estáticos */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div
          className="absolute left-[-6rem] top-[-4rem] h-72 w-72 rounded-full blur-3xl"
          style={{ background: "var(--accent-glow)", opacity: 0.9 }}
        />
        <div
          className="absolute right-[-4rem] top-[4rem] h-80 w-80 rounded-full blur-3xl"
          style={{ background: "var(--accent-glow)", opacity: 0.65 }}
        />
        <div
          className="absolute bottom-[-4rem] left-[20%] h-72 w-72 rounded-full blur-3xl"
          style={{ background: "var(--accent-glow)", opacity: 0.55 }}
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
            Frontend · UI, produto e automação
          </div>

          <h1
            className="mt-6 max-w-3xl text-2xl font-bold leading-[1.1] sm:text-3xl lg:text-[3rem]"
            style={{ color: "var(--foreground)" }}
          >
            {profile.headline}
          </h1>

          <p
            className="mt-5 max-w-xl text-base leading-relaxed"
            style={{ color: "var(--foreground-muted)" }}
          >
            {profile.description}
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projetos"
              className="rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:scale-[1.02]"
              style={{
                background: "var(--accent)",
                color: "var(--foreground-on-accent)",
              }}
            >
              Ver projetos
            </a>
            <a
              href="#contato"
              className="rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:scale-[1.02]"
              style={{
                border: "1px solid var(--border-strong)",
                background: "var(--background-surface)",
                color: "var(--foreground-muted)",
              }}
            >
              Entrar em contato
            </a>
          </div>
        </div>

        {/* Card do projeto em destaque */}
        <div className="relative lg:pt-2">
          <div className="relative h-[24rem] sm:h-[28rem] md:h-[30rem] max-h-[70vh] sm:max-h-[75vh] lg:max-h-none">
            <article
              className="absolute inset-0 rounded-[28px] p-3 shadow-2xl backdrop-blur-xl flex flex-col"
              style={{
                border: "1px solid var(--border)",
                background: "var(--glass-bg)",
                boxShadow: "var(--shadow-float)",
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
                  <h2 className="mt-1.5 text-lg font-semibold" style={{ color: "var(--foreground)" }}>
                    {featuredProject.title}
                  </h2>
                </div>
                {featuredProject.href ? (
                  <a
                    href={featuredProject.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Ver ${featuredProject.title} ao vivo`}
                    className="rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 hover:scale-[1.04]"
                    style={{
                      border: "1px solid var(--border-accent)",
                      background: "var(--accent-bg)",
                      color: "var(--accent-soft)",
                    }}
                  >
                    Ver ao vivo ↗
                  </a>
                ) : (
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
                )}
              </div>

              <div
                className="rounded-[24px] p-3 flex-1 overflow-y-auto"
                style={{ border: "1px solid var(--border)", background: "var(--glass-bg-strong)" }}
              >
                <div className="mb-2.5 flex items-center gap-1.5" aria-hidden="true">
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
                      Sobre o projeto
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
                      <p className="text-xs" style={{ color: "var(--foreground-subtle)" }}>Stack</p>
                      <p className="mt-1 text-xs font-medium" style={{ color: "var(--foreground)" }}>
                        {featuredProject.stack.slice(0, 4).join(", ")}
                      </p>
                    </div>
                    <div
                      className="rounded-xl p-2.5"
                      style={{ border: "1px solid var(--border)", background: "var(--accent-bg)" }}
                    >
                      <p className="text-xs" style={{ color: "var(--foreground-subtle)" }}>Categoria</p>
                      <p className="mt-1 text-xs font-medium" style={{ color: "var(--foreground)" }}>
                        {featuredProject.category}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 motion-safe:animate-bounce transition-opacity duration-300"
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
