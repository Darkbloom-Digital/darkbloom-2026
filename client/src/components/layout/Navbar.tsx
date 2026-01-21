import { Link } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { InsertContactInquiry } from "@shared/schema";
import logo from "@assets/DarkbloomLogoWordmarkFinalWhite_1768955288967.png";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newsletterOpen, setNewsletterOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");

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

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      toast.success("Thanks for subscribing!");
      setNewsletterEmail("");
      setNewsletterOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Shopify Expertise", href: "#shopify" },
    { name: "Work", href: "#work" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-black/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo - Left */}
          <div className="flex-1">
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
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-white/80 hover:text-[#e61e50] transition-colors uppercase tracking-wider"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Icons - Right */}
          <div className="flex-1 flex items-center justify-end gap-4">
            <button
              data-testid="button-newsletter"
              onClick={() => setNewsletterOpen(true)}
              className="hidden md:flex w-10 h-10 rounded-full border border-white/20 items-center justify-center text-white/70 hover:text-[#e61e50] hover:border-[#e61e50] transition-colors"
              aria-label="Subscribe to newsletter"
            >
              <Mail size={18} />
            </button>
            <button
              data-testid="button-contact-offcanvas"
              onClick={() => setContactOpen(true)}
              className="hidden md:flex w-10 h-10 rounded-full border border-white/20 items-center justify-center text-white/70 hover:text-[#e61e50] hover:border-[#e61e50] transition-colors"
              aria-label="Contact us"
            >
              <MessageSquare size={18} />
            </button>

            {/* Mobile Toggle */}
            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-zinc-950 border-b border-white/10 p-6 flex flex-col gap-4 shadow-xl">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-white hover:text-[#e61e50]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="flex gap-4 mt-4">
              <Button 
                variant="outline" 
                className="flex-1 border-white/20"
                onClick={() => { setMobileMenuOpen(false); setNewsletterOpen(true); }}
              >
                <Mail size={16} className="mr-2" /> Newsletter
              </Button>
              <Button 
                className="flex-1 bg-[#e61e50]"
                onClick={() => { setMobileMenuOpen(false); setContactOpen(true); }}
              >
                <MessageSquare size={16} className="mr-2" /> Contact
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Newsletter Popup */}
      <Dialog open={newsletterOpen} onOpenChange={setNewsletterOpen}>
        <DialogContent className="bg-zinc-900 border-white/10 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Stay in the Loop</DialogTitle>
            <DialogDescription className="text-white/60">
              Get monthly insights on Shopify trends, ecommerce tips, and exclusive offers.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleNewsletterSubmit} className="space-y-4 mt-4">
            <Input
              data-testid="input-newsletter-email"
              type="email"
              placeholder="your@email.com"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
              className="bg-white/5 border-white/10 text-white h-12"
            />
            <Button 
              data-testid="button-newsletter-submit"
              type="submit" 
              className="w-full bg-[#e61e50] hover:bg-[#c41540] h-12"
            >
              Subscribe
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Contact Offcanvas */}
      <Sheet open={contactOpen} onOpenChange={setContactOpen}>
        <SheetContent className="bg-zinc-900 border-white/10 text-white w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold text-white">Get in Touch</SheetTitle>
            <SheetDescription className="text-white/60">
              Tell us about your project and we'll get back to you within 24 hours.
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleSubmit((data) => contactMutation.mutate(data))} className="space-y-5 mt-8">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Name *</label>
              <Input
                data-testid="offcanvas-input-name"
                placeholder="John Doe"
                className="bg-white/5 border-white/10 text-white h-12"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
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
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Project Type *</label>
              <select
                data-testid="offcanvas-select-project-type"
                className="flex h-12 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#e61e50]"
                {...register("projectType", { required: "Required" })}
              >
                <option value="" className="bg-zinc-900">Select a project type</option>
                <option value="New Shopify Store" className="bg-zinc-900">New Shopify Store</option>
                <option value="Store Migration" className="bg-zinc-900">Store Migration</option>
                <option value="Custom Development" className="bg-zinc-900">Custom Development</option>
                <option value="Ongoing Management" className="bg-zinc-900">Ongoing Management</option>
              </select>
              {errors.projectType && <p className="text-red-400 text-xs">{errors.projectType.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Details *</label>
              <Textarea
                data-testid="offcanvas-textarea-details"
                placeholder="Tell us about your project..."
                className="bg-white/5 border-white/10 text-white min-h-[120px]"
                {...register("details", { required: "Please provide details" })}
              />
              {errors.details && <p className="text-red-400 text-xs">{errors.details.message}</p>}
            </div>
            <Button
              data-testid="offcanvas-button-submit"
              type="submit"
              className="w-full bg-[#e61e50] hover:bg-[#c41540] h-12 mt-4"
              disabled={contactMutation.isPending}
            >
              {contactMutation.isPending ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
}
