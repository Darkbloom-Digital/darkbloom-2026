import { z } from "zod";

// Validation for the contact form submission. Kept identical to the
// original drizzle-zod schema's rules so the frontend forms and the
// serverless function stay in sync.
export const insertContactInquirySchema = z.object({
  name: z.string().min(1).max(200).trim(),
  email: z.string().email().max(320).trim().toLowerCase(),
  projectType: z.string().min(1).max(100).trim(),
  websiteUrl: z.string().max(2000).trim().nullable().optional(),
  details: z.string().min(1).max(5000).trim(),
});

export type InsertContactInquiry = z.infer<typeof insertContactInquirySchema>;
