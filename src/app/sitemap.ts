import type { MetadataRoute } from "next";

import { siteConfig } from "@/constants/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...[
      "about",
      "skills",
      "projects",
      "experience",
      "certifications",
      "achievements",
      "testimonials",
      "services",
      "stack",
      "github",
      "contact",
    ].map((section) => ({
      url: `${siteConfig.url}/#${section}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
