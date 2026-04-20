export function CTASection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-10">
      <div
        className="rounded-[32px] p-8 backdrop-blur"
        style={{
          border: "1px solid var(--border-accent)",
          background:
            "linear-gradient(135deg, var(--accent-bg) 0%, var(--background-elevated) 60%, var(--accent-bg) 100%)",
          boxShadow: "var(--shadow-float)",
        }}
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p
              className="text-sm font-medium uppercase tracking-[0.24em]"
              style={{ color: "var(--accent-soft)" }}
            >
              Próximo passo
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl" style={{ color: "var(--foreground)" }}>
              Tem um projeto em mente?
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7" style={{ color: "var(--foreground-muted)" }}>
              Estou disponível para freela, colaboração ou oportunidade CLT/PJ.
              Se você precisa de uma interface sólida, um produto funcional ou
              quer tirar uma ideia do papel — vamos conversar.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            <a
              href="#contato"
              className="rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 hover:scale-[1.02]"
              style={{
                background: "var(--accent)",
                color: "var(--foreground-on-accent)",
              }}
            >
              Entrar em contato
            </a>
            <a
              href="#projetos"
              className="rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 hover:scale-[1.02]"
              style={{
                border: "1px solid var(--border-strong)",
                background: "var(--background-surface)",
                color: "var(--foreground-muted)",
              }}
            >
              Ver projetos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
