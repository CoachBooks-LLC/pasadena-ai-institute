import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Section";
import { PageHero } from "@/components/PageHero";
import { FAQAccordion } from "@/components/FAQAccordion";
import { CTABand } from "@/components/CTA";
import { faqs } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about the Pasadena AI Institute's 2-day conference: who it's for, what's included, pricing, location, and more.",
};

export default function FAQPage() {
  return (
    <>
      <PageHero
        eyebrow="Questions & answers"
        title="Everything you might be wondering"
        intro="Can't find your answer? Email us or use the interest form — we're happy to help you figure out if it's the right fit."
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          <FAQAccordion items={faqs} />

          <div className="mt-10 rounded-xl2 border border-ink-100 bg-canvas-soft p-8 text-center">
            <h2 className="text-2xl font-semibold">Still have a question?</h2>
            <p className="mx-auto mt-3 max-w-md text-ink-600">
              We&rsquo;d love to hear from you. Apply with the interest form and
              ask anything, or email us directly.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/register#interest" className="btn-primary">
                Apply / ask a question
              </Link>
              <a href={`mailto:${site.contactEmail}`} className="btn-outline">
                {site.contactEmail}
              </a>
            </div>
          </div>
        </div>
      </Section>

      <CTABand />
    </>
  );
}
