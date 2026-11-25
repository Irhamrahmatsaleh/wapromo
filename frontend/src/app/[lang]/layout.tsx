import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import { getDictionary, locales, defaultLocale, isValidLocale } from "../../dictionaries";
import { CleanAnchorNavigation } from "../../components/CleanAnchorNavigation";
import { PWAInstallProvider } from "../../components/PWAInstallProvider";
import "../globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-jakarta",
});

export const viewport: Viewport = {
  themeColor: "#13b888",
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const safeLang = isValidLocale(lang) ? lang : defaultLocale;
  const dict = getDictionary(safeLang);
  const baseUrl = "https://wapromo.id";

  return {
    title: {
      default: dict.meta.title,
      template: "%s | WAPromo",
    },
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    icons: {
      icon: "/icon.svg",
    },
    applicationName: "WAPromo",
    manifest: "/manifest.webmanifest",
    alternates: {
      canonical: `${baseUrl}/${dict.lang}`,
      languages: {
        id: `${baseUrl}/id`,
        en: `${baseUrl}/en`,
        pt: `${baseUrl}/pt`,
        es: `${baseUrl}/es`,
        ar: `${baseUrl}/ar`,
        "x-default": `${baseUrl}/en`,
      },
    },
    openGraph: {
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
      type: "website",
      locale:
        dict.lang === "id"
          ? "id_ID"
          : dict.lang === "pt"
          ? "pt_BR"
          : dict.lang === "es"
          ? "es_ES"
          : dict.lang === "ar"
          ? "ar_AR"
          : "en_US",
      siteName: "WAPromo",
      url: `${baseUrl}/${dict.lang}`,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const safeLang = isValidLocale(lang) ? lang : defaultLocale;
  const dict = getDictionary(safeLang);

  return (
    <html
      lang={dict.lang}
      dir={dict.dir}
      className={plusJakartaSans.variable}
      data-theme-preference="system"
      suppressHydrationWarning
    >
      <head>
        <script
          id="theme-initializer"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var k="wapromo-theme",c=document.cookie.match(/(?:^|; )wapromo_theme=([^;]*)/),p=c?decodeURIComponent(c[1]):localStorage.getItem(k);if(p==="light"||p==="dark"||p==="system"){document.documentElement.dataset.themePreference=p;}else{document.documentElement.dataset.themePreference="system";}}catch(e){}try{window.__wapromoDeferredPrompt=null;window.addEventListener("beforeinstallprompt",function(e){e.preventDefault();window.__wapromoDeferredPrompt=e;});if("serviceWorker" in navigator){navigator.serviceWorker.register("/sw.js",{updateViaCache:"none"}).catch(function(){});}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "SoftwareApplication",
                  name: "WAPromo",
                  applicationCategory: "BusinessApplication",
                  operatingSystem: "Web, Android, iOS",
                  offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: dict.lang === "id" ? "IDR" : "USD",
                  },
                  description: dict.meta.description,
                  url: `https://wapromo.id/${dict.lang}`,
                },
                {
                  "@type": "Organization",
                  name: "WAPromo",
                  url: "https://wapromo.id",
                  logo: "https://wapromo.id/icon.svg",
                },
              ],
            }),
          }}
        />
      </head>
      <body>
        <CleanAnchorNavigation />
        <PWAInstallProvider pwa={dict.pwa}>
          {children}
        </PWAInstallProvider>
        <Script id="pwa-registration" strategy="afterInteractive">
          {`if ("serviceWorker" in navigator) { navigator.serviceWorker.register("/sw.js", { updateViaCache: "none" }).catch(() => {}); }`}
        </Script>
      </body>
    </html>
  );
}
