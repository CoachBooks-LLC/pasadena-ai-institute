import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/Section";
import { PageHero } from "@/components/PageHero";
import { AgendaTimeline } from "@/components/AgendaTimeline";
import { ApplyCard } from "@/components/ApplyCard";
import { CTABand } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import { art } from "@/lib/art";
import { site } from "@/lib/site";
import { toolkit } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Workshop",
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
  "Your laptop (Mac or Windows; we'll get it set up)",
  "Your curiosity and your questions",
  "Track 2: an idea you want to build, even a rough one",
];

export default function ConferencePage() {
  return (
    <>
      <PageHero
        eyebrow={`${site.cohort.label} · ${site.cohort.season}`}
        title="Two days that change how you work"
        intro="Day 1 gets you set up and genuinely fluent with AI. Day 2 you build something real: a workflow for your work, or a prototype of your idea. Here's exactly how it goes."
        artwork={art.seuratBathers}
      />

      {/* Format + apply card */}
      <Section className="bg-canvas">
        <Reveal className="grid gap-x-16 gap-y-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="font-serif text-4xl font-normal leading-[1.18] tracking-tight text-ink-900 sm:text-5xl">
              Built for doing, not just listening
            </h2>
            <div className="mt-7 max-w-[60ch] space-y-5 text-lg leading-relaxed text-ink-600">
              <p>
                This isn&rsquo;t a lecture you sit through. It&rsquo;s a guided,
                hands-on workshop in a small room in Pasadena. You work on your
                own laptop, on your own goals, with our team beside you the whole
                way.
              </p>
              <p>
                We start at absolute zero, no experience needed, and by the end
                of Day 2 you&rsquo;ll have built something you can keep using and
                growing.
              </p>
            </div>

            <h3 className="mt-12 font-serif text-2xl font-normal tracking-tight text-ink-900">
              What&rsquo;s included
            </h3>
            <ul className="mt-5 grid gap-x-10 border-t border-ink-200 sm:grid-cols-2">
              {included.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 border-b border-ink-100 py-3.5 text-sm text-ink-700"
                >
                  <span aria-hidden className="text-accent">
                    ·
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h3 className="mt-12 font-serif text-2xl font-normal tracking-tight text-ink-900">
              What to bring
            </h3>
            <ul className="mt-5 border-t border-ink-200">
              {bring.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 border-b border-ink-100 py-3.5 text-ink-700"
                >
                  <span aria-hidden className="text-accent">
                    ·
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:pt-2">
            <ApplyCard />
          </div>
        </Reveal>
      </Section>

      {/* Agenda */}
      <Section id="agenda" className="border-t border-ink-100 bg-canvas-soft">
        <Reveal>
          <SectionHeading
            title="The full two-day agenda"
            intro="A clear path from foundations to building. Times are a guide; we move at the room's pace and stay until it clicks."
          />
        </Reveal>
        <Reveal delay={0.1} className="mt-12">
          <AgendaTimeline />
        </Reveal>
      </Section>

      {/* Toolkit - with a framed painting to break the text */}
      <Section className="bg-canvas">
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <SectionHeading
              title="The real toolkit, installed and working"
              intro="By the time you leave, these aren't names you've heard. They're tools you've used, configured on your own machine."
            />
            <ul className="mt-10 border-t border-ink-100">
              {toolkit.map((t) => (
                <li
                  key={t.name}
                  className="flex flex-col gap-1 border-b border-ink-100 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                >
                  <span className="font-serif text-xl font-normal tracking-tight text-ink-900">
                    {t.name}
                  </span>
                  <span className="text-sm leading-relaxed text-ink-500 sm:max-w-xs sm:text-right">
                    {t.note}
                  </span>
                </li>
              ))}
            </ul>
            <Link href="/register" className="btn-primary mt-10">
              Apply for a seat
            </Link>
          </Reveal>

          <Reveal delay={0.1} className="lg:pt-10">
            <figure>
              <div className="overflow-hidden rounded-[4px] border border-ink-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={art.parisRain.src}
                  alt={art.parisRain.alt}
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <figcaption className="mt-3 font-sans text-[0.8125rem] tracking-wide text-ink-500">
                {art.parisRain.artist}, {art.parisRain.year}
                <span className="mx-1.5 opacity-50">·</span>
                <span className="italic">{art.parisRain.title}</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Section>

      <CTABand />
    </>
  );
}
