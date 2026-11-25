# WA Promo Engineering Guide

WA Promo is purpose-built for unstable network connections and low-spec Android devices. Every code change must prioritize ultra-fast load times, buttery-smooth interactions, and minimal memory usage.

## Absolute Ban: Workspace Cleanliness (Zero Artifact Littering)

Every AI agent working on this repository must maintain strict workspace hygiene:
- **No Playwright / Browser MCP Artifact Littering:**
  - When running browser subagents, Playwright MCP, or automated testing, it is STRICTLY FORBIDDEN to leave temporary screenshots, video recordings, log dumps, or browser caches scattered across the root or subdirectories.
  - All test artifacts must be cleaned up immediately upon test completion. Test output directories (`test-results/`, `playwright-report/`, `.playwright/`, `blob-report/`, `playwright/.cache/`) MUST be ignored in `.gitignore`.
- **No Rogue / Scratch Files:**
  - STRICTLY FORBIDDEN from creating scratch files, experimental files (e.g., `temp.*`, `test.*`, `dummy.*`), or planning documents (`plan.md`, `todo.md`) inside the repository unless explicitly instructed by the user. All analysis, planning, and task tracking must stay within the chat/agent session context.
- **Strict Protection of Project Assets:**
  - Files required by the application (e.g., SVG logos, PWA icons, web manifest, official illustrations, project documentation) MUST NEVER be deleted or added to `.gitignore`. Only temporary/build/test garbage may be ignored.
- **Final Verification:**
  - Before completing any task, agents MUST verify that the workspace is 100% clean and free of leftover rogue files.

## Typography & Design Standards (Plus Jakarta Sans & Anti-Stacking)

- **Mandatory Plus Jakarta Sans Font:**
  - The official typography of the application is **Plus Jakarta Sans**, loaded via `next/font/google` with the CSS variable `--font-jakarta`.
  - This font is downloaded at local build time, producing **0 KB external requests to Google Fonts** in user browsers and delivering an instant Largest Contentful Paint (LCP).
  - For Arabic script, the system automatically falls back to native device system fonts (*Noto Sans Arabic* on Android/iOS) with zero additional font download payload.
- **Fluid Design & Anti-Stacking:**
  - Layouts must be spacious, modern, and professional.
  - H1 headings and key copy MUST NOT break or stack into cramped word-by-word columns. Always use fluid typography (`clamp()`) with proportional line heights so text flows gracefully across 2–3 lines on desktop and tablet screens.
  - All buttons and interactive elements must have a minimum touch target of 44px for comfortable touch navigation on Android smartphones.

## Mandatory All-Device Responsive Standards (Full-Width, Unbroken & Delightful)

- **Implicitly Mandatory Across All Devices:**
  - All AI agents working on this project MUST ensure every page, section, card, badge, and UI feature is 100% responsive across all devices (Smartphones 320px–430px, Tablets, and Desktops) **even if the developer's prompt does not explicitly mention responsiveness or mobile view**. Never wait to be reminded about mobile responsiveness.
  - Every UI change must look polished, intuitive, easy to understand at a glance, and visually delightful—never broken, clipped, skewed, or cramped.
- **Full-Width & Proportional Gutters:**
  - On smartphones, main sections must utilize the full viewport width; never constrain mobile screens with desktop/tablet `max-width` limits or excessive outer margins that make content feel squeezed.
  - Maintain consistent, proportional internal gutters (typically 12–16px) for text, navigation, and controls to ensure effortless readability without redundant outer margins.
  - Hero sections and core content areas must stretch to fit the viewport, while internal padding, multi-column grids (`minmax(0, 1fr)`), images, and previews stack and scale down fluidly with zero horizontal overflow.
- **Strict CSS Cascade & Anti-Overflow Discipline:**
  - Responsive media queries (`@media (max-width: 900px)`, `768px`, `480px`) in `globals.css` MUST ALWAYS be placed **after** all base desktop component styles (at the bottom of the stylesheet) so base desktop styles never override mobile rules due to CSS cascade order.
  - STRICTLY FORBIDDEN from applying rigid `flex-shrink: 0` or `white-space: nowrap` on badges, callouts, or pills containing long localized sentences without responsive wrapping (`max-width: 100%`, `min-width: 0`, `word-break: break-word`, `box-sizing: border-box`).
- **Mandatory Multi-Viewport Verification:**
  - Validate every layout change across 320px, 360px, 390px, 430px viewports, tablets, and desktop screens (in both LTR and Arabic RTL `/ar`); verify that text never clips or stacks awkwardly, controls remain 100% accessible, and horizontal scrolling never occurs.

## Mandatory Global Theme Standards (System, Light, Dark)

