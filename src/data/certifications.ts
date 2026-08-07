import type { Certification } from "@/types";

/**
 * Professional certifications.
 *
 * IMPORTANT: only list credentials you actually hold. `credentialId` and
 * `url` are shown publicly and are the first things a recruiter checks — an
 * invalid ID is far more damaging than an empty section.
 *
 * The Certifications section automatically hides itself while this array is
 * empty.
 *
 * To add one, copy this shape:
 *
 * {
 *   id: "cert-something",
 *   title: "Certificate Name Exactly As Issued",
 *   issuer: "Issuing Organisation",
 *   date: "2026",
 *   credentialId: "THE-REAL-ID-FROM-YOUR-CERTIFICATE",
 *   skills: ["Skill One", "Skill Two"],
 *   url: "https://verification-link-from-the-issuer",
 *   accent: "#7C3AED",
 * }
 *
 * Free, genuinely respected options worth earning:
 *  - freeCodeCamp — Responsive Web Design, JavaScript Algorithms & DS
 *  - Google/Coursera — UX Design, Data Analytics (audit free)
 *  - Microsoft Learn — Azure Fundamentals (AZ-900) learning paths
 *  - Postman — API Fundamentals Student Expert
 *  - HackerRank — SQL (Basic/Intermediate/Advanced), Problem Solving
 *
 * HackerRank SQL is the quickest genuine win here: it takes an afternoon,
 * it is verifiable, and it directly backs up your DBMS project.
 */
export const CERTIFICATIONS: Certification[] = [];
