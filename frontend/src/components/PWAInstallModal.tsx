"use client";

import { useEffect, useState } from "react";
import { getPWAPlatformInfo, type PWAPlatformInfo } from "../lib/pwa-device";
import type { PWAData } from "../dictionaries/types";

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  isIOS?: boolean;
  platformInfo?: PWAPlatformInfo;
  pwa: PWAData;
}

export function PWAInstallModal({
  isOpen,
  onClose,
  isIOS: isIOSProp,
  platformInfo: platformInfoProp,
  pwa,
}: PWAInstallModalProps) {
  const [activeTab, setActiveTab] = useState<"ios" | "android" | "desktop">("android");
  const [platformInfo, setPlatformInfo] = useState<PWAPlatformInfo>(() => {
    return platformInfoProp || getPWAPlatformInfo();
  });

  useEffect(() => {
    const info = platformInfoProp || getPWAPlatformInfo();
    setPlatformInfo(info);

    // Auto-select tab matching detected platform
    if (isIOSProp ?? info.isIOS) {
      setActiveTab("ios");
    } else if (info.isAndroid) {
      setActiveTab("android");
    } else if (info.isDesktop) {
      setActiveTab("desktop");
    } else {
      setActiveTab("android");
    }
  }, [isOpen, isIOSProp, platformInfoProp]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pwa-install-title"
      className="pwa-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="pwa-modal-dialog">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="pwa-modal-close"
          aria-label={pwa.closeLabel}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {/* Header */}
        <div className="pwa-modal-header">
          <div className="pwa-modal-title-row">
            <div className="pwa-modal-brand-icon" aria-hidden="true" />
            <div className="pwa-modal-title-col">
              <h3 id="pwa-install-title" className="pwa-modal-title">
                {pwa.installTitle}
              </h3>
              <div className="pwa-modal-badge-row">
                <span className="pwa-modal-detected-badge">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                    <path d="M2 12h20" />
                  </svg>
                  <span>
                    {pwa.installDetectedBadge}: {platformInfo.osName} ({platformInfo.browserName})
                  </span>
                </span>
              </div>
            </div>
          </div>
          <p className="pwa-modal-subtitle">
            {activeTab === "ios"
              ? pwa.installIOSDescription
              : activeTab === "android"
              ? pwa.installAndroidDescription
              : pwa.installDescription}
          </p>
        </div>

        {/* In-App Browser Warning Alert */}
        {platformInfo.isInAppBrowser && (
          <div className="pwa-modal-inapp-warning">
            <svg
              className="pwa-modal-warning-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <div>
              <p className="pwa-modal-warning-title">{pwa.installInAppWarningTitle}</p>
              <p className="pwa-modal-warning-desc">{pwa.installInAppWarningDescription}</p>
            </div>
          </div>
        )}

        {/* Tab Switcher */}
        <div className="pwa-modal-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "ios"}
            onClick={() => setActiveTab("ios")}
            className={`pwa-modal-tab ${activeTab === "ios" ? "is-active" : ""}`}
          >
            <svg
              width="15"
              height="15"
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
            <span>{pwa.installTabIOS}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "android"}
            onClick={() => setActiveTab("android")}
            className={`pwa-modal-tab ${activeTab === "android" ? "is-active" : ""}`}
          >
            <svg
              width="15"
              height="15"
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
            <span>{pwa.installTabAndroid}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "desktop"}
            onClick={() => setActiveTab("desktop")}
            className={`pwa-modal-tab ${activeTab === "desktop" ? "is-active" : ""}`}
          >
            <svg
              width="15"
              height="15"
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
            <span>{pwa.installTabDesktop}</span>
          </button>
        </div>

        {/* Instructions Content */}
        <div className="pwa-modal-steps">
          {activeTab === "ios" && (
            <>
              {/* Step 1: Open Share Menu */}
              <div className="pwa-modal-step step-blue">
                <div className="pwa-modal-step-icon icon-blue" aria-hidden="true">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                    <polyline points="16 6 12 2 8 6" />
                    <line x1="12" x2="12" y1="2" y2="15" />
                  </svg>
                </div>
                <div className="pwa-modal-step-body">
                  <p className="pwa-modal-step-title">{pwa.installIOSShareTitle}</p>
                  <p className="pwa-modal-step-desc">{pwa.installIOSShareDescription}</p>
                </div>
              </div>

              {/* Step 2: Add to Home Screen */}
              <div className="pwa-modal-step step-emerald">
                <div className="pwa-modal-step-icon icon-emerald" aria-hidden="true">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" x2="12" y1="15" y2="3" />
                  </svg>
                </div>
                <div className="pwa-modal-step-body">
                  <p className="pwa-modal-step-title">{pwa.installIOSAddTitle}</p>
                  <p className="pwa-modal-step-desc">{pwa.installIOSAddDescription}</p>
                </div>
              </div>

              {/* Step 3: Confirm Add */}
              <div className="pwa-modal-step step-green">
                <div className="pwa-modal-step-icon icon-green" aria-hidden="true">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <div className="pwa-modal-step-body">
                  <p className="pwa-modal-step-title">{pwa.installIOSConfirmTitle}</p>
                  <p className="pwa-modal-step-desc">{pwa.installIOSConfirmDescription}</p>
                </div>
              </div>

              <p className="pwa-modal-tip">{pwa.installIOSBrowserTip}</p>
            </>
          )}

          {activeTab === "android" && (
            <>
              {/* Step 1: Open Chrome Menu */}
              <div className="pwa-modal-step step-blue">
                <div className="pwa-modal-step-icon icon-blue" aria-hidden="true">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="5" r="1" />
                    <circle cx="12" cy="19" r="1" />
                  </svg>
                </div>
                <div className="pwa-modal-step-body">
                  <p className="pwa-modal-step-title">{pwa.installAndroidMenuTitle}</p>
                  <p className="pwa-modal-step-desc">{pwa.installAndroidMenuDescription}</p>
                </div>
              </div>

              {/* Step 2: Choose Install App */}
              <div className="pwa-modal-step step-emerald">
                <div className="pwa-modal-step-icon icon-emerald" aria-hidden="true">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" x2="12" y1="15" y2="3" />
                  </svg>
                </div>
                <div className="pwa-modal-step-body">
                  <p className="pwa-modal-step-title">{pwa.installAndroidAddTitle}</p>
                  <p className="pwa-modal-step-desc">{pwa.installAndroidAddDescription}</p>
                </div>
              </div>

              {/* Step 3: Confirm Installation */}
              <div className="pwa-modal-step step-green">
                <div className="pwa-modal-step-icon icon-green" aria-hidden="true">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <div className="pwa-modal-step-body">
                  <p className="pwa-modal-step-title">{pwa.installAndroidConfirmTitle}</p>
                  <p className="pwa-modal-step-desc">{pwa.installAndroidConfirmDescription}</p>
                </div>
              </div>
            </>
          )}

          {activeTab === "desktop" && (
            <>
              {/* Desktop Option 1: Address Bar */}
              <div className="pwa-modal-step step-emerald">
                <div className="pwa-modal-step-icon icon-emerald" aria-hidden="true">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="18" height="12" x="3" y="4" rx="2" ry="2" />
                    <line x1="2" x2="22" y1="20" y2="20" />
                  </svg>
                </div>
                <div className="pwa-modal-step-body">
                  <p className="pwa-modal-step-title">{pwa.installBrowserTitle}</p>
                  <p className="pwa-modal-step-desc">{pwa.installBrowserDescription}</p>
                </div>
              </div>

              {/* Desktop Option 2: Browser 3-dots Menu */}
              <div className="pwa-modal-step step-blue">
                <div className="pwa-modal-step-icon icon-blue" aria-hidden="true">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="5" r="1" />
                    <circle cx="12" cy="19" r="1" />
                  </svg>
                </div>
                <div className="pwa-modal-step-body">
                  <p className="pwa-modal-step-title">{pwa.installBrowserClickTitle}</p>
                  <p className="pwa-modal-step-desc">{pwa.installBrowserClickDescription}</p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="pwa-modal-footer">
          <button
            type="button"
            onClick={onClose}
            className="pwa-modal-done-btn"
          >
            {pwa.installDone}
          </button>
        </div>
      </div>
    </div>
  );
}
