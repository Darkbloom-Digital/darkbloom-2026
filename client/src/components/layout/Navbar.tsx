import { Link } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X, Mail, ChevronDown, Phone } from "lucide-react";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { InsertContactInquiry } from "@shared/schema";
import logo from "@assets/optimized/logo-wordmark.webp";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<InsertContactInquiry>();

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactInquiry) => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to submit");
      return response.json();
    },
    onSuccess: () => {
      toast.success("Message sent! We'll be in touch soon.");
      reset();
      setContactOpen(false);
    },
    onError: () => {
      toast.error("Failed to send message. Please try again.");
    },
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { 
      name: "Our Work", 
      href: "/portfolio",
      dropdown: [
        { name: "Featured Projects", href: "/portfolio" },
        { name: "Case Studies", href: "/case-studies" },
      ]
    },
    { 
      name: "Resources", 
      href: "/performance-audit",
      dropdown: [
        { name: "Shopify Performance Audit", href: "/performance-audit" },
        { name: "CRO Blueprint", href: "/cro-blueprint" },
      ]
    },
    { name: "Contact", href: "/contact" },
  ];

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <>
      {/* Top Banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#e61e50] text-white text-sm">
        <div className="container mx-auto px-6 h-10 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="tel:+14239511970" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Phone size={14} />
              <span className="hidden sm:inline">423-951-1970</span>
            </a>
            <a href="mailto:robdavis@darkbloomdigital.com" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Mail size={14} />
              <span className="hidden sm:inline">robdavis@darkbloomdigital.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="http://instagram.com/darkbloomdigital/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" aria-label="Instagram">
              <FaInstagram size={16} />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61579367123290" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" aria-label="Facebook">
              <FaFacebookF size={14} />
            </a>
            <a href="https://www.linkedin.com/company/darkbloom-digital" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" aria-label="LinkedIn">
              <FaLinkedinIn size={16} />
            </a>
          </div>
        </div>
      </div>

      <nav
        className="fixed top-10 left-0 right-0 z-50 bg-black"
      >
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo - Left */}
          <div className="flex-1 flex items-center">
            <Link href="/" className="inline-flex items-center group cursor-pointer">
              <img 
                src={logo} 
                alt="Darkbloom Digital" 
                className="h-12 md:h-16 w-auto object-contain mix-blend-screen transition-transform group-hover:scale-105" 
              />
            </Link>
          </div>

          {/* Nav Links - Center */}
          <div className="hidden md:flex items-center justify-center gap-8 flex-1">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative"
                onMouseEnter={() => link.dropdown && setOpenDropdown(link.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {link.dropdown ? (
                  <button
                    className="text-sm font-medium text-white/80 hover:text-[#e61e50] transition-colors uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                    data-testid={`button-nav-${link.name.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.name}
                    <ChevronDown size={18} className={`transition-transform ${openDropdown === link.name ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-white/80 hover:text-[#e61e50] transition-colors uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap"
                    data-testid={`link-nav-${link.name.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.name}
                  </Link>
                )}
                {link.dropdown && openDropdown === link.name && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                    <div className="bg-zinc-900 border border-white/10 rounded-lg py-2 min-w-[200px] shadow-xl">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-white/70 hover:text-[#e61e50] hover:bg-white/5 transition-colors"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Icons - Right */}
          <div className="flex-1 flex items-center justify-end gap-4">
            <button
              data-testid="button-contact-offcanvas"
              onClick={() => setContactOpen(true)}
              className="hidden md:flex w-10 h-10 rounded-full border border-white/20 items-center justify-center text-white/70 hover:text-[#e61e50] hover:border-[#e61e50] transition-colors"
              aria-label="Contact us"
            >
              <Mail size={18} />
            </button>

            {/* Mobile Toggle */}
            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} strokeWidth={2.5} /> : <Menu size={28} strokeWidth={2.5} />}
            </button>
          </div>
        </div>

      </nav>

      {/* Full-Screen Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[60] bg-zinc-950 flex flex-col">
          <div className="flex items-center justify-between px-6 h-[120px] shrink-0">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="inline-flex items-center">
              <img src={logo} alt="Darkbloom Digital" className="h-12 w-auto object-contain mix-blend-screen" />
            </Link>
            <button onClick={() => setMobileMenuOpen(false)} className="text-white">
              <X size={28} />
            </button>
          </div>

          <div className="px-8 flex flex-col gap-2">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.dropdown ? (
                  <div>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === link.name ? null : link.name)}
                      className="w-full flex items-center justify-between text-2xl font-semibold text-white hover:text-[#e61e50] py-3 transition-colors"
                    >
                      {link.name}
                      <ChevronDown size={22} className={`transition-transform ${openDropdown === link.name ? 'rotate-180' : ''}`} />
                    </button>
                    {openDropdown === link.name && (
                      <div className="pl-4 flex flex-col gap-1 mb-2">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="text-lg text-white/60 hover:text-[#e61e50] py-2 transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className="block text-2xl font-semibold text-white hover:text-[#e61e50] py-3 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}

            <div className="mt-6">
              <Button
                className="w-full bg-[#e61e50] border-0 h-12"
                onClick={() => { setMobileMenuOpen(false); setContactOpen(true); }}
              >
                <Mail size={16} className="mr-2" /> Contact
              </Button>
            </div>
          </div>

          <div className="mt-auto shrink-0 px-8 pb-10">
            <div className="flex items-center justify-center gap-5">
              <a href="http://instagram.com/darkbloomdigital/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-[#e61e50] transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61579367123290" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-[#e61e50] transition-colors">
                <FaFacebookF size={18} />
              </a>
              <a href="https://www.linkedin.com/company/darkbloom-digital" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-[#e61e50] transition-colors">
                <FaLinkedinIn size={20} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Contact Offcanvas */}
      <Sheet open={contactOpen} onOpenChange={setContactOpen}>
        <SheetContent className="bg-zinc-900 border-white/10 text-white w-full sm:max-w-lg flex flex-col h-full p-6">
          <SheetHeader className="shrink-0">
            <SheetTitle className="text-2xl font-bold text-white">Get in Touch</SheetTitle>
            <SheetDescription className="text-white/60">
              Tell us about your project and we'll get back to you within 24 hours.
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleSubmit((data) => contactMutation.mutate(data))} className="flex flex-col flex-1 gap-4 mt-6">
            <div className="space-y-2 shrink-0">
              <label className="text-sm font-medium text-white/80">Name *</label>
              <Input
                data-testid="offcanvas-input-name"
                placeholder="John Doe"
                className="bg-white/5 border-white/10 text-white h-12"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}
            </div>
            <div className="space-y-2 shrink-0">
              <label className="text-sm font-medium text-white/80">Email *</label>
              <Input
                data-testid="offcanvas-input-email"
                type="email"
                placeholder="john@company.com"
                className="bg-white/5 border-white/10 text-white h-12"
                {...register("email", { 
                  required: "Email is required",
                  pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email" }
                })}
              />
              {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
            </div>
            <div className="space-y-2 shrink-0">
              <label className="text-sm font-medium text-white/80">Project Type *</label>
              <select
                data-testid="offcanvas-select-project-type"
                className="flex h-12 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#e61e50]"
                {...register("projectType", { required: "Required" })}
              >
                <option value="" className="bg-zinc-900">Select a project type</option>
                <option value="Custom Website" className="bg-zinc-900">Custom Website</option>
                <option value="Shopify Store" className="bg-zinc-900">Shopify Store</option>
                <option value="Website Redesign" className="bg-zinc-900">Website Redesign</option>
                <option value="Ongoing Support" className="bg-zinc-900">Ongoing Support</option>
                <option value="Other" className="bg-zinc-900">Other</option>
              </select>
              {errors.projectType && <p className="text-red-400 text-xs">{errors.projectType.message}</p>}
            </div>
            <div className="space-y-2 shrink-0">
              <label className="text-sm font-medium text-white/80">Current Website URL (optional)</label>
              <Input
                data-testid="offcanvas-input-website-url"
                type="text"
                placeholder="https://yourwebsite.com"
                className="bg-white/5 border-white/10 text-white h-12"
                {...register("websiteUrl")}
              />
            </div>
            <div className="space-y-2 flex-1 flex flex-col min-h-0">
              <label className="text-sm font-medium text-white/80">Details *</label>
              <Textarea
                data-testid="offcanvas-textarea-details"
                placeholder="Tell us about your project..."
                className="bg-white/5 border-white/10 text-white flex-1 resize-none"
                {...register("details", { required: "Please provide details" })}
              />
              {errors.details && <p className="text-red-400 text-xs">{errors.details.message}</p>}
            </div>
            <Button
              data-testid="offcanvas-button-submit"
              type="submit"
              className="w-full bg-[#e61e50] hover:bg-[#c41540] h-12 border-0 cursor-pointer shrink-0"
              disabled={contactMutation.isPending}
            >
              {contactMutation.isPending ? "Sending..." : "Send Message"}
            </Button>
          </form>
          <div className="shrink-0 flex items-center justify-center gap-4 pt-4 pb-2">
            <a href="http://instagram.com/darkbloomdigital/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-[#e61e50] hover:text-white transition-all">
              <FaInstagram className="w-5 h-5" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61579367123290" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-[#e61e50] hover:text-white transition-all">
              <FaFacebookF className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/company/darkbloom-digital" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-[#e61e50] hover:text-white transition-all">
              <FaLinkedinIn className="w-5 h-5" />
            </a>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
