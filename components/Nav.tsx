"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./Logo";
import { nav } from "@/lib/site";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-100 bg-canvas/85 backdrop-blur-md">
      <div className="container-x flex h-20 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-600 transition-colors hover:text-ink-900"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/register" className="btn-primary">
            Reserve a Seat
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-md p-2 text-ink-700 lg:hidden"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            {open ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-ink-100 bg-canvas lg:hidden">
          <nav className="container-x flex flex-col gap-1 py-4">
            {nav.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-ink-700 hover:bg-canvas-soft"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 w-full"
            >
              Reserve a Seat
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
