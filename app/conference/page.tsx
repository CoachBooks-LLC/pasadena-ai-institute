import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/Section";
import { PageHero } from "@/components/PageHero";
import { AgendaTimeline } from "@/components/AgendaTimeline";
import { PricingCard } from "@/components/PricingCard";
import { CTABand } from "@/components/CTA";
import { site } from "@/lib/site";
import { toolkit } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Conference",
  description:
    "Two days, in person in Pasadena. The full curriculum: get set up, get fluent, then build something real with AI. Hosted by Whistle Labs.",
};

const included = [
  "Two full days of hands-on, in-person instruction",
  "A small cohort with real, personal attention",
  "Complete software setup on your own laptop",
  "Working lunches both days",
  "All materials, templates, and resources",
  "Live build time with experts working the room",
  "A personalized next-steps plan",
  "Access to the alumni community",
];

const bring = [
  "Your laptop (Mac or Windows — we'll get it set up)",
  "Your curiosity and your questions",
  "Track 2: an idea you want to build — even a rough one",
];

export default function ConferencePage() {
  return (
    <>
      <PageHero
        eyebrow={`${site.cohort.label} · ${site.cohort.season}`}
        title="Two days that change how you work"
        intro="Day 1 gets you set up and genuinely fluent with AI. Day 2 you build something real — a workflow for your work, or a prototype of your idea. Here's exactly how it goes."
      />

      {/* What it is */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="eyebrow">The format</span>
            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
              Built for doing, not just listening
            </h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink-600">
              <p>
                This isn&rsquo;t a lecture you sit through. It&rsquo;s a guided,
                hands-on workshop in a small room in Pasadena. You work on your
                own laptop, on your own goals, with our team beside you the whole
                way.
              </p>
              <p>
                We start at absolute zero — no experience needed — and by the end
                of the second day you&rsquo;ll have built something you can keep
                using and growing.
              </p>
            </div>

            <h3 className="mt-10 text-xl font-semibold">What&rsquo;s included</h3>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-ink-700">
                  <Check />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h3 className="mt-10 text-xl font-semibold">What to bring</h3>
            <ul className="mt-4 space-y-2.5">
              {bring.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-ink-700">
                  <span className="mt-1 text-amber-600">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:pt-10">
            <PricingCard />
          </div>
        </div>
      </Section>

      {/* Agenda */}
      <section className="bg-canvas-soft" id="agenda">
        <div className="container-x py-16 sm:py-24">
          <SectionHeading
            align="center"
            eyebrow="Hour by hour"
            title="The full two-day agenda"
            intro="A clear path from foundations to building. Times are a guide — we move at the room's pace and stay until it clicks."
          />
          <div className="mt-12">
            <AgendaTimeline />
          </div>
        </div>
      </section>

      {/* Toolkit */}
      <Section>
        <SectionHeading
          eyebrow="What you'll set up"
          title="The real toolkit — installed and working"
          intro="By the time you leave, these aren't names you've heard. They're tools you've used, configured on your own machine."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {toolkit.map((t) => (
            <div key={t.name} className="card">
              <div className="font-serif text-xl font-semibold text-ink-900">
                {t.name}
              </div>
              <div className="mt-1.5 text-ink-600">{t.note}</div>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Link href="/register" className="btn-primary">
            Reserve your seat — {site.price.display}
          </Link>
        </div>
      </Section>

      <CTABand />
    </>
  );
}

function Check() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className="mt-1 shrink-0"
      aria-hidden
    >
      <circle cx="12" cy="12" r="11" className="fill-amber-100" />
      <path
        d="M7 12.5l3 3 7-7"
        className="stroke-amber-700"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
