import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import FloatingParticles from "@/components/FloatingParticles";

// The headline, subhead and CTAs render at full opacity straight from the
// prerendered HTML (no entrance animation) so they are the fast LCP element.
// Only the decorative particle canvas animates, and it starts after paint.
export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32">
      <FloatingParticles className="absolute inset-0 w-full h-full z-0" count={45} />
      <div className="container mx-auto px-6 relative z-10 text-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6">
          We engineer <span className="text-[#e61e50]">what's next.</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
          Websites, ecommerce, and AI. Built to move your business forward.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="bg-[#e61e50] hover:bg-[#c41540] text-white rounded-2xl px-8 h-14 text-lg border-0 cursor-pointer">
            <Link href="/contact">Start Your Project</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/5 rounded-2xl px-8 h-14 text-lg group cursor-pointer">
            <Link href="/portfolio">
              View Our Work
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
