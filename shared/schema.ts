import { z } from "zod";

// Validation for the contact form submission. Kept identical to the
// original drizzle-zod schema's rules so the frontend forms and the
// serverless function stay in sync.
export const insertContactInquirySchema = z.object({
  // Optional so the homepage health-check form can capture just URL + email.
  name: z.string().max(200).trim().optional().default(""),
  email: z.string().email().max(320).trim().toLowerCase(),
  projectType: z.string().min(1).max(100).trim(),
  websiteUrl: z.string().max(2000).trim().nullable().optional(),
  details: z.string().min(1).max(5000).trim(),
  // Optional lead fields used by the /trades missed-call audit form.
  phone: z.string().max(50).trim().optional(),
  business: z.string().max(200).trim().optional(),
  trade: z.string().max(100).trim().optional(),
  software: z.string().max(100).trim().optional(),
});

export type InsertContactInquiry = z.infer<typeof insertContactInquirySchema>;
