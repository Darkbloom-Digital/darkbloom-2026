import logo from "@assets/DarkbloomLogoWordmarkFinalWhite_1768954239512.png";

export default function Footer() {
  return (
    <footer className="bg-black py-16 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="flex flex-col items-center md:items-start gap-4">
             <img 
               src={logo} 
               alt="Darkbloom Digital" 
               className="h-24 w-auto object-contain mix-blend-screen opacity-90" 
             />
             <p className="text-white/40 text-sm max-w-xs text-center md:text-left">
               Premium digital agency specialized in Shopify development and brand elevation.
             </p>
          </div>
          
          <div className="flex gap-8">
            <a href="#" className="text-white/60 hover:text-[#e61e50] transition-colors">Instagram</a>
            <a href="#" className="text-white/60 hover:text-[#e61e50] transition-colors">Twitter</a>
            <a href="#" className="text-white/60 hover:text-[#e61e50] transition-colors">LinkedIn</a>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-xs text-white/30">
          <p>&copy; {new Date().getFullYear()} Darkbloom Digital. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
