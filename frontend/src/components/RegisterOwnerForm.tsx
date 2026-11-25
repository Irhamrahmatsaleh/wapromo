"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import type { RegisterOwnerPageData } from "../dictionaries/types";
import type { Locale } from "../dictionaries";
import {
  ALL_COUNTRIES,
  getDefaultCountryForLocale,
  normalizeWhatsAppWithDialCode,
  sanitizePhoneInput,
  stripSelectedDialCode,
  type CountryDialInfo,
} from "../lib/phone";

interface RegisterOwnerFormProps {
  page: RegisterOwnerPageData;
  lang: Locale;
}

export function RegisterOwnerForm({ page, lang }: RegisterOwnerFormProps) {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState<CountryDialInfo>(() =>
    getDefaultCountryForLocale(lang)
  );
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [phone, setPhone] = useState(page.demoPhone);

  const dropdownWrapRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  // Sync default country if route language changes and user hasn't typed a number yet
  useEffect(() => {
    if (!phone) {
      setSelectedCountry(getDefaultCountryForLocale(lang));
    }
  }, [lang, phone]);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    if (!isCountryOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (
        dropdownWrapRef.current &&
        !dropdownWrapRef.current.contains(event.target as Node)
      ) {
        setIsCountryOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsCountryOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCountryOpen]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isCountryOpen) {
      setCountrySearch("");
      requestAnimationFrame(() => {
        searchInputRef.current?.focus();
      });
    }
  }, [isCountryOpen]);

  // Compute localized country names for all 242 countries
  const localizedCountries = useMemo(() => {
    let displayNames: Intl.DisplayNames | null = null;
    try {
      displayNames = new Intl.DisplayNames([lang], { type: "region" });
    } catch {}

    return ALL_COUNTRIES.map((country) => {
      let localName = country.name;
      if (displayNames) {
        try {
          const resolved = displayNames.of(country.iso);
          if (resolved) localName = resolved;
        } catch {}
      }
      return {
        ...country,
        localName,
      };
    }).sort((a, b) => a.localName.localeCompare(b.localName, lang));
  }, [lang]);

  const filteredCountries = useMemo(() => {
    const q = countrySearch.trim().toLowerCase();
    if (!q) return localizedCountries;
    const cleanDialQuery = q.replace(/^\+/, "");

    return localizedCountries.filter(
      (c) =>
        c.localName.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.iso.toLowerCase().includes(q) ||
        c.dial.includes(cleanDialQuery)
    );
  }, [localizedCountries, countrySearch]);

  const normalizedPhone = useMemo(
    () => normalizeWhatsAppWithDialCode(phone, selectedCountry.dial),
    [phone, selectedCountry.dial]
  );

  // The country code is already chosen in the selector, so '+' is never kept in the field.
  // Typed '+' is ignored; pasted/autofilled '+62...' is cleaned and the country auto-detected.
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = sanitizePhoneInput(e.target.value, phone, selectedCountry);
    setPhone(result.value);
    if (result.country.iso !== selectedCountry.iso) {
      setSelectedCountry(result.country);
    }
  };

  const handlePhoneBlur = () => {
    setPhone((current) => stripSelectedDialCode(current, selectedCountry.dial));
  };

  const handleSelectCountry = (country: CountryDialInfo) => {
    setSelectedCountry(country);
    setIsCountryOpen(false);
    requestAnimationFrame(() => {
      phoneInputRef.current?.focus();
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (password !== confirmPassword) {
      const confirmInput = event.currentTarget.elements.namedItem(
        "confirmPassword"
      ) as HTMLInputElement;
      confirmInput.setCustomValidity(page.passwordMismatch);
      confirmInput.reportValidity();
      return;
    }

    try {
      window.sessionStorage.setItem(
        "wapromo-demo-account",
        JSON.stringify({
          ownerName: formData.get("ownerName"),
          businessName: formData.get("businessName"),
          email: formData.get("email"),
          phone: normalizedPhone,
        })
      );
    } catch {}

    router.push(`/${lang}/dashboard`);
  };

  return (
    <form
      className="owner-register-form"
      aria-describedby="owner-register-note"
      onSubmit={handleSubmit}
    >
      <button className="owner-register-google-btn" type="button">
        <svg
          className="owner-register-google-icon"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fill="#4285F4"
            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
          />
        </svg>
        <span>{page.googleSignUp}</span>
      </button>

      <div className="owner-register-divider" role="separator" aria-label={page.orDivider}>
        <span>{page.orDivider}</span>
      </div>

      <label className="owner-register-field" htmlFor="owner-name">
        {page.ownerNameLabel}
        <input
          id="owner-name"
          name="ownerName"
          autoComplete="name"
          defaultValue={page.demoOwnerName}
          placeholder={page.ownerNamePlaceholder}
          required
        />
      </label>

      <label className="owner-register-field" htmlFor="business-name">
        {page.businessNameLabel}
        <input
          id="business-name"
          name="businessName"
          autoComplete="organization"
          defaultValue={page.demoBusinessName}
          placeholder={page.businessNamePlaceholder}
          required
        />
      </label>

      <label className="owner-register-field" htmlFor="owner-email">
        {page.emailLabel}
        <input
          id="owner-email"
          name="email"
          type="email"
          autoComplete="email"
          defaultValue={page.demoEmail}
          placeholder={page.emailPlaceholder}
          required
        />
      </label>

      <div className="owner-register-field" ref={dropdownWrapRef}>
        <label className="owner-register-label" htmlFor="owner-phone">
          {page.phoneLabel}
        </label>
        <div className={`owner-phone-group ${isCountryOpen ? "is-open" : ""}`}>
          <button
            type="button"
            className="owner-phone-country-btn notranslate"
            translate="no"
            aria-haspopup="listbox"
            aria-expanded={isCountryOpen}
            aria-label={`${selectedCountry.name} (+${selectedCountry.dial})`}
            onClick={() => setIsCountryOpen((prev) => !prev)}
          >
            <span className="owner-phone-flag notranslate" translate="no" aria-hidden="true">
              {selectedCountry.flag}
            </span>
            <span className="owner-phone-dial notranslate" translate="no">
              (+{selectedCountry.dial})
            </span>
            <svg
              className="owner-phone-chevron"
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
          </button>

          <input
            ref={phoneInputRef}
            id="owner-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            className="owner-phone-input"
            value={phone}
            onChange={handlePhoneChange}
            onBlur={handlePhoneBlur}
            placeholder={page.phonePlaceholder}
            required
          />

          {/* Hidden inputs ensuring backend always receives pure digits E.164 format and country ISO */}
          <input type="hidden" name="phoneCountryIso" value={selectedCountry.iso} />
          <input type="hidden" name="phoneDialCode" value={selectedCountry.dial} />
          <input type="hidden" name="phoneNormalized" value={normalizedPhone} />

          {isCountryOpen && (
            <div className="owner-phone-dropdown" role="listbox">
              <div className="owner-phone-search-wrap">
                <input
                  ref={searchInputRef}
                  type="text"
                  className="owner-phone-search"
                  value={countrySearch}
                  onChange={(e) => setCountrySearch(e.target.value)}
                  placeholder={page.countrySearchPlaceholder}
                  aria-label={page.countrySearchPlaceholder}
                />
              </div>
              <div className="owner-phone-list">
                {filteredCountries.length === 0 ? (
                  <div className="owner-phone-empty">{page.countryEmptyText}</div>
                ) : (
                  filteredCountries.map((c) => {
                    const isSelected = c.iso === selectedCountry.iso;
                    return (
                      <button
                        key={c.iso}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        className={`owner-phone-option ${isSelected ? "active" : ""}`}
                        onClick={() => handleSelectCountry(c)}
                      >
                        <span className="owner-phone-option-flag notranslate" translate="no" aria-hidden="true">
                          {c.flag}
                        </span>
                        <span className="owner-phone-option-name">{c.localName}</span>
                        <span className="owner-phone-option-dial notranslate" translate="no">
                          (+{c.dial})
                        </span>
                        {isSelected && (
                          <span className="owner-phone-option-check" aria-hidden="true">
                            ✓
                          </span>
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <label className="owner-register-field" htmlFor="owner-password">
        {page.passwordLabel}
        <input
          id="owner-password"
          name="password"
          type="password"
          autoComplete="new-password"
          defaultValue={page.demoPassword}
          placeholder={page.passwordPlaceholder}
          required
        />
      </label>

      <label className="owner-register-field" htmlFor="owner-confirm-password">
        {page.confirmPasswordLabel}
        <input
          id="owner-confirm-password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          defaultValue={page.demoPassword}
          onChange={(event) => event.currentTarget.setCustomValidity("")}
          placeholder={page.confirmPasswordPlaceholder}
          required
        />
      </label>

      <button className="button owner-register-submit" type="submit">
        {page.submitLabel}
      </button>

      <p className="owner-register-note" id="owner-register-note">
        {page.prototypeNote}
      </p>
    </form>
  );
}
