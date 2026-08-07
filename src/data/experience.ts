import { Database, Layers, Rocket } from "lucide-react";

import type { TimelineItem } from "@/types";

/**
 * Experience timeline.
 *
 * IMPORTANT: only list roles you actually held. Fabricated employers are the
 * single fastest way to fail a background check or an interview follow-up
 * question ("tell me about your time at X").
 *
 * If you have no formal employment yet, that is completely normal — the
 * entries below describe real self-directed engineering work, which is
 * legitimate and verifiable through your GitHub repositories.
 *
 * When you land an internship or role, add it in this shape:
 *
 * {
 *   id: "exp-company",
 *   title: "Your Job Title",
 *   organisation: "Company Name",
 *   period: "2026 - Present",
 *   location: "City, Country",
 *   description: "What the team did and what you owned.",
 *   highlights: ["Specific thing you shipped", "Measurable outcome"],
 *   icon: Rocket,
 *   tags: ["Tech", "You", "Used"],
 *   current: true,
 * }
 */
export const EXPERIENCE: TimelineItem[] = [
  {
    id: "exp-marketplace",
    title: "Multi-Vendor Marketplace",
    organisation: "Self-Directed Project",
    period: "2026",
    location: "Gujarat, India",
    description:
      "Designed and built a marketplace platform separating vendors, wholesalers, administrators and customers into four independent dashboard surfaces.",
    highlights: [
      "Structured an Express API across 10 controllers, 7 Mongoose models and dedicated middleware",
      "Implemented JWT authentication with OTP-verified registration",
      "Built automated commission calculation and Razorpay split settlement",
      "Added an image pipeline using Multer with Sharp optimisation",
    ],
    icon: Layers,
    tags: ["Next.js", "Express", "MongoDB", "Razorpay"],
    current: true,
  },
  {
    id: "exp-shopverse",
    title: "ShopVerse Ecommerce",
    organisation: "Self-Directed Project",
    period: "2026",
    location: "Gujarat, India",
    description:
      "Built a complete storefront and admin system on React and Express, focusing on compliance, security and production-grade fundamentals.",
    highlights: [
      "Implemented GST-compliant invoicing with PDFKit document generation",
      "Added Google OAuth alongside credential authentication",
      "Hardened the API with Helmet, rate limiting and bcrypt password hashing",
      "Used Node's native SQLite driver with WAL journaling and enforced foreign keys",
    ],
    icon: Rocket,
    tags: ["React", "Vite", "Express", "SQLite"],
  },
  {
    id: "exp-dbms",
    title: "University Management System",
    organisation: "Academic Project",
    period: "2024",
    location: "Gujarat, India",
    description:
      "Completed the full database design lifecycle for a university records system, from requirement analysis through to normalisation and reporting.",
    highlights: [
      "Modelled 14 tables with full referential integrity constraints",
      "Normalised the schema to Third Normal Form with no transitive dependencies",
      "Wrote views and stored procedures for GPA and attendance reporting",
      "Added triggers enforcing enrolment capacity and grade validation",
    ],
    icon: Database,
    tags: ["SQL", "MySQL", "ER Modelling", "Normalisation"],
  },
];
