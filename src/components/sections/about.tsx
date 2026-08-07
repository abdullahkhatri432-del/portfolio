"use client";

import { motion } from "motion/react";
import { GraduationCap, MapPin, Sparkles, Target } from "lucide-react";

import { siteConfig } from "@/constants/site";
import {
  ABOUT_STATS,
  BIO_PARAGRAPHS,
  EDUCATION,
  FUN_FACTS,
  GOALS,
  HIGHLIGHTS,
  JOURNEY,
} from "@/data/about";
import { premiumEase, viewportOnce } from "@/utils/motion";
import { Badge } from "@/components/ui/badge";
import { Counter } from "@/components/ui/counter";
import { Reveal, RevealItem, StaggerGroup } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";

export function About() {
  return (
    <Section id="about">
      <SectionHeading
        eyebrow="About Me"
        title="Engineering with"
        highlight="intent and craft"
        description="A closer look at how I work, what I've learned, and where I'm heading next."
      />

      {/* ------------------------------------------------------------- */}
      {/* Bio + stats                                                   */}
      {/* ------------------------------------------------------------- */}
      <div className="mt-16 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Reveal direction="right">
          <SpotlightCard className="h-full p-8 sm:p-10">
            <div className="mb-6 flex flex-wrap items-center gap-2.5">
              <Badge variant="primary" size="sm">
                <Sparkles className="size-3" />
                Full Stack Developer
              </Badge>
              <Badge variant="secondary" size="sm">
                <MapPin className="size-3" />
                {siteConfig.location}
              </Badge>
              <Badge variant="accent" size="sm">
                Open to work
              </Badge>
            </div>

            <div className="space-y-5">
              {BIO_PARAGRAPHS.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.12,
                    ease: premiumEase,
                  }}
                  className="text-muted text-[15px] leading-relaxed sm:text-base"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Signature */}
            <div className="mt-8 flex items-center gap-4 border-t border-white/8 pt-6">
              <span className="from-primary to-secondary font-display flex size-11 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold text-white">
                {siteConfig.initials}
              </span>
              <div>
                <p className="font-display text-sm font-semibold text-white">
                  {siteConfig.name}
                </p>
                <p className="text-subtle text-xs">
                  {siteConfig.role} · {siteConfig.timezone}
                </p>
              </div>
            </div>
          </SpotlightCard>
        </Reveal>

        {/* Animated statistics */}
        <StaggerGroup className="grid grid-cols-2 gap-4">
          {ABOUT_STATS.map((stat) => (
            <RevealItem key={stat.label}>
              <SpotlightCard
                glow="rgba(6,182,212,0.22)"
                className="flex h-full flex-col justify-center p-6 text-center"
              >
                <span className="font-display text-gradient-brand text-3xl font-bold sm:text-4xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-muted mt-2 text-xs leading-snug">
                  {stat.label}
                </span>
              </SpotlightCard>
            </RevealItem>
          ))}
        </StaggerGroup>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Journey timeline                                              */}
      {/* ------------------------------------------------------------- */}
      <div className="mt-24">
        <Reveal>
          <h3 className="font-display mb-10 text-2xl font-bold text-white sm:text-3xl">
            The Journey
          </h3>
        </Reveal>

        <div className="relative">
          {/* Rail */}
          <div
            aria-hidden
            className="from-primary/60 via-secondary/40 absolute top-0 bottom-0 left-[19px] w-px bg-gradient-to-b to-transparent sm:left-[23px]"
          />

          <ol className="space-y-8">
            {JOURNEY.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -28 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewportOnce}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.1,
                    ease: premiumEase,
                  }}
                  className="relative pl-14 sm:pl-[70px]"
                >
                  {/* Node */}
                  <span className="absolute top-1 left-0 flex size-10 items-center justify-center rounded-xl border border-white/12 bg-[#0a0f24] sm:size-12">
                    {item.current && (
                      <span className="bg-accent/20 absolute inset-0 animate-ping rounded-xl" />
                    )}
                    <Icon className="text-secondary relative size-4 sm:size-5" />
                  </span>

                  <SpotlightCard className="p-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <h4 className="font-display text-lg font-semibold text-white">
                        {item.title}
                      </h4>
                      {item.current && (
                        <Badge variant="accent" size="sm">
                          <span className="bg-accent size-1.5 rounded-full" />
                          Current
                        </Badge>
                      )}
                    </div>

                    <p className="text-secondary-soft mt-1 text-sm">
                      {item.organisation} · {item.period}
                    </p>

                    <p className="text-muted mt-3 text-sm leading-relaxed">
                      {item.description}
                    </p>

                    <ul className="mt-4 space-y-1.5">
                      {item.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="text-muted flex items-start gap-2.5 text-sm"
                        >
                          <span className="bg-primary mt-[7px] size-1 shrink-0 rounded-full" />
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <Badge key={tag} size="sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </SpotlightCard>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Highlights                                                    */}
      {/* ------------------------------------------------------------- */}
      <div className="mt-24">
        <Reveal>
          <h3 className="font-display mb-10 text-2xl font-bold text-white sm:text-3xl">
            Highlights
          </h3>
        </Reveal>

        <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map((highlight) => {
            const Icon = highlight.icon;
            return (
              <RevealItem key={highlight.title}>
                <SpotlightCard className="h-full p-6">
                  <span className="from-primary/20 to-secondary/20 mb-4 flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br ring-1 ring-white/10">
                    <Icon className="text-secondary-soft size-5" />
                  </span>
                  <h4 className="font-display text-base font-semibold text-white">
                    {highlight.title}
                  </h4>
                  <p className="text-muted mt-2 text-sm leading-relaxed">
                    {highlight.description}
                  </p>
                </SpotlightCard>
              </RevealItem>
            );
          })}
        </StaggerGroup>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Education + Goals                                             */}
      {/* ------------------------------------------------------------- */}
      <div className="mt-24 grid gap-6 lg:grid-cols-2">
        {/* Education */}
        <Reveal direction="right">
          <SpotlightCard className="h-full p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="bg-primary/15 ring-primary/25 flex size-10 items-center justify-center rounded-2xl ring-1">
                <GraduationCap className="text-primary-soft size-5" />
              </span>
              <h3 className="font-display text-xl font-bold text-white">
                Education
              </h3>
            </div>

            <div className="space-y-6">
              {EDUCATION.map((edu) => (
                <div
                  key={edu.id}
                  className="hover:border-primary/50 border-l-2 border-white/10 pl-5 transition-colors"
                >
                  <p className="font-display text-base font-semibold text-white">
                    {edu.degree}
                  </p>
                  <p className="text-secondary-soft mt-0.5 text-sm">
                    {edu.institution}
                  </p>
                  <p className="text-subtle mt-1 text-xs">
                    {edu.period} · {edu.score}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {edu.focus.map((topic) => (
                      <Badge key={topic} size="sm">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SpotlightCard>
        </Reveal>

        {/* Goals */}
        <Reveal direction="left">
          <SpotlightCard glow="rgba(34,197,94,0.2)" className="h-full p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="bg-accent/15 ring-accent/25 flex size-10 items-center justify-center rounded-2xl ring-1">
                <Target className="text-accent-soft size-5" />
              </span>
              <h3 className="font-display text-xl font-bold text-white">
                Goals Ahead
              </h3>
            </div>

            <ul className="space-y-5">
              {GOALS.map((goal, index) => (
                <li key={goal.title} className="flex gap-4">
                  <span className="text-subtle font-mono text-xs">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-display text-sm font-semibold text-white">
                      {goal.title}
                    </p>
                    <p className="text-muted mt-1 text-sm leading-relaxed">
                      {goal.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </SpotlightCard>
        </Reveal>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Fun facts                                                     */}
      {/* ------------------------------------------------------------- */}
      <StaggerGroup className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FUN_FACTS.map((fact) => {
          const Icon = fact.icon;
          return (
            <RevealItem key={fact.label}>
              <div className="group flex h-full items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-5 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.06]">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/5 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="text-muted group-hover:text-secondary size-4 transition-colors" />
                </span>
                <div className="min-w-0">
                  <p className="text-subtle text-[11px] tracking-wider uppercase">
                    {fact.label}
                  </p>
                  <p className="truncate text-sm font-medium text-white">
                    {fact.value}
                  </p>
                </div>
              </div>
            </RevealItem>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}
