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
  const p = dict.blogPage;

  const title = p?.metaTitle || `${dict.nav.blog} | WAPromo`;
  const description = p?.metaDescription || dict.meta.description;

  return {
    title,
    description,
    alternates: {
      canonical: `https://wapromo.id/${safeLang}/blog`,
      languages: {
        id: "https://wapromo.id/id/blog",
        en: "https://wapromo.id/en/blog",
        pt: "https://wapromo.id/pt/blog",
        es: "https://wapromo.id/es/blog",
        ar: "https://wapromo.id/ar/blog",
        "x-default": "https://wapromo.id/en/blog",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://wapromo.id/${safeLang}/blog`,
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

const articleImagesBySlug: Record<string, string> = {
  // ID & EN
  "cara-mengatur-10-cs-whatsapp-tanpa-tabrakan": "/images/blog/cs-team-harmony.webp",
  "trik-closing-chat-jam-12-malam-asisten-ai": "/images/blog/ai-midnight-sales.webp",
  "panduan-whatsapp-marketing-anti-banned": "/images/blog/whatsapp-security-shield.webp",
  "hemat-5-juta-sebulan-tanpa-biaya-per-pesan": "/images/blog/financial-freedom-growth.webp",
  // PT
  "como-gerenciar-10-atendentes-whatsapp-sem-conflito": "/images/blog/cs-team-harmony.webp",
  "estrategia-vendas-madrugada-ia-whatsapp": "/images/blog/ai-midnight-sales.webp",
  "guia-whatsapp-marketing-anti-bloqueio": "/images/blog/whatsapp-security-shield.webp",
  "como-economizar-milhares-sem-taxa-por-mensagem": "/images/blog/financial-freedom-growth.webp",
  // ES
  "como-gestionar-10-asesores-whatsapp-sin-conflictos": "/images/blog/cs-team-harmony.webp",
  "ahorrar-cientos-dolares-sin-cobro-por-mensaje": "/images/blog/financial-freedom-growth.webp",
  // AR
  "kayfa-tudir-10-muwazafin-whatsapp-bidun-tasadum": "/images/blog/cs-team-harmony.webp",
  "khitat-ighlaq-safaqat-muntasaf-al-layl-ai": "/images/blog/ai-midnight-sales.webp",
  "dalil-taswiq-whatsapp-al-amin-didd-al-hazr": "/images/blog/whatsapp-security-shield.webp",
  "tawfir-alaf-al-dulawat-bidun-rusum-al-risalah": "/images/blog/financial-freedom-growth.webp",
};

const defaultImagesByIndex = [
  "/images/blog/cs-team-harmony.webp",
  "/images/blog/ai-midnight-sales.webp",
  "/images/blog/whatsapp-security-shield.webp",
  "/images/blog/financial-freedom-growth.webp",
];

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const safeLang = isValidLocale(lang) ? lang : defaultLocale;
  const dict = getDictionary(safeLang);
  const page = dict.blogPage;

  return (
    <main id="utama" className="blog-page">
      <ScrollHeader>
        <Logo lang={safeLang} />
        <HeaderNav
          nav={dict.nav}
          theme={dict.theme}
          lang={safeLang}
          currentPath={`/${safeLang}/blog`}
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
            <span>{page?.badge || "BLOG & STRATEGI BISNIS"}</span>
          </p>
          <h1>
            {page?.titleLine1 || "Wawasan Praktis Jualan di WhatsApp,"}
            <br />
            {page?.titleLine2 || "Langsung dari Pengalaman Lapangan"}
          </h1>
          <p className="lead page-hero-lead">
            {page?.lead || "Pelajari tips, studi kasus nyata, dan strategi praktis untuk membantu tokomu closing lebih banyak orderan setiap hari."}
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      {page?.articles && (
        <section className="blog-grid-section container">
          <div className="blog-articles-grid">
            {page.articles.map((art, idx) => {
              const imageSrc = articleImagesBySlug[art.slug] || defaultImagesByIndex[idx % defaultImagesByIndex.length];
              const readMoreLabel = page.readMore || (
                safeLang === "id" ? "Baca Selengkapnya" :
                safeLang === "en" ? "Read Full Story" :
                safeLang === "pt" ? "Ler Artigo Completo" :
                safeLang === "es" ? "Leer Artículo Completo" : "اقرأ المقال بالكامل"
              );

              return (
                <article className={`blog-article-card ${idx === 0 ? "featured" : ""}`} key={art.slug}>
                  <div className="article-image-wrap">
                    <img
                      src={imageSrc}
                      alt={art.title}
                      className="article-card-image"
                      loading={idx === 0 ? "eager" : "lazy"}
                      width="800"
                      height="533"
                    />
                  </div>
                  <div className="article-content-wrap">
                    <div className="article-meta-row">
                      <span className="article-tag">{art.tag}</span>
                      <span className="article-time">{art.readTime}</span>
                    </div>
                    <h2>{art.title}</h2>
                    <p className="article-excerpt">{art.excerpt}</p>
                    <div className="article-footer">
                      <span className="article-date">{art.date}</span>
                      <Link className="article-read-link" href={`/${safeLang}/blog/${art.slug}`}>
                        <span>{readMoreLabel}</span>
                        <span className="article-arrow" aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* Call to Action Banner */}
      <section className="cta-banner-section container">
        <div className="cta-banner">
          <h2>Siap Menutup Lebih Banyak Penjualan di WhatsApp?</h2>
          <p>Mulai uji coba toko Anda sekarang juga dan rasakan tim CS bekerja 3x lebih rapi tanpa beban.</p>
          <div className="cta-banner-actions">
            <Link className="button large cta-banner-btn" href={`/${safeLang}/register-as-owner`}>
              {dict.hero.ctaPrimary}
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
