import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/Section";
import { PageHero } from "@/components/PageHero";
import { CTABand } from "@/components/CTA";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Why Pasadena",
  description:
    "A community-first AI institute rooted in Pasadena, serving Greater LA and Southern California. Learn in person, from real people, in your own backyard.",
};

const reasons = [
  {
    title: "Local, not faceless",
    body: "You learn in a real room, with real people from your own community — not a screen with a thousand strangers.",
  },
  {
    title: "Built for our neighbors",
    body: "Pasadena and the San Gabriel Valley are full of brilliant professionals and business owners. This is for them.",
  },
  {
    title: "Central to all of LA",
    body: "Easy to reach from across Greater Los Angeles and Southern California, without fighting all the way downtown.",
  },
  {
    title: "A growing community",
    body: "Every cohort joins an alumni network of local people learning and building with AI — momentum that lasts past the two days.",
  },
];

export default function PasadenaPage() {
  return (
    <>
      <PageHero
        eyebrow="Proudly Pasadena"
        title="A hometown institute for the AI era"
        intro={`We could have made another online course. Instead we're building something local: a place in Pasadena where ${site.region} can learn AI in person, from people who do this work every day.`}
      />

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="eyebrow">Our belief</span>
            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
              The best learning still happens in a room, together.
            </h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink-600">
              <p>
                There&rsquo;s no shortage of AI content online. What&rsquo;s
                missing is the room — the place where you can ask the
                &ldquo;dumb&rdquo; question, get unstuck in thirty seconds, and
                feel the click when it finally makes sense.
              </p>
              <p>
                Pasadena is home for us. It&rsquo;s where we want to build that
                room — and a community of local people who go from curious to
                capable, together.
              </p>
            </div>
          </div>
          <div className="rounded-xl2 border border-ink-100 bg-white p-3 shadow-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/infographics/outcomes.svg"
              alt="After two days you can use AI daily, have built something real, know what matters, and joined a local community."
              className="w-full"
            />
          </div>
        </div>
      </Section>

      <section className="bg-canvas-soft">
        <div className="container-x py-16 sm:py-24">
          <SectionHeading
            eyebrow="Why here"
            title="Rooted in Pasadena, open to all of SoCal"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {reasons.map((r) => (
              <div key={r.title} className="card">
                <h3 className="text-xl font-semibold">{r.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-600">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">The venue</span>
          <h2 className="mt-3 text-3xl font-semibold leading-tight">
            A comfortable, professional space in the heart of Pasadena
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ink-600">
            Each cohort is hosted in a well-equipped presentation room in
            Pasadena — easy to get to, easy to park, with everything we need for
            two productive days. We confirm the exact location with you once
            your seat is reserved.
          </p>
          <div className="mt-8">
            <Link href="/register" className="btn-primary">
              Reserve your seat
            </Link>
          </div>
        </div>
      </Section>

      <CTABand />
    </>
  );
}
