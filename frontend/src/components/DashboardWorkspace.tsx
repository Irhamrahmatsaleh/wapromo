"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { DashboardPageData, Locale } from "../dictionaries/types";

interface DemoAccount {
  ownerName: string;
  businessName: string;
  email: string;
}

interface DashboardWorkspaceProps {
  page: DashboardPageData;
  lang: Locale;
  accountDefaults: DemoAccount;
}

type WorkspaceIconName = "overview" | "inbox" | "contacts" | "broadcasts" | "team" | "settings" | "search" | "arrow" | "close" | "maximize" | "minimize" | "collapseHistory" | "expandHistory" | "campaign" | "promoAI" | "automation" | "commerce" | "ads" | "analytics" | "channel" | "connector" | "developer" | "collapse" | "academy" | "calendar" | "bell" | "user" | "whatsapp" | "instagram" | "messenger" | "call" | "webchat" | "chevronDown" | "more" | "timer" | "phone" | "chat" | "sparkles" | "book" | "paperclip" | "microphone" | "smile" | "image" | "quickReply" | "collapseInbox" | "agentPanel";

const workspaceIcons: Record<WorkspaceIconName, string> = {
  overview: "M3 3h7v7H3z M14 3h7v5h-7z M14 12h7v9h-7z M3 14h7v7H3z",
  inbox: "M4 4h16v16H4z M4 13h4l2 3h4l2-3h4",
  contacts: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m8-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm12 10v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  broadcasts: "M4 19V5m0 14h17M7 15l4-4 3 2 6-7",
  team: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0-5v2m0 14v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M3 12h2m14 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42",
  settings: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0-5v2m0 14v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M3 12h2m14 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42",
  search: "M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm10 2-4.35-4.35",
  arrow: "M5 12h14m-6-6 6 6-6 6",
  close: "M18 6 6 18M6 6l12 12",
  maximize: "M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M3 16v3a2 2 0 0 0 2 2h3M21 16v3a2 2 0 0 1-2 2h-3",
  minimize: "M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3m13-5h-3a2 2 0 0 0-2 2v3",
  collapseHistory: "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm4 0v18m8-12-3 3 3 3",
  expandHistory: "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm4 0v18m5-12 3 3-3 3",
  campaign: "M3 11v2h3l7 4V7l-7 4H3zm10-4 5-2v12l-5-2m-6-4 1.5 6a2 2 0 0 0 2 1.5h.5",
  promoAI: "M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3zm7 13 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16z",
  automation: "M12 3v4m0 10v4m9-9h-4M7 12H3m15.36-6.36-2.83 2.83m-7.06 7.06-2.83 2.83m12.72 0-2.83-2.83m-7.06-7.06L5.64 5.64M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  commerce: "M3 3h2l2.2 11.1a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 1.9-1.4L22 7H6m4 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z",
  ads: "M5 3l14 9-7 1-3 7L5 3zm9 12 5 6",
  analytics: "M12 3v9h9A9 9 0 1 1 12 3zm3-1a9 9 0 0 1 8 8h-8V2z",
  channel: "M6 6h.01M18 6h.01M12 18h.01M6 6l6 12 6-12M6 6h12",
  connector: "M8 7V3m8 4V3M7 7h10v4a5 5 0 0 1-10 0V7zm5 9v5m-4 0h8",
  developer: "m8 8-4 4 4 4m8-8 4 4-4 4m-3-11-2 14",
  collapse: "M15 4v16M10 9l-3 3 3 3",
  academy: "M3 5.5A2.5 2.5 0 0 1 5.5 3H20v17H5.5A2.5 2.5 0 0 1 3 17.5v-12zM3 16a2.5 2.5 0 0 1 2.5-2.5H20",
  calendar: "M8 3v4m8-4v4M4 9h16M5 5h14a1 1 0 0 1 1 1v13H4V6a1 1 0 0 1 1-1zM8 13h3m-3 4h3m3-4h2",
  bell: "M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-8 12h4",
  user: "M20 21a8 8 0 0 0-16 0m8-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  whatsapp: "M20.5 11.6a8.5 8.5 0 0 1-12.6 7.5L3 20l.9-4.7a8.5 8.5 0 1 1 16.6-3.7zM8 7.5c.3-.6.7-.5 1-.5h.5c.2 0 .4.1.5.4l.8 1.8c.1.2.1.4 0 .6l-.6.8c-.2.2-.2.4 0 .7.5.8 1.2 1.5 2 2 .3.2.5.2.7 0l.9-1c.2-.2.4-.2.6-.1l1.8.9c.3.1.4.3.4.5 0 .4-.2 1-.6 1.4-.5.5-1.3.8-2.1.7-1.1-.1-2.5-.7-4.1-2.1-1.9-1.7-2.7-3.4-2.9-4.5-.2-.8.1-1.6.6-2.2z",
  instagram: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm5.5-1h.01",
  messenger: "M12 3a9 9 0 0 0-7.5 14l-.8 4 4.1-1A9 9 0 1 0 12 3zm-4 11 3-4 2.5 2 3.5-2-3 4-2.5-2-3.5 2z",
  call: "M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a14 14 0 0 1-6-6l2-2-2-5z",
  webchat: "M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8A8.5 8.5 0 0 1 8.7 3.9a8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z",
  chevronDown: "m6 9 6 6 6-6",
  more: "M12 5h.01M12 12h.01M12 19h.01",
  timer: "M10 2h4m-2 3v7l4 2m4-2a8 8 0 1 1-16 0 8 8 0 0 1 16 0z",
  phone: "M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a14 14 0 0 1-6-6l2-2-2-5z",
  chat: "M21 11.5a8.5 8.5 0 0 1-8.5 8.5 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8A8.5 8.5 0 0 1 12.5 3h.5a8.5 8.5 0 0 1 8 8z",
  sparkles: "m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3zm7 12 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15zM4 3l.6 1.4L6 5l-1.4.6L4 7l-.6-1.4L2 5l1.4-.6L4 3z",
  book: "M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18H6.5A2.5 2.5 0 0 1 4 17.5v-13zM4 16h16M8 6h8m-8 4h8",
  paperclip: "m21 11.5-8.7 8.7a5 5 0 0 1-7.1-7.1l9.2-9.2a3.3 3.3 0 0 1 4.7 4.7l-9.2 9.2a1.7 1.7 0 0 1-2.4-2.4l8.5-8.5",
  microphone: "M12 15a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v7a3 3 0 0 0 3 3zm7-3a7 7 0 0 1-14 0m7 7v3m-4 0h8",
  smile: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm-3-12h.01M15 10h.01M8 14a4 4 0 0 0 8 0",
  image: "M4 4h16v16H4zM4 16l5-5 4 4 3-3 4 4m-9-7h.01",
  quickReply: "M4 5h16v12H9l-5 4V5zm4 4h8m-8 4h5",
  collapseInbox: "M2 7C2 5.34315 3.34315 4 5 4H15C16.6569 4 18 5.34315 18 7V14C18 15.6569 16.6569 17 15 17H5C3.34315 17 2 15.6569 2 14V7ZM8.5 5V16H15C16.1046 16 17 15.1046 17 14V7C17 5.89543 16.1046 5 15 5H8.5ZM7.5 5H5C3.89543 5 3 5.89543 3 7V14C3 15.1046 3.89543 16 5 16H7.5V5Z",
  agentPanel: "M3 3h10v18H3zM13 3h8v18h-8zM13 3h8v18h-8z",
};

