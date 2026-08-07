"use client";

import { useCallback, useRef } from "react";
import { useMotionValue, useSpring } from "motion/react";

import { usePrefersReducedMotion, useHasPointer } from "./use-media-query";

interface MagneticOptions {
  strength?: number;
  stiffness?: number;
  damping?: number;
}

/**
 * Magnetic hover effect: the element eases toward the cursor while hovered
 * and springs back to its origin on leave.
 */
export function useMagnetic<T extends HTMLElement>({
  strength = 0.35,
  stiffness = 180,
  damping = 15,
}: MagneticOptions = {}) {
  const ref = useRef<T>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness, damping, mass: 0.35 });
  const y = useSpring(rawY, { stiffness, damping, mass: 0.35 });

  const reducedMotion = usePrefersReducedMotion();
  const hasPointer = useHasPointer();
  const enabled = hasPointer && !reducedMotion;

  const onPointerMove = useCallback(
    (event: React.PointerEvent<T>) => {
      if (!enabled || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const relX = event.clientX - (rect.left + rect.width / 2);
      const relY = event.clientY - (rect.top + rect.height / 2);
      rawX.set(relX * strength);
      rawY.set(relY * strength);
    },
    [enabled, rawX, rawY, strength],
  );

  const onPointerLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return { ref, x, y, onPointerMove, onPointerLeave, enabled };
}
