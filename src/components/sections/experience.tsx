"use client";

import * as React from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { Building2, Calendar, MapPin } from "lucide-react";

import { EXPERIENCE } from "@/data/experience";
import { cn } from "@/lib/utils";
import { premiumEase, viewportOnce } from "@/utils/motion";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";

export function Experience() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Progress line that fills as the timeline scrolls past.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 55%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });
  const glowOpacity = useTransform(scrollYProgress, [0, 0.1, 1], [0, 1, 1]);

  return (
    <Section id="experience">
      <SectionHeading
        eyebrow="Experience"
        title="A track record of"
        highlight="shipping real work"
        description="Roles, engagements and contributions that shaped how I build software today."
      />

      <div ref={containerRef} className="relative mt-16">
        {/* Rail */}
        <div
          aria-hidden
          className="absolute top-0 bottom-0 left-[23px] w-px bg-white/8 md:left-1/2 md:-translate-x-1/2"
        />
        <motion.div
          aria-hidden
          style={{ scaleY, opacity: glowOpacity }}
          className="from-primary via-secondary to-accent absolute top-0 bottom-0 left-[23px] w-px origin-top bg-gradient-to-b shadow-[0_0_14px_rgba(124,58,237,0.7)] md:left-1/2 md:-translate-x-1/2"
        />

        <ol className="space-y-10 md:space-y-14">
          {EXPERIENCE.map((item, index) => {
            const Icon = item.icon;
            const isRight = index % 2 === 1;

            return (
              <li
                key={item.id}
                className={cn(
                  "relative pl-16 md:grid md:grid-cols-2 md:gap-12 md:pl-0",
                )}
              >
                {/* Node */}
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.5, ease: premiumEase }}
                  className="absolute top-2 left-0 z-10 flex size-12 items-center justify-center rounded-2xl border border-white/12 bg-[#080d1f] md:left-1/2 md:-translate-x-1/2"
                >
                  {item.current && (
                    <span className="bg-accent/20 absolute inset-0 animate-ping rounded-2xl" />
                  )}
                  <Icon className="text-secondary relative size-5" />
                </motion.span>

                {/* Card */}
                <motion.div
                  initial={{ opacity: 0, x: isRight ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.75, ease: premiumEase }}
                  className={cn(
                    isRight
                      ? "md:col-start-2 md:pl-4"
                      : "md:col-start-1 md:pr-4",
                  )}
                >
                  <SpotlightCard className="p-6 sm:p-7">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-lg font-semibold text-white sm:text-xl">
                          {item.title}
                        </h3>
                        <p className="text-secondary-soft mt-1 flex items-center gap-1.5 text-sm">
                          <Building2 className="size-3.5" />
                          {item.organisation}
                        </p>
                      </div>
                      {item.current && (
                        <Badge variant="accent" size="sm">
                          <span className="bg-accent size-1.5 rounded-full" />
                          Current
                        </Badge>
                      )}
                    </div>

                    <div className="text-subtle mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="size-3.5" />
                        {item.period}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="size-3.5" />
                        {item.location}
                      </span>
                    </div>

                    <p className="text-muted mt-4 text-sm leading-relaxed">
                      {item.description}
                    </p>

                    <ul className="mt-4 space-y-2">
                      {item.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="text-muted flex items-start gap-2.5 text-sm"
                        >
                          <span className="from-primary to-secondary mt-[7px] size-1 shrink-0 rounded-full bg-gradient-to-r" />
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <Badge key={tag} size="sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </SpotlightCard>
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
