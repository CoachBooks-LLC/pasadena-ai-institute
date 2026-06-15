"use client";

import { useState } from "react";
import type { Faq } from "@/lib/content";

export function FAQAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-ink-100 overflow-hidden rounded-xl2 border border-ink-100 bg-white">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-canvas-soft"
            >
              <span className="font-semibold text-ink-900">{item.q}</span>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                className={`shrink-0 text-amber-600 transition-transform duration-200 ${
                  isOpen ? "rotate-45" : ""
                }`}
                aria-hidden
              >
                <path
                  d="M12 5v14M5 12h14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <div
              className={`grid transition-all duration-200 ease-out ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 leading-relaxed text-ink-600">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
