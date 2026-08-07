import {
  Coffee,
  Gamepad2,
  GraduationCap,
  Music4,
  Rocket,
  Server,
  Sparkles,
  Target,
  Terminal,
  Trophy,
} from "lucide-react";

import type { EducationItem, FunFact, Stat, TimelineItem } from "@/types";

export const BIO_PARAGRAPHS: string[] = [
  "I'm Abdullah Khatri, a Full Stack Developer from Gujarat, India. I design and engineer web products end to end — from database schemas and typed API layers to pixel-precise interfaces that feel effortless to use.",
  "My work sits at the intersection of performance and craft. I care deeply about sub-second load times, accessible markup, and interfaces that hold up under real traffic — but equally about the micro-interactions that make a product memorable.",
  "Most of my time is spent in the Next.js, TypeScript, PostgreSQL and Prisma ecosystem, shipping production platforms like ShopSphere and GameVault Pro. I'm currently open to freelance work, internships and full-time roles where I can build things people genuinely enjoy using.",
];

export const ABOUT_STATS: Stat[] = [
  { label: "Years Building", value: 3, suffix: "+" },
  { label: "Projects Shipped", value: 25, suffix: "+" },
  { label: "Technologies", value: 30, suffix: "+" },
  { label: "Commits Pushed", value: 2400, suffix: "+" },
];

export const HERO_STATS: Stat[] = [
  { label: "Years of Experience", value: 3, suffix: "+" },
  { label: "Projects Delivered", value: 25, suffix: "+" },
  { label: "Client Satisfaction", value: 100, suffix: "%" },
];

export const JOURNEY: TimelineItem[] = [
  {
    id: "journey-first-line",
    title: "First Line of Code",
    organisation: "Self-taught",
    period: "2021",
    location: "Gujarat, India",
    description:
      "Started with HTML, CSS and vanilla JavaScript, rebuilding interfaces I admired until they behaved exactly like the originals.",
    highlights: [
      "Built 15+ static clones to internalise layout systems",
      "Learned the DOM, events and the fundamentals of the browser",
    ],
    icon: Terminal,
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: "journey-react",
    title: "Into the React Ecosystem",
    organisation: "Personal Projects",
    period: "2022",
    location: "Gujarat, India",
    description:
      "Moved from static pages to component architecture — state management, data fetching, routing, and the discipline of reusable UI.",
    highlights: [
      "Adopted TypeScript as the default for every new project",
      "Shipped the first full CRUD dashboard with authentication",
    ],
    icon: Sparkles,
    tags: ["React", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "journey-fullstack",
    title: "Full Stack & Databases",
    organisation: "Freelance",
    period: "2023",
    location: "Remote",
    description:
      "Extended into the backend: relational modelling, normalisation, Prisma, secure auth flows and payment integrations.",
    highlights: [
      "Designed normalised PostgreSQL schemas up to 3NF",
      "Integrated Razorpay checkout with webhook verification",
    ],
    icon: Server,
    tags: ["Node.js", "PostgreSQL", "Prisma"],
  },
  {
    id: "journey-product",
    title: "Product-Grade Engineering",
    organisation: "ShopSphere · GameVault Pro",
    period: "2024 — Present",
    location: "Remote",
    description:
      "Building multi-role commerce platforms with seller and admin dashboards, order pipelines, analytics and edge-deployed frontends.",
    highlights: [
      "Sub-second LCP on all core routes",
      "Role-based access control across three dashboard surfaces",
      "CI/CD pipelines deploying to Vercel on every merge",
    ],
    icon: Rocket,
    tags: ["Next.js", "Architecture", "DevOps"],
    current: true,
  },
];

export const EDUCATION: EducationItem[] = [
  {
    id: "edu-btech",
    degree: "B.Tech — Computer Science & Engineering",
    institution: "Gujarat Technological University",
    period: "2022 — 2026",
    score: "Current CGPA 8.6 / 10",
    focus: [
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Operating Systems",
      "Computer Networks",
      "Software Engineering",
    ],
  },
  {
    id: "edu-hsc",
    degree: "Higher Secondary — Science (PCM)",
    institution: "Gujarat Board",
    period: "2020 — 2022",
    score: "88.4%",
    focus: ["Mathematics", "Physics", "Computer Fundamentals"],
  },
];

export const GOALS: { title: string; description: string }[] = [
  {
    title: "Ship at Scale",
    description:
      "Join a product team where the code I write is used by hundreds of thousands of people every day.",
  },
  {
    title: "Systems Depth",
    description:
      "Go deeper into distributed systems, caching strategies and database internals beyond application-level work.",
  },
  {
    title: "Open Source",
    description:
      "Maintain a widely used developer tool and contribute meaningfully to the Next.js ecosystem.",
  },
  {
    title: "Design Engineering",
    description:
      "Keep closing the gap between design and engineering — motion, accessibility and craft as first-class concerns.",
  },
];

export const HIGHLIGHTS: {
  title: string;
  description: string;
  icon: typeof Trophy;
}[] = [
  {
    title: "Performance First",
    description:
      "Lighthouse 95+ across performance, accessibility, best practices and SEO on every project I ship.",
    icon: Rocket,
  },
  {
    title: "Type Safe End to End",
    description:
      "Strict TypeScript from the database schema through the API layer to every React component prop.",
    icon: Target,
  },
  {
    title: "Academic Consistency",
    description:
      "Maintaining an 8.6 CGPA while shipping production applications and freelance client work.",
    icon: GraduationCap,
  },
  {
    title: "Delivery Record",
    description:
      "25+ projects delivered on schedule with zero critical production incidents to date.",
    icon: Trophy,
  },
];

export const FUN_FACTS: FunFact[] = [
  { label: "Fuel of choice", value: "Cold brew, 3 cups a day", icon: Coffee },
  { label: "Peak focus", value: "11 PM — 3 AM", icon: Music4 },
  { label: "Off the clock", value: "Competitive FPS & chess", icon: Gamepad2 },
  { label: "Keyboard", value: "65% custom, tactile switches", icon: Terminal },
];
