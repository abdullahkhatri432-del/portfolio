"use client";

import * as React from "react";

import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

interface TypewriterProps {
  words: string[];
  className?: string;
  cursorClassName?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseMs?: number;
}

/**
 * Cycles through phrases with a typing / deleting effect.
 * The animation loop lives in a single self-scheduling timer so state is only
 * updated from a timer callback, never synchronously inside the effect body.
 */
export function Typewriter({
  words,
  className,
  cursorClassName,
  typeSpeed = 75,
  deleteSpeed = 38,
  pauseMs = 1900,
}: TypewriterProps) {
  const reduced = usePrefersReducedMotion();
  const [text, setText] = React.useState("");

  // Serialise the phrase list so the loop restarts only when content changes,
  // not on every new array identity from the parent.
  const wordsKey = words.join("|");

  React.useEffect(() => {
    if (reduced) return;

    const list = wordsKey.split("|");

    let timer = 0;
    let cancelled = false;
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const tick = () => {
      if (cancelled) return;

      const word = list[wordIndex % list.length] ?? "";
      let delay = deleting ? deleteSpeed : typeSpeed;

      if (!deleting && charIndex === word.length) {
        deleting = true;
        delay = pauseMs;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % list.length;
        delay = typeSpeed;
      } else {
        charIndex += deleting ? -1 : 1;
        setText(word.slice(0, charIndex));
      }

      timer = window.setTimeout(tick, delay);
    };

    timer = window.setTimeout(tick, typeSpeed);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [reduced, wordsKey, typeSpeed, deleteSpeed, pauseMs]);

  const display = reduced ? (words[0] ?? "") : text;

  return (
    <span className={cn("inline-flex items-center", className)}>
      <span aria-live="polite">{display}</span>
      <span
        aria-hidden
        className={cn(
          "animate-caret bg-secondary ml-1 inline-block h-[1em] w-[3px] translate-y-[0.08em] rounded-full",
          cursorClassName,
        )}
      />
    </span>
  );
}
