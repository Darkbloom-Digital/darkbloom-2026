import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingParticles from "@/components/FloatingParticles";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ShoppingBag, Code, Palette, Rocket, Layers, Monitor, ArrowRight } from "lucide-react";

const services = [
  {
    icon: <Monitor className="w-10 h-10" />,
    title: "Custom Websites",
    description: "Websites built from the ground up with performance, reliability, and maintainability in mind. We craft every page to reflect your brand and drive results.",
    features: ["Responsive design", "SEO-optimized", "Fast load times", "Custom functionality"],
  },
  {
    icon: <ShoppingBag className="w-10 h-10" />,
    title: "Shopify Stores",
    description: "Custom Shopify themes and storefronts designed to convert visitors into customers. From product pages to checkout, every detail is dialed in.",
    features: ["Custom themes", "App integrations", "Payment setup", "Inventory management"],
  },
  {
    icon: <Palette className="w-10 h-10" />,
    title: "UX-Driven Layouts",
    description: "Clear layouts and user flows designed to guide visitors, reduce friction, and support conversion. We design with purpose, not just aesthetics.",
    features: ["User research", "Wireframing", "Prototyping", "Usability testing"],
  },
  {
    icon: <Code className="w-10 h-10" />,
    title: "Custom Development",
    description: "Complex functionality, integrations, and features built to your exact specifications. If you can dream it, we can build it.",
    features: ["API integrations", "Custom apps", "Database design", "Third-party tools"],
  },
  {
    icon: <Rocket className="w-10 h-10" />,
    title: "Performance Optimization",
    description: "Lightning-fast load times and SEO optimization to maximize your reach and conversions. Speed matters — we make sure yours is unmatched.",
    features: ["Speed audits", "Core Web Vitals", "Image optimization", "Caching strategies"],
  },
  {
    icon: <Layers className="w-10 h-10" />,
    title: "Ongoing Support",
    description: "We don't disappear after launch. Continuous updates, maintenance, and improvements to keep your site running at peak performance.",
    features: ["Monthly updates", "Security patches", "Content changes", "Priority support"],
  },
];

export default function Services() {
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
            className="text-center mb-20"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="text-services-heading">
              What We <span className="text-[#e61e50]">Build</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto" data-testid="text-services-subtitle">
              From websites to Shopify stores, we create digital experiences that set your brand apart.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group rounded-2xl border border-white/5 hover:border-[#e61e50]/30 bg-white/[0.02] p-8 transition-all"
                data-testid={`card-service-${index}`}
              >
                <div className="mb-5 text-[#e61e50] bg-white/5 w-16 h-16 rounded-xl flex items-center justify-center group-hover:bg-[#e61e50]/10 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3" data-testid={`text-service-title-${index}`}>{service.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-5">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-white/40">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#e61e50]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-20"
          >
            <p className="text-white/60 text-lg mb-6">Ready to start your project?</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#e61e50] hover:bg-[#c41540] text-white px-8 py-4 rounded-xl font-medium transition-colors"
              data-testid="link-services-cta"
            >
              Get in Touch <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
