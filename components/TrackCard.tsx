import Link from "next/link";
import type { Track } from "@/lib/content";

export function TrackCard({ track }: { track: Track }) {
  return (
    <div className="flex h-full flex-col bg-canvas p-8 sm:p-10">
      <p className="eyebrow text-ink-500">{track.eyebrow}</p>
      <h3 className="mt-4 font-serif text-3xl font-normal tracking-tight text-ink-900">
        {track.title}
      </h3>
      <p className="mt-4 leading-relaxed text-ink-600">{track.blurb}</p>

      <div className="mt-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
          This is you if
        </p>
        <ul className="mt-4 space-y-3">
          {track.forYou.map((item) => (
            <li
              key={item}
              className="flex gap-3 border-b border-ink-100 pb-3 text-sm text-ink-700"
            >
              <span aria-hidden className="text-accent">
                ·
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
          You&rsquo;ll leave with
        </p>
        <ul className="mt-4 space-y-2.5 text-sm text-ink-700">
          {track.outcomes.map((item) => (
            <li key={item} className="flex gap-3">
              <span aria-hidden className="text-accent">
                →
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto pt-9">
        <Link href="/register" className="btn-outline w-full">
          Choose this path
        </Link>
      </div>
    </div>
  );
}
