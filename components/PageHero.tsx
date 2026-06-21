import { ReactNode } from "react";
import { ArtPanel, type Artwork } from "@/components/ui/art-panel";
import { GlassCard } from "@/components/ui/glass-card";
import { art } from "@/lib/art";

export function PageHero({
  eyebrow,
  title,
  intro,
  artwork = art.waterLilyPond,
}: {
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  artwork?: Artwork;
}) {
  return (
    <ArtPanel art={artwork} height="tall" scrim="left" priority>
      <div className="container-x py-24">
        <GlassCard
          tone="light"
          className="max-w-3xl animate-fade-rise px-8 py-9 sm:px-11 sm:py-12"
        >
          <h1 className="font-serif text-5xl font-normal leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/85">
            {intro}
          </p>
          <p className="mt-8 text-sm text-white/65">{eyebrow}</p>
        </GlassCard>
      </div>
    </ArtPanel>
  );
}
