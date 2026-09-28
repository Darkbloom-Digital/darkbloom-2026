// Per-page SEO metadata and site-wide structured data.
//
// Used in two places:
//  - scripts/prerender.mjs (via entry-server) writes these tags into each
//    route's static HTML at build time, so crawlers see them without JS.
//  - App.tsx keeps document.title / meta tags in sync on client-side navigation.

export const SITE_URL = "https://darkbloomdigital.com";
export const OG_IMAGE = `${SITE_URL}/opengraph.jpg`;

export type PageMeta = {
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
};

const pages: Record<string, Omit<PageMeta, "path">> = {
  "/": {
    title: "Darkbloom Digital | Web Design, Shopify & AI Automation in Cleveland, TN",
    description:
      "Darkbloom Digital builds custom websites, Shopify stores, and AI automations for businesses in Cleveland, Chattanooga, and beyond. Fast, SEO-ready, and built to convert.",
  },
  "/services": {
    title: "Services | Custom Websites, Shopify, AI & SEO | Darkbloom Digital",
    description:
      "Custom websites, Shopify and ecommerce builds, AI automations, custom development, performance and SEO, and ongoing support from Darkbloom Digital in Cleveland, TN.",
  },
  "/portfolio": {
    title: "Our Work | Websites & Shopify Stores We've Built | Darkbloom Digital",
    description:
      "See the websites, Shopify stores, and platforms Darkbloom Digital has built, and read the case studies behind them.",
  },
  "/case-studies": {
    title: "Case Studies | Darkbloom Digital",
    description:
      "A deeper look at the challenges Darkbloom Digital has solved for clients and the results we delivered.",
  },
  "/contact": {
    title: "Contact | Darkbloom Digital, Cleveland, TN Web Design & Development",
    description:
      "Tell us about your project. Darkbloom Digital serves Cleveland and Chattanooga, TN, and clients nationwide. Call 423-951-1970 or send a message.",
  },
  "/performance-audit": {
    title: "Website Performance Audit | Speed & SEO Check | Darkbloom Digital",
    description:
      "Find out what's slowing your website or Shopify store down. Speed, Core Web Vitals, and SEO health checks with a prioritized action plan.",
  },
  "/cro-blueprint": {
    title: "CRO Blueprint | Conversion Rate Optimization | Darkbloom Digital",
    description:
      "Turn the visitors you already have into customers. Darkbloom Digital's conversion rate optimization blueprint and checklist.",
  },
  "/faq": {
    title: "FAQ | Darkbloom Digital",
    description:
      "Answers to common questions about working with Darkbloom Digital: project types, timelines, quotes, AI work, and support after launch.",
  },
};

const notFound: Omit<PageMeta, "path"> = {
  title: "Page Not Found | Darkbloom Digital",
  description: "The page you're looking for doesn't exist.",
  noindex: true,
};

/** Every path that gets its own prerendered HTML file. */
export function prerenderPaths(): string[] {
  return Object.keys(pages);
}

export function getPageMeta(path: string): PageMeta {
  const clean = path.length > 1 ? path.replace(/\/+$/, "") : path;
  const meta = pages[clean];
  return meta ? { path: clean, ...meta } : { path: clean, ...notFound };
}

// Footer / navbar social profiles, reused for JSON-LD sameAs.
export const SOCIAL_LINKS = [
  "https://www.instagram.com/darkbloomdigital/",
  "https://www.facebook.com/profile.php?id=61579367123290",
  "https://www.linkedin.com/company/darkbloom-digital",
];

export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Darkbloom Digital",
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.png`,
      image: OG_IMAGE,
      email: "robdavis@darkbloomdigital.com",
      telephone: "+1-423-951-1970",
      sameAs: SOCIAL_LINKS,
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#localbusiness`,
      name: "Darkbloom Digital",
      description:
        "Web design, Shopify development, and AI automation agency based in Cleveland, TN, serving Cleveland and Chattanooga.",
      url: SITE_URL,
      image: OG_IMAGE,
      logo: `${SITE_URL}/favicon.png`,
      telephone: "+1-423-951-1970",
      email: "robdavis@darkbloomdigital.com",
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Cleveland",
        addressRegion: "TN",
        addressCountry: "US",
      },
      areaServed: [
        { "@type": "City", name: "Cleveland, TN" },
        { "@type": "City", name: "Chattanooga, TN" },
        { "@type": "State", name: "Tennessee" },
      ],
      sameAs: SOCIAL_LINKS,
    },
  ],
};

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** The per-page <head> tags injected into each prerendered HTML file. */
export function renderHeadTags(meta: PageMeta): string {
  const url = `${SITE_URL}${meta.path === "/" ? "/" : meta.path}`;
  const title = escapeAttr(meta.title);
  const description = escapeAttr(meta.description);
  const tags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    meta.noindex
      ? `<meta name="robots" content="noindex, follow" />`
      : `<meta name="robots" content="index, follow" />`,
    meta.noindex ? "" : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:site_name" content="Darkbloom Digital" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    `<script type="application/ld+json">${JSON.stringify(structuredData).replace(/</g, "\\u003c")}</script>`,
  ];
  return tags.filter(Boolean).join("\n    ");
}

/** Client-side: update title/description/canonical/og after navigation. */
export function applyPageMeta(meta: PageMeta) {
  const url = `${SITE_URL}${meta.path === "/" ? "/" : meta.path}`;
  document.title = meta.title;
  const set = (selector: string, attr: string, value: string) => {
    const el = document.head.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  };
  set('meta[name="description"]', "content", meta.description);
  set('link[rel="canonical"]', "href", url);
  set('meta[property="og:title"]', "content", meta.title);
  set('meta[property="og:description"]', "content", meta.description);
  set('meta[property="og:url"]', "content", url);
  set('meta[name="twitter:title"]', "content", meta.title);
  set('meta[name="twitter:description"]', "content", meta.description);
}
