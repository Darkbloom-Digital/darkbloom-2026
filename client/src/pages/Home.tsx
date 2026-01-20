import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-[#e61e50] selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Work />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
