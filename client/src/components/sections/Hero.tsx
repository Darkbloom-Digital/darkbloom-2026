import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import logoIcon from "@assets/SiteLogo_1770164848722.png";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-zinc-950">
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src={logoIcon} 
            alt="" 
            className="w-[80vw] max-w-[800px] h-auto opacity-[0.12]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#e61e50]/10 border border-[#e61e50]/30 text-[#e61e50] text-sm font-medium tracking-wider uppercase mb-6">
            Premium Shopify Agency
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6">
            We Build <span className="text-gradient">Digital Empires</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Specialized Shopify development and management for brands that demand perfection. High-performance, aesthetic, and conversion-focused.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-[#e61e50] hover:bg-[#c41540] text-white rounded-full px-8 h-14 text-lg">
              Start Your Project
            </Button>
            <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/5 rounded-full px-8 h-14 text-lg group">
              View Our Work
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>

          </section>
  );
}
