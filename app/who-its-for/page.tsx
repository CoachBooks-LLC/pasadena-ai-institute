import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/Section";
import { PageHero } from "@/components/PageHero";
import { TrackCard } from "@/components/TrackCard";
import { CTABand } from "@/components/CTA";
import { tracks } from "@/lib/content";

export const metadata: Metadata = {
  title: "Who It's For",
  description:
    "Built for professionals, business owners, and executives across Pasadena and Greater LA — whether you're starting from zero or have an idea to build.",
};

const personas = [
  {
    title: "The business owner",
    body: "You run a company and you know AI matters — you just need a clear, trustworthy way to actually adopt it without wasting months.",
  },
  {
    title: "The executive or manager",
    body: "You want to lead confidently in an AI world, understand what your team is talking about, and find real wins for your organization.",
  },
  {
    title: "The professional leveling up",
    body: "You're great at what you do and you want AI to make you faster, sharper, and more valuable — starting now.",
  },
  {
    title: "The aspiring builder",
    body: "You've had an idea for an app or tool for years. You're done waiting on someone else to build it. This is where you start.",
  },
];

export default function WhoItsForPage() {
  return (
    <>
      <PageHero
        eyebrow="Who it's for"
        title="If you're ready to actually get AI, you're in the right place"
        intro="We built this for professionals, owners, and executives — especially folks 35 to 60 — across Pasadena, Greater LA, and Southern California. You don't need to be technical. You just need to be curious."
      />

      {/* Two tracks */}
      <Section>
        <SectionHeading
          align="center"
          eyebrow="Two tracks, one room"
          title="Pick the path that fits where you are"
          intro="You'll choose at the end of Day 1 — and you can lean whichever way feels right as you go."
        />
        <div className="mt-12 grid gap-7 lg:grid-cols-2">
          {tracks.map((t) => (
            <TrackCard key={t.id} track={t} />
          ))}
        </div>
      </Section>

      {/* Personas */}
      <section className="bg-canvas-soft">
        <div className="container-x py-16 sm:py-24">
          <SectionHeading
            eyebrow="Sound familiar?"
            title="People who thrive in the room"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {personas.map((p) => (
              <div key={p.title} className="card">
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-600">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Not sure */}
      <Section>
        <div className="mx-auto max-w-3xl rounded-xl2 border border-ink-100 bg-white p-8 text-center shadow-card sm:p-12">
          <span className="eyebrow">Not sure if it&rsquo;s right for you?</span>
          <h2 className="mt-3 text-3xl font-semibold leading-tight">
            That&rsquo;s exactly what the call is for.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ink-600">
            Apply with the interest form and we&rsquo;ll set up a quick,
            no-pressure Zoom to learn your goals and make sure the two days will
            be worth it for you. If it&rsquo;s not the right fit, we&rsquo;ll
            tell you.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/register#interest" className="btn-primary">
              Apply & book a call
            </Link>
            <Link href="/conference" className="btn-outline">
              See the curriculum
            </Link>
          </div>
        </div>
      </Section>

      <CTABand />
    </>
  );
}
