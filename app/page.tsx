import Link from "next/link";
import { Section, SectionHeading } from "@/components/Section";
import { TrackCard } from "@/components/TrackCard";
import { ApplicationTimeline } from "@/components/ApplicationTimeline";
import { AgendaTimeline } from "@/components/AgendaTimeline";
import { Reveal } from "@/components/Reveal";
import { ArtPanel } from "@/components/ui/art-panel";
import { ArtSection } from "@/components/ui/art-section";
import { GlassButton } from "@/components/ui/apple-tahoe-liquid-glass-button";
import { art } from "@/lib/art";
import { site } from "@/lib/site";
import { tracks, outcomes } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      {/* Hero - Monet, Water Lilies */}
      <div className="relative">
        <ArtPanel
          art={art.waterLilies}
          video="/art/hero-lilies-4.mp4"
          height="hero"
          scrim="left"
          position="center"
          noScrim
        >
          <div className="container-x">
            <div className="max-w-2xl animate-fade-in -mt-16 rounded-lg border border-white/10 bg-white/20 px-8 py-9 text-white shadow-xl backdrop-blur-xl sm:px-10 sm:py-11 xl:-ml-20">
            <h1 className="font-serif text-[clamp(2.75rem,6.5vw,5rem)] font-normal leading-[1.05] tracking-[-0.025em] text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.45),0_1px_1px_rgba(0,0,0,0.35)]">
              Go from zero to one
              <br />
              with AI.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.55)]">
              A one-day, in-person atelier in Pasadena for executives and
              business owners. Come knowing nothing, or bring an idea. Leave
              having made something real. The founding cohort is just ten seats,
              by application.
            </p>
            <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <Link href="/register" aria-label="Apply for a seat">
                <GlassButton size="lg" contentClassName="gap-2 text-white">
                  Apply for a seat
                  <span aria-hidden>→</span>
                </GlassButton>
              </Link>
              <Link
                href="/conference"
                className="text-sm font-medium text-white underline decoration-white/50 decoration-1 underline-offset-[6px] [text-shadow:0_1px_4px_rgba(0,0,0,0.55)] transition-colors hover:decoration-white"
              >
                See the full day
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.55)]">
              <span>
                {site.cohort.label} · {site.cohort.dates.workshop}
              </span>
              <span aria-hidden className="text-white/60">·</span>
              <span>In-person in {site.cohort.location}</span>
              <span aria-hidden className="text-white/60">·</span>
              <span>Ten seats</span>
            </div>
            </div>
          </div>
        </ArtPanel>

      </div>

      {/* Manifesto */}
      <Section className="bg-canvas">
        <Reveal className="grid gap-x-16 gap-y-8 lg:grid-cols-[1fr_1px_1fr]">
          <div>
            <h2 className="font-serif text-4xl font-normal leading-[1.2] tracking-tight text-ink-900 sm:text-5xl">
              Everyone says{" "}
              <span className="italic">“leverage AI.”</span> Almost no one shows
              you how, in a room, with real help.
            </h2>
          </div>
          <div aria-hidden className="hidden bg-ink-100 lg:block" />
          <div className="max-w-[60ch] space-y-5 text-lg leading-relaxed text-ink-600">
            <p>
              The free videos overwhelm. The webinars try to sell you. It&rsquo;s
              hard to know what&rsquo;s genuinely useful versus pure hype.
            </p>
            <p>
              So we built the opposite: one day, in person, in a small group,
              where we sit with you until it clicks, and you walk out with
              something you actually made.
            </p>
            <p>
              <Link href="/about" className="link-accent">
                The story behind the Workshop
              </Link>
            </p>
          </div>
        </Reveal>
      </Section>

      {/* Two tracks - white cards over Van Gogh */}
      <ArtSection art={art.vanGoghFishing} className="border-y border-white/10">
        <Reveal>
          <SectionHeading
            tone="light"
            title="Two ways in, one room"
            intro="Choose your path after lunch; both start from zero and end with something real."
          />
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-lg bg-ink-100 shadow-xl sm:grid-cols-2">
          {tracks.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.08}>
              <TrackCard track={t} />
            </Reveal>
          ))}
        </div>
      </ArtSection>

      {/* Outcomes */}
      <Section className="bg-canvas">
        <Reveal>
          <SectionHeading title="You don't leave with notes. You leave with results." />
        </Reveal>
        <dl className="mt-12 grid gap-x-16 gap-y-10 sm:grid-cols-2">
          {outcomes.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.07}>
              <div className="border-t border-ink-200 pt-6">
                <dt className="font-serif text-2xl font-normal tracking-tight text-ink-900">
                  {o.title}
                </dt>
                <dd className="mt-3 max-w-[52ch] leading-relaxed text-ink-600">
                  {o.detail}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </Section>

      {/* Quote interlude - Monet, Cliff Walk at Pourville */}
      <ArtPanel art={art.cliffPourville} height="band" scrim="full" position="center">
        <div className="container-x text-center">
          <blockquote className="mx-auto max-w-3xl">
            <p className="font-serif text-3xl font-normal italic leading-[1.2] tracking-tight text-white sm:text-4xl">
              “Artificial intelligence is the new electricity.”
            </p>
            <footer className="mt-5 text-sm font-medium uppercase tracking-[0.18em] text-white/65">
              Andrew Ng
            </footer>
          </blockquote>
        </div>
      </ArtPanel>

      {/* Agenda */}
      <Section id="agenda" className="bg-canvas-soft">
        <Reveal>
          <SectionHeading
            title="A clear, hour-by-hour path"
            intro="Foundations and fluency in the morning. Build something real in the afternoon. Working lunch and expert help throughout."
          />
        </Reveal>
        <Reveal delay={0.1} className="mt-12">
          <AgendaTimeline />
        </Reveal>
      </Section>

      {/* How to claim a seat */}
      <Section className="bg-canvas">
        <Reveal>
          <SectionHeading
            title="Claim one of ten seats"
            intro="This is our founding cohort, the first time we're running it. Seats are earned by application, reviewed on a rolling basis. The room is small on purpose."
          />
        </Reveal>
        <Reveal delay={0.1} className="mt-12">
          <ApplicationTimeline />
        </Reveal>
        <Reveal delay={0.15} className="mt-10">
          <Link href="/register" className="btn-primary">
            Apply for a seat
          </Link>
        </Reveal>
      </Section>
    </>
  );
}
