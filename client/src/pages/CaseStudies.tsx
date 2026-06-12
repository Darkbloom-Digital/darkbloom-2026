import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import ntegImg from "@assets/optimized/nteg-portfolio.webp";
import austinImg from "@assets/optimized/austin-portfolio.webp";
import hattaboyImg from "@assets/optimized/hattaboy-portfolio.webp";

const caseStudies = [
  {
    title: "Integrity Network Solutions",
    category: "Custom Website",
    image: ntegImg,
    challenge: "Needed a professional web presence that clearly communicated their network solutions services to potential business clients.",
    solution: "Built a clean, modern website with clear service breakdowns, strong calls to action, and a design that instills trust and professionalism.",
    url: "https://nteg.net",
  },
  {
    title: "Austin Calfee",
    category: "Personal Brand",
    image: austinImg,
    challenge: "Needed a personal website that positioned him as an authority and drove business growth through an impactful online presence.",
    solution: "Designed a sleek personal brand site with focused messaging, social proof, and a conversion-optimized layout.",
    url: "https://austincalfee.com",
  },
  {
    title: "Hatta Boy Hat Co",
    category: "Shopify Store",
    image: hattaboyImg,
    challenge: "A growing hat brand needed a custom Shopify store that reflected their personality and made purchasing seamless.",
    solution: "Built a custom Shopify theme with brand-aligned visuals, intuitive product navigation, and an optimized checkout flow.",
    url: "https://hattaboy.com",
  },
];

export default function CaseStudies() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-[#e61e50] selection:text-white relative">
      <Navbar />
      <main className="relative z-10 pt-32 pb-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="text-casestudies-heading">
              Case <span className="text-[#e61e50]">Studies</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto" data-testid="text-casestudies-subtitle">
              A deeper look at the challenges we solved and the results we delivered.
            </p>
          </motion.div>

          <div className="space-y-20 max-w-5xl mx-auto">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                data-testid={`card-casestudy-${index}`}
                className="border-t border-white/10 pt-20 first:border-t-0 first:pt-0"
              >
                <div className="grid lg:grid-cols-2 gap-10 items-center">
                  <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <a href={study.url} target="_blank" rel="noopener noreferrer" className="block rounded-2xl overflow-hidden border border-white/5 hover:border-[#e61e50]/30 transition-all aspect-video">
                      <div
                        className="w-full h-full"
                        style={{
                          backgroundImage: `url(${study.image})`,
                          backgroundSize: 'contain',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                          backgroundColor: 'rgba(0,0,0,0.9)'
                        }}
                      />
                    </a>
                  </div>
                  <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                    <p className="text-[#e61e50] font-mono text-sm uppercase tracking-wider mb-2">{study.category}</p>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4" data-testid={`text-casestudy-title-${index}`}>{study.title}</h2>

                    <div className="space-y-4 mb-8">
                      <div>
                        <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-1">The Challenge</h4>
                        <p className="text-white/50 text-sm leading-relaxed">{study.challenge}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-1">Our Solution</h4>
                        <p className="text-white/50 text-sm leading-relaxed">{study.solution}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-24"
          >
            <p className="text-white/60 text-lg mb-6">Want results like these?</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#e61e50] hover:bg-[#c41540] text-white px-8 py-4 rounded-md font-medium transition-colors"
              data-testid="link-casestudies-cta"
            >
              Start Your Project <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
