"use client";

import { useEffect } from "react";
import { defaultLocale } from "../dictionaries";

const pendingTargetKey = "wapromo-pending-anchor-target";

function getPendingTarget(): string | null {
  try {
    return sessionStorage.getItem(pendingTargetKey);
  } catch {
    return null;
  }
}

function setPendingTarget(value: string): void {
  try {
    sessionStorage.setItem(pendingTargetKey, value);
  } catch {}
}

function removePendingTarget(): void {
  try {
    sessionStorage.removeItem(pendingTargetKey);
  } catch {}
}

export function CleanAnchorNavigation() {
  useEffect(() => {
    const pendingTarget = getPendingTarget();
    if (pendingTarget) {
      removePendingTarget();
      requestAnimationFrame(() => {
        document.getElementById(pendingTarget)?.scrollIntoView({ behavior: "smooth" });
      });
    }

    function handleClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const element = event.target;
      if (!(element instanceof Element)) return;
      const anchor = element.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin || !url.hash) return;

      const targetId = decodeURIComponent(url.hash.slice(1));
      if (!targetId) return;

      const target = document.getElementById(targetId);
      const currentPath = window.location.pathname;
      const samePage = url.pathname === currentPath ||
        (currentPath === "/" && url.pathname === `/${defaultLocale}`);

      event.preventDefault();

      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        return;
      }

      if (!samePage) {
        setPendingTarget(targetId);
        window.location.assign(`${url.pathname}${url.search}`);
      } else {
        window.history.replaceState(null, "", `${url.pathname}${url.search}`);
      }
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return null;
}