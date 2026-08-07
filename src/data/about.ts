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

/**
 * Keep this bio honest about your stage. "Building toward" reads far better
 * to an experienced engineer than an inflated claim they can disprove in one
 * click, and it sets up interviews you can actually win.
 */
export const BIO_PARAGRAPHS: string[] = [
  "I'm Abdullah Khatri, a Full Stack Developer from Gujarat, India, currently studying Information Technology and building web applications end to end — from database schemas and API layers through to the interface.",
  "I learn by shipping complete systems rather than tutorials. That has meant working through the parts most side projects skip: role-based authentication, payment integration with signature verification, commission splitting across vendors, GST-compliant invoicing, and normalising a database properly instead of bolting tables together.",
  "Most of my work sits in the React, Next.js, Express and SQL ecosystem. I'm actively looking for internships, entry-level roles and freelance work where I can learn from people more experienced than me and contribute real code.",
];

/**
 * Keep every figure below verifiable. Anyone can open your GitHub profile,
 * so these should track reality rather than ambition.
 */
export const ABOUT_STATS: Stat[] = [
  { label: "Projects Shipped", value: 5, suffix: "" },
  { label: "Full Stack Apps", value: 4, suffix: "" },
  { label: "Technologies Used", value: 20, suffix: "+" },
  { label: "Database Tables Modelled", value: 14, suffix: "" },
];

export const HERO_STATS: Stat[] = [
  { label: "Projects Shipped", value: 5, suffix: "" },
  { label: "Full Stack Apps", value: 4, suffix: "" },
  { label: "Technologies Used", value: 20, suffix: "+" },
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

/**
 * `score` is optional — the UI omits it entirely when absent, which is far
 * better than displaying a placeholder or an unverifiable figure. Add your
 * real CGPA and school details when you have them to hand.
 */
export const EDUCATION: EducationItem[] = [
  {
    id: "edu-btech",
    degree: "B.E. — Information Technology",
    institution: "C.K. Pithawala College of Engineering & Technology",
    location: "Surat, Gujarat · Gujarat Technological University",
    period: "2022 — 2026",
    score: "CGPA 8.40 / 10",
    focus: [
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Operating Systems",
      "Computer Networks",
      "Software Engineering",
    ],
  },
  {
    id: "edu-diploma",
    degree: "Diploma — Information Technology",
    institution: "Government Polytechnic Valsad",
    location: "Valsad, Gujarat",
    period: "2019 — 2022",
    score: "CGPA 8.80 / 10",
    focus: [
      "Advanced Database",
      "JavaScript",
      "Web Development",
      "Cyber Security",
    ],
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
    title: "Ship Complete Systems",
    description:
      "Every project goes the whole distance — auth, payments, admin surfaces and deployment, not just the happy-path UI.",
    icon: Rocket,
  },
  {
    title: "Type Safe Where It Counts",
    description:
      "TypeScript across the frontend, with validated API boundaries and schemas that make invalid states hard to represent.",
    icon: Target,
  },
  {
    title: "Study Alongside Building",
    description:
      "Balancing an Information Technology degree with self-directed project work, applying coursework like DBMS and web development directly to real builds.",
    icon: GraduationCap,
  },
  {
    title: "Learn the Unglamorous Parts",
    description:
      "Commission splits, GST invoicing, webhook verification, rate limiting — the details that separate a demo from a product.",
    icon: Trophy,
  },
];

export const FUN_FACTS: FunFact[] = [
  { label: "Fuel of choice", value: "Cold brew, 3 cups a day", icon: Coffee },
  { label: "Peak focus", value: "11 PM — 3 AM", icon: Music4 },
  { label: "Off the clock", value: "Competitive FPS & chess", icon: Gamepad2 },
  { label: "Keyboard", value: "65% custom, tactile switches", icon: Terminal },
];
