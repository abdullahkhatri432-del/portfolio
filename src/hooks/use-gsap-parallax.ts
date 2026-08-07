"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { usePrefersReducedMotion } from "./use-media-query";

interface ParallaxOptions {
  /** Vertical travel in pixels across the full scroll range. */
  distance?: number;
  /** Higher values feel heavier / slower to catch up. */
  scrub?: number | boolean;
}

/**
 * GSAP ScrollTrigger parallax for a single element.
 * Registers the plugin lazily on the client and cleans up its own triggers.
 */
export function useGsapParallax<T extends HTMLElement>({
  distance = 80,
  scrub = 1,
}: ParallaxOptions = {}) {
  const ref = useRef<T>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || reduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.fromTo(
        element,
        { y: -distance / 2 },
        {
          y: distance / 2,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub,
          },
        },
      );
    });

    return () => context.revert();
  }, [distance, scrub, reduced]);

  return ref;
}
