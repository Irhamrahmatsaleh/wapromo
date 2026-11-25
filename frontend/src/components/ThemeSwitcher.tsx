"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "../dictionaries/types";

export type ThemePreference = "system" | "light" | "dark";

export const themeStorageKey = "wapromo-theme";
export const themeCookieName = "wapromo_theme";
export const themeChangeEvent = "wapromo-theme-change";

export function isThemePreference(value: unknown): value is ThemePreference {
  return value === "system" || value === "light" || value === "dark";
}

export function getClientThemePreference(): ThemePreference {
  if (typeof document === "undefined") return "system";
  const datasetTheme = document.documentElement.dataset.themePreference;
  if (isThemePreference(datasetTheme)) return datasetTheme;
  try {
    const saved = window.localStorage.getItem(themeStorageKey);
    if (isThemePreference(saved)) return saved;
  } catch {}
  return "system";
}

export function applyThemePreference(nextPreference: ThemePreference) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;

  // 1. Temporarily disable all CSS transitions to eliminate color flicker / lag between surfaces
  root.classList.add("disable-theme-transitions");

  // 2. Synchronously update the root theme dataset attribute
  root.dataset.themePreference = nextPreference;

  // 3. Force reflow to commit new CSS variables in a single paint frame
  void window.getComputedStyle(root).opacity;

  // 4. Safely re-enable transitions after the repaint
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      root.classList.remove("disable-theme-transitions");
    });
  });

  // 5. Persist to localStorage for long-term storage
  try {
    window.localStorage.setItem(themeStorageKey, nextPreference);
  } catch {}

  // 6. Persist to Cookie for zero-flash server & client transitions
  try {
    document.cookie = `${themeCookieName}=${nextPreference}; path=/; max-age=31536000; SameSite=Lax`;
  } catch {}

  // 7. Notify all ThemeSwitcher instances across the current window
  window.dispatchEvent(
    new CustomEvent<ThemePreference>(themeChangeEvent, { detail: nextPreference })
  );
}

interface ThemeSwitcherProps {
  labels: Dictionary["theme"];
  isOpen?: boolean;
  onToggleOpen?: (isOpen: boolean) => void;
}

export function ThemeSwitcher({ labels, isOpen, onToggleOpen }: ThemeSwitcherProps) {
  const [preference, setPreference] = useState<ThemePreference>("system");
  const switcherRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    if (isOpen !== undefined && switcherRef.current) {
      const isCurrentlyOpen = switcherRef.current.hasAttribute("open");
      if (isOpen && !isCurrentlyOpen) {
        switcherRef.current.setAttribute("open", "");
      } else if (!isOpen && isCurrentlyOpen) {
        switcherRef.current.removeAttribute("open");
      }
    }
  }, [isOpen]);

  useEffect(() => {
    // Synchronize initial preference from root element
    setPreference(getClientThemePreference());

    // Listen to local theme change events (e.g., between Desktop header & Mobile drawer)
    function handleThemeChange(event: Event) {
      const customEvent = event as CustomEvent<ThemePreference>;
      if (isThemePreference(customEvent.detail)) {
        setPreference(customEvent.detail);
      } else {
        setPreference(getClientThemePreference());
      }
    }

    // Listen to cross-tab storage changes
    function handleStorage(event: StorageEvent) {
      if (event.key !== themeStorageKey && event.key !== null) return;
      const nextPreference = isThemePreference(event.newValue) ? event.newValue : "system";
      setPreference(nextPreference);
      document.documentElement.dataset.themePreference = nextPreference;
      try {
        document.cookie = `${themeCookieName}=${nextPreference}; path=/; max-age=31536000; SameSite=Lax`;
      } catch {}
    }

    // Click outside listener: cleanly close dropdown when user clicks elsewhere
    function handleClickOutside(event: MouseEvent) {
      if (
        switcherRef.current &&
        switcherRef.current.open &&
        !switcherRef.current.contains(event.target as Node)
      ) {
        switcherRef.current.open = false;
        switcherRef.current.removeAttribute("open");
      }
    }

    // Escape key listener: cleanly close dropdown and return focus to summary
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && switcherRef.current && switcherRef.current.open) {
        switcherRef.current.open = false;
        switcherRef.current.removeAttribute("open");
        switcherRef.current.querySelector<HTMLElement>("summary")?.focus();
      }
    }

    window.addEventListener(themeChangeEvent, handleThemeChange);
    window.addEventListener("storage", handleStorage);
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(themeChangeEvent, handleThemeChange);
      window.removeEventListener("storage", handleStorage);
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function handleToggle(event: React.SyntheticEvent<HTMLDetailsElement>) {
    const isNowOpen = event.currentTarget.open;
    if (onToggleOpen) {
      onToggleOpen(isNowOpen);
    }
    if (isNowOpen) {
      // Close other open details elements (e.g. language switcher) to prevent UI collision
      document.querySelectorAll<HTMLDetailsElement>("details[open]").forEach((details) => {
        if (details !== event.currentTarget) {
          details.open = false;
          details.removeAttribute("open");
        }
      });
    }
  }

  function selectTheme(nextPreference: ThemePreference) {
    applyThemePreference(nextPreference);
    if (switcherRef.current) {
      switcherRef.current.open = false;
      switcherRef.current.removeAttribute("open");
    }
    if (onToggleOpen) {
      onToggleOpen(false);
    }
  }

  return (
    <details className="theme-switcher" ref={switcherRef} onToggle={handleToggle}>
      <summary className="theme-summary" aria-haspopup="menu">
        <span>{labels.label}</span>
        <svg
          className="theme-chevron"
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
      <div className="theme-dropdown" role="menu" aria-label={labels.label}>
        {(["system", "light", "dark"] as const).map((theme) => {
          const isActive = preference === theme;
          return (
            <button
              className={`theme-option${isActive ? " active" : ""}`}
              type="button"
              key={theme}
              role="menuitemradio"
              aria-checked={isActive}
              onClick={() => selectTheme(theme)}
            >
              <span className="theme-option-label">{labels[theme]}</span>
              {isActive && (
                <span className="theme-check" aria-hidden="true">
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>
    </details>
  );
}