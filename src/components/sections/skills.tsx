"use client";

import * as React from "react";
import { motion, useInView } from "motion/react";

import { SKILL_GROUPS } from "@/data/skills";
import type { Skill } from "@/types";
import { cn } from "@/lib/utils";
import { premiumEase, viewportOnce } from "@/utils/motion";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";

/** Single skill row with an animated proficiency bar. */
function SkillBar({ skill, index }: { skill: Skill; index: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const Icon = skill.icon;

  return (
    <div ref={ref} className="group/skill">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="flex min-w-0 items-center gap-2.5">
          <Icon
            className="size-4 shrink-0 transition-transform duration-300 group-hover/skill:scale-110"
            style={{ color: skill.color }}
          />
          <span className="truncate text-sm font-medium text-white">
            {skill.name}
          </span>
        </span>
        <span className="text-subtle shrink-0 font-mono text-xs tabular-nums">
          {skill.level}%
        </span>
      </div>

      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/6">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{
            duration: 1.2,
            delay: 0.1 + index * 0.07,
            ease: premiumEase,
          }}
          className="relative h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${skill.color}99, ${skill.color})`,
            boxShadow: `0 0 12px ${skill.color}55`,
          }}
        >
          {/* Shimmer */}
          <span
            aria-hidden
            className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover/skill:opacity-100"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.6s linear infinite",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}

export function Skills() {
  const [activeCategory, setActiveCategory] = React.useState<string>("All");

  const categories = React.useMemo(
    () => ["All", ...SKILL_GROUPS.map((group) => group.category)],
    [],
  );

  const visibleGroups = React.useMemo(
    () =>
      activeCategory === "All"
        ? SKILL_GROUPS
        : SKILL_GROUPS.filter((group) => group.category === activeCategory),
    [activeCategory],
  );

  return (
    <Section id="skills">
      <SectionHeading
        eyebrow="Skills"
        title="The stack behind"
        highlight="every build"
        description="Technologies I use daily, grouped by where they sit in the stack — with an honest read on how deep I go with each."
      />

      {/* Category filter */}
      <Reveal delay={0.1}>
        <div
          role="tablist"
          aria-label="Skill categories"
          className="mt-12 flex flex-wrap justify-center gap-2"
        >
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                  isActive ? "text-white" : "text-muted hover:text-white",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="skill-filter-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="border-primary/40 from-primary/25 to-secondary/25 absolute inset-0 rounded-full border bg-gradient-to-r"
                  />
                )}
                <span className="relative">{category}</span>
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* Skill groups */}
      <motion.div
        layout
        className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
      >
        {visibleGroups.map((group, groupIndex) => {
          const GroupIcon = group.icon;
          return (
            <motion.div
              key={group.category}
              layout
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{
                duration: 0.7,
                delay: Math.min(groupIndex * 0.08, 0.4),
                ease: premiumEase,
              }}
            >
              <SpotlightCard
                glow={`${group.accent}33`}
                className="h-full p-6 sm:p-7"
              >
                {/* Header */}
                <div className="mb-6 flex items-center gap-3.5">
                  <span
                    className="flex size-11 shrink-0 items-center justify-center rounded-2xl ring-1 transition-transform duration-500 group-hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${group.accent}26, transparent)`,
                      boxShadow: `0 0 22px ${group.accent}22`,
                      borderColor: `${group.accent}40`,
                    }}
                  >
                    <GroupIcon
                      className="size-5"
                      style={{ color: group.accent }}
                    />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-semibold text-white">
                      {group.category}
                    </h3>
                    <p className="text-subtle truncate text-xs">
                      {group.skills.length} technologies
                    </p>
                  </div>
                </div>

                <p className="text-muted mb-6 text-sm leading-relaxed">
                  {group.description}
                </p>

                {/* Bars */}
                <div className="space-y-4">
                  {group.skills.map((skill, index) => (
                    <SkillBar key={skill.name} skill={skill} index={index} />
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
