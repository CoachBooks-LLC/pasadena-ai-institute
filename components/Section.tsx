import { ReactNode } from "react";

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`content-auto py-14 sm:py-20 ${className}`}>
      <div className="container-x">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
}) {
  const alignment =
    align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl";
  const light = tone === "light";
  return (
    <div className={alignment}>
      {eyebrow && (
        <p className={`eyebrow ${light ? "text-white/65" : "text-ink-500"}`}>
          {eyebrow}
        </p>
      )}
      <h2
        className={`${eyebrow ? "mt-5" : ""} font-serif text-4xl font-normal leading-[1.18] tracking-tight sm:text-5xl ${
          light ? "text-white" : "text-ink-900"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-5 max-w-[58ch] text-lg leading-relaxed ${
            light ? "text-white/75" : "text-ink-600"
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
