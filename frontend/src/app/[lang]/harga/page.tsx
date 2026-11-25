import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, isValidLocale, defaultLocale, locales } from "../../../dictionaries";
import { LanguageSwitcher } from "../../../components/LanguageSwitcher";
import { MobileMenu } from "../../../components/MobileMenu";
import { HeaderNav } from "../../../components/HeaderNav";
import { ScrollHeader } from "../../../components/ScrollHeader";
import { AuthRolePicker } from "../../../components/AuthRolePicker";
import { PricingCalculator } from "../../../components/PricingCalculator";

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
  const p = dict.pricingPage;

  const title = p?.metaTitle || `${dict.nav.pricing} | WAPromo`;
  const description = p?.metaDescription || dict.meta.description;

  return {
    title,
    description,
    alternates: {
      canonical: `https://wapromo.id/${safeLang}/harga`,
      languages: {
        id: "https://wapromo.id/id/harga",
        en: "https://wapromo.id/en/harga",
        pt: "https://wapromo.id/pt/harga",
        es: "https://wapromo.id/es/harga",
        ar: "https://wapromo.id/ar/harga",
        "x-default": "https://wapromo.id/en/harga",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://wapromo.id/${safeLang}/harga`,
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

export default async function HargaPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const safeLang = isValidLocale(lang) ? lang : defaultLocale;
  const dict = getDictionary(safeLang);
  const page = dict.pricingPage;

  return (
    <main id="utama" className="pricing-page">
      <ScrollHeader>
        <Logo lang={safeLang} />
        <HeaderNav
          nav={dict.nav}
          theme={dict.theme}
          lang={safeLang}
          currentPath={`/${safeLang}/harga`}
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
            <span>{page?.badge || "PILIHAN PAKET INVESTASI"}</span>
          </p>
          <h1>
            {page?.titleLine1 || "Harga Flat Tanpa Tipu-Tipu,"}
            <br />
            {page?.titleLine2 || "Bebas Biaya Per Pesan Selamanya"}
          </h1>
          <p className="lead page-hero-lead">
            {page?.lead || "Pilih paket yang paling pas untuk skala tokomu. Nikmati kebebasan kirim pesan tanpa rasa cemas melihat tagihan."}
          </p>
        </div>
      </section>

      {/* Pricing Cards with Interactive Monthly / Annual Toggle */}
      <section className="pricing-section container">
        <PricingCalculator
          pricing={dict.pricing}
          pageData={page}
          lang={safeLang}
        />
      </section>

      {/* Real Comparison Table */}
      {page?.comparisonRows && (
        <section className="comparison-table-section container">
          <div className="section-header text-center max-w-720">
            <p className="eyebrow">
              <span className="eyebrow-pulse" aria-hidden="true" />
              <span>PERBANDINGAN NILAI</span>
            </p>
            <h2>{page.comparisonHeading}</h2>
            <p className="subheading">{page.comparisonSubheading}</p>
          </div>

          <div className="table-responsive-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th scope="col">Fitur & Manfaat</th>
                  <th scope="col" className="highlight-col">WAPromo</th>
                  <th scope="col">Platform Lain (BSP Resmi)</th>
                </tr>
              </thead>
              <tbody>
                {page.comparisonRows.map((row) => (
                  <tr key={row.feature}>
                    <td className="row-feature">{row.feature}</td>
                    <td className="row-wapromo highlight-col">
                      <span className="check-icon" aria-hidden="true">✓</span>
                      <strong>{row.wapromo}</strong>
                    </td>
                    <td className="row-others">{row.others}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Satisfaction Guarantee */}
      <section className="guarantee-section container">
        <div className="guarantee-card">
          <div className="guarantee-badge" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
          </div>
          <div className="guarantee-content">
            <h3>{page?.guaranteeHeading || "Garansi 100% Kepuasan Pemilik Toko"}</h3>
            <p>{page?.guaranteeDesc || "Tanpa kontrak mengikat. Anda bebas upgrade, downgrade, atau berhenti berlangganan kapan saja dengan satu klik."}</p>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="cta-banner-section container">
        <div className="cta-banner">
          <h2>{page?.ctaHeading || "Mulai Hemat Jutaan Rupiah dari Hari Ini"}</h2>
          <p>{page?.ctaSubheading || "Hubungkan nomor toko Anda sekarang dan saksikan tim CS Anda bekerja 3x lebih cepat dan bahagia."}</p>
          <div className="cta-banner-actions">
            <Link className="button large cta-banner-btn" href={`/${safeLang}/register-as-owner`}>
              {page?.ctaButton || "Mulai Uji Coba Sekarang"}
            </Link>
          </div>
        </div>
      </section>

      <footer className="footer container">
        <p>{dict.footer.tagline}</p>
      </footer>
    </main>
  );
}
