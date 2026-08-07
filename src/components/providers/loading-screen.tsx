"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";

import { siteConfig } from "@/constants/site";
import { useLenis } from "@/hooks/use-lenis";
import { premiumEase } from "@/utils/motion";

const PHASES = [
  "Initialising",
  "Loading assets",
  "Compiling shaders",
  "Warming up",
  "Ready",
];

/** Full-screen intro loader with a determinate progress counter. */
export function LoadingScreen() {
  const [progress, setProgress] = React.useState(0);
  const [done, setDone] = React.useState(false);
  const lenis = useLenis();

  // Lock scrolling while the loader is visible.
  React.useEffect(() => {
    if (done) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  React.useEffect(() => {
    if (done) return;
    lenis?.stop();
  }, [done, lenis]);

  React.useEffect(() => {
    let frame = 0;
    let current = 0;

    const tick = () => {
      // Ease toward 100 with a little randomness for a natural feel.
      const remaining = 100 - current;
      current +=
        Math.max(remaining * 0.045, 0.35) * (0.7 + Math.random() * 0.6);
      if (current >= 100) {
        current = 100;
        setProgress(100);
        window.setTimeout(() => setDone(true), 520);
        return;
      }
      setProgress(current);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  React.useEffect(() => {
    if (!done) return;
    lenis?.start();
    lenis?.scrollTo(0, { immediate: true });
  }, [done, lenis]);

  const phase = PHASES[Math.min(Math.floor(progress / 25), PHASES.length - 1)];

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          exit={{ opacity: 0, filter: "blur(12px)" }}
          transition={{ duration: 0.7, ease: premiumEase }}
          className="bg-background fixed inset-0 z-[200] flex items-center justify-center"
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
        >
          {/* Ambient glow */}
          <div
            aria-hidden
            className="absolute size-[38rem] rounded-full blur-[120px]"
            style={{
              background:
                "radial-gradient(circle, rgba(124,58,237,0.28), transparent 65%)",
            }}
          />
          <div aria-hidden className="grid-bg absolute inset-0 opacity-40" />

          <div className="relative flex w-full max-w-md flex-col items-center gap-8 px-6">
            {/* Monogram */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: premiumEase }}
              className="relative"
            >
              <div className="animate-glow-pulse from-primary to-secondary absolute inset-0 rounded-3xl bg-gradient-to-br blur-2xl" />
              <div className="relative flex size-20 items-center justify-center rounded-3xl border border-white/12 bg-white/5 backdrop-blur-xl">
                <span className="font-display text-gradient text-2xl font-bold">
                  {siteConfig.initials}
                </span>
              </div>
              <div className="animate-spin-slow absolute -inset-3 rounded-full border border-dashed border-white/10" />
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: premiumEase }}
              className="text-center"
            >
              <p className="font-display text-lg font-semibold tracking-tight text-white">
                {siteConfig.name}
              </p>
              <p className="text-muted mt-1 text-xs tracking-[0.28em] uppercase">
                {siteConfig.role}
              </p>
            </motion.div>

            {/* Progress */}
            <div className="w-full space-y-3">
              <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/8">
                <motion.div
                  className="from-primary via-secondary to-accent h-full rounded-full bg-gradient-to-r"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>
              <div className="text-muted flex items-center justify-between font-mono text-[11px]">
                <span>{phase}</span>
                <span className="text-white tabular-nums">
                  {Math.round(progress).toString().padStart(3, "0")}%
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
