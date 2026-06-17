"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { WEBP_DISPLACEMENT_MAP } from "./apple-tahoe-liquid-glass-button";

/**
 * Apple-Tahoe liquid glass as a container card. Chrome ignores a CSS blur()
 * chained with an SVG url() filter on backdrop-filter, so we use two stacked
 * backdrop layers: a frost layer that actually obscures the video across the
 * whole surface, and a refraction layer on top that warps/morphs it (the
 * refraction layer samples the already-frosted layer behind it). Safari lacks
 * url() backdrop-filters and gracefully gets just the frost.
 */
export function LiquidGlass({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const id = React.useId().replace(/:/g, "");
  const css = `
    .lgfrost-${id} {
      background-color: rgba(255, 255, 255, 0.06);
      backdrop-filter: blur(3px) saturate(165%) brightness(1.03);
      -webkit-backdrop-filter: blur(3px) saturate(165%) brightness(1.03);
    }
    .lgrefract-${id} {
      backdrop-filter: url(#lgf-${id});
      box-shadow:
        inset 0 0 0 1px color-mix(in srgb, white 14%, transparent),
        inset 1.8px 3px 0px -2px color-mix(in srgb, white 85%, transparent),
        inset -2px -2px 0px -2px color-mix(in srgb, white 70%, transparent),
        inset -3px -8px 1px -6px color-mix(in srgb, white 55%, transparent),
        inset -0.3px -1px 4px 0px color-mix(in srgb, black 14%, transparent),
        inset -1.5px 2.5px 0px -2px color-mix(in srgb, black 20%, transparent),
        inset 0px 3px 4px -2px color-mix(in srgb, black 20%, transparent),
        inset 2px -6.5px 1px -4px color-mix(in srgb, black 12%, transparent),
        0px 2px 8px 0px color-mix(in srgb, black 14%, transparent),
        0px 14px 40px -8px color-mix(in srgb, black 26%, transparent);
    }
  `;

  return (
    <div className={cn("relative isolate rounded-[1.75rem]", className)}>
      <svg
        className="pointer-events-none absolute h-0 w-0 overflow-hidden"
        aria-hidden="true"
      >
        <filter id={`lgf-${id}`} primitiveUnits="objectBoundingBox">
          <feImage
            result="map"
            width="100%"
            height="100%"
            x="0"
            y="0"
            href={WEBP_DISPLACEMENT_MAP}
            preserveAspectRatio="none"
          />
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.004" result="blur" />
          <feDisplacementMap
            in="blur"
            in2="map"
            scale="0.18"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* frost layer: actually obscures the whole video */}
      <span
        className={`lgfrost-${id} pointer-events-none absolute inset-0 -z-20 rounded-[inherit]`}
      />
      {/* refraction layer: warps the frosted video + the glass rim */}
      <span
        className={`lgrefract-${id} pointer-events-none absolute inset-0 -z-10 rounded-[inherit]`}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
