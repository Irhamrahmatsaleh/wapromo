import Link from "next/link";
import { getDictionary, isValidLocale, defaultLocale } from "../../dictionaries";
import { LanguageSwitcher } from "../../components/LanguageSwitcher";
import { MobileMenu } from "../../components/MobileMenu";
import { HeaderNav } from "../../components/HeaderNav";
import { ScrollHeader } from "../../components/ScrollHeader";
import { AuthRolePicker } from "../../components/AuthRolePicker";
import { HeroInstallButton } from "../../components/HeroInstallButton";

function getInitials(name: string): string {
  if (!name) return "WA";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function Logo({ lang }: { lang: string }) {
  return (
    <Link className="brand" href={`/${lang}#utama`} aria-label="WAPromo" prefetch>
      <span className="brand-mark" aria-hidden="true" />
      <span>WA<span>Promo</span></span>
    </Link>
  );
}

function InboxPreview({ dict }: { dict: ReturnType<typeof getDictionary> }) {
  const p = dict.preview;

  return (
    <div className="preview-container">
      {/* Ambient Emerald Glow */}
      <div className="preview-glow" aria-hidden="true" />

      {/* Floating Pill Top: Live Broadcast Metric */}
      <aside className="floating-pill pill-top" aria-label={p.broadcastBadge || "Broadcast"}>
        <div className="pill-icon blast-pulse" aria-hidden="true">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 11 18-5-5 18-4-7-9-6z"/>
            <path d="M12 13l4-4"/>
          </svg>
        </div>
        <div className="pill-content">
          <div className="pill-header">
            <span className="pill-title">{p.broadcastBadge || "Broadcast"}</span>
            <span className="pill-badge-live">{p.liveBadge || "LIVE"}</span>
          </div>
          <strong className="pill-stat">{p.broadcastStat || "1.450 / 1.450 (99.8%)"}</strong>
          <div className="pill-progress" aria-hidden="true">
            <div className="pill-progress-bar" style={{ width: "99.8%" }} />
          </div>
        </div>
      </aside>

      {/* Floating Pill Bottom: Closed Sale / Order Metric */}
      <aside className="floating-pill pill-bottom" aria-label={p.closingBadge || "Order Closed"}>
        <div className="pill-icon closing-pulse" aria-hidden="true">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="14" x="2" y="5" rx="2"/>
            <line x1="2" x2="22" y1="10" y2="10"/>
          </svg>
        </div>
        <div className="pill-content">
          <span className="pill-title">{p.closingBadge || "Order Closed"} • {p.chatName}</span>
          <div className="pill-amount-row">
            <strong className="pill-stat text-emerald">{p.closingAmount || "Rp 350.000"}</strong>
            <span className="pill-status-tag">{p.closingStatus || "Lunas"}</span>
          </div>
        </div>
      </aside>

      {/* The Product Preview Window */}
      <div className="preview" aria-label={p.title}>
        <div className="browser-bar">
          <div className="browser-dots" aria-hidden="true">
            <i /><i /><i />
          </div>
          <div className="preview-title">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <span>{p.title}</span>
          </div>
          <div className="preview-badge" aria-hidden="true">
            <span className="status-live-dot" />
            <span>Sync</span>
          </div>
        </div>
        <div className="inbox">
          <aside className="inbox-sidebar">
            <div className="inbox-brand" title="Studio Workspace">
              <span className="brand-mark-small" aria-hidden="true" />
            </div>
            <nav className="inbox-nav" aria-label={p.workspace}>
              <div className="side-nav-item side-active" title={p.sideActive.replace(/^●\s*/, "")}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                <span className="nav-label">{p.sideActive.replace(/^●\s*/, "")}</span>
              </div>
              <div className="side-nav-item" title={p.contacts}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                <span className="nav-label">{p.contacts}</span>
              </div>
              <div className="side-nav-item" title={p.broadcast}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m3 11 18-5-5 18-4-7-9-6z"/>
                  <path d="M12 13l4-4"/>
                </svg>
                <span className="nav-label">{p.broadcast}</span>
              </div>
              <div className="side-nav-item" title={p.personal}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 16v-4"/>
                  <path d="M12 8h.01"/>
                </svg>
                <span className="nav-label">{p.personal}</span>
              </div>
            </nav>
          </aside>
          <section className="chats">
            <h3>
              <span>{p.sideActive.replace(/^●\s*/, "")}</span>
              <em>{p.unread}</em>
            </h3>
            <article className="selected">
              <span className="chat-avatar" aria-hidden="true">{getInitials(p.chatName)}</span>
              <div className="chat-info">
                <div className="chat-header-row">
                  <b>{p.chatName}</b>
                  <span className="chat-time">10:48</span>
                </div>
                <p>{p.chatPreview}</p>
              </div>
            </article>
            <article>
              <span className="chat-avatar" aria-hidden="true">{getInitials(p.chat2Name || "Ricky Aditya")}</span>
              <div className="chat-info">
                <div className="chat-header-row">
                  <b>{p.chat2Name || "Ricky Aditya"}</b>
                  <span className="chat-time">10:24</span>
                </div>
                <p>{p.chat2Preview || "Apakah promo masih ada?"}</p>
              </div>
            </article>
            <article>
              <span className="chat-avatar" aria-hidden="true">{getInitials(p.chat3Name || "Sarah Wijaya")}</span>
              <div className="chat-info">
                <div className="chat-header-row">
                  <b>{p.chat3Name || "Sarah Wijaya"}</b>
                  <span className="chat-time">09:45</span>
                </div>
                <p>{p.chat3Preview || "Terima kasih banyak ya!"}</p>
              </div>
            </article>
          </section>
          <section className="conversation">
            <header className="conversation-header">
              <div className="conversation-user">
                <span className="chat-avatar sm" aria-hidden="true">{getInitials(p.chatName)}</span>
                <div>
                  <div className="conversation-name-row">
                    <b>{p.chatName}</b>
                    <span className="lead-tag">{p.leadTag || "Hot Lead 🔥"}</span>
                  </div>
                  <div className="chat-status-row">
                    <small className="chat-status">
                      <span className="status-dot" aria-hidden="true" />
                      {p.chatActive}
                    </small>
                    <span className="status-separator" aria-hidden="true">•</span>
                    <small className="assigned-agent">{p.agentAssigned || "CS Sarah"}</small>
                  </div>
                </div>
              </div>
            </header>
            <div className="messages">
              <div className="message incoming">
                <p>{p.chatIncoming}</p>
                <span className="message-time">10:47</span>
              </div>
              <div className="message outgoing">
                <p>{p.chatOutgoing}</p>
                <span className="message-time">
                  10:48
                  <svg className="double-check" width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M1 5.5L4.5 9L11 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5 5.5L8.5 9L15 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </div>
            <div className="reply-container">
              <div className="quick-reply-pill">
                <span className="quick-reply-dot" aria-hidden="true" />
                <span>{p.quickReply || "Template Promo"}</span>
              </div>
              <div className="reply">
                <span className="reply-placeholder">{p.replyPlaceholder}</span>
                <button type="button" className="reply-button">
                  <span>{p.sendButton}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function NightmareIcon({ index }: { index: number }) {
  switch (index) {
    case 0:
      // CS Bertabrakan / Agent Collision
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <line x1="17" y1="8" x2="23" y2="14" />
          <line x1="23" y1="8" x2="17" y2="14" />
        </svg>
      );
    case 1:
      // Midnight / Pesan Malam Hari Tidak Terbalas (Bulan Sabit Bersih & Mulus)
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      );
    case 2:
      // Beban Biaya Per Pesan yang Mahal / Skyrocketing Tariffs
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          <polyline points="18 4 22 4 22 8" />
          <line x1="22" y1="4" x2="16" y2="10" />
        </svg>
      );
    case 3:
      // Koneksi Terputus & Keranjang Tak Terbaca / Wifi Disconnected (Lengkung Utuh & Rapi)
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M2 8.82a15 15 0 0 1 20 0" />
          <path d="M5 12.5a10 10 0 0 1 14 0" />
          <path d="M8.5 16a5 5 0 0 1 7 0" />
          <circle cx="12" cy="20" r="1" fill="currentColor" />
          <line x1="2" y1="2" x2="22" y2="22" />
        </svg>
      );
    default:
      return <span aria-hidden="true">✕</span>;
  }
}

