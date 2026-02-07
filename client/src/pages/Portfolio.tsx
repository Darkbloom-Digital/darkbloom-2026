import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingParticles from "@/components/FloatingParticles";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import austinImg from "@assets/optimized/austin-portfolio.webp";
import ntegImg from "@assets/optimized/nteg-portfolio.webp";
import docpeelerImg from "@assets/optimized/docpeeler-portfolio.webp";
import hattaboyImg from "@assets/optimized/hattaboy-portfolio.webp";
import psImg from "@assets/optimized/ps-portfolio.webp";

const filters = ["All", "Custom Website", "SaaS Platform", "Ecommerce"] as const;
type Filter = (typeof filters)[number];

const projects = [
  {
    title: "Integrity Network Solutions",
    category: "Custom Website",
    description: "A professional website built for a network solutions company, featuring clean design and clear service presentation.",
    url: "https://nteg.net",
    image: ntegImg
  },
  {
    title: "Austin Calfee",
    category: "Custom Website",
    description: "A personal brand website designed to showcase expertise and drive business growth.",
    url: "https://austincalfee.com",
    image: austinImg
  },
  {
    title: "DocPeeler",
    category: "SaaS Platform",
    description: "A software-as-a-service platform built with modern web technologies for streamlined document processing.",
    url: "https://docpeeler.com",
    image: docpeelerImg
  },
  {
    title: "Performance Snapshot",
    category: "SaaS Platform",
    description: "A website speed analysis tool that runs health checks on mobile and desktop performance, helping brands optimize their online presence.",
    url: "https://performance-snapshot.replit.app/",
    image: psImg
  },
  {
    title: "Hatta Boy Hat Co",
    category: "Ecommerce",
    description: "A custom Shopify storefront for a hat brand, built for seamless browsing and checkout.",
    url: "https://hattaboy.com",
    image: hattaboyImg
  },
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-[#e61e50] selection:text-white relative">
      <FloatingParticles className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none" />
      <Navbar />
      <main className="relative z-10 pt-32 pb-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="text-portfolio-heading">
              Our <span className="text-[#e61e50]">Work</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto" data-testid="text-portfolio-subtitle">
              A showcase of the websites, stores, and platforms we've built for brands that demand perfection.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                data-testid={`button-filter-${filter.toLowerCase().replace(/\s+/g, "-")}`}
                className={`px-5 py-2 rounded-full text-sm font-medium uppercase tracking-wider transition-all duration-300 border ${
                  activeFilter === filter
                    ? "bg-[#e61e50] border-[#e61e50] text-white"
                    : "bg-white/5 border-white/10 text-white/60 hover:border-[#e61e50]/50 hover:text-white"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <motion.div layout className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.a
                  key={project.title}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group block"
                  data-testid={`card-project-${project.title.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <div className="relative rounded-2xl overflow-hidden mb-4 aspect-video border border-white/5 hover:border-[#e61e50]/30 transition-all">
                    <div
                      className="absolute inset-0 transition-all duration-700 scale-[1.5] group-hover:scale-100"
                      style={{
                        backgroundImage: `url(${project.image})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: 'rgba(0,0,0,0.9)'
                      }}
                    />
                    <div className="absolute inset-0 bg-black/60 group-hover:bg-transparent transition-all duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-500">
                      <div className="w-12 h-12 rounded-full bg-[#e61e50] flex items-center justify-center">
                        <ArrowUpRight className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-1 group-hover:text-[#e61e50] transition-colors" data-testid={`text-project-title-${project.title.toLowerCase().replace(/\s+/g, "-")}`}>{project.title}</h3>
                  <p className="text-white/40 font-mono text-sm uppercase tracking-wider mb-2" data-testid={`text-project-category-${project.title.toLowerCase().replace(/\s+/g, "-")}`}>{project.category}</p>
                  <p className="text-white/60 text-sm leading-relaxed">{project.description}</p>
                </motion.a>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
