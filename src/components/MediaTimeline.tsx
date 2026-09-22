import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ExternalLink } from 'lucide-react'
import type { MediaItem } from '../content/types'
import { useLang } from '../i18n'
import { useReveal } from '../hooks/useReveal'
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

const PER_ROW = 4

/**
 * Media coverage timeline.
 * - Desktop: a serpentine path (rows alternate direction, bending down at the
 *   edges) draws itself on scroll. Hovering a node updates ONE unified
 *   showcase panel above the timeline — no floating popups covering content.
 * - Mobile: vertical rail with round logo nodes and tap-friendly cards.
 */
export default function MediaTimeline({ items }: { items: MediaItem[] }) {
  const { lang, lt } = useLang()
  const revealRef = useReveal()
  const sorted = [...items].sort((a, b) => b.date.localeCompare(a.date))
  const [activeId, setActiveId] = useState<string | null>(null)
  const active = sorted.find((m) => m.id === activeId) ?? sorted[0]
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const update = () => setIsDesktop(mq.matches)
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  /* ---- serpentine path measurement ---- */
  const containerRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const [path, setPath] = useState('')
  const [pathLen, setPathLen] = useState(0)
  const [drawn, setDrawn] = useState(false)
  const [viewBox, setViewBox] = useState('0 0 100 100')
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (!isDesktop) return
    const el = containerRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setDrawn(true)),
      { threshold: 0.1 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [isDesktop])

  useLayoutEffect(() => {
    if (!isDesktop) return
    const measure = () => {
      const box = containerRef.current
      if (!box) return
      const cRect = box.getBoundingClientRect()
      const pts: { x: number; y: number }[] = []
      for (const m of sorted) {
        const el = nodeRefs.current[m.id]
        if (!el) return
        const r = el.getBoundingClientRect()
        pts.push({ x: r.left - cRect.left + r.width / 2, y: r.top - cRect.top + r.height / 2 })
      }
      if (pts.length < 2) return

      let d = `M ${pts[0].x} ${pts[0].y}`
      for (let i = 1; i < pts.length; i++) {
        const prev = pts[i - 1]
        const cur = pts[i]
        const sameRow = Math.abs(prev.y - cur.y) < 2
        if (sameRow) {
          d += ` L ${cur.x} ${cur.y}`
        } else {
          const dir = prev.x > cRect.width / 2 ? 1 : -1
          const bulge = 44 * dir
          d += ` C ${prev.x + bulge} ${prev.y}, ${cur.x + bulge} ${cur.y}, ${cur.x} ${cur.y}`
        }
      }
      setPath(d)
      setViewBox(`0 0 ${cRect.width} ${cRect.height}`)
      requestAnimationFrame(() => {
        const len = pathRef.current?.getTotalLength()
        if (len) setPathLen(len)
      })
    }
    const raf = requestAnimationFrame(measure)
    const ro = new ResizeObserver(measure)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDesktop, items.length])

  if (sorted.length === 0) return null

  /* ---------------- Mobile: vertical rail with round logo nodes ---------------- */
  if (!isDesktop) {
    return (
      <div className="relative pl-9">
        <div className="absolute bottom-2 left-[15px] top-2 w-px bg-gradient-to-b from-[hsl(var(--brand))] to-[hsl(var(--brand-2))] opacity-60" />
        <div className="space-y-5">
          {sorted.map((m) => (
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
          ))}
        </div>
      </div>
    )
  }

  /* ---------------- Desktop: unified showcase + serpentine ---------------- */
  const rows: MediaItem[][] = []
  for (let i = 0; i < sorted.length; i += PER_ROW) {
    const chunk = sorted.slice(i, i + PER_ROW)
    rows.push(rows.length % 2 === 1 ? [...chunk].reverse() : chunk)
  }

  return (
    <div ref={revealRef}>
      {/* Unified showcase panel — hovering a node swaps this content in place */}
      <div key={active.id} className="glass-card showcase-enter mb-16 overflow-hidden">
        <div className="grid md:grid-cols-[380px_1fr]">
          {active.image ? (
            <img
              src={active.image}
              alt={lt(active.title)}
              className="anim-zoom h-full min-h-52 w-full object-cover"
            />
          ) : (
            <div className="anim-zoom flex min-h-52 items-center justify-center bg-gradient-to-br from-[hsl(var(--brand)/0.15)] to-[hsl(var(--brand-2)/0.15)]">
              <BrandLogo src={active.logo} name={active.outlet} size={72} />
            </div>
          )}
          <div className="p-6 md:p-8">
            <div className="anim-rise flex items-center gap-3" style={{ animationDelay: '60ms' }}>
              <BrandLogo src={active.logo} name={active.outlet} size={36} />
              <div>
                <p className="text-sm font-semibold">{active.outlet}</p>
                <p className="text-xs text-muted-foreground">{fmtDateLong(active.date, lang)}</p>
              </div>
            </div>
            <h3 className="anim-rise mt-4 font-display text-xl font-bold leading-snug md:text-2xl" style={{ animationDelay: '140ms' }}>
              {lt(active.title)}
            </h3>
            <p className="anim-rise mt-3 leading-relaxed text-muted-foreground" style={{ animationDelay: '220ms' }}>
              {lt(active.summary)}
            </p>
            <a
              href={active.url}
              target="_blank"
              rel="noreferrer"
              className="anim-rise mt-5 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition-transform hover:scale-105"
              style={{ animationDelay: '300ms' }}
            >
              Read the story <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Serpentine timeline */}
      <div ref={containerRef} className="relative py-6">
        {path && (
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox={viewBox}
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <linearGradient id="tl-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(var(--brand))" />
                <stop offset="50%" stopColor="hsl(var(--brand-2))" />
                <stop offset="100%" stopColor="hsl(var(--brand))" />
              </linearGradient>
            </defs>
            <path
              ref={pathRef}
              d={path}
              fill="none"
              stroke="url(#tl-grad)"
              strokeWidth="2"
              strokeLinecap="round"
              style={
                pathLen
                  ? {
                      strokeDasharray: pathLen,
                      strokeDashoffset: drawn ? 0 : pathLen,
                      transition: 'stroke-dashoffset 2.2s cubic-bezier(0.22,1,0.36,1) 0.25s',
                    }
                  : undefined
              }
            />
          </svg>
        )}

        <div className="relative space-y-20">
          {rows.map((row, ri) => (
            <div key={ri} className="grid grid-cols-4">
              {row.map((m) => {
                const isActive = active.id === m.id
                const globalIndex = sorted.indexOf(m)
                return (
                  <div
                    key={m.id}
                    className="timeline-node relative flex flex-col items-center"
                    style={{ transitionDelay: `${globalIndex * 110}ms` }}
                    onMouseEnter={() => setActiveId(m.id)}
                  >
                    <button
                      ref={(el) => {
                        nodeRefs.current[m.id] = el
                      }}
                      className={cn(
                        'relative z-10 flex items-center justify-center rounded-full border bg-background transition-all duration-300',
                        isActive
                          ? 'scale-125 border-[hsl(var(--brand))] shadow-[0_0_30px_-6px_hsl(var(--brand)/0.8)]'
                          : 'border-border hover:border-[hsl(var(--brand))]',
                      )}
                      aria-label={lt(m.title)}
                    >
                      <BrandLogo src={m.logo} name={m.outlet} size={48} className="rounded-full" />
                    </button>
                    <p
                      className={cn(
                        'mt-4 whitespace-nowrap text-xs transition-colors',
                        isActive ? 'font-semibold text-foreground' : 'text-muted-foreground',
                      )}
                    >
                      {fmtDate(m.date, lang)}
                    </p>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
