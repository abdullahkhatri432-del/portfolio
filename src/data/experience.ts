import { Braces, Code2, Rocket, Users } from "lucide-react";

import type { TimelineItem } from "@/types";

export const EXPERIENCE: TimelineItem[] = [
  {
    id: "exp-freelance-fullstack",
    title: "Freelance Full Stack Developer",
    organisation: "Self-Employed",
    period: "2024 — Present",
    location: "Remote · Gujarat, India",
    description:
      "Designing and shipping complete web platforms for clients — architecture, database modelling, frontend engineering and production deployment.",
    highlights: [
      "Delivered 12+ client projects with a 100% on-time completion rate",
      "Built multi-role commerce platforms with seller and admin dashboards",
      "Cut average page load time by 45% through image, bundle and caching work",
      "Set up CI/CD pipelines that deploy to Vercel on every merge to main",
    ],
    icon: Rocket,
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Vercel"],
    current: true,
  },
  {
    id: "exp-frontend-intern",
    title: "Frontend Developer Intern",
    organisation: "Tech Startup",
    period: "2024",
    location: "Remote",
    description:
      "Worked inside a product team building customer-facing dashboard features in a React and TypeScript codebase.",
    highlights: [
      "Shipped 20+ reusable components into the shared design system",
      "Migrated legacy class components to typed hooks-based components",
      "Improved Lighthouse accessibility score from 74 to 98",
      "Participated in code review, sprint planning and release cycles",
    ],
    icon: Code2,
    tags: ["React", "TypeScript", "Tailwind CSS", "REST APIs"],
  },
  {
    id: "exp-open-source",
    title: "Open Source Contributor",
    organisation: "Community Projects",
    period: "2023 — Present",
    location: "Remote",
    description:
      "Contributing bug fixes, documentation and features to open source libraries in the React and Node ecosystem.",
    highlights: [
      "Merged pull requests across UI and tooling repositories",
      "Authored documentation improvements for setup and API reference",
      "Reviewed community PRs and triaged incoming issues",
    ],
    icon: Braces,
    tags: ["Open Source", "Git", "Documentation"],
  },
  {
    id: "exp-campus-lead",
    title: "Technical Team Lead",
    organisation: "College Developer Community",
    period: "2023 — 2024",
    location: "Gujarat, India",
    description:
      "Led the technical wing of the campus developer community, mentoring juniors and running hands-on web development sessions.",
    highlights: [
      "Mentored 40+ students through their first full stack project",
      "Organised 6 workshops on React, Git and database design",
      "Built and maintained the community's event platform",
    ],
    icon: Users,
    tags: ["Leadership", "Mentoring", "Workshops"],
  },
];
