import { motion } from "framer-motion";
import { ShoppingBag, Code, Palette, Rocket, Globe, Smartphone, Monitor, Layers } from "lucide-react";
import shopifyImg from "@assets/optimized/shopify-dashboard.webp";

const services = [
  {
    icon: <Monitor className="w-8 h-8 text-[#e61e50]" />,
    title: "Custom Websites",
    description: "Websites built from the ground up with performance, reliability, and maintainability in mind.",
  },
  {
    icon: <ShoppingBag className="w-8 h-8 text-[#e61e50]" />,
    title: "Shopify Stores",
    description: "Custom Shopify themes and storefronts designed to convert visitors into customers.",
  },
  {
    icon: <Palette className="w-8 h-8 text-[#e61e50]" />,
    title: "UX-Driven Layouts",
    description: "Clear layouts and user flows designed to guide visitors, reduce friction, and support conversion.",
  },
  {
    icon: <Code className="w-8 h-8 text-[#e61e50]" />,
    title: "Custom Development",
    description: "Complex functionality, integrations, and features built to your exact specifications.",
  },
  {
    icon: <Rocket className="w-8 h-8 text-[#e61e50]" />,
    title: "Performance Optimization",
    description: "Lightning-fast load times and SEO optimization to maximize your reach and conversions.",
  },
  {
    icon: <Layers className="w-8 h-8 text-[#e61e50]" />,
    title: "Ongoing Support",
    description: "We don't disappear after launch. Continuous updates, maintenance, and improvements.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 relative overflow-hidden section-divider">
      <div className="container mx-auto px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What We <span className="text-[#e61e50]">Build</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
            From websites to Shopify stores, we create digital experiences that set your brand apart.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 rounded-2xl border border-white/5 hover:border-[#e61e50]/30 transition-colors group"
            >
              <div className="mb-4 bg-white/5 w-14 h-14 rounded-xl flex items-center justify-center group-hover:bg-[#e61e50]/10 transition-colors">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-sm text-white/50">{service.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
