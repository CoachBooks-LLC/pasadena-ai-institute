"use client";

import { useState } from "react";
import { site } from "@/lib/site";

export function ReserveButton({
  className = "btn-primary w-full",
  label,
}: {
  className?: string;
  label?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState("");

  async function reserve() {
    setLoading(true);
    setNote("");
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const json = await res.json();
      if (res.ok && json.url) {
        window.location.href = json.url as string;
        return;
      }
      setNote(
        json?.message ||
          "Online checkout isn't available right now — please apply below and we'll send a payment link.",
      );
    } catch {
      setNote(
        "Something went wrong starting checkout. Please apply below and we'll send a payment link.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={reserve}
        disabled={loading}
        className={`${className} disabled:cursor-not-allowed disabled:opacity-60`}
      >
        {loading
          ? "Starting secure checkout…"
          : label || `Pay & reserve — ${site.price.display}`}
      </button>
      {note && (
        <p className="mt-3 rounded-lg bg-amber-50 px-4 py-3 text-center text-sm text-amber-800">
          {note}{" "}
          <a href="#interest" className="link-underline font-semibold">
            Apply with the interest form ↓
          </a>
        </p>
      )}
    </div>
  );
}
