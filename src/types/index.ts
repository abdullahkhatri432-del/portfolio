import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";

/** Generic icon accepted across the design system. */
export type AnyIcon = LucideIcon | IconType;

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  handle: string;
  icon: AnyIcon;
}

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

export interface TimelineItem {
  id: string;
  title: string;
  organisation: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  icon: AnyIcon;
  tags: string[];
  current?: boolean;
}

export type SkillCategory =
  | "Frontend"
  | "Backend"
  | "Database"
  | "Cloud"
  | "DevOps"
  | "Tools"
  | "Languages"
  | "Frameworks";

export interface Skill {
  name: string;
  level: number;
  icon: AnyIcon;
  color: string;
}

export interface SkillGroup {
  category: SkillCategory;
  description: string;
  icon: AnyIcon;
  accent: string;
  skills: Skill[];
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: string;
  year: string;
  status: "Live" | "In Development" | "Completed" | "Planned";
  featured: boolean;
  description: string;
  longDescription: string;
  features: string[];
  stack: string[];
  metrics: ProjectMetric[];
  gradient: string;
  accent: string;
  image: string;
  links: {
    github?: string;
    demo?: string;
  };
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  skills: string[];
  url: string;
  accent: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: AnyIcon;
  accent: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  accent: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  icon: AnyIcon;
  accent: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  score: string;
  focus: string[];
}

export interface FunFact {
  label: string;
  value: string;
  icon: AnyIcon;
}

export interface ContactChannel {
  label: string;
  value: string;
  href: string;
  icon: AnyIcon;
  note: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}
