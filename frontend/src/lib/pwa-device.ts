/**
 * PWA Device & Browser Detection Helper
 * =====================================
 * Accurately detects OS (iOS, Android, Desktop) and Browser (Safari, Chrome, Samsung, Edge, Firefox, In-App).
 * Powers contextual PWA installation instructions and fail-safe installation fallback workflows.
 */

export type PWAOperatingSystem = "ios" | "android" | "desktop" | "other";

export type PWABrowser =
  | "safari"
  | "chrome"
  | "samsung"
  | "edge"
  | "firefox"
  | "inapp"
  | "other";

export interface PWAPlatformInfo {
  os: PWAOperatingSystem;
  browser: PWABrowser;
  isIOS: boolean;
  isAndroid: boolean;
  isDesktop: boolean;
  isSafari: boolean;
  isChrome: boolean;
  isSamsung: boolean;
  isEdge: boolean;
  isFirefox: boolean;
  isInAppBrowser: boolean;
  isStandalone: boolean;
  browserName: string;
  osName: string;
}

/**
 * Accurately detects whether the client is a REAL Android device.
 */
export function isRealAndroidDevice(): boolean {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return false;
  }

  const ua = navigator.userAgent || "";
  const isAndroidUA = /Android/i.test(ua);
  if (!isAndroidUA) {
    return false;
  }

  const navWithUAData = navigator as Navigator & {
    userAgentData?: { platform?: string };
  };
  const clientPlatform = (navWithUAData.userAgentData?.platform || "").toString();
  if (/Android/i.test(clientPlatform)) {
    return true;
  }

  const legacyPlatform = (navigator.platform || "").toString();
  if (/Win32|Win64|MacIntel/i.test(legacyPlatform)) {
    return false;
  }

  return true;
}

/**
 * Accurately detects whether the client is a REAL iOS device (iPhone, iPad, iPod).
 */
export function isRealIOSDevice(): boolean {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return false;
  }
  const ua = navigator.userAgent || "";
  const isIOSUA = /iPhone|iPad|iPod/i.test(ua);
  const isIPadOS =
    navigator.platform === "MacIntel" && (navigator.maxTouchPoints || 0) > 1;
  return isIOSUA || isIPadOS;
}

/**
 * Detects whether the current page is being viewed inside an in-app browser/webview
 * (e.g. Instagram, Facebook, TikTok, Line, WhatsApp, Twitter/X).
 */
export function isInAppBrowser(ua: string): boolean {
  return /FBAN|FBAV|Instagram|ByteLocale|TikTok|Line\/|Twitter|Snapchat|WhatsApp/i.test(ua);
}

/**
 * Returns comprehensive OS, Browser, and PWA installation state.
 */
export function getPWAPlatformInfo(): PWAPlatformInfo {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return {
      os: "other",
      browser: "other",
      isIOS: false,
      isAndroid: false,
      isDesktop: false,
      isSafari: false,
      isChrome: false,
      isSamsung: false,
      isEdge: false,
      isFirefox: false,
      isInAppBrowser: false,
      isStandalone: false,
      browserName: "Browser",
      osName: "Device",
    };
  }

  const ua = navigator.userAgent || "";
  const navPlatform = (navigator.platform || "").toString();

  // 1. Detect Standalone (already installed / running as PWA)
  const isStandalone =
    Boolean(window.matchMedia("(display-mode: standalone)").matches) ||
    Boolean((navigator as unknown as { standalone?: boolean }).standalone);

  // 2. Detect In-App Browser
  const inApp = isInAppBrowser(ua);

  // 3. Detect OS
  const isIOS = isRealIOSDevice();
  const isAndroid = isRealAndroidDevice();
  const isDesktop =
    !isIOS &&
    !isAndroid &&
    /Win32|Win64|Windows|Macintosh|MacIntel|Linux|CrOS/i.test(navPlatform || ua);

  let os: PWAOperatingSystem = "other";
  let osName = "Device";
  if (isIOS) {
    os = "ios";
    osName =
      /iPad/i.test(ua) || (navPlatform === "MacIntel" && navigator.maxTouchPoints > 1)
        ? "iPad (iOS)"
        : "iPhone (iOS)";
  } else if (isAndroid) {
    os = "android";
    osName = "Android";
  } else if (isDesktop) {
    os = "desktop";
    if (/Win32|Win64|Windows/i.test(navPlatform || ua)) {
      osName = "Windows PC";
    } else if (/Macintosh|MacIntel/i.test(navPlatform || ua)) {
      osName = "Mac";
    } else if (/CrOS/i.test(ua)) {
      osName = "ChromeOS";
    } else {
      osName = "Desktop";
    }
  }

  // 4. Detect Browser
  const isSamsung = /SamsungBrowser/i.test(ua);
  const isEdge = /Edg|EdgiOS/i.test(ua);
  const isFirefox = /Firefox|FxiOS/i.test(ua);
  const isChrome = !isSamsung && !isEdge && /Chrome|CriOS/i.test(ua);
  const isSafari =
    !isSamsung &&
    !isEdge &&
    !isFirefox &&
    !isChrome &&
    /Safari/i.test(ua) &&
    /AppleWebKit/i.test(ua);

  let browser: PWABrowser = "other";
  let browserName = "Browser";

  if (inApp) {
    browser = "inapp";
    browserName = "In-App Browser";
  } else if (isSamsung) {
    browser = "samsung";
    browserName = "Samsung Internet";
  } else if (isEdge) {
    browser = "edge";
    browserName = "Microsoft Edge";
  } else if (isFirefox) {
    browser = "firefox";
    browserName = "Firefox";
  } else if (isChrome) {
    browser = "chrome";
    browserName = "Google Chrome";
  } else if (isSafari) {
    browser = "safari";
    browserName = "Safari";
  }

  return {
    os,
    browser,
    isIOS,
    isAndroid,
    isDesktop,
    isSafari,
    isChrome,
    isSamsung,
    isEdge,
    isFirefox,
    isInAppBrowser: inApp,
    isStandalone,
    browserName,
    osName,
  };
}
