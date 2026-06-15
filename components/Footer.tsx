import Link from "next/link";
import { LogoMark } from "./Logo";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-ink-100 bg-ink-900 text-canvas">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <LogoMark className="h-10 w-10" />
            <div className="leading-tight">
              <div className="font-serif text-lg font-semibold">
                Pasadena <span className="text-amber-400">AI</span> Institute
              </div>
              <div className="text-[11px] uppercase tracking-[0.16em] text-ink-300">
                Hosted by Whistle Labs
              </div>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-200">
            In-person AI classes in Pasadena that take professionals from zero
            to one — whether you&rsquo;re starting fresh or building a real idea.
          </p>
          <p className="mt-4 text-sm text-ink-300">
            Serving {site.region}.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-300">
            Explore
          </h4>
          <ul className="mt-4 space-y-2.5">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-ink-100 transition-colors hover:text-amber-400"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-300">
            Get Started
          </h4>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link
                href="/register"
                className="text-sm text-ink-100 transition-colors hover:text-amber-400"
              >
                Reserve a Seat
              </Link>
            </li>
            <li>
              <Link
                href="/register#interest"
                className="text-sm text-ink-100 transition-colors hover:text-amber-400"
              >
                Apply / Ask a Question
              </Link>
            </li>
            <li>
              <a
                href={`mailto:${site.contactEmail}`}
                className="text-sm text-ink-100 transition-colors hover:text-amber-400"
              >
                {site.contactEmail}
              </a>
            </li>
            <li>
              <a
                href={site.hostUrl}
                className="text-sm text-ink-100 transition-colors hover:text-amber-400"
              >
                whistlelabs.ai
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-800">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-ink-400 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. A Whistle Labs
            company.
          </p>
          <p>{site.city}</p>
        </div>
      </div>
    </footer>
  );
}
