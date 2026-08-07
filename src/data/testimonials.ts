import type { Testimonial } from "@/types";

/**
 * Client and colleague testimonials.
 *
 * IMPORTANT: only add real, attributable quotes here. Recruiters do look
 * people up on LinkedIn, and an unverifiable testimonial costs far more
 * credibility than an absent one.
 *
 * The Testimonials section automatically hides itself while this array is
 * empty, so the page layout stays correct until you have real feedback.
 *
 * To add one, copy this shape:
 *
 * {
 *   id: "t-firstname",
 *   quote: "What they actually said, in their words.",
 *   name: "Their Name",
 *   role: "Their Job Title",
 *   company: "Their Company",
 *   initials: "TN",
 *   accent: "#7C3AED",
 * }
 *
 * Good sources: a client who paid you, a teammate from a group project,
 * a senior who reviewed your code, a professor who supervised your DBMS
 * project. A short honest quote beats a long polished one.
 */
export const TESTIMONIALS: Testimonial[] = [];
