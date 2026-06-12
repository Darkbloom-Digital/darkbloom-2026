import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Team from "@/components/sections/Team";
import Work from "@/components/sections/Work";
import Reviews from "@/components/sections/Reviews";
import Faq from "@/components/sections/Faq";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-[#e61e50] selection:text-white relative">
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Services />
        <Team />
        <Work />
        <Reviews />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
