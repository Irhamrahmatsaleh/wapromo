"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import { usePWAInstall } from "../hooks/usePWAInstall";
import { PWAInstallModal } from "./PWAInstallModal";
import { PWAInstallOverlay } from "./PWAInstallOverlay";
import type { PWAData } from "../dictionaries/types";

type PWAInstallContextValue = ReturnType<typeof usePWAInstall>;

const PWAInstallContext = createContext<PWAInstallContextValue | null>(null);

export function PWAInstallProvider({
  children,
  pwa,
}: {
  children: ReactNode;
  pwa: PWAData;
}) {
  const install = usePWAInstall();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Clean up legacy 'wapromo-shell-v1' cache that previously cached HTML navigations
    if ("caches" in window) {
      caches
        .keys()
        .then((cacheNames) =>
          Promise.all(
            cacheNames.map(async (cacheName) => {
              if (cacheName === "wapromo-shell-v1") {
                return caches.delete(cacheName);
              }
              try {
                const cache = await caches.open(cacheName);
                await cache.delete("/");
              } catch {
                // Ignore individual cache cleanup errors
              }
              return false;
            })
          )
        )
        .catch(() => {});
    }

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js", { updateViaCache: "none" })
        .then((registration) => {
          registration.update().catch(() => {});
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }, []);

  return (
    <PWAInstallContext.Provider value={install}>
      {children}
      <PWAInstallModal
        isOpen={install.showInstallModal}
        onClose={install.closeInstallModal}
        isIOS={install.isIOS}
        platformInfo={install.platformInfo}
        pwa={pwa}
      />
      <PWAInstallOverlay
        status={install.installStatus}
        pwa={pwa}
        isDesktop={install.isDesktop}
      />
    </PWAInstallContext.Provider>
  );
}

export function usePWAInstallContext() {
  const install = useContext(PWAInstallContext);
  if (!install) {
    throw new Error("usePWAInstallContext must be used within PWAInstallProvider");
  }
  return install;
}
