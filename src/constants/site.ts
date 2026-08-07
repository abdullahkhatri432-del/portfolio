/**
 * Central site configuration.
 * Every value can be overridden with an environment variable so the portfolio
 * can be deployed without touching the source code.
 */

const env = (key: string, fallback: string) => {
  const value = process.env[key];
  return value && value.trim().length > 0 ? value.trim() : fallback;
};

export const GITHUB_USERNAME = env(
  "NEXT_PUBLIC_GITHUB_USERNAME",
  "abdullahkhatri",
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
  yearsOfExperience: 3,
  url: env("NEXT_PUBLIC_SITE_URL", "https://abdullahkhatri.vercel.app"),
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
