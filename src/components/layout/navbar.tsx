"use client";

import * as React from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";

import { NAV_ITEMS, SECTION_IDS } from "@/constants/navigation";
import { siteConfig } from "@/constants/site";
import { useActiveSection } from "@/hooks/use-active-section";
import { scrollToSection, useLenis } from "@/hooks/use-lenis";
import { cn } from "@/lib/utils";
import { premiumEase } from "@/utils/motion";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { scrollY } = useScroll();
  const lenis = useLenis();
  const active = useActiveSection(SECTION_IDS);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  // Lock body scroll while the mobile drawer is open.
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, lenis]);

  // Close the drawer on Escape.
  React.useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    // Allow the drawer to close before scrolling.
    window.setTimeout(() => scrollToSection(lenis, href), open ? 260 : 0);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: premiumEase }}
        className="fixed inset-x-0 top-0 z-[90] pt-3 sm:pt-4"
      >
        <nav
          aria-label="Primary"
          className={cn(
            "container-page flex items-center justify-between gap-4 rounded-full py-2.5 transition-all duration-500",
            scrolled
              ? "mt-0 max-w-5xl border border-white/10 bg-[#050816]/70 px-4 shadow-[0_16px_50px_-24px_rgba(0,0,0,0.9)] backdrop-blur-2xl sm:px-5"
              : "border border-transparent",
          )}
        >
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNav("#home")}
            aria-label="Back to top"
            className="group flex items-center gap-2.5"
          >
            <span className="relative flex size-9 items-center justify-center rounded-xl border border-white/12 bg-white/5 backdrop-blur-md transition-transform duration-500 group-hover:scale-105">
              <span className="from-primary/40 to-secondary/40 absolute inset-0 rounded-xl bg-gradient-to-br opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />
              <span className="font-display text-gradient relative text-sm font-bold">
                {siteConfig.initials}
              </span>
            </span>
            <span className="font-display hidden text-sm font-semibold tracking-tight text-white sm:block">
              {siteConfig.name}
            </span>
          </button>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = active === id;
              return (
                <li key={item.href}>
                  <button
                    type="button"
                    onClick={() => handleNav(item.href)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                      isActive ? "text-white" : "text-muted hover:text-white",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                        className="absolute inset-0 rounded-full border border-white/10 bg-white/8"
                      />
                    )}
                    <span className="relative">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Magnetic strength={0.25} className="hidden sm:inline-flex">
              <Button
                size="sm"
                variant="primary"
                onClick={() => handleNav("#contact")}
                className="group"
                data-cursor-label="Let's talk"
              >
                Hire Me
                <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </Magnetic>

            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="flex size-10 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white backdrop-blur-md transition-colors hover:bg-white/10 lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[85] lg:hidden"
          >
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="bg-background/85 absolute inset-0 backdrop-blur-xl"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: premiumEase }}
              className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col justify-between border-l border-white/10 bg-[#070b1c]/95 px-6 pt-24 pb-10 backdrop-blur-2xl"
            >
              <ul className="flex flex-col gap-1">
                {NAV_ITEMS.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.08 + index * 0.05,
                      ease: premiumEase,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => handleNav(item.href)}
                      className={cn(
                        "group flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-left transition-colors",
                        active === item.href.replace("#", "")
                          ? "bg-white/8 text-white"
                          : "text-muted hover:bg-white/5 hover:text-white",
                      )}
                    >
                      <span className="font-display text-lg font-medium">
                        {item.label}
                      </span>
                      <span className="text-subtle font-mono text-[11px]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </button>
                  </motion.li>
                ))}
              </ul>

              <div className="space-y-4">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={() => handleNav("#contact")}
                >
                  Hire Me
                  <ArrowUpRight />
                </Button>
                <p className="text-subtle text-center text-xs">
                  {siteConfig.location} · {siteConfig.timezone}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
