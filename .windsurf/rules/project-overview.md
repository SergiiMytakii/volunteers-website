---
trigger: always_on
description: "Project overview and working rules for volunteers-app (Next.js)"
---

# Project Overview and Working Rules

## Must-know
- __Stack__: Next.js 15 (App Router), React 19 RC, TypeScript (strict), Tailwind CSS, Swiper, google-spreadsheet + JWT, Nodemailer (Zoho SMTP). Firebase configured but not actively used.
- __Key pages__: `/` (`src/app/page.tsx`), `/super-hero` (`src/app/super-hero/page.tsx`), `/about-us`, `/diva-traplaytsya`.
- __Layout__: `src/app/layout.tsx` uses `LanguageProvider` and renders `Navigation` + `Footer`.
- __Images__: Next Image allowed domain `firebasestorage.googleapis.com` (`next.config.ts`).

## Data flow
- __Google Sheets APIs__ (server):
  - `src/app/api/sheets/route.ts` → sheet `cards`.
  - `src/app/api/superHeroSheets/route.ts` → sheet `superHero-cards` (includes `desiredAmount`, `funded`).
  - `src/app/api/translations/**` → per-section translation sheets (e.g., `superHero-help`).
  - `src/app/api/images/**` → image lists per section.
- __Client usage__:
  - `src/service/SheetService.ts` provides cached pagination: `getChildrenData(page, limit, endpoint)`.
  - Components fetch translations directly (e.g., `HowToHelp.tsx`, `ContactForm.tsx`).
- __Forms & donations__:
  - Contact form posts to `/api/submitForm` (updates `cards`) then `/api/sendEmail` (Zoho).
  - Donations post to `/api/submitDonation` + `/api/sendEmailDonation`, then open Mono or PayPal.

## State and Localization
- Language context: 
   src/app/LanguageContext.tsx
- Detects browser language (en vs uk) on mount and provides lang to components.
   Components fetch language-specific text from translation endpoints (e.g., HowToHelp.tsx, ContactForm.tsx).

## Styling and Media
   Tailwind CSS: tailwind.config.ts includes src/app, src/components, src/pages globs.
   Images: Next Image configured for Firebase Storage domain:  next.config.ts (images.domains).

## Coding conventions (repo-specific)
- TypeScript strict, avoid `any` (only if unavoidable).
- Keep client/server components clear; add `'use client'` only when needed.
- API responses: prefer `{ data: [...] }` for list endpoints; keep shapes consistent across routes.
- Translations: accept `?lang` when needed; otherwise return full list `{ data }` and filter client-side.
- When adding new data fields, update both the API route mapping and `src/models/ChildrenData.ts`, and adjust consuming components.

## Known issues to address
- `src/service/SheetService.ts` cache clear interval is `360000` ms (~6 min) but comment says 1h. Set to `3600000` or fix the comment.
- `HowToHelp.tsx` placeholder/error images reference `logoTransperentOrange.png`/`logoTransparentOrange.png`. Verify actual files in `public/`.
- `ContactForm.tsx` input name `kidname` vs state `kidName`. Align naming.
- Remove legacy `src/next.config.js`; use root `next.config.ts`.
- Version alignment: React 19 RC with `@types/react@18`. Ensure compatibility with Next 15 or align versions.

## Run / build / lint
- Dev: `npm run dev`
- Build: `npm run build` → `npm start`
- Lint: `npm run lint`

## PR checklist
- __Secrets__: none committed; env vars used via `process.env`.
- __Types__: models, APIs, and components updated together.
- __APIs__: consistent response shapes; loading/error handled in UI.
- __Assets__: image domains configured; assets exist; links validated.
- __Docs__: README updated when adding features/envs.