import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/Section";
import { PageHero } from "@/components/PageHero";
import { CTABand } from "@/components/CTA";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "The Pasadena AI Institute is hosted by Whistle Labs — a company that builds AI software every day. Now we're teaching it, in person, in Pasadena.",
};

const values = [
  {
    title: "Hands-on or it didn't happen",
    body: "We measure success by what you build and use — not by how many slides you sat through.",
  },
  {
    title: "Plain English, always",
    body: "No jargon walls. We explain AI the way we'd explain it to a smart friend who's new to it.",
  },
  {
    title: "Honest about the hype",
    body: "We build with these tools daily, so we'll tell you what's genuinely useful and what's noise.",
  },
  {
    title: "Local and personal",
    body: "Small cohorts, real attention, and a community that lasts beyond the two days.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="We build with AI every day. Now we're teaching it."
        intro="The Pasadena AI Institute is hosted by Whistle Labs — a company that designs and ships AI software and products. This is the class we wish existed for the smart, ambitious people in our own community."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="eyebrow">The story</span>
            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
              From building products to building people
            </h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink-600">
              <p>
                At Whistle Labs, AI isn&rsquo;t a buzzword — it&rsquo;s how we
                work. We use these exact tools every day to design, prototype,
                and ship real software.
              </p>
              <p>
                Again and again, friends, clients, and neighbors asked the same
                thing: &ldquo;Can you just show me how to actually use this?&rdquo;
                The honest answer was that there was no great in-person option —
                especially for professionals who aren&rsquo;t engineers.
              </p>
              <p>
                So we created one. The Pasadena AI Institute takes everything we
                know from building with AI and puts it in a room, in our
                hometown, for the people who want to learn it for real.
              </p>
            </div>
            <div className="mt-8 rounded-xl2 border border-ink-100 bg-canvas-soft p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-400">
                Hosted by
              </p>
              <a
                href={site.hostUrl}
                className="mt-2 inline-flex items-baseline gap-2 font-serif text-2xl font-semibold text-ink-900 hover:text-amber-700"
              >
                Whistle Labs
                <span className="text-sm font-sans font-normal text-ink-500">
                  whistlelabs.ai →
                </span>
              </a>
              <p className="mt-2 text-ink-600">
                The studio behind the Institute — building AI software and
                products, and now sharing the craft.
              </p>
            </div>
          </div>

          <div>
            <div className="card">
              <h3 className="text-xl font-semibold">What we promise you</h3>
              <ul className="mt-4 space-y-3">
                {[
                  "We start where you are — even at zero.",
                  "You'll build something real, not just take notes.",
                  "We stay in the room until it clicks.",
                  "We'll be honest about what's worth your time.",
                ].map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-ink-700">
                    <span className="mt-1 text-amber-600">→</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                <Link href="/register" className="btn-primary w-full">
                  Join the founding cohort
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <section className="bg-canvas-soft">
        <div className="container-x py-16 sm:py-24">
          <SectionHeading
            align="center"
            eyebrow="What we stand for"
            title="How we run every cohort"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="card">
                <h3 className="text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
