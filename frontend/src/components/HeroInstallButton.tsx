"use client";

import Link from "next/link";
import { usePWAInstallContext } from "./PWAInstallProvider";
import type { PWAData } from "../dictionaries/types";

interface HeroInstallButtonProps {
  lang: string;
  ctaSecondary: string;
  pwa: PWAData;
}

export function HeroInstallButton({
  lang,
  ctaSecondary,
  pwa,
}: HeroInstallButtonProps) {
  const { promptInstall, isInstalled, isInstalling } = usePWAInstallContext();

  if (isInstalled) {
    return (
      <Link className="button secondary" href={`/${lang}/fitur`}>
        {ctaSecondary}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={promptInstall}
      disabled={isInstalling}
      className="button secondary pwa-hero-install-btn"
    >
      {isInstalling ? (
        <svg
          className="pwa-btn-spinner"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
      ) : (
        <svg
          className="pwa-btn-download-icon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" x2="12" y1="15" y2="3" />
        </svg>
      )}
      <span>{isInstalling ? pwa.installingButton : pwa.installButton}</span>
    </button>
  );
}
