"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";

import { PROCESS_STEPS, SERVICES } from "@/data/services";
import { scrollToSection, useLenis } from "@/hooks/use-lenis";
import { premiumEase, viewportOnce } from "@/utils/motion";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";

export function Services() {
  const lenis = useLenis();

  return (
    <Section id="services">
      <SectionHeading
        eyebrow="Services"
        title="What I can"
        highlight="build for you"
        description="From a single landing page to a complete multi-role platform — designed, engineered and deployed."
      />

      {/* Service cards */}
      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{
                duration: 0.7,
                delay: Math.min(index * 0.07, 0.4),
                ease: premiumEase,
              }}
            >
              <SpotlightCard
                glow={`${service.accent}2e`}
                className="flex h-full flex-col p-7"
              >
                {/* Number */}
                <span className="absolute top-6 right-7 font-mono text-xs text-white/15 transition-colors duration-500 group-hover:text-white/30">
                  /{String(index + 1).padStart(2, "0")}
                </span>

                <span
                  className="mb-5 flex size-12 items-center justify-center rounded-2xl ring-1 ring-white/8 transition-transform duration-500 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${service.accent}26, transparent)`,
                    boxShadow: `0 0 26px ${service.accent}22`,
                  }}
                >
                  <Icon className="size-5" style={{ color: service.accent }} />
                </span>

                <h3 className="font-display text-lg font-semibold text-white">
                  {service.title}
                </h3>

                <p className="text-muted mt-2.5 text-sm leading-relaxed">
                  {service.description}
                </p>

                <ul className="mt-5 space-y-2 border-t border-white/8 pt-5">
                  {service.deliverables.map((item) => (
                    <li
                      key={item}
                      className="text-muted flex items-start gap-2.5 text-sm"
                    >
                      <Check
                        className="mt-0.5 size-3.5 shrink-0"
                        style={{ color: service.accent }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </motion.div>
          );
        })}
      </div>

      {/* Process */}
      <div className="mt-24">
        <Reveal>
          <h3 className="font-display mb-10 text-center text-2xl font-bold text-white sm:text-3xl">
            How we&apos;ll work together
          </h3>
        </Reveal>

        <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Connector */}
          <div
            aria-hidden
            className="from-primary/40 via-secondary/40 to-accent/40 pointer-events-none absolute top-10 right-8 left-8 hidden h-px bg-gradient-to-r lg:block"
          />

          {PROCESS_STEPS.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{
                duration: 0.65,
                delay: index * 0.1,
                ease: premiumEase,
              }}
              className="relative text-center"
            >
              <span className="font-display text-gradient-brand relative mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl border border-white/12 bg-[#080d1f] text-base font-bold">
                {step.step}
              </span>
              <h4 className="font-display text-base font-semibold text-white">
                {step.title}
              </h4>
              <p className="text-muted mx-auto mt-2 max-w-[16rem] text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <Reveal delay={0.1} className="mt-16">
        <div className="from-primary/12 to-secondary/12 relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br via-transparent p-8 sm:p-12">
          <div
            aria-hidden
            className="grid-bg pointer-events-none absolute inset-0 opacity-40"
          />

          <div className="relative flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
            <div>
              <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
                Have a project in mind?
              </h3>
              <p className="text-muted mt-2.5 max-w-xl text-sm sm:text-base">
                Tell me what you&apos;re building. I&apos;ll come back with a
                clear scope, timeline and a plan you can actually act on — free
                of charge.
              </p>
            </div>

            <Magnetic strength={0.25}>
              <Button
                size="lg"
                variant="primary"
                onClick={() => scrollToSection(lenis, "#contact")}
                className="group shrink-0"
                data-cursor-label="Let's talk"
              >
                Start a Conversation
                <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </Magnetic>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
