import { Navbar } from "@/components/layout/Navbar";
import { SectionFlowTracker } from "@/components/motion/SectionFlowTracker";
import { ZoomSlide } from "@/components/motion/ZoomSlide";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { StackSection } from "@/components/sections/StackSection";

export default function Page() {
  return (
    <main className="bg-transparent selection:bg-indigo-500/35" style={{ color: "var(--foreground)" }}>
      <SectionFlowTracker />
      <Navbar />

      <section id="hero" data-flow-key="hero" data-flow-section>
        <ZoomSlide id="hero-slide" isFirst>
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

      <section id="contato" data-flow-key="contato" data-flow-section>
        <ZoomSlide id="contato-slide">
          <ContactSection />
        </ZoomSlide>
      </section>
    </main>
  );
}
