import Link from "next/link";
import { site } from "@/lib/site";

export function CTABand() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-xl2 bg-ink-900 px-8 py-14 text-center text-canvas sm:px-16">
          <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-amber-500/15 blur-3xl" />
          <div className="absolute -bottom-24 -right-10 h-64 w-64 rounded-full bg-rose-500/10 blur-3xl" />
          <div className="relative mx-auto max-w-2xl">
            <span className="eyebrow text-amber-300">
              {site.cohort.label} · {site.cohort.season} · {site.cohort.location}
            </span>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-canvas sm:text-4xl">
              Two days from zero to one. In Pasadena.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-ink-200">
              Seats are limited to {site.cohort.seats}. Reserve yours, or apply
              and we&rsquo;ll set up a quick call to make sure it&rsquo;s the
              right fit.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/register" className="btn-primary">
                Reserve your seat — {site.price.display}
              </Link>
              <Link
                href="/register#interest"
                className="btn-outline border-ink-600 text-canvas hover:bg-canvas hover:text-ink-900"
              >
                Apply / ask a question
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
