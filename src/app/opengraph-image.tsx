import { ImageResponse } from "next/og";

import { siteConfig } from "@/constants/site";

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Dynamically generated Open Graph / Twitter card. */
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#050816",
        padding: "72px",
        position: "relative",
        fontFamily: "sans-serif",
      }}
    >
      {/* Glow blobs */}
      <div
        style={{
          position: "absolute",
          top: -260,
          left: -180,
          width: 700,
          height: 700,
          borderRadius: 9999,
          background:
            "radial-gradient(circle, rgba(124,58,237,0.55), transparent 65%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -300,
          right: -200,
          width: 720,
          height: 720,
          borderRadius: 9999,
          background:
            "radial-gradient(circle, rgba(6,182,212,0.42), transparent 65%)",
        }}
      />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 22,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
            fontSize: 30,
            fontWeight: 700,
            color: "#fff",
          }}
        >
          {siteConfig.initials}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 26, color: "#fff", fontWeight: 600 }}>
            {siteConfig.name}
          </span>
          <span style={{ fontSize: 18, color: "#94A3B8" }}>
            {siteConfig.location}
          </span>
        </div>
      </div>

      {/* Title */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "10px 22px",
            borderRadius: 999,
            border: "1px solid rgba(34,197,94,0.35)",
            background: "rgba(34,197,94,0.10)",
            alignSelf: "flex-start",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#22C55E",
            }}
          />
          <span style={{ fontSize: 18, color: "#86EFAC" }}>
            {siteConfig.availability}
          </span>
        </div>

        <span
          style={{
            fontSize: 78,
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
          }}
        >
          {siteConfig.role}
        </span>

        <span
          style={{
            fontSize: 30,
            color: "#94A3B8",
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          {siteConfig.tagline}
        </span>
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 32,
          borderTop: "1px solid rgba(255,255,255,0.10)",
        }}
      >
        <div style={{ display: "flex", gap: 14 }}>
          {["Next.js", "TypeScript", "PostgreSQL", "Prisma"].map((tech) => (
            <div
              key={tech}
              style={{
                padding: "10px 20px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.05)",
                fontSize: 20,
                color: "#E2E8F0",
              }}
            >
              {tech}
            </div>
          ))}
        </div>

        <span style={{ fontSize: 22, color: "#67E8F9" }}>
          {siteConfig.url.replace("https://", "")}
        </span>
      </div>
    </div>,
    { ...size },
  );
}
