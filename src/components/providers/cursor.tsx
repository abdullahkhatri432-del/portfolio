"use client";

import * as React from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";

import {
  useHasPointer,
  usePrefersReducedMotion,
} from "@/hooks/use-media-query";

/**
 * Custom cursor: a precise dot, a lagging ring that grows over interactive
 * elements, and an ambient glow that follows the pointer.
 */
export function Cursor() {
  const hasPointer = useHasPointer();
  const reduced = usePrefersReducedMotion();
  const enabled = hasPointer && !reduced;

  const [visible, setVisible] = React.useState(false);
  const [hovering, setHovering] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  const [label, setLabel] = React.useState<string | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const dotX = useSpring(x, { stiffness: 1400, damping: 60, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 1400, damping: 60, mass: 0.2 });
  const ringX = useSpring(x, { stiffness: 220, damping: 24, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 220, damping: 24, mass: 0.6 });
  const glowX = useSpring(x, { stiffness: 90, damping: 26, mass: 1 });
  const glowY = useSpring(y, { stiffness: 90, damping: 26, mass: 1 });

  React.useEffect(() => {
    if (!enabled) return;

    const interactiveSelector =
      'a, button, [role="button"], input, textarea, select, summary, [data-cursor]';

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      if (!visible) setVisible(true);

      const target = (event.target as HTMLElement | null)?.closest(
        interactiveSelector,
      ) as HTMLElement | null;

      setHovering(Boolean(target));
      setLabel(target?.dataset.cursorLabel ?? null);
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
    };
  }, [enabled, visible, x, y]);

  // Hide the native cursor only while the custom one is active.
  React.useEffect(() => {
    if (!enabled) return;
    document.documentElement.style.cursor = "none";
    return () => {
      document.documentElement.style.cursor = "";
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Ambient glow */}
      <motion.div
        style={{ x: glowX, y: glowY }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        className="absolute -translate-x-1/2 -translate-y-1/2"
      >
        <div className="size-[26rem] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.13),rgba(6,182,212,0.05)_45%,transparent_70%)] blur-2xl" />
      </motion.div>

      {/* Ring */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: pressed ? 0.82 : hovering ? 1.9 : 1,
        }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="size-9 rounded-full border transition-colors duration-300"
          style={{
            borderColor: hovering
              ? "rgba(6,182,212,0.85)"
              : "rgba(255,255,255,0.35)",
            backgroundColor: hovering ? "rgba(6,182,212,0.08)" : "transparent",
          }}
        />
      </motion.div>

      {/* Dot */}
      <motion.div
        style={{ x: dotX, y: dotY }}
        animate={{ opacity: visible ? 1 : 0, scale: hovering ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        className="absolute -translate-x-1/2 -translate-y-1/2"
      >
        <div className="size-1.5 rounded-full bg-white" />
      </motion.div>

      {/* Contextual label */}
      <AnimatePresence>
        {label && (
          <motion.div
            key={label}
            style={{ x: ringX, y: ringY }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.22 }}
            className="absolute -translate-x-1/2 translate-y-6"
          >
            <span className="text-background rounded-full bg-white px-3 py-1 text-[10px] font-semibold tracking-wider uppercase">
              {label}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
