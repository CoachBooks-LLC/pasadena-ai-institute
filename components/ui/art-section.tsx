import type { ReactNode } from "react";
import type { Artwork } from "@/components/ui/art-panel";
import { cn } from "@/lib/utils";

/**
 * Like ArtPanel, but auto-height — a full-bleed painting behind normal-flow
 * section content, so liquid-glass cards can sit on top and let the artwork
 * bleed through. Carries the same legibility scrim and wall-label credit.
 */
export function ArtSection({
  art,
  children,
  className,
  id,
  position = "center",
  overlay = "bg-ink-950/60",
}: {
  art: Artwork;
  children: ReactNode;
  className?: string;
  id?: string;
  position?: string;
  overlay?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative isolate overflow-hidden bg-ink-950 py-16 sm:py-24",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={art.src}
        alt={art.alt}
        className="absolute inset-0 h-full w-full object-cover motion-safe:animate-ken-burns"
        style={{ objectPosition: position }}
      />
      <div className={cn("absolute inset-0", overlay)} />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_220px_70px_rgba(10,10,12,0.5)]" />

      <div
        className="container-x relative z-10"
        style={{
          textShadow: "0 1px 3px rgba(8,8,10,0.7), 0 2px 30px rgba(8,8,10,0.5)",
        }}
      >
        {children}
      </div>

      <figcaption className="absolute bottom-5 right-5 z-10">
        <span className="inline-block rounded-[2px] bg-ink-950/65 px-3 py-1.5 text-right font-sans text-[0.8125rem] tracking-wide text-white/90 backdrop-blur-sm">
          {art.artist}
          {art.year ? `, ${art.year}` : ""}
          <span className="mx-1.5 opacity-50">·</span>
          <span className="italic">{art.title}</span>
        </span>
      </figcaption>
    </section>
  );
}
