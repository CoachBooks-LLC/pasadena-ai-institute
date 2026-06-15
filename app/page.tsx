import Link from "next/link";
import { Section, SectionHeading } from "@/components/Section";
import { TrackCard } from "@/components/TrackCard";
import { PricingCard } from "@/components/PricingCard";
import { AgendaTimeline } from "@/components/AgendaTimeline";
import { FAQAccordion } from "@/components/FAQAccordion";
import { CTABand } from "@/components/CTA";
import { site } from "@/lib/site";
import { tracks, outcomes, toolkit, faqs } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      {/* ───────────── Hero ───────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-canvas-soft to-canvas" />
        <div className="absolute -right-24 top-10 -z-10 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />
        <div className="absolute -left-20 top-40 -z-10 h-72 w-72 rounded-full bg-ink-200/40 blur-3xl" />

        <div className="container-x grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-amber-700">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              {site.cohort.label} · {site.cohort.season} · Pasadena
            </span>

            <h1 className="mt-6 text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
              Go from{" "}
              <span className="relative whitespace-nowrap text-amber-600">
                zero to one
              </span>{" "}
              with AI — in two days.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-600">
              A hands-on, in-person AI conference in Pasadena for professionals,
              owners, and executives. Come in knowing nothing — or bring an idea
              you want to build. You&rsquo;ll leave with the tools set up, the
              skills to use them, and something real you made.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/register" className="btn-primary">
                Reserve your seat — {site.price.display}
              </Link>
              <Link href="/register#interest" className="btn-outline">
                Apply / ask a question
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-ink-500">
              <span className="flex items-center gap-2">
                <Dot /> In-person in {site.cohort.location}
              </span>
              <span className="flex items-center gap-2">
                <Dot /> Just {site.cohort.seats} seats
              </span>
              <span className="flex items-center gap-2">
                <Dot /> No experience required
              </span>
            </div>
          </div>

          {/* Hero infographic */}
          <div className="animate-fade-up [animation-delay:120ms]">
            <div className="rounded-xl2 border border-ink-100 bg-white p-3 shadow-lift">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/infographics/zero-to-one.svg"
                alt="The zero-to-one journey: from never using AI to building and shipping with it over two days."
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── Trust strip ───────────── */}
      <section className="border-y border-ink-100 bg-white">
        <div className="container-x grid gap-6 py-8 text-center sm:grid-cols-3">
          <Stat big="2 days" small="Hands-on, in person" />
          <Stat big="Zero → One" small="Beginners & builders both" />
          <Stat big="Pasadena" small={`Serving ${site.region}`} />
        </div>
      </section>

      {/* ───────────── The problem / promise ───────────── */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="eyebrow">Why we built this</span>
            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
              Everyone says &ldquo;learn AI.&rdquo; Almost no one shows you how —
              in a room, with real help.
            </h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink-600">
              <p>
                The free videos are overwhelming. The webinars are sales pitches.
                And it&rsquo;s hard to know what&rsquo;s genuinely useful versus
                pure hype.
              </p>
              <p>
                So we built the opposite: two days, in person, in Pasadena, in a
                small group, where our team sits with you until it clicks — and
                you walk out with something you actually built.
              </p>
            </div>
            <div className="mt-7">
              <Link href="/about" className="btn-ghost px-0 text-amber-700">
                The story behind the Institute →
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Overwhelmed by the noise?", "We cut straight to what matters for you."],
              ["Worried you're “too late”?", "You're right on time. We start at zero."],
              ["Tired of watching, not doing?", "This is 100% hands-on. You'll build."],
              ["Have an idea, stuck on tools?", "We set everything up and get you going."],
            ].map(([h, p]) => (
              <div key={h} className="card">
                <h3 className="text-lg font-semibold">{h}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ───────────── Two tracks ───────────── */}
      <section className="bg-canvas-soft">
        <div className="container-x py-16 sm:py-24">
          <SectionHeading
            align="center"
            eyebrow="Two ways in, one room"
            title="Whichever describes you, you belong here"
            intro="Choose your path at the end of Day 1 — and lean whichever way feels right. Both start from zero and end with something real."
          />
          <div className="mt-12 grid gap-7 lg:grid-cols-2">
            {tracks.map((t) => (
              <TrackCard key={t.id} track={t} />
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Outcomes ───────────── */}
      <Section>
        <SectionHeading
          eyebrow="What you walk away with"
          title="You don't leave with notes. You leave with results."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {outcomes.map((o, i) => (
            <div key={o.title} className="card">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-900 font-serif text-lg font-semibold text-amber-400">
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold">{o.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                {o.detail}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ───────────── Toolkit ───────────── */}
      <section className="bg-ink-900 text-canvas">
        <div className="container-x py-16 sm:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <span className="eyebrow text-amber-300">The toolkit</span>
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-canvas sm:text-4xl">
                The exact tools the pros use — set up on your laptop.
              </h2>
              <p className="mt-4 text-lg text-ink-200">
                No guesswork. By the end you&rsquo;ll have these installed,
                configured, and actually working for you — not just heard about
                them.
              </p>
              <Link
                href="/conference"
                className="mt-7 inline-flex text-amber-300 hover:text-amber-200"
              >
                See the full 2-day curriculum →
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {toolkit.map((t) => (
                <div
                  key={t.name}
                  className="rounded-xl border border-ink-700 bg-ink-800/60 p-5"
                >
                  <div className="font-serif text-lg font-semibold text-amber-300">
                    {t.name}
                  </div>
                  <div className="mt-1 text-sm text-ink-200">{t.note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── Agenda ───────────── */}
      <Section id="agenda">
        <SectionHeading
          align="center"
          eyebrow="The two days"
          title="A clear, hour-by-hour path"
          intro="Foundations and fluency on Day 1. Build something real on Day 2. Working lunches and expert help throughout."
        />
        <div className="mt-12">
          <AgendaTimeline />
        </div>
      </Section>

      {/* ───────────── Pricing ───────────── */}
      <section className="bg-canvas-soft" id="pricing">
        <div className="container-x py-16 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <span className="eyebrow">Simple, all-inclusive</span>
              <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
                One price. Everything included.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-600">
                Two full days, all materials, lunches, the complete software
                setup, and the alumni community. No upsells, no surprises.
              </p>
              <p className="mt-4 text-ink-600">
                Not ready to commit? Apply with the interest form and we&rsquo;ll
                set up a quick, no-pressure call to make sure it&rsquo;s the right
                fit for you.
              </p>
            </div>
            <PricingCard />
          </div>
        </div>
      </section>

      {/* ───────────── Pasadena ───────────── */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="order-2 rounded-xl2 border border-ink-100 bg-white p-3 shadow-card lg:order-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/infographics/two-tracks.svg"
              alt="Two tracks side by side: Zero Experience and I Have an Idea."
              className="w-full"
            />
          </div>
          <div className="order-1 lg:order-2">
            <span className="eyebrow">Proudly Pasadena</span>
            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
              A community institute, rooted right here.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-600">
              We&rsquo;re not a faceless online course. We&rsquo;re building a
              local home for AI learning in Pasadena — for our neighbors across
              Greater LA and Southern California who want to learn in person,
              from real people, in their own backyard.
            </p>
            <Link
              href="/pasadena"
              className="mt-7 inline-flex text-amber-700 hover:text-amber-800"
            >
              Why Pasadena →
            </Link>
          </div>
        </div>
      </Section>

      {/* ───────────── FAQ ───────────── */}
      <section className="bg-canvas-soft">
        <div className="container-x py-16 sm:py-24">
          <SectionHeading
            align="center"
            eyebrow="Questions"
            title="Everything you might be wondering"
          />
          <div className="mx-auto mt-10 max-w-3xl">
            <FAQAccordion items={faqs.slice(0, 6)} />
            <p className="mt-6 text-center text-ink-600">
              More questions?{" "}
              <Link href="/faq" className="link-underline font-semibold">
                See the full FAQ
              </Link>{" "}
              or{" "}
              <Link href="/register#interest" className="link-underline font-semibold">
                just ask us
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}

function Dot() {
  return <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />;
}

function Stat({ big, small }: { big: string; small: string }) {
  return (
    <div>
      <div className="font-serif text-2xl font-semibold text-ink-900">{big}</div>
      <div className="mt-1 text-sm text-ink-500">{small}</div>
    </div>
  );
}
