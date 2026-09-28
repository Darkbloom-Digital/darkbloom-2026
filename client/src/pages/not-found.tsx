import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-[#e61e50] selection:text-white relative">
      <Navbar />
      <main className="relative z-10 pt-48 pb-32">
        <div className="container mx-auto px-6 text-center max-w-2xl">
          <p className="text-[#e61e50] font-mono text-sm uppercase tracking-wider mb-4">404</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Page not <span className="text-[#e61e50]">found.</span>
          </h1>
          <p className="text-white/60 text-lg mb-10">The page you're looking for doesn't exist or has moved.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#e61e50] hover:bg-[#c41540] text-white px-8 py-4 rounded-md font-medium transition-colors"
          >
            Back to home <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
