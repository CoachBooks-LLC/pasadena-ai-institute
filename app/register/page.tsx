import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { InterestForm } from "@/components/InterestForm";
import { ReserveButton } from "@/components/ReserveButton";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reserve a Seat",
  description:
    "Reserve your seat in the Pasadena AI Institute founding cohort — pay securely online, or apply with the interest form and we'll set up a quick call.",
};

const includes = [
  "Two full days, in person in Pasadena",
  "Complete software setup on your laptop",
  "Working lunches both days",
  "All materials + alumni community",
  "A workflow or prototype you built",
  "Personalized next-steps plan",
];

export default function RegisterPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const status = searchParams?.status;

  return (
    <>
      <PageHero
        eyebrow={`${site.cohort.label} · ${site.cohort.season} · ${site.cohort.location}`}
        title="Claim your seat"
        intro={`Two ways to join the founding cohort: reserve your spot now with secure payment, or apply with the interest form and we'll set up a quick call first. Limited to ${site.cohort.seats} seats.`}
      />

      {/* Status banners from Stripe redirect */}
      {status === "success" && (
        <div className="container-x pt-10">
          <div className="rounded-xl2 border border-amber-300 bg-amber-50 p-6 text-center">
            <h2 className="text-2xl font-semibold text-amber-800">
              🎉 You&rsquo;re in — welcome to the founding cohort!
            </h2>
            <p className="mt-2 text-amber-800">
              Your payment went through. Check your email for a receipt and
              confirmation — we&rsquo;ll be in touch shortly with everything you
              need to prepare.
            </p>
          </div>
        </div>
      )}
      {status === "cancelled" && (
        <div className="container-x pt-10">
          <div className="rounded-xl2 border border-ink-200 bg-white p-6 text-center">
            <h2 className="text-xl font-semibold">No worries — checkout cancelled</h2>
            <p className="mt-2 text-ink-600">
              Nothing was charged. Whenever you&rsquo;re ready, you can reserve
              below — or apply with the interest form and we&rsquo;ll set up a
              quick call.
            </p>
          </div>
        </div>
      )}

      <section className="py-16 sm:py-20">
        <div className="container-x grid gap-8 lg:grid-cols-2">
          {/* Path A — Pay now */}
          <div className="relative overflow-hidden rounded-xl2 border border-ink-800 bg-ink-900 p-8 text-canvas shadow-lift sm:p-10">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-amber-500/15 blur-2xl" />
            <div className="relative flex h-full flex-col">
              <span className="eyebrow text-amber-300">Ready to commit?</span>
              <h2 className="mt-3 text-3xl font-semibold text-canvas">
                Reserve your seat
              </h2>
              <div className="mt-4 flex items-end gap-2">
                <span className="font-serif text-5xl font-semibold">
                  {site.price.display}
                </span>
                <span className="mb-2 text-sm text-ink-300">
                  / {site.price.label}
                </span>
              </div>
              <p className="mt-3 text-ink-200">
                One simple price, everything included. Secure checkout powered by
                Stripe.
              </p>

              <ul className="mt-6 space-y-2.5">
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

              <div className="mt-auto pt-8">
                <ReserveButton />
                <p className="mt-3 text-center text-xs text-ink-400">
                  Secured by Stripe. You can pay by card.
                </p>
              </div>
            </div>
          </div>

          {/* Path B — Interest form */}
          <div id="interest" className="scroll-mt-28">
            <span className="eyebrow">Want to talk first?</span>
            <h2 className="mt-3 text-3xl font-semibold">
              Apply &amp; we&rsquo;ll set up a call
            </h2>
            <p className="mt-3 text-ink-600">
              Tell us a little about you. We&rsquo;ll review, reach out within
              1&ndash;2 business days, and set up a quick, no-pressure Zoom to
              make sure it&rsquo;s the right fit — then send you a payment link
              if you want to move forward.
            </p>
            <div className="mt-6">
              <InterestForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
