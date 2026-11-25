import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, isValidLocale, defaultLocale, locales } from "../../../dictionaries";
import { LanguageSwitcher } from "../../../components/LanguageSwitcher";
import { RegisterOwnerForm } from "../../../components/RegisterOwnerForm";

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
  const page = getDictionary(safeLang).registerOwnerPage;
  const baseUrl = "https://wapromo.id";

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical: `${baseUrl}/${safeLang}/register-as-owner`,
      languages: {
        id: `${baseUrl}/id/register-as-owner`,
        en: `${baseUrl}/en/register-as-owner`,
        pt: `${baseUrl}/pt/register-as-owner`,
        es: `${baseUrl}/es/register-as-owner`,
        ar: `${baseUrl}/ar/register-as-owner`,
        "x-default": `${baseUrl}/en/register-as-owner`,
      },
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

export default async function RegisterOwnerPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const safeLang = isValidLocale(lang) ? lang : defaultLocale;
  const dict = getDictionary(safeLang);
  const page = dict.registerOwnerPage;

  return (
    <main id="utama" className="owner-register-page">
      <div className="owner-register-shell">
        <header className="owner-register-brand-row">
          <Logo lang={safeLang} />
          <LanguageSwitcher currentLang={safeLang} ariaLabel={dict.nav.language} />
        </header>

        <section className="owner-register-section">
          <div className="owner-register-intro">
          <p className="eyebrow">
            <span className="eyebrow-pulse" aria-hidden="true" />
            <span>{page.badge}</span>
          </p>
          <h1>{page.heading}</h1>
          <p className="lead page-hero-lead">{page.subheading}</p>
          </div>

          <RegisterOwnerForm page={page} lang={safeLang} />
        </section>

        <footer className="owner-register-footer">
          <p>{dict.footer.tagline}</p>
        </footer>
      </div>
    </main>
  );
}
