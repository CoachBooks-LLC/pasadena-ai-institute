import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Section";
import { PageHero } from "@/components/PageHero";
import { FAQAccordion } from "@/components/FAQAccordion";
import { art } from "@/lib/art";
import { faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about the Pasadena AI Workshop: who it's for, what's included, location, and how to apply.",
};

export default function FAQPage() {
  return (
    <>
      <PageHero
        eyebrow="Questions & answers"
        title="Everything you might be wondering"
        intro="Can't find your answer? Email us and we're happy to help you figure out if it's the right fit."
        artwork={art.wheatstacks}
      />

      <Section className="bg-canvas">
        <div className="mx-auto max-w-3xl">
          <FAQAccordion items={faqs} />

          <div className="mt-14 border-t border-ink-200 pt-10 text-center">
            <h2 className="font-serif text-3xl font-normal tracking-tight text-ink-900">
              Still have a question?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-ink-600">
              Apply for a seat and tell us what you&rsquo;re wondering. We read
              every application and reply to each one.
            </p>
            <div className="mt-6 flex justify-center">
              <Link href="/register" className="btn-primary">
                Apply for a seat
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
