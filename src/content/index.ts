import type { SiteContent } from './types'
import { profile } from './profile'
import { projects } from './projects'
import { publications } from './publications'
import { awards } from './awards'
import { patents } from './patents'
import { media } from './media'
import { experience } from './experience'
import { skills } from './skills'

/**
 * Content loading with Admin overrides.
 *
 * The source of truth is the TypeScript files in this folder. The /admin page
 * writes an override JSON into localStorage under OVERRIDE_KEY; at runtime the
 * override is merged over the defaults, so edits made in the browser show up
 * instantly without touching code.
 *
 * To make Admin edits permanent: /admin → Export JSON, then ask any AI
 * (or a developer) to merge it back into these files.
 */
export const OVERRIDE_KEY = 'jw-content-override-v1'

export const defaultContent: SiteContent = {
  profile,
  projects,
  publications,
  awards,
  patents,
  media,
  experience,
  skills,
}

function readOverride(): Partial<SiteContent> | null {
  try {
    const raw = localStorage.getItem(OVERRIDE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as Partial<SiteContent>
  } catch {
    return null
  }
}

/** Merged site content: defaults + whatever the Admin page has overridden. */
export function getContent(): SiteContent {
  const o = readOverride()
  if (!o) return defaultContent
  return {
    profile: o.profile ?? defaultContent.profile,
    projects: o.projects ?? defaultContent.projects,
    publications: o.publications ?? defaultContent.publications,
    awards: o.awards ?? defaultContent.awards,
    patents: o.patents ?? defaultContent.patents,
    media: o.media ?? defaultContent.media,
    experience: o.experience ?? defaultContent.experience,
    skills: o.skills ?? defaultContent.skills,
  }
}

export function saveOverride(patch: Partial<SiteContent>) {
  const current = readOverride() ?? {}
  localStorage.setItem(OVERRIDE_KEY, JSON.stringify({ ...current, ...patch }))
  // Notify all pages that content changed
  window.dispatchEvent(new Event('jw-content-changed'))
}

export function clearOverride() {
  localStorage.removeItem(OVERRIDE_KEY)
  window.dispatchEvent(new Event('jw-content-changed'))
}

export function hasOverride(): boolean {
  return readOverride() !== null
}

export type { SiteContent }
export type * from './types'
