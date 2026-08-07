import { NextResponse } from "next/server";
import { Resend } from "resend";

import { siteConfig } from "@/constants/site";
import { buildContactEmail, buildContactText } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";
import { contactSchema } from "@/lib/validations";
import type { ApiResponse } from "@/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Best-effort client IP resolution behind a proxy/CDN. */
function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function json(body: ApiResponse, status: number, headers?: HeadersInit) {
  return NextResponse.json(body, { status, headers });
}

export async function POST(request: Request) {
  try {
    // 1. Rate limit
    const ip = getClientIp(request);
    const limit = rateLimit(ip);
    if (!limit.success) {
      return json(
        {
          success: false,
          message: `Too many messages. Please try again in ${Math.ceil(
            limit.retryAfterSeconds / 60,
          )} minute(s).`,
        },
        429,
        { "Retry-After": String(limit.retryAfterSeconds) },
      );
    }

    // 2. Parse & validate
    const body = await request.json().catch(() => null);
    if (!body) {
      return json({ success: false, message: "Invalid request body." }, 400);
    }

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      return json(
        {
          success: false,
          message: first?.message ?? "Please check the form and try again.",
        },
        400,
      );
    }

    // 3. Honeypot — silently accept so bots don't learn anything.
    if (parsed.data.website) {
      return json({ success: true, message: "Message sent." }, 200);
    }

    const { name, email, subject, message } = parsed.data;
    const payload = { name, email, subject, message };

    // 4. Send
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      // No provider configured — log the enquiry so nothing is lost in dev.
      console.warn(
        "[contact] RESEND_API_KEY is not set. Enquiry logged instead of sent.",
        payload,
      );
      return json(
        {
          success: true,
          message:
            "Message received. Email delivery is not configured yet, but your enquiry was logged.",
        },
        200,
      );
    }

    const resend = new Resend(apiKey);
    const from =
      process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";
    const to = process.env.CONTACT_TO_EMAIL ?? siteConfig.contact.email;

    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `Portfolio enquiry — ${subject}`,
      html: buildContactEmail(payload),
      text: buildContactText(payload),
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return json(
        {
          success: false,
          message:
            "The message could not be delivered. Please email me directly instead.",
        },
        502,
      );
    }

    return json(
      {
        success: true,
        message: "Message sent. I'll get back to you within 24 hours.",
      },
      200,
    );
  } catch (error) {
    console.error("[contact] Unexpected error:", error);
    return json(
      {
        success: false,
        message: "Something went wrong on our side. Please try again shortly.",
      },
      500,
    );
  }
}
