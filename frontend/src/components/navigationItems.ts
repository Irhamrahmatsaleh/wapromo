import type { Dictionary, Locale } from "../dictionaries/types";

export interface NavSubItem {
  href: string;
  label: string;
  icon?: string;
  description?: string;
}

export interface NavigationItem {
  label: string;
  href?: string;
  subItems?: NavSubItem[];
}

export function getNavigationItems(nav: Dictionary["nav"], lang: Locale = "id"): NavigationItem[] {
  return [
    { href: `/${lang}`, label: nav.home },
    { href: `/${lang}/fitur`, label: nav.features },
    { href: `/${lang}/harga`, label: nav.pricing },
    { href: `/${lang}/api`, label: nav.api },
    {
      label: nav.resource,
      subItems: [
        {
          href: `/${lang}/bantuan`,
          label: nav.help,
          icon: "💡",
          description: "Panduan cepat, setup QR & FAQ",
        },
        {
          href: `/${lang}/blog`,
          label: nav.blog,
          icon: "📝",
          description: "Artikel edukasi & tips WhatsApp sales",
        },
        {
          href: `/${lang}/ebook`,
          label: nav.ebook,
          icon: "📚",
          description: "Playbook gratis otomasi olshop",
        },
      ],
    },
  ];
}