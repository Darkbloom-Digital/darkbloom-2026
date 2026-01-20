import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto glass-card rounded-3xl p-8 md:p-16 border border-white/10 shadow-2xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Ready to Scale?</h2>
            <p className="text-white/60">Tell us about your project. We'll build the strategy to get you there.</p>
          </div>

          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Name</label>
                <Input placeholder="John Doe" className="bg-white/5 border-white/10 focus-visible:ring-[#e61e50] text-white h-12" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Email</label>
                <Input placeholder="john@company.com" className="bg-white/5 border-white/10 focus-visible:ring-[#e61e50] text-white h-12" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Project Type</label>
              <select className="flex h-12 w-full items-center justify-between rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#e61e50] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-white">
                <option className="bg-zinc-900">New Shopify Store</option>
                <option className="bg-zinc-900">Store Migration</option>
                <option className="bg-zinc-900">Custom Development</option>
                <option className="bg-zinc-900">Ongoing Management</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Details</label>
              <Textarea placeholder="Tell us about your goals..." className="bg-white/5 border-white/10 focus-visible:ring-[#e61e50] text-white min-h-[150px]" />
            </div>

            <Button size="lg" className="w-full bg-[#e61e50] hover:bg-[#c41540] text-white text-lg h-14 rounded-xl mt-4">
              Send Message
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
