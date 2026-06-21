import type { Metadata } from "next";
import { Bodoni_Moda, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CoverIntro } from "@/components/CoverIntro";
import { LiquidGlassFilterDefs } from "@/components/ui/apple-tahoe-liquid-glass-button";
import { site } from "@/lib/site";

const display = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["Didot", "Georgia", "serif"],
});

const body = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}: Zero to One with AI in Pasadena`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "AI classes Pasadena",
    "learn AI Los Angeles",
    "AI workshop Pasadena",
    "AI for business owners",
    "vibe coding workshop",
    "Cursor Claude training",
    "AI training Southern California",
  ],
  authors: [{ name: site.host, url: site.hostUrl }],
  openGraph: {
    title: `${site.name}: Zero to One with AI in Pasadena`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name}: Zero to One with AI in Pasadena`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <LiquidGlassFilterDefs />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <CoverIntro />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
