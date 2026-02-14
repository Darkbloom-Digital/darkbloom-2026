import { sql } from "drizzle-orm";
import { pgTable, text, varchar, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const contactInquiries = pgTable("contact_inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  projectType: text("project_type").notNull(),
  websiteUrl: text("website_url"),
  details: text("details").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactInquirySchema = createInsertSchema(contactInquiries).omit({
  id: true,
  createdAt: true,
}).extend({
  name: z.string().min(1).max(200).trim(),
  email: z.string().email().max(320).trim().toLowerCase(),
  projectType: z.string().min(1).max(100).trim(),
  websiteUrl: z.string().max(2000).trim().nullable().optional(),
  details: z.string().min(1).max(5000).trim(),
});

export type InsertContactInquiry = z.infer<typeof insertContactInquirySchema>;
export type ContactInquiry = typeof contactInquiries.$inferSelect;

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertNewsletterSubscriberSchema = createInsertSchema(newsletterSubscribers).omit({
  id: true,
  createdAt: true,
}).extend({
  email: z.string().email().max(320).trim().toLowerCase(),
});

export type InsertNewsletterSubscriber = z.infer<typeof insertNewsletterSubscriberSchema>;
export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
