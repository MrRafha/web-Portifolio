"use client";

import React, { useEffect, useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { StackSection } from "@/components/sections/StackSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Page() {
  const bgRef      = useRef<HTMLDivElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const stillRef   = useRef<HTMLElement>(null);
  const tintRef    = useRef<HTMLDivElement>(null);
  const navRef     = useRef<HTMLElement>(null);

  // memoized last values — evita escritas desnecessárias no DOM
  const last = useRef({ cross: -1, tint: -1, scale: -1, blur: -1, sat: -1 });
  const videoPaused = useRef(false);
  const ticking = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Troca de src por JS — atributo media= em <source> não funciona no Firefox/Safari
    const isMobile = window.innerWidth <= 767;
    video.src = isMobile ? "/mobile-swing.mp4" : "/hero-swing.mp4";
    video.load();
    video.play().catch(() => {});

    function computeFrame() {
      const y  = window.scrollY;
      const vh = window.innerHeight;
      const bg    = bgRef.current;
      const still = stillRef.current;
      const vid   = videoRef.current;
      const tint  = tintRef.current;
      const nav   = navRef.current;
      if (!bg || !still || !vid || !tint) return;

      // --- crossfade vídeo → imagem (0–35 % do vh) ---
      const tCross     = Math.min(1, Math.max(0, y / (vh * 0.35)));
      const easedCross = 1 - Math.pow(1 - tCross, 2);

      if (Math.abs(easedCross - last.current.cross) > 0.002) {
        still.style.opacity = easedCross.toFixed(3);
        vid.style.opacity   = (1 - easedCross).toFixed(3);
        last.current.cross  = easedCross;
      }

      if (easedCross >= 0.999 && !videoPaused.current) {
        vid.pause();
        videoPaused.current = true;
      } else if (easedCross < 0.999 && videoPaused.current) {
        vid.play().catch(() => {});
        videoPaused.current = false;
      }

      // --- tint escuro (opacity em div preto — sem repaint de gradient) ---
      const tTint    = Math.min(1, Math.max(0, y / (vh * 0.9)));
      const easedTint = 1 - Math.pow(1 - tTint, 2);
      const tintVal  = easedTint * 0.72;

      if (Math.abs(tintVal - last.current.tint) > 0.004) {
        tint.style.opacity  = tintVal.toFixed(3);
        last.current.tint   = tintVal;
      }

      // --- transform + saturate no bg (sem filter: blur — evita software rendering) ---
      const scale = 1 + 0.04 * (1 - easedTint);
      const sat   = 1 - easedTint * 0.25;

      if (Math.abs(scale - last.current.scale) > 0.0002 || Math.abs(sat - last.current.sat) > 0.002) {
        bg.style.transform = `scale(${scale.toFixed(4)})`;
        bg.style.filter    = `saturate(${sat.toFixed(3)})`;
        last.current.scale = scale;
        last.current.sat   = sat;
      }

      if (nav) nav.classList.toggle("scrolled", y > 24);
    }

    function onScroll() {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          computeFrame();
          ticking.current = false;
        });
        ticking.current = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    computeFrame();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* Fixed background stage */}
      <div
        ref={bgRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          overflow: "hidden",
          background: "var(--bg-deep)",
          willChange: "transform",          // só transform — filter no will-change bloqueia aceleração dos filhos
        }}
      >
        {/* Vídeo: sem imageRendering pixelated — força software rendering em tela cheia */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hero-pixel.webp"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 1,
            opacity: 1,
            transition: "opacity 220ms linear",
          }}
        />

        {/* Imagem estática (crossfade destino) */}
        <picture
          ref={stillRef as React.RefObject<HTMLElement>}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            display: "block",
            opacity: 0,
            transition: "opacity 220ms linear",
          }}
        >
          {/* WebP para browsers modernos — 160 KB vs 2.1 MB do PNG */}
          <source srcSet="/mobile.webp"     type="image/webp" media="(max-width: 767px)" />
          <source srcSet="/hero-pixel.webp" type="image/webp" media="(min-width: 768px)" />
          {/* fallback PNG para browsers sem suporte a WebP */}
          <source srcSet="/mobile.png"      media="(max-width: 767px)" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero-pixel.png"
            alt=""
            aria-hidden="true"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              imageRendering: "pixelated",
            }}
          />
        </picture>

        {/* Tint: div preto com opacity — compositor layer, zero repaint (vs gradient animado) */}
        <div
          ref={tintRef}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 3,
            background: "black",
            opacity: 0,
            pointerEvents: "none",
            willChange: "opacity",
          }}
        />

        {/* Radial vignette estático — não anima, não repinta */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 4,
            pointerEvents: "none",
            background: "radial-gradient(120% 80% at 50% 0%, transparent 40%, rgba(0,0,0,0.45) 100%)",
          }}
        />
      </div>

      <Navbar navRef={navRef} />

      <main id="main-content" style={{ position: "relative", zIndex: 1 }}>
        <HeroSection />
        <AboutSection />
        <StackSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </>
  );
}
