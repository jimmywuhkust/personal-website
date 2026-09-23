/**
 * Content type definitions for the whole site.
 * Every user-facing string is a `LText` — the same content in three languages.
 * Admin overrides are stored as `SiteContent` JSON in localStorage.
 */

export type Lang = 'en' | 'zhHant' | 'zhHans'

/** A piece of text in all three languages. */
export interface LText {
  en: string
  zhHant: string
  zhHans: string
}

export interface Profile {
  name: LText
  role: LText
  tagline: LText
  bio: LText[] // paragraphs
  location: LText
  email: string // leave empty to hide
  affiliation: LText
  portrait: string // path under public/, e.g. /images/jimmy-portrait.jpg
  researchInterests: string[]
  links: { label: string; url: string }[]
}

export type ProjectCategory = 'hardware' | 'software' | 'research' | 'design'

export interface Collaborator {
  name: string
  role: LText
  url?: string
}

export interface ProjectLink {
  label: LText
  url: string
}

export interface Project {
  id: string // url slug, e.g. /projects/aerorelief
  title: LText
  tagline: LText
  description: LText // long form, shown on detail page
  category: ProjectCategory
  year: string // e.g. "2024 — Now"
  role: LText
  status: LText // e.g. "Ongoing" / "Deployed"
  collaborators: Collaborator[]
  links: ProjectLink[]
  tags: string[]
  skills?: string[] // skill ids from skills.ts — used to cross-link projects ⇄ toolbox
  highlights: LText[] // bullet points on detail page
  featured: boolean // shown on home page
  image?: string // card/hero image, path under public/ e.g. /images/aerorelief-1.jpg
  images?: string[] // gallery on the detail page
  videoUrl?: string // embeddable video URL (YouTube/Vimeo embed src) shown on detail page
  modelUrl?: string // GLB/GLTF 3D model (e.g. PCB export) shown with orbit controls
  deckUrl?: string // PDF shown as a 3D flipbook (pitch decks, slides)
}

export interface Publication {
  id: string
  title: string // paper titles stay in English
  authors: string
  venue: string
  year: string
  type: 'conference' | 'journal' | 'workshop' | 'art' | 'demo'
  url?: string
  note?: LText // e.g. award note
  logo?: string // venue logo in public/logos/
  firstAuthor?: boolean // true → shows a "First author" badge
}

export interface Award {
  id: string
  title: LText
  issuer: LText
  date: string // ISO-ish, e.g. "2026-03"
  project?: string // project id this award belongs to
  url?: string
  logo?: string // issuer logo in public/logos/
  image?: string // award photo (ceremony, certificate) in public/images/
}

export interface Patent {
  id: string
  title: LText
  number: string // application / publication number
  status: LText // e.g. "Filed" / "Granted"
  date: string
  inventors: string
  url?: string
}

export interface MediaItem {
  id: string
  date: string // "2025-11-18"
  outlet: string // "CNN"
  title: LText
  summary: LText
  url: string
  kind: 'video' | 'article' | 'interview' | 'post'
  image?: string // thumbnail, path under public/
  logo?: string // outlet logo in public/logos/
  major?: boolean // true → press coverage shown as a big node on the timeline; minor items are small dots
}

export interface Experience {
  id: string
  role: LText
  org: LText
  period: string // e.g. "Mar 2025 — Present"
  kind: 'work' | 'leadership' | 'volunteer'
}

export interface Skill {
  id: string
  name: string // software/tool names stay in English (e.g. "Blender")
  level: 'pro' | 'learning' // pro = confident/semi-proficient, learning = beginner/intermediate
  icon?: string // icon in public/icons/ (simple-icons svg)
}

export interface SiteContent {
  profile: Profile
  projects: Project[]
  publications: Publication[]
  awards: Award[]
  patents: Patent[]
  media: MediaItem[]
  experience: Experience[]
  skills: Skill[]
}
