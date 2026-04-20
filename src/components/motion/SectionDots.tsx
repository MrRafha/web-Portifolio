"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { key: "hero",    label: "Início" },
  { key: "sobre",   label: "Sobre" },
  { key: "projetos",label: "Projetos" },
  { key: "stack",   label: "Stack" },
  { key: "cta",     label: "Próximo passo" },
  { key: "contato", label: "Contato" },
];

export function SectionDots() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    function handler(e: Event) {
      const { activeSection } = (e as CustomEvent).detail;
      if (activeSection) setActive(activeSection);
    }
    window.addEventListener("portfolio:section-signal", handler as EventListener);
    return () => window.removeEventListener("portfolio:section-signal", handler as EventListener);
  }, []);

  return (
    <nav
      aria-label="Navegação por seção"
      className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3"
    >
      {SECTIONS.map(({ key, label }) => (
        <a
          key={key}
          href={`#${key}`}
          aria-label={label}
          title={label}
          className="group flex items-center gap-2 justify-end"
        >
          <span
            className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 select-none"
            style={{ color: "var(--foreground-subtle)" }}
          >
            {label}
          </span>
          <span
            className="block rounded-full transition-all duration-300"
            style={{
              width:  active === key ? "10px" : "6px",
              height: active === key ? "10px" : "6px",
              background: active === key ? "var(--accent-soft)" : "var(--border-strong)",
            }}
          />
        </a>
      ))}
    </nav>
  );
}
