import { Navbar } from "@/components/layout/Navbar";
import { SectionFlowTracker } from "@/components/motion/SectionFlowTracker";
import { SectionDots } from "@/components/motion/SectionDots";
import { ZoomSlide } from "@/components/motion/ZoomSlide";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { CTASection } from "@/components/sections/CTASection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { StackSection } from "@/components/sections/StackSection";

export default function Page() {
  return (
    <main id="main-content" className="bg-transparent selection:bg-indigo-500/35" style={{ color: "var(--foreground)" }}>
      <SectionFlowTracker />
      <SectionDots />
      <Navbar />

      <section id="hero" data-flow-key="hero" data-flow-section>
        <ZoomSlide id="hero-slide" isFirst noExitAnimation>
          <HeroSection />
        </ZoomSlide>
      </section>

      <section id="sobre" data-flow-key="sobre" data-flow-section>
        <ZoomSlide id="sobre-slide">
          <AboutSection />
        </ZoomSlide>
      </section>

      <section id="projetos" data-flow-key="projetos" data-flow-section>
        <ZoomSlide id="projetos-slide">
          <ProjectsSection />
        </ZoomSlide>
      </section>

      <section id="stack" data-flow-key="stack" data-flow-section>
        <ZoomSlide id="stack-slide">
          <StackSection />
        </ZoomSlide>
      </section>

      <section id="cta" data-flow-key="cta" data-flow-section>
        <ZoomSlide id="cta-slide">
          <CTASection />
        </ZoomSlide>
      </section>

      <section id="contato" data-flow-key="contato" data-flow-section>
        <ZoomSlide id="contato-slide" isLast>
          <ContactSection />
        </ZoomSlide>
      </section>
    </main>
  );
}
