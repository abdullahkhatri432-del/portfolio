import {
  Award,
  Code2,
  GitBranch,
  Medal,
  Star,
  Trophy,
  Users,
  Zap,
} from "lucide-react";

import type { Achievement, Stat } from "@/types";

export const ACHIEVEMENT_COUNTERS: Stat[] = [
  { label: "Projects Completed", value: 25, suffix: "+" },
  { label: "GitHub Contributions", value: 2400, suffix: "+" },
  { label: "Students Mentored", value: 40, suffix: "+" },
  { label: "Technologies Mastered", value: 30, suffix: "+" },
  { label: "Client Satisfaction", value: 100, suffix: "%" },
  { label: "Avg Lighthouse Score", value: 96, suffix: "/100" },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "ach-hackathon",
    title: "Hackathon Finalist",
    description:
      "Reached the final round of an inter-college hackathon with a full stack solution built and deployed in 36 hours.",
    date: "2024",
    icon: Trophy,
    accent: "#F59E0B",
  },
  {
    id: "ach-dsa",
    title: "500+ DSA Problems Solved",
    description:
      "Consistent problem solving across arrays, graphs, dynamic programming and system design fundamentals.",
    date: "2023 — Present",
    icon: Code2,
    accent: "#7C3AED",
  },
  {
    id: "ach-streak",
    title: "365-Day Commit Streak",
    description:
      "A full year of daily contributions across personal projects, client work and open source repositories.",
    date: "2024",
    icon: GitBranch,
    accent: "#22C55E",
  },
  {
    id: "ach-mentor",
    title: "Mentored 40+ Developers",
    description:
      "Guided junior students from their first component to a deployed full stack application.",
    date: "2023 — 2024",
    icon: Users,
    accent: "#06B6D4",
  },
  {
    id: "ach-performance",
    title: "Perfect Lighthouse Run",
    description:
      "Achieved a 100 score across performance, accessibility, best practices and SEO on a production deployment.",
    date: "2025",
    icon: Zap,
    accent: "#38BDF8",
  },
  {
    id: "ach-academic",
    title: "Academic Excellence Award",
    description:
      "Recognised for maintaining top-decile academic performance alongside active project delivery.",
    date: "2024",
    icon: Medal,
    accent: "#F472B6",
  },
  {
    id: "ach-review",
    title: "Top Rated Freelancer",
    description:
      "Maintained a 5-star average across every completed freelance engagement.",
    date: "2025",
    icon: Star,
    accent: "#FACC15",
  },
  {
    id: "ach-community",
    title: "Community Speaker",
    description:
      "Delivered six technical workshops on modern web development to a combined audience of 200+ students.",
    date: "2024",
    icon: Award,
    accent: "#A78BFA",
  },
];
