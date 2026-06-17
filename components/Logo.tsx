import Link from "next/link";

/**
 * Pasadena AI Workshop wordmark + mark.
 * The mark is an abstract "rising arc over mountains" - the San Gabriel range
 * plus an upward zero-to-one trajectory. Adapts to light/dark surfaces.
 */
export function LogoMark({
  className = "h-9 w-9",
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const box = tone === "light" ? "fill-white/15" : "fill-ink-900";
  const range = tone === "light" ? "fill-white/35" : "fill-ink-500";
  const arc = tone === "light" ? "stroke-white" : "stroke-ink-900";
  const dot = tone === "light" ? "fill-white" : "fill-ink-900";
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      role="img"
      aria-label="Pasadena AI Workshop mark"
    >
      <rect width="40" height="40" rx="9" className={box} />
      <path d="M6 29 L15 17 L21 24 L27 14 L34 29 Z" className={range} />
      <path
        d="M7 30 C 15 14, 25 14, 33 9"
        className={arc}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="33" cy="9" r="3" className={dot} />
    </svg>
  );
}

// Heavy system grotesque for the "hosted by whistle labs" line - no web font
// needed; matches the bold Whistle Labs wordmark.
const heavyGrotesque =
  '"Arial Black", "Helvetica Neue", Helvetica, Arial, sans-serif';

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  // Theme foreground color so it reads on both the dark art hero and the light
  // scrolled header. Text only, no icon, no background.
  const color = tone === "light" ? "text-white" : "text-ink-900";
  return (
    <Link
      href="/"
      aria-label="Pasadena AI Workshop, hosted by Whistle Labs"
      className={`inline-flex flex-col leading-none ${color}`}
    >
      <span className="font-serif text-2xl font-medium tracking-tight">
        Pasadena <span className="italic">AI</span> Workshop
      </span>
      <span
        className="mt-1 text-[0.72rem] leading-none"
        style={{
          fontFamily: heavyGrotesque,
          fontWeight: 900,
          letterSpacing: "-0.03em",
        }}
      >
        Hosted by Whistle Labs
      </span>
    </Link>
  );
}
