import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The signature liquid-glass surface, lifted from the homepage hero card:
 * a translucent frosted plate that lets the artwork behind it bleed through.
 *
 * Tones:
 *  - "light" — white frost for white text, used over dark artwork/video (hero look)
 *  - "dark"  — smoked black frost for white text (the "black liquid glass")
 *  - "frost" — near-opaque light frost that keeps DARK text/forms fully legible
 *
 * Edged corners (rounded-lg) by default to match the hero card.
 */
const tones = {
  light: "border-white/10 bg-white/20 text-white",
  dark: "border-white/10 bg-ink-950/55 text-white",
  frost: "border-white/50 bg-white/80 text-ink-800",
} as const;

export function GlassCard({
  children,
  className,
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  tone?: keyof typeof tones;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border shadow-xl backdrop-blur-xl",
        tones[tone],
        className,
      )}
    >
      {children}
    </div>
  );
}
