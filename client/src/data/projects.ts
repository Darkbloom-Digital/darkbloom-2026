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

export type Category = "Custom Website" | "Ecommerce" | "SaaS Platform" | "API Integration";

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
  /** Service tags shown on the case study page. */
  services?: string[];
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
    category: "API Integration",
    summary: "A live two-way integration that keeps a Lowe's-contracted installer's work orders and Jobber in sync, so jobs no longer get re-keyed by hand.",
    featured: true,
    services: ["API Integration", "Custom Development", "Managed Services", "Trades & Contractors"],
    client: "Premier Construction, a Lowe's-contracted installer",
    problem: "Premier's installer work arrives through one system, but the business runs on Jobber. Every job and every update had to be entered twice, by hand, and the owner was the bottleneck for scheduling and data entry. That meant hours lost to admin, and jobs that could slip or run late when something didn't get copied over.",
    built: "We built a custom two-way API integration between Premier's installer platform and Jobber. New jobs and updates flow in both directions automatically: work orders land in Jobber as clients, properties, and jobs without creating duplicates, status updates are added to each job's timeline, and appointments scheduled in Jobber are pushed back automatically. Premier's own outside jobs stay in Jobber only. It's live in production, and we keep it running under an ongoing managed services plan covering maintenance, security, and support.",
    highlights: [
      "Two-way sync, in real time",
      "Jobs & updates flow both directions",
      "Scheduling pushed back automatically",
      "Automatic client de-duplication",
      "Outside jobs kept separate",
      "Managed maintenance, security & support",
    ],
    results: "The manual re-entry is gone. Jobs and updates land where they need to be without anyone copying them over, fewer jobs get missed or run late, and the owner's time is freed up for running the business instead of doing data entry.",
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
