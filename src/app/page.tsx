import dynamic from "next/dynamic";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";

/**
 * Below-the-fold sections are code-split so the initial bundle only
 * carries what is needed to paint the hero.
 */
const Experience = dynamic(() =>
  import("@/components/sections/experience").then((m) => m.Experience),
);
const Certifications = dynamic(() =>
  import("@/components/sections/certifications").then((m) => m.Certifications),
);
const Achievements = dynamic(() =>
  import("@/components/sections/achievements").then((m) => m.Achievements),
);
const Testimonials = dynamic(() =>
  import("@/components/sections/testimonials").then((m) => m.Testimonials),
);
const Services = dynamic(() =>
  import("@/components/sections/services").then((m) => m.Services),
);
const TechStack = dynamic(() =>
  import("@/components/sections/tech-stack").then((m) => m.TechStack),
);
const GitHubStats = dynamic(() =>
  import("@/components/sections/github-stats").then((m) => m.GitHubStats),
);
const Contact = dynamic(() =>
  import("@/components/sections/contact").then((m) => m.Contact),
);

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Achievements />
        <Testimonials />
        <Services />
        <TechStack />
        <GitHubStats />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
