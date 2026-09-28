import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectCard from "@/components/ProjectCard";
import { motion, AnimatePresence } from "framer-motion";
import { projects, type Category } from "@/data/projects";

const filters = ["All", "Custom Website", "Ecommerce", "SaaS Platform", "Automation"] as const;
type Filter = "All" | Category;

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-[#e61e50] selection:text-white relative">
      <Navbar />
      <main className="relative z-10 pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="text-portfolio-heading">
              Our <span className="text-[#e61e50]">Work</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto" data-testid="text-portfolio-subtitle">
              The websites, stores, and systems we've built, and the case studies behind them. Pick a project to see the problem, what we built, and the results.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                data-testid={`button-filter-${filter.toLowerCase().replace(/\s+/g, "-")}`}
                className={`px-5 py-2 rounded-md text-sm font-medium uppercase tracking-wider transition-all duration-300 border ${
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
                <motion.div
                  key={project.slug}
                  layout
                  initial={false}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
