import Link from "next/link";
import { getNavigationItems } from "./navigationItems";
import { ResourceDropdown } from "./ResourceDropdown";
import { ThemeSwitcher } from "./ThemeSwitcher";
import type { Dictionary, Locale } from "../dictionaries/types";

interface HeaderNavProps {
  nav: Dictionary["nav"];
  theme: Dictionary["theme"];
  lang: Locale;
  currentPath?: string;
}

export function HeaderNav({ nav, theme, lang, currentPath = "" }: HeaderNavProps) {
  const items = getNavigationItems(nav, lang);

  return (
    <nav aria-label="Navigasi">
      {items.map((item) => {
        if (item.subItems) {
          return (
            <ResourceDropdown
              key={item.label}
              label={item.label}
              subItems={item.subItems}
              currentPath={currentPath}
            />
          );
        }

        const isExactActive = currentPath === item.href;
        const isPrefixActive = item.href && item.href !== `/${lang}` && currentPath.startsWith(item.href);
        const isActive = isExactActive || isPrefixActive;

        return (
          <Link
            key={item.href || item.label}
            href={item.href || `/${lang}`}
            className={isActive ? "is-nav-active" : undefined}
            prefetch
          >
            {item.label}
          </Link>
        );
      })}
      <ThemeSwitcher labels={theme} />
    </nav>
  );
}
