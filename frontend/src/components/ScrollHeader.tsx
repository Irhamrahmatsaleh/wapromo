"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface ScrollHeaderProps {
  children: ReactNode;
}

export function ScrollHeader({ children }: ScrollHeaderProps) {
  const [isHidden, setIsHidden] = useState(false);
  const animationFrame = useRef<number | null>(null);

  useEffect(() => {
    let previousScrollY = window.scrollY;
    let accumulatedDirection = 0;

    function updateHeader() {
      animationFrame.current = null;
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - previousScrollY;

      if (currentScrollY <= 72) {
        accumulatedDirection = 0;
        setIsHidden(false);
      } else if (scrollDelta > 0) {
        accumulatedDirection = Math.max(0, accumulatedDirection) + scrollDelta;
        if (accumulatedDirection > 8) setIsHidden(true);
      } else if (scrollDelta < 0) {
        accumulatedDirection = Math.min(0, accumulatedDirection) + scrollDelta;
        if (accumulatedDirection < -8) setIsHidden(false);
      }

      previousScrollY = currentScrollY;
    }

    function handleScroll() {
      document
        .querySelectorAll<HTMLDetailsElement>(
          ".lang-switcher[open], .theme-switcher[open], .resource-dropdown[open]",
        )
        .forEach((dropdown) => dropdown.removeAttribute("open"));
      if (animationFrame.current !== null) return;
      animationFrame.current = window.requestAnimationFrame(updateHeader);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrame.current !== null) {
        window.cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  return (
    <header className={`site-header container${isHidden ? " is-hidden" : ""}`}>
      {children}
    </header>
  );
}