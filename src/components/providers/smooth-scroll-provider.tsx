"use client";

import * as React from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { lenisStore } from "@/lib/lenis-store";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

/**
 * Initialises Lenis smooth scrolling, keeps GSAP ScrollTrigger in sync with
 * the virtual scroll position, and publishes the instance to the external
 * store consumed by `useLenis()`.
 */
export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduced = usePrefersReducedMotion();

  React.useEffect(() => {
    if (reduced) return;

    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      syncTouch: false,
    });

    lenisStore.set(instance);

    // Lenis hijacks the scroll position, so ScrollTrigger must be told to
    // recalculate on every virtual scroll frame.
    gsap.registerPlugin(ScrollTrigger);
    const onScroll = () => ScrollTrigger.update();
    instance.on("scroll", onScroll);

    let raf = 0;
    const loop = (time: number) => {
      instance.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      instance.off("scroll", onScroll);
      instance.destroy();
      lenisStore.set(null);
    };
  }, [reduced]);

  return <>{children}</>;
}
