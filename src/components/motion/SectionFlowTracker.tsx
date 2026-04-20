"use client";

import { useEffect } from "react";

type ScrollDirection = "down" | "up";

type SectionSignalDetail = {
  activeSection: string;
  nextSection: string | null;
  direction: ScrollDirection;
  progress: number;
};

const SECTION_SELECTOR = "[data-flow-section]";
// Progresso mínimo dentro da seção para considerar snap para a próxima
const SNAP_THRESHOLD = 0.52;
// Tempo sem scroll antes de acionar snap (ms)
const SNAP_IDLE_MS = 600;

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function getSectionKey(el: Element, index: number) {
  const key = el.getAttribute("data-flow-key");
  return key && key.trim().length > 0 ? key : `section-${index}`;
}

function isModalOpen() {
  return document.querySelector("[data-modal-open]") !== null;
}

export function SectionFlowTracker() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>(SECTION_SELECTOR));
    if (sections.length === 0) return;

    let lastScrollY = window.scrollY;
    let rafId = 0;
    let snapTimer = 0;
    let isSnapping = false;

    function emitSectionSignal(detail: SectionSignalDetail) {
      window.dispatchEvent(new CustomEvent<SectionSignalDetail>("portfolio:section-signal", { detail }));
    }

    function getActiveIndex(): { activeIndex: number; progress: number; direction: ScrollDirection } {
      const centerY = window.scrollY + window.innerHeight * 0.5;
      const direction: ScrollDirection = window.scrollY >= lastScrollY ? "down" : "up";

      let activeIndex = 0;
      for (let i = 0; i < sections.length; i += 1) {
        const section = sections[i];
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        if (centerY >= top && centerY < bottom) {
          activeIndex = i;
          break;
        }
      }

      const activeSection = sections[activeIndex];
      const activeTop = activeSection.offsetTop;
      const activeHeight = Math.max(activeSection.offsetHeight, 1);
      const progress = clamp((centerY - activeTop) / activeHeight, 0, 1);

      return { activeIndex, progress, direction };
    }

    function snapToSection(index: number) {
      const target = sections[index];
      if (!target) return;
      isSnapping = true;
      window.scrollTo({ top: target.offsetTop, behavior: "smooth" });
      // Libera flag após a animação terminar
      setTimeout(() => { isSnapping = false; }, 700);
    }

    function scheduleSnap(activeIndex: number, progress: number, direction: ScrollDirection, activeKey: string) {
      clearTimeout(snapTimer);
      if (isModalOpen()) return;
      // Hero tem transição interna própria — não snapa dentro dele
      if (activeKey === "hero") return;

      snapTimer = window.setTimeout(() => {
        if (isSnapping || isModalOpen()) return;

        // Se passou mais de metade da seção atual, snap para a próxima
        if (direction === "down" && progress >= SNAP_THRESHOLD && activeIndex + 1 < sections.length) {
          snapToSection(activeIndex + 1);
        } else if (direction === "up" && progress < (1 - SNAP_THRESHOLD) && activeIndex > 0) {
          // Não snap para trás neste caso — evita loop
        } else {
          // Snap de volta para o topo da seção atual
          snapToSection(activeIndex);
        }
      }, SNAP_IDLE_MS);
    }

    function updateFlowState() {
      const { activeIndex, progress, direction } = getActiveIndex();
      lastScrollY = window.scrollY;

      const nextIndex = direction === "down" && progress > 0.68 ? activeIndex + 1 : -1;
      const nextSection = nextIndex >= 0 && nextIndex < sections.length ? sections[nextIndex] : null;
      const activeSection = sections[activeIndex];

      sections.forEach((section, index) => {
        const state =
          index === activeIndex
            ? "active"
            : index === nextIndex
              ? "next"
              : index < activeIndex
                ? "past"
                : "upcoming";
        section.dataset.flowState = state;
      });

      emitSectionSignal({
        activeSection: getSectionKey(activeSection, activeIndex),
        nextSection: nextSection ? getSectionKey(nextSection, nextIndex) : null,
        direction,
        progress,
      });

      if (!isSnapping) {
        scheduleSnap(activeIndex, progress, direction, getSectionKey(activeSection, activeIndex));
      }
    }

    function onScroll() {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateFlowState);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    updateFlowState();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
      clearTimeout(snapTimer);
    };
  }, []);

  return null;
}
