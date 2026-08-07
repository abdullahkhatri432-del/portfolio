import type Lenis from "lenis";

type Listener = () => void;

/**
 * Tiny external store holding the active Lenis instance.
 * Living outside React lets components subscribe with `useSyncExternalStore`
 * instead of setting state from inside an effect.
 */
let instance: Lenis | null = null;
const listeners = new Set<Listener>();

export const lenisStore = {
  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  getSnapshot(): Lenis | null {
    return instance;
  },
  getServerSnapshot(): Lenis | null {
    return null;
  },
  set(next: Lenis | null) {
    if (instance === next) return;
    instance = next;
    listeners.forEach((listener) => listener());
  },
};
