import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Team from "@/components/sections/Team";
import Work from "@/components/sections/Work";
import Reviews from "@/components/sections/Reviews";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import FloatingParticles from "@/components/FloatingParticles";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-[#e61e50] selection:text-white relative">
      <FloatingParticles className="absolute top-0 left-0 w-full h-[500vh] z-0 pointer-events-none" />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Services />
        <Team />
        <Work />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
