# Pasadena AI Institute

> Go from **zero to one** with AI — a 2-day, in-person AI conference in Pasadena.
> Hosted by **Whistle Labs**.

This repo contains the **entire company**: the marketing website (a Next.js
funnel), the registration system (interest form + Stripe checkout), infographics,
and the full go-to-market kit (emails, pamphlets, strategy, and launch playbook).

---

## What's in here

```
app/                 Next.js App Router — pages + API routes
components/           Reusable UI (Nav, Footer, forms, cards, etc.)
lib/                  site config (lib/site.ts) + content data (lib/content.ts)
public/infographics/  5 SVG infographics (also embedded on the site)
marketing/            The whole GTM kit — START AT marketing/README.md
  ├─ BRAND.md             voice, colors, type, messaging (source of truth)
  ├─ GO-TO-MARKET.md      strategy, personas, channels, unit economics
  ├─ LAUNCH-PLAYBOOK.md   step-by-step to first customer + first conference
  ├─ emails/              7 copy-paste email templates
  └─ pamphlets/           flyer, one-pager, tri-fold brochure (print-ready HTML)
```

The website pages: Home, The Conference, Who It's For, Pasadena, About, FAQ, and
Register (the conversion hub).

---

## Run it locally

This project uses **[Bun](https://bun.sh)** (already installed). Node/npm also work.

```bash
bun install      # install dependencies (first time only)
bun run dev      # start the dev server → http://localhost:3000
```

Build for production:

```bash
bun run build
bun run start
```

The site runs **with zero configuration** — every integration has a graceful
fallback (see below), so you can develop and demo before any keys or domain exist.

---

## Configuration (all optional)

Copy `.env.example` to `.env.local` and fill in what you have. Nothing is required
to run the site.

| Variable | What it does | If unset |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Your live domain (for links, OG tags, Stripe redirects) | Defaults to `localhost` / the value in `lib/site.ts` |
| `STRIPE_SECRET_KEY` | Enables real $995 checkout | "Reserve" button shows a friendly "apply instead" fallback |
| `RESEND_API_KEY` + `LEAD_NOTIFY_EMAIL` | Emails you each interest-form lead | Leads are saved to `data/leads.json` and logged to the console |
| `RESEND_FROM_EMAIL` | Verified sender for lead emails | Falls back to Resend's test sender |

### The two registration paths
- **Interest form** → `POST /api/interest` → emails you the lead (Resend) and/or
  saves it to `data/leads.json`. You then follow up and book a Zoom call.
- **Stripe checkout** → `POST /api/checkout` → creates a Stripe Checkout Session
  for **$995** (price built inline — no Stripe dashboard product needed) and
  redirects to Stripe. Success/cancel return to `/register?status=...`.

---

## Change the important stuff in one place

Almost everything (name, price, cohort, seats, contact, domain) lives in
**`lib/site.ts`**. Edit there and it updates across the whole site, metadata, and
checkout. The 2-day agenda, tracks, outcomes, and FAQ live in **`lib/content.ts`**.

---

## Deploy (Vercel, recommended)

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) (framework auto-detected).
3. Add your env vars in Vercel's project settings.
4. Buy your domain (e.g. on GoDaddy) and point it at Vercel, then set
   `NEXT_PUBLIC_SITE_URL` to that domain.

The full, non-technical-friendly version of these steps is in
[`marketing/LAUNCH-PLAYBOOK.md`](./marketing/LAUNCH-PLAYBOOK.md) → *Phase 0*.

---

## Tech

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Stripe & Resend via plain
`fetch` (no SDK dependencies) · deploys static + serverless on Vercel.

---

*A Whistle Labs company · [whistlelabs.ai](https://whistlelabs.ai)*
