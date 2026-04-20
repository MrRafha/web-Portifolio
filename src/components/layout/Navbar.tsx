"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { profile } from "@/data/portfolio";
import type { Theme } from "@/components/providers/ThemeProvider";

const navItems = [
  { label: "Sobre", href: "#sobre" },
  { label: "Projetos", href: "#projetos" },
  { label: "Stack", href: "#stack" },
  { label: "Contato", href: "#contato" },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const options: { value: Theme; label: string; icon: React.ReactNode }[] = [
    {
      value: "light",
      label: "Tema claro",
      icon: (
        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="5" strokeWidth={2} />
          <path strokeWidth={2} strokeLinecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      ),
    },
    {
      value: "system",
      label: "Tema do sistema",
      icon: (
        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="2" y="3" width="20" height="14" rx="2" strokeWidth={2} />
          <path strokeWidth={2} strokeLinecap="round" d="M8 21h8M12 17v4" />
        </svg>
      ),
    },
    {
      value: "dark",
      label: "Tema escuro",
      icon: (
        <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      ),
    },
  ];

  return (
    <div
      role="group"
      aria-label="Seleção de tema"
      className="flex items-center gap-0.5 rounded-full p-1"
      style={{
        border: "1px solid var(--border-strong)",
        background: "var(--background-elevated)",
      }}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => setTheme(opt.value)}
          aria-pressed={theme === opt.value}
          aria-label={opt.label}
          className="rounded-full p-1.5 transition-all duration-300"
          style={{
            background: theme === opt.value ? "var(--accent)" : "transparent",
            color: theme === opt.value ? "var(--foreground-on-accent)" : "var(--foreground-subtle)",
          }}
        >
          {opt.icon}
        </button>
      ))}
    </div>
  );
}

export function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const headerRef = useRef<HTMLElement>(null);

  // Rastreia seção ativa via evento do SectionFlowTracker
  useEffect(() => {
    function onSectionSignal(e: Event) {
      const detail = (e as CustomEvent).detail;
      if (detail?.activeSection) setActiveSection(detail.activeSection);
    }
    window.addEventListener("portfolio:section-signal", onSectionSignal as EventListener);
    return () => window.removeEventListener("portfolio:section-signal", onSectionSignal as EventListener);
  }, []);

  // Barra de progresso de scroll
  useEffect(() => {
    function onScroll() {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      setScrollProgress(window.scrollY / total);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const href = e.currentTarget.getAttribute("href");
    if (href?.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileOpen(false);
  }

  // Fecha ao pressionar Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  function getSectionFromHref(href: string) {
    return href.replace("#", "");
  }

  return (
    <>
      <header
        ref={headerRef}
        className="sticky top-0 z-50 backdrop-blur-xl"
        style={{
          borderBottom: "1px solid var(--border)",
          background: "var(--navbar-bg)",
        }}
      >
        {/* Barra de progresso de scroll */}
        <div
          className="absolute bottom-0 left-0 h-[2px] w-full origin-left transition-transform duration-75"
          style={{
            background: "linear-gradient(90deg, var(--accent), var(--accent-soft))",
            transform: `scaleX(${scrollProgress})`,
          }}
        />

        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
          {/* Logo */}
          <a href="/" aria-label={`${profile.name} — Início`}>
            <p
              className="text-xs uppercase tracking-[0.28em]"
              style={{ color: "var(--accent-soft)" }}
            >
              Portfólio
            </p>
            <p className="mt-1 text-base font-semibold" style={{ color: "var(--foreground)" }}>
              {profile.name}
            </p>
          </a>

          {/* Nav desktop */}
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => {
              const sectionKey = getSectionFromHref(item.href);
              const isActive = activeSection === sectionKey;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  className="relative text-sm transition-colors duration-200 pb-0.5"
                  style={{
                    color: isActive ? "var(--foreground)" : "var(--foreground-muted)",
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                      style={{ background: "var(--accent)" }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* ThemeToggle + hamburguer mobile */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Botão hamburguer — só visível abaixo de md */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="flex flex-col items-center justify-center gap-1.5 rounded-lg p-2 transition-colors md:hidden"
              style={{
                border: "1px solid var(--border-strong)",
                background: "var(--background-elevated)",
                color: "var(--foreground)",
              }}
            >
              <span
                className="block h-0.5 w-5 rounded-full transition-all duration-300"
                style={{
                  background: "var(--foreground)",
                  transform: mobileOpen ? "translateY(8px) rotate(45deg)" : "none",
                }}
              />
              <span
                className="block h-0.5 w-5 rounded-full transition-all duration-300"
                style={{
                  background: "var(--foreground)",
                  opacity: mobileOpen ? 0 : 1,
                }}
              />
              <span
                className="block h-0.5 w-5 rounded-full transition-all duration-300"
                style={{
                  background: "var(--foreground)",
                  transform: mobileOpen ? "translateY(-8px) rotate(-45deg)" : "none",
                }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile — drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.5)" }} />
          <nav
            id="mobile-menu"
            className="absolute top-[73px] left-0 right-0 p-4"
            style={{
              background: "var(--background-elevated)",
              borderBottom: "1px solid var(--border)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {navItems.map((item) => {
              const sectionKey = getSectionFromHref(item.href);
              const isActive = activeSection === sectionKey;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-sm transition-colors duration-200"
                  style={{
                    color: isActive ? "var(--accent)" : "var(--foreground-muted)",
                    background: isActive ? "var(--accent-bg)" : "transparent",
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: "var(--accent)" }}
                    />
                  )}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
