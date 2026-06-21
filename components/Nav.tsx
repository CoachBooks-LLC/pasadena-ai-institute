"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { nav } from "@/lib/site";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let frame = 0;
    const updateScrolled = () => {
      frame = 0;
      const nextScrolled = window.scrollY > 24;
      setScrolled((current) =>
        current === nextScrolled ? current : nextScrolled
      );
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateScrolled);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // Over the art hero (top of every page) the bar is transparent with light
  // text; once scrolled it becomes the gallery wall with ink text.
  const solid = scrolled || open;
  const tone = solid ? "dark" : "light";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid
          ? "border-b border-ink-100 bg-canvas/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between">
        <Logo tone={tone} />

        <nav className="hidden items-center gap-9 lg:flex">
          {nav.slice(1).map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors ${
                  solid
                    ? active
                      ? "text-ink-900"
                      : "text-ink-500 hover:text-ink-900"
                    : active
                      ? "text-white"
                      : "text-white hover:text-white/80"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/register"
            aria-label="Apply for a seat"
            className={`inline-flex items-center justify-center rounded-[4px] border px-5 py-2.5 text-sm font-medium shadow-lg backdrop-blur-xl transition-colors ${
              solid
                ? "border-ink-900/10 bg-ink-900/[0.06] text-ink-900 hover:bg-ink-900/10"
                : "border-white/10 bg-white/20 text-white hover:bg-white/25"
            }`}
          >
            Apply
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={`inline-flex items-center justify-center rounded-md p-2 lg:hidden ${
            solid ? "text-ink-800" : "text-white"
          }`}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            {open ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 8h16M4 16h16"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-ink-100 bg-canvas lg:hidden">
          <nav className="container-x flex flex-col py-3">
            {nav.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-ink-100 py-4 text-base text-ink-700 last:border-0 hover:text-ink-900"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="btn-primary mt-4 w-full"
            >
              Apply
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