- All AI agents working on this project MUST ensure every page, component, and UI feature is fully synchronized across three theme modes: `System`, `Light`, and `Dark`, even if a prompt does not explicitly mention them. Never ignore theme parity.
- `System` MUST follow device preferences via `prefers-color-scheme`, including live OS theme changes while the application is active. `Light` and `Dark` are explicit overrides.
- User preference MUST persist across page navigation, route transitions, and language switches. Switching languages or features must never reset theme state.
- Always use semantic CSS variables for background, text, border, surface, status, hover, focus, and disabled states. NEVER introduce hardcoded colors for general UI unless paired with readable equivalents across all three themes.
- Every new surface or color MUST be verified in `System` mode (under both light and dark OS settings), as well as explicit `Light` and `Dark` modes. Audit dropdowns, drawers, dialogs, forms, cards, keyboard focus states, text contrast, and hover effects.

## Workspace & Landing Page Color Harmony (Ergonomic Dark Workspace)

- **Core Ergonomics Principle:**
  - The WhatsApp workspace (Dashboard / Team Inbox) is where users (customer service reps, admins, business owners) work intensively for hours every single day.
  - Both the landing page and workspace MUST evoke a sense of **professionalism, comfort, safety, serenity, and delight** (anti-eye strain / chromatic fatigue-free).
  - STRICTLY FORBIDDEN from using oversaturated, heavy forest-green dark backgrounds for primary canvases; excessive green saturation causes chromatic eye fatigue and reduces message readability.
- **Ergonomic Dark Mode Palette:**
  - **Canvas & Paper (`--paper`)**: Cool Dark Charcoal-Emerald (`#0C1311`), not muddy green. Aligns with the gold standard of WhatsApp Web Dark (`#0B141A` / `#111B21`).
  - **Surfaces & Panels (`--surface-soft`, `--surface-subtle`)**: Refined charcoal gray levels (`#14201C`, `#111A17`) to distinguish sidebars and chat lists without blinding contrast.
  - **Outgoing Message Bubble (`--surface-outgoing`)**: Official WhatsApp Dark Emerald (`#0A5243`) with crisp white-tinted text (`#EAFFF7`), providing instant visual confirmation that a message was sent.
  - **Incoming Message Bubble**: Cool neutral surface with sharp text contrast, instantly distinguishing customer inquiries from team responses.
  - **Primary Brand Accent (`--green`)**: WhatsApp Emerald Green (`#0FA97F` in light mode, `#19B98A` in dark mode) for CTAs, online/live status indicators, badges, and active states.
- **100% Visual Parity Between Landing Page & Dashboard:**
  - The hero inbox mockup and the real dashboard application MUST share the exact same semantic CSS variables from `globals.css`.
  - The user journey from landing page login into the dashboard workspace must feel completely unified, seamless, and harmonious.

## International Multilingual Standards (5 Golden Languages)

