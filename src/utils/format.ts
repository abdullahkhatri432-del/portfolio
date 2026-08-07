/** Small formatting helpers shared across the UI. */

/** Compact number formatting (1200 -> 1.2K). */
export function formatCompact(value: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

/** Zero padded index used by section/list counters. */
export function padIndex(index: number, size = 2): string {
  return String(index + 1).padStart(size, "0");
}

/** Build initials from a full name. */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/** Clamp a number between a min and max. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Linear interpolation. */
export function lerp(start: number, end: number, amount: number): number {
  return start + (end - start) * amount;
}

/** Current year, used by the footer. */
export function currentYear(): number {
  return new Date().getFullYear();
}
