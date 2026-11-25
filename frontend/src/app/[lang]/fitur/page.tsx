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
  const p = dict.featuresPage;

  const title = p?.metaTitle || `${dict.nav.features} | WAPromo`;
  const description = p?.metaDescription || dict.meta.description;

  return {
    title,
    description,
    alternates: {
      canonical: `https://wapromo.id/${safeLang}/fitur`,
      languages: {
        id: "https://wapromo.id/id/fitur",
        en: "https://wapromo.id/en/fitur",
        pt: "https://wapromo.id/pt/fitur",
        es: "https://wapromo.id/es/fitur",
        ar: "https://wapromo.id/ar/fitur",
        "x-default": "https://wapromo.id/en/fitur",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://wapromo.id/${safeLang}/fitur`,
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

export default async function FiturPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const safeLang = isValidLocale(lang) ? lang : defaultLocale;
  const dict = getDictionary(safeLang);
  const page = dict.featuresPage;

  if (!page) {
    return null;
  }

  return (
    <main id="utama" className="features-page">
      <ScrollHeader>
        <Logo lang={safeLang} />
        <HeaderNav
          nav={dict.nav}
          theme={dict.theme}
          lang={safeLang}
          currentPath={`/${safeLang}/fitur`}
        />
        <div className="header-actions">
          <LanguageSwitcher currentLang={safeLang} ariaLabel={dict.nav.language} />
          <AuthRolePicker mode="login" labels={dict.auth} nav={dict.nav} lang={safeLang} className="header-login" />
          <AuthRolePicker mode="signup" labels={dict.auth} nav={dict.nav} lang={safeLang} className="button compact" />
        </div>
        <MobileMenu lang={safeLang} nav={dict.nav} auth={dict.auth} theme={dict.theme} />
      </ScrollHeader>

      {/* Hero Section */}
      <section className="page-hero container">
        <div className="page-hero-content">
          <p className="eyebrow">
            <span className="eyebrow-pulse" aria-hidden="true" />
            <span>{page.badge}</span>
          </p>
          <h1>
            {page.titleLine1}
            <br />
            {page.titleLine2}
          </h1>
          <p className="lead page-hero-lead">{page.lead}</p>
          <div className="hero-cta-group">
            <Link className="button" href={`/${safeLang}/register-as-owner`}>
              {page.ctaPrimary}
            </Link>
            <Link className="button secondary" href={`/${safeLang}/harga`}>
              {page.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      {/* Pillars Grid */}
      <section className="features-deep-grid container">
        {page.pillars.map((pillar, idx) => (
          <article className="feature-deep-card" key={pillar.tag}>
            <div className="feature-deep-header">
              <span className="feature-number-badge" aria-hidden="true">0{idx + 1}</span>
              <span className="feature-tag">{pillar.tag}</span>
            </div>
            <h2>{pillar.title}</h2>
            <p className="feature-desc">{pillar.desc}</p>
            <ul className="feature-checklist">
              {pillar.bulletPoints.map((point) => (
                <li key={point}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      {/* Call to Action Banner */}
      <section className="cta-banner-section container">
        <div className="cta-banner">
          <h2>{page.ctaHeading}</h2>
          <p>{page.ctaSubheading}</p>
          <div className="cta-banner-actions">
            <Link className="button large cta-banner-btn" href={`/${safeLang}/register-as-owner`}>
              {page.ctaButton}
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
