"use client";

import * as React from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import { premiumEase, viewportOnce } from "@/utils/motion";

interface TextRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  /** Animate per character instead of per word. */
  byCharacter?: boolean;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

/**
 * Masked word/character reveal. The text stays readable for screen readers
 * via an accessible label while the visual pieces animate.
 */
export function TextReveal({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.045,
  byCharacter = false,
  as: Tag = "span",
}: TextRevealProps) {
  const words = text.split(" ");

  return (
    <Tag className={cn("inline-block", className)} aria-label={text}>
      {words.map((word, wordIndex) => {
        const pieces = byCharacter ? word.split("") : [word];
        const baseIndex = byCharacter
          ? words.slice(0, wordIndex).join(" ").length
          : wordIndex;

        return (
          <span
            key={`${word}-${wordIndex}`}
            aria-hidden
            className="inline-block overflow-hidden align-bottom whitespace-nowrap"
          >
            {pieces.map((piece, pieceIndex) => (
              <motion.span
                key={`${piece}-${pieceIndex}`}
                className={cn("inline-block", wordClassName)}
                initial={{ y: "110%", opacity: 0 }}
                whileInView={{ y: "0%", opacity: 1 }}
                viewport={viewportOnce}
                transition={{
                  duration: 0.8,
                  ease: premiumEase,
                  delay: delay + (baseIndex + pieceIndex) * stagger,
                }}
              >
                {piece}
              </motion.span>
            ))}
            {wordIndex < words.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        );
      })}
    </Tag>
  );
}
