"use client";

import { useSyncExternalStore } from "react";
import type Lenis from "lenis";

import { lenisStore } from "@/lib/lenis-store";

/** Access the shared Lenis instance created by SmoothScrollProvider. */
export function useLenis(): Lenis | null {
  return useSyncExternalStore(
    lenisStore.subscribe,
    lenisStore.getSnapshot,
    lenisStore.getServerSnapshot,
  );
}

/**
 * Smooth scroll to a hash target (or the page top) using Lenis when available,
 * falling back to the native API.
 */
export function scrollToSection(
  lenis: Lenis | null,
  target: string,
  offset = -80,
) {
  if (target === "#" || target === "#home" || target === "top") {
    if (lenis) lenis.scrollTo(0, { duration: 1.3 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const el = document.querySelector<HTMLElement>(target);
  if (!el) return;

  if (lenis) {
    lenis.scrollTo(el, { offset, duration: 1.3 });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
}
