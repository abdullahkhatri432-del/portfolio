"use client";

import * as React from "react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";

import { cn } from "@/lib/utils";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Colour of the cursor-following glow. */
  glow?: string;
  /** Radius of the glow in pixels. */
  radius?: number;
  /** Render an animated gradient border on hover. */
  borderGlow?: boolean;
  children: React.ReactNode;
}

/**
 * Glass card with a spotlight that follows the cursor and an optional
 * gradient border that lights up on hover.
 */
export function SpotlightCard({
  glow = "rgba(124, 58, 237, 0.28)",
  radius = 380,
  borderGlow = true,
  className,
  children,
  ...props
}: SpotlightCardProps) {
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);

  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, ${glow}, transparent 70%)`;

  const handleMove = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      mouseX.set(event.clientX - rect.left);
      mouseY.set(event.clientY - rect.top);
    },
    [mouseX, mouseY],
  );

  const handleLeave = React.useCallback(() => {
    mouseX.set(-9999);
    mouseY.set(-9999);
  }, [mouseX, mouseY]);

  return (
    <div
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={cn(
        "group glass relative overflow-hidden rounded-3xl transition-all duration-500",
        "hover:border-white/20 hover:shadow-[0_24px_70px_-24px_rgba(124,58,237,0.45)]",
        className,
      )}
      {...props}
    >
      {/* Cursor spotlight */}
      <motion.div
        aria-hidden
        style={{ background }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Gradient border sheen */}
      {borderGlow && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(130deg, rgba(124,58,237,0.5), transparent 40%, transparent 60%, rgba(6,182,212,0.5))",
            WebkitMask:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "1px",
          }}
        />
      )}

      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
