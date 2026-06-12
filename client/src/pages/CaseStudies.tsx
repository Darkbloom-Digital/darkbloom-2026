import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import ntegImg from "@assets/optimized/nteg-portfolio.webp";
import austinImg from "@assets/optimized/austin-portfolio.webp";
import hattaboyImg from "@assets/optimized/hattaboy-portfolio.webp";
import catechImg from "@assets/optimized/catech-portfolio.webp";

const featured = {
  title: "CA Tech USA",
  category: "Ecommerce · Custom Shopify Build",
  image: catechImg,
  url: "https://catechusa.com",
  intro: "A ground-up custom Shopify store and theme for CA Tech USA, a race-proven manufacturer of billet aftermarket parts for UTVs and side-by-sides.",
  challenge: "CA Tech USA needed far more than a template. As a serious manufacturer with a deep, technical product catalog and a lifetime-warranty reputation to protect, they needed an ecommerce platform that could showcase the full range, earn the trust of hardcore off-road buyers, and actually convert.",
  solution: "We designed and built a fully custom Shopify theme from the ground up. A structured catalog makes a large, technical product lineup easy to navigate, while a customer gallery, install-video library, and blog turn the store into a destination instead of just a checkout. The result is a fast, secure storefront that looks as rugged and dialed-in as the parts it sells.",
  highlights: [
    "Fully custom Shopify theme",
    "Structured technical product catalog",
    "Customer gallery for social proof",
    "Install-video library",
    "Content hub / blog",
    "Fast, secure checkout",
  ],
};

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

          {/* Featured case study */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto mb-28"
            data-testid="featured-casestudy"
          >
            <p className="text-[#e61e50] font-mono text-sm uppercase tracking-wider mb-4">Featured Project</p>
            <a
              href={featured.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-xl overflow-hidden border border-white/10 hover:border-[#e61e50]/40 transition-all aspect-video mb-8 relative"
            >
              <img src={featured.image} alt={featured.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="w-14 h-14 rounded-full bg-[#e61e50] flex items-center justify-center">
                  <ArrowUpRight className="w-7 h-7 text-white" />
                </span>
              </div>
            </a>

            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
              <h2 className="text-3xl md:text-5xl font-bold">{featured.title}</h2>
              <span className="text-white/40 font-mono text-sm uppercase tracking-wider">{featured.category}</span>
            </div>
            <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-3xl">{featured.intro}</p>

            <div className="grid md:grid-cols-3 gap-x-12 gap-y-8">
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-2">The Challenge</h3>
                  <p className="text-white/50 leading-relaxed">{featured.challenge}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-2">Our Solution</h3>
                  <p className="text-white/50 leading-relaxed">{featured.solution}</p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-3">What We Built</h3>
                <ul className="space-y-2">
                  {featured.highlights.map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm text-white/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e61e50] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Other case studies */}
          <div className="space-y-20 max-w-5xl mx-auto">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                data-testid={`card-casestudy-${index}`}
                className="border-t border-white/10 pt-20"
              >
                <div className="grid lg:grid-cols-2 gap-10 items-center">
                  <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <a href={study.url} target="_blank" rel="noopener noreferrer" className="block rounded-xl overflow-hidden border border-white/5 hover:border-[#e61e50]/30 transition-all aspect-video">
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
