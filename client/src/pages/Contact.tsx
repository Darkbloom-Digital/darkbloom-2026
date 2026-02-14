import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingParticles from "@/components/FloatingParticles";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Phone, Mail, MapPin } from "lucide-react";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import type { InsertContactInquiry } from "@shared/schema";

export default function ContactPage() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<InsertContactInquiry>();

  const mutation = useMutation({
    mutationFn: async (data: InsertContactInquiry) => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to submit inquiry");
      return response.json();
    },
    onSuccess: () => {
      toast.success("Message sent successfully! We'll get back to you soon.");
      reset();
    },
    onError: () => {
      toast.error("Failed to send message. Please try again.");
    },
  });

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-[#e61e50] selection:text-white relative">
      <FloatingParticles className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none" count={10} />
      <Navbar />
      <main className="relative z-10 pt-32 pb-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="text-contact-heading">
              Get in <span className="text-[#e61e50]">Touch</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto" data-testid="text-contact-subtitle">
              Tell us about your project. We'll build the strategy to get you there.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <h3 className="text-xl font-bold mb-6">Contact Info</h3>
                <div className="space-y-5">
                  <a href="tel:+14239511970" className="flex items-center gap-4 text-white/60 hover:text-[#e61e50] transition-colors group" data-testid="link-phone">
                    <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center group-hover:bg-[#e61e50]/20 transition-colors">
                      <Phone className="w-5 h-5 text-[#e61e50]" />
                    </div>
                    <span>423-951-1970</span>
                  </a>
                  <a href="mailto:robdavis@darkbloomdigital.com" className="flex items-center gap-4 text-white/60 hover:text-[#e61e50] transition-colors group" data-testid="link-email">
                    <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center group-hover:bg-[#e61e50]/20 transition-colors">
                      <Mail className="w-5 h-5 text-[#e61e50]" />
                    </div>
                    <span>robdavis@darkbloomdigital.com</span>
                  </a>
                  <div className="flex items-center gap-4 text-white/60" data-testid="text-location">
                    <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-[#e61e50]" />
                    </div>
                    <span>Cleveland, TN</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  <a href="http://instagram.com/darkbloomdigital/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center text-white/60 hover:text-[#e61e50] hover:bg-[#e61e50]/20 transition-all" data-testid="link-instagram">
                    <FaInstagram size={20} />
                  </a>
                  <a href="https://www.facebook.com/profile.php?id=61579367123290" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center text-white/60 hover:text-[#e61e50] hover:bg-[#e61e50]/20 transition-all" data-testid="link-facebook">
                    <FaFacebookF size={18} />
                  </a>
                  <a href="https://www.linkedin.com/company/darkbloom-digital" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center text-white/60 hover:text-[#e61e50] hover:bg-[#e61e50]/20 transition-all" data-testid="link-linkedin">
                    <FaLinkedinIn size={20} />
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-3"
            >
              <div className="rounded-2xl border border-white/10 bg-zinc-900 p-8 md:p-10">
                <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/80">Name *</label>
                      <Input
                        data-testid="input-contact-name"
                        placeholder="John Doe"
                        className="bg-white/5 border-white/10 focus-visible:ring-[#e61e50] text-white h-12"
                        {...register("name", { required: "Name is required" })}
                      />
                      {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/80">Email *</label>
                      <Input
                        data-testid="input-contact-email"
                        type="email"
                        placeholder="john@company.com"
                        className="bg-white/5 border-white/10 focus-visible:ring-[#e61e50] text-white h-12"
                        {...register("email", {
                          required: "Email is required",
                          pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email" }
                        })}
                      />
                      {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Project Type *</label>
                    <select
                      data-testid="select-contact-project-type"
                      className="flex h-12 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#e61e50]"
                      {...register("projectType", { required: "Project type is required" })}
                    >
                      <option value="" className="bg-zinc-900">Select a project type</option>
                      <option value="Custom Website" className="bg-zinc-900">Custom Website</option>
                      <option value="Shopify Store" className="bg-zinc-900">Shopify Store</option>
                      <option value="Website Redesign" className="bg-zinc-900">Website Redesign</option>
                      <option value="Ongoing Support" className="bg-zinc-900">Ongoing Support</option>
                      <option value="Other" className="bg-zinc-900">Other</option>
                    </select>
                    {errors.projectType && <p className="text-red-400 text-xs">{errors.projectType.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Current Website URL (if you have one)</label>
                    <Input
                      data-testid="input-contact-website-url"
                      type="text"
                      placeholder="https://yourwebsite.com"
                      className="bg-white/5 border-white/10 focus-visible:ring-[#e61e50] text-white h-12"
                      {...register("websiteUrl")}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Details *</label>
                    <Textarea
                      data-testid="textarea-contact-details"
                      placeholder="Tell us about your project..."
                      className="bg-white/5 border-white/10 focus-visible:ring-[#e61e50] text-white min-h-[150px]"
                      {...register("details", { required: "Please provide some details" })}
                    />
                    {errors.details && <p className="text-red-400 text-xs">{errors.details.message}</p>}
                  </div>

                  <Button
                    data-testid="button-contact-submit"
                    type="submit"
                    size="lg"
                    className="w-full bg-[#e61e50] hover:bg-[#c41540] text-white text-lg h-14 rounded-xl border-0 cursor-pointer"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
