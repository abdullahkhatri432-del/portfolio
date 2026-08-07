"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, GitBranch, Star, Users } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

import { GITHUB_USERNAME, siteConfig } from "@/constants/site";
import { premiumEase, viewportOnce } from "@/utils/motion";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";

/**
 * Read-only GitHub widgets rendered from public image services.
 * The username is resolved from NEXT_PUBLIC_GITHUB_USERNAME.
 */
const CARD_THEME = [
  "bg_color=00000000",
  "title_color=A78BFA",
  "text_color=94A3B8",
  "icon_color=06B6D4",
  "border_color=FFFFFF20",
  "hide_border=true",
].join("&");

const WIDGETS = {
  stats: `https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&include_all_commits=true&count_private=true&${CARD_THEME}`,
  languages: `https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&langs_count=8&${CARD_THEME}`,
  streak: `https://github-readme-streak-stats.herokuapp.com/?user=${GITHUB_USERNAME}&background=00000000&border=FFFFFF20&stroke=FFFFFF20&ring=7C3AED&fire=06B6D4&currStreakNum=FFFFFF&sideNums=FFFFFF&currStreakLabel=A78BFA&sideLabels=94A3B8&dates=64748B&hide_border=true`,
  graph: `https://github-readme-activity-graph.vercel.app/graph?username=${GITHUB_USERNAME}&bg_color=00000000&color=FFFFFF&line=7C3AED&point=06B6D4&area_color=7C3AED&area=true&hide_border=true&custom_title=Contribution%20Activity`,
};

/** Image widget with a graceful skeleton and error fallback. */
function GitHubWidget({
  src,
  alt,
  ratio,
  priority = false,
}: {
  src: string;
  alt: string;
  ratio: string;
  priority?: boolean;
}) {
  const [status, setStatus] = React.useState<"loading" | "ready" | "error">(
    "loading",
  );

  return (
    <div className="relative w-full" style={{ aspectRatio: ratio }}>
      {status === "loading" && (
        <div className="absolute inset-0 animate-pulse rounded-2xl bg-white/[0.04]" />
      )}

      {status === "error" ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-white/10 text-center">
          <FaGithub className="text-subtle size-6" />
          <p className="text-subtle px-4 text-xs">
            Live stats unavailable. View the profile directly on GitHub.
          </p>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={`object-contain transition-opacity duration-500 ${
            status === "ready" ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setStatus("ready")}
          onError={() => setStatus("error")}
        />
      )}
    </div>
  );
}

/**
 * Static quick facts shown above the live widgets.
 * The widgets below pull real data from GitHub, so keep these consistent
 * with your actual profile or a visitor will spot the mismatch instantly.
 */
const QUICK_FACTS = [
  { label: "Public Repositories", value: "5", icon: GitBranch },
  { label: "Full Stack Projects", value: "4", icon: Star },
  { label: "Primary Languages", value: "JS / TS", icon: Users },
];

export function GitHubStats() {
  return (
    <Section id="github">
      <SectionHeading
        eyebrow="GitHub"
        title="Code, committed"
        highlight="in public"
        description="Live activity straight from my GitHub profile — contributions, language distribution and streaks."
      />

      {/* Profile header */}
      <Reveal className="mt-14">
        <SpotlightCard className="flex flex-col items-center justify-between gap-6 p-7 sm:flex-row sm:p-8">
          <div className="flex items-center gap-4">
            <span className="flex size-14 items-center justify-center rounded-2xl border border-white/12 bg-white/5">
              <FaGithub className="size-6 text-white" />
            </span>
            <div>
              <p className="font-display text-lg font-semibold text-white">
                @{GITHUB_USERNAME}
              </p>
              <p className="text-muted text-sm">
                {siteConfig.role} · {siteConfig.location}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {QUICK_FACTS.map((fact) => {
              const Icon = fact.icon;
              return (
                <div key={fact.label} className="text-center">
                  <p className="font-display flex items-center justify-center gap-1.5 text-xl font-bold text-white">
                    <Icon className="text-secondary size-4" />
                    {fact.value}
                  </p>
                  <p className="text-subtle mt-0.5 text-[11px]">{fact.label}</p>
                </div>
              );
            })}
          </div>

          <Magnetic strength={0.25}>
            <Button variant="secondary" asChild>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                data-cursor-label="GitHub"
              >
                Follow
                <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Button>
          </Magnetic>
        </SpotlightCard>
      </Reveal>

      {/* Widgets */}
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: premiumEase }}
        >
          <SpotlightCard className="p-5">
            <GitHubWidget
              src={WIDGETS.stats}
              alt={`GitHub statistics for ${GITHUB_USERNAME}`}
              ratio="2 / 1"
            />
          </SpotlightCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, delay: 0.1, ease: premiumEase }}
        >
          <SpotlightCard glow="rgba(6,182,212,0.22)" className="p-5">
            <GitHubWidget
              src={WIDGETS.languages}
              alt={`Most used languages by ${GITHUB_USERNAME}`}
              ratio="2 / 1"
            />
          </SpotlightCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, delay: 0.15, ease: premiumEase }}
          className="lg:col-span-2"
        >
          <SpotlightCard glow="rgba(34,197,94,0.2)" className="p-5">
            <GitHubWidget
              src={WIDGETS.streak}
              alt={`Contribution streak for ${GITHUB_USERNAME}`}
              ratio="3 / 1"
            />
          </SpotlightCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, delay: 0.2, ease: premiumEase }}
          className="lg:col-span-2"
        >
          <SpotlightCard className="p-5">
            <GitHubWidget
              src={WIDGETS.graph}
              alt={`Contribution activity graph for ${GITHUB_USERNAME}`}
              ratio="5 / 2"
            />
          </SpotlightCard>
        </motion.div>
      </div>
    </Section>
  );
}
