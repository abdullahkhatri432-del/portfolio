/**
 * Minimal in-memory fixed-window rate limiter.
 * Suitable for a single-instance deployment; swap for Upstash/Redis if the
 * app is scaled horizontally.
 */

interface Bucket {
  count: number;
  expiresAt: number;
}

const buckets = new Map<string, Bucket>();

const WINDOW_MS = 60_000 * 10; // 10 minutes
const MAX_REQUESTS = 5;

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

export function rateLimit(identifier: string): RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(identifier);

  // Opportunistically clear expired entries so the map cannot grow unbounded.
  if (buckets.size > 500) {
    for (const [key, value] of buckets) {
      if (value.expiresAt <= now) buckets.delete(key);
    }
  }

  if (!bucket || bucket.expiresAt <= now) {
    buckets.set(identifier, { count: 1, expiresAt: now + WINDOW_MS });
    return {
      success: true,
      remaining: MAX_REQUESTS - 1,
      retryAfterSeconds: 0,
    };
  }

  if (bucket.count >= MAX_REQUESTS) {
    return {
      success: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil((bucket.expiresAt - now) / 1000),
    };
  }

  bucket.count += 1;
  return {
    success: true,
    remaining: MAX_REQUESTS - bucket.count,
    retryAfterSeconds: 0,
  };
}
