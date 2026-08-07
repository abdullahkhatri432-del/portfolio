"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import {
  ArrowDown,
  ArrowUpRight,
  Download,
  MapPin,
  Sparkles,
} from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";

import { siteConfig } from "@/constants/site";
import { HERO_STATS } from "@/data/about";
import { SOCIAL_LINKS } from "@/data/socials";
import { scrollToSection, useLenis } from "@/hooks/use-lenis";
import { premiumEase } from "@/utils/motion";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/ui/counter";
import { Magnetic } from "@/components/ui/magnetic";
import { Particles } from "@/components/ui/particles";
import { Typewriter } from "@/components/ui/typewriter";

const ROLES = [
  "Full Stack Developer",
  "Next.js Specialist",
  "TypeScript Engineer",
  "UI/UX Focused Builder",
  "Database Architect",
];

const FLOATING_CHIPS = [
  { label: "TypeScript", top: "12%", left: "-6%", delay: 0, color: "#3178C6" },
  { label: "Next.js", top: "70%", left: "-10%", delay: 0.8, color: "#FFFFFF" },
  {
    label: "PostgreSQL",
    top: "6%",
    right: "-8%",
    delay: 1.4,
    color: "#38BDF8",
  },
  { label: "Prisma", top: "78%", right: "-4%", delay: 2.1, color: "#A78BFA" },
];

