import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Phone, Mail, MapPin } from "lucide-react";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import type { InsertContactInquiry } from "@shared/schema";

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<InsertContactInquiry>();

  const mutation = useMutation({
    mutationFn: async (data: InsertContactInquiry) => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit inquiry");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Message sent successfully! We'll get back to you soon.");
      reset();
    },
    onError: (error) => {
      toast.error("Failed to send message. Please try again.");
      console.error("Submission error:", error);
    },
  });

  const onSubmit = (data: InsertContactInquiry) => {
    mutation.mutate(data);
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden section-divider">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Ready to <span className="text-[#e61e50]">Scale?</span>
          </h2>
          <p className="text-white/60 text-lg">
            Tell us about your project. We'll build the strategy to get you there.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit(onSubmit)}
            className="lg:col-span-7 space-y-5"
          >
            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Name *</label>
                <Input
                  data-testid="input-name"
                  placeholder="John Doe"
                  className="bg-white/5 border-white/10 focus-visible:ring-[#e61e50] text-white h-12"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Email *</label>
                <Input
                  data-testid="input-email"
                  type="email"
                  placeholder="john@company.com"
                  className="bg-white/5 border-white/10 focus-visible:ring-[#e61e50] text-white h-12"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                />
                {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Project Type *</label>
              <select
                data-testid="select-project-type"
                className="flex h-12 w-full items-center justify-between rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#e61e50] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-white"
                {...register("projectType", { required: "Project type is required" })}
              >
                <option value="" className="bg-zinc-900">Select a project type</option>
                <option value="Custom Website" className="bg-zinc-900">Custom Website</option>
                <option value="Shopify Store" className="bg-zinc-900">Shopify Store</option>
                <option value="Website Redesign" className="bg-zinc-900">Website Redesign</option>
                <option value="AI Solution" className="bg-zinc-900">AI Solution</option>
                <option value="Ongoing Support" className="bg-zinc-900">Ongoing Support</option>
                <option value="Other" className="bg-zinc-900">Other</option>
              </select>
              {errors.projectType && <p className="text-red-400 text-xs">{errors.projectType.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Current Website URL (if you have one)</label>
              <Input
                data-testid="input-website-url"
                type="url"
                placeholder="https://yourwebsite.com"
                className="bg-white/5 border-white/10 focus-visible:ring-[#e61e50] text-white h-12"
                {...register("websiteUrl")}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Details *</label>
              <Textarea
                data-testid="textarea-details"
                placeholder="Tell us about your project..."
                className="bg-white/5 border-white/10 focus-visible:ring-[#e61e50] text-white min-h-[140px]"
                {...register("details", { required: "Please provide some details about your project" })}
              />
              {errors.details && <p className="text-red-400 text-xs">{errors.details.message}</p>}
            </div>

            <Button
              data-testid="button-submit"
              type="submit"
              size="lg"
              className="w-full bg-[#e61e50] hover:bg-[#c41540] text-white text-lg h-14 border-0"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Sending..." : "Send Message"}
            </Button>
          </motion.form>

          {/* Direct-contact content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 lg:pl-12 lg:border-l lg:border-white/10 space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6">How it works</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <span className="font-sans text-sm font-medium text-[#e61e50] tabular-nums pt-1 shrink-0">01</span>
                  <div>
                    <p className="font-semibold mb-1">Tell us about it</p>
                    <p className="text-white/50 text-sm leading-relaxed">Your goals, timeline, and whatever you've already got.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="font-sans text-sm font-medium text-[#e61e50] tabular-nums pt-1 shrink-0">02</span>
                  <div>
                    <p className="font-semibold mb-1">We scope it</p>
                    <p className="text-white/50 text-sm leading-relaxed">A clear plan and quote, usually back to you within 24 hours.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="font-sans text-sm font-medium text-[#e61e50] tabular-nums pt-1 shrink-0">03</span>
                  <div>
                    <p className="font-semibold mb-1">We build it</p>
                    <p className="text-white/50 text-sm leading-relaxed">Design, development, and launch, start to finish.</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-5">Or reach us directly</h3>
              <div className="space-y-4">
              <a href="tel:+14239511970" className="flex items-center gap-4 text-white/70 hover:text-[#e61e50] transition-colors group" data-testid="link-phone">
                <span className="w-11 h-11 rounded-md bg-white/5 flex items-center justify-center group-hover:bg-[#e61e50]/10 transition-colors shrink-0">
                  <Phone className="w-5 h-5 text-[#e61e50]" />
                </span>
                423-951-1970
              </a>
              <a href="mailto:robdavis@darkbloomdigital.com" className="flex items-center gap-4 text-white/70 hover:text-[#e61e50] transition-colors group break-all" data-testid="link-email">
                <span className="w-11 h-11 rounded-md bg-white/5 flex items-center justify-center group-hover:bg-[#e61e50]/10 transition-colors shrink-0">
                  <Mail className="w-5 h-5 text-[#e61e50]" />
                </span>
                robdavis@darkbloomdigital.com
              </a>
              <div className="flex items-center gap-4 text-white/70" data-testid="text-location">
                <span className="w-11 h-11 rounded-md bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#e61e50]" />
                </span>
                Tennessee, USA
              </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4">Follow Us</p>
              <div className="flex gap-3">
                <a href="http://instagram.com/darkbloomdigital/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-md bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#e61e50] transition-all" aria-label="Instagram">
                  <FaInstagram size={18} />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61579367123290" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-md bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#e61e50] transition-all" aria-label="Facebook">
                  <FaFacebookF size={16} />
                </a>
                <a href="https://www.linkedin.com/company/darkbloom-digital" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-md bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#e61e50] transition-all" aria-label="LinkedIn">
                  <FaLinkedinIn size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#e61e50] opacity-10 blur-[150px] rounded-full" />
      </div>
    </section>
  );
}
