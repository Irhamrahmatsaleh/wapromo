"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { languagesMeta, locales, type Locale } from "../dictionaries";

interface LanguageSwitcherProps {
  currentLang: Locale;
  ariaLabel?: string;
}

function getLocalizedPath(pathname: string | null, targetLocale: Locale): string {
  if (!pathname || pathname === "/" || pathname === `/${targetLocale}`) {
    return `/${targetLocale}`;
  }

  const segments = pathname.split("/");
  const firstSegment = segments[1];

  if (locales.includes(firstSegment as Locale)) {
    segments[1] = targetLocale;
    const result = segments.join("/");
    return result === `/${targetLocale}/` ? `/${targetLocale}` : result;
  }

  const cleanPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `/${targetLocale}${cleanPath}`;
}

// Convert 2-letter ISO 3166-1 country code into unicode emoji flag
function countryToFlag(countryCode: string): string {
  const code = countryCode.toUpperCase();
  if (code.length !== 2) return "🌐";
  const offset = 127397;
  return String.fromCodePoint(code.charCodeAt(0) + offset, code.charCodeAt(1) + offset);
}

// Universal map of worldwide language codes to their standard ISO country emoji
const LANG_TO_COUNTRY: Record<string, string> = {
  // 5 Golden Native Languages
  id: "ID", // 🇮🇩 Indonesia
  en: "US", // 🇺🇸 USA
  pt: "BR", // 🇧🇷 Brazil
  es: "ES", // 🇪🇸 Spain
  ar: "SA", // 🇸🇦 Saudi Arabia

  // East & Southeast Asia
  zh: "CN", // 🇨🇳 China
  "zh-cn": "CN",
  "zh-tw": "TW",
  "zh-hk": "HK",
  ja: "JP", // 🇯🇵 Japan
  ko: "KR", // 🇰🇷 Korea
  vi: "VN", // 🇻🇳 Vietnam
  th: "TH", // 🇹🇭 Thailand
  ms: "MY", // 🇲🇾 Malaysia
  tl: "PH", // 🇵🇭 Philippines
  fil: "PH",
  my: "MM", // 🇲🇲 Myanmar
  km: "KH", // 🇰🇭 Cambodia
  lo: "LA", // 🇱🇦 Laos
  mn: "MN", // 🇲🇳 Mongolia

  // South Asia
  hi: "IN", // 🇮🇳 India
  bn: "BD", // 🇧🇩 Bangladesh
  ur: "PK", // 🇵🇰 Pakistan
  ta: "IN",
  te: "IN",
  mr: "IN",
  gu: "IN",
  kn: "IN",
  ml: "IN",
  pa: "IN",
  ne: "NP", // 🇳🇵 Nepal
  si: "LK", // 🇱🇰 Sri Lanka

  // Middle East, Caucasus & Central Asia
  fa: "IR", // 🇮🇷 Iran
  he: "IL", // 🇮🇱 Israel
  iw: "IL",
  tr: "TR", // 🇹🇷 Turkey
  az: "AZ", // 🇦🇿 Azerbaijan
  kk: "KZ", // 🇰🇿 Kazakhstan
  uz: "UZ", // 🇺🇿 Uzbekistan
  ka: "GE", // 🇬🇪 Georgia
  hy: "AM", // 🇦🇲 Armenia
  ps: "AF", // 🇦🇫 Afghanistan
  ku: "IQ", // 🇮🇶 Kurdish

  // Europe
  cs: "CZ", // 🇨🇿 Czech
  de: "DE", // 🇩🇪 Germany
  fr: "FR", // 🇫🇷 France
  it: "IT", // 🇮🇹 Italy
  ru: "RU", // 🇷🇺 Russia
  uk: "UA", // 🇺🇦 Ukraine
  pl: "PL", // 🇵🇱 Poland
  nl: "NL", // 🇳🇱 Netherlands
  el: "GR", // 🇬🇷 Greece
  sv: "SE", // 🇸🇪 Sweden
  da: "DK", // 🇩🇰 Denmark
  fi: "FI", // 🇫🇮 Finland
  no: "NO", // 🇳🇴 Norway
  nb: "NO",
  nn: "NO",
  sk: "SK", // 🇸🇰 Slovakia
  hu: "HU", // 🇭🇺 Hungary
  ro: "RO", // 🇷🇴 Romania
  bg: "BG", // 🇧🇬 Bulgaria
  hr: "HR", // 🇭🇷 Croatia
  sr: "RS", // 🇷🇸 Serbia
  sl: "SI", // 🇸🇮 Slovenia
  et: "EE", // 🇪🇪 Estonia
  lv: "LV", // 🇱🇻 Latvia
  lt: "LT", // 🇱🇹 Lithuania
  sq: "AL", // 🇦🇱 Albania
  mk: "MK", // 🇲🇰 North Macedonia
  bs: "BA", // 🇧🇦 Bosnia
  is: "IS", // 🇮🇸 Iceland
  ga: "IE", // 🇮🇪 Ireland
  cy: "GB", // 🇬🇧 Wales
  be: "BY", // 🇧🇾 Belarus
  ca: "ES", // 🇪🇸 Catalan
  eu: "ES", // 🇪🇸 Basque
  gl: "ES", // 🇪🇸 Galician

  // Africa
  sw: "KE", // 🇰🇪 Swahili
  am: "ET", // 🇪🇹 Amharic
  ha: "NG", // 🇳🇬 Hausa
  yo: "NG", // 🇳🇬 Yoruba
  ig: "NG", // 🇳🇬 Igbo
  zu: "ZA", // 🇿🇦 Zulu
  xh: "ZA", // 🇿🇦 Xhosa
  af: "ZA", // 🇿🇦 Afrikaans
  so: "SO", // 🇸🇴 Somali
  mg: "MG", // 🇲🇬 Malagasy
};

