import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const services = [
  {
    title: "Custom Websites",
    tagline: "Fast, reliable sites built from scratch.",
    description:
      "Custom-built websites engineered for speed, reliability, and growth. No bloated templates and no clunky page builders, just clean code written to fit your brand and your goals.",
    includes: ["Responsive design", "SEO foundation", "Fast load times", "Easy content editing", "Custom functionality"],
    timeline: "Typically 2 to 4 weeks",
  },
  {
    title: "Ecommerce & Shopify",
    tagline: "Storefronts built to sell.",
    description:
      "Custom Shopify builds and ecommerce experiences designed around conversion. From product pages to checkout, every step is built to turn browsers into buyers.",
    includes: ["Custom Shopify themes", "Product & collection setup", "App & payment integrations", "Checkout optimization", "Inventory workflows"],
    timeline: "Typically 3 to 6 weeks",
  },
  {
    title: "AI Solutions",
    tagline: "Put AI to work in your business.",
    description:
      "Practical AI that saves you time. Chatbots, automations, and smart integrations wired into your site and workflows, so AI handles the busywork while you focus on the work that matters.",
    includes: ["AI chatbots & assistants", "Workflow automation", "Content & data tools", "Model & API integration", "Custom AI features"],
    timeline: "Scoped to your use case",
  },
  {
    title: "Custom Development",
    tagline: "If you can imagine it, we build it.",
    description:
      "Complex features, integrations, and tools built to spec. The versatile, figure-it-out work that off-the-shelf solutions can't handle.",
    includes: ["API integrations", "Custom web apps", "Database design", "Third-party connections", "Automations"],
    timeline: "Scoped per project",
  },
  {
    title: "Performance & SEO",
    tagline: "Faster sites that rank.",
    description:
      "Speed and search visibility that compound over time. We audit, optimize, and tune until your site loads fast and shows up where it should.",
    includes: ["Speed audits", "Core Web Vitals fixes", "Image & asset optimization", "Technical SEO", "Search visibility"],
    timeline: "Typically 1 to 2 weeks",
  },
  {
    title: "Ongoing Support",
    tagline: "We don't disappear after launch.",
    description:
      "Continuous care to keep your site fast, secure, and current. Updates, fixes, and improvements handled so you don't have to think about it.",
    includes: ["Monthly updates", "Security patches", "Content changes", "Performance monitoring", "Priority support"],
    timeline: "Month to month",
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
            className="text-center mb-16 max-w-2xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="text-services-heading">
              What We <span className="text-[#e61e50]">Build</span>
            </h1>
            <p className="text-white/60 text-lg" data-testid="text-services-subtitle">
              Websites, ecommerce, and AI solutions, built to help your brand do more.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="max-w-3xl mx-auto border-t border-white/10"
          >
            <Accordion type="single" collapsible defaultValue="item-0">
              {services.map((service, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-white/10"
                  data-testid={`service-item-${index}`}
                >
                  <AccordionTrigger className="group py-6 hover:no-underline">
                    <div className="flex flex-col gap-1 pr-4 text-left">
                      <span className="font-heading text-xl md:text-2xl font-semibold transition-colors group-hover:text-[#e61e50] group-data-[state=open]:text-[#e61e50]">
                        <Title text={service.title} />
                      </span>
                      <span className="text-sm text-white/40">{service.tagline}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid md:grid-cols-2 gap-x-10 gap-y-6 pb-6">
                      <div>
                        <p className="text-white/60 leading-relaxed">{service.description}</p>
                        <p className="text-sm text-white/40 mt-4">{service.timeline}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-widest text-white/40 mb-3">What's included</p>
                        <ul className="space-y-2">
                          {service.includes.map((item, i) => (
                            <li key={i} className="flex items-center gap-2.5 text-sm text-white/60">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#e61e50] shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-20 max-w-2xl mx-auto"
          >
            <p className="text-white/60 text-lg mb-6">
              Need something that's not on this list? Figuring out new things is kind of our specialty.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#e61e50] hover:bg-[#c41540] text-white px-8 py-4 rounded-md font-medium transition-colors"
              data-testid="link-services-cta"
            >
              Tell us what you're building <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
