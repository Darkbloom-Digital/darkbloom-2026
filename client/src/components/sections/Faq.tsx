import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What kinds of projects do you take on?",
    a: "Custom websites, Shopify and ecommerce stores, AI tools and automations, and the occasional custom build that doesn't fit a neat category. If it lives on the web, there's a good chance we can build it.",
  },
  {
    q: "Do you work with clients outside Cleveland?",
    a: "Absolutely. We're based in Cleveland, TN, but we work remotely with clients anywhere. Most of the process happens over email, calls, and screen shares, so location is rarely an issue.",
  },
  {
    q: "I'm not technical. Is that a problem?",
    a: "Not at all. We handle the technical side and explain things in plain English. You bring the vision and the knowledge of your business; we figure out how to build it.",
  },
  {
    q: "How much does a project cost?",
    a: "Every project is quoted individually, because a one-page site and a custom Shopify build are very different animals. Tell us what you have in mind and we'll give you a clear, itemized quote with no surprises.",
  },
  {
    q: "How long does a typical project take?",
    a: "Most websites land in 2 to 4 weeks and ecommerce builds in 3 to 6, depending on scope and how quickly we get content and feedback from you. We'll give you a realistic timeline before we start.",
  },
  {
    q: "Can you work with my existing website?",
    a: "Usually, yes. We can redesign, rebuild, optimize, or extend what you already have, or start fresh if that's the smarter move. We'll tell you honestly which one makes sense for you.",
  },
  {
    q: "Do you help after launch, or just build and leave?",
    a: "Both are on the table. We offer ongoing support, updates, and maintenance to keep your site fast, secure, and current after launch. No disappearing acts.",
  },
  {
    q: "What's the AI work you offer?",
    a: "Practical things, not hype. Chatbots that answer customer questions, automations that cut repetitive busywork, and AI features wired into your site or workflow, scoped to what actually moves the needle for your business.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="py-32 relative overflow-hidden section-divider">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Common <span className="text-[#e61e50]">Questions</span>
          </h2>
          <p className="text-white/60 text-lg">
            Everything you might be wondering before reaching out.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-3xl mx-auto border-t border-white/10"
        >
          <Accordion type="single" collapsible defaultValue="faq-0">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="border-white/10"
                data-testid={`faq-item-${index}`}
              >
                <AccordionTrigger className="group py-6 hover:no-underline">
                  <span className="font-heading text-lg md:text-xl font-semibold pr-4 text-left transition-colors group-hover:text-[#e61e50] group-data-[state=open]:text-[#e61e50]">
                    {faq.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-white/60 leading-relaxed pb-6 max-w-2xl">{faq.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