function getLanguageName(langCode: string): string {
  try {
    const baseCode = langCode.split("-")[0];
    const dn = new Intl.DisplayNames([baseCode], { type: "language" });
    const name = dn.of(baseCode) || dn.of(langCode);
    if (name) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
  } catch {}
  return langCode.toUpperCase();
}

function resolveLanguageInfo(rawLang: string, nativeFlag: string, nativeCode: string) {
  const normalized = rawLang.toLowerCase().trim();
  if (!normalized) {
    return { flag: nativeFlag, code: nativeCode };
  }

  const baseCode = normalized.split("-")[0];
  const matchedCountry =
    LANG_TO_COUNTRY[normalized] ||
    LANG_TO_COUNTRY[baseCode] ||
    (normalized.includes("-") ? normalized.split("-")[1].toUpperCase() : null);

  if (matchedCountry) {
    return {
      flag: countryToFlag(matchedCountry),
      code: baseCode.toUpperCase().slice(0, 3),
    };
  }

  return {
    flag: "🌐",
    code: baseCode.toUpperCase().slice(0, 3),
  };
}

export function LanguageSwitcher({ currentLang, ariaLabel = "Pilih Bahasa" }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const nativeMeta = languagesMeta.find((item) => item.code === currentLang) || languagesMeta[0];

  const [activeFlag, setActiveFlag] = useState<string>(nativeMeta.flag);
  const [activeCode, setActiveCode] = useState<string>(nativeMeta.code.toUpperCase());
  const [translatedExternalLang, setTranslatedExternalLang] = useState<{
    code: string;
    flag: string;
    name: string;
  } | null>(null);
  const [activeLanguageKey, setActiveLanguageKey] = useState<string>(currentLang);
  const [searchAndHash, setSearchAndHash] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSearchAndHash(window.location.search + window.location.hash);
    }
  }, [pathname]);

  useEffect(() => {
    setActiveFlag(nativeMeta.flag);
    setActiveCode(nativeMeta.code.toUpperCase());
    setTranslatedExternalLang(null);
    setActiveLanguageKey(currentLang);

    const checkTranslation = () => {
      if (typeof document === "undefined") return;
      const html = document.documentElement;
      const htmlLang = html.getAttribute("lang")?.toLowerCase().trim() || "";
      const isTranslatedClass = html.classList.contains("translated-ltr") || html.classList.contains("translated-rtl");

      // When browser translation is active or html lang differs from current native route
      if (htmlLang && (isTranslatedClass || htmlLang !== currentLang)) {
        const baseCode = htmlLang.split("-")[0];
        const info = resolveLanguageInfo(htmlLang, nativeMeta.flag, nativeMeta.code.toUpperCase());

        setActiveFlag(info.flag);
        setActiveCode(info.code);

        // Check if translated to one of our 5 native languages
        const matchedNative = languagesMeta.find((l) => l.code === baseCode || l.code === htmlLang);
        if (matchedNative) {
          setTranslatedExternalLang(null);
          setActiveLanguageKey(matchedNative.code);
        } else {
          // External language (e.g. Czech, Japanese, Armenian) - display at top with checkmark
          const langName = getLanguageName(htmlLang);
          setTranslatedExternalLang({
            code: info.code,
            flag: info.flag,
            name: langName,
          });
          setActiveLanguageKey(htmlLang);
        }
        return;
      }

      // Revert to native language
      setActiveFlag(nativeMeta.flag);
      setActiveCode(nativeMeta.code.toUpperCase());
      setTranslatedExternalLang(null);
      setActiveLanguageKey(currentLang);
    };

    checkTranslation();

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "attributes" && (m.attributeName === "lang" || m.attributeName === "class")) {
          checkTranslation();
        }
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang", "class"],
    });

    const handlePointerDown = (event: PointerEvent) => {
      const details = detailsRef.current;
      if (!details || !details.open) return;
      if (!details.contains(event.target as Node)) {
        details.removeAttribute("open");
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && detailsRef.current?.open) {
        detailsRef.current.removeAttribute("open");
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      observer.disconnect();
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentLang, nativeMeta]);

  return (
    <details ref={detailsRef} className="lang-switcher notranslate" translate="no" aria-label={ariaLabel}>
      <summary className="lang-summary notranslate" translate="no" aria-haspopup="listbox">
        <span className="lang-flag notranslate" translate="no" aria-hidden="true">{activeFlag}</span>
        <span className="lang-code notranslate" translate="no">{activeCode}</span>
        <svg
          className="lang-chevron notranslate"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 4.5L6 7.5L9 4.5" />
        </svg>
      </summary>
      <div className="lang-dropdown notranslate" translate="no" role="listbox">
        {/* If translated to an external language (e.g. Czech, Japanese), show it at the TOP with checkmark */}
        {translatedExternalLang && (
          <div
            className="lang-option active notranslate"
            translate="no"
            role="option"
            aria-selected={true}
          >
            <span className="lang-option-flag" aria-hidden="true">{translatedExternalLang.flag}</span>
            <span className="lang-option-name">{translatedExternalLang.name}</span>
            <span className="lang-check" aria-hidden="true">✓</span>
          </div>
        )}

        {/* The 5 Official Native Route Options */}
        {languagesMeta.map((lang) => {
          const isSelected = !translatedExternalLang && activeLanguageKey === lang.code;
          const targetHref = `${getLocalizedPath(pathname, lang.code as Locale)}${searchAndHash}`;

          return (
            <a
              key={lang.code}
              href={targetHref}
              className={`lang-option ${isSelected ? "active" : ""}`}
              role="option"
              aria-selected={isSelected}
              onClick={() => {
                if (detailsRef.current) {
                  detailsRef.current.removeAttribute("open");
                }
                try {
                  document.cookie = `wapromo_locale=${lang.code}; path=/; max-age=31536000; SameSite=Lax`;
                } catch {}
              }}
            >
              <span className="lang-option-flag" aria-hidden="true">{lang.flag}</span>
              <span className="lang-option-name">{lang.name}</span>
              {isSelected && (
                <span className="lang-check" aria-hidden="true">✓</span>
              )}
            </a>
          );
        })}
      </div>
    </details>
  );
}
