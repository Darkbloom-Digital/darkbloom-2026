import logo from "@assets/optimized/logo-wordmark.webp";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black py-16 border-t border-white/10 relative z-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="flex flex-col items-start gap-4">
             <img 
               src={logo} 
               alt="Darkbloom Digital" 
               className="h-[60px] w-auto object-contain mix-blend-screen opacity-90" 
             />
             <p className="text-white/40 text-sm text-left">
               Real websites for real brands.
             </p>
          </div>
          
          <div className="flex flex-col items-end gap-4">
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-[#e61e50] hover:text-white transition-all">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-[#e61e50] hover:text-white transition-all">
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-[#e61e50] hover:text-white transition-all">
                <FaLinkedinIn className="w-5 h-5" />
              </a>
            </div>
            <div className="flex flex-col items-end gap-2">
              <a href="tel:423-951-1970" className="flex items-center gap-2 text-white/60 hover:text-[#e61e50] transition-colors text-sm">
                <Phone className="w-4 h-4" />
                (423) 951-1970
              </a>
              <a href="mailto:robdavis@darkbloomdigital.com" className="flex items-center gap-2 text-white/60 hover:text-[#e61e50] transition-colors text-sm">
                <Mail className="w-4 h-4" />
                robdavis@darkbloomdigital.com
              </a>
            </div>
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
