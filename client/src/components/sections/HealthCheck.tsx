import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ArrowUpRight, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Performance Snapshot lives in its own repo/deployment (Darkbloom-Digital/Performance-Snapshot).
// TODO: swap to audit.darkbloomdigital.com once the custom subdomain is live.
export const HEALTH_CHECK_TOOL_URL = "https://performance-snapshot.replit.app/";

type HealthCheckForm = { websiteUrl: string; email: string };

function normalizeUrl(value: string): string {
  const trimmed = value.trim();
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

/**
 * Lead magnet: capture URL + email first (emailed to Robbie via /api/contact),
 * then hand off to the Performance Snapshot tool for the speed/SEO report.
 */
export default function HealthCheck({ id = "health-check" }: { id?: string }) {
  const [submittedUrl, setSubmittedUrl] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<HealthCheckForm>();

  const mutation = useMutation({
    mutationFn: async (data: HealthCheckForm) => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          websiteUrl: normalizeUrl(data.websiteUrl),
          projectType: "Free website health check",
          details: `Requested a free website health check for ${normalizeUrl(data.websiteUrl)}.`,
        }),
      });
      if (!response.ok) throw new Error("Failed to submit");
      return normalizeUrl(data.websiteUrl);
    },
    onSuccess: (url) => setSubmittedUrl(url),
    onError: () => toast.error("Something went wrong. Please try again."),
  });

  // The tool doesn't read query params yet; ?url= is passed so it can
  // prefill once support is added there. The email is never put in the URL.
  const toolHref = submittedUrl
    ? `${HEALTH_CHECK_TOOL_URL}?url=${encodeURIComponent(submittedUrl)}`
    : HEALTH_CHECK_TOOL_URL;

  return (
    <section id={id} className="py-24 relative overflow-hidden section-divider scroll-mt-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <Gauge className="w-8 h-8 text-[#e61e50] mx-auto mb-5" aria-hidden="true" />
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Free Website <span className="text-[#e61e50]">Health Check</span>
          </h2>
          <p className="text-white/60 text-lg mb-10">
            Is your site slow or hard to find on Google? Enter your URL and email to get a speed and SEO report: your performance score, Core Web Vitals, and the top issues holding you back.
          </p>

          {submittedUrl ? (
            <div className="border border-white/10 rounded-md p-8 bg-white/[0.02]" data-testid="health-check-success">
              <p className="text-xl font-semibold mb-2">You're all set.</p>
              <p className="text-white/60 mb-6">
                Run the check on <span className="text-white">{submittedUrl.replace(/^https?:\/\//, "")}</span> to see your scores, then get the full report with prioritized fixes emailed to you.
              </p>
              <a
                href={toolHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#e61e50] hover:bg-[#c41540] text-white px-8 py-4 rounded-md font-medium transition-colors"
                data-testid="link-health-check-tool"
              >
                Open my health check <ArrowUpRight className="w-5 h-5" />
              </a>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit((data) => mutation.mutate(data))}
              className="grid sm:grid-cols-[1fr_1fr_auto] gap-3 text-left"
              data-testid="form-health-check"
            >
              <div>
                <label htmlFor={`${id}-url`} className="sr-only">Website URL</label>
                <Input
                  id={`${id}-url`}
                  placeholder="yourwebsite.com"
                  className="bg-white/5 border-white/10 focus-visible:ring-[#e61e50] text-white h-12"
                  {...register("websiteUrl", {
                    required: "Enter your website",
                    pattern: { value: /^(https?:\/\/)?[^\s.]+\.[^\s]{2,}$/i, message: "Enter a valid URL" },
                  })}
                />
                {errors.websiteUrl && <p className="text-red-400 text-xs mt-1">{errors.websiteUrl.message}</p>}
              </div>
              <div>
                <label htmlFor={`${id}-email`} className="sr-only">Email</label>
                <Input
                  id={`${id}-email`}
                  type="email"
                  placeholder="you@company.com"
                  className="bg-white/5 border-white/10 focus-visible:ring-[#e61e50] text-white h-12"
                  {...register("email", {
                    required: "Enter your email",
                    pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email" },
                  })}
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <Button
                type="submit"
                className="bg-[#e61e50] hover:bg-[#c41540] text-white h-12 px-6 border-0 cursor-pointer"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Sending..." : "Get my free report"}
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
