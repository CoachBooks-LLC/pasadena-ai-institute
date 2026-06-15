import Link from "next/link";
import { site } from "@/lib/site";

const includes = [
  "Two full days, in-person in Pasadena",
  "Small cohort — real, personal attention",
  "All software set up on your own laptop",
  "Working lunches both days",
  "All materials & resources",
  "Alumni community access",
  "A workflow or prototype you built",
  "Personalized next-steps plan",
];

export function PricingCard() {
  return (
    <div className="relative overflow-hidden rounded-xl2 border border-ink-800 bg-ink-900 p-8 text-canvas shadow-lift sm:p-10">
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-amber-500/15 blur-2xl" />
      <div className="relative">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-amber-300">
            {site.cohort.label} · {site.cohort.season}
          </span>
        </div>

        <div className="mt-6 flex items-end gap-2">
          <span className="font-serif text-5xl font-semibold">
            {site.price.display}
          </span>
          <span className="mb-2 text-sm text-ink-300">/ {site.price.label}</span>
        </div>
        <p className="mt-2 text-sm text-ink-300">
          One simple price. Everything included. Limited to{" "}
          {site.cohort.seats} seats.
        </p>

        <ul className="mt-7 grid gap-3 sm:grid-cols-2">
          {includes.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className="mt-0.5 shrink-0"
                aria-hidden
              >
                <path
                  d="M5 12.5l4 4 10-10"
                  className="stroke-amber-400"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-ink-100">{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/register" className="btn-primary flex-1">
            Reserve your seat
          </Link>
          <Link href="/register#interest" className="btn-outline flex-1 border-ink-600 text-canvas hover:bg-canvas hover:text-ink-900">
            Apply / ask first
          </Link>
        </div>
        <p className="mt-4 text-center text-xs text-ink-400">
          Not ready to pay? Apply with the interest form and we&rsquo;ll set up a
          quick call.
        </p>
      </div>
    </div>
  );
}
