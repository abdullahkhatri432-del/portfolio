import type { Metadata, Viewport } from "next";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { Providers } from "@/components/providers";
import { fontVariables } from "@/lib/fonts";
import { baseMetadata, buildJsonLd } from "@/lib/metadata";

import "./globals.css";

export const metadata: Metadata = baseMetadata;

export const viewport: Viewport = {
  themeColor: "#050816",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={fontVariables}>
      <head>
        <script
          type="application/ld+json"
          // Structured data is static and generated server-side.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }}
        />
      </head>
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="focus:bg-primary sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[300] focus:rounded-full focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to main content
        </a>

        <AuroraBackground />

        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