WAPromo targets the world's largest WhatsApp markets across 5 official languages:
1. `id` = 🇮🇩 **Bahasa Indonesia** (#3 global market)
2. `en` = 🌐 **English** (Global reach: India #1, US #4, Philippines #5, Pakistan #10)
3. `pt` = 🇧🇷 **Português do Brasil** (#2 global market)
4. `es` = 🇪🇸 **Español** (Mexico #6 global market & Latin America)
5. `ar` = 🇸🇦 **العربية** (Egypt #9 global market, Saudi Arabia, UAE, Middle East)

- **No Hardcoded Text:**
  - Direct hardcoded user-facing strings are STRICTLY FORBIDDEN in UI components.
  - Every new string MUST be registered across all 5 dictionary files in `frontend/src/dictionaries/` (`id.json`, `en.json`, `pt.json`, `es.json`, `ar.json`).
- **Language Detection & Routing:**
  - Root visits to `wapromo.id` automatically detect browser/device language without slow redirects (0ms latency).
  - Explicit subpaths (`/id`, `/en`, `/pt`, `/es`, `/ar`) are provided for manual selection and Googlebot crawling.
- **UI Shell vs Universal Chat Engine:**
  - Dictionaries apply ONLY to the UI shell (navigation, buttons, settings, pricing cards, system alerts).
  - Chat messages and Team Inbox conversations are **100% UNIVERSAL (raw UTF-8)**: users and customers worldwide can send any script (Japanese Kanji/Hiragana, Arabic, Mandarin, Korean, Hindi, Cyrillic, Thai, regional scripts, emojis). The database and chat engine must never corrupt or restrict message character encodings.
- **Browser Auto-Translate Handling:**
  - **Brand & Switcher Protection**: The `LanguageSwitcher` component, language codes, and the brand name "WAPromo" MUST include `translate="no"` and class `notranslate` to prevent distortion by Google Translate, Safari, or Edge.
  - **Real-Time Sync**: `LanguageSwitcher` must monitor changes to the `<html>` `lang` attribute via `MutationObserver` to detect when browsers dynamically auto-translate pages.
  - **Clean Dropdown Without Junk Labels**:
    - When a browser translates to a language outside the 5 golden languages (e.g., Japanese 🇯🇵, German 🇩🇪, French 🇫🇷), the translated language appears at the **top** with an active checkmark (`✓`).
    - Native system language options must not display confusing duplicate checkmarks.
    - Never show clutter like "auto" or "machine translated"; display only clean, official emoji flags and language names.

## RTL Standards (Arabic) & Zero Horizontal Scroll

- When Arabic (`ar`) is active, `<html lang="ar" dir="rtl">` must be applied.
- **Zero Horizontal Scroll Responsibility:**
  - STRICTLY FORBIDDEN from allowing horizontal scroll (`overflow-x`) on either LTR or Arabic RTL routes (`/ar`).
  - `html` and `body` MUST enforce `overflow-x: clip;` and `max-width: 100vw;`.
  - Off-canvas components (mobile drawers, modals, popups) MUST NOT use off-screen `transform: translateX(...)` that causes RTL browsers to expand scroll width into negative coordinate space. Off-canvas components must unmount when closed (`{isOpen && ...}`) or use `display: none`.
  - Directional indicators like navigation arrows (`→`) MUST automatically mirror (`scaleX(-1)`) in RTL to align with Arabic reading flow (pointing left).
- **CSS Logical Properties Standard:**
  - Use `margin-inline-start` / `margin-inline-end` (not `margin-left` / `margin-right`).
  - Use `padding-inline-start` / `padding-inline-end` (not `padding-left` / `padding-right`).
  - Use `inset-inline-start` / `inset-inline-end` (not `left` / `right`).
  - Use `border-inline-start` / `border-inline-end` (not `border-left` / `border-right`).
  - Use `text-align: start` (not `text-align: left`).
  - Message alignment naturally mirrors in Arabic (incoming on start/right, outgoing on end/left).
- **Multi-Width RTL Validation:**
  - Any visual change MUST be validated on `/ar` at 320px, 360px, 390px, and 430px viewports to ensure zero stray whitespace, truncated text, or broken layouts.

## SEO & Metadata Standards (Targeting #1 Google Ranking)

- **Canonical Domain:** Base canonical URL is `https://wapromo.id`.
- **Mandatory Single Pipe Separator (` | `):**
  - STRICTLY FORBIDDEN from using em dashes (`—`) or repeating hyphens as title separators.
  - MUST use a single pipe (` | `) because it occupies the lowest pixel width on mobile Google SERPs, prevents truncated titles (`...`), and provides sharp visual contrast to increase CTR.
- **Keyword Front-Loading:**
  - Position primary target keywords at the very beginning of the title before the brand name.
  - Pattern: `[Primary Keyword & Core Benefit] | WAPromo`.
  - Root Next.js layout must configure template: `template: "%s | WAPromo"`.
- **Official Multilingual Alternate Tags (`hreflang`):**
  - Every page must render `<link rel="alternate" hreflang="..." />` for all 5 languages, with `x-default` targeting `/en`.
- **Character & Pixel Limits:**
  - `title`: 50–60 characters (target < 580px width).
  - `description`: 130–160 characters, concise, including primary keywords and an explicit call to action (CTA).
- **Core Web Vitals as #1 SEO Factor:**
  - Never inject heavy third-party marketing or tracking scripts that degrade LCP or INP scores.

## Package Manager Standards (pnpm Strictly Required)

- This project is a monorepo managed with **pnpm workspaces** (`packageManager: pnpm@12.11.2`).
- STRICTLY FORBIDDEN from using `npm` or `yarn` for package installs, builds, or script execution.
- Always execute commands using official `pnpm` from the monorepo root:
  - `pnpm dev` (runs frontend and backend concurrently)
  - `pnpm build` (runs production frontend build)
  - `pnpm typecheck` (typechecks TypeScript in frontend & backend)
  - `pnpm --dir frontend <command>` or `pnpm --dir backend <command>` (scoped execution)

## WhatsApp Phone Number Standards & Auto-Sanitization (Postel's Law)

WAPromo connects directly with WhatsApp messaging engines (Baileys, WhatsApp Cloud API, Webhooks). Any discrepancy in phone number format breaks automated messaging, welcome notifications, and OTP delivery. All AI agents working on frontend or backend MUST enforce the following standards:

- **Core Rule: Postel's Law (Robustness Principle):**
  - *"Be conservative in what you send, be liberal in what you accept."*
  - **In Database & WhatsApp Engine**: Phone numbers MUST ALWAYS be stored and transmitted as **pure digits in international E.164 format without `+`, without spaces, without hyphens, and without local trunk prefix `0`** (e.g., `6281234567890` for Indonesia, `15551234567` for US). The internal WhatsApp JID format is ALWAYS `[digits]@s.whatsapp.net`.
  - **In Frontend UI & Registration Forms**: STRICTLY FORBIDDEN from punishing users with validation errors just because they typed `+`, spaces, dashes, or local `08...`. Forms must be 100% lenient and accept any human format, while automatic sanitization normalizes the number in real time or upon submission.

- **Standard Multi-Country Country Codes & Normalization Pipeline:**
  Shared implementation in `frontend/src/lib/phone.ts` (`normalizeWhatsAppNumber`, `isValidWhatsAppNumber`, `toWhatsAppJid`):
  1. Strip all non-digit characters (`\D` regex removes `+`, `-`, spaces, parentheses, dots).
  2. Normalize international double-zero prefixes: if starting with `00`, strip the leading `00`.
  3. Normalize local trunk prefixes based on active locale / country:
     - 🇮🇩 **Indonesia (`id`)**: Leading `0` is replaced with `62` (e.g., `081234567890` -> `6281234567890`). Leading `8` (without 0 or 62) also gets prefixed with `62`.
     - 🇧🇷 **Brazil (`pt`)**: Local numbers starting with DDD area codes (10–11 digits) get prefixed with `55` (e.g., `011912345678` -> `5511912345678`, `11912345678` -> `5511912345678`).
     - 🇸🇦 **Saudi Arabia / Middle East (`ar`)**: Leading `05` is replaced with `9665` (e.g., `0501234567` -> `966501234567`).
     - 🇪🇸 **Spain (`es`)**: 9-digit mobile numbers starting with 6 or 7 get prefixed with `34` (e.g., `612345678` -> `34612345678`).
     - 🌐 **Global / US (`en`)**: 10-digit US/Canada numbers without country code get prefixed with `1` (e.g., `5551234567` -> `15551234567`).
  4. Final validation: Must match pure digits `^[1-9]\d{7,14}$` (ITU E.164 standard: 8 to 15 digits).

- **Country Selector Forms (Flag + Dial Code + Number Field):**
  - Registration forms use a unified phone box with a searchable worldwide country selector (242 countries & territories, ISO 3166-1 alpha-2, flags generated from the ISO code via `isoToFlag`, never hand-typed). Data lives in `frontend/src/lib/phone.ts` (`ALL_COUNTRIES`).
  - Because the dial code is already chosen in the selector, the number field MUST NEVER keep `+`, spaces, dashes, or any non-digit. Typed `+` is ignored silently; there must be no error message.
  - Pasted or browser-autofilled values (e.g. `+62 812-3456-7890`, `0062...`, or digits already starting with the selected dial code) MUST be cleaned automatically with `sanitizePhoneInput`: the country code is removed from the field and, when it differs from the selected country, the selector switches to the detected country (longest dial-code match via `detectCountryFromInternationalDigits`).
  - The hidden fields `phoneCountryIso`, `phoneDialCode`, and `phoneNormalized` (pure E.164 digits) are what the backend must trust. The backend MUST re-run the same normalization and `^[1-9]\d{7,14}$` validation and never rely on client-side sanitization alone.

- **UI Copy & Placeholder Best Practices:**
  - Phone labels must remain friendly, natural, and never patronizing (e.g., "WhatsApp number", "Nomor WhatsApp").
  - Placeholders must illustrate both familiar local and standard formats (e.g., "Contoh: 081234567890 atau 6281234567890") so laypeople feel immediate comfort typing their number.

## Initial Structure

- `frontend/`: Next.js for web and PWA.
- `backend/`: Hono for API endpoints.

## Absolute Ban: Unauthorized Deployment & Git Push

- **Zero Unauthorized Deployment:**
  - All AI agents (Antigravity, Copilot, Cursor, Claude, Gemini, etc.) are **STRICTLY FORBIDDEN** from running deployment commands to any platform (Vercel, Cloudflare, AWS, Supabase, VPS, etc.) via CLI (`vercel`, `vercel --prod`, etc.), MCP tools, automated scripts, or APIs.
  - Deployments MAY ONLY be executed if and ONLY if there is an explicit, unambiguous, written instruction from the user (e.g., *"Please deploy now to Vercel"*). Without this exact instruction, never assume or initiate deployment.
- **Strictly Forbidden Git Push Without Explicit Command:**
  - Agents are **STRICTLY FORBIDDEN** from executing `git push` to any remote repository (GitHub, GitLab, etc.), creating new remotes, or publishing local branches to remotes without direct, explicit instructions from the user.
  - Any unauthorized deployment or push is considered a critical policy violation.
