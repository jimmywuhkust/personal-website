# Jimmy Wu — Personal Website

Personal website of **WU Chun Ming (Jimmy Wu 胡駿銘)** — projects, academic
publications, awards, patents and media coverage, in three languages
(English / 繁體中文 / 简体中文), responsive for phone and desktop, with a
built-in Admin page for editing content without touching code.

## Quick start

```bash
npm install
npm run dev      # dev server → http://localhost:3000
npm run build    # production build → dist/
npm run preview  # serve the production build
```

Stack: **React 19 + TypeScript + Vite + Tailwind CSS + shadcn/ui + react-router**.
No backend — the site is a static app; `dist/` can be hosted anywhere
(Vercel, Netlify, GitHub Pages…).

## Where everything lives

| What | Where |
|---|---|
| All site content (text, projects, papers…) | `src/content/*.ts` |
| UI strings (nav, buttons, section titles) | `src/i18n/index.tsx` → `uiStrings` |
| Pages | `src/pages/*.tsx` |
| Reusable components | `src/components/` |
| Visual effects (particles, tilt, reveal) | `src/components/effects/` |
| CV file served by the Download CV button | `public/cv.pdf` |
| CV regeneration script | `scripts/generate_cv.py` |
| Detailed maintenance guide | `docs/MAINTENANCE.md` |
| Server auto-deploy setup | `docs/DEPLOYMENT.md` |

## Deploying

Push to `main` builds the site in CI. To auto-deploy `dist/` to your own
server over SSH, follow `docs/DEPLOYMENT.md` (one-time secrets setup, then
every push deploys itself).

## Editing content — two ways

1. **Admin page (no code):** open `/admin` directly (nothing links to it —
   it's behind a password gate; default password `aerorelief-admin`, change it
   in `src/admin-auth.ts`). Pick a section, edit in the form, Save. Edits apply
   instantly and persist in your browser (localStorage).
   Use **Export JSON** to keep a permanent copy — hand that file to any AI
   and ask it to merge the changes into `src/content/` to make them part of
   the source code.
2. **Edit the data files directly:** everything is plain typed TypeScript in
   `src/content/` — see `docs/MAINTENANCE.md` for the exact shapes.

## Languages

The language switcher (EN / 繁 / 简) is in the navbar. Choice persists in
localStorage; `?lang=en|zh-hant|zh-hans` in the URL also works. Every piece
of content is an `LText` object with `en` / `zhHant` / `zhHans` fields.

## Design notes

- Dark cinematic theme by default; sun/moon toggle switches to a light
  (white background, black text) theme. Persisted in localStorage.
- 3D effects (particle field, tilt cards) are desktop-only and automatically
  disabled on mobile and for users with `prefers-reduced-motion`.
- The media page is an interactive timeline: a drawn line with hover-lift
  cards on desktop, a vertical dot rail on mobile.
