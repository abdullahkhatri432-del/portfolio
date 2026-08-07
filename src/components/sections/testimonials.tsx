"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";

import { TESTIMONIALS } from "@/data/testimonials";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { premiumEase } from "@/utils/motion";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

const AUTOPLAY_MS = 7000;

export function Testimonials() {
  const [[index, direction], setState] = React.useState<[number, number]>([
    0, 0,
  ]);
  const [paused, setPaused] = React.useState(false);
  const reduced = usePrefersReducedMotion();

  const count = TESTIMONIALS.length;
  const active = TESTIMONIALS[index];

  const paginate = React.useCallback(
    (delta: number) => {
      if (count === 0) return;
      setState(([current]) => [(current + delta + count) % count, delta]);
    },
    [count],
  );

  const goTo = React.useCallback((next: number) => {
    setState(([current]) => [next, next > current ? 1 : -1]);
  }, []);

  // Autoplay
  React.useEffect(() => {
    if (paused || reduced || count === 0) return;
    const timer = window.setInterval(() => paginate(1), AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [paused, reduced, count, paginate]);

  // Keyboard navigation
  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft") paginate(-1);
    if (event.key === "ArrowRight") paginate(1);
  };

  // Hide the whole section until there is at least one real testimonial.
  if (!active) return null;

  return (
    <Section id="testimonials">
      <SectionHeading
        eyebrow="Testimonials"
        title="What people say about"
        highlight="working with me"
        description="Feedback from founders, designers and engineering leads I've built alongside."
      />

      <div
        className="relative mt-16"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
        onKeyDown={onKeyDown}
        role="region"
        aria-roledescription="carousel"
        aria-label="Client testimonials"
        tabIndex={0}
      >
        {/* Ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px] transition-colors duration-700"
          style={{ background: `${active.accent}22` }}
        />

        <div className="relative mx-auto max-w-4xl">
          <div className="relative min-h-[26rem] sm:min-h-[22rem]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.figure
                key={active.id}
                custom={direction}
                initial={{
                  opacity: 0,
                  x: direction >= 0 ? 60 : -60,
                  scale: 0.97,
                }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: direction >= 0 ? -60 : 60, scale: 0.97 }}
                transition={{ duration: 0.55, ease: premiumEase }}
                className="glass-strong relative overflow-hidden rounded-3xl p-8 sm:p-12"
              >
                {/* Accent edge */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${active.accent}, transparent)`,
                  }}
                />

                <Quote
                  aria-hidden
                  className="absolute top-6 right-7 size-16 opacity-10"
                  style={{ color: active.accent }}
                />

                {/* Rating */}
                <div className="mb-6 flex gap-1" aria-label="Rated 5 out of 5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-amber-400 text-amber-400"
                      aria-hidden
                    />
                  ))}
                </div>

                <blockquote className="text-lg leading-relaxed font-light text-white/90 sm:text-xl">
                  &ldquo;{active.quote}&rdquo;
                </blockquote>

                <figcaption className="mt-8 flex items-center gap-4">
                  <span
                    className="font-display flex size-12 shrink-0 items-center justify-center rounded-2xl text-sm font-bold text-white ring-1 ring-white/10"
                    style={{
                      background: `linear-gradient(135deg, ${active.accent}, ${active.accent}55)`,
                    }}
                    aria-hidden
                  >
                    {active.initials}
                  </span>
                  <div>
                    <p className="font-display text-base font-semibold text-white">
                      {active.name}
                    </p>
                    <p className="text-muted text-sm">
                      {active.role} · {active.company}
                    </p>
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label="Previous testimonial"
              className="text-muted hover:border-secondary/50 hover:bg-secondary/10 flex size-11 items-center justify-center rounded-full border border-white/12 bg-white/5 transition-all duration-300 hover:text-white"
            >
              <ArrowLeft className="size-4" />
            </button>

            <div className="flex items-center gap-2" role="tablist">
              {TESTIMONIALS.map((testimonial, i) => (
                <button
                  key={testimonial.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Testimonial ${i + 1} of ${count}`}
                  onClick={() => goTo(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-400",
                    i === index
                      ? "from-primary to-secondary w-8 bg-gradient-to-r"
                      : "w-1.5 bg-white/20 hover:bg-white/40",
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label="Next testimonial"
              className="text-muted hover:border-secondary/50 hover:bg-secondary/10 flex size-11 items-center justify-center rounded-full border border-white/12 bg-white/5 transition-all duration-300 hover:text-white"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>

          <p className="text-subtle mt-4 text-center font-mono text-xs">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(count).padStart(2, "0")}
          </p>
        </div>
      </div>
    </Section>
  );
}
