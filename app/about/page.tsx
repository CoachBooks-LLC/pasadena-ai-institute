import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/Section";
import { PageHero } from "@/components/PageHero";
import { CTABand } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import { art } from "@/lib/art";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "The Pasadena AI Workshop is hosted by Whistle Labs, a Pasadena-based studio that builds AI software every day. Founded here, we're giving back to the city that's home.",
};

const values = [
  {
    title: "Hands-on or it didn't happen",
    body: "We measure success by what you build and use, not by how many slides you sat through.",
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

const promises = [
  "We start where you are, even at zero.",
  "You'll build something real, not just take notes.",
  "We stay in the room until it clicks.",
  "We'll be honest about what's worth your time.",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the Workshop"
        title="We build with AI every day. Now we're teaching it."
        intro="The Pasadena AI Workshop is hosted by Whistle Labs, a Pasadena-based studio that designs and ships AI software and products. This is the class we wish existed for the smart, ambitious people in our own community."
        artwork={art.vanGoghFishing}
      />

      {/* Story */}
      <Section className="bg-canvas">
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <h2 className="font-serif text-4xl font-normal leading-[1.18] tracking-tight text-ink-900 sm:text-5xl">
              From building products to building people
            </h2>
            <div className="mt-7 max-w-[60ch] space-y-5 text-lg leading-relaxed text-ink-600">
              <p>
                At Whistle Labs, AI isn&rsquo;t a buzzword. It&rsquo;s how we
                work. We use these exact tools every day to design, prototype,
                and ship real software.
              </p>
              <p>
                Again and again, friends and clients asked the same thing:
                &ldquo;Can you just show me how to actually use this?&rdquo; There
                was no great in-person option, especially for professionals who
                aren&rsquo;t engineers.
              </p>
              <p>
                So we created one: everything we know from building with AI, in a
                room, in our hometown, for the people who want to learn it for
                real.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:pl-12">
            <h3 className="font-serif text-2xl font-normal tracking-tight text-ink-900">
              What we promise you
            </h3>
            <ul className="mt-6 border-t border-ink-200">
              {promises.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-4 border-b border-ink-100 py-4 text-ink-700"
                >
                  <span aria-hidden className="text-accent">
                    ·
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <Link href="/register" className="btn-primary mt-8 w-full">
              Join the founding cohort
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* Whistle Labs - prominent, funnels to the studio */}
      <section className="bg-ink-950 text-canvas">
        <div className="container-x py-20 sm:py-24">
          <div className="grid items-center gap-x-16 gap-y-10 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
                Hosted by
              </p>
              <h2 className="mt-4 font-serif text-5xl font-normal tracking-tight text-white sm:text-6xl">
                Whistle Labs
              </h2>
              <div className="mt-6 max-w-[58ch] space-y-4 text-lg leading-relaxed text-white/75">
                <p>
                  Whistle Labs is a studio based in Pasadena. We design and ship
                  AI software and products for companies, every day, with the
                  same tools we&rsquo;ll set up with you in the room.
                </p>
                <p>
                  We were founded here, we work and live here, and this workshop
                  is how we give back to the city that&rsquo;s home. When
                  you&rsquo;re ready to build something for real, this is the team
                  that does it.
                </p>
              </div>
              <a
                href={site.hostUrl}
                className="btn mt-9 bg-canvas text-ink-900 hover:bg-white"
              >
                See what we build at whistlelabs.ai
                <span aria-hidden>→</span>
              </a>
            </Reveal>

            <Reveal delay={0.1}>
              <dl className="divide-y divide-white/10 border-y border-white/10">
                {[
                  ["Based in", "Pasadena, California"],
                  ["We do", "AI software & products for companies"],
                  ["This workshop", "How we give back to Pasadena"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-baseline justify-between gap-6 py-5"
                  >
                    <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
                      {k}
                    </dt>
                    <dd className="text-right font-serif text-lg text-white">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <Section className="bg-canvas-soft">
        <SectionHeading title="How we run every cohort" />
        <dl className="mt-12 grid gap-x-16 gap-y-10 sm:grid-cols-2">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.07}>
              <div className="border-t border-ink-200 pt-6">
                <dt className="font-serif text-2xl font-normal tracking-tight text-ink-900">
                  {v.title}
                </dt>
                <dd className="mt-3 max-w-[52ch] leading-relaxed text-ink-600">
                  {v.body}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </Section>

      <CTABand />
    </>
  );
}
