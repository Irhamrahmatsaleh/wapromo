import type { Dictionary, Locale } from "./types";
import idDict from "./id.json";
import enDict from "./en.json";
import ptDict from "./pt.json";
import esDict from "./es.json";
import arDict from "./ar.json";

export const locales: Locale[] = ["id", "en", "pt", "es", "ar"];

export const defaultLocale: Locale = "id";

const dictionaries: Record<Locale, Dictionary> = {
  id: idDict as unknown as Dictionary,
  en: enDict as unknown as Dictionary,
  pt: ptDict as unknown as Dictionary,
  es: esDict as unknown as Dictionary,
  ar: arDict as unknown as Dictionary,
};

export function isValidLocale(lang: string): lang is Locale {
  return locales.includes(lang as Locale);
}

export function getDictionary(lang: string): Dictionary {
  const safeLang = isValidLocale(lang) ? lang : defaultLocale;
  const dict = dictionaries[safeLang];
  const fallback = safeLang === "id" ? dictionaries["en"] : dictionaries["id"];

  return {
    ...fallback,
    ...dict,
    nav: { ...fallback.nav, ...dict.nav },
    nightmare: dict.nightmare ?? fallback.nightmare,
    epiphany: dict.epiphany ?? fallback.epiphany,
    savings: dict.savings ?? fallback.savings,
    pillarsTeaser: dict.pillarsTeaser ?? fallback.pillarsTeaser,
    featuresPage: dict.featuresPage ?? fallback.featuresPage,
    pricingPage: dict.pricingPage ?? fallback.pricingPage,
    helpPage: dict.helpPage ?? fallback.helpPage,
    blogPage: dict.blogPage ?? fallback.blogPage,
    ebookPage: dict.ebookPage ?? fallback.ebookPage,
    registerOwnerPage: { ...fallback.registerOwnerPage, ...dict.registerOwnerPage },
    dashboardPage: { ...fallback.dashboardPage, ...dict.dashboardPage },
  };
}

export const languagesMeta = [
  { code: "id", name: "Indonesia", flag: "🇮🇩" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
] as const;

export type { Dictionary, Locale, FeatureItem } from "./types";
