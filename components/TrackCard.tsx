import Link from "next/link";
import type { Track } from "@/lib/content";

const Check = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    className="mt-0.5 shrink-0"
    aria-hidden
  >
    <circle cx="12" cy="12" r="11" className="fill-amber-100" />
    <path
      d="M7 12.5l3 3 7-7"
      className="stroke-amber-700"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function TrackCard({ track }: { track: Track }) {
  return (
    <div className="card flex h-full flex-col">
      <span className="eyebrow">{track.eyebrow}</span>
      <h3 className="mt-2 text-2xl font-semibold">{track.title}</h3>
      <p className="mt-3 leading-relaxed text-ink-600">{track.blurb}</p>

      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">
          This is you if…
        </p>
        <ul className="mt-3 space-y-2.5">
          {track.forYou.map((item) => (
            <li key={item} className="flex gap-2.5 text-sm text-ink-700">
              <Check />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 rounded-xl bg-canvas-soft p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">
          You&rsquo;ll leave with
        </p>
        <ul className="mt-3 space-y-2 text-sm text-ink-700">
          {track.outcomes.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-amber-600">→</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto pt-7">
        <Link href="/register" className="btn-outline w-full">
          Choose this path
        </Link>
      </div>
    </div>
  );
}
