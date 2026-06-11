import { motion } from "framer-motion";

const services = [
  {
    title: "Custom Websites",
    description: "High-performance websites built from the ground up to be fast, reliable, and easy to grow.",
  },
  {
    title: "Ecommerce & Shopify",
    description: "Custom Shopify storefronts and ecommerce builds designed to turn browsers into buyers.",
  },
  {
    title: "AI Solutions",
    description: "AI assistants, automations, and smart integrations that put AI to work across your business.",
  },
  {
    title: "Custom Development",
    description: "Complex features, integrations, and tooling built to your exact specifications.",
  },
  {
    title: "Performance & SEO",
    description: "Lightning-fast load times and search visibility that maximize your reach and conversions.",
  },
  {
    title: "Ongoing Support",
    description: "We don't disappear after launch. Continuous updates, maintenance, and improvements.",
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
    <section id="services" className="py-32 relative overflow-hidden section-divider">
      <div className="container mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            What We <span className="text-[#e61e50]">Build</span>
          </h2>
          <p className="text-white/60 text-lg leading-relaxed">
            Websites, ecommerce, and AI solutions, built to help your brand do more.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-14">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group border-t border-white/10 pt-7 hover:border-[#e61e50]/60 transition-colors"
            >
              <span className="block font-sans text-sm font-medium tracking-widest text-[#e61e50] mb-5 tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-2xl font-semibold mb-3">
                <Title text={service.title} />
              </h3>
              <p className="text-white/50 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
