import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Artwork = {
  src: string;
  alt: string;
  artist: string;
  title: string;
  year?: string;
};

/**
 * The signature gallery surface: a full-bleed real painting with a legibility
 * scrim, an optional slow Ken Burns drift (reduced-motion safe via the
 * animate-ken-burns utility), a curatorial wall-label credit, and overlaid
 * content. Color and emotion come from the artwork; the chrome stays quiet.
 */
export function ArtPanel({
  art,
  children,
  className,
  height = "hero",
  position = "center",
  scrim = "left",
  kenBurns = true,
  dim = false,
  scrollCue = false,
  video,
  noScrim = false,
}: {
  art: Artwork;
  children?: ReactNode;
  className?: string;
  height?: "hero" | "tall" | "band";
  position?: string;
  scrim?: "left" | "bottom" | "full";
  kenBurns?: boolean;
  dim?: boolean;
  scrollCue?: boolean;
  /** Optional looping video that replaces the still image (poster = art.src). */
  video?: string;
  /** Drop the darkening overlays so the artwork/video shows fully clean. */
  noScrim?: boolean;
}) {
  const heights = {
    hero: "min-h-[100svh]",
    tall: "min-h-[70vh]",
    band: "min-h-[26rem]",
  };

  const scrims = {
    left: "bg-gradient-to-r from-ink-950/97 via-ink-950/88 via-[58%] to-ink-950/35",
    bottom: "bg-gradient-to-t from-ink-950/97 via-ink-950/85 via-[55%] to-ink-950/30",
    full: "bg-ink-950/72",
  };

  return (
    <section
      className={cn(
        "relative isolate flex w-full items-center overflow-hidden bg-ink-950",
        heights[height],
        className
      )}
    >
      {video ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: position }}
          src={video}
          poster={art.src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label={art.alt}
        />
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={art.src}
          alt={art.alt}
          className={cn(
            "absolute inset-0 h-full w-full object-cover",
            kenBurns && "motion-safe:animate-ken-burns"
          )}
          style={{ objectPosition: position }}
        />
      )}
      {/* darkening overlays for text legibility (skipped when noScrim) */}
      {!noScrim && (
        <>
          <div
            className={cn(
              "absolute inset-0",
              dim ? "bg-ink-950/55" : "bg-ink-950/25"
            )}
          />
          <div className={cn("absolute inset-0", scrims[scrim])} />
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_220px_70px_rgba(10,10,12,0.55)]" />
        </>
      )}

      <div
        className="relative z-10 w-full"
        style={{
          textShadow:
            "0 1px 3px rgba(8,8,10,0.85), 0 2px 30px rgba(8,8,10,0.6)",
        }}
      >
        {children}
      </div>

      {/* scroll cue - signals there's more below the fold */}
      {scrollCue && (
        <div className="pointer-events-none absolute inset-x-0 bottom-7 z-10 flex justify-center">
          <span className="flex flex-col items-center gap-2 text-white/70 motion-safe:animate-nudge">
            <span className="text-[0.7rem] font-medium uppercase tracking-[0.22em]">
              Scroll
            </span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      )}

      {/* museum wall-label: a subtle solid backing guarantees legibility over
          even the brightest passages of paint */}
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
