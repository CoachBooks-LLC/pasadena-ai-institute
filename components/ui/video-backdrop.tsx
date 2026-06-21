"use client";

import { useEffect, useRef } from "react";

export function VideoBackdrop({
  src,
  poster,
  position,
  label,
  preload,
}: {
  src: string;
  poster: string;
  position: string;
  label: string;
  preload: "none" | "metadata" | "auto";
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;

    const coverActive = () =>
      document.documentElement.hasAttribute("data-cover-intro-active");

    const syncPlayback = () => {
      if (reduceMotion.matches || !visible || coverActive()) {
        video.pause();
        return;
      }

      void video.play().catch(() => {
        // Browsers can reject autoplay while a tab is backgrounded.
      });
    };

    if (!("IntersectionObserver" in window)) {
      visible = true;
      syncPlayback();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        syncPlayback();
      },
      { threshold: 0.08 }
    );

    observer.observe(video);
    window.addEventListener("cover-intro-visibility", syncPlayback);
    reduceMotion.addEventListener("change", syncPlayback);

    return () => {
      observer.disconnect();
      window.removeEventListener("cover-intro-visibility", syncPlayback);
      reduceMotion.removeEventListener("change", syncPlayback);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover"
      style={{ objectPosition: position }}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload={preload}
      aria-label={label}
    />
  );
}
