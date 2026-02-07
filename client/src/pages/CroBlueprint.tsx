import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingParticles from "@/components/FloatingParticles";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Target, MousePointerClick, LayoutGrid, LineChart, ArrowRight, CheckCircle } from "lucide-react";

const pillars = [
  {
    icon: <Target className="w-8 h-8" />,
    title: "Strategic Positioning",
    description: "Your homepage has 3 seconds to hook a visitor. We optimize headlines, hero sections, and value propositions to instantly communicate why they should stay.",
  },
  {
    icon: <LayoutGrid className="w-8 h-8" />,
    title: "Friction-Free Navigation",
    description: "Every click should move a visitor closer to a conversion. We restructure your site's layout and user flows to eliminate dead ends and confusion.",
  },
  {
    icon: <MousePointerClick className="w-8 h-8" />,
    title: "Conversion Triggers",
    description: "From call-to-action placement to urgency cues and social proof, we implement proven psychological triggers that turn browsers into buyers.",
  },
  {
    icon: <LineChart className="w-8 h-8" />,
    title: "Data-Driven Decisions",
    description: "We don't guess — we test. Using analytics and A/B testing, we continuously refine your site based on real user behavior.",
  },
];

const checklist = [
  "Hero section audit — does it communicate value in 3 seconds?",
  "Call-to-action analysis — are buttons visible and compelling?",
  "Trust signal review — testimonials, badges, social proof placement",
  "Mobile conversion check — is the mobile experience optimized?",
  "Checkout flow analysis — identifying drop-off points",
  "Content hierarchy — does your page guide users to convert?",
  "Form optimization — reducing fields and friction",
  "Page speed impact on conversions — every second counts",
];

export default function CroBlueprint() {
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
            <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="text-cro-heading">
              CRO <span className="text-[#e61e50]">Blueprint</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto" data-testid="text-cro-subtitle">
              More traffic doesn't mean more sales. Our Conversion Rate Optimization blueprint turns the visitors you already have into paying customers.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-24">
            {pillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 hover:border-[#e61e50]/30 transition-all group"
                data-testid={`card-cro-pillar-${index}`}
              >
                <div className="text-[#e61e50] bg-white/5 w-14 h-14 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#e61e50]/10 transition-colors">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{pillar.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{pillar.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                Our CRO <span className="text-[#e61e50]">Checklist</span>
              </h2>
              <div className="space-y-4">
                {checklist.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#e61e50] mt-0.5 flex-shrink-0" />
                    <p className="text-white/60 text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center mt-16"
          >
            <p className="text-white/60 text-lg mb-6">Ready to convert more visitors into customers?</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#e61e50] hover:bg-[#c41540] text-white px-8 py-4 rounded-xl font-medium transition-colors"
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
