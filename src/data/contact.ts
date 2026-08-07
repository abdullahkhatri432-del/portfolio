import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { siteConfig } from "@/constants/site";
import type { ContactChannel } from "@/types";

export const CONTACT_CHANNELS: ContactChannel[] = [
  {
    label: "Email",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
    icon: Mail,
    note: "Replies within 24 hours",
  },
  {
    label: "Phone",
    value: siteConfig.contact.phone,
    href: `tel:${siteConfig.contact.phoneHref}`,
    icon: Phone,
    note: "Mon — Sat, 10:00 to 20:00 IST",
  },
  {
    label: "Location",
    value: siteConfig.location,
    href: siteConfig.maps.directions,
    icon: MapPin,
    note: "Available remotely worldwide",
  },
  {
    label: "Availability",
    value: siteConfig.availability,
    href: "#contact",
    icon: Clock,
    note: siteConfig.timezone,
  },
];

export const PROJECT_BUDGETS = [
  "Under $500",
  "$500 — $2,000",
  "$2,000 — $5,000",
  "$5,000+",
  "Let's discuss",
] as const;

export const FAQS = [
  {
    question: "What is your typical project timeline?",
    answer:
      "A focused landing page takes 1–2 weeks. A full stack application with dashboards and payments typically runs 6–10 weeks depending on scope. You'll get a detailed timeline after the discovery call.",
  },
  {
    question: "Do you work with existing codebases?",
    answer:
      "Yes. I regularly join existing projects to add features, fix performance problems, migrate legacy code or restructure a database. I start with an audit so we both know what we're dealing with.",
  },
  {
    question: "What do you need from me to start?",
    answer:
      "A description of the problem you're solving, any existing designs or references, and access to relevant accounts. If you don't have designs, I can handle that part too.",
  },
  {
    question: "Are you available for full-time roles?",
    answer:
      "Yes. I'm open to full-time and internship opportunities alongside freelance work — remote or based in Gujarat, India.",
  },
] as const;
