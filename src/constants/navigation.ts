import type { NavItem } from "@/types";

/** Primary in-page navigation. Each href maps to a section id. */
export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

/** Extra links surfaced inside the footer. */
export const FOOTER_LINKS: { title: string; items: NavItem[] }[] = [
  {
    title: "Explore",
    items: [
      { label: "About", href: "#about" },
      { label: "Skills", href: "#skills" },
      { label: "Projects", href: "#projects" },
      { label: "Experience", href: "#experience" },
    ],
  },
  {
    title: "More",
    items: [
      { label: "Certifications", href: "#certifications" },
      { label: "Achievements", href: "#achievements" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "GitHub Stats", href: "#github" },
    ],
  },
  {
    title: "Work",
    items: [
      { label: "Services", href: "#services" },
      { label: "Tech Stack", href: "#stack" },
      { label: "Contact", href: "#contact" },
      { label: "Hire Me", href: "#contact" },
    ],
  },
];

/** Section ids observed by the scroll spy. */
export const SECTION_IDS = [
  "home",
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
] as const;

export type SectionId = (typeof SECTION_IDS)[number];
