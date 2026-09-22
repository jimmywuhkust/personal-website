# Maintenance Guide — Jimmy Wu Personal Website

写给未来的 Jimmy 或任何一个 AI：这个文件告诉你这个网站怎么改、怎么加内容、怎么避免踩坑。

## 1. Architecture at a glance

```
src/
  content/          ← ALL site content lives here (typed TypeScript data)
    types.ts        ← type definitions (LText, Project, Publication, …)
    profile.ts      ← identity, bio, links, research interests
    projects.ts     ← project entries (detail pages are generated from these)
    publications.ts ← papers
    awards.ts       ← awards & honours
    patents.ts      ← patent entries (empty array for now)
    media.ts        ← media coverage timeline entries
    experience.ts   ← work / leadership / volunteering timeline (home page)
    skills.ts       ← software/tool skills with icon + level (home Toolbox)
    index.ts        ← getContent(): merges defaults + Admin localStorage override
  i18n/
    index.tsx       ← LanguageProvider, useLang(), uiStrings (UI chrome text)
  hooks/
    theme.tsx       ← ThemeProvider (dark default / light), useTheme()
    useReveal.ts    ← IntersectionObserver scroll-reveal hook
  components/
    layout/         ← Navbar, Footer
    effects/        ← ParticleField, TiltCard, Reveal
    MediaTimeline.tsx, ProjectCard.tsx
  pages/            ← one file per route (Home, Projects, ProjectDetail, …)
  App.tsx           ← routes + providers
public/
  cv.pdf            ← what the Download CV button serves
scripts/
  generate_cv.py    ← regenerates public/cv.pdf (edit DATA dict, re-run)
```

Routes: `/` `/projects` `/projects/:id` `/academic` `/awards` `/patents` `/media` `/admin`

## 2. The golden rule: content is data, not markup

Never hard-code display text inside page/component files. Everything the
visitor reads comes from `src/content/` (content) or `uiStrings` (UI chrome).

Every user-facing string is an **`LText`**:

```ts
{ en: 'English text', zhHant: '繁體中文', zhHans: '简体中文' }
```

Components pick the right language with `lt(...)` from `useLang()`.
If you add a field to a type, add it in `types.ts` first, then fill it in the
data file, then render it in the page.

## 3. How to add / edit content

### Add a project (`src/content/projects.ts`)

Append to the `projects` array:

- `id` — URL slug; **never change it once published** (links break).
- `featured: true` — shows on the home page (keep to 2 featured max).
- `category` — one of `hardware | software | research | design`
  (drives the card's gradient colour and the filter on /projects).
- `collaborators` — `{ name, role: LText, url? }[]`.
- `highlights` — `LText[]`, bullet points on the detail page.
- The detail page `/projects/<id>` is generated automatically — no new page needed.

### Add a publication / award / patent / media / experience item

Same pattern: append an object to the matching array in `src/content/`.
Field shapes are documented with comments at the top of each file and in
`types.ts`. Media items render newest-first by `date` (`YYYY-MM-DD`);
`kind` is `video | article | interview | post` (drives the icon).
Publication `type` is `conference | journal | workshop | art | demo`.

### Images & logos

Local images live in `public/images/` and are referenced as
`/images/<file>.jpg`; brand logos live in `public/logos/` as
`/logos/<file>.(png|svg)`:

- `profile.portrait` — home About section photo
- `project.image` — card cover + detail hero backdrop; `project.images` —
  detail-page gallery grid; `project.videoUrl` — embeddable video
  (YouTube/Vimeo embed src) shown atop the detail page
- `project.modelUrl` — **3D model preview** (GLB/GLTF) via `<model-viewer>`;
  orbit + auto-rotate. Export PCBs to GLB from KiCad (STEP → Blender → GLB).
- `project.deckUrl` — **PDF flipbook** (pitch decks/slides) with 3D page-turn
  animation (pdf.js + page-flip, lazy-loaded only when used)
- `media.image` — showcase panel photo; `media.logo` — outlet logo on nodes
- `award.logo` — issuer logo; `award.image` — ceremony/certificate photo
- `publication.logo` — venue logo; `publication.firstAuthor: true` shows a
  First-author badge. The Academic page auto-highlights the owner’s name in
  author lists (edit the `NAMES` list in `src/pages/Academic.tsx` if his
  name appears in a new spelling).
- `skill.icon` — software icons in `public/icons/` (from simple-icons CDN);
  omit for a monogram tile; `level` is `pro` or `learning` (two tiers)

Any item without a `logo` falls back to a gradient monogram tile
(`src/components/BrandLogo.tsx`) — never a broken image.

Keep images under ~300 KB (resize ≤1600px, JPEG q≈82). The PIL one-liner in
git history / any image tool does this; the originals were compressed with
`Image.thumbnail((1600,1600))` + `save(quality=82, optimize=True)`.

### Add / change a UI label (nav, buttons, section titles)

Edit `uiStrings` in `src/i18n/index.tsx` — always fill all three languages.
Use it in components with `t('your.key')`.

## 4. The Admin page (`/admin`)

- **Hidden + password-gated.** Nothing on the site links to it; the route
  renders a login screen until you enter the password. Password is stored as
  a SHA-256 hash in `src/admin-auth.ts` — to change it:
  `echo -n "your-new-password" | shasum -a 256` and paste the hex into
  `ADMIN_HASH`. (Default: `aerorelief-admin`.)
- Login state lasts for the browser tab session (`sessionStorage`).
- Edits are written to `localStorage` under key `jw-content-override-v1` and
  merged over the code defaults at runtime (`getContent()` in
  `src/content/index.ts`). Nothing is sent anywhere; it is per-browser.
- **Form mode** edits fields directly; tri-lingual fields show EN/繁/简 rows;
  nested structures (collaborators, links) edit as validated JSON.
- **Raw JSON mode** edits the whole section as JSON.
- **Export JSON** downloads the full current content → hand to an AI and say
  "merge this into src/content" to make browser edits permanent.
- **Reset all edits** clears the override and restores code defaults.
- After changing `types.ts` shapes, old overrides may mismatch — Reset once
  and re-enter.
- Honest security note: this is a static site, so the gate is client-side.
  It keeps casual visitors out, and that's sufficient because Admin edits
  only ever affect the visitor's own browser — never the shipped content.
  For hard security on a public deployment, add server-side/basic auth on
  the `/admin` path at your host.

## 5. CV

- The Download CV button serves `public/cv.pdf`.
- To regenerate: edit the `DATA` dict in `scripts/generate_cv.py`, then run
  `python3 scripts/generate_cv.py` from the project root (needs `reportlab`).
- Or simply overwrite `public/cv.pdf` with any PDF exported from Word/LaTeX.

## 6. Theming & motion

- CSS variables in `src/index.css` (`:root` = light, `.dark` = dark).
  Brand colours: `--brand` (cyan) and `--brand-2` (amber), used as
  `hsl(var(--brand))`.
- Dark is the default theme; the navbar toggle persists to `jw-theme`.
- Language persists to `jw-lang`.
- All animation CSS classes live at the bottom of `src/index.css`
  (`.reveal`, `.timeline-*`, `.glass-card`, `.text-gradient`, …) and are
  disabled under `prefers-reduced-motion`.
- `ParticleField` renders nothing below 768px width or with reduced motion —
  keep it that way for mobile performance.

## 7. Common tasks for an AI assistant

| Request | Do this |
|---|---|
| "Add my new award" | Append to `src/content/awards.ts`, fill all 3 languages |
| "New paper accepted" | Append to `src/content/publications.ts` |
| "Add a media report" | Append to `src/content/media.ts` with a real URL; add outlet logo to `public/logos/` |
| "New job / role" | Append to `src/content/experience.ts` |
| "Add a project photo" | Drop the file in `public/images/`, set `image`/`images` on the project |
| "Embed a video in a project" | Set `videoUrl` (YouTube/Vimeo **embed** URL) on the project |
| "Add award ceremony photo" | Set `image` on the award entry |
| "Rename a section" | Edit `uiStrings` in `src/i18n/index.tsx` |
| "Change colours" | Edit CSS vars in `src/index.css` |
| "New top-level page" | Create `src/pages/X.tsx`, add Route in `App.tsx`, nav item in `Navbar.tsx` + `uiStrings` |
| "Update my bio" | Edit `profile.bio` in `src/content/profile.ts` |
| "Refresh the CV" | Edit `scripts/generate_cv.py` DATA, re-run it |

Always run `npm run build` afterwards to catch type errors.

## 8. Known limitations (by design)

- **No backend.** Admin edits live in the browser only; Export/Import JSON is
  the sync mechanism. If you later want real server-side persistence, add a
  tiny API and swap the override read/write in `src/content/index.ts`.
- **BrowserRouter** needs SPA fallback on static hosts (Vercel/Netlify: add a
  rewrite to `/index.html`; GitHub Pages: consider switching to HashRouter).
- Patent list is intentionally empty until real entries are provided.
- `profile.email` is empty → the site hides it; fill it in to show contact.
