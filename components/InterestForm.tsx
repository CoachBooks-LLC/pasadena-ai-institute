"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "mt-1.5 w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-ink-900 shadow-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200";

export function InterestForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Something went wrong.");
      setStatus("success");
      setMessage(
        json?.message ||
          "Thanks! We've got your application — we'll be in touch within 1–2 business days to set up a quick call.",
      );
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please email us directly.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="card text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12.5l4 4 10-10"
              className="stroke-amber-700"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="mt-4 text-2xl font-semibold">You&rsquo;re on the list</h3>
        <p className="mx-auto mt-3 max-w-md text-ink-600">{message}</p>
        <button
          type="button"
          className="btn-ghost mt-6"
          onClick={() => setStatus("idle")}
        >
          Submit another response
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-ink-800">
            Full name <span className="text-rose-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className={fieldClass}
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-ink-800">
            Email <span className="text-rose-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
            placeholder="jane@company.com"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="text-sm font-medium text-ink-800">
            Phone <span className="text-ink-400">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={fieldClass}
            placeholder="(626) 555-0142"
          />
        </div>
        <div>
          <label htmlFor="track" className="text-sm font-medium text-ink-800">
            Which sounds like you? <span className="text-rose-500">*</span>
          </label>
          <select id="track" name="track" required className={fieldClass} defaultValue="">
            <option value="" disabled>
              Choose one…
            </option>
            <option value="zero">
              Zero experience — I want to learn AI
            </option>
            <option value="build">
              I have an idea I want to build
            </option>
            <option value="team">
              I&rsquo;m interested in seats for my team
            </option>
            <option value="unsure">Not sure yet</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="experience" className="text-sm font-medium text-ink-800">
          How would you describe your experience with AI today?
        </label>
        <select
          id="experience"
          name="experience"
          className={fieldClass}
          defaultValue=""
        >
          <option value="">Choose one…</option>
          <option value="none">Never really used it</option>
          <option value="dabbled">Dabbled with ChatGPT a little</option>
          <option value="regular">Use it sometimes for work</option>
          <option value="comfortable">Pretty comfortable, want to go deeper</option>
        </select>
      </div>

      <div>
        <label htmlFor="goal" className="text-sm font-medium text-ink-800">
          What do you want to get out of the two days?
        </label>
        <textarea
          id="goal"
          name="goal"
          rows={4}
          className={fieldClass}
          placeholder="Tell us your goal, your idea, or what's holding you back. The more we know, the better we can prepare for you."
        />
      </div>

      {status === "error" && (
        <p className="rounded-lg bg-rose-100 px-4 py-3 text-sm text-rose-700">
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Apply for a seat"}
      </button>
      <p className="text-center text-xs text-ink-400">
        No payment now. We&rsquo;ll review and reach out to set up a quick call.
      </p>
    </form>
  );
}
