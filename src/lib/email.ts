import { siteConfig } from "@/constants/site";
import type { ContactPayload } from "@/types";

/** Escape user input before embedding it in the HTML email body. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/** Branded HTML template for the notification email. */
export function buildContactEmail(payload: ContactPayload): string {
  const name = escapeHtml(payload.name);
  const email = escapeHtml(payload.email);
  const subject = escapeHtml(payload.subject);
  const message = escapeHtml(payload.message).replace(/\n/g, "<br />");
  const receivedAt = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "short",
  });

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>New portfolio enquiry</title>
  </head>
  <body style="margin:0;padding:32px 16px;background:#050816;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#0a0f24;border:1px solid rgba(255,255,255,0.1);border-radius:20px;overflow:hidden;">
      <tr>
        <td style="padding:28px 32px;background:linear-gradient(135deg,#7C3AED,#06B6D4);">
          <h1 style="margin:0;font-size:20px;color:#ffffff;">New Portfolio Enquiry</h1>
          <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,0.85);">${receivedAt}</p>
        </td>
      </tr>
      <tr>
        <td style="padding:32px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding-bottom:16px;">
                <p style="margin:0 0 4px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#64748B;">From</p>
                <p style="margin:0;font-size:15px;color:#ffffff;font-weight:600;">${name}</p>
                <a href="mailto:${email}" style="font-size:14px;color:#67E8F9;text-decoration:none;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding-bottom:16px;">
                <p style="margin:0 0 4px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#64748B;">Subject</p>
                <p style="margin:0;font-size:15px;color:#ffffff;">${subject}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p style="margin:0 0 8px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#64748B;">Message</p>
                <div style="padding:18px;background:rgba(255,255,255,0.04);border-left:3px solid #7C3AED;border-radius:10px;font-size:14px;line-height:1.7;color:#CBD5E1;">
                  ${message}
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:20px 32px;border-top:1px solid rgba(255,255,255,0.08);">
          <p style="margin:0;font-size:12px;color:#64748B;">
            Sent from the contact form on ${siteConfig.url}
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/** Plain-text fallback for clients that don't render HTML. */
export function buildContactText(payload: ContactPayload): string {
  return [
    "New portfolio enquiry",
    "",
    `Name:    ${payload.name}`,
    `Email:   ${payload.email}`,
    `Subject: ${payload.subject}`,
    "",
    "Message:",
    payload.message,
  ].join("\n");
}
