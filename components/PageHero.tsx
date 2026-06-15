import { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-ink-100 bg-canvas-soft">
      <div className="absolute -right-24 -top-16 h-64 w-64 rounded-full bg-amber-200/40 blur-3xl" />
      <div className="absolute -left-24 top-20 h-56 w-56 rounded-full bg-ink-200/30 blur-3xl" />
      <div className="container-x relative py-16 sm:py-20">
        <div className="max-w-3xl">
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.08] sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-600">{intro}</p>
        </div>
      </div>
    </section>
  );
}
