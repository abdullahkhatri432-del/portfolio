import { cn } from "@/lib/utils";

/**
 * Ambient page background: animated aurora blobs, grid, vignette and noise.
 * Purely decorative and fully CSS-driven (no JS cost).
 */
export function AuroraBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "bg-background pointer-events-none fixed inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      {/* Grid */}
      <div className="grid-bg absolute inset-0 opacity-60" />

      {/* Aurora blobs */}
      <div
        className="animate-aurora absolute -top-[22rem] -left-[16rem] size-[46rem] rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.42), transparent 65%)",
        }}
      />
      <div
        className="animate-aurora absolute top-[18%] -right-[18rem] size-[42rem] rounded-full blur-[150px]"
        style={{
          background:
            "radial-gradient(circle, rgba(6,182,212,0.32), transparent 65%)",
          animationDelay: "-6s",
        }}
      />
      <div
        className="animate-aurora absolute bottom-[-20rem] left-[22%] size-[44rem] rounded-full blur-[160px]"
        style={{
          background:
            "radial-gradient(circle, rgba(34,197,94,0.18), transparent 65%)",
          animationDelay: "-11s",
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#050816_92%)]" />

      {/* Noise */}
      <div className="noise absolute inset-0" />
    </div>
  );
}
