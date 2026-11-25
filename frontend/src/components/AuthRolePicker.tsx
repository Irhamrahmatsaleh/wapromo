"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import type { Dictionary } from "../dictionaries/types";

type AuthMode = "login" | "signup";
type Role = "owner" | "customerService";

interface AuthRolePickerProps {
  mode: AuthMode;
  labels: Dictionary["auth"];
  nav: Dictionary["nav"];
  lang: string;
  className?: string;
}

export function AuthRolePicker({ mode, labels, nav, lang, className }: AuthRolePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = `auth-role-title-${mode}`;
  const descriptionId = `auth-role-description-${mode}`;

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = document.querySelectorAll<HTMLElement>(
        ".auth-role-dialog a[href], .auth-role-dialog button:not([disabled])",
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      triggerRef.current?.focus();
    };
  }, [isOpen]);

  function openDialog() {
    setSelectedRole(null);
    setIsOpen(true);
  }

  function handleBackdropClick(event: KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) setIsOpen(false);
  }

  const dialog = isOpen ? createPortal(
    <div className="auth-role-backdrop" onClick={handleBackdropClick}>
      <section
        className="auth-role-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <button
          ref={closeRef}
          className="auth-role-close"
          type="button"
          aria-label={labels.close}
          onClick={() => setIsOpen(false)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>
        <span className="auth-role-kicker notranslate" translate="no" aria-hidden="true">WAPromo</span>
        <h2 id={titleId}>{mode === "login" ? labels.loginTitle : labels.signupTitle}</h2>
        <p id={descriptionId} className="auth-role-description">{labels.description}</p>
        <div className="auth-role-options">
          <button
            className={`auth-role-option${selectedRole === "owner" ? " is-selected" : ""}`}
            type="button"
            aria-pressed={selectedRole === "owner"}
            onClick={() => setSelectedRole("owner")}
          >
            <span className="auth-role-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M3.5 10 12 3.5 20.5 10v9.5a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1V10Z" />
                <path d="M9 20.5v-7h6v7M3.5 10h17" />
              </svg>
            </span>
            <span className="auth-role-copy">
              <strong>{labels.owner}</strong>
              <span>{labels.ownerDescription}</span>
            </span>
            <span className="auth-role-check" aria-hidden="true">
              <svg viewBox="0 0 20 20"><path d="m4 10 4 4 8-8" /></svg>
            </span>
          </button>
          <button
            className={`auth-role-option${selectedRole === "customerService" ? " is-selected" : ""}`}
            type="button"
            aria-pressed={selectedRole === "customerService"}
            onClick={() => setSelectedRole("customerService")}
          >
            <span className="auth-role-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M4 13v-1a8 8 0 0 1 16 0v1M4 13H3v4h4v-4H4Zm16 0h1v4h-4v-4h3Z" />
                <path d="M20 17a5 5 0 0 1-5 4h-2" />
              </svg>
            </span>
            <span className="auth-role-copy">
              <strong>{labels.customerService}</strong>
              <span>{labels.customerServiceDescription}</span>
            </span>
            <span className="auth-role-check" aria-hidden="true">
              <svg viewBox="0 0 20 20"><path d="m4 10 4 4 8-8" /></svg>
            </span>
          </button>
        </div>
        {selectedRole === "owner" ? (
          <Link className="auth-role-next" href={`/${lang}/register-as-owner`}>
            {labels.next}
          </Link>
        ) : (
          <button className="auth-role-next" type="button" disabled={selectedRole === null}>
            {labels.next}
          </button>
        )}
      </section>
    </div>,
    document.body,
  ) : null;

  return (
    <>
      <button
        ref={triggerRef}
        className={className}
        type="button"
        aria-haspopup="dialog"
        onClick={openDialog}
      >
        {mode === "login" ? nav.login : nav.signup}
      </button>
      {dialog}
    </>
  );
}