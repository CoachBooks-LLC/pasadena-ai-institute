import Link from "next/link";

/**
 * Pasadena AI Institute wordmark + mark.
 * The mark is an abstract "rising arc over mountains" — Pasadena's San Gabriel
 * range plus an upward zero-to-one trajectory. Pure inline SVG, no assets.
 */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      role="img"
      aria-label="Pasadena AI Institute mark"
    >
      <rect width="40" height="40" rx="10" className="fill-ink-900" />
      {/* mountains */}
      <path
        d="M6 29 L15 17 L21 24 L27 14 L34 29 Z"
        className="fill-ink-700"
      />
      {/* rising arc (zero to one) */}
      <path
        d="M7 30 C 15 14, 25 14, 33 9"
        className="stroke-amber-500"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* the "one" point */}
      <circle cx="33" cy="9" r="3" className="fill-amber-400" />
    </svg>
  );
}

export function Logo({ withHost = true }: { withHost?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-3">
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-lg font-semibold text-ink-900">
          Pasadena <span className="text-amber-600">AI</span> Institute
        </span>
        {withHost && (
          <span className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.16em] text-ink-400">
            Hosted by Whistle Labs
          </span>
        )}
      </span>
    </Link>
  );
}
