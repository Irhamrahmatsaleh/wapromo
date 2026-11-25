import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale, isValidLocale, type Locale } from "./dictionaries";

function detectLocaleFromHeader(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;

  // Header format: "id,en-US;q=0.9,en;q=0.8,pt-BR;q=0.7..."
  const langs = acceptLanguage
    .split(",")
    .map((item) => {
      const [lang, qVal] = item.trim().split(";q=");
      return {
        lang: lang.toLowerCase().trim(),
        q: qVal ? parseFloat(qVal) : 1.0,
      };
    })
    .sort((a, b) => b.q - a.q);

  for (const { lang } of langs) {
    if (lang.startsWith("id")) return "id";
    if (lang.startsWith("pt")) return "pt";
    if (lang.startsWith("es")) return "es";
    if (lang.startsWith("ar")) return "ar";
    if (lang.startsWith("en")) return "en";
  }

  // Global fallback for all other countries in the world
  return "en";
}

function detectLocaleFromCountry(country: string | null): Locale | null {
  if (!country) return null;
  const c = country.toUpperCase().trim();
  if (c === "ID") return "id";
  if (c === "BR") return "pt";
  if (["ES", "MX", "AR", "CO", "CL", "PE", "EC", "VE", "GT", "CU", "BO", "DO", "HN", "PY", "SV", "NI", "CR", "PA", "UY", "PR"].includes(c)) return "es";
  if (["SA", "AE", "EG", "QA", "KW", "OM", "BH", "JO", "LB", "IQ", "MA", "DZ", "TN", "YE", "SD", "LY"].includes(c)) return "ar";
  if (["US", "GB", "AU", "CA", "NZ", "SG", "IN", "PH", "MY", "ZA", "NG", "PK"].includes(c)) return "en";
  return null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if pathname starts with any supported locale (e.g., /id, /en, /pt, /es, /ar)
  const pathnameLocale = locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (pathnameLocale) {
    // Explicit locale route, update cookie preference and proceed
    const response = NextResponse.next();
    response.cookies.set("wapromo_locale", pathnameLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: "lax",
    });
    return response;
  }

  // Root domain access (e.g., wapromo.id/)
  if (pathname === "/") {
    const cookieLocale = request.cookies.get("wapromo_locale")?.value;
    let targetLocale = defaultLocale;

    if (cookieLocale && isValidLocale(cookieLocale)) {
      targetLocale = cookieLocale;
    } else {
      // 1. Edge Geo-IP Location (Vercel / Cloudflare in production)
      const edgeCountry = request.headers.get("x-vercel-ip-country") || request.headers.get("cf-ipcountry");
      const geoLocale = detectLocaleFromCountry(edgeCountry);

      if (geoLocale) {
        // In production: Physical country IP takes highest priority.
        // A user in Indonesia with an English laptop still gets Indonesian!
        // A user in the US or UK gets English!
        targetLocale = geoLocale;
      } else if (request.nextUrl.hostname === "localhost" || request.nextUrl.hostname === "127.0.0.1") {
        // In development (localhost:3000, 127.0.0.1) where Geo-IP header is absent:
        // Default to Indonesian (id) for WAPromo, matching user location in Jakarta.
        targetLocale = defaultLocale;
      } else {
        const acceptLanguage = request.headers.get("accept-language");
        targetLocale = detectLocaleFromHeader(acceptLanguage);
      }
    }

    // Rewrite internally to the detected language page:
    // This keeps the URL in the address bar clean (wapromo.id) without ugly redirect jumps!
    const url = request.nextUrl.clone();
    url.pathname = `/${targetLocale}`;

    const response = NextResponse.rewrite(url);
    response.headers.set("x-wapromo-locale", targetLocale);

    // Save detected locale preference if not present
    if (!cookieLocale) {
      response.cookies.set("wapromo_locale", targetLocale, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
      });
    }

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip static files, Next.js internals, and assets
    "/((?!api|_next/static|_next/image|manifest.webmanifest|icon.svg|icon-192.png|icon-512.png|sw.js|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
