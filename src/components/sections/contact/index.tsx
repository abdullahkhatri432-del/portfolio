"use client";

import { motion } from "motion/react";
import { ArrowUpRight, MessageSquare, Navigation } from "lucide-react";

import { siteConfig } from "@/constants/site";
import { CONTACT_CHANNELS, FAQS } from "@/data/contact";
import { SOCIAL_LINKS } from "@/data/socials";
import { premiumEase, viewportOnce } from "@/utils/motion";
import { Badge } from "@/components/ui/badge";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";

import { ContactForm } from "./contact-form";

export function Contact() {
  return (
    <Section id="contact">
      <SectionHeading
        eyebrow="Contact"
        title="Let's build something"
        highlight="worth shipping"
        description="Have a project, a role or just a question? Send a message and I'll reply within 24 hours."
      />

      <div className="mt-16 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        {/* ------------------------------------------------------------ */}
        {/* Form                                                         */}
        {/* ------------------------------------------------------------ */}
        <Reveal direction="right">
          <SpotlightCard className="h-full p-7 sm:p-9">
            <div className="mb-7 flex items-center gap-3">
              <span className="from-primary/25 to-secondary/25 flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br ring-1 ring-white/10">
                <MessageSquare className="text-secondary-soft size-5" />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-white">
                  Send a message
                </h3>
                <p className="text-muted text-sm">
                  Usually replies within a few hours
                </p>
              </div>
            </div>

            <ContactForm />
          </SpotlightCard>
        </Reveal>

        {/* ------------------------------------------------------------ */}
        {/* Details                                                      */}
        {/* ------------------------------------------------------------ */}
        <div className="space-y-5">
          {/* Channels */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {CONTACT_CHANNELS.map((channel, index) => {
              const Icon = channel.icon;
              const external = channel.href.startsWith("http");
              return (
                <motion.a
                  key={channel.label}
                  href={channel.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, x: 28 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewportOnce}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                    ease: premiumEase,
                  }}
                  className="group hover:border-secondary/40 flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-5 transition-all duration-300 hover:bg-white/[0.06]"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/5 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="text-secondary size-[18px]" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-subtle text-[11px] tracking-wider uppercase">
                      {channel.label}
                    </p>
                    <p className="truncate text-sm font-medium text-white">
                      {channel.value}
                    </p>
                    <p className="text-subtle mt-0.5 truncate text-xs">
                      {channel.note}
                    </p>
                  </div>
                  <ArrowUpRight className="text-subtle group-hover:text-secondary size-4 shrink-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </motion.a>
              );
            })}
          </div>

          {/* Availability */}
          <Reveal direction="left" delay={0.1}>
            <SpotlightCard glow="rgba(34,197,94,0.22)" className="p-6">
              <div className="flex items-center gap-2.5">
                <span className="relative flex size-2.5">
                  <span className="bg-accent absolute inline-flex size-full animate-ping rounded-full opacity-75" />
                  <span className="bg-accent relative inline-flex size-2.5 rounded-full" />
                </span>
                <p className="font-display text-sm font-semibold text-white">
                  {siteConfig.availability}
                </p>
              </div>
              <p className="text-muted mt-3 text-sm leading-relaxed">
                Currently accepting freelance projects, internships and
                full-time roles. Based in {siteConfig.location}, working
                remotely across time zones.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="accent" size="sm">
                  Freelance
                </Badge>
                <Badge variant="secondary" size="sm">
                  Full-time
                </Badge>
                <Badge variant="primary" size="sm">
                  Remote
                </Badge>
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Socials */}
          <Reveal direction="left" delay={0.15}>
            <SpotlightCard className="p-6">
              <p className="text-muted mb-4 text-xs font-medium tracking-wider uppercase">
                Find me online
              </p>
              <div className="flex flex-wrap gap-2.5">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Magnetic key={social.label} strength={0.4}>
                      <a
                        href={social.href}
                        target={
                          social.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        data-cursor-label={social.label}
                        className="group text-muted hover:border-primary/50 hover:bg-primary/10 flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:text-white"
                      >
                        <Icon className="size-[18px] transition-transform duration-300 group-hover:scale-110" />
                      </a>
                    </Magnetic>
                  );
                })}
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>

      {/* -------------------------------------------------------------- */}
      {/* Map + FAQ                                                      */}
      {/* -------------------------------------------------------------- */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Reveal direction="right">
          <SpotlightCard className="overflow-hidden p-0">
            <div className="relative aspect-[16/10] w-full">
              <iframe
                title={`Map showing ${siteConfig.location}`}
                src={siteConfig.maps.embed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 size-full contrast-[0.9] grayscale-[0.85] hue-rotate-180 invert-[0.92] transition-all duration-700 hover:grayscale-[0.4]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050816]/70 via-transparent to-transparent"
              />
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-white/8 p-5">
              <div>
                <p className="font-display text-sm font-semibold text-white">
                  {siteConfig.location}
                </p>
                <p className="text-subtle text-xs">{siteConfig.timezone}</p>
              </div>
              <a
                href={siteConfig.maps.directions}
                target="_blank"
                rel="noopener noreferrer"
                className="group hover:border-secondary/50 hover:bg-secondary/10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white transition-all duration-300"
              >
                <Navigation className="size-3.5" />
                Directions
              </a>
            </div>
          </SpotlightCard>
        </Reveal>

        {/* FAQ */}
        <Reveal direction="left">
          <SpotlightCard className="h-full p-7 sm:p-8">
            <h3 className="font-display mb-6 text-lg font-semibold text-white">
              Frequently asked
            </h3>
            <div className="space-y-3">
              {FAQS.map((faq) => (
                <details
                  key={faq.question}
                  className="group/faq open:border-secondary/30 rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-4 transition-colors duration-300 hover:border-white/15"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-white [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <span
                      aria-hidden
                      className="text-muted flex size-6 shrink-0 items-center justify-center rounded-full border border-white/12 transition-transform duration-300 group-open/faq:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="text-muted mt-3 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </SpotlightCard>
        </Reveal>
      </div>
    </Section>
  );
}
