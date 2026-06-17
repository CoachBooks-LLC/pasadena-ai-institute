import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/Section";
import { PageHero } from "@/components/PageHero";
import { TrackCard } from "@/components/TrackCard";
import { CTABand } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import { art } from "@/lib/art";
import { tracks } from "@/lib/content";

export const metadata: Metadata = {
  title: "Who It's For",
  description:
    "Built for professionals, business owners, and executives across Pasadena and Greater LA, whether you're starting from zero or have an idea to build.",
};

const personas = [
  {
    title: "The business owner",
    body: "You run a company and you know AI matters, and you just need a clear, trustworthy way to actually adopt it without wasting months.",
  },
  {
    title: "The executive or manager",
    body: "You want to lead confidently in an AI world, understand what your team is talking about, and find real wins for your organization.",
  },
  {
    title: "The professional leveling up",
    body: "You're great at what you do and you want AI to make you faster, sharper, and more valuable, starting now.",
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
        eyebrow="For professionals, owners & executives"
        title="If you're ready to actually understand AI, you're in the right place"
        intro="We built this for professionals, owners, and executives, especially folks 35 to 60, across Pasadena and Southern California. You don't need to be technical. You just need to be curious."
        artwork={art.parisRain}
      />

      {/* Two tracks */}
      <Section className="bg-canvas">
        <Reveal>
          <SectionHeading
            title="Pick the path that fits where you are"
            intro="You'll choose at the end of Day 1, and lean whichever way feels right as you go."
          />
        </Reveal>
        <div className="mt-12 grid gap-px bg-ink-100 sm:grid-cols-2">
          {tracks.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.08}>
              <TrackCard track={t} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Personas */}
      <Section className="border-t border-ink-100 bg-canvas-soft">
        <Reveal>
          <SectionHeading title="People who thrive in the room" />
        </Reveal>
        <dl className="mt-12 grid gap-x-16 gap-y-10 sm:grid-cols-2">
          {personas.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.07}>
              <div className="border-t border-ink-200 pt-6">
                <dt className="font-serif text-2xl font-normal tracking-tight text-ink-900">
                  {p.title}
                </dt>
                <dd className="mt-3 max-w-[52ch] leading-relaxed text-ink-600">
                  {p.body}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </Section>

      {/* Not sure */}
      <Section className="bg-canvas">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-4xl font-normal leading-tight tracking-tight text-ink-900 sm:text-5xl">
            Not sure if it&rsquo;s right for you?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
            Apply anyway. The application is short, and we read every one. Tell
            us what you want to build or learn. If it&rsquo;s not the right fit
            this time, we&rsquo;ll tell you, and you can apply for the next
            cohort.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/register" className="btn-primary">
              Apply for a seat
            </Link>
            <Link href="/conference" className="btn-outline">
              See the two days
            </Link>
          </div>
        </Reveal>
      </Section>

      <CTABand />
    </>
  );
}
