import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, isValidLocale, defaultLocale, locales } from "../../../../dictionaries";
import { ThemeSwitcher } from "../../../../components/ThemeSwitcher";
import { getArticleData } from "./articleData";

interface PageProps {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  for (const lang of locales) {
    const dict = getDictionary(lang);
    if (dict.blogPage?.articles) {
      for (const art of dict.blogPage.articles) {
        params.push({ lang, slug: art.slug });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const safeLang = isValidLocale(lang) ? lang : defaultLocale;
  const dict = getDictionary(safeLang);
  const article = getArticleData(safeLang, slug);

  if (!article) {
    return {
      title: `Blog | WAPromo`,
    };
  }

  const title = `${article.title} | WAPromo`;
  const description = article.lead;
  const canonicalUrl = `https://wapromo.id/${safeLang}/blog/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        id: `https://wapromo.id/id/blog/${slug}`,
        en: `https://wapromo.id/en/blog/${slug}`,
        pt: `https://wapromo.id/pt/blog/${slug}`,
        es: `https://wapromo.id/es/blog/${slug}`,
        ar: `https://wapromo.id/ar/blog/${slug}`,
        "x-default": `https://wapromo.id/en/blog/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "WAPromo",
      locale: safeLang,
      type: "article",
      images: [
        {
          url: `https://wapromo.id${article.image}`,
          width: 800,
          height: 533,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`https://wapromo.id${article.image}`],
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { lang, slug } = await params;
  const safeLang = isValidLocale(lang) ? lang : defaultLocale;
  const dict = getDictionary(safeLang);
  const article = getArticleData(safeLang, slug);

  if (!article) {
    notFound();
  }

  const backLabel =
    dict.blogPage?.backToBlog ||
    (safeLang === "id"
      ? "Kembali ke Blog"
      : safeLang === "en"
      ? "Back to Blog"
      : safeLang === "pt"
      ? "Voltar ao Blog"
      : safeLang === "es"
      ? "Volver al Blog"
      : "العودة إلى المدونة");

  return (
    <article className="blog-detail-page">
      {/* Top Editorial Bar (NO MAIN NAVBAR, strictly clean back button & theme toggle) */}
      <nav className="blog-detail-topbar container" aria-label="Navigasi Artikel">
        <Link href={`/${safeLang}/blog`} className="blog-back-btn" prefetch>
          <span className="blog-back-arrow" aria-hidden="true">
            ←
          </span>
          <span>{backLabel}</span>
        </Link>
        <div className="blog-topbar-actions">
          <ThemeSwitcher labels={dict.theme} />
        </div>
      </nav>

      {/* Article Header */}
      <header className="blog-detail-header container">
        <div className="blog-detail-tag-row">
          <span className="article-tag">{article.category}</span>
          <span className="article-time">{article.readTime}</span>
        </div>
        <h1 className="blog-detail-h1">{article.title}</h1>
        <p className="blog-detail-lead">{article.lead}</p>
        <div className="blog-detail-author-row">
          <div className="blog-author-avatar" aria-hidden="true">
            WA
          </div>
          <div className="blog-author-info">
            <span className="blog-author-name">WAPromo Strategy Lab</span>
            <span className="blog-author-meta">
              {article.date} · {article.readTime}
            </span>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="blog-hero-image-wrap container">
        <img
          src={article.image}
          alt={article.title}
          className="blog-hero-image"
          width="800"
          height="533"
          loading="eager"
        />
      </div>

      {/* Article Content Body */}
      <div className="blog-article-content container">
        {article.sections.map((section, sIdx) => (
          <section key={section.title || sIdx}>
            {section.title && <h2>{section.title}</h2>}
            {section.paragraphs.map((p, pIdx) => (
              <p key={pIdx}>{p}</p>
            ))}

            {/* Mid-article Quote callout after section 1 */}
            {sIdx === 0 && article.quote && (
              <blockquote className="blog-highlight-quote">
                <p>"{article.quote}"</p>
              </blockquote>
            )}
          </section>
        ))}

        {/* Key Takeaways Box */}
        {article.keyTakeaways && article.keyTakeaways.length > 0 && (
          <aside className="blog-key-takeaways" aria-label="Poin Kunci">
            <h3 className="blog-takeaways-title">
              {safeLang === "id"
                ? "Poin Kunci & Manfaat Langsung:"
                : safeLang === "en"
                ? "Key Takeaways & Core Benefits:"
                : safeLang === "pt"
                ? "Principais Pontos e Benefícios:"
                : safeLang === "es"
                ? "Puntos Clave y Beneficios:"
                : "النقاط الرئيسية والفوائد المباشرة:"}
            </h3>
            <ul className="blog-takeaways-list">
              {article.keyTakeaways.map((item, idx) => (
                <li key={idx}>
                  <span className="blog-takeaway-check" aria-hidden="true">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        )}

        {/* Real-world Case Study Card */}
        {article.caseStudyStory && (
          <section className="blog-case-card" aria-label="Studi Kasus">
            <h3 className="blog-case-card-title">
              <span aria-hidden="true">★</span>
              <span>{article.caseStudyTitle}</span>
            </h3>
            <p>{article.caseStudyStory}</p>
          </section>
        )}

        {/* Cheerful Bottom CTA */}
        <section className="blog-cta-bottom">
          <h3>{article.ctaHeading}</h3>
          <p>{article.ctaSubheading}</p>
          <Link className="button large" href={`/${safeLang}/register-as-owner`}>
            {article.ctaButton}
          </Link>
        </section>
      </div>

      {/* Clean Bottom Footer */}
      <footer className="footer container" style={{ marginTop: "60px" }}>
        <p>{dict.footer.tagline}</p>
      </footer>
    </article>
  );
}
