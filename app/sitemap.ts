import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { nav } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [...nav.map((n) => n.href), "/register"];
  // de-dupe while preserving order
  const unique = Array.from(new Set(routes));
  return unique.map((path) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
