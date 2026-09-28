import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const points = [
  "Missed-call text-back",
  "AI phone answering",
  "Leads straight into Jobber or Housecall Pro",
  "Automatic review requests",
];

export default function TradesCallout() {
  return (
    <section id="trades" className="py-24 relative overflow-hidden section-divider">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16 items-center"
        >
          <div className="lg:col-span-7">
            <p className="text-[#e61e50] font-mono text-sm uppercase tracking-wider mb-4">For contractors & home service pros</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-5">
              Stop losing jobs to <span className="text-[#e61e50]">missed calls.</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              More than a quarter of calls to home service businesses go unanswered. We set up the systems that catch them and turn them into booked work, for HVAC, plumbing, roofing, electrical, and remodeling shops.
            </p>
            <Link
              href="/trades"
              className="inline-flex items-center gap-2 bg-[#e61e50] hover:bg-[#c41540] text-white px-8 py-4 rounded-md font-medium transition-colors"
              data-testid="link-home-trades"
            >
              See how it works <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <ul className="lg:col-span-5 space-y-4 lg:border-l lg:border-white/10 lg:pl-12">
            {points.map((point) => (
              <li key={point} className="flex items-center gap-3 text-white/70">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e61e50] shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
