import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, isValidLocale, defaultLocale, locales } from "../../../dictionaries";
import { LanguageSwitcher } from "../../../components/LanguageSwitcher";
import { MobileMenu } from "../../../components/MobileMenu";
import { HeaderNav } from "../../../components/HeaderNav";
import { ScrollHeader } from "../../../components/ScrollHeader";
import { AuthRolePicker } from "../../../components/AuthRolePicker";

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
  const p = dict.ebookPage;

  const title = p?.metaTitle || `${dict.nav.ebook} | WAPromo`;
  const description = p?.metaDescription || dict.meta.description;

  return {
    title,
    description,
    alternates: {
      canonical: `https://wapromo.id/${safeLang}/ebook`,
      languages: {
        id: "https://wapromo.id/id/ebook",
        en: "https://wapromo.id/en/ebook",
        pt: "https://wapromo.id/pt/ebook",
        es: "https://wapromo.id/es/ebook",
        ar: "https://wapromo.id/ar/ebook",
        "x-default": "https://wapromo.id/en/ebook",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://wapromo.id/${safeLang}/ebook`,
      siteName: "WAPromo",
      locale: safeLang,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

function Logo({ lang }: { lang: string }) {
  return (
    <Link className="brand" href={`/${lang}`} aria-label="WAPromo" prefetch>
      <span className="brand-mark" aria-hidden="true" />
      <span>WA<span>Promo</span></span>
    </Link>
  );
}

export default async function EbookPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const safeLang = isValidLocale(lang) ? lang : defaultLocale;
  const dict = getDictionary(safeLang);
  const page = dict.ebookPage;

  return (
    <main id="utama" className="ebook-page">
      <ScrollHeader>
        <Logo lang={safeLang} />
        <HeaderNav
          nav={dict.nav}
          theme={dict.theme}
          lang={safeLang}
          currentPath={`/${safeLang}/ebook`}
        />
        <div className="header-actions">
          <LanguageSwitcher currentLang={safeLang} ariaLabel={dict.nav.language} />
          <AuthRolePicker mode="login" labels={dict.auth} nav={dict.nav} lang={safeLang} className="header-login" />
          <AuthRolePicker mode="signup" labels={dict.auth} nav={dict.nav} lang={safeLang} className="button compact" />
        </div>
        <MobileMenu lang={safeLang} nav={dict.nav} auth={dict.auth} theme={dict.theme} />
      </ScrollHeader>

      {/* Hero Section */}
      <section className="page-hero container text-center">
        <div className="page-hero-content max-w-720">
          <p className="eyebrow">
            <span className="eyebrow-pulse" aria-hidden="true" />
            <span>{page?.badge || "E-BOOK & PLAYBOOK GRATIS"}</span>
          </p>
          <h1>
            {page?.titleLine1 || "Download Playbook Rahasia,"}
            <br />
            {page?.titleLine2 || "WhatsApp Automation Toko Online"}
          </h1>
          <p className="lead page-hero-lead">
            {page?.lead || "Panduan lengkap langkah demi langkah membangun sistem CS otomatis yang closing 24 jam tanpa drama dan tanpa membakar nomor."}
          </p>
        </div>
      </section>

      {/* Book Presentation Section */}
      <section className="ebook-presentation-section container">
        <div className="ebook-card">
          <div className="ebook-cover-col">
            <div className="ebook-cover-mockup">
              <span className="cover-badge">E-BOOK PDF</span>
              <h3>{page?.bookTitle || "Playbook WhatsApp Automation untuk Olshop Indonesia"}</h3>
              <p className="cover-sub">{page?.bookSubtitle || "Panduan Praktis Mengatur 10 CS, Menutup Penjualan 24 Jam"}</p>
              <div className="cover-brand">
                <span className="brand-mark-small" aria-hidden="true" />
                <span>WAPromo Special Edition</span>
              </div>
            </div>
            {page?.highlights && (
              <div className="ebook-highlights-box">
                {page.highlights.map((item) => (
                  <div className="highlight-pill" key={item}>
                    <span className="highlight-check" aria-hidden="true">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="ebook-info-col">
            <h2>{page?.bookTitle}</h2>
            <p className="ebook-desc">{page?.bookDesc}</p>

            <div className="ebook-chapters-box">
              <h3>{page?.chaptersHeading || "Apa yang Akan Anda Pelajari di E-Book Ini:"}</h3>
              <ul className="chapters-list">
                {page?.chapters?.map((chap, idx) => (
                  <li key={chap}>
                    <span className="chap-num" aria-hidden="true">{idx + 1}</span>
                    <span>{chap}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="ebook-download-cta">
              <a
                className="button large ebook-btn"
                href="/downloads/playbook-whatsapp-automation.pdf"
                download="Playbook-WhatsApp-Automation-WAPromo.pdf"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" x2="12" y1="15" y2="3"/>
                </svg>
                <span>{page?.downloadButton || "Download E-Book Gratis (PDF)"}</span>
              </a>
              <p className="ebook-note">{page?.downloadNote || "✓ File PDF instan langsung diunduh · Tanpa biaya · 100% Gratis"}</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer container">
        <p>{dict.footer.tagline}</p>
      </footer>
    </main>
  );
}
