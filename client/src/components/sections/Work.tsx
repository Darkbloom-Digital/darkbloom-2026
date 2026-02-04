import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import streetwearImg from "@assets/generated_images/neon_streetwear_fashion_photography_model_shot.png";

const projects = [
  {
    title: "Neon Streetwear",
    category: "Shopify Plus",
    image: `url(${streetwearImg})`,
    isImage: true
  },
  {
    title: "Luxe Cosmetics",
    category: "Custom Theme",
    image: "linear-gradient(135deg, #1f1f1f 0%, #333 100%)",
    isImage: false
  },
  {
    title: "Tech Gadgets",
    category: "Headless Commerce",
    image: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
    isImage: false
  },
];

export default function Work() {
  return (
    <section id="work" className="py-24 section-divider">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Selected Work</h2>
            <p className="text-white/50 max-w-md">We partner with ambitious brands to create digital experiences that sell.</p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-[#e61e50] font-medium hover:text-white transition-colors">
            View All Projects <ArrowUpRight size={18} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div 
                className="aspect-[4/5] rounded-lg overflow-hidden relative mb-6 bg-cover bg-center"
                style={{ background: project.image, backgroundSize: 'cover', backgroundPosition: 'center' }}
              >
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#e61e50] flex items-center justify-center transform scale-50 group-hover:scale-100 transition-transform duration-300">
                    <ArrowUpRight className="text-white w-8 h-8" />
                  </div>
                </div>
                
                {/* Text overlay for gradient placeholders */}
                {!project.isImage && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-30 font-display text-4xl font-bold text-white uppercase tracking-tighter">
                    {project.title.split(' ')[0]}
                  </div>
                )}
              </div>
              
              <h3 className="text-2xl font-bold mb-1 group-hover:text-[#e61e50] transition-colors">{project.title}</h3>
              <p className="text-white/40 font-mono text-sm uppercase tracking-wider">{project.category}</p>
            </motion.div>
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