export function Hero() {
  const lenis = useLenis();
  const { scrollY } = useScroll();

  // Parallax layers
  const contentY = useTransform(scrollY, [0, 700], [0, 90]);
  const contentOpacity = useTransform(scrollY, [0, 520], [1, 0]);
  const portraitY = useTransform(scrollY, [0, 700], [0, -60]);

  return (
    <section
      id="home"
      className="relative flex min-h-dvh items-center overflow-hidden pt-32 pb-20 sm:pt-36"
    >
      {/* Particle field */}
      <Particles className="z-0" quantity={80} />

      {/* Spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/4 left-1/2 -z-0 size-[52rem] -translate-x-1/2 rounded-full blur-[150px]"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.20), rgba(6,182,212,0.08) 45%, transparent 70%)",
        }}
      />

      <div className="container-page relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* ---------------------------------------------------------- */}
          {/* Copy                                                        */}
          {/* ---------------------------------------------------------- */}
          <motion.div
            style={{ y: contentY, opacity: contentOpacity }}
            className="space-y-8"
          >
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: premiumEase }}
              className="border-accent/25 bg-accent/8 inline-flex items-center gap-2.5 rounded-full border py-1.5 pr-4 pl-2 backdrop-blur-md"
            >
              <span className="relative flex size-5 items-center justify-center">
                <span className="bg-accent absolute inline-flex size-2.5 animate-ping rounded-full opacity-75" />
                <span className="bg-accent relative inline-flex size-2 rounded-full" />
              </span>
              <span className="text-accent-soft text-xs font-medium">
                {siteConfig.availability}
              </span>
              <span className="bg-accent/25 h-3 w-px" />
              <span className="text-muted inline-flex items-center gap-1 text-xs">
                <MapPin className="size-3" />
                {siteConfig.location}
              </span>
            </motion.div>

            {/* Headline */}
            <div className="space-y-3">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45, ease: premiumEase }}
                className="text-secondary flex items-center gap-2 font-mono text-sm"
              >
                <Sparkles className="size-4" />
                Hello, I&apos;m
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.55, ease: premiumEase }}
                className="text-5xl leading-[0.98] font-bold tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.2rem]"
              >
                <span className="block text-white">Abdullah</span>
                <span className="text-gradient-brand block">Khatri</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.75, ease: premiumEase }}
                className="flex min-h-[2.2rem] items-center gap-3 pt-2"
              >
                <span
                  aria-hidden
                  className="from-primary to-secondary h-px w-10 bg-gradient-to-r"
                />
                <Typewriter
                  words={ROLES}
                  className="font-display text-lg font-medium text-white sm:text-xl lg:text-2xl"
                />
              </motion.div>
            </div>

            {/* Intro */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85, ease: premiumEase }}
              className="text-muted max-w-xl text-base leading-relaxed sm:text-lg"
            >
              {siteConfig.tagline} I design and engineer complete web products —
              from normalised database schemas and typed API layers to
              interfaces that feel effortless on every device.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.95, ease: premiumEase }}
              className="flex flex-wrap items-center gap-3"
            >
              <Magnetic strength={0.25}>
                <Button
                  size="lg"
                  variant="primary"
                  onClick={() => scrollToSection(lenis, "#contact")}
                  className="group"
                  data-cursor-label="Let's talk"
                >
                  Hire Me
                  <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Button>
              </Magnetic>

              <Magnetic strength={0.25}>
                <Button size="lg" variant="secondary" asChild>
                  <a
                    href={siteConfig.links.resume}
                    download
                    data-cursor-label="Download"
                    className="group"
                  >
                    <Download className="transition-transform duration-300 group-hover:translate-y-0.5" />
                    Resume
                  </a>
                </Button>
              </Magnetic>

              <Magnetic strength={0.35}>
                <Button size="icon" variant="outline" asChild>
                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile"
                    data-cursor-label="GitHub"
                  >
                    <FaGithub />
                  </a>
                </Button>
              </Magnetic>

              <Magnetic strength={0.35}>
                <Button size="icon" variant="outline" asChild>
                  <a
                    href={siteConfig.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile"
                    data-cursor-label="LinkedIn"
                  >
                    <FaLinkedinIn />
                  </a>
                </Button>
              </Magnetic>
            </motion.div>

            {/* Stats */}
            <motion.dl
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.05, ease: premiumEase }}
              className="grid max-w-lg grid-cols-3 gap-4 border-t border-white/8 pt-7"
            >
              {HERO_STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="font-display block text-2xl font-bold text-white sm:text-3xl">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </span>
                    <span className="text-subtle mt-1 block text-[11px] leading-snug sm:text-xs">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          {/* ---------------------------------------------------------- */}
          {/* Portrait                                                    */}
          {/* ---------------------------------------------------------- */}
          <motion.div
            style={{ y: portraitY }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.6, ease: premiumEase }}
            className="relative mx-auto w-full max-w-sm lg:max-w-md"
          >
            <div className="relative aspect-square">
              {/* Rotating rings */}
              <div
                aria-hidden
                className="animate-spin-slow absolute inset-0 rounded-full border border-dashed border-white/10"
              />
              <div
                aria-hidden
                className="animate-spin-slow absolute inset-6 rounded-full border border-white/8"
                style={{
                  animationDirection: "reverse",
                  animationDuration: "22s",
                }}
              />

              {/* Orbiting dots */}
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  aria-hidden
                  className="animate-orbit absolute top-1/2 left-1/2 size-2 rounded-full"
                  style={
                    {
                      "--orbit-radius": "clamp(120px, 45%, 200px)",
                      "--orbit-duration": `${16 + i * 5}s`,
                      animationDelay: `${i * -4}s`,
                      background: ["#7C3AED", "#06B6D4", "#22C55E"][i],
                      boxShadow: `0 0 14px ${["#7C3AED", "#06B6D4", "#22C55E"][i]}`,
                    } as React.CSSProperties
                  }
                />
              ))}

              {/* Glow */}
              <div
                aria-hidden
                className="animate-glow-pulse absolute inset-8 rounded-full blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(124,58,237,0.5), rgba(6,182,212,0.25) 55%, transparent 75%)",
                }}
              />

              {/* Image */}
              <div className="absolute inset-10 overflow-hidden rounded-full border border-white/12 bg-gradient-to-br from-white/8 to-white/2 backdrop-blur-sm">
                <Image
                  src="/profile.svg"
                  alt="Portrait of Abdullah Khatri"
                  fill
                  priority
                  sizes="(max-width: 1024px) 60vw, 380px"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="from-background/70 absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
                />
              </div>

              {/* Floating tech chips */}
              {FLOATING_CHIPS.map((chip) => (
                <motion.div
                  key={chip.label}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 1.2 + chip.delay * 0.25,
                    ease: premiumEase,
                  }}
                  className="animate-float absolute hidden sm:block"
                  style={{
                    top: chip.top,
                    left: chip.left,
                    right: chip.right,
                    animationDelay: `${chip.delay}s`,
                  }}
                >
                  <span className="flex items-center gap-2 rounded-full border border-white/12 bg-[#0a0f24]/80 px-3.5 py-2 text-xs font-medium whitespace-nowrap text-white shadow-lg backdrop-blur-xl">
                    <span
                      className="size-1.5 rounded-full"
                      style={{
                        background: chip.color,
                        boxShadow: `0 0 8px ${chip.color}`,
                      }}
                    />
                    {chip.label}
                  </span>
                </motion.div>
              ))}

              {/* Experience badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 1.4, ease: premiumEase }}
                className="absolute -right-2 bottom-6 sm:right-2"
              >
                <div className="flex items-center gap-3 rounded-2xl border border-white/12 bg-[#0a0f24]/85 px-4 py-3 shadow-2xl backdrop-blur-xl">
                  <span className="font-display text-gradient-brand text-3xl font-bold">
                    {siteConfig.yearsOfExperience}+
                  </span>
                  <span className="text-muted text-[11px] leading-tight">
                    Years of
                    <br />
                    Experience
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Social rail + scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-16 flex flex-col items-center justify-between gap-6 sm:flex-row"
        >
          <div className="flex items-center gap-3">
            <span className="text-subtle hidden text-[11px] tracking-[0.2em] uppercase sm:block">
              Follow
            </span>
            <span
              aria-hidden
              className="hidden h-px w-8 bg-white/15 sm:block"
            />
            <ul className="flex items-center gap-2">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <li key={social.label}>
                    <Magnetic strength={0.4}>
                      <a
                        href={social.href}
                        target={
                          social.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        data-cursor-label={social.label}
                        className="group text-muted hover:border-secondary/50 hover:bg-secondary/10 flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all duration-300 hover:text-white"
                      >
                        <Icon className="size-4 transition-transform duration-300 group-hover:scale-110" />
                      </a>
                    </Magnetic>
                  </li>
                );
              })}
            </ul>
          </div>

          <button
            type="button"
            onClick={() => scrollToSection(lenis, "#about")}
            className="group text-subtle flex items-center gap-3 text-xs tracking-[0.2em] uppercase transition-colors hover:text-white"
            aria-label="Scroll to about section"
          >
            Scroll to explore
            <span className="group-hover:border-secondary/50 flex size-9 items-center justify-center rounded-full border border-white/12 transition-colors">
              <ArrowDown className="size-4 animate-bounce" />
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
