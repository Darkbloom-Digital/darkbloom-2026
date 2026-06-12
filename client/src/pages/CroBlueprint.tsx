import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, CheckCircle } from "lucide-react";

const pillars = [
  {
    title: "Strategic Positioning",
    description: "Your homepage has 3 seconds to hook a visitor. We optimize headlines, hero sections, and value propositions to instantly communicate why they should stay.",
  },
  {
    title: "Friction-Free Navigation",
    description: "Every click should move a visitor closer to a conversion. We restructure your site's layout and user flows to eliminate dead ends and confusion.",
  },
  {
    title: "Conversion Triggers",
    description: "From call-to-action placement to urgency cues and social proof, we implement proven psychological triggers that turn browsers into buyers.",
  },
  {
    title: "Data-Driven Decisions",
    description: "We don't guess, we test. Using analytics and A/B testing, we continuously refine your site based on real user behavior.",
  },
];

const checklist = [
  "Hero section audit: does it communicate value in 3 seconds?",
  "Call-to-action analysis: are buttons visible and compelling?",
  "Trust signal review: testimonials, badges, social proof placement",
  "Mobile conversion check: is the mobile experience optimized?",
  "Checkout flow analysis: identifying drop-off points",
  "Content hierarchy: does your page guide users to convert?",
  "Form optimization: reducing fields and friction",
  "Page speed impact on conversions: every second counts",
];

export default function CroBlueprint() {
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
            <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="text-cro-heading">
              CRO <span className="text-[#e61e50]">Blueprint</span>
            </h1>
            <p className="text-white/60 text-lg" data-testid="text-cro-subtitle">
              More traffic doesn't mean more sales. Our Conversion Rate Optimization blueprint turns the visitors you already have into paying customers.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-12 max-w-5xl mx-auto mb-24">
            {pillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group border-t border-white/10 pt-7 hover:border-[#e61e50]/60 transition-colors"
                data-testid={`card-cro-pillar-${index}`}
              >
                <span className="block font-sans text-sm font-medium tracking-widest text-[#e61e50] mb-4 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-2xl font-semibold mb-3">{pillar.title}</h3>
                <p className="text-white/50 leading-relaxed">{pillar.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
              Our CRO <span className="text-[#e61e50]">Checklist</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-x-10 gap-y-5">
              {checklist.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#e61e50] mt-0.5 shrink-0" />
                  <p className="text-white/60">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-20"
          >
            <p className="text-white/60 text-lg mb-6">Ready to convert more visitors into customers?</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#e61e50] hover:bg-[#c41540] text-white px-8 py-4 rounded-md font-medium transition-colors"
              data-testid="link-cro-cta"
            >
              Get Your CRO Blueprint <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
