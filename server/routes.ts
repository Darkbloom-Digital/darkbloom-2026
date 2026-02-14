import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactInquirySchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { sendContactNotification, sendNewsletterNotification } from "./email";
import { insertNewsletterSubscriberSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactInquirySchema.parse(req.body);
      const inquiry = await storage.createContactInquiry(validatedData);

      try {
        await sendContactNotification(validatedData);
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
      }

      res.status(201).json(inquiry);
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        res.status(400).json({ error: validationError.message });
      } else {
        console.error("Error creating contact inquiry:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });


  app.post("/api/newsletter", async (req, res) => {
    try {
      const validatedData = insertNewsletterSubscriberSchema.parse(req.body);
      const subscriber = await storage.createNewsletterSubscriber(validatedData);

      try {
        await sendNewsletterNotification(validatedData.email);
      } catch (emailError) {
        console.error("Failed to send newsletter notification email:", emailError);
      }

      res.status(201).json(subscriber);
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        res.status(400).json({ error: validationError.message });
      } else if (error?.code === "23505") {
        res.status(409).json({ error: "You're already subscribed!" });
      } else {
        console.error("Error creating newsletter subscriber:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

  return httpServer;
}
