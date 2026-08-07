"use client";

import { motion } from "motion/react";

import { ACHIEVEMENTS, ACHIEVEMENT_COUNTERS } from "@/data/achievements";
import { premiumEase, viewportOnce } from "@/utils/motion";
import { Counter } from "@/components/ui/counter";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";

export function Achievements() {
  return (
    <Section id="achievements">
      <SectionHeading
        eyebrow="Achievements"
        title="Milestones worth"
        highlight="counting"
        description="Numbers, awards and moments that mark the progress so far."
      />

      {/* Counters */}
      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ACHIEVEMENT_COUNTERS.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{
              duration: 0.6,
              delay: Math.min(index * 0.07, 0.35),
              ease: premiumEase,
            }}
          >
            <SpotlightCard className="relative overflow-hidden p-7 text-center">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 -top-20 h-40 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.28),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <p className="font-display text-gradient-brand text-4xl font-bold sm:text-5xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-muted mt-2 text-sm">{stat.label}</p>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>

      {/* Badges */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ACHIEVEMENTS.map((achievement, index) => {
          const Icon = achievement.icon;
          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{
                duration: 0.65,
                delay: Math.min(index * 0.06, 0.4),
                ease: premiumEase,
              }}
            >
              <SpotlightCard
                glow={`${achievement.accent}2e`}
                className="h-full p-6"
              >
                <span
                  className="mb-4 flex size-12 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                  style={{
                    background: `linear-gradient(135deg, ${achievement.accent}26, transparent)`,
                    boxShadow: `0 0 24px ${achievement.accent}25`,
                  }}
                >
                  <Icon
                    className="size-5"
                    style={{ color: achievement.accent }}
                  />
                </span>

                <p className="text-subtle font-mono text-[11px]">
                  {achievement.date}
                </p>
                <h3 className="font-display mt-1 text-base leading-snug font-semibold text-white">
                  {achievement.title}
                </h3>
                <p className="text-muted mt-2 text-sm leading-relaxed">
                  {achievement.description}
                </p>
              </SpotlightCard>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
