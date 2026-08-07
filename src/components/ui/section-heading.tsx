"use client";

import * as React from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import { premiumEase, viewportOnce } from "@/utils/motion";
import { TextReveal } from "./text-reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

/** Consistent section header: eyebrow chip, gradient title, description. */
export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        centered ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6, ease: premiumEase }}
        className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md"
      >
        <span className="relative flex size-1.5">
          <span className="bg-secondary absolute inline-flex size-full animate-ping rounded-full opacity-70" />
          <span className="bg-secondary relative inline-flex size-1.5 rounded-full" />
        </span>
        <span className="text-muted text-[11px] font-medium tracking-[0.22em] uppercase">
          {eyebrow}
        </span>
      </motion.div>

      <h2 className="max-w-4xl text-4xl leading-[1.08] font-bold sm:text-5xl lg:text-6xl">
        <TextReveal text={title} />
        {highlight && (
          <>
            {" "}
            <TextReveal
              text={highlight}
              className="text-gradient-brand"
              delay={title.split(" ").length * 0.045}
            />
          </>
        )}
      </h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, delay: 0.15, ease: premiumEase }}
          className={cn(
            "text-muted max-w-2xl text-base leading-relaxed sm:text-lg",
            centered && "mx-auto",
          )}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
