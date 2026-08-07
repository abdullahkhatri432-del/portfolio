"use client";

import * as React from "react";
import { motion } from "motion/react";

import { useMagnetic } from "@/hooks/use-magnetic";
import { cn } from "@/lib/utils";

interface MagneticProps extends React.HTMLAttributes<HTMLDivElement> {
  strength?: number;
  children: React.ReactNode;
}

/** Wrapper that gives any child a magnetic pull toward the cursor. */
export function Magnetic({
  strength = 0.3,
  className,
  children,
  ...props
}: MagneticProps) {
  const { ref, x, y, onPointerMove, onPointerLeave } =
    useMagnetic<HTMLDivElement>({
      strength,
    });

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn("inline-flex", className)}
      {...(props as React.ComponentProps<typeof motion.div>)}
    >
      {children}
    </motion.div>
  );
}
