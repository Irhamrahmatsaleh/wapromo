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
  const p = dict.helpPage;

  const title = p?.metaTitle || `${dict.nav.help} | WAPromo`;
  const description = p?.metaDescription || dict.meta.description;

  return {
    title,
    description,
    alternates: {
      canonical: `https://wapromo.id/${safeLang}/bantuan`,
      languages: {
        id: "https://wapromo.id/id/bantuan",
        en: "https://wapromo.id/en/bantuan",
        pt: "https://wapromo.id/pt/bantuan",
        es: "https://wapromo.id/es/bantuan",
        ar: "https://wapromo.id/ar/bantuan",
        "x-default": "https://wapromo.id/en/bantuan",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://wapromo.id/${safeLang}/bantuan`,
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

export default async function BantuanPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const safeLang = isValidLocale(lang) ? lang : defaultLocale;
  const dict = getDictionary(safeLang);
  const page = dict.helpPage;

  return (
    <main id="utama" className="help-page">
      <ScrollHeader>
        <Logo lang={safeLang} />
        <HeaderNav
          nav={dict.nav}
          theme={dict.theme}
          lang={safeLang}
          currentPath={`/${safeLang}/bantuan`}
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
            <span>{page?.badge || "PUSAT BANTUAN & PANDUAN"}</span>
          </p>
          <h1>
            {page?.titleLine1 || "Kami Siap Membantu Toko Anda,"}
            <br />
            {page?.titleLine2 || "Setiap Langkah Menuju Sukses"}
          </h1>
          <p className="lead page-hero-lead">
            {page?.lead || "Temukan panduan praktis, jawaban atas kendala umum, dan tips jualan laris di WhatsApp tanpa rasa pusing."}
          </p>
        </div>
      </section>

      {/* Quick Start Steps */}
      {page?.quickStartSteps && (
        <section className="quickstart-section container">
          <div className="section-header text-center max-w-720">
            <h2>{page.quickStartHeading}</h2>
            <p className="subheading">{page.quickStartSubheading}</p>
          </div>
          <div className="quickstart-grid">
            {page.quickStartSteps.map((step) => (
              <div className="quickstart-card" key={step.step}>
                <span className="quickstart-number">{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Categorized FAQs */}
      {page?.categories && (
        <section className="faq-categories-section container">
          <div className="faq-categories-grid">
            {page.categories.map((cat) => (
              <div className="faq-category-card" key={cat.title}>
                <h3 className="category-title">{cat.title}</h3>
                <div className="category-faqs">
                  {cat.items.map((item, idx) => (
                    <details className="category-faq-details" key={item.question} open={idx === 0}>
                      <summary className="category-faq-question">
                        <span>{item.question}</span>
                        <svg className="category-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </summary>
                      <div className="category-faq-answer">
                        <p>{item.answer}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Direct Contact Support Box */}
      <section className="contact-box-section container">
        <div className="contact-box">
          <div className="contact-box-icon" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <div className="contact-box-content">
            <h3>{page?.contactHeading || "Butuh Bantuan Langsung dari Tim Kami?"}</h3>
            <p>{page?.contactDesc || "Tim dukungan pelanggan WAPromo siap membantu kendala teknis dan membimbing setup toko Anda."}</p>
          </div>
          <a
            className="button contact-btn"
            href="https://wa.me/6285780735784"
            target="_blank"
            rel="noopener noreferrer"
          >
            {page?.contactButton || "Chat Dukungan WhatsApp"}
          </a>
        </div>
      </section>

      <footer className="footer container">
        <p>{dict.footer.tagline}</p>
      </footer>
    </main>
  );
}
