"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Dictionary, Locale } from "../dictionaries/types";
import { getNavigationItems } from "./navigationItems";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { AuthRolePicker } from "./AuthRolePicker";

interface MobileMenuProps {
  lang: Locale;
  nav: Dictionary["nav"];
  auth: Dictionary["auth"];
  theme: Dictionary["theme"];
}

export function MobileMenu({ lang, nav, auth, theme }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isResourceOpen, setIsResourceOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeMenu = () => {
    setIsResourceOpen(false);
    setIsThemeOpen(false);
    setIsClosing((alreadyClosing) => {
      if (alreadyClosing) return true;
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      closeTimerRef.current = setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
      }, 220);
      return true;
    });
  };

  const openMenu = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setIsClosing(false);
    setIsOpen(true);
  };

  const handleToggle = () => {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;

    html.classList.add("menu-open");
    body.classList.add("menu-open");
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    closeRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMenu();
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    function handleTouchMove(event: TouchEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        event.preventDefault();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      html.classList.remove("menu-open");
      body.classList.remove("menu-open");
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("touchmove", handleTouchMove);
      toggleRef.current?.focus();
    };
  }, [isOpen]);

  return (
    <div className={`mobile-menu${isOpen ? " is-open" : ""}${isClosing ? " is-closing" : ""}`}>
      <button
        ref={toggleRef}
        type="button"
        className="mobile-menu-toggle"
        aria-label={isOpen ? nav.closeMenu : nav.menu}
        aria-expanded={isOpen}
        aria-controls="site-mobile-menu"
        onClick={handleToggle}
      >
        {isOpen ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>
      {isOpen && (
        <button
          type="button"
          className={`mobile-menu-backdrop${isClosing ? " is-closing" : ""}`}
          aria-label={nav.closeMenu}
          tabIndex={-1}
          onClick={closeMenu}
        />
      )}
      {isOpen && (
        <aside
          ref={panelRef}
          id="site-mobile-menu"
          className={`mobile-menu-panel${isClosing ? " is-closing" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-label={nav.menu}
        >
          <div className="mobile-menu-header">
            <Link className="mobile-menu-brand" href={`/${lang}#utama`} aria-label="WAPromo" onClick={closeMenu} prefetch>
              <span className="mobile-menu-brand-mark" aria-hidden="true" />
              <span>WA<span>Promo</span></span>
            </Link>
            <button
              ref={closeRef}
              type="button"
              className="mobile-menu-close"
              aria-label={nav.closeMenu}
              onClick={closeMenu}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
          </div>
          <nav className="mobile-menu-nav">
            {getNavigationItems(nav, lang).map((item) => {
              if (item.subItems) {
                return (
                  <div key={item.label} className="mobile-menu-dropdown-item">
                    <button
                      type="button"
                      className={`mobile-menu-link mobile-menu-dropdown-toggle ${isResourceOpen ? "is-nav-active" : ""}`}
                      onClick={() => {
                        setIsResourceOpen((prev) => !prev);
                      }}
                      aria-expanded={isResourceOpen}
                    >
                      <span>{item.label}</span>
                      <svg
                        className={`mobile-menu-chevron ${isResourceOpen ? "is-rotated" : ""}`}
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                    {isResourceOpen && (
                      <div className="mobile-menu-sublinks">
                        {item.subItems.map((sub) => (
                          <Link
                            className="mobile-menu-sublink"
                            href={sub.href}
                            key={sub.href}
                            onClick={closeMenu}
                            prefetch
                          >
                            {sub.icon && <span className="mobile-sub-icon" aria-hidden="true">{sub.icon}</span>}
                            <span>{sub.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  className="mobile-menu-link"
                  href={item.href || `/${lang}`}
                  key={item.href || item.label}
                  onClick={closeMenu}
                  prefetch
                >
                  {item.label}
                </Link>
              );
            })}
            <ThemeSwitcher
              labels={theme}
              isOpen={isThemeOpen}
              onToggleOpen={(open) => {
                setIsThemeOpen(open);
              }}
            />
          </nav>
          <div className="mobile-menu-action">
            <AuthRolePicker mode="login" labels={auth} nav={nav} lang={lang} className="mobile-menu-login" />
            <AuthRolePicker mode="signup" labels={auth} nav={nav} lang={lang} className="button compact mobile-menu-signup" />
          </div>
        </aside>
      )}
    </div>
  );
}