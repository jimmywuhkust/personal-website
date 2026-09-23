import { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import type { MediaItem } from '../content/types'
import { useLang } from '../i18n'
import BrandLogo from './BrandLogo'
import { cn } from '@/lib/utils'

function fmtDate(iso: string, lang: string) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString(lang === 'en' ? 'en-GB' : lang === 'zhHant' ? 'zh-HK' : 'zh-CN', {
    year: 'numeric',
    month: 'short',
  })
}

function fmtDateLong(iso: string, lang: string) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString(lang === 'en' ? 'en-GB' : lang === 'zhHant' ? 'zh-HK' : 'zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Media coverage timeline.
 * - Desktop: sticky showcase panel on the left, a straight vertical timeline on
 *   the right. Hovering/clicking any node swaps the showcase — it stays on
 *   screen while you scroll, so the detail is always visible.
 *   Major press (CNN, RTHK, TVB…) get big logo nodes; minor mentions are small
 *   dots whose title appears on hover.
 * - Mobile: vertical rail — full cards for major items, compact rows for minor.
 */
export default function MediaTimeline({ items }: { items: MediaItem[] }) {
  const { lang, lt } = useLang()
  const sorted = [...items].sort((a, b) => b.date.localeCompare(a.date))
  const [activeId, setActiveId] = useState<string | null>(null)
  const active = sorted.find((m) => m.id === activeId) ?? sorted[0]

  if (sorted.length === 0) return null

  /* ---------------- Mobile / narrow: rail of cards ---------------- */
  const mobileRail = (
    <div className="relative pl-9 lg:hidden">
      <div className="absolute bottom-2 left-[15px] top-2 w-px bg-gradient-to-b from-[hsl(var(--brand))] to-[hsl(var(--brand-2))] opacity-60" />
      <div className="space-y-5">
        {sorted.map((m) =>
          m.major ? (
            <a
              key={m.id}
              href={m.url}
              target="_blank"
              rel="noreferrer"
              className="glass-card relative block overflow-hidden p-4 active:scale-[0.98]"
            >
              <span className="pulse-glow absolute -left-9 top-5">
                <BrandLogo src={m.logo} name={m.outlet} size={32} className="rounded-full" />
              </span>
              {m.image && (
                <img
                  src={m.image}
                  alt={lt(m.title)}
                  loading="lazy"
                  className="-mx-4 -mt-4 mb-3 aspect-video w-[calc(100%+2rem)] object-cover"
                />
              )}
              <p className="text-xs font-medium uppercase tracking-wider text-[hsl(var(--brand))]">
                {m.outlet} · {fmtDate(m.date, lang)}
              </p>
              <h3 className="mt-1 font-display font-semibold leading-snug">{lt(m.title)}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{lt(m.summary)}</p>
            </a>
          ) : (
            <a
              key={m.id}
              href={m.url}
              target="_blank"
              rel="noreferrer"
              className="relative flex items-baseline gap-3 py-1 active:opacity-70"
            >
              <span className="absolute -left-9 top-2.5 flex h-8 w-8 items-center justify-center">
                <span className="h-2 w-2 rounded-full bg-muted-foreground/60" />
              </span>
              <span className="shrink-0 text-xs text-muted-foreground">{fmtDate(m.date, lang)}</span>
              <span className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground/80">{m.outlet}</span> · {lt(m.title)}
              </span>
            </a>
          ),
        )}
      </div>
    </div>
  )

  /* ---------------- Desktop: sticky showcase + vertical timeline ---------------- */
  let lastYear = ''

  return (
    <div>
      {mobileRail}

      <div className="hidden gap-10 lg:grid lg:grid-cols-[420px_1fr]">
        {/* Sticky showcase — always visible while scrolling the timeline */}
        <div className="self-start lg:sticky lg:top-24">
          <div key={active.id} className="glass-card showcase-enter overflow-hidden">
            {active.image ? (
              <img
                src={active.image}
                alt={lt(active.title)}
                className="anim-zoom aspect-video w-full object-cover"
              />
            ) : (
              <div className="anim-zoom flex aspect-video items-center justify-center bg-gradient-to-br from-[hsl(var(--brand)/0.15)] to-[hsl(var(--brand-2)/0.15)]">
                <BrandLogo src={active.logo} name={active.outlet} size={72} />
              </div>
            )}
            <div className="p-6">
              <div className="anim-rise flex items-center gap-3" style={{ animationDelay: '60ms' }}>
                <BrandLogo src={active.logo} name={active.outlet} size={36} />
                <div>
                  <p className="text-sm font-semibold">{active.outlet}</p>
                  <p className="text-xs text-muted-foreground">{fmtDateLong(active.date, lang)}</p>
                </div>
              </div>
              <h3
                className="anim-rise mt-3 font-display text-lg font-bold leading-snug"
                style={{ animationDelay: '140ms' }}
              >
                {lt(active.title)}
              </h3>
              <p
                className="anim-rise mt-2 text-sm leading-relaxed text-muted-foreground"
                style={{ animationDelay: '220ms' }}
              >
                {lt(active.summary)}
              </p>
              <a
                href={active.url}
                target="_blank"
                rel="noreferrer"
                className="anim-rise mt-4 inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform hover:scale-105"
                style={{ animationDelay: '300ms' }}
              >
                Read the story <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Straight vertical timeline: big nodes for major press, dots for the rest */}
        <div className="relative pl-14">
          <div className="absolute bottom-3 left-[27px] top-3 w-0.5 rounded bg-gradient-to-b from-[hsl(var(--brand))] via-[hsl(var(--brand-2)/0.7)] to-[hsl(var(--brand)/0.3)]" />
          <div className="space-y-2">
            {sorted.map((m) => {
              const year = m.date.slice(0, 4)
              const yearHeader = year !== lastYear ? year : null
              lastYear = year
              const isActive = active.id === m.id
              return (
                <div key={m.id}>
                  {yearHeader && (
                    <div className="relative flex items-center pb-1 pt-6 first:pt-0">
                      <span className="absolute -left-14 flex h-14 w-14 items-center justify-center">
                        <span className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--brand-2))]" />
                      </span>
                      <span className="font-display text-xl font-bold text-muted-foreground">{yearHeader}</span>
                    </div>
                  )}
                  <button
                    type="button"
                    onMouseEnter={() => setActiveId(m.id)}
                    onFocus={() => setActiveId(m.id)}
                    onClick={() => setActiveId(m.id)}
                    className={cn(
                      'group relative flex w-full items-center gap-4 rounded-xl px-3 py-2.5 text-left transition-colors',
                      isActive ? 'bg-secondary/60' : 'hover:bg-secondary/30',
                    )}
                    aria-label={lt(m.title)}
                  >
                    {m.major ? (
                      <span
                        className={cn(
                          'absolute -left-14 flex h-14 w-14 items-center justify-center rounded-full border bg-background transition-all duration-300',
                          isActive
                            ? 'scale-110 border-[hsl(var(--brand))] shadow-[0_0_24px_-6px_hsl(var(--brand)/0.8)]'
                            : 'border-border group-hover:border-[hsl(var(--brand)/0.6)]',
                        )}
                      >
                        <BrandLogo src={m.logo} name={m.outlet} size={40} className="rounded-full" />
                      </span>
                    ) : (
                      <span className="absolute -left-14 flex h-14 w-14 items-center justify-center">
                        <span
                          className={cn(
                            'rounded-full border-2 border-background transition-all duration-300',
                            isActive
                              ? 'h-3.5 w-3.5 bg-[hsl(var(--brand))]'
                              : 'h-2.5 w-2.5 bg-muted-foreground/50 group-hover:bg-[hsl(var(--brand)/0.7)]',
                          )}
                        />
                      </span>
                    )}
                    <span className="w-16 shrink-0 text-xs text-muted-foreground">{fmtDate(m.date, lang)}</span>
                    <span className="min-w-0">
                      <span
                        className={cn(
                          'block truncate font-medium',
                          m.major ? 'text-sm text-foreground' : 'text-xs text-muted-foreground',
                          isActive && 'text-[hsl(var(--brand))]',
                        )}
                      >
                        {m.outlet}
                      </span>
                      <span
                        className={cn(
                          'block truncate text-sm text-muted-foreground transition-all duration-300',
                          m.major
                            ? 'opacity-100'
                            : 'max-h-0 opacity-0 group-hover:max-h-6 group-hover:opacity-100',
                          isActive && 'max-h-6 opacity-100',
                        )}
                      >
                        {lt(m.title)}
                      </span>
                    </span>
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
