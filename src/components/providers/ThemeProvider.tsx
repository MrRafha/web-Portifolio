"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark" | "system";

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("dark");

  // Lê preferência salva na montagem
  useEffect(() => {
    const stored = localStorage.getItem("portfolio-theme") as Theme | null;
    if (stored && ["light", "dark", "system"].includes(stored)) {
      setThemeState(stored);
    }
  }, []);

  // Aplica o tema no <html> e escuta mudanças de sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const systemTheme: "light" | "dark" = mediaQuery.matches ? "dark" : "light";
    const effective: "light" | "dark" = theme === "system" ? systemTheme : theme;

    setResolvedTheme(effective);
    applyTheme(effective);

    function onSystemChange(e: MediaQueryListEvent) {
      if (theme === "system") {
        const next: "light" | "dark" = e.matches ? "dark" : "light";
        setResolvedTheme(next);
        applyTheme(next);
      }
    }

    mediaQuery.addEventListener("change", onSystemChange);
    return () => mediaQuery.removeEventListener("change", onSystemChange);
  }, [theme]);

  function applyTheme(effective: "light" | "dark") {
    const html = document.documentElement;
    html.classList.add("theme-transitioning");
    html.setAttribute("data-theme", effective);
    setTimeout(() => html.classList.remove("theme-transitioning"), 400);
  }

  function setTheme(next: Theme) {
    setThemeState(next);
    if (next === "system") {
      localStorage.removeItem("portfolio-theme");
    } else {
      localStorage.setItem("portfolio-theme", next);
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
