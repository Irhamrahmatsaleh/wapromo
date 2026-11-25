import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, isValidLocale, defaultLocale, locales } from "../../../dictionaries";
import { LanguageSwitcher } from "../../../components/LanguageSwitcher";
import { MobileMenu } from "../../../components/MobileMenu";
import { HeaderNav } from "../../../components/HeaderNav";
import { ScrollHeader } from "../../../components/ScrollHeader";
import { ApiCodeTabs } from "../../../components/ApiCodeTabs";
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
  const baseUrl = "https://wapromo.id";

  return {
    title: dict.apiPage.metaTitle,
    description: dict.apiPage.metaDescription,
    alternates: {
      canonical: `${baseUrl}/${safeLang}/api`,
      languages: {
        id: `${baseUrl}/id/api`,
        en: `${baseUrl}/en/api`,
        pt: `${baseUrl}/pt/api`,
        es: `${baseUrl}/es/api`,
        ar: `${baseUrl}/ar/api`,
        "x-default": `${baseUrl}/en/api`,
      },
    },
    openGraph: {
      title: dict.apiPage.metaTitle,
      description: dict.apiPage.metaDescription,
      url: `${baseUrl}/${safeLang}/api`,
    },
  };
}

function Logo({ lang }: { lang: string }) {
  return (
    <Link className="brand" href={`/${lang}#utama`} aria-label="WAPromo" prefetch>
      <span className="brand-mark" aria-hidden="true" />
      <span>WA<span>Promo</span></span>
    </Link>
  );
}

export default async function ApiPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const safeLang = isValidLocale(lang) ? lang : defaultLocale;
  const dict = getDictionary(safeLang);
  const api = dict.apiPage;

  return (
    <main id="utama" className="api-main-page">
      <ScrollHeader>
        <Logo lang={safeLang} />
        <HeaderNav
          nav={dict.nav}
          theme={dict.theme}
          lang={safeLang}
          currentPath={`/${safeLang}/api`}
        />
        <div className="header-actions">
          <LanguageSwitcher currentLang={safeLang} ariaLabel={dict.nav.language} />
          <AuthRolePicker mode="login" labels={dict.auth} nav={dict.nav} lang={safeLang} className="header-login" />
          <AuthRolePicker mode="signup" labels={dict.auth} nav={dict.nav} lang={safeLang} className="button compact" />
        </div>
        <MobileMenu lang={safeLang} nav={dict.nav} auth={dict.auth} theme={dict.theme} />
      </ScrollHeader>

      {/* Hero Section */}
      <section className="api-hero container">
        <div className="api-hero-header">
          <p className="eyebrow center-eyebrow">
            <span className="eyebrow-pulse" aria-hidden="true" />
            <span>{api.badge.replace(/^●\s*/, "")}</span>
          </p>
          <h1>
            {api.titleLine1}
            <br />
            {api.titleLine2}
          </h1>
          <p className="api-lead">{api.lead}</p>
          <div className="hero-actions api-hero-actions">
            <Link className="button" href={`/${safeLang}/register-as-owner`}>
              {api.ctaPrimary}
            </Link>
            <a className="button secondary" href="#endpoints">
              {api.ctaSecondary}
            </a>
          </div>
        </div>

        {/* Developer Performance Stats */}
        <div className="api-stats-strip">
          <div className="api-stat-item">
            <strong className="api-stat-val">{api.stats.speed}</strong>
            <span className="api-stat-lbl">{api.stats.speedLabel}</span>
          </div>
          <div className="api-stat-item">
            <strong className="api-stat-val">{api.stats.uptime}</strong>
            <span className="api-stat-lbl">{api.stats.uptimeLabel}</span>
          </div>
          <div className="api-stat-item">
            <strong className="api-stat-val">{api.stats.freeTier}</strong>
            <span className="api-stat-lbl">{api.stats.freeTierLabel}</span>
          </div>
        </div>

        {/* Interactive Code Preview */}
        <div className="api-code-preview-wrap">
          <div className="api-code-intro">
            <h2>{api.codeTitle}</h2>
            <p>{api.codeSubtitle}</p>
          </div>
          <ApiCodeTabs />
        </div>
      </section>

      {/* Core Endpoints Section */}
      <section className="api-endpoints-section container" id="endpoints">
        <div className="section-heading centered">
          <p className="eyebrow center-eyebrow">
            <span>REST API SPECIFICATION</span>
          </p>
          <h2>{api.endpointsHeading}</h2>
          <p>{api.endpointsSubheading}</p>
        </div>
        <div className="api-endpoints-grid">
          {api.endpoints.map((ep) => (
            <article className="api-endpoint-card" key={ep.path}>
              <div className="endpoint-meta">
                <span className={`method-badge ${ep.method.toLowerCase()}`}>{ep.method}</span>
                <code className="endpoint-path">{ep.path}</code>
                <span className="endpoint-tag">{ep.tag}</span>
              </div>
              <h3>{ep.title}</h3>
              <p>{ep.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Developer Features Section */}
      <section className="api-features-section container">
        <div className="section-heading centered">
          <p className="eyebrow center-eyebrow">
            <span>ENTERPRISE ARCHITECTURE</span>
          </p>
          <h2>{api.featuresHeading}</h2>
          <p>{api.featuresSubheading}</p>
        </div>
        <div className="api-features-grid">
          {api.features.map((feat, idx) => (
            <article className="api-feature-card" key={idx}>
              <div className="api-feat-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h3>{feat.title}</h3>
              <p>{feat.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Final API CTA */}
      <section className="cta-banner-section container" id="mulai">
        <div className="cta-banner-card">
          <h2>{api.ctaHeading}</h2>
          <p className="cta-banner-sub">{api.ctaSubheading}</p>
          <div className="cta-banner-actions">
            <Link className="button large cta-banner-btn" href={`/${safeLang}/register-as-owner`}>
              {api.ctaButton}
            </Link>
          </div>
          <p className="cta-banner-note">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>{api.ctaNote.replace(/^[✓●]\s*/, "")}</span>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="container">
        <span>{dict.footer.tagline}</span>
        <Logo lang={safeLang} />
      </footer>
    </main>
  );
}
