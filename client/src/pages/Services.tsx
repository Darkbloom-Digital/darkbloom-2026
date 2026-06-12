import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const services = [
  {
    title: "Custom Websites",
    description: "Websites built from the ground up to be fast, reliable, and easy to grow. Every page is crafted to reflect your brand and drive results.",
    features: ["Responsive design", "SEO-optimized", "Fast load times", "Custom functionality"],
  },
  {
    title: "Ecommerce & Shopify",
    description: "Custom Shopify storefronts and ecommerce builds designed to turn browsers into buyers. Every detail from product page to checkout is dialed in.",
    features: ["Custom Shopify themes", "App integrations", "Payments & checkout", "Inventory management"],
  },
  {
    title: "AI Solutions",
    description: "AI assistants, automations, and smart integrations that put AI to work across your business, cutting busywork so you can scale.",
    features: ["AI chatbots & assistants", "Workflow automation", "Content & data tools", "Model & API integration"],
  },
  {
    title: "Custom Development",
    description: "Complex functionality, integrations, and features built to your exact specifications. If you can dream it, we can build it.",
    features: ["API integrations", "Custom apps", "Database design", "Third-party tools"],
  },
  {
    title: "Performance & SEO",
    description: "Lightning-fast load times and search visibility that maximize your reach and conversions. Speed matters, and we make sure yours is unmatched.",
    features: ["Speed audits", "Core Web Vitals", "Image optimization", "Search visibility"],
  },
  {
    title: "Ongoing Support",
    description: "We don't disappear after launch. Continuous updates, maintenance, and improvements keep your site running at peak performance.",
    features: ["Monthly updates", "Security patches", "Content changes", "Priority support"],
  },
];

// Render a title, setting any ampersand in the clean sans face so the ornate
// serif "&" doesn't clash at heading size.
function Title({ text }: { text: string }) {
  const parts = text.split(" & ");
  if (parts.length === 2) {
    return (
      <>
        {parts[0]} <span className="font-sans font-light text-white/70">&</span> {parts[1]}
      </>
    );
  }
  return <>{text}</>;
}

export default function Services() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-[#e61e50] selection:text-white relative">
      <Navbar />
      <main className="relative z-10 pt-32 pb-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20 max-w-2xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="text-services-heading">
              What We <span className="text-[#e61e50]">Build</span>
            </h1>
            <p className="text-white/60 text-lg" data-testid="text-services-subtitle">
              Websites, ecommerce, and AI solutions, built to help your brand do more.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-14 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group border-t border-white/10 pt-7 hover:border-[#e61e50]/60 transition-colors"
                data-testid={`card-service-${index}`}
              >
                <h3 className="text-2xl font-semibold mb-3" data-testid={`text-service-title-${index}`}>
                  <Title text={service.title} />
                </h3>
                <p className="text-white/50 leading-relaxed mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm text-white/40">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#e61e50] shrink-0" />
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
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-24"
          >
            <p className="text-white/60 text-lg mb-6">Ready to start your project?</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#e61e50] hover:bg-[#c41540] text-white px-8 py-4 rounded-md font-medium transition-colors"
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
