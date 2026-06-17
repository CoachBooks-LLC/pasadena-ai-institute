import Link from "next/link";
import { LogoMark } from "./Logo";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-ink-200 bg-canvas">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <LogoMark className="h-10 w-10" />
            <div className="leading-tight">
              <div className="font-serif text-lg font-medium tracking-tight text-ink-900">
                Pasadena <span className="italic">AI</span> Workshop
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-ink-500">
                Hosted by Whistle Labs
              </div>
            </div>
          </div>
          <p className="mt-6 max-w-sm leading-relaxed text-ink-600">
            A two-day, in-person atelier in Pasadena that takes professionals from
            zero to one with AI, whether you&rsquo;re starting fresh or building a
            real idea.
          </p>
          <p className="mt-4 text-sm text-ink-500">Serving {site.region}.</p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">
            Explore
          </h3>
          <ul className="mt-5 space-y-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-ink-600 transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">
            Get Started
          </h3>
          <ul className="mt-5 space-y-3">
            <li>
              <Link
                href="/register"
                className="text-sm text-ink-600 transition-colors hover:text-accent"
              >
                Apply for a Seat
              </Link>
            </li>
            <li>
              <a
                href={`mailto:${site.contactEmail}`}
                className="text-sm text-ink-600 transition-colors hover:text-accent"
              >
                {site.contactEmail}
              </a>
            </li>
            <li>
              <a
                href={site.hostUrl}
                className="text-sm text-ink-600 transition-colors hover:text-accent"
              >
                whistlelabs.ai
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-100">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-7 text-xs text-ink-500 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. A Whistle Labs company.
          </p>
          <p className="text-ink-500">
            Artwork: public-domain masterworks, Art Institute of Chicago.
          </p>
        </div>
      </div>
    </footer>
  );
}
