import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/Section";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { art } from "@/lib/art";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Why Pasadena",
  description:
    "Whistle Labs was founded in Pasadena and we work and live here. This workshop is a community-first AI workshop rooted in Pasadena, our way of giving back to the city that's home.",
};

const reasons = [
  {
    title: "Founded here, by people here",
    body: "Whistle Labs was started in Pasadena. We work and live in the San Gabriel Valley, and this workshop is how we give back to the city that's home.",
  },
  {
    title: "Local, not faceless",
    body: "You learn in a real room, with real people from your own community, not a screen with a thousand strangers.",
  },
  {
    title: "Central to all of LA",
    body: "Easy to reach from across Greater Los Angeles and Southern California, without fighting all the way downtown.",
  },
  {
    title: "A growing community",
    body: "Every cohort joins an alumni network of local people learning and building with AI, with momentum that lasts past the day.",
  },
];

export default function PasadenaPage() {
  return (
    <>
      <PageHero
        eyebrow="Proudly Pasadena"
        title="A Pasadena Workshop for the AI era"
        intro={`We could have made another online course. Instead we're building something local: a place in Pasadena where ${site.region} can learn AI in person, from people who do this work every day.`}
        artwork={art.cliffPourville}
      />

      {/* Belief + framed painting */}
      <Section className="bg-canvas">
        <Reveal className="grid items-center gap-x-16 gap-y-12 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-4xl font-normal leading-[1.18] tracking-tight text-ink-900 sm:text-5xl">
              The best learning happens in small rooms, together.
            </h2>
            <div className="mt-7 max-w-[60ch] space-y-5 text-lg leading-relaxed text-ink-600">
              <p>
                There&rsquo;s no shortage of AI content online. What&rsquo;s
                missing is the room: the place where you can ask the
                &ldquo;dumb&rdquo; question, get unstuck in thirty seconds, and
                feel the click when it finally makes sense.
              </p>
              <p>
                Whistle Labs was founded in Pasadena, and our team works and
                lives here. This workshop is how we give back to the city
                that&rsquo;s home, by building that room and a community of local
                people who go from curious to capable, together.
              </p>
            </div>
          </div>
          <figure className="lg:order-last">
            <div className="overflow-hidden rounded-[4px] border border-ink-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={art.cezanneMarseille.src}
                alt={art.cezanneMarseille.alt}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <figcaption className="mt-3 font-sans text-[0.8125rem] tracking-wide text-ink-500">
              {art.cezanneMarseille.artist}, {art.cezanneMarseille.year}
              <span className="mx-1.5 opacity-50">·</span>
              <span className="italic">{art.cezanneMarseille.title}</span>
            </figcaption>
          </figure>
        </Reveal>
      </Section>

      {/* Reasons */}
      <Section className="border-t border-ink-100 bg-canvas-soft">
        <Reveal>
          <SectionHeading title="Rooted in Pasadena, open to all of SoCal" />
        </Reveal>
        <dl className="mt-12 grid gap-x-16 gap-y-10 sm:grid-cols-2">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.07}>
              <div className="border-t border-ink-200 pt-6">
                <dt className="font-serif text-2xl font-normal tracking-tight text-ink-900">
                  {r.title}
                </dt>
                <dd className="mt-3 max-w-[52ch] leading-relaxed text-ink-600">
                  {r.body}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </Section>

      {/* Venue */}
      <Section className="bg-canvas">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-4xl font-normal leading-tight tracking-tight text-ink-900 sm:text-5xl">
            A comfortable, professional space in the heart of Pasadena
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
            Each cohort is hosted in a well-equipped presentation room in
            Pasadena: easy to reach, easy to park, with everything we need for
            two productive days. We send the exact address to applicants once
            they&rsquo;re accepted.
          </p>
          <div className="mt-9">
            <Link href="/register" className="btn-primary">
              Apply for a seat
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
