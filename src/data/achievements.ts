import { Code2, Database, Layers, Trophy } from "lucide-react";

import type { Achievement, Stat } from "@/types";

/**
 * Achievements and milestones.
 *
 * IMPORTANT: keep every number here defensible. A recruiter can open your
 * GitHub profile in one click, so inflated counters are actively harmful.
 * Update these as they become true rather than aspiring upward.
 *
 * Both the counters and the badge grid hide themselves when empty.
 */

/** Headline counters. Verify each against your real GitHub/project history. */
export const ACHIEVEMENT_COUNTERS: Stat[] = [
  { label: "Projects Shipped", value: 5, suffix: "" },
  { label: "Full Stack Applications", value: 4, suffix: "" },
  { label: "Technologies Used", value: 20, suffix: "+" },
];

/** Notable milestones. Only include things that actually happened. */
export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "ach-fullstack-shipped",
    title: "Four Full Stack Apps Shipped",
    description:
      "Built and deployed ShopSphere, GameVault Pro, a multi-vendor marketplace and ShopVerse — each with authentication, payments and an admin surface.",
    date: "2026",
    icon: Layers,
    accent: "#7C3AED",
  },
  {
    id: "ach-multi-role",
    title: "Four-Role Platform Architecture",
    description:
      "Designed a marketplace with separate vendor, wholesaler, admin and customer dashboards, including automated commission splits and payout settlement.",
    date: "2026",
    icon: Trophy,
    accent: "#F472B6",
  },
  {
    id: "ach-dbms",
    title: "Database Normalised to 3NF",
    description:
      "Modelled a university management schema across 14 tables with full referential integrity, stored procedures and triggers, normalised to Third Normal Form.",
    date: "2024",
    icon: Database,
    accent: "#22C55E",
  },
  {
    id: "ach-payments",
    title: "Production Payment Integration",
    description:
      "Implemented Razorpay checkout with signature verification, webhook handling and automated marketplace fee splitting across multiple projects.",
    date: "2026",
    icon: Code2,
    accent: "#06B6D4",
  },
];
