"use client";

import { useEffect, useRef, useState } from "react";
import { SectionTitle } from "@/components/sections/SectionTitle";
import { techGroups } from "@/data/portfolio";

function ProficiencyBar({ value, delay, triggered }: { value: number; delay: number; triggered: boolean }) {
  const fillRef = useRef<HTMLDivElement>(null);
  const didAnimate = useRef(false);

  useEffect(() => {
    const fill = fillRef.current;
    if (!fill || !triggered || didAnimate.current) return;
    didAnimate.current = true;
    setTimeout(() => {
      fill.style.setProperty("--proficiency", String(value / 100));
      fill.classList.add("animated");
    }, delay);
  }, [triggered, value, delay]);

  return (
    <div className="mt-3 mb-1">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs uppercase tracking-[0.14em]" style={{ color: "var(--foreground-subtle)" }}>
          Competências ativas
        </span>
        <span className="text-xs font-mono" style={{ color: "var(--accent-soft)" }}>
          {value}%
        </span>
      </div>
      <div className="h-1 w-full rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
        <div
          ref={fillRef}
          className="h-full rounded-full proficiency-bar-fill"
          style={{
            background: "linear-gradient(90deg, var(--accent), var(--accent-soft))",
          }}
        />
      </div>
    </div>
  );
}

export function StackSection() {
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    function onSectionSignal(e: Event) {
      const detail = (e as CustomEvent).detail;
      if (detail?.activeSection === "stack") setTriggered(true);
    }
    window.addEventListener("portfolio:section-signal", onSectionSignal as EventListener);
    return () => window.removeEventListener("portfolio:section-signal", onSectionSignal as EventListener);
  }, []);

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-8 sm:px-8 lg:px-10">
      <SectionTitle
        eyebrow="Stack"
        title="Base técnica completa"
        description="Uma organização clara das tecnologias que sustentam meus projetos atuais e a direção que quero fortalecer no meu portfólio."
      />

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-2">
        {techGroups.map((group, i) => (
          <div
            key={group.title}
            className="rounded-[24px] p-5 backdrop-blur transition-all duration-300 hover:scale-[1.01]"
            style={{
              border: "1px solid var(--border)",
              background:
                "linear-gradient(160deg, var(--accent-bg) 0%, var(--background-elevated) 60%, var(--background-surface) 100%)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base font-semibold" style={{ color: "var(--foreground)" }}>
                {group.title}
              </h3>
              <span
                className="rounded-full px-2.5 py-0.5 text-xs font-medium shrink-0"
                style={{
                  border: "1px solid var(--border-accent)",
                  background: "var(--accent-bg)",
                  color: "var(--accent-soft)",
                }}
              >
                {group.focus}
              </span>
            </div>

            <p className="mt-3 text-xs leading-5" style={{ color: "var(--foreground-muted)" }}>
              {group.summary}
            </p>

            <ProficiencyBar value={group.proficiency} delay={i * 150} triggered={triggered} />

            <div className="mt-3 h-px w-full" style={{ background: "var(--border)" }} />

            <div className="mt-4 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full px-2.5 py-0.5 text-xs font-mono"
                  style={{
                    border: "1px solid var(--border-accent)",
                    background: "var(--accent-bg)",
                    color: "var(--accent-soft)",
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
