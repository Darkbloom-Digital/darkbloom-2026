import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import { Resend } from "resend";
import { fromZodError } from "zod-validation-error";

// Inlined so this serverless function is fully self-contained (no imports
// outside the api/ directory, which Vercel's bundler can fail to include).
// Keep in sync with shared/schema.ts, which the frontend uses for its type.
const insertContactInquirySchema = z.object({
  name: z.string().min(1).max(200).trim(),
  email: z.string().email().max(320).trim().toLowerCase(),
  projectType: z.string().min(1).max(100).trim(),
  websiteUrl: z.string().max(2000).trim().nullable().optional(),
  details: z.string().min(1).max(5000).trim(),
});
type InsertContactInquiry = z.infer<typeof insertContactInquirySchema>;

const CONTACT_RECIPIENT = "robdavis@darkbloomdigital.com";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Reuse of the original server/email.ts dark-themed table layout (brand red #e61e50).
function buildContactEmailHtml(data: InsertContactInquiry): string {
  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safeProjectType = escapeHtml(data.projectType);
  const safeDetails = escapeHtml(data.details);
  const safeUrl = data.websiteUrl ? escapeHtml(data.websiteUrl) : null;

  return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #18181b; color: #ffffff; border-radius: 12px;">
        <h2 style="color: #e61e50; margin-bottom: 24px;">New Contact Inquiry</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #a1a1aa; width: 140px;">Name</td>
            <td style="padding: 8px 0; color: #ffffff;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #a1a1aa;">Email</td>
            <td style="padding: 8px 0;"><a href="mailto:${safeEmail}" style="color: #e61e50;">${safeEmail}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #a1a1aa;">Project Type</td>
            <td style="padding: 8px 0; color: #ffffff;">${safeProjectType}</td>
          </tr>
          ${safeUrl ? `<tr>
            <td style="padding: 8px 0; color: #a1a1aa;">Website URL</td>
            <td style="padding: 8px 0;"><a href="${safeUrl}" style="color: #e61e50;">${safeUrl}</a></td>
          </tr>` : ""}
        </table>
        <div style="margin-top: 20px; padding: 16px; background: #27272a; border-radius: 8px;">
          <p style="color: #a1a1aa; margin: 0 0 8px 0; font-size: 14px;">Details</p>
          <p style="color: #ffffff; margin: 0; white-space: pre-wrap;">${safeDetails}</p>
        </div>
      </div>
    `;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Validate the submission with the shared zod schema.
  const parsed = insertContactInquirySchema.safeParse(req.body);
  if (!parsed.success) {
    const validationError = fromZodError(parsed.error);
    return res.status(400).json({ error: validationError.message });
  }
  const data = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    console.error(
      "Missing email configuration: RESEND_API_KEY and/or RESEND_FROM_EMAIL are not set.",
    );
    return res.status(500).json({ error: "Email service is not configured." });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: CONTACT_RECIPIENT,
      replyTo: data.email,
      subject: `New Inquiry from ${escapeHtml(data.name)} — ${escapeHtml(data.projectType)}`,
      html: buildContactEmailHtml(data),
    });

    if (error) {
      console.error("Failed to send contact email:", error);
      return res.status(500).json({ error: "Failed to send message." });
    }

    return res.status(201).json({ success: true });
  } catch (err) {
    console.error("Unexpected error sending contact email:", err);
    return res.status(500).json({ error: "Failed to send message." });
  }
}
