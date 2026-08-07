"use client";

import { motion } from "motion/react";
import { Award, ExternalLink, ShieldCheck } from "lucide-react";

import { CERTIFICATIONS } from "@/data/certifications";
import { premiumEase, viewportOnce } from "@/utils/motion";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { TiltCard } from "@/components/ui/tilt-card";

export function Certifications() {
  // Hide the section until at least one real credential is listed.
  if (CERTIFICATIONS.length === 0) return null;

  return (
    <Section id="certifications">
      <SectionHeading
        eyebrow="Certifications"
        title="Verified"
        highlight="credentials"
        description="Formal training that backs the practical work — each credential independently verifiable."
      />

      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CERTIFICATIONS.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{
              duration: 0.7,
              delay: Math.min(index * 0.07, 0.35),
              ease: premiumEase,
            }}
          >
            <TiltCard intensity={7} className="h-full">
              <SpotlightCard
                glow={`${cert.accent}30`}
                className="flex h-full flex-col p-6"
              >
                {/* Ribbon glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: `${cert.accent}40` }}
                />

                <div className="mb-5 flex items-start justify-between gap-3">
                  <span
                    className="flex size-12 items-center justify-center rounded-2xl ring-1 transition-transform duration-500 group-hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${cert.accent}26, transparent)`,
                      boxShadow: `0 0 24px ${cert.accent}22`,
                    }}
                  >
                    <Award className="size-5" style={{ color: cert.accent }} />
                  </span>

                  <Badge size="sm" variant="outline">
                    {cert.date}
                  </Badge>
                </div>

                <h3 className="font-display text-base leading-snug font-semibold text-white">
                  {cert.title}
                </h3>
                <p className="text-secondary-soft mt-1.5 text-sm">
                  {cert.issuer}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {cert.skills.map((skill) => (
                    <Badge key={skill} size="sm">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="mt-auto space-y-3 pt-6">
                  <p className="text-subtle flex items-center gap-1.5 font-mono text-[11px]">
                    <ShieldCheck className="text-accent size-3.5" />
                    {cert.credentialId}
                  </p>

                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-label="Preview"
                    className="group/link inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-medium text-white transition-all duration-300 hover:border-white/25 hover:bg-white/10"
                    aria-label={`Preview ${cert.title} certificate`}
                  >
                    Preview Certificate
                    <ExternalLink className="size-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>
                </div>
              </SpotlightCard>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
