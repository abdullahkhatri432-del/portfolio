"use client";

import { TECH_MARQUEE } from "@/data/skills";
import { useGsapParallax } from "@/hooks/use-gsap-parallax";
import { Marquee } from "@/components/ui/marquee";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

/** Single logo pill used inside the marquee rows. */
function TechPill({
  name,
  icon: Icon,
  color,
}: {
  name: string;
  icon: React.ComponentType<{
    className?: string;
    style?: React.CSSProperties;
  }>;
  color: string;
}) {
  return (
    <div
      className="group/pill flex shrink-0 items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-3.5 backdrop-blur-sm transition-all duration-400 hover:border-white/20 hover:bg-white/[0.07]"
      style={{ ["--tech" as string]: color }}
    >
      <span className="relative flex size-8 items-center justify-center">
        <span
          aria-hidden
          className="absolute inset-0 rounded-full opacity-0 blur-lg transition-opacity duration-400 group-hover/pill:opacity-70"
          style={{ background: color }}
        />
        <Icon
          className="relative size-6 grayscale transition-all duration-400 group-hover/pill:scale-110 group-hover/pill:grayscale-0"
          style={{ color }}
        />
      </span>
      <span className="text-muted text-sm font-medium whitespace-nowrap transition-colors duration-300 group-hover/pill:text-white">
        {name}
      </span>
    </div>
  );
}

export function TechStack() {
  const half = Math.ceil(TECH_MARQUEE.length / 2);
  const rowOne = TECH_MARQUEE.slice(0, half);
  const rowTwo = TECH_MARQUEE.slice(half);

  // GSAP ScrollTrigger parallax on the marquee block.
  const parallaxRef = useGsapParallax<HTMLDivElement>({ distance: 60 });

  return (
    <Section id="stack" container={false}>
      <div className="container-page">
        <SectionHeading
          eyebrow="Tech Stack"
          title="Tools I reach for"
          highlight="every day"
          description="A stack chosen for speed of delivery, type safety and long-term maintainability."
        />
      </div>

      <div ref={parallaxRef} className="relative mt-14 space-y-5">
        {/* Edge glows */}
        <div
          aria-hidden
          className="from-background pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r to-transparent sm:w-40"
        />
        <div
          aria-hidden
          className="from-background pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l to-transparent sm:w-40"
        />

        <Marquee speed={46} gap="1.25rem">
          {rowOne.map((tech) => (
            <TechPill
              key={tech.name}
              name={tech.name}
              icon={tech.icon}
              color={tech.color}
            />
          ))}
        </Marquee>

        <Marquee speed={54} gap="1.25rem" reverse>
          {rowTwo.map((tech) => (
            <TechPill
              key={tech.name}
              name={tech.name}
              icon={tech.icon}
              color={tech.color}
            />
          ))}
        </Marquee>
      </div>
    </Section>
  );
}
