"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribe to a CSS media query.
 * Uses `useSyncExternalStore` so it stays consistent during concurrent
 * rendering and returns `false` on the server (SSR-safe).
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query],
  );

  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** True on small viewports. */
export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 768px)");
}

/** Respects the user's reduced motion preference. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** True when the device has a fine pointer (mouse/trackpad). */
export function useHasPointer(): boolean {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}
