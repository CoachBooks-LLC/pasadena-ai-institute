"use client";

import { useEffect, useState } from "react";
import { useScreenSize } from "@/hooks/use-screen-size";
import { PixelTrail } from "@/components/ui/pixel-trail";
import { GooeyFilter } from "@/components/ui/gooey-filter";
import { GlassButton } from "@/components/ui/apple-tahoe-liquid-glass-button";

/**
 * Full-screen intro cover built on the gooey pixel-trail effect
 * (GooeyFilter + PixelTrail) over a painted backdrop: moving the cursor leaves
 * a trail of gooey, merging blobs across the screen. Just a question and a
 * button to step inside.
 */
export function CoverIntro() {
  const screenSize = useScreenSize();
  const [dismissed, setDismissed] = useState(false);
  const [leaving, setLeaving] = useState(false);

  // Lock background scroll while the cover is up.
  useEffect(() => {
    document.body.style.overflow = dismissed ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [dismissed]);

  function enter() {
    setLeaving(true);
    window.setTimeout(() => setDismissed(true), 700);
  }

  if (dismissed) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to the Pasadena AI Workshop"
      className={`fixed inset-0 z-[100] overflow-hidden bg-black transition-opacity duration-700 ease-in-out ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* painted backdrop */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/cover-bg.png"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />

      {/* gooey pixel trail (follows the cursor) */}
      <GooeyFilter id="gooey-filter-pixel-trail" strength={5} />
      <div
        className="absolute inset-0 z-0"
        style={{ filter: "url(#gooey-filter-pixel-trail)" }}
      >
        <PixelTrail
          pixelSize={screenSize.lessThan("md") ? 24 : 32}
          fadeDuration={0}
          delay={500}
          pixelClassName="bg-white"
        />
      </div>

      {/* foreground: just a question + a button */}
      <div
        className={`pointer-events-none relative z-10 flex h-full flex-col items-center justify-center px-6 text-center transition-all duration-700 ${
          leaving ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        <h1
          className="max-w-6xl font-sans text-7xl font-bold leading-[0.98] tracking-tight text-white sm:text-9xl"
          style={{ textShadow: "0 2px 24px rgba(0,0,0,0.45)" }}
        >
          Learn AI.
          <br />
          Right here in Pasadena.
        </h1>

        <div className="pointer-events-auto mt-10">
          <GlassButton
            type="button"
            onClick={enter}
            autoFocus
            size="lg"
            className="group"
            contentClassName="gap-3 text-white"
          >
            Let&rsquo;s go
            <span
              aria-hidden
              className="transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          </GlassButton>
        </div>
      </div>
    </div>
  );
}
