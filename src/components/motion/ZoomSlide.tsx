"use client";

import { useEffect, useRef } from "react";

interface ZoomSlideProps {
  children: React.ReactNode;
  isFirst?: boolean;
  isLast?: boolean;
  noExitAnimation?: boolean;
  id?: string;
}

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

function ease(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

// Escuta se há modal aberto para suprimir o efeito de zoom/scroll
function isModalOpen() {
  return document.querySelector("[data-modal-open]") !== null;
}

export function ZoomSlide({ children, id, isLast = false, noExitAnimation = false }: ZoomSlideProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    content.style.transform = "scale(1)";
    content.style.opacity = "1";

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let rafId = 0;
    let startY = 0;
    let scrollable = 1;

    function recalcBounds() {
      const rect = container!.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      startY = rect.top + scrollTop;
      scrollable = Math.max(container!.offsetHeight - window.innerHeight, 1);
    }

    function update() {
      if (isModalOpen() || noExitAnimation) return;

      const progress = clamp((window.scrollY - startY) / scrollable, 0, 1);

      if (progress < 0.5) {
        const subtleT = progress / 0.5;
        content!.style.transform = `translateZ(0) translateY(-${(subtleT * 8).toFixed(2)}px) scale(1)`;
        content!.style.opacity = "1";
      } else {
        const t = ease((progress - 0.5) / 0.5);
        const scale = 1 + 0.06 * t;
        const opacity = 1 - t;
        content!.style.transform = `translateZ(0) scale(${scale})`;
        content!.style.opacity = `${opacity}`;
      }
    }

    function onScroll() {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    }

    function onResize() {
      recalcBounds();
      onScroll();
    }

    recalcBounds();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    update();

    const observer = new IntersectionObserver(
      ([entry]) => { content.style.willChange = entry.isIntersecting ? "transform, opacity" : "auto"; },
      { rootMargin: "200px" }
    );
    observer.observe(container);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    // Última seção usa h-auto em vez de h-[160vh] para não deixar espaço vazio
    <div ref={containerRef} id={id} className={isLast ? "relative" : "relative h-[160vh]"}>
      <div className={`z-10 overflow-visible bg-[var(--background)] ${isLast ? "" : "sticky top-0 min-h-screen"}`}>
        <div
          ref={contentRef}
          className="min-h-screen flex flex-col justify-center overflow-visible"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
