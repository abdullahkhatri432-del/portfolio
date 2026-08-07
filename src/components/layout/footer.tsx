"use client";

import { ArrowUp, Heart } from "lucide-react";
import { motion } from "motion/react";

import { FOOTER_LINKS } from "@/constants/navigation";
import { siteConfig } from "@/constants/site";
import { SOCIAL_LINKS } from "@/data/socials";
import { scrollToSection, useLenis } from "@/hooks/use-lenis";
import { currentYear } from "@/utils/format";
import { premiumEase, viewportOnce } from "@/utils/motion";
import { Magnetic } from "@/components/ui/magnetic";

export function Footer() {
  const lenis = useLenis();

  return (
    <footer className="relative overflow-hidden border-t border-white/8">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 size-[36rem] -translate-x-1/2 rounded-full blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.22), transparent 65%)",
        }}
      />

      <div className="container-page relative py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: premiumEase }}
            className="space-y-6"
          >
            <button
              type="button"
              onClick={() => scrollToSection(lenis, "#home")}
              className="group flex items-center gap-3"
              aria-label="Back to top"
            >
              <span className="relative flex size-11 items-center justify-center rounded-2xl border border-white/12 bg-white/5">
                <span className="from-primary/50 to-secondary/50 absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100" />
                <span className="font-display text-gradient relative text-base font-bold">
                  {siteConfig.initials}
                </span>
              </span>
              <span className="text-left">
                <span className="font-display block text-base font-semibold text-white">
                  {siteConfig.name}
                </span>
                <span className="text-muted block text-xs">
                  {siteConfig.role}
                </span>
              </span>
            </button>

            <p className="text-muted max-w-sm text-sm leading-relaxed">
              {siteConfig.tagline} Currently available for freelance projects,
              internships and full-time roles.
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
                      className="group text-muted hover:border-secondary/50 hover:bg-secondary/10 flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:text-white"
                    >
                      <Icon className="size-[18px] transition-transform duration-300 group-hover:scale-110" />
                    </a>
                  </Magnetic>
                );
              })}
            </div>
          </motion.div>

          {/* Link columns */}
          <div className="grid gap-8 sm:grid-cols-3">
            {FOOTER_LINKS.map((column, columnIndex) => (
              <motion.nav
                key={column.title}
                aria-label={column.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{
                  duration: 0.7,
                  delay: 0.08 * (columnIndex + 1),
                  ease: premiumEase,
                }}
              >
                <h3 className="font-display mb-4 text-xs font-semibold tracking-[0.2em] text-white uppercase">
                  {column.title}
                </h3>
                <ul className="space-y-2.5">
                  {column.items.map((item) => (
                    <li key={`${column.title}-${item.label}`}>
                      <button
                        type="button"
                        onClick={() => scrollToSection(lenis, item.href)}
                        className="group text-muted inline-flex items-center gap-1.5 text-sm transition-colors hover:text-white"
                      >
                        <span className="bg-secondary h-px w-0 transition-all duration-300 group-hover:w-3" />
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.nav>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-white/8 pt-8 sm:flex-row">
          <p className="text-subtle flex flex-wrap items-center justify-center gap-1.5 text-xs">
            <span>
              © {currentYear()} {siteConfig.name}. All rights reserved.
            </span>
            <span className="hidden sm:inline">·</span>
            <span className="inline-flex items-center gap-1.5">
              Built with
              <Heart className="fill-primary text-primary size-3" />
              using Next.js
            </span>
          </p>

          <Magnetic strength={0.35}>
            <button
              type="button"
              onClick={() => scrollToSection(lenis, "#home")}
              aria-label="Back to top"
              data-cursor-label="Top"
              className="group text-muted hover:border-primary/50 hover:bg-primary/10 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-2.5 pr-4 pl-3 text-xs font-medium transition-all duration-300 hover:text-white"
            >
              <span className="flex size-6 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 group-hover:-translate-y-0.5">
                <ArrowUp className="size-3.5" />
              </span>
              Back to top
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
