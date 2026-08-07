import {
  Cloud,
  Database,
  Layers,
  PenTool,
  Plug,
  Server,
  Sparkles,
} from "lucide-react";

import type { Service } from "@/types";

export const SERVICES: Service[] = [
  {
    id: "svc-fullstack",
    title: "Full Stack Development",
    description:
      "End-to-end product delivery — architecture, database, API layer, interface and deployment, owned by a single engineer.",
    deliverables: [
      "System architecture and data modelling",
      "Typed API layer with validation",
      "Production frontend implementation",
      "Deployment, monitoring and handover",
    ],
    icon: Sparkles,
    accent: "#7C3AED",
  },
  {
    id: "svc-frontend",
    title: "Frontend Development",
    description:
      "Fast, accessible, pixel-accurate interfaces built with React, Next.js and Tailwind — with motion that serves the product.",
    deliverables: [
      "Responsive component architecture",
      "Design-system implementation",
      "Animation and micro-interactions",
      "Core Web Vitals optimisation",
    ],
    icon: Layers,
    accent: "#06B6D4",
  },
  {
    id: "svc-backend",
    title: "Backend Development",
    description:
      "Secure, well-structured server layers with authentication, authorisation, background jobs and predictable error handling.",
    deliverables: [
      "REST API design and implementation",
      "Auth, sessions and role-based access",
      "Payment and webhook integration",
      "Rate limiting and input validation",
    ],
    icon: Server,
    accent: "#22C55E",
  },
  {
    id: "svc-uiux",
    title: "UI / UX Design",
    description:
      "Interface design grounded in hierarchy, contrast and usability — delivered as production components, not just mockups.",
    deliverables: [
      "Wireframes and high-fidelity design",
      "Design tokens and component library",
      "Accessibility audit and remediation",
      "Interactive prototypes",
    ],
    icon: PenTool,
    accent: "#F472B6",
  },
  {
    id: "svc-api",
    title: "API Integration",
    description:
      "Connecting third-party services — payments, auth providers, mail, analytics and AI — with resilient error handling.",
    deliverables: [
      "Payment gateways (Razorpay, Stripe)",
      "OAuth and identity providers",
      "Transactional email and notifications",
      "Retry, fallback and logging strategy",
    ],
    icon: Plug,
    accent: "#38BDF8",
  },
  {
    id: "svc-database",
    title: "Database Design",
    description:
      "Normalised relational schemas that stay fast as data grows — modelled, indexed and documented properly from day one.",
    deliverables: [
      "ER modelling and normalisation to 3NF",
      "Prisma schema and safe migrations",
      "Query and index optimisation",
      "Backup and recovery strategy",
    ],
    icon: Database,
    accent: "#A78BFA",
  },
  {
    id: "svc-deployment",
    title: "Deployment & DevOps",
    description:
      "Ship confidently with automated pipelines, preview environments, environment management and production monitoring.",
    deliverables: [
      "CI/CD with GitHub Actions",
      "Vercel / edge deployment setup",
      "Domain, DNS and SSL configuration",
      "Error tracking and analytics",
    ],
    icon: Cloud,
    accent: "#FBBF24",
  },
];

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery",
    description:
      "We define the problem, users and success metrics before a single line of code is written.",
  },
  {
    step: "02",
    title: "Architecture",
    description:
      "Data models, API contracts and component structure are designed for the version after next.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "Iterative delivery with weekly demos, preview deployments and continuous feedback.",
  },
  {
    step: "04",
    title: "Launch",
    description:
      "Performance tuning, accessibility passes, production deployment and complete handover.",
  },
] as const;
