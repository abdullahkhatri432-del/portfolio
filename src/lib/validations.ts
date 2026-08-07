import { z } from "zod";

/** Shared contact form schema — used by the client form and the API route. */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter at least 2 characters.")
    .max(80, "That name is a little too long."),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),
  subject: z
    .string()
    .trim()
    .min(3, "Please add a short subject.")
    .max(120, "Subject must be under 120 characters."),
  message: z
    .string()
    .trim()
    .min(20, "Tell me a bit more — at least 20 characters.")
    .max(3000, "Message must be under 3000 characters."),
  /**
   * Honeypot. Real users never see this field, so it must stay empty.
   * It is intentionally permissive here — the API route inspects the value
   * and silently discards filled submissions rather than returning an error,
   * so bots get no signal that they were detected.
   */
  website: z.string().optional(),
});

export type ContactSchema = z.infer<typeof contactSchema>;
