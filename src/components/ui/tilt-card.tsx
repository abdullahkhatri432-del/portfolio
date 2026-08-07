"use client";

import * as React from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

import {
  useHasPointer,
  usePrefersReducedMotion,
} from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum rotation in degrees. */
  intensity?: number;
  /** Adds a moving sheen that tracks the pointer. */
  sheen?: boolean;
  children: React.ReactNode;
}

/** 3D perspective tilt that follows the pointer. */
export function TiltCard({
  intensity = 9,
  sheen = true,
  className,
  children,
  ...props
}: TiltCardProps) {
  const hasPointer = useHasPointer();
  const reduced = usePrefersReducedMotion();
  const enabled = hasPointer && !reduced;

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const springConfig = { stiffness: 150, damping: 18, mass: 0.4 };
  const rotateX = useSpring(
    useTransform(py, [0, 1], [intensity, -intensity]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(px, [0, 1], [-intensity, intensity]),
    springConfig,
  );

  const sheenX = useTransform(px, [0, 1], ["0%", "100%"]);
  const sheenY = useTransform(py, [0, 1], ["0%", "100%"]);
  const sheenBg = useMotionTemplate`radial-gradient(420px circle at ${sheenX} ${sheenY}, rgba(255,255,255,0.10), transparent 60%)`;

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!enabled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  };

  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={
        enabled
          ? {
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
              perspective: 1200,
            }
          : undefined
      }
      className={cn("relative", className)}
      {...(props as React.ComponentProps<typeof motion.div>)}
    >
      {children}
      {sheen && enabled && (
        <motion.div
          aria-hidden
          style={{ background: sheenBg }}
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
        />
      )}
    </motion.div>
  );
}
