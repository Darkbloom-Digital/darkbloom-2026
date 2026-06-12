import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Zap, CheckCircle } from "lucide-react";

const auditSteps = [
  {
    title: "Speed Analysis",
    description: "We measure your site's load time on mobile and desktop, identifying exactly what's slowing things down.",
  },
  {
    title: "SEO Health Check",
    description: "We review your on-page SEO, meta tags, structured data, and indexability to ensure search engines can find you.",
  },
  {
    title: "Core Web Vitals",
    description: "We analyze your LCP, FID, and CLS scores, the metrics Google uses to rank your site in search results.",
  },
  {
    title: "Action Plan",
    description: "You get a clear, prioritized list of fixes that will have the biggest impact on your site's performance.",
  },
];

const benefits = [
  "Faster page load times that keep visitors engaged",
  "Higher Google rankings through better Core Web Vitals",
  "Lower bounce rates and more conversions",
  "Optimized images, scripts, and server response times",
  "Mobile-first performance improvements",
  "Detailed report with actionable recommendations",
];

export default function PerformanceAudit() {
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
            <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="text-audit-heading">
              Performance <span className="text-[#e61e50]">Audit</span>
            </h1>
            <p className="text-white/60 text-lg" data-testid="text-audit-subtitle">
              Is your Shopify store or website leaving money on the table? A slow site costs you customers every day.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12 max-w-5xl mx-auto mb-24">
            {auditSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group border-t border-white/10 pt-6 hover:border-[#e61e50]/60 transition-colors"
                data-testid={`card-audit-step-${index}`}
              >
                <span className="block font-sans text-sm font-medium tracking-widest text-[#e61e50] mb-4 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{step.description}</p>
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
              What You <span className="text-[#e61e50]">Get</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-x-10 gap-y-5">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#e61e50] mt-0.5 shrink-0" />
                  <p className="text-white/60">{benefit}</p>
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
            <p className="text-white/60 text-lg mb-6">Try our free speed check tool</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* TODO: swap to audit.darkbloomdigital.com once the custom subdomain is live */}
              <a
                href="https://performance-snapshot.replit.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/20 hover:border-[#e61e50] text-white px-8 py-4 rounded-md font-medium transition-colors"
                data-testid="link-performance-snapshot"
              >
                Run Free Snapshot <Zap className="w-5 h-5" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#e61e50] hover:bg-[#c41540] text-white px-8 py-4 rounded-md font-medium transition-colors"
                data-testid="link-audit-cta"
              >
                Request Full Audit <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
