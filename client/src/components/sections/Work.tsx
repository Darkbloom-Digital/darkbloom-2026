import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Integrity Network Solutions",
    category: "Custom Website",
    url: "https://nteg.net",
    gradient: "linear-gradient(135deg, #1a365d 0%, #2d3748 100%)"
  },
  {
    title: "Austin Calfee",
    category: "Custom Website",
    url: "https://austincalfee.com",
    gradient: "linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)"
  },
  {
    title: "DocPeeler",
    category: "Custom Website",
    url: "https://docpeeler.com",
    gradient: "linear-gradient(135deg, #065f46 0%, #1f2937 100%)"
  },
  {
    title: "Hatta Boy Hat Co",
    category: "Shopify Store",
    url: "https://hattaboy.com",
    gradient: "linear-gradient(135deg, #78350f 0%, #292524 100%)"
  },
];

export default function Work() {
  return (
    <section id="work" className="py-24 section-divider">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Work</h2>
            <p className="text-white/50 max-w-md">We partner with ambitious brands to create digital experiences that sell.</p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-[#e61e50] font-medium hover:text-white transition-colors">
            View All Projects <ArrowUpRight size={18} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
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
                className="aspect-[16/10] rounded-2xl overflow-hidden relative mb-6"
                style={{ background: project.gradient }}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-20 text-5xl font-bold text-white uppercase tracking-tighter">
                  {project.title.split(' ')[0]}
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#e61e50] flex items-center justify-center transform scale-50 group-hover:scale-100 transition-transform duration-300">
                    <ArrowUpRight className="text-white w-8 h-8" />
                  </div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-1 group-hover:text-[#e61e50] transition-colors">{project.title}</h3>
              <p className="text-white/40 font-mono text-sm uppercase tracking-wider">{project.category}</p>
            </motion.a>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <button className="flex items-center gap-2 text-[#e61e50] font-medium hover:text-white transition-colors mx-auto">
            View All Projects <ArrowUpRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
