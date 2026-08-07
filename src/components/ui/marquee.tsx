"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Seconds for one full loop. */
  speed?: number;
  reverse?: boolean;
  /** Pause the animation while hovered. */
  pauseOnHover?: boolean;
  gap?: string;
}

/** Seamless infinite marquee built from a duplicated track. */
export function Marquee({
  children,
  speed = 40,
  reverse = false,
  pauseOnHover = true,
  gap = "3rem",
  className,
  ...props
}: MarqueeProps) {
  return (
    <div
      className={cn("group/marquee relative flex overflow-hidden", className)}
      style={
        {
          "--marquee-duration": `${speed}s`,
          "--marquee-gap": gap,
        } as React.CSSProperties
      }
      {...props}
    >
      <div
        className={cn(
          "flex w-max shrink-0 items-center",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
          pauseOnHover && "group-hover/marquee:[animation-play-state:paused]",
        )}
        style={{ gap }}
      >
        <div className="flex shrink-0 items-center" style={{ gap }}>
          {children}
        </div>
        <div aria-hidden className="flex shrink-0 items-center" style={{ gap }}>
          {children}
        </div>
      </div>
    </div>
  );
}
