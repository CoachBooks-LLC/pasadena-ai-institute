/**
 * Central site configuration for the Pasadena AI Institute.
 * Edit values here (price, dates, domain, contact) and they propagate
 * across the whole site, emails, and metadata.
 */

export const site = {
  name: "Pasadena AI Institute",
  shortName: "Pasadena AI",
  host: "Whistle Labs",
  hostUrl: "https://whistlelabs.ai",
  tagline: "Hosted by Whistle Labs",
  // Swap this when the GoDaddy domain is purchased + pointed at Vercel.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://pasadenaaiinstitute.com",
  contactEmail: "hello@pasadenaaiinstitute.com",
  city: "Pasadena, California",
  region: "Greater Los Angeles & Southern California",

  // The founding cohort (waitlist / apply-now framing).
  cohort: {
    label: "Founding Cohort",
    season: "Fall 2026",
    location: "Pasadena, CA",
    seats: 24,
    durationDays: 2,
  },

  // Pricing — single seat.
  price: {
    amountUsd: 995,
    display: "$995",
    currency: "usd",
    cents: 99500,
    label: "All-inclusive 2-day seat",
  },

  description:
    "A 2-day, in-person AI conference in Pasadena that takes professionals from zero to one with AI — whether you're starting from scratch or building a real idea. Hosted by Whistle Labs.",

  social: {
    linkedin: "https://www.linkedin.com/company/whistle-labs",
  },
} as const;

export type Site = typeof site;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/conference", label: "The Conference" },
  { href: "/who-its-for", label: "Who It's For" },
  { href: "/pasadena", label: "Pasadena" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
] as const;
