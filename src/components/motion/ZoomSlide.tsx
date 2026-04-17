"use client";

import { useEffect, useRef } from "react";

interface ZoomSlideProps {
  children: React.ReactNode;
  isFirst?: boolean;
  id?: string;
}

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

function ease(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function ZoomSlide({ children, id }: ZoomSlideProps) {
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
      const progress = clamp((window.scrollY - startY) / scrollable, 0, 1);

      let scale: number;
      let opacity: number;

      if (progress < 0.5) {
        scale = 1;
        opacity = 1;
      } else {
        const t = ease((progress - 0.5) / 0.5);
        scale = 1 + 0.18 * t;
        opacity = 1 - t;
      }

      content!.style.transform = `translateZ(0) scale(${scale})`;
      content!.style.opacity = `${opacity}`;
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

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={containerRef} id={id} className="relative h-[160vh]">
      <div className="sticky top-0 z-10 min-h-screen overflow-visible bg-[var(--background)]">
        <div
          ref={contentRef}
          className="min-h-screen flex flex-col justify-center overflow-visible will-change-transform"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