function WorkspaceIcon({ name }: { name: WorkspaceIconName }) {
  const isInboxCollapseIcon = name === "collapseInbox";

  return (
    <svg viewBox={isInboxCollapseIcon ? "0 0 20 20" : "0 0 24 24"} aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d={workspaceIcons[name]} fill={isInboxCollapseIcon ? "currentColor" : "none"} stroke={isInboxCollapseIcon ? "none" : "currentColor"} />
    </svg>
  );
}

function initialsFor(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] ?? "")
    .join("")
    .toUpperCase();
}

export function DashboardWorkspace({ page, lang, accountDefaults }: DashboardWorkspaceProps) {
  const [account, setAccount] = useState(accountDefaults);
  const [search, setSearch] = useState("");
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState("all");
  const [selectedFolder, setSelectedFolder] = useState("active");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [activeThreadTab, setActiveThreadTab] = useState("messages");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mobileInboxOpen, setMobileInboxOpen] = useState(true);
  const [resolved, setResolved] = useState(false);
  const [noteMode, setNoteMode] = useState(false);
  const [draft, setDraft] = useState("");
  const [sentMessages, setSentMessages] = useState<{ text: string; isNote: boolean }[]>([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [inboxNavigationCollapsed, setInboxNavigationCollapsed] = useState(false);
  const [promoAiOpen, setPromoAiOpen] = useState(false);
  const [promoAiMaximized, setPromoAiMaximized] = useState(false);
  const [promoAiTab, setPromoAiTab] = useState<"ask" | "agents">("ask");
  const [promoAiHistoryCollapsed, setPromoAiHistoryCollapsed] = useState(false);
  const [usedPromoAgents, setUsedPromoAgents] = useState<string[]>([]);
  const [showAllPromoAgents, setShowAllPromoAgents] = useState(false);
  const [promoAiContextOpen, setPromoAiContextOpen] = useState(true);
  const [expandedSidebarGroups, setExpandedSidebarGroups] = useState({
    channels: false,
    watiAI: false,
    connectors: false,
    settings: true,
  });

  useEffect(() => {
    try {
      const saved = window.sessionStorage.getItem("wapromo-demo-account");
      if (!saved) return;
      const parsed = JSON.parse(saved) as Partial<DemoAccount>;
      setAccount({
        ownerName: parsed.ownerName || accountDefaults.ownerName,
        businessName: parsed.businessName || accountDefaults.businessName,
        email: parsed.email || accountDefaults.email,
      });
    } catch {}
  }, [accountDefaults]);

  const navigation = [
    { label: page.navOverview, href: "#overview", icon: "overview" as const },
    { label: page.navInbox, href: "#inbox", icon: "inbox" as const },
    { label: page.navContacts, href: "#details", icon: "contacts" as const },
    { label: page.navCampaigns, href: "#order-card", icon: "broadcasts" as const },
    { label: page.navTeam, href: "#assigned-agent", icon: "team" as const },
    { label: page.navSettings, href: "#details", icon: "settings" as const },
  ];
  const sidebarLinks = [
    { key: "campaign", label: page.sidebar.campaign, href: "#order-card", icon: "campaign" as const },
    { key: "teamInbox", label: page.sidebar.teamInbox, href: "#inbox", icon: "inbox" as const, active: true },
    { key: "contacts", label: page.sidebar.contacts, href: "#details", icon: "contacts" as const },
    { key: "promoAI", label: page.sidebar.promoAI, href: "#promoai-panel", icon: "promoAI" as const, accent: true },
    { key: "automation", label: page.sidebar.automation, href: "#latest-activity", icon: "automation" as const },
    { key: "commerce", label: page.sidebar.commerce, href: "#order-card", icon: "commerce" as const },
    { key: "ads", label: page.sidebar.ads, href: "#order-card", icon: "ads" as const },
    { key: "analytics", label: page.sidebar.analytics, href: "#overview", icon: "analytics" as const },
    { key: "developers", label: page.sidebar.developers, href: "#connected-whatsapp", icon: "developer" as const },
  ];
  const sidebarGroups = [
    { key: "channels" as const, label: page.sidebar.channels, icon: "channel" as const, children: page.sidebar.channelChildren, hrefs: ["#inbox", "#inbox"] },
    { key: "watiAI" as const, label: page.sidebar.watiAI, icon: "promoAI" as const, children: page.sidebar.watiAIChildren, hrefs: ["#promoai-panel", "#promoai-panel"] },
    { key: "connectors" as const, label: page.sidebar.connectors, icon: "connector" as const, children: page.sidebar.connectorChildren, hrefs: ["#connected-whatsapp", "#connected-whatsapp"] },
    { key: "settings" as const, label: page.sidebar.settings, icon: "settings" as const, children: [page.sidebar.users, page.sidebar.accountDetails], hrefs: ["#assigned-agent", "#details"] },
  ];
  const selectedConversation = page.conversations[selectedIndex] ?? page.conversations[0];
  const visibleConversations = page.conversations.filter((conversation) => {
    const matchesSearch = `${conversation.name} ${conversation.preview} ${conversation.category}`
      .toLocaleLowerCase(lang)
      .includes(search.toLocaleLowerCase(lang));
    const matchesChannel = selectedChannel === "all" || conversation.channel === selectedChannel;
    const matchesFolder = selectedFolder === "all" || selectedFolder === "active" || selectedFolder === "assigned" || (selectedFolder === "pending" && conversation.unread > 0);
    const matchesStatus = selectedStatus === "all" || selectedStatus === "open" || ((selectedStatus === "unread" || selectedStatus === "pending") && conversation.unread > 0);
    return matchesSearch && matchesChannel && matchesFolder && matchesStatus && (!unreadOnly || conversation.unread > 0);
  });
  const outgoingMessage = page.thread.outgoingMessage.replaceAll("Nadia", selectedConversation.name);
  const suggestedPromoAgents = [
    { name: "Team Reply Cost Saver", description: page.thread.assistantDescription, color: "blue", shape: "round" },
    { name: "Inbox Triage", description: "Sort and prioritize the conversations that need attention.", color: "mint", shape: "soft" },
    { name: "Watch open conversations", description: "1 conversation currently open", color: "coral", shape: "round" },
    { name: "Watch today's active contacts", description: "1 contact active in the last 24 hours", color: "violet", shape: "soft" },
    { name: "Top Topics", description: "Find the topics customers discuss most this week.", color: "gold", shape: "round" },
    { name: "Spam Watcher", description: "Read live conversations and classify spam, ads and noise.", color: "mint", shape: "soft" },
    { name: "Ready-to-Buy", description: "Identify high-intent buyers and contacts ready to convert.", color: "coral", shape: "round" },
    { name: "Automation Health Check", description: "Find broken references and gaps in automation flows.", color: "violet", shape: "soft" },
    { name: "Campaign Readiness Checker", description: "Review templates and campaigns before they go live.", color: "gold", shape: "round" },
    { name: "Segment & Contact Checker", description: "Find duplicate, outdated, or underused contact segments.", color: "mint", shape: "soft" },
  ];
  const followupMessage = page.thread.followupMessage.replaceAll("Nadia", selectedConversation.name);

  const selectConversation = (index: number) => {
    setSelectedIndex(index);
    setResolved(false);
    setActiveThreadTab("messages");
    setSentMessages([]);
    setMobileInboxOpen(false);
  };

  const handleSend = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setSentMessages((current) => [...current, { text, isNote: noteMode }]);
    setDraft("");
  };

  return (
    <main className={[
      "dashboard-app",
      "dashboard-inbox-app",
      mobileInboxOpen && "is-mobile-inbox",
      promoAiOpen && "is-promo-ai-open",
      sidebarCollapsed && "is-sidebar-collapsed",
      inboxNavigationCollapsed && "is-inbox-navigation-collapsed",
    ].filter(Boolean).join(" ")}>
      <header className="dashboard-topbar" id="overview">
        <Link className="dashboard-brand" href={`/${lang}`} translate="no">
          <span className="brand-mark" aria-hidden="true" />
          <span>WA<span>Promo</span></span>
        </Link>
        <form className="dashboard-global-search" onSubmit={(event) => event.preventDefault()}>
          <button
            className="dashboard-ai-brand"
            type="button"
            title={page.thread.assistantTitle}
            aria-label={page.thread.assistantTitle}
            aria-expanded={promoAiOpen}
            onClick={() => setPromoAiOpen((current) => !current)}
          >
            <WorkspaceIcon name="sparkles" />
            <strong>{page.thread.assistantTitle}</strong>
          </button>
          <span className="dashboard-search-divider" aria-hidden="true" />
          <label className="dashboard-search">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={page.searchPlaceholder}
              aria-label={page.searchPlaceholder}
            />
          </label>
          <button
            className={`dashboard-agent-panel-button ${promoAiOpen ? "is-active" : ""}`}
            type="button"
            title={page.thread.assistantTitle}
            aria-label={page.thread.assistantTitle}
            aria-expanded={promoAiOpen}
            onClick={() => setPromoAiOpen((current) => !current)}
          >
            <WorkspaceIcon name="agentPanel" />
          </button>
        </form>
        <div className="dashboard-topbar-actions">
          <a className="dashboard-header-settings" href="#details"><span>{page.sidebar.settings}</span><b>0/8</b></a>
          <a className="dashboard-schedule-demo" href="#connected-whatsapp"><WorkspaceIcon name="calendar" />{page.scheduleDemo}</a>
          <button className="dashboard-icon-button" type="button" title={page.thread.latestActivity} aria-label={page.thread.latestActivity}><WorkspaceIcon name="bell" /></button>
          <button className="dashboard-profile-button" type="button" title={page.profileLabel} aria-label={page.profileLabel}><WorkspaceIcon name="user" /></button>
        </div>
      </header>
      <aside className="dashboard-sidebar" aria-label={page.workspace}>
        <nav className="dashboard-sidebar-menu" aria-label={page.sidebar.teamInbox}>
          {sidebarLinks.slice(0, 8).map((item) => (
            <a key={item.key} className={`dashboard-side-item ${item.active ? "is-active" : ""} ${item.accent ? "has-accent" : ""}`} href={item.href} aria-current={item.active ? "page" : undefined} title={item.label}>
              <WorkspaceIcon name={item.icon} />
              <span>{item.label}</span>
            </a>
          ))}
          {sidebarGroups.slice(0, 3).map((group) => (
            <div className={`dashboard-side-group dashboard-side-group-${group.key}`} key={group.key}>
              <button
                className={`dashboard-side-item dashboard-side-group-toggle ${expandedSidebarGroups[group.key] ? "is-expanded" : ""}`}
                type="button"
                aria-expanded={expandedSidebarGroups[group.key]}
                title={group.label}
                onClick={() => setExpandedSidebarGroups((current) => ({ ...current, [group.key]: !current[group.key] }))}
              >
                <WorkspaceIcon name={group.icon} /><span>{group.label}</span><span className="dashboard-side-chevron" aria-hidden="true" />
              </button>
              {expandedSidebarGroups[group.key] && (
                <div className="dashboard-side-submenu">
                  {group.children.map((child, index) => <a href={group.hrefs[index]} key={child}>{child}</a>)}
                </div>
              )}
            </div>
          ))}
          <a className="dashboard-side-item" href={sidebarLinks[8].href} title={sidebarLinks[8].label}>
            <WorkspaceIcon name={sidebarLinks[8].icon} /><span>{sidebarLinks[8].label}</span>
          </a>
          {sidebarGroups.slice(3).map((group) => (
            <div className={`dashboard-side-group dashboard-side-group-${group.key}`} key={group.key}>
              <button
                className={`dashboard-side-item dashboard-side-group-toggle ${expandedSidebarGroups[group.key] ? "is-expanded" : ""}`}
                type="button"
                aria-expanded={expandedSidebarGroups[group.key]}
                title={group.label}
                onClick={() => setExpandedSidebarGroups((current) => ({ ...current, [group.key]: !current[group.key] }))}
              >
                <WorkspaceIcon name={group.icon} /><span>{group.label}</span><span className="dashboard-side-chevron" aria-hidden="true" />
              </button>
              {expandedSidebarGroups[group.key] && (
                <div className="dashboard-side-submenu">
                  {group.children.map((child, index) => <a href={group.hrefs[index]} key={child}>{child}</a>)}
                </div>
              )}
            </div>
          ))}
          <div className="dashboard-sidebar-spacer" />
          <a className="dashboard-side-item dashboard-academy-link" href="#latest-activity" title={page.sidebar.academy}>
            <WorkspaceIcon name="academy" /><span>{page.sidebar.academy}</span>
          </a>
          <button className="dashboard-side-item dashboard-collapse-button" type="button" title={sidebarCollapsed ? page.sidebar.expand : page.sidebar.collapse} aria-label={sidebarCollapsed ? page.sidebar.expand : page.sidebar.collapse} onClick={() => setSidebarCollapsed((current) => !current)}>
            <WorkspaceIcon name="collapse" /><span>{page.sidebar.collapse}</span>
          </button>
        </nav>
      </aside>

      <div className="dashboard-main">
        <div className="dashboard-inbox-workspace">
          <aside className="dashboard-inbox-navigation" id="dashboard-inbox-navigation" aria-label={page.inboxTitle}>
            <header className="dashboard-inbox-navigation-heading">
              <h1>{page.sidebar.teamInbox}</h1>
              <button className="dashboard-icon-button" type="button" title={page.sidebar.settings} aria-label={page.sidebar.settings}><WorkspaceIcon name="settings" /></button>
            </header>
            <section className="dashboard-channel-filters" aria-label={page.channelsLabel}>
              <h2>{page.channelsLabel}</h2>
              <button
                type="button"
                className={selectedChannel === "all" ? "is-active" : ""}
                aria-pressed={selectedChannel === "all"}
                onClick={() => setSelectedChannel("all")}
              >
                <WorkspaceIcon name="channel" />
                <span>{page.allChannels}</span>
                <small>{page.conversations.length}</small>
              </button>
              {page.channelFilters.map((channel) => (
                <button
                  key={channel.id}
                  type="button"
                  className={selectedChannel === channel.id ? "is-active" : ""}
                  aria-pressed={selectedChannel === channel.id}
                  onClick={() => setSelectedChannel(channel.id)}
                >
                  <WorkspaceIcon name={channel.id === "whatsapp" ? "whatsapp" : channel.id === "instagram" ? "instagram" : channel.id === "messenger" ? "messenger" : channel.id === "whatsapp-calls" ? "call" : "webchat"} />
                  <span>{channel.label}</span>
                  <small>{page.conversations.filter((conversation) => conversation.channel === channel.id).length}</small>
                </button>
              ))}
            </section>
            <nav className="dashboard-inbox-folders" aria-label={page.inboxTitle}>
              <h2>{page.inboxFolders[0].label}</h2>
              {page.inboxFolders.slice(1).map((folder) => (
                <button
                  key={folder.id}
                  type="button"
                  className={selectedFolder === folder.id ? "is-active" : ""}
                  aria-pressed={selectedFolder === folder.id}
                  onClick={() => {
                    setSelectedFolder(folder.id);
                    setSelectedStatus("all");
                    setUnreadOnly(false);
                  }}
                >
                  {folder.label}
                </button>
              ))}
            </nav>
          </aside>

          <section className="dashboard-inbox-list-pane" aria-label={page.inboxTitle} id="inbox">
            <div className="dashboard-inbox-pane-heading">
              <button
                className="dashboard-collapse-inbox-navigation"
                type="button"
                title={inboxNavigationCollapsed ? page.sidebar.expandInbox : page.sidebar.collapseInbox}
                aria-label={inboxNavigationCollapsed ? page.sidebar.expandInbox : page.sidebar.collapseInbox}
                aria-expanded={!inboxNavigationCollapsed}
                aria-controls="dashboard-inbox-navigation"
                onClick={() => setInboxNavigationCollapsed((collapsed) => !collapsed)}
              >
                <WorkspaceIcon name="collapseInbox" />
              </button>
              <div>
                <h1>{page.activeConversationsLabel}</h1>
                <p>{visibleConversations.length} {page.conversationCountLabel} · {page.conversations.filter((conversation) => conversation.unread > 0).length} {page.filterUnread}</p>
              </div>
              <label className="dashboard-inbox-search">
                <WorkspaceIcon name="search" />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={page.searchPlaceholder}
                  aria-label={page.searchPlaceholder}
                />
              </label>
              <button
                className="dashboard-new-conversation"
                type="button"
                title={page.viewAll}
                aria-label={page.viewAll}
                onClick={() => {
                  setSelectedFolder("all");
                  setUnreadOnly(false);
                  setSelectedStatus("all");
                }}
              ><WorkspaceIcon name="more" /></button>
            </div>
            <div className="dashboard-inbox-tabs" role="group" aria-label={page.inboxTitle}>
              <button type="button" className={selectedStatus === "all" ? "is-active" : ""} aria-pressed={selectedStatus === "all"} onClick={() => { setSelectedStatus("all"); setUnreadOnly(false); }}>
                {page.filterAll}<span>{page.conversations.filter((conversation) => selectedChannel === "all" || conversation.channel === selectedChannel).length}</span>
              </button>
              <button type="button" className={selectedStatus === "open" ? "is-active" : ""} aria-pressed={selectedStatus === "open"} onClick={() => { setSelectedStatus("open"); setUnreadOnly(false); }}>
                {page.filterOpen}
              </button>
              <button type="button" className={selectedStatus === "unread" ? "is-active" : ""} aria-pressed={selectedStatus === "unread"} onClick={() => { setSelectedStatus("unread"); setUnreadOnly(false); }}>
                {page.filterUnread}<span>{page.conversations.filter((conversation) => conversation.unread > 0 && (selectedChannel === "all" || conversation.channel === selectedChannel)).length}</span>
              </button>
              <button type="button" className={selectedStatus === "pending" ? "is-active" : ""} aria-pressed={selectedStatus === "pending"} onClick={() => { setSelectedStatus("pending"); setUnreadOnly(false); }}>
                {page.filterPending}
              </button>
            </div>
            <div className="dashboard-open-label"><span className="dashboard-online-dot" />{page.metrics[0]}<span>{visibleConversations.length}</span></div>
            <div className="dashboard-conversation-list">
              {visibleConversations.length ? visibleConversations.map((conversation) => {
                const originalIndex = page.conversations.indexOf(conversation);
                return (
                  <button
                    className={`dashboard-conversation ${selectedIndex === originalIndex ? "is-selected" : ""}`}
                    key={conversation.name}
                    type="button"
                    aria-pressed={selectedIndex === originalIndex}
                    onClick={() => selectConversation(originalIndex)}
                  >
                    <span className="dashboard-avatar conversation-avatar">{conversation.initials}</span>
                    <span className="dashboard-conversation-copy">
                      <span className="dashboard-conversation-heading"><strong>{conversation.name}</strong><time>{conversation.time}</time></span>
                      <span className="dashboard-conversation-preview">{conversation.preview}</span>
                      <span className="dashboard-conversation-meta"><small>{conversation.category}</small>{conversation.unread > 0 && <b>{conversation.unread}</b>}</span>
                    </span>
                  </button>
                );
              }) : <p className="dashboard-empty-state">{page.emptyConversations}</p>}
            </div>
            <div className="dashboard-sync-status">{page.demoNotice}</div>
          </section>

          <section className="dashboard-thread-panel" aria-label={selectedConversation.name}>
            <header className="dashboard-thread-header">
              <button className="dashboard-back-to-inbox" type="button" onClick={() => setMobileInboxOpen(true)}>
                <WorkspaceIcon name="arrow" />{page.thread.backToInbox}
              </button>
              <span className="dashboard-avatar thread-avatar">{selectedConversation.initials}</span>
              <div className="dashboard-thread-contact">
                <h2>{selectedConversation.name}</h2>
                <p><span className="dashboard-online-dot" />{page.availableLabel}</p>
              </div>
              <div className="dashboard-thread-actions">
                <button className="dashboard-thread-assignee" type="button" title={page.thread.assignedTo}><span className="dashboard-online-dot" />{page.thread.agentName}<WorkspaceIcon name="chevronDown" /></button>
                <span className="dashboard-thread-count"><WorkspaceIcon name="contacts" />1</span>
                <span className="dashboard-thread-time"><WorkspaceIcon name="timer" />{page.thread.outgoingTime}</span>
                <button className={`dashboard-resolve-button ${resolved ? "is-resolved" : ""}`} type="button" onClick={() => setResolved((current) => !current)}>
                  {resolved ? page.thread.resolvedLabel : page.filterOpen}<WorkspaceIcon name="chevronDown" />
                </button>
                <button className="dashboard-icon-button" type="button" title={page.thread.customerPhone} aria-label={page.thread.customerPhone}><WorkspaceIcon name="phone" /></button>
                <button className="dashboard-icon-button" type="button" title={page.thread.latestActivity} aria-label={page.thread.latestActivity}><WorkspaceIcon name="more" /></button>
              </div>
            </header>

            <nav className="dashboard-thread-tabs" role="tablist" aria-label={page.inboxTitle}>
              {page.threadTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={activeThreadTab === tab.id}
                  className={activeThreadTab === tab.id ? "is-active" : ""}
                  onClick={() => setActiveThreadTab(tab.id)}
                >
                  <WorkspaceIcon name={tab.id === "messages" ? "chat" : tab.id === "summary" ? "sparkles" : tab.id === "automation" ? "automation" : "phone"} />
                  {tab.label}
                </button>
              ))}
            </nav>
            <div className="dashboard-thread-statusline">
              <WorkspaceIcon name="sparkles" />
              <span>{page.threadStatusline}</span>
              <button type="button" onClick={() => setActiveThreadTab("summary")}>{page.activateFeature}</button>
            </div>

            {activeThreadTab === "messages" ? (
              <div className="dashboard-thread-messages">
                <div className="dashboard-date-divider"><span>{page.thread.todayLabel}</span></div>
                <p className="dashboard-assigned-event">{page.thread.assignedNotice}</p>
                <article className="dashboard-message-row is-incoming">
                  <span className="dashboard-avatar message-avatar">{selectedConversation.initials}</span>
                  <div className="dashboard-message-bubble">{selectedConversation.preview}<time>{selectedConversation.time}</time></div>
                </article>
                <article className="dashboard-message-row is-outgoing">
                  <div className="dashboard-message-bubble">{outgoingMessage}<time>{page.thread.agentName} · {page.thread.outgoingTime} ✓✓</time></div>
                </article>
                <article className="dashboard-message-row is-incoming">
                  <span className="dashboard-avatar message-avatar">{selectedConversation.initials}</span>
                  <div className="dashboard-message-bubble">{followupMessage}<time>{page.thread.followupTime}</time></div>
                </article>
                {sentMessages.map((sentMessage, index) => (
                  <article className={`dashboard-message-row ${sentMessage.isNote ? "is-note" : "is-outgoing"}`} key={`${index}-${sentMessage.text}`}>
                    <div className="dashboard-message-bubble">{sentMessage.text}<time>{sentMessage.isNote ? page.thread.noteLabel : page.thread.replyLabel} · {page.thread.outgoingTime}</time></div>
                  </article>
                ))}
              </div>
            ) : (
              <section className="dashboard-thread-tab-content">
                <h2>{page.threadTabs.find((tab) => tab.id === activeThreadTab)?.label}</h2>
                <p>{activeThreadTab === "calls" ? page.thread.noteText : page.thread.assistantDescription}</p>
              </section>
            )}

            <div className="dashboard-shared-number-notice">
              <div><strong>{page.sharedNumberNotice}</strong><p>{page.sharedNumberDescription}</p></div>
              <a href="#connected-whatsapp">{page.connectChannel}</a>
            </div>
            <form className={`dashboard-composer ${noteMode ? "is-note-mode" : ""}`} onSubmit={handleSend}>
              <div className="dashboard-composer-tabs">
                <button type="button" className={!noteMode ? "is-active" : ""} onClick={() => setNoteMode(false)}>{page.thread.replyLabel}</button>
                <button type="button" className={noteMode ? "is-active" : ""} onClick={() => setNoteMode(true)}>{page.thread.noteLabel}</button>
                <span />
                <button className="dashboard-ai-draft" type="button" onClick={() => {
                  setNoteMode(false);
                  setDraft(outgoingMessage);
                }}><WorkspaceIcon name="sparkles" />{page.thread.assistantAction}</button>
              </div>
              <textarea
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder={noteMode ? page.thread.noteLabel : page.thread.composerPlaceholder}
                aria-label={noteMode ? page.thread.noteLabel : page.thread.composerPlaceholder}
              />
              <div className="dashboard-composer-footer">
                <div className="dashboard-composer-tools">
                  <button type="button" title={page.thread.assistantAction} aria-label={page.thread.assistantAction} onClick={() => setDraft(outgoingMessage)}><WorkspaceIcon name="sparkles" /></button>
                  <button type="button" title={page.thread.replyLabel} aria-label={page.thread.replyLabel}><WorkspaceIcon name="book" /></button>
                  <button type="button" title={page.thread.noteLabel} aria-label={page.thread.noteLabel} onClick={() => setNoteMode(true)}><WorkspaceIcon name="quickReply" /></button>
                  <button type="button" title={page.thread.noteLabel} aria-label={page.thread.noteLabel}><WorkspaceIcon name="paperclip" /></button>
                  <button type="button" title={page.thread.customerPhone} aria-label={page.thread.customerPhone}><WorkspaceIcon name="microphone" /></button>
                  <button type="button" title={page.thread.replyLabel} aria-label={page.thread.replyLabel}><WorkspaceIcon name="smile" /></button>
                  <button type="button" title={page.thread.customerDetails} aria-label={page.thread.customerDetails}><WorkspaceIcon name="image" /></button>
                </div>
                <button className="dashboard-send-button" type="submit" disabled={!draft.trim()}><WorkspaceIcon name="whatsapp" />{page.thread.sendLabel}</button>
              </div>
            </form>
          </section>

          <aside className="dashboard-customer-panel" id="details" aria-label={page.thread.customerDetails}>
            <div className="dashboard-customer-panel-heading">
              <WorkspaceIcon name="contacts" />
              <h2>{page.thread.contactInfo}</h2>
              <button className="dashboard-icon-button" type="button" title={page.thread.contactInfo} aria-label={page.thread.contactInfo}><WorkspaceIcon name="more" /></button>
            </div>
            <div className="dashboard-contact-security">
              <WorkspaceIcon name="settings" />
              <span>{page.privacyNotice}</span>
              <button type="button">{page.privacyAction}</button>
            </div>
            <section className="dashboard-customer-section dashboard-contact-info">
              <div className="dashboard-contact-fields">
                <div><span>{page.contactFieldLabels.name}</span><strong>{selectedConversation.name}</strong></div>
                <div><span>{page.contactFieldLabels.phone}</span><strong>{page.thread.customerPhone}</strong></div>
                <div><span>{page.contactFieldLabels.source}</span><strong>{page.channelFilters.find((channel) => channel.id === selectedConversation.channel)?.label}</strong></div>
              </div>
            </section>
            <div className="dashboard-customer-score">
              <span><WorkspaceIcon name="sparkles" />{page.cxScoreLabel}<small>{page.cxScoreStatus}</small></span>
              <strong>{page.unavailableLabel}</strong>
            </div>
            <section className="dashboard-customer-section dashboard-sales-attributes">
              <h3>{page.salesAttributesLabel}</h3>
              <div className="dashboard-assignee"><span className="dashboard-avatar">{initialsFor(page.thread.agentName)}</span><span><strong>{page.thread.agentName}</strong><small>{page.thread.agentRole}</small></span></div>
            </section>
            <section className="dashboard-promo-ai" id="promoai-panel">
              <div><strong>{page.thread.assistantTitle}</strong><span>{page.thread.assistantStatus}</span></div>
              <p>{page.thread.assistantDescription}</p>
              <span>{page.thread.assistantAction}<WorkspaceIcon name="arrow" /></span>
            </section>
            <section className="dashboard-customer-section dashboard-contact-attributes">
              <h3>{page.contactAttributesLabel}</h3>
              <p>{selectedConversation.name}</p>
              <p>{page.thread.customerEmail}</p>
            </section>
            <section className="dashboard-customer-section dashboard-customer-tags-section">
              <h3>{page.thread.tagsLabel}</h3>
              <div className="dashboard-customer-tags">{page.thread.tags.map((tag, index) => <span className={`tag-${index}`} key={tag}>{tag}</span>)}</div>
              <input type="text" placeholder={page.thread.tagsLabel} aria-label={page.thread.tagsLabel} />
            </section>
            <section className="dashboard-customer-section dashboard-customer-note">
              <h3>{page.thread.notesTitle}</h3>
              <p>{page.thread.noteText}</p>
            </section>
            <section className="dashboard-customer-section dashboard-latest-activity" id="assigned-agent">
              <h3>{page.thread.activityTab}</h3>
              <p>{page.thread.activityText}</p>
            </section>
          </aside>
          {promoAiOpen && (
            <aside className={`dashboard-promo-ai-panel ${promoAiHistoryCollapsed ? "is-history-collapsed" : ""} ${promoAiMaximized ? "is-maximized" : ""}`} aria-label={page.thread.assistantTitle}>
              <nav className="dashboard-promo-ai-history" aria-label={page.thread.assistantTitle}>
                <div className="dashboard-promo-ai-history-tools">
                  <div className="dashboard-promo-ai-tabs" role="tablist" aria-label={page.thread.assistantTitle}>
                    <button type="button" role="tab" aria-selected={promoAiTab === "ask"} className={promoAiTab === "ask" ? "is-active" : ""} onClick={() => setPromoAiTab("ask")}>{page.thread.agentAskLabel}</button>
                    <button type="button" role="tab" aria-selected={promoAiTab === "agents"} className={promoAiTab === "agents" ? "is-active" : ""} onClick={() => setPromoAiTab("agents")}>{page.thread.agentAgentsLabel}</button>
                  </div>
                  <button className="dashboard-promo-ai-new-chat" type="button"><span>+</span><strong>{promoAiTab === "agents" ? page.thread.agentNewAgent : page.thread.agentNewChat}</strong></button>
                </div>
                <div className="dashboard-promo-ai-recent">
                  <span>{page.thread.agentRecentLabel}</span>
                  {promoAiTab === "ask" ? (
                    <p>{page.thread.agentEmptyHistory}</p>
                  ) : usedPromoAgents.length === 0 ? (
                    <p>{page.thread.agentListDescription}</p>
                  ) : (
                    <div className="dashboard-promo-ai-agent-recent">
                      {usedPromoAgents.map((agentName) => (
                        <button type="button" key={agentName}><span aria-hidden="true" />{agentName}</button>
                      ))}
                    </div>
                  )}
                </div>
              </nav>
              <section className="dashboard-promo-ai-main">
                <header>
                  <button className="dashboard-promo-ai-history-toggle" type="button" title={promoAiHistoryCollapsed ? page.thread.agentExpandHistory : page.thread.agentCollapseHistory} aria-label={promoAiHistoryCollapsed ? page.thread.agentExpandHistory : page.thread.agentCollapseHistory} aria-expanded={!promoAiHistoryCollapsed} onClick={() => setPromoAiHistoryCollapsed((current) => !current)}><WorkspaceIcon name={promoAiHistoryCollapsed ? "expandHistory" : "collapseHistory"} /></button>
                  <strong>{page.thread.assistantTitle}</strong>
                  <button className="dashboard-promo-ai-maximize" type="button" title={promoAiMaximized ? page.thread.agentRestoreLabel : page.thread.agentMaximizeLabel} aria-label={promoAiMaximized ? page.thread.agentRestoreLabel : page.thread.agentMaximizeLabel} aria-pressed={promoAiMaximized} onClick={() => setPromoAiMaximized((current) => !current)}><WorkspaceIcon name={promoAiMaximized ? "minimize" : "maximize"} /></button>
                  <button className="dashboard-promo-ai-close" type="button" title={page.thread.assistantTitle} aria-label={page.thread.assistantTitle} onClick={() => { setPromoAiOpen(false); setPromoAiMaximized(false); }}><WorkspaceIcon name="close" /></button>
                </header>
                <div className="dashboard-promo-ai-content">
                  {promoAiTab === "ask" ? (
                    <div className="dashboard-promo-ai-welcome">
                      <div className="dashboard-promo-ai-orb" aria-hidden="true"><span /><span /></div>
                      <h3>{page.thread.agentGreeting}</h3>
                      <div className="dashboard-promo-ai-prompts">
                        <button type="button">{page.thread.agentRecentPrompt}</button>
                        <button type="button">{page.thread.agentLastChatsPrompt}</button>
                        <button type="button">{page.thread.agentSuggestionsPrompt}</button>
                      </div>
                    </div>
                  ) : (
                    <div className="dashboard-promo-ai-agents">
                      <div className="dashboard-promo-ai-agents-heading">
                        <h3>{page.thread.agentSuggestedTitle}</h3>
                        <span>{page.thread.agentSuggestedBadge.replace("{count}", "1")}</span>
                      </div>
                      <div className="dashboard-promo-ai-agent-list">
                        {(showAllPromoAgents ? suggestedPromoAgents : suggestedPromoAgents.slice(0, 4)).map((agent) => (
                          <button
                            type="button"
                            key={agent.name}
                            onClick={() => setUsedPromoAgents((current) => [agent.name, ...current.filter((name) => name !== agent.name)].slice(0, 6))}
                          >
                            <span className={`dashboard-promo-ai-agent-avatar is-${agent.color} is-${agent.shape}`} aria-hidden="true"><span /><span /></span>
                            <span>
                              <strong>{agent.name}</strong>
                              <small>{agent.description}</small>
                            </span>
                          </button>
                        ))}
                        {suggestedPromoAgents.length > 4 && (
                          <button
                            className="dashboard-promo-ai-show-more"
                            type="button"
                            onClick={() => setShowAllPromoAgents((current) => !current)}
                          >
                            {showAllPromoAgents ? page.thread.agentShowLess : page.thread.agentShowMore}
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div className="dashboard-promo-ai-composer">
                  {promoAiContextOpen && (
                    <div className="dashboard-promo-ai-context">
                      <span>{page.sidebar.teamInbox}</span>
                      <button type="button" title={page.thread.assistantTitle} aria-label={page.thread.assistantTitle} onClick={() => setPromoAiContextOpen(false)}>
                        <WorkspaceIcon name="close" />
                      </button>
                    </div>
                  )}
                  <form onSubmit={(event) => event.preventDefault()}>
                    <textarea
                      rows={1}
                      placeholder={page.thread.agentAskPlaceholder}
                      aria-label={page.thread.agentAskPlaceholder}
                      onInput={(event) => {
                        const textarea = event.currentTarget;
                        textarea.style.height = "auto";
                        const lineHeight = Number.parseFloat(window.getComputedStyle(textarea).lineHeight);
                        const maxHeight = lineHeight * 7;
                        const contentHeight = textarea.scrollHeight;
                        const hasOverflow = contentHeight > maxHeight + 1;

                        textarea.style.height = `${Math.min(contentHeight, maxHeight)}px`;
                        textarea.style.overflowY = hasOverflow ? "auto" : "hidden";
                      }}
                    />
                    <div>
                      <button className="dashboard-promo-ai-add" type="button" title={page.thread.agentNewChat} aria-label={page.thread.agentNewChat}><span>+</span></button>
                      <button className="dashboard-promo-ai-send" type="submit" title={page.thread.assistantAction} aria-label={page.thread.assistantAction}><WorkspaceIcon name="arrow" /></button>
                    </div>
                  </form>
                  <div className="dashboard-promo-ai-private"><strong>{page.thread.agentPrivateChat}</strong><span>·</span><span>{page.thread.agentPrivateDescription}</span></div>
                </div>
              </section>
            </aside>
          )}
        </div>
      </div>

      <nav className="dashboard-mobile-nav" aria-label={page.workspace}>
        {navigation.map((item, index) => (
          <a key={item.label} className={`dashboard-nav-link ${index === 1 ? "is-active" : ""}`} href={item.href} title={item.label}>
            <WorkspaceIcon name={item.icon} /><span>{item.label}</span>
          </a>
        ))}
      </nav>
    </main>
  );
}