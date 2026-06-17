import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <span className="eyebrow text-ink-500">404</span>
      <h1 className="mt-4 font-serif text-5xl font-normal tracking-tight">
        This page wandered off
      </h1>
      <p className="mt-5 max-w-md text-lg text-ink-600">
        The page you&rsquo;re looking for doesn&rsquo;t exist, but the path from
        zero to one is still right this way.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn-primary">
          Back home
        </Link>
        <Link href="/register" className="btn-outline">
          Apply for a seat
        </Link>
      </div>
    </section>
  );
}
