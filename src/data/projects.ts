import { siteConfig } from "@/constants/site";
import type { Project } from "@/types";

export const PROJECTS: Project[] = [
  {
    id: "shopsphere",
    slug: "shopsphere",
    title: "ShopSphere",
    tagline: "Full Stack Ecommerce Platform",
    category: "Ecommerce",
    year: "2025",
    status: "Live",
    featured: true,
    description:
      "A production-grade multi-vendor commerce platform with independent seller and admin dashboards, secure payments and a fully typed data layer.",
    longDescription:
      "ShopSphere is a complete commerce system built around three distinct roles — customer, seller and administrator. Sellers manage catalogues, inventory and payouts; administrators moderate listings and monitor platform-wide analytics; customers get a fast storefront with persistent carts, saved addresses and real-time order tracking. Payments run through Razorpay with signature-verified webhooks, and every database access goes through a normalised Prisma schema on PostgreSQL.",
    features: [
      "Multi-vendor marketplace with isolated seller workspaces",
      "Seller dashboard: products, inventory, orders, revenue analytics",
      "Admin dashboard: user moderation, catalogue approval, platform metrics",
      "Razorpay checkout with signature-verified webhooks",
      "Role-based authentication with protected server routes",
      "Faceted search, filtering and sorting across the catalogue",
      "Persistent cart, wishlist and multi-address checkout",
      "Order lifecycle with status timeline and email notifications",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Prisma",
      "Auth.js",
      "Razorpay",
      "Vercel",
    ],
    metrics: [
      { label: "Lighthouse", value: "96" },
      { label: "Data Models", value: "18" },
      { label: "Dashboards", value: "3" },
    ],
    gradient: "from-violet-600/25 via-fuchsia-500/10 to-transparent",
    accent: "#7C3AED",
    image: "/projects/shopsphere.svg",
    links: {
      github: `${siteConfig.links.github}/shopsphere`,
      demo: "https://shopsphere-demo.vercel.app",
    },
  },
  {
    id: "gamevault-pro",
    slug: "gamevault-pro",
    title: "GameVault Pro",
    tagline: "Gaming Marketplace",
    category: "Marketplace",
    year: "2025",
    status: "Live",
    featured: true,
    description:
      "A digital game marketplace with instant key delivery, community reviews, wishlists and end-to-end order tracking.",
    longDescription:
      "GameVault Pro is a storefront for digital game keys, built for speed and trust. The catalogue supports genre and platform filtering, price history and rating aggregation. Authenticated users maintain wishlists, publish verified-purchase reviews, and follow their orders through a live status timeline. Razorpay handles payments, while a normalised PostgreSQL schema keeps inventory, licences and refunds consistent under concurrency.",
    features: [
      "Digital key inventory with instant post-payment delivery",
      "Verified-purchase review and rating system",
      "Wishlist with price-drop tracking",
      "Order tracking timeline with status transitions",
      "Razorpay payments and automated refund handling",
      "Genre, platform and price faceted filtering",
      "Personalised recommendations from purchase history",
      "Admin catalogue and inventory management",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Prisma",
      "Auth.js",
      "Razorpay",
      "Vercel",
    ],
    metrics: [
      { label: "Catalogue", value: "500+" },
      { label: "Avg TTFB", value: "180ms" },
      { label: "Test Coverage", value: "78%" },
    ],
    gradient: "from-cyan-500/25 via-sky-500/10 to-transparent",
    accent: "#06B6D4",
    image: "/projects/gamevault-pro.svg",
    links: {
      github: `${siteConfig.links.github}/gamevault-pro`,
      demo: "https://gamevault-pro-demo.vercel.app",
    },
  },
  {
    id: "university-management-system",
    slug: "university-management-system",
    title: "University Management System",
    tagline: "Database Management Systems Project",
    category: "Database Design",
    year: "2024",
    status: "Completed",
    featured: true,
    description:
      "A fully normalised relational database modelling students, faculty, courses, enrolments, attendance and results — designed to 3NF.",
    longDescription:
      "An academic DBMS project covering the full design lifecycle: requirement analysis, entity-relationship modelling, relational mapping and normalisation to Third Normal Form. The schema captures departments, programmes, students, faculty, courses, semesters, enrolments, attendance and results, with referential integrity enforced through foreign keys and validated by triggers. Complex reporting — GPA computation, attendance shortfall detection and faculty workload — is handled by parameterised SQL views and stored procedures.",
    features: [
      "Complete ER diagram with cardinality and participation constraints",
      "Relational schema normalised to 3NF with no transitive dependencies",
      "Full CRUD operations for every core entity",
      "Views and stored procedures for GPA and attendance reporting",
      "Triggers enforcing enrolment capacity and grade validation",
      "Indexed foreign keys for fast multi-table joins",
      "Transaction-safe result publication workflow",
      "Sample dataset with realistic academic records",
    ],
    stack: [
      "SQL",
      "MySQL",
      "ER Modelling",
      "Normalisation (3NF)",
      "Stored Procedures",
      "Triggers",
      "Indexing",
    ],
    metrics: [
      { label: "Tables", value: "14" },
      { label: "Normal Form", value: "3NF" },
      { label: "Queries", value: "40+" },
    ],
    gradient: "from-emerald-500/25 via-teal-500/10 to-transparent",
    accent: "#22C55E",
    image: "/projects/university-management-system.svg",
    links: {
      github: `${siteConfig.links.github}/university-management-system`,
    },
  },
  {
    id: "next-build",
    slug: "next-build",
    title: "Next Project",
    tagline: "Currently in the workshop",
    category: "Coming Soon",
    year: "2026",
    status: "Planned",
    featured: false,
    description:
      "Reserved space for the next build — an AI-assisted developer tool currently in design. Have something in mind? Let's build it together.",
    longDescription:
      "This slot is intentionally open. I'm currently exploring an AI-assisted developer productivity tool, and I'm also available for client and collaboration work. If you have a product idea that needs an engineer who can handle design, frontend, backend and deployment, this is where your project could live.",
    features: [
      "Open for collaboration and client work",
      "Full stack architecture and delivery",
      "Design-to-production ownership",
    ],
    stack: ["Next.js", "TypeScript", "AI SDK", "PostgreSQL"],
    metrics: [
      { label: "Status", value: "Open" },
      { label: "Start", value: "2026" },
    ],
    gradient: "from-slate-500/20 via-slate-400/5 to-transparent",
    accent: "#94A3B8",
    image: "/projects/coming-soon.svg",
    links: {},
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}
