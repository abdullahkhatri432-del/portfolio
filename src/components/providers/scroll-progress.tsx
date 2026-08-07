"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Fixed gradient bar showing reading progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 34,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="from-primary via-secondary to-accent fixed top-0 left-0 z-[100] h-[3px] w-full origin-left bg-gradient-to-r shadow-[0_0_18px_rgba(124,58,237,0.7)]"
    />
  );
}
