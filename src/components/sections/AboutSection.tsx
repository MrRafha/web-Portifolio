import Image from "next/image";
import { profile, stats } from "@/data/portfolio";

export function AboutSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-8 sm:px-8 lg:px-10">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr]">

        {/* Painel esquerdo — identidade */}
        <div
          className="rounded-[32px] p-6 backdrop-blur flex flex-col items-center text-center lg:items-start lg:text-left"
          style={{
            border: "1px solid var(--border)",
            background: "var(--background-elevated)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <div
            className="relative h-28 w-28 rounded-full overflow-hidden"
            style={{ border: "2px solid var(--border-accent)" }}
          >
            <Image
              src="https://avatars.githubusercontent.com/MrRafha?size=200"
              alt="Foto de perfil de Rafhael Hanry"
              fill
              className="object-cover"
              sizes="112px"
            />
          </div>

          <h2
            className="mt-4 text-2xl font-bold"
            style={{ color: "var(--foreground)" }}
          >
            {profile.name}
          </h2>
          <p
            className="mt-1 text-xs uppercase tracking-[0.18em]"
            style={{ color: "var(--foreground-subtle)" }}
          >
            {profile.role}
          </p>

          <div className="mt-5 w-full h-px" style={{ background: "var(--border)" }} />

          <div className="mt-5 flex flex-col gap-3 w-full">
            {/* Status de disponibilidade */}
            <div
              className="flex items-center gap-2.5 rounded-xl px-3 py-2"
              style={{ background: "var(--accent-bg)", border: "1px solid var(--border-accent)" }}
            >
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <span className="text-xs font-medium" style={{ color: "var(--foreground-muted)" }}>
                Disponível para projetos
              </span>
            </div>

            {/* Localização */}
            <div className="flex items-center gap-2.5 px-1">
              <svg
                className="h-4 w-4 shrink-0"
                style={{ color: "var(--foreground-subtle)" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-xs" style={{ color: "var(--foreground-subtle)" }}>
                Brasil, Piauí
              </span>
            </div>
          </div>
        </div>

        {/* Painel direito — bio e stats */}
        <div
          className="rounded-[32px] p-6 backdrop-blur flex flex-col justify-between gap-6"
          style={{
            border: "1px solid var(--border)",
            background: "linear-gradient(160deg, var(--accent-bg) 0%, var(--background-elevated) 100%)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <div>
            <p
              className="text-xs font-medium uppercase tracking-[0.24em]"
              style={{ color: "var(--accent-soft)" }}
            >
              Sobre
            </p>
            <p
              className="mt-4 text-base leading-relaxed"
              style={{ color: "var(--foreground-muted)" }}
            >
              {profile.headline}
            </p>
            <p
              className="mt-4 text-base leading-relaxed"
              style={{ color: "var(--foreground-muted)" }}
            >
              {profile.description}
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl p-3"
                style={{
                  border: "1px solid var(--border)",
                  background: "var(--glass-bg)",
                }}
              >
                <p
                  className="text-xs uppercase tracking-wide"
                  style={{ color: "var(--foreground-subtle)" }}
                >
                  {stat.label}
                </p>
                <p
                  className="mt-1 text-sm font-semibold"
                  style={{ color: "var(--foreground)" }}
                >
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
