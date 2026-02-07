import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingParticles from "@/components/FloatingParticles";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import austinImg from "@assets/optimized/austin-portfolio.webp";
import ntegImg from "@assets/optimized/nteg-portfolio.webp";
import docpeelerImg from "@assets/optimized/docpeeler-portfolio.webp";
import hattaboyImg from "@assets/optimized/hattaboy-portfolio.webp";

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
    title: "Hatta Boy Hat Co",
    category: "Shopify Store",
    description: "A custom Shopify storefront for a hat brand, built for seamless browsing and checkout.",
    url: "https://hattaboy.com",
    image: hattaboyImg
  },
];

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-[#e61e50] selection:text-white relative">
      <FloatingParticles className="absolute top-0 left-0 w-full h-[300vh] z-0 pointer-events-none" />
      <Navbar />
      <main className="relative z-10 pt-32 pb-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Our <span className="text-[#e61e50]">Work</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              A showcase of the websites, stores, and platforms we've built for brands that demand perfection.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {projects.map((project, index) => (
              <motion.a
                key={index}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group block"
                data-testid={`card-project-${index}`}
              >
                <div className="relative rounded-2xl overflow-hidden mb-4 aspect-video border border-white/5 hover:border-[#e61e50]/30 transition-all">
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 scale-[1.5] group-hover:scale-100"
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

                <h3 className="text-xl font-bold mb-1 group-hover:text-[#e61e50] transition-colors">{project.title}</h3>
                <p className="text-white/40 font-mono text-sm uppercase tracking-wider mb-2">{project.category}</p>
                <p className="text-white/60 text-sm leading-relaxed">{project.description}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
