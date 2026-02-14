import logo from "@assets/optimized/logo-wordmark.webp";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black py-10 md:py-16 border-t border-white/10 relative z-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 mb-8 md:mb-12">
          <div className="flex flex-col items-center md:items-start gap-2">
             <img 
               src={logo} 
               alt="Darkbloom Digital" 
               className="h-10 md:h-[60px] w-auto object-contain mix-blend-screen opacity-90" 
             />
             <p className="text-white/40 text-xs md:text-sm">
               Real websites for real brands.
             </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-3 md:gap-4">
            <div className="flex gap-3">
              <a href="http://instagram.com/darkbloomdigital/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-[#e61e50] hover:text-white transition-all">
                <FaInstagram className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61579367123290" target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-[#e61e50] hover:text-white transition-all">
                <FaFacebookF className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a href="https://www.linkedin.com/company/darkbloom-digital" target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-[#e61e50] hover:text-white transition-all">
                <FaLinkedinIn className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </div>
            <div className="flex flex-row gap-4 md:flex-col md:items-end md:gap-2">
              <a href="tel:423-951-1970" className="flex items-center gap-1.5 text-white/60 hover:text-[#e61e50] transition-colors text-xs md:text-sm">
                <Phone className="w-3.5 h-3.5 md:w-4 md:h-4" />
                (423) 951-1970
              </a>
              <a href="mailto:robdavis@darkbloomdigital.com" className="flex items-center gap-1.5 text-white/60 hover:text-[#e61e50] transition-colors text-xs md:text-sm">
                <Mail className="w-3.5 h-3.5 md:w-4 md:h-4" />
                robdavis@darkbloomdigital.com
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-6 md:pt-8 border-t border-white/10 text-xs text-white/30 text-center">
          <p>&copy; {new Date().getFullYear()} Darkbloom Digital. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
