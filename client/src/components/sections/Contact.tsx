import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
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
    <section id="contact" className="py-24 relative overflow-hidden section-divider">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto glass-card rounded-3xl p-8 md:p-16 border border-white/10 shadow-2xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Ready to Scale?</h2>
            <p className="text-white/60">Tell us about your project. We'll build the strategy to get you there.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
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
                <option value="Ongoing Support" className="bg-zinc-900">Ongoing Support</option>
                <option value="Other" className="bg-zinc-900">Other</option>
              </select>
              {errors.projectType && <p className="text-red-400 text-xs">{errors.projectType.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Details *</label>
              <Textarea 
                data-testid="textarea-details"
                placeholder="Tell us about your goals..." 
                className="bg-white/5 border-white/10 focus-visible:ring-[#e61e50] text-white min-h-[150px]" 
                {...register("details", { required: "Please provide some details about your project" })}
              />
              {errors.details && <p className="text-red-400 text-xs">{errors.details.message}</p>}
            </div>

            <Button 
              data-testid="button-submit"
              type="submit"
              size="lg" 
              className="w-full bg-[#e61e50] hover:bg-[#c41540] text-white text-lg h-14 rounded-xl mt-4"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
      
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
         <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#e61e50] opacity-10 blur-[150px] rounded-full" />
         <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-900 opacity-20 blur-[150px] rounded-full" />
      </div>
    </section>
  );
}
