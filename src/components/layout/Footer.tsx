import { profile } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-6 pb-14 pt-8 sm:px-8 lg:px-10">
      <div
        className="rounded-[32px] p-6 backdrop-blur"
        style={{
          border: "1px solid var(--border)",
          background: "var(--background-elevated)",
          boxShadow: "var(--shadow-card)",
        }}
      >
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p
              className="text-sm font-medium uppercase tracking-[0.24em]"
              style={{ color: "var(--accent-soft)" }}
            >
              Contato
            </p>
            <h2 className="mt-3 text-2xl font-semibold" style={{ color: "var(--foreground)" }}>
              Vamos transformar ideia em produto.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6" style={{ color: "var(--foreground-muted)" }}>
              Disponível para freela, colaboração ou oportunidade CLT/PJ. Resposta em até 24h.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-200 hover:scale-[1.02]"
              style={{
                background: "var(--accent)",
                color: "var(--foreground-on-accent)",
              }}
            >
              Email
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-200 hover:scale-[1.02]"
              style={{
                border: "1px solid var(--border-strong)",
                background: "var(--background-surface)",
                color: "var(--foreground-muted)",
              }}
            >
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-200 hover:scale-[1.02]"
              style={{
                border: "1px solid var(--border-strong)",
                background: "var(--background-surface)",
                color: "var(--foreground-muted)",
              }}
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
