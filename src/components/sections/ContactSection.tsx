import { profile } from "@/data/portfolio";
import { SectionTitle } from "@/components/sections/SectionTitle";

const contactOptions = [
  {
    title: "Email",
    description: "Para propostas, freelas e oportunidades de trabalho.",
    href: `mailto:${profile.email}`,
    label: profile.email,
    cta: "Enviar email",
  },
  {
    title: "LinkedIn",
    description: "Conexão profissional e networking de produto e frontend.",
    href: profile.linkedin,
    label: "Perfil no LinkedIn",
    cta: "Abrir LinkedIn",
  },
  {
    title: "GitHub",
    description: "Repositórios, projetos ativos e histórico de evolução.",
    href: profile.github,
    label: "Perfil no GitHub",
    cta: "Ver GitHub",
  },
];

export function ContactSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-8 pb-14 sm:px-8 lg:px-10">
      <div
        className="rounded-[36px] p-6 sm:p-8"
        style={{
          border: "1px solid var(--border)",
          background:
            "linear-gradient(135deg, var(--accent-bg) 0%, var(--background-elevated) 50%, var(--accent-bg) 100%)",
        }}
      >
        <SectionTitle
          eyebrow="Contato"
          title="Vamos construir algo útil juntos"
          description="Escolha o canal que fizer mais sentido para conversarmos sobre projeto, colaboração ou oportunidade de trabalho."
        />

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {contactOptions.map((option) => (
            <article
              key={option.title}
              aria-labelledby={`contact-${option.title}`}
              className="rounded-3xl p-5 backdrop-blur transition-all duration-300 hover:scale-[1.02]"
              style={{
                border: "1px solid var(--border)",
                background: "var(--glass-bg)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <p
                id={`contact-${option.title}`}
                className="text-xs uppercase tracking-[0.2em]"
                style={{ color: "var(--accent-soft)" }}
              >
                {option.title}
              </p>
              <p className="mt-3 text-sm leading-6" style={{ color: "var(--foreground-muted)" }}>
                {option.description}
              </p>
              <p className="mt-4 text-sm font-medium" style={{ color: "var(--foreground)" }}>
                {option.label}
              </p>
              <a
                href={option.href}
                target={option.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={option.href.startsWith("mailto:") ? undefined : "noreferrer"}
                className="mt-5 inline-flex rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-[1.04]"
                style={{
                  border: "1px solid var(--border-accent)",
                  background: "var(--accent-bg)",
                  color: "var(--accent)",
                }}
              >
                {option.cta}
              </a>
            </article>
          ))}
        </div>

        {/* Rodapé técnico */}
        <div
          className="mt-8 pt-5 flex flex-wrap items-center justify-between gap-2"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p className="text-xs" style={{ color: "var(--foreground-subtle)" }}>
            Portfolio feito com Next.js 14 + Tailwind CSS
          </p>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="text-xs transition-opacity hover:opacity-70"
            style={{ color: "var(--accent-soft)" }}
          >
            Ver repositório
          </a>
        </div>
      </div>
    </section>
  );
}
