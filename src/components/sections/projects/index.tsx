"use client";

import * as React from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

import { siteConfig } from "@/constants/site";
import { PROJECTS } from "@/data/projects";
import { scrollToSection, useLenis } from "@/hooks/use-lenis";
import type { Project } from "@/types";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

import { ProjectCard } from "./project-card";
import { ProjectModal } from "./project-modal";

export function Projects() {
  const [selected, setSelected] = React.useState<Project | null>(null);
  const lenis = useLenis();

  // Freeze background scrolling while the modal is open.
  React.useEffect(() => {
    if (selected) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected, lenis]);

  // Close on Escape.
  React.useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Featured Work"
        title="Projects built to"
        highlight="ship and scale"
        description="Production platforms and deep technical builds — each one shipped end to end, from schema design to deployment."
      />

      <div className="mt-16 space-y-8 lg:space-y-10">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onOpen={setSelected}
          />
        ))}
      </div>

      {/* CTA */}
      <Reveal delay={0.1} className="mt-14">
        <div className="glass relative overflow-hidden rounded-3xl p-8 text-center sm:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 size-72 -translate-x-1/2 rounded-full blur-[100px]"
            style={{
              background:
                "radial-gradient(circle, rgba(124,58,237,0.35), transparent 65%)",
            }}
          />

          <div className="relative">
            <span className="from-primary/25 to-secondary/25 mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br ring-1 ring-white/10">
              <Sparkles className="text-secondary-soft size-5" />
            </span>

            <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
              More on the way
            </h3>
            <p className="text-muted mx-auto mt-3 max-w-lg text-sm leading-relaxed sm:text-base">
              I&apos;m always building. Explore the full archive on GitHub, or
              bring me a problem worth solving and let&apos;s make the next one
              together.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Magnetic strength={0.25}>
                <Button variant="primary" size="lg" asChild>
                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    data-cursor-label="GitHub"
                  >
                    <FaGithub />
                    View All Repositories
                    <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </Button>
              </Magnetic>

              <Magnetic strength={0.25}>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => scrollToSection(lenis, "#contact")}
                >
                  Start a Project
                </Button>
              </Magnetic>
            </div>
          </div>
        </div>
      </Reveal>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </Section>
  );
}
