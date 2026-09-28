// Portfolio projects and their case studies. Drives the homepage "Our Work"
// grid, /portfolio, each /portfolio/:slug page, and the sitemap.
//
// Anything wrapped in [[ROBBIE: ...]] is a placeholder for real client
// content. Do not replace these with made-up results, metrics, or quotes.
import austinImg from "@assets/optimized/austin-portfolio.webp";
import ntegImg from "@assets/optimized/nteg-portfolio.webp";
import docpeelerImg from "@assets/optimized/docpeeler-portfolio.webp";
import hattaboyImg from "@assets/optimized/hattaboy-portfolio.webp";
import catechImg from "@assets/optimized/catech-portfolio.webp";

export type Category = "Custom Website" | "Ecommerce" | "SaaS Platform" | "Automation";

export type Quote = { text: string[]; name: string; role: string };

export type Project = {
  slug: string;
  title: string;
  category: Category;
  /** Short line shown on the grid card. */
  summary: string;
  url?: string;
  image?: string;
  featured?: boolean;
  client: string;
  problem: string;
  built: string;
  highlights?: string[];
  results: string;
  stats?: { value: string; label: string }[];
  statsNote?: string;
  quote?: Quote;
};

export const PLACEHOLDER_PATTERN = /^\[\[ROBBIE:/;

export const caTechReview: Quote = {
  text: [
    "Working with Darkbloom Digital has been a great business decision. Robbie and the team have been incredibly attentive, organized, and genuinely invested in our success. They redesigned our website, continue to maintain it, and have helped improve our SEO, and the results have been outstanding. Since launching, we've seen significant growth in both website traffic and conversion rates.",
    "What really sets Darkbloom Digital apart is their level of service. They respond quickly, explain technical concepts in a way that's easy to understand, and always provide honest, expert recommendations that help us make informed decisions. They consistently meet deadlines, keep projects moving, and deliver exactly what they promise.",
    "One moment that really stood out was when we needed a landing page built on very short notice for a campaign launch. Even though Robbie was on vacation, he made sure we were taken care of so our campaign could launch on time. That level of dedication speaks volumes about the way they do business.",
    "Beyond their expertise, they're simply great people to work with. They make you feel like you're working with friends while maintaining the highest level of professionalism. I would highly recommend Darkbloom Digital to businesses of any size. They truly meet you where you are and help position your business for long-term success.",
  ],
  name: "Ashlin Hensley",
  role: "Creative Marketing Manager, CA Tech USA",
};

export const projects: Project[] = [
  {
    slug: "premier-construction",
    title: "Premier Construction",
    category: "Automation",
    summary: "A two-way integration that syncs Lowe's installation work orders with Jobber, so a home-improvement contractor stops re-entering every job by hand.",
    featured: true,
    client: "Premier Construction & Management, a home-improvement contractor and installer in Lowe's Installation Made Easy (IME) program",
    problem: "Much of Premier's work comes through Lowe's Installation Made Easy (IME) program, but the business runs on Jobber. The two systems didn't talk to each other, so every new work order had to be keyed into Jobber by hand, and every appointment had to be copied back into IME. That meant double entry on every job, slower updates, and plenty of room for mistakes.",
    built: "We built a custom two-way integration between Lowe's IME and Jobber. When a work order comes in or changes in IME, it lands in Jobber automatically as a client, property, and job, without creating duplicate clients, and each IME update is added to the job's timeline. When Premier schedules a visit in Jobber, the appointment is pushed back to IME, whether it's an estimate or an install. Jobs from outside the Lowe's program stay in Jobber only. It runs as a secure serverless service with status monitoring and alerts.",
    highlights: [
      "Lowe's IME work orders → Jobber jobs",
      "Jobber scheduling → IME appointments",
      "Automatic client de-duplication",
      "IME updates as Jobber timeline notes",
      "Non-Lowe's jobs kept separate",
      "Monitoring and alerts",
    ],
    results: "[[ROBBIE: Premier results: is it live in production, and what has it changed (time saved, double entry eliminated, jobs synced)?]]",
  },
  {
    slug: "hatta-boy-hat-co",
    title: "Hatta Boy Hat Co",
    category: "Ecommerce",
    summary: "A custom Shopify storefront for a hat brand, built for seamless browsing and checkout.",
    url: "https://hattaboy.com",
    image: hattaboyImg,
    featured: true,
    client: "Hatta Boy Hat Co",
    problem: "A growing hat brand needed a custom Shopify store that reflected their personality and made purchasing seamless.",
    built: "Built a custom Shopify theme with brand-aligned visuals, intuitive product navigation, and an optimized checkout flow.",
    results: "[[ROBBIE: Hatta Boy results and metrics]]",
    quote: {
      text: ["[[ROBBIE: Hatta Boy client quote, if available]]"],
      name: "[[ROBBIE: name]]",
      role: "[[ROBBIE: title]], Hatta Boy Hat Co",
    },
  },
  {
    slug: "ca-tech-usa",
    title: "CA Tech USA",
    category: "Ecommerce",
    summary: "A custom Shopify store and theme for an aftermarket UTV and off-road parts brand, built for fast browsing and a smooth checkout.",
    url: "https://catechusa.com",
    image: catechImg,
    client: "CA Tech USA, a race-proven manufacturer of billet aftermarket parts for UTVs and side-by-sides",
    problem: "CA Tech USA had outgrown the theme they launched on. It was good enough to get started, but a catalog of nearly 500 products and a growing brand needed more than a bandaid fix. They needed a storefront built to scale, one that could carry their reputation and keep converting as they grow.",
    built: "We rebuilt the store on a fully custom Shopify theme designed for scale. A structured catalog tames 478 products into something easy to browse, with fitment specs, install videos, and a customer gallery built in, so buyers can find the right part and learn to install it themselves. That self-service depth was a deliberate goal: give customers the answers up front, cut down on support calls and inquiries, and let people buy with confidence. The result is a fast, secure platform that looks as rugged as the parts it sells, with room to grow.",
    highlights: [
      "Fully custom Shopify theme",
      "Scalable catalog (478 products)",
      "Fitment specs & install videos",
      "Customer gallery for social proof",
      "Content hub / blog",
      "Fast, secure checkout",
    ],
    results: "[[ROBBIE: CA Tech results beyond the early conversion figure (traffic, SEO, current conversion rate)]]",
    stats: [
      { value: "478", label: "Products in the catalog" },
      { value: "~15%", label: "Lift in conversion rate, first two weeks post-launch" },
    ],
    statsNote: "Early figures, measured roughly two weeks after launch (conversion rate up from ~1.5% to ~1.72%).",
    quote: caTechReview,
  },
  {
    slug: "austin-calfee",
    title: "Austin Calfee",
    category: "Custom Website",
    summary: "A personal brand website designed to showcase expertise and drive business growth.",
    url: "https://austincalfee.com",
    image: austinImg,
    client: "Austin Calfee",
    problem: "Needed a personal website that positioned him as an authority and drove business growth through an impactful online presence.",
    built: "Designed a sleek personal brand site with focused messaging, social proof, and a conversion-optimized layout.",
    results: "[[ROBBIE: Austin Calfee results and metrics]]",
    quote: {
      text: [
        "I reached out to Robbie about building a website to help grow my business and had a meeting scheduled in no time to discuss exactly what I was wanting. He helped me fine tune what was necessary and what wasn't needed, was patient with me while I got all the information he needed to him, and delivered an excellent product that exceeded expectations. I will definitely use him again in the future.",
      ],
      name: "Austin Calfee",
      role: "Toyota of Cleveland",
    },
  },
  {
    slug: "integrity-network-solutions",
    title: "Integrity Network Solutions",
    category: "Custom Website",
    summary: "A professional website built for a network solutions company, featuring clean design and clear service presentation.",
    url: "https://nteg.net",
    image: ntegImg,
    client: "Integrity Network Solutions",
    problem: "Needed a professional web presence that clearly communicated their network solutions services to potential business clients.",
    built: "Built a clean, modern website with clear service breakdowns, strong calls to action, and a design that instills trust and professionalism.",
    results: "[[ROBBIE: Integrity Network Solutions results and metrics]]",
  },
  {
    slug: "docpeeler",
    title: "DocPeeler",
    category: "SaaS Platform",
    summary: "A software-as-a-service platform built with modern web technologies for streamlined document processing.",
    url: "https://docpeeler.com",
    image: docpeelerImg,
    client: "DocPeeler",
    problem: "[[ROBBIE: the problem DocPeeler solves / why it was built]]",
    built: "A software-as-a-service platform built with modern web technologies for streamlined document processing.",
    results: "[[ROBBIE: DocPeeler results and metrics]]",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const featuredProjects = projects.filter((p) => p.featured);
