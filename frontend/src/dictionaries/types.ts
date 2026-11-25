export type Locale = "id" | "en" | "pt" | "es" | "ar";

export interface FeatureItem {
  icon: "phone" | "team" | "sync";
  title: string;
  text: string;
  action: string;
}

export interface MetricItem {
  value: string;
  label: string;
}

export interface ComparisonData {
  eyebrow: string;
  heading: string;
  subheading: string;
  oldWayTitle: string;
  oldWayBadge?: string;
  oldWayItems: string[];
  newWayTitle: string;
  newWayItems: string[];
  recommendedBadge?: string;
}

export interface PricingPlan {
  name: string;
  desc: string;
  price: string;
  popular: boolean;
  cta: string;
  features: string[];
}

export interface PricingData {
  eyebrow: string;
  heading: string;
  subheading: string;
  period: string;
  popularBadge: string;
  plans: PricingPlan[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqData {
  eyebrow: string;
  heading: string;
  subheading: string;
  items: FaqItem[];
}

export interface CtaBannerData {
  heading: string;
  subheading: string;
  button: string;
  note: string;
}

export interface ApiEndpointItem {
  method: "POST" | "GET";
  path: string;
  title: string;
  description: string;
  tag: string;
}

export interface ApiFeatureItem {
  title: string;
  description: string;
}

export interface ApiPageData {
  metaTitle: string;
  metaDescription: string;
  badge: string;
  titleLine1: string;
  titleLine2: string;
  lead: string;
  ctaPrimary: string;
  ctaSecondary: string;
  stats: {
    speed: string;
    speedLabel: string;
    uptime: string;
    uptimeLabel: string;
    freeTier: string;
    freeTierLabel: string;
  };
  codeTitle: string;
  codeSubtitle: string;
  endpointsHeading: string;
  endpointsSubheading: string;
  endpoints: ApiEndpointItem[];
  featuresHeading: string;
  featuresSubheading: string;
  features: ApiFeatureItem[];
  ctaHeading: string;
  ctaSubheading: string;
  ctaButton: string;
  ctaNote: string;
}

export interface FeaturesPageData {
  metaTitle: string;
  metaDescription: string;
  badge: string;
  titleLine1: string;
  titleLine2: string;
  lead: string;
  ctaPrimary: string;
  ctaSecondary: string;
  pillars: {
    tag: string;
    title: string;
    desc: string;
    bulletPoints: string[];
  }[];
  ctaHeading: string;
  ctaSubheading: string;
  ctaButton: string;
}

export interface PricingPageData {
  metaTitle: string;
  metaDescription: string;
  badge: string;
  titleLine1: string;
  titleLine2: string;
  lead: string;
  monthlyToggle: string;
  annualToggle: string;
  annualBadge: string;
  comparisonHeading: string;
  comparisonSubheading: string;
  comparisonRows: {
    feature: string;
    wapromo: string;
    others: string;
  }[];
  guaranteeHeading: string;
  guaranteeDesc: string;
  ctaHeading: string;
  ctaSubheading: string;
  ctaButton: string;
}

export interface HelpPageData {
  metaTitle: string;
  metaDescription: string;
  badge: string;
  titleLine1: string;
  titleLine2: string;
  lead: string;
  quickStartHeading: string;
  quickStartSubheading: string;
  quickStartSteps: {
    step: string;
    title: string;
    desc: string;
  }[];
  categories: {
    title: string;
    items: {
      question: string;
      answer: string;
    }[];
  }[];
  contactHeading: string;
  contactDesc: string;
  contactButton: string;
}

export interface BlogPageData {
  metaTitle: string;
  metaDescription: string;
  badge: string;
  titleLine1: string;
  titleLine2: string;
  lead: string;
  featuredBadge: string;
  readMore?: string;
  backToBlog?: string;
  articles: {
    slug: string;
    tag: string;
    readTime: string;
    title: string;
    excerpt: string;
    date: string;
  }[];
}

export interface EbookPageData {
  metaTitle: string;
  metaDescription: string;
  badge: string;
  titleLine1: string;
  titleLine2: string;
  lead: string;
  bookTitle: string;
  bookSubtitle: string;
  bookDesc: string;
  chaptersHeading: string;
  chapters: string[];
  downloadButton: string;
  downloadNote: string;
  highlights: string[];
}

export interface RegisterOwnerPageData {
  metaTitle: string;
  metaDescription: string;
  badge: string;
  heading: string;
  subheading: string;
  googleSignUp: string;
  orDivider: string;
  ownerNameLabel: string;
  ownerNamePlaceholder: string;
  businessNameLabel: string;
  businessNamePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  countrySearchPlaceholder: string;
  countryEmptyText: string;
  confirmPasswordLabel: string;
  confirmPasswordPlaceholder: string;
  demoOwnerName: string;
  demoBusinessName: string;
  demoEmail: string;
  demoPhone: string;
  demoPassword: string;
  passwordMismatch: string;
  submitLabel: string;
  prototypeNote: string;
}

export interface DashboardPageData {
  metaTitle: string;
  demoBadge: string;
  workspace: string;
  sidebar: {
    campaign: string;
    teamInbox: string;
    contacts: string;
    promoAI: string;
    automation: string;
    commerce: string;
    ads: string;
    analytics: string;
    channels: string;
    watiAI: string;
    connectors: string;
    developers: string;
    settings: string;
    users: string;
    accountDetails: string;
    academy: string;
    collapse: string;
    expand: string;
    collapseInbox: string;
    expandInbox: string;
    channelChildren: [string, string];
    watiAIChildren: [string, string];
    connectorChildren: [string, string];
  };
  welcome: string;
  welcomeBody: string;
  searchPlaceholder: string;
  scheduleDemo: string;
  navOverview: string;
  navInbox: string;
  navContacts: string;
  navCampaigns: string;
  navTeam: string;
  navSettings: string;
  systemOnline: string;
  connectedLabel: string;
  connectedNumber: string;
  newConversation: string;
  logout: string;
  metrics: [string, string, string, string];
  inboxTitle: string;
  inboxDescription: string;
  viewAll: string;
  conversationCountLabel: string;
  activeConversationsLabel: string;
  inboxFolders: { id: string; label: string }[];
  channelsLabel: string;
  allChannels: string;
  channelFilters: { id: string; label: string }[];
  filterAll: string;
  filterOpen: string;
  filterUnread: string;
  filterPending: string;
  availableLabel: string;
  threadStatusline: string;
  activateFeature: string;
  sharedNumberNotice: string;
  sharedNumberDescription: string;
  connectChannel: string;
  threadTabs: { id: string; label: string }[];
  contactFieldLabels: { name: string; phone: string; source: string };
  privacyNotice: string;
  privacyAction: string;
  cxScoreLabel: string;
  cxScoreStatus: string;
  unavailableLabel: string;
  salesAttributesLabel: string;
  contactAttributesLabel: string;
  emptyConversations: string;
  conversations: {
    name: string;
    preview: string;
    time: string;
    category: string;
    initials: string;
    unread: number;
    channel: string;
  }[];
  setupTitle: string;
  setupDescription: string;
  setupProgress: string;
  setupSteps: string[];
  campaignTitle: string;
  campaignDescription: string;
  campaignSentLabel: string;
  campaignReplyLabel: string;
  teamTitle: string;
  teamOnlineLabel: string;
  teamMembers: {
    name: string;
    role: string;
    status: string;
    initials: string;
  }[];
  profileLabel: string;
  demoNotice: string;
  thread: {
    lockNotice: string;
    releaseLock: string;
    resolveLabel: string;
    resolvedLabel: string;
    todayLabel: string;
    assignedNotice: string;
    replyLabel: string;
    noteLabel: string;
    composerPlaceholder: string;
    sendLabel: string;
    customerDetails: string;
    customerSince: string;
    totalOrders: string;
    lifetimeValue: string;
    customerOrderValue: string;
    customerLifetimeValue: string;
    overviewTab: string;
    ordersTab: string;
    activityTab: string;
    contactInfo: string;
    customerPhone: string;
    customerEmail: string;
    customerLocation: string;
    tagsLabel: string;
    tags: string[];
    assignedTo: string;
    agentName: string;
    agentRole: string;
    assistantTitle: string;
    agentMaximizeLabel: string;
    agentRestoreLabel: string;
    agentCollapseHistory: string;
    agentExpandHistory: string;
    assistantStatus: string;
    assistantDescription: string;
    assistantAction: string;
    agentGreeting: string;
    agentRecentPrompt: string;
    agentLastChatsPrompt: string;
    agentSuggestionsPrompt: string;
    agentPrivateChat: string;
    agentAskPlaceholder: string;
    agentAskLabel: string;
    agentAgentsLabel: string;
    agentNewChat: string;
    agentRecentLabel: string;
    agentEmptyHistory: string;
    agentPrivateDescription: string;
    agentNewAgent: string;
    agentSuggestedTitle: string;
    agentSuggestedBadge: string;
    agentListTitle: string;
    agentListDescription: string;
    agentShowMore: string;
    agentShowLess: string;
    notesTitle: string;
    noteText: string;
    latestActivity: string;
    activityText: string;
    orderTitle: string;
    orderName: string;
    orderSubtitle: string;
    orderPrice: string;
    orderStatus: string;
    orderNumber: string;
    orderSubtotal: string;
    quantityLabel: string;
    outgoingTime: string;
    followupTime: string;
    incomingMessage: string;
    outgoingMessage: string;
    followupMessage: string;
    backToInbox: string;
  };
}

export interface HomeNightmareData {
  eyebrow: string;
  heading: string;
  subheading: string;
  items: {
    title: string;
    desc: string;
    impact: string;
  }[];
}

export interface HomeEpiphanyData {
  eyebrow: string;
  heading: string;
  subheading: string;
  items: {
    title: string;
    desc: string;
    benefit: string;
  }[];
}

export interface HomeSavingsData {
  eyebrow: string;
  heading: string;
  subheading: string;
  traditionalCost: string;
  traditionalLabel: string;
  traditionalTag?: string;
  wapromoCost: string;
  wapromoLabel: string;
  wapromoTag?: string;
  differenceText: string;
  note: string;
}

export interface HomePillarsTeaserData {
  eyebrow: string;
  heading: string;
  subheading: string;
  items: {
    title: string;
    desc: string;
    action: string;
    href: string;
  }[];
}

export interface PWAData {
  installButton: string;
  installingButton: string;
  installTitle: string;
  installDescription: string;
  installIOSDescription: string;
  installIOSShareTitle: string;
  installIOSShareDescription: string;
  installIOSAddTitle: string;
  installIOSAddDescription: string;
  installIOSConfirmTitle: string;
  installIOSConfirmDescription: string;
  installIOSBrowserTip: string;
  installAndroidDescription: string;
  installAndroidMenuTitle: string;
  installAndroidMenuDescription: string;
  installAndroidAddTitle: string;
  installAndroidAddDescription: string;
  installAndroidConfirmTitle: string;
  installAndroidConfirmDescription: string;
  installInAppWarningTitle: string;
  installInAppWarningDescription: string;
  installDetectedBadge: string;
  installTabIOS: string;
  installTabAndroid: string;
  installTabDesktop: string;
  installBrowserTitle: string;
  installBrowserDescription: string;
  installBrowserClickTitle: string;
  installBrowserClickDescription: string;
  installDone: string;
  installingTitle: string;
  installingStep0: string;
  installingStep1: string;
  installingStep2: string;
  installingStep3: string;
  installingBadge: string;
  installingDesktopBadge: string;
  installedTitle: string;
  installedMessage: string;
  installedBadge: string;
  closeLabel: string;
}

export interface Dictionary {
  lang: Locale;
  dir: "ltr" | "rtl";
  localeName: string;
  flag: string;
  meta: {
    title: string;
    description: string;
    keywords: string[];
    ogTitle: string;
    ogDescription: string;
  };
  nav: {
    home: string;
    features: string;
    howItWorks: string;
    pricing: string;
    api: string;
    resource: string;
    help: string;
    blog: string;
    ebook: string;
    login: string;
    signup: string;
    language: string;
    menu: string;
    closeMenu: string;
  };
  auth: {
    loginTitle: string;
    signupTitle: string;
    description: string;
    owner: string;
    ownerDescription: string;
    customerService: string;
    customerServiceDescription: string;
    close: string;
    next: string;
  };
  theme: {
    label: string;
    system: string;
    light: string;
    dark: string;
  };
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    note: string;
  };
  metrics: MetricItem[];
  preview: {
    title: string;
    workspace: string;
    sideActive: string;
    contacts: string;
    broadcast: string;
    personal: string;
    teamMembers: string;
    unread: string;
    chatName: string;
    chatPreview: string;
    chatActive: string;
    chatIncoming: string;
    chatOutgoing: string;
    replyPlaceholder: string;
    sendButton: string;
    chat2Name?: string;
    chat2Preview?: string;
    chat3Name?: string;
    chat3Preview?: string;
    broadcastBadge?: string;
    broadcastStat?: string;
    closingBadge?: string;
    closingAmount?: string;
    leadTag?: string;
    agentAssigned?: string;
    quickReply?: string;
    closingStatus?: string;
    liveBadge?: string;
  };
  nightmare?: HomeNightmareData;
  epiphany?: HomeEpiphanyData;
  savings?: HomeSavingsData;
  pillarsTeaser?: HomePillarsTeaserData;
  comparison: ComparisonData;
  features: {
    heading: string;
    subheading: string;
    items: FeatureItem[];
  };
  pricing: PricingData;
  faq: FaqData;
  ctaBanner: CtaBannerData;
  apiPage: ApiPageData;
  featuresPage?: FeaturesPageData;
  pricingPage?: PricingPageData;
  helpPage?: HelpPageData;
  blogPage?: BlogPageData;
  ebookPage?: EbookPageData;
  registerOwnerPage: RegisterOwnerPageData;
  dashboardPage: DashboardPageData;
  pwa: PWAData;
  footer: {
    tagline: string;
  };
}