function EpiphanyIcon({ index }: { index: number }) {
  switch (index) {
    case 0:
      // Penguncian Otomatis Anti-Tabrakan / Smart Atomic Lock
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );
    case 1:
      // Asisten AI Ramah Standby 24 Jam / Single Majestic AI Star
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z" />
        </svg>
      );
    case 2:
      // Kirim Ribuan Pesan Tanpa Biaya Tambahan / Unlimited Free Send Plane
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m22 2-7 20-4-9-9-4Z" />
          <path d="M22 2 11 13" />
        </svg>
      );
    case 3:
      // Sangat Ringan di Semua Perangkat / Instant Zap Speed
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    default:
      return <span aria-hidden="true">✓</span>;
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const safeLang = isValidLocale(lang) ? lang : defaultLocale;
  const dict = getDictionary(safeLang);

  return (
    <main id="utama">
      <ScrollHeader>
        <Logo lang={safeLang} />
        <HeaderNav
          nav={dict.nav}
          theme={dict.theme}
          lang={safeLang}
          currentPath={`/${safeLang}`}
        />
        <div className="header-actions">
          <LanguageSwitcher currentLang={safeLang} ariaLabel={dict.nav.language} />
          <AuthRolePicker mode="login" labels={dict.auth} nav={dict.nav} lang={safeLang} className="header-login" />
          <AuthRolePicker mode="signup" labels={dict.auth} nav={dict.nav} lang={safeLang} className="button compact" />
        </div>
        <MobileMenu lang={safeLang} nav={dict.nav} auth={dict.auth} theme={dict.theme} />
      </ScrollHeader>

      <section className="hero container">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="eyebrow-pulse" aria-hidden="true" />
            <span>{dict.hero.eyebrow.replace(/^●\s*/, "")}</span>
          </p>
          <h1>
            {dict.hero.titleLine1}
            <br />
            {dict.hero.titleLine2}
          </h1>
          <p className="lead">{dict.hero.lead}</p>
          <div className="hero-actions">
            <Link className="button" href={`/${safeLang}/register-as-owner`}>{dict.hero.ctaPrimary}</Link>
            <HeroInstallButton
              lang={safeLang}
              ctaSecondary={dict.hero.ctaSecondary}
              pwa={dict.pwa}
            />
          </div>
          <p className="note">
            <svg className="note-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>{dict.hero.note.replace(/^[✓●]\s*/, "")}</span>
          </p>
        </div>
        <div className="hero-visual">
          <InboxPreview dict={dict} />
        </div>
      </section>

      <section className="metrics-strip container" aria-label="Statistik WAPromo">
        <div className="metrics-grid">
          {dict.metrics.map((metric, i) => (
            <div className="metric-item" key={i}>
              <strong className="metric-value">{metric.value}</strong>
              <span className="metric-label">{metric.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Nightmare Section: Daily Headaches of E-commerce */}
      {dict.nightmare && (
        <section className="nightmare-section container" id="masalah">
          <div className="section-heading centered">
            <p className="eyebrow center-eyebrow danger-eyebrow">
              <span className="eyebrow-danger-pulse" aria-hidden="true" />
              <span>{dict.nightmare.eyebrow.replace(/^●\s*/, "")}</span>
            </p>
            <h2>{dict.nightmare.heading}</h2>
            <p>{dict.nightmare.subheading}</p>
          </div>
          <div className="nightmare-grid">
            {dict.nightmare.items.map((item, idx) => (
              <article className="nightmare-card" key={idx}>
                <div className="nightmare-card-header">
                  <div className="nightmare-icon" aria-hidden="true">
                    <NightmareIcon index={idx} />
                  </div>
                  <span className="nightmare-card-index" aria-hidden="true">
                    0{idx + 1}
                  </span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <div className="nightmare-impact">
                  <span className="nightmare-impact-badge" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  </span>
                  <span className="nightmare-impact-text">{item.impact}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Epiphany Section: Joy & Peace of Mind with WAPromo */}
      {dict.epiphany && (
        <section className="epiphany-section container" id="solusi">
          <div className="section-heading centered">
            <p className="eyebrow center-eyebrow">
              <span className="eyebrow-pulse" aria-hidden="true" />
              <span>{dict.epiphany.eyebrow.replace(/^●\s*/, "")}</span>
            </p>
            <h2>{dict.epiphany.heading}</h2>
            <p>{dict.epiphany.subheading}</p>
          </div>
          <div className="epiphany-grid">
            {dict.epiphany.items.map((item, idx) => (
              <article className="epiphany-card" key={idx}>
                <div className="epiphany-card-header">
                  <div className="epiphany-icon" aria-hidden="true">
                    <EpiphanyIcon index={idx} />
                  </div>
                  <span className="epiphany-card-index" aria-hidden="true">
                    0{idx + 1}
                  </span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <div className="epiphany-benefit">
                  <span className="epiphany-benefit-badge" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="epiphany-benefit-text">{item.benefit}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Head-to-Head Comparison: Old Way vs New Way */}
      <section className="comparison-section container" id="cara-kerja">
        <div className="section-heading centered">
          <p className="eyebrow center-eyebrow">
            <span className="eyebrow-pulse" aria-hidden="true" />
            <span>{dict.comparison.eyebrow}</span>
          </p>
          <h2>{dict.comparison.heading}</h2>
          <p>{dict.comparison.subheading}</p>
        </div>
        <div className="comparison-grid">
          <div className="comparison-card old-way">
            {dict.comparison.oldWayBadge && (
              <div className="comparison-badge-ribbon old-ribbon">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <span>{dict.comparison.oldWayBadge}</span>
              </div>
            )}
            <div className="comparison-card-header">
              <span className="comparison-badge old-badge" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </span>
              <h3>{dict.comparison.oldWayTitle}</h3>
            </div>
            <ul className="comparison-list">
              {dict.comparison.oldWayItems.map((item, idx) => {
                const hasColon = item.includes(":");
                const [lead, ...rest] = hasColon ? item.split(":") : [item];
                return (
                  <li key={idx}>
                    <span className="list-icon-cross" aria-hidden="true">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </span>
                    <span className="comparison-item-text">
                      {hasColon ? (
                        <>
                          <strong className="comparison-item-lead">{lead}:</strong> {rest.join(":")}
                        </>
                      ) : (
                        item
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="comparison-card new-way">
            {dict.comparison.recommendedBadge && (
              <div className="comparison-badge-ribbon new-ribbon">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <span>{dict.comparison.recommendedBadge}</span>
              </div>
            )}
            <div className="comparison-card-header">
              <span className="comparison-badge new-badge" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <h3>{dict.comparison.newWayTitle}</h3>
            </div>
            <ul className="comparison-list">
              {dict.comparison.newWayItems.map((item, idx) => {
                const hasColon = item.includes(":");
                const [lead, ...rest] = hasColon ? item.split(":") : [item];
                return (
                  <li key={idx}>
                    <span className="list-icon-check" aria-hidden="true">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="comparison-item-text">
                      {hasColon ? (
                        <>
                          <strong className="comparison-item-lead">{lead}:</strong> {rest.join(":")}
                        </>
                      ) : (
                        item
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* Savings Calculator Section */}
      {dict.savings && (
        <section className="savings-calculator-section container" id="simulasi-hemat">
          <div className="section-heading centered">
            <p className="eyebrow center-eyebrow">
              <span className="eyebrow-pulse" aria-hidden="true" />
              <span>{dict.savings.eyebrow.replace(/^●\s*/, "")}</span>
            </p>
            <h2>{dict.savings.heading}</h2>
            <p>{dict.savings.subheading}</p>
          </div>
          <div className="savings-box">
            <div className="savings-compare-row">
              <div className="savings-col traditional">
                <span className="savings-tag">{dict.savings.traditionalTag || "Tradisional / BSP"}</span>
                <strong className="savings-amount">{dict.savings.traditionalCost}</strong>
                <span className="savings-label">{dict.savings.traditionalLabel}</span>
              </div>
              <div className="savings-col wapromo">
                <span className="savings-tag">{dict.savings.wapromoTag || "WAPromo Pro"}</span>
                <strong className="savings-amount">{dict.savings.wapromoCost}</strong>
                <span className="savings-label">{dict.savings.wapromoLabel}</span>
              </div>
            </div>
            <div className="savings-callout">
              <div className="difference-badge">
                <span className="difference-check-icon" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className="difference-badge-text">{dict.savings.differenceText}</span>
              </div>
              <div className="savings-note-wrapper">
                <span className="savings-note-icon" aria-hidden="true">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                    <path d="M9 18h6" />
                    <path d="M10 22h4" />
                  </svg>
                </span>
                <span className="savings-note-text">{dict.savings.note}</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Pillars Teaser Section: Linking to Sub-Pages */}
      {dict.pillarsTeaser && (
        <section className="pillars-teaser-section container">
          <div className="section-heading centered">
            <p className="eyebrow center-eyebrow">
              <span className="eyebrow-pulse" aria-hidden="true" />
              <span>{dict.pillarsTeaser.eyebrow.replace(/^●\s*/, "")}</span>
            </p>
            <h2>{dict.pillarsTeaser.heading}</h2>
            <p>{dict.pillarsTeaser.subheading}</p>
          </div>
          <div className="pillars-teaser-grid">
            {dict.pillarsTeaser.items.map((item, idx) => (
              <article className="pillar-teaser-card" key={idx}>
                <div className="pillar-teaser-header">
                  <div className="pillar-teaser-icon" aria-hidden="true">
                    {idx === 0 && (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 2 7 12 12 22 7 12 2" />
                        <polyline points="2 17 12 22 22 17" />
                        <polyline points="2 12 12 17 22 12" />
                      </svg>
                    )}
                    {idx === 1 && (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                    )}
                    {idx === 2 && (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                      </svg>
                    )}
                  </div>
                  <span className="pillar-teaser-index" aria-hidden="true">0{idx + 1}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <Link className="button secondary pillar-teaser-btn" href={`/${safeLang}${item.href}`}>
                  <span>{item.action}</span>
                  <span className="action-arrow" aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="cta-banner-section container" id="mulai">
        <div className="cta-banner-card">
          <h2>{dict.ctaBanner.heading}</h2>
          <p className="cta-banner-sub">{dict.ctaBanner.subheading}</p>
          <div className="cta-banner-actions">
            <Link className="button large cta-banner-btn" href={`/${safeLang}/register-as-owner`}>
              <span>{dict.ctaBanner.button}</span>
              <span className="action-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="cta-banner-perks">
            {dict.ctaBanner.note
              .replace(/^[✓●]\s*/, "")
              .split(/\s*·\s*/)
              .filter(Boolean)
              .map((perk, idx) => (
                <div className="cta-perk-pill" key={idx}>
                  <span className="cta-perk-check" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="cta-perk-text">{perk}</span>
                </div>
              ))}
          </div>
        </div>
      </section>

      <footer className="site-footer container">
        <div className="footer-brand-col">
          <Logo lang={safeLang} />
          <p className="footer-tagline">{dict.footer.tagline}</p>
        </div>
        <nav className="footer-nav" aria-label={dict.nav.menu}>
          <Link href={`/${safeLang}/bantuan`}>{dict.nav.help}</Link>
          <Link href={`/${safeLang}/blog`}>{dict.nav.blog}</Link>
          <Link href={`/${safeLang}/ebook`}>{dict.nav.ebook}</Link>
        </nav>
      </footer>
    </main>
  );
}
