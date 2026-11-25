"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import type { NavSubItem } from "./navigationItems";

interface ResourceDropdownProps {
  label: string;
  subItems: NavSubItem[];
  currentPath?: string;
}

export function ResourceDropdown({ label, subItems, currentPath = "" }: ResourceDropdownProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const details = detailsRef.current;
      if (!details || !details.open) return;
      if (!details.contains(event.target as Node)) {
        details.removeAttribute("open");
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && detailsRef.current?.open) {
        detailsRef.current.removeAttribute("open");
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const isChildActive = subItems.some((item) => currentPath === item.href || currentPath.startsWith(`${item.href}/`));

  return (
    <details ref={detailsRef} className="resource-dropdown">
      <summary
        className={`resource-summary ${isChildActive ? "is-nav-active" : ""}`}
        aria-haspopup="menu"
      >
        <span>{label}</span>
        <svg
          className="resource-chevron"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 4.5L6 7.5L9 4.5" />
        </svg>
      </summary>
      <div className="resource-menu" role="menu">
        {subItems.map((item) => {
          const isActive = currentPath === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`resource-menu-item ${isActive ? "active" : ""}`}
              role="menuitem"
              onClick={() => {
                if (detailsRef.current) {
                  detailsRef.current.removeAttribute("open");
                }
              }}
              prefetch
            >
              {item.icon && <span className="resource-icon" aria-hidden="true">{item.icon}</span>}
              <div className="resource-item-text">
                <span className="resource-item-title">{item.label}</span>
                {item.description && (
                  <span className="resource-item-desc">{item.description}</span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </details>
  );
}
