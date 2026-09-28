import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Placeholder, { SHOW_PLACEHOLDERS } from "@/components/Placeholder";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ArrowRight, BarChart3, Inbox, MessageSquareText, PhoneCall, Star } from "lucide-react";

const setupItems = [
  {
    icon: MessageSquareText,
    title: "Missed-call text-back",
    description: "Miss a call on a roof or under a sink? The caller gets a text from your business within seconds, so they don't move on to the next shop on Google.",
  },
  {
    icon: PhoneCall,
    title: "AI phone answering",
    description: "An AI receptionist picks up when you can't, answers common questions, and collects the job details so you can call back ready to quote.",
  },
  {
    icon: Inbox,
    title: "Leads land in Jobber or Housecall Pro",
    description: "New leads go straight into the software you already run your jobs from. No copying from voicemail, texts, or sticky notes.",
  },
  {
    icon: Star,
    title: "Automatic review requests",
    description: "When a job wraps up, your customer gets a friendly request for a Google review, so your rating keeps climbing without you chasing anyone.",
  },
  {
    icon: BarChart3,
    title: "Monthly report",
    description: "A plain-English report each month: calls caught, leads captured, reviews earned, and what we're tuning next.",
  },
];

const steps = [
  {
    title: "Free missed-call audit",
    description: "We look at how calls and leads flow through your business today and show you where jobs are slipping through.",
  },
  {
    title: "Setup in about a week",
    description: "We build and connect everything to your phone number and your field-service software, then test it end to end.",
  },
  {
    title: "Managed monthly",
    description: "We keep it running, watch the numbers, and keep improving it. You get on with the work.",
  },
];

const trades = ["HVAC", "Plumbing", "Roofing", "Electrical", "Remodeling", "Other"];
const softwareOptions = ["Jobber", "Housecall Pro", "ServiceTitan", "Other", "None"];

type AuditForm = {
  name: string;
  business: string;
  trade: string;
  phone: string;
  email: string;
  software: string;
};

const fieldClass = "bg-white/5 border-white/10 focus-visible:ring-[#e61e50] text-white h-12";
const selectClass =
  "flex h-12 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#e61e50]";

function AuditFormCard() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<AuditForm>();

  const mutation = useMutation({
    mutationFn: async (data: AuditForm) => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          projectType: "Missed-call audit (Trades)",
          details: `Free missed-call audit request from ${data.business} (${data.trade}). Current software: ${data.software}.`,
        }),
      });
      if (!response.ok) throw new Error("Failed to submit");
      return response.json();
    },
    onSuccess: () => {
      toast.success("Got it! We'll reach out to schedule your free audit.");
      reset();
    },
    onError: () => {
      toast.error("Failed to send. Please try again or call 423-951-1970.");
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-5" data-testid="form-trades-audit">
      <div className="grid md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label htmlFor="audit-name" className="text-sm font-medium text-white/80">Name *</label>
          <Input id="audit-name" placeholder="Jane Smith" className={fieldClass} {...register("name", { required: "Name is required" })} />
          {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="audit-business" className="text-sm font-medium text-white/80">Business *</label>
          <Input id="audit-business" placeholder="Smith Heating & Air" className={fieldClass} {...register("business", { required: "Business name is required" })} />
          {errors.business && <p className="text-red-400 text-xs">{errors.business.message}</p>}
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label htmlFor="audit-phone" className="text-sm font-medium text-white/80">Phone *</label>
          <Input id="audit-phone" type="tel" placeholder="(423) 555-0123" className={fieldClass} {...register("phone", { required: "Phone is required" })} />
          {errors.phone && <p className="text-red-400 text-xs">{errors.phone.message}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="audit-email" className="text-sm font-medium text-white/80">Email *</label>
          <Input
            id="audit-email"
            type="email"
            placeholder="jane@smithhvac.com"
            className={fieldClass}
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email" },
            })}
          />
          {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label htmlFor="audit-trade" className="text-sm font-medium text-white/80">Trade *</label>
          <select id="audit-trade" className={selectClass} {...register("trade", { required: "Required" })}>
            <option value="" className="bg-zinc-900">Select your trade</option>
            {trades.map((t) => (
              <option key={t} value={t} className="bg-zinc-900">{t}</option>
            ))}
          </select>
          {errors.trade && <p className="text-red-400 text-xs">{errors.trade.message}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="audit-software" className="text-sm font-medium text-white/80">Current software *</label>
          <select id="audit-software" className={selectClass} {...register("software", { required: "Required" })}>
            <option value="" className="bg-zinc-900">Select one</option>
            {softwareOptions.map((s) => (
              <option key={s} value={s} className="bg-zinc-900">{s}</option>
            ))}
          </select>
          {errors.software && <p className="text-red-400 text-xs">{errors.software.message}</p>}
        </div>
      </div>
      <Button
        type="submit"
        size="lg"
        className="w-full bg-[#e61e50] hover:bg-[#c41540] text-white text-lg h-14 border-0 cursor-pointer"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Sending..." : "Book a free missed-call audit"}
      </Button>
    </form>
  );
}

