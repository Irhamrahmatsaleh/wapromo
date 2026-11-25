"use client";

import { useEffect, useState } from "react";
import type { PWAData } from "../dictionaries/types";

interface PWAInstallOverlayProps {
  status: "idle" | "installing" | "success" | "dismissed";
  pwa: PWAData;
  isDesktop?: boolean;
}

export function PWAInstallOverlay({ status, pwa, isDesktop }: PWAInstallOverlayProps) {
  const [mounted, setMounted] = useState(false);
  const [progressStep, setProgressStep] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Realistic progressive status messages while installing
  useEffect(() => {
    if (status !== "installing") {
      setProgressStep(0);
      return;
    }

    const t1 = setTimeout(() => setProgressStep(1), 1600);
    const t2 = setTimeout(() => setProgressStep(2), 3400);
    const t3 = setTimeout(() => setProgressStep(3), 5600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [status]);

  if (!mounted) return null;
  if (status !== "installing" && status !== "success") return null;

  const isSuccess = status === "success";

  const stepMessage =
    progressStep === 0
      ? pwa.installingStep0
      : progressStep === 1
      ? pwa.installingStep1
      : progressStep === 2
      ? pwa.installingStep2
      : pwa.installingStep3;

  return (
    <div
      role="status"
      aria-live="polite"
      className="pwa-overlay-backdrop"
    >
      <div className="pwa-overlay-card">
        {/* Glow backdrop behind circle */}
        <div
          className={`pwa-overlay-glow ${isSuccess ? "is-success" : "is-installing"}`}
          aria-hidden="true"
        />

        {/* Big Center Circle */}
        <div className="pwa-overlay-circle-wrap">
          {!isSuccess ? (
            <div className="pwa-overlay-installing-box">
              {/* Outer pulsing ring */}
              <div className="pwa-overlay-ping" aria-hidden="true" />

              {/* Spinning SVG Circle Track */}
              <svg
                className="pwa-overlay-spinner-svg"
                viewBox="0 0 100 100"
                aria-hidden="true"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="pwa-overlay-track-circle"
                  strokeWidth="6"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="pwa-overlay-arc-circle"
                  strokeWidth="6"
                  strokeDasharray="264"
                  strokeDashoffset="160"
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>

              {/* Center Icon badge with Official WAPromo Logo */}
              <div className="pwa-overlay-center-badge">
                <svg
                  className="pwa-overlay-logo-svg"
                  viewBox="0 0 192 192"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="12"
                  >
                    <path d="M112 82h21a8 8 0 0 1 8 8v62l-23-20H82a8 8 0 0 1-8-8v-11" />
                    <path d="M60 48h44a8 8 0 0 1 8 8v30a8 8 0 0 1-8 8H76l-24 21V56a8 8 0 0 1 8-8Z" />
                  </g>
                </svg>
                <span translate="no" className="notranslate pwa-overlay-brand-label">
                  WAPROMO
                </span>
              </div>
            </div>
          ) : (
            <div className="pwa-overlay-success-box">
              {/* Glowing success background */}
              <div className="pwa-overlay-success-pulse" aria-hidden="true" />
              <div className="pwa-overlay-success-circle">
                <svg
                  className="pwa-overlay-check-svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Status Text */}
        <h4 className="pwa-overlay-title">
          {isSuccess ? pwa.installedTitle : pwa.installingTitle}
        </h4>

        <p className="pwa-overlay-desc">
          {isSuccess ? pwa.installedMessage : stepMessage}
        </p>

        {/* Animated indeterminate bar when installing */}
        {!isSuccess && (
          <div className="pwa-overlay-progress-track" aria-hidden="true">
            <div className="pwa-overlay-progress-bar" />
          </div>
        )}

        {/* Subtle device badge */}
        <div className="pwa-overlay-device-badge">
          {isDesktop ? (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect width="18" height="12" x="3" y="4" rx="2" ry="2" />
              <line x1="2" x2="22" y1="20" y2="20" />
            </svg>
          ) : (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
              <path d="M12 18h.01" />
            </svg>
          )}
          <span>
            {isSuccess
              ? pwa.installedBadge
              : isDesktop
              ? pwa.installingDesktopBadge
              : pwa.installingBadge}
          </span>
        </div>
      </div>
    </div>
  );
}
