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
    url: "https://nteg.net",
    image: ntegImg
  },
  {
    title: "Austin Calfee",
    category: "Custom Website",
    url: "https://austincalfee.com",
    image: austinImg
  },
  {
    title: "DocPeeler",
    category: "SaaS Platform",
    url: "https://docpeeler.com",
    image: docpeelerImg
  },
  {
    title: "Hatta Boy Hat Co",
    category: "Shopify Store",
    url: "https://hattaboy.com",
    image: hattaboyImg
  },
];

export default function Work() {
  return (
    <section id="work" className="py-24 section-divider">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">Our <span className="text-[#e61e50]">Work</span></h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <motion.a
              key={index}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer block"
            >
              <div 
                className="aspect-[16/10] rounded-2xl overflow-hidden relative mb-4"
              >
                <div 
                  className="absolute inset-0 transition-all duration-500 group-hover:opacity-0"
                  style={{ 
                    backgroundImage: project.image ? `url(${project.image})` : project.gradient,
                    backgroundSize: '150%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                />
                <div 
                  className="absolute inset-0 transition-all duration-500 opacity-0 group-hover:opacity-100 bg-zinc-900"
                  style={{ 
                    backgroundImage: project.image ? `url(${project.image})` : project.gradient,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                  }}
                />
                {!project.image && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-20 text-5xl font-bold text-white uppercase tracking-tighter z-10">
                    {project.title.split(' ')[0]}
                  </div>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-100 group-hover:opacity-0 transition-opacity duration-300 flex items-center justify-center z-20">
                  <div className="w-16 h-16 rounded-full bg-[#e61e50] flex items-center justify-center">
                    <ArrowUpRight className="text-white w-8 h-8" />
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-1 group-hover:text-[#e61e50] transition-colors">{project.title}</h3>
              <p className="text-white/40 font-mono text-sm uppercase tracking-wider">{project.category}</p>
            </motion.a>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="#" className="text-[#e61e50] font-medium hover:text-white transition-colors underline underline-offset-4">
            View All
          </a>
        </div>
      </div>
    </section>
  );
}
