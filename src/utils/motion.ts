import type { Transition, Variants } from "motion/react";

/** Shared premium easing curve. */
export const premiumEase = [0.16, 1, 0.3, 1] as const;

export const baseTransition: Transition = {
  duration: 0.8,
  ease: premiumEase,
};

/** Fade + rise, the default section entrance. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -28 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: baseTransition },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: baseTransition },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0, transition: baseTransition },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: baseTransition },
};

/** Parent container that staggers its children. */
export const staggerContainer = (stagger = 0.09, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

/** Per-character or per-word text reveal. */
export const textRevealChild: Variants = {
  hidden: { opacity: 0, y: "0.6em", rotateX: -45 },
  visible: {
    opacity: 1,
    y: "0em",
    rotateX: 0,
    transition: { duration: 0.7, ease: premiumEase },
  },
};

/** Standard viewport config for scroll reveals. */
export const viewportOnce = { once: true, amount: 0.2 } as const;
