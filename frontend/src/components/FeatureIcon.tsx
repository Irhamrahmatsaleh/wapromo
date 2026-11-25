import type { FeatureItem } from "../dictionaries/types";

interface FeatureIconProps {
  name: FeatureItem["icon"];
}

export function FeatureIcon({ name }: FeatureIconProps) {
  return (
    <span className="feature-icon" aria-hidden="true">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {name === "phone" && (
          <>
            <rect x="6.5" y="2.75" width="11" height="18.5" rx="2.5" />
            <path d="M10 6h4M10.5 18h3" />
          </>
        )}
        {name === "team" && (
          <>
            <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="10" cy="7" r="4" />
            <path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </>
        )}
        {name === "sync" && (
          <>
            <path d="M20 7v5h-5M4 17v-5h5" />
            <path d="M5.64 9A7 7 0 0 1 17.5 6L20 8.5M4 15.5 6.5 18A7 7 0 0 0 18.36 15" />
          </>
        )}
      </svg>
    </span>
  );
}