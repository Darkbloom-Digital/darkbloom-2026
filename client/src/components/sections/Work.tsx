import { motion } from "framer-motion";
import { Link } from "wouter";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

// Shows the first four projects in data/projects.ts (ordered by priority).
const homeProjects = projects.slice(0, 4);

export default function Work() {
  return (
    <section id="work" className="py-24 section-divider">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold">Our <span className="text-[#e61e50]">Work</span></h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {homeProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProjectCard project={project} showSummary={false} />
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/portfolio" className="text-[#e61e50] font-medium hover:text-white transition-colors underline underline-offset-4">
            View All Case Studies
          </Link>
        </div>
      </div>
    </section>
  );
}
