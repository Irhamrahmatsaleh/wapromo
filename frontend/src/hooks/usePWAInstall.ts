"use client";

import { useEffect, useRef, useState } from "react";
import { getPWAPlatformInfo, type PWAPlatformInfo } from "../lib/pwa-device";

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

interface RelatedApp {
  platform?: string;
  url?: string;
  id?: string;
  version?: string;
}

type NavigatorWithInstalledApps = Navigator & {
  getInstalledRelatedApps?: () => Promise<RelatedApp[]>;
};

declare global {
  interface Window {
    __wapromoDeferredPrompt?: BeforeInstallPromptEvent | null;
  }
}

const INSTALLED_STORAGE_KEY = "wapromo_pwa_installed";
const IOS_INSTALLED_STORAGE_KEY = "wapromo_pwa_ios_installed";

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [platformInfo, setPlatformInfo] = useState<PWAPlatformInfo>(() => getPWAPlatformInfo());
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [installStatus, setInstallStatus] = useState<"idle" | "installing" | "success" | "dismissed">("idle");

  const isInstallingRef = useRef(false);
  const isPromptingRef = useRef(false);
  const hasCompletedRef = useRef(false);
  const installAcceptedAtRef = useRef<number>(0);
  const appInstalledEventCountRef = useRef<number>(0);
  const finishTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const completeInstallationRef = useRef<(source: string) => void>(() => {});

  useEffect(() => {
    const info = getPWAPlatformInfo();
    setPlatformInfo(info);

    const clearTimers = () => {
      if (finishTimeoutRef.current) {
        clearTimeout(finishTimeoutRef.current);
        finishTimeoutRef.current = null;
      }
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
    };

    const queryOSInstalledApps = async (): Promise<boolean> => {
      if (typeof navigator === "undefined") return false;
      const nav = navigator as NavigatorWithInstalledApps;
      if (typeof nav.getInstalledRelatedApps !== "function") return false;
      try {
        const apps = await nav.getInstalledRelatedApps();
        return Array.isArray(apps) && apps.length > 0;
      } catch {
        return false;
      }
    };

    const completeInstallation = (source: string) => {
      if (hasCompletedRef.current) {
        return;
      }
      console.log(`[PWA] Real OS installation confirmed (${source}) -> showing synchronized success`);
      clearTimers();
      hasCompletedRef.current = true;
      isInstallingRef.current = false;
      isPromptingRef.current = false;
      setIsInstalled(true);
      setDeferredPrompt(null);
      if (typeof window !== "undefined") {
        window.__wapromoDeferredPrompt = null;
      }
      setShowInstallModal(false);
      setInstallStatus("success");

      try {
        localStorage.setItem(INSTALLED_STORAGE_KEY, "true");
      } catch {}

      // Keep the green checkmark visible briefly in sync with the Android OS notification, then close
      finishTimeoutRef.current = setTimeout(() => {
        setIsInstalling(false);
        setInstallStatus("idle");
      }, 1500);
    };

    completeInstallationRef.current = completeInstallation;

    // 1. Check if running in standalone mode (installed PWA)
    const isStandalone = info.isStandalone;

    // 2. Check localStorage persistence for installed status
    let isStorageInstalled = false;
    if (typeof window !== "undefined") {
      try {
        isStorageInstalled =
          localStorage.getItem(INSTALLED_STORAGE_KEY) === "true" ||
          (info.isIOS && localStorage.getItem(IOS_INSTALLED_STORAGE_KEY) === "true");
      } catch {
        /* storage may be blocked */
      }
    }

    if (isStandalone || isStorageInstalled) {
      setIsInstalled(true);
      hasCompletedRef.current = true;
    }

    // 3. Verify against Android OS PackageManager via getInstalledRelatedApps when available
    void queryOSInstalledApps().then((osInstalled) => {
      if (osInstalled) {
        setIsInstalled(true);
        hasCompletedRef.current = true;
        try {
          localStorage.setItem(INSTALLED_STORAGE_KEY, "true");
        } catch {}
      }
    });

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      if (typeof window !== "undefined") {
        window.__wapromoDeferredPrompt = promptEvent;
      }
      setDeferredPrompt(promptEvent);

      // If browser fires beforeinstallprompt and we are not mid-install, app is NOT installed (or was uninstalled)
      if (!isInstallingRef.current) {
        setIsInstalled(false);
        hasCompletedRef.current = false;
        appInstalledEventCountRef.current = 0;
        installAcceptedAtRef.current = 0;
        try {
          localStorage.removeItem(INSTALLED_STORAGE_KEY);
        } catch {}
      }
    };

    // Check if beforeinstallprompt fired before React hydration completed
    if (typeof window !== "undefined" && window.__wapromoDeferredPrompt) {
      handleBeforeInstallPrompt(window.__wapromoDeferredPrompt);
    }

    const handleAppInstalled = () => {
      if (hasCompletedRef.current) {
        console.log("[PWA] Duplicate appinstalled event ignored (already completed)");
        return;
      }

      appInstalledEventCountRef.current += 1;
      const now = Date.now();
      const elapsedSinceAccept =
        installAcceptedAtRef.current > 0 ? now - installAcceptedAtRef.current : 0;

      // On Android Chromium, clicking [Install] in the native prompt fires `appinstalled` TWICE:
      // 1) Immediately (~4ms-300ms after clicking [Install]) when the dialog is accepted and "Installing WAPromo..." starts.
      // 2) At the exact millisecond Android OS PackageManager commits PACKAGE_ADDED (and shows the system notification).
      if (info.isAndroid && (isInstallingRef.current || isPromptingRef.current)) {
        if (
          appInstalledEventCountRef.current === 1 &&
          (isPromptingRef.current || elapsedSinceAccept < 1500)
        ) {
          console.log(
            `[PWA] Android native prompt accepted handshake (${elapsedSinceAccept}ms) -> waiting for real Android OS WebAPK installation...`
          );
          if (installAcceptedAtRef.current === 0) {
            installAcceptedAtRef.current = now;
          }
          return;
        }

        // 2nd appinstalled event (or event arriving after WebAPK build/install phase) = REAL OS completion!
        completeInstallation(`android-appinstalled-#${appInstalledEventCountRef.current} (${elapsedSinceAccept}ms)`);
        return;
      }

      // If user initiated install on Desktop (where install is instantaneous with 1 event)
      if (isInstallingRef.current) {
        completeInstallation(`desktop-appinstalled (${elapsedSinceAccept}ms)`);
        return;
      }

      // If user installed via browser 3-dot menu directly without clicking our Install button:
      // On Android, ignore the 1st handshake event and mark installed on the 2nd real OS event.
      if (info.isAndroid && appInstalledEventCountRef.current === 1) {
        installAcceptedAtRef.current = now;
        console.log("[PWA] Browser menu install started -> waiting for Android OS completion...");
        return;
      }

      console.log("[PWA] External browser menu install completed");
      hasCompletedRef.current = true;
      setIsInstalled(true);
      setDeferredPrompt(null);
      if (typeof window !== "undefined") {
        window.__wapromoDeferredPrompt = null;
      }
      setShowInstallModal(false);
      try {
        localStorage.setItem(INSTALLED_STORAGE_KEY, "true");
      } catch {}
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && isInstallingRef.current && !hasCompletedRef.current) {
        const elapsed =
          installAcceptedAtRef.current > 0 ? Date.now() - installAcceptedAtRef.current : 0;
        if (elapsed >= 1500) {
          void queryOSInstalledApps().then((osInstalled) => {
            if (osInstalled && isInstallingRef.current && !hasCompletedRef.current) {
              completeInstallation(`visibility-resume-os-verified (${elapsed}ms)`);
            }
          });
        }
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearTimers();
    };
  }, []);

  const promptInstall = async () => {
    if (isInstalled || platformInfo.isStandalone || hasCompletedRef.current || isInstallingRef.current) {
      return;
    }

    const activePrompt =
      deferredPrompt || (typeof window !== "undefined" ? window.__wapromoDeferredPrompt : null);

    // 1. Native prompt first policy: If deferredPrompt is available, trigger it
    if (activePrompt) {
      try {
        isPromptingRef.current = true;
        appInstalledEventCountRef.current = 0;
        installAcceptedAtRef.current = 0;

        setDeferredPrompt(null);
        if (typeof window !== "undefined") {
          window.__wapromoDeferredPrompt = null;
        }

        await activePrompt.prompt();
        const { outcome } = await activePrompt.userChoice;
        isPromptingRef.current = false;

        if (outcome === "accepted") {
          const acceptedNow = Date.now();
          if (installAcceptedAtRef.current === 0) {
            installAcceptedAtRef.current = acceptedNow;
          }

          console.log("[PWA] User clicked Install in native prompt -> syncing circle with real Android OS installation");
          isInstallingRef.current = true;
          setIsInstalling(true);
          setInstallStatus("installing");

          // Actively poll Android PackageManager via navigator.getInstalledRelatedApps()
          // in parallel with the 2nd `appinstalled` OS broadcast so whichever fires first wins immediately.
          if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
          pollIntervalRef.current = setInterval(async () => {
            if (!isInstallingRef.current || hasCompletedRef.current) {
              if (pollIntervalRef.current) {
                clearInterval(pollIntervalRef.current);
                pollIntervalRef.current = null;
              }
              return;
            }

            const elapsed = Date.now() - installAcceptedAtRef.current;
            if (elapsed < 1200) return;

            const nav = navigator as NavigatorWithInstalledApps;
            if (typeof nav.getInstalledRelatedApps === "function") {
              try {
                const apps = await nav.getInstalledRelatedApps();
                if (Array.isArray(apps) && apps.length > 0 && isInstallingRef.current && !hasCompletedRef.current) {
                  completeInstallationRef.current(`getInstalledRelatedApps (${elapsed}ms)`);
                }
              } catch {
                /* ignore polling errors */
              }
            }
          }, 250);

          // Safety ceiling (30s) in case the OS or non-Play custom ROM never dispatches the second broadcast
          if (finishTimeoutRef.current) clearTimeout(finishTimeoutRef.current);
          finishTimeoutRef.current = setTimeout(() => {
            if (!isInstallingRef.current || hasCompletedRef.current) return;
            completeInstallationRef.current("safety-timeout-30s");
          }, 30000);
        } else {
          console.log("[PWA] User clicked Cancel in native prompt");
          isInstallingRef.current = false;
          setIsInstalling(false);
          setInstallStatus("idle");
        }
      } catch (error) {
        console.error("[PWA] Error during native install prompt, activating fallback modal:", error);
        isPromptingRef.current = false;
        isInstallingRef.current = false;
        setIsInstalling(false);
        setInstallStatus("idle");
        setShowInstallModal(true);
      }
    } else {
      // 2. Fallback when native prompt is unavailable (iOS Safari, Android prompt not triggered, desktop, or in-app browser)
      setShowInstallModal(true);
    }
  };

  const closeInstallModal = () => {
    setShowInstallModal(false);
    // On iOS, when user reviews the guide and closes, mark as added
    if (platformInfo.isIOS) {
      try {
        localStorage.setItem(IOS_INSTALLED_STORAGE_KEY, "true");
      } catch {}
      setIsInstalled(true);
      hasCompletedRef.current = true;
    }
  };

  const openInstallModal = () => {
    setShowInstallModal(true);
  };

  return {
    deferredPrompt,
    isInstalled,
    isIOS: platformInfo.isIOS,
    isAndroid: platformInfo.isAndroid,
    isDesktop: platformInfo.isDesktop,
    platformInfo,
    showInstallModal,
    isInstalling,
    installStatus,
    promptInstall,
    openInstallModal,
    closeInstallModal,
    canInstall: !isInstalled && !platformInfo.isStandalone && !hasCompletedRef.current,
    hasNativePrompt: !!deferredPrompt,
  };
}