export default function Trades() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-[#e61e50] selection:text-white relative">
      <Navbar />
      <main className="relative z-10 pt-32 pb-24">
        {/* a. Headline + problem */}
        <section className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-[#e61e50] font-mono text-sm uppercase tracking-wider mb-4">For HVAC, plumbing, roofing, electrical & remodeling contractors</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6" data-testid="text-trades-heading">
              Every missed call is a job <span className="text-[#e61e50]">someone else books.</span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              You can't answer the phone from a ladder or a crawlspace. We set up the systems that catch those calls, follow up instantly, and put the lead in front of you, so you stop losing work you already earned.
            </p>
            <a
              href="#audit"
              className="inline-flex items-center gap-2 bg-[#e61e50] hover:bg-[#c41540] text-white px-8 py-4 rounded-md font-medium transition-colors"
            >
              Book a free missed-call audit <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8 max-w-3xl mx-auto border-y border-white/10 py-10">
            <div>
              <p className="text-4xl md:text-5xl font-bold text-[#e61e50] mb-2 tabular-nums">27%</p>
              <p className="text-white/60">of calls to home service businesses go unanswered.</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-[#e61e50] mb-2 tabular-nums">~$45,600</p>
              <p className="text-white/60">lost per year by the average HVAC shop to missed calls.</p>
            </div>
          </div>
          <p className="text-xs text-white/30 max-w-3xl mx-auto mt-3">Source: Sameday AI.</p>
        </section>

        {/* b. What we set up */}
        <section className="container mx-auto px-6 pt-32">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              What We <span className="text-[#e61e50]">Set Up</span>
            </h2>
            <p className="text-white/60 text-lg">A done-for-you system that works while you're on the job.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-14 max-w-6xl mx-auto">
            {setupItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="border-t border-white/10 pt-7 hover:border-[#e61e50]/60 transition-colors"
              >
                <item.icon className="w-6 h-6 text-[#e61e50] mb-4" aria-hidden="true" />
                <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                <p className="text-white/50 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* c. How it works + d. pricing note */}
        <section className="container mx-auto px-6 pt-32">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold">
              How It <span className="text-[#e61e50]">Works</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-x-12 gap-y-10 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.title} className="flex gap-4">
                <span className="font-sans text-sm font-medium text-[#e61e50] tabular-nums pt-1.5 shrink-0">0{index + 1}</span>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-white/50 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-white/70 text-lg max-w-2xl mx-auto mt-16 border-t border-white/10 pt-10">
            Setup plus a flat monthly plan, quoted after your free audit.
          </p>
        </section>

        {/* e. Case study slot */}
        <section className="container mx-auto px-6 pt-32">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <p className="text-[#e61e50] font-mono text-sm uppercase tracking-wider mb-3">Case Study</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Premier Construction</h2>
              <Link
                href="/portfolio/premier-construction"
                className="inline-flex items-center gap-2 text-[#e61e50] font-medium hover:text-white transition-colors underline underline-offset-4"
              >
                Read the case study <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="lg:col-span-7 text-white/60 leading-relaxed space-y-4">
              <p>
                Premier gets much of its work through Lowe's installation program but runs the business in Jobber, so every job was being entered twice. We connected the two: new work orders now land in Jobber automatically, and appointments scheduled in Jobber flow back to Lowe's.
              </p>
              {SHOW_PLACEHOLDERS && (
                <p>
                  <Placeholder>[[ROBBIE: Premier results]]</Placeholder>
                </p>
              )}
            </div>
          </div>
        </section>

        {/* f. Audit form */}
        <section id="audit" className="container mx-auto px-6 pt-32 scroll-mt-32">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Book a Free <span className="text-[#e61e50]">Missed-Call Audit</span>
              </h2>
              <p className="text-white/60 text-lg">
                Tell us a little about your shop. We'll show you where calls and leads are slipping through, and what it would take to catch them.
              </p>
            </div>
            <AuditFormCard />
            <p className="text-center text-white/40 text-sm mt-6">
              Prefer to talk? Call <a href="tel:+14239511970" className="text-white/70 hover:text-[#e61e50] transition-colors">423-951-1970</a>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
