import type { MetadataRoute } from "next";
import { locales } from "../dictionaries";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://wapromo.id";
  const lastModified = new Date();

  const paths: { slug: string; priority: number; changeFrequency: "weekly" | "monthly" | "daily" }[] = [
    { slug: "", priority: 1.0, changeFrequency: "weekly" },
    { slug: "/fitur", priority: 0.9, changeFrequency: "weekly" },
    { slug: "/harga", priority: 0.9, changeFrequency: "weekly" },
    { slug: "/api", priority: 0.8, changeFrequency: "monthly" },
    { slug: "/bantuan", priority: 0.8, changeFrequency: "weekly" },
    { slug: "/blog", priority: 0.8, changeFrequency: "daily" },
    { slug: "/ebook", priority: 0.8, changeFrequency: "monthly" },
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const { slug, priority, changeFrequency } of paths) {
    for (const lang of locales) {
      entries.push({
        url: `${baseUrl}/${lang}${slug}`,
        lastModified,
        changeFrequency,
        priority: lang === "id" || lang === "en" ? priority : Math.max(0.6, priority - 0.1),
        alternates: {
          languages: {
            id: `${baseUrl}/id${slug}`,
            en: `${baseUrl}/en${slug}`,
            pt: `${baseUrl}/pt${slug}`,
            es: `${baseUrl}/es${slug}`,
            ar: `${baseUrl}/ar${slug}`,
            "x-default": `${baseUrl}/en${slug}`,
          },
        },
      });
    }
  }

  return entries;
}
