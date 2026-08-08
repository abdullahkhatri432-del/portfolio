/**
 * Central site configuration.
 * Every value can be overridden with an environment variable so the portfolio
 * can be deployed without touching the source code.
 */

const env = (key: string, fallback: string) => {
  const value = process.env[key];
  return value && value.trim().length > 0 ? value.trim() : fallback;
};

/**
 * Resolve the canonical site URL.
 *
 * Vercel assigns a new hostname on most deployments, so hard-coding it in an
 * environment variable means canonical tags and Open Graph URLs drift out of
 * date every time the project is redeployed.
 *
 * Resolution order:
 *   1. NEXT_PUBLIC_SITE_URL — an explicit custom domain, when one is set
 *   2. VERCEL_PROJECT_PRODUCTION_URL — the stable production hostname,
 *      injected by Vercel and unchanged across deployments
 *   3. VERCEL_URL — the per-deployment hostname, used for previews
 *   4. localhost, for development
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");

  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (production) return `https://${production}`;

  const deployment = process.env.VERCEL_URL?.trim();
  if (deployment) return `https://${deployment}`;

  return "http://localhost:3000";
}

export const GITHUB_USERNAME = env(
  "NEXT_PUBLIC_GITHUB_USERNAME",
  "abdullahkhatri432-del",
);

export const LINKEDIN_USERNAME = env(
  "NEXT_PUBLIC_LINKEDIN_USERNAME",
  "abdullahkhatri",
);

export const siteConfig = {
  name: "Abdullah Khatri",
  shortName: "Abdullah",
  initials: "AK",
  role: "Full Stack Developer",
  tagline: "Building fast, scalable and beautiful web applications.",
  description:
    "Abdullah Khatri is a Full Stack Developer from Gujarat, India, crafting fast, scalable and beautiful web applications with Next.js, TypeScript, PostgreSQL and modern cloud infrastructure.",
  location: "Gujarat, India",
  timezone: "IST (UTC+5:30)",
  availability: "Available for new projects",
  /**
   * Number of full stack applications shipped. Shown as a badge on the hero
   * portrait. Bump this as you ship more — keep it honest and verifiable.
   */
  projectsShipped: 5,
  url: resolveSiteUrl(),
  ogImage: "/opengraph-image",
  keywords: [
    "Abdullah Khatri",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript Developer",
    "Web Developer Gujarat",
    "Portfolio",
    "PostgreSQL",
    "Prisma",
    "Tailwind CSS",
  ],
  contact: {
    email: env("NEXT_PUBLIC_CONTACT_EMAIL", "abdullahkhatri432@gmail.com"),
    phone: env("NEXT_PUBLIC_CONTACT_PHONE", "+91 81605 87811"),
    phoneHref: env("NEXT_PUBLIC_CONTACT_PHONE_HREF", "+918160587811"),
  },
  links: {
    github: env(
      "NEXT_PUBLIC_GITHUB_URL",
      `https://github.com/${GITHUB_USERNAME}`,
    ),
    linkedin: env(
      "NEXT_PUBLIC_LINKEDIN_URL",
      `https://linkedin.com/in/${LINKEDIN_USERNAME}`,
    ),
    twitter: env("NEXT_PUBLIC_TWITTER_URL", "https://x.com/abdullahkhatri"),
    resume: env("NEXT_PUBLIC_RESUME_URL", "/resume/abdullah-khatri-resume.pdf"),
    calendar: env("NEXT_PUBLIC_CALENDAR_URL", "#contact"),
  },
  maps: {
    // Keyless Google Maps embed centred on Gujarat, India.
    embed: "https://www.google.com/maps?q=Gujarat,India&z=7&output=embed&hl=en",
    directions: "https://www.google.com/maps/place/Gujarat,+India",
  },
} as const;

export type SiteConfig = typeof siteConfig;
