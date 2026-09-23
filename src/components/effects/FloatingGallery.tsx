import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { useLang } from '../../i18n'
import { getContent } from '../../content'

/**
 * Floating hero gallery — real press photos drift slowly across the hero
 * background with pointer parallax. Dimmed until hovered; hovering reveals
 * what it is (outlet / project chip), clicking takes you to the story.
 * Desktop only; static when the user prefers reduced motion.
 */

interface Pick {
  id: string // media item id, or 'project:aerorelief'
  x: number // % from left
  y: number // % from top
  w: number // px width
  rot: number // deg
  depth: number // parallax factor
  delay: number // s, float phase offset
}

const PICKS: Pick[] = [
  { id: 'seng-sandbox-2025', x: 0.68, y: 0.12, w: 180, rot: -4, depth: 1.0, delay: 0 },
  { id: 'cnn-tech-for-good-2025', x: 0.55, y: 0.05, w: 140, rot: 3, depth: 0.7, delay: -4 },
  { id: 'rthk-2026', x: 0.82, y: 0.4, w: 150, rot: 5, depth: 0.6, delay: -2 },
  { id: 'tvb-2025', x: 0.64, y: 0.62, w: 160, rot: -3, depth: 0.5, delay: -1 },
  { id: 'asmpt-2025', x: 0.83, y: 0.68, w: 140, rot: 6, depth: 0.9, delay: -3 },
  { id: 'mingpao-2025', x: 0.03, y: 0.8, w: 130, rot: -5, depth: 0.8, delay: -5 },
  { id: 'geneva-news-2026', x: 0.4, y: 0.85, w: 150, rot: 4, depth: 0.55, delay: -2.5 },
  { id: 'project:aerorelief', x: 0.84, y: 0.06, w: 130, rot: -6, depth: 1.1, delay: -6 },
]

export default function FloatingGallery() {
  const { lt } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  const content = getContent()

  // pointer parallax — writes CSS vars, items read them via calc()
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--px', String((e.clientX - r.left) / r.width - 0.5))
      el.style.setProperty('--py', String((e.clientY - r.top) / r.height - 0.5))
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  const items = PICKS.map((p) => {
    if (p.id.startsWith('project:')) {
      const proj = content.projects.find((pr) => pr.id === p.id.slice(8))
      if (!proj?.image) return null
      return { pick: p, image: proj.image, caption: lt(proj.title), href: `/projects/${proj.id}`, external: false }
    }
    const m = content.media.find((mm) => mm.id === p.id)
    if (!m?.image) return null
    return { pick: p, image: m.image, caption: m.outlet, href: m.url, external: true }
  })

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden={false}>
      {items.map((it) => {
        if (!it) return null
        const { pick, image, caption, href, external } = it
        const inner = (
          <>
            <div
              className="floaty overflow-hidden rounded-xl border border-border/60 opacity-40 shadow-xl shadow-black/40 transition-all duration-300 group-hover/ph:border-[hsl(var(--brand))] group-hover/ph:opacity-100"
              style={{ animationDelay: `${pick.delay}s`, animationDuration: `${9 + pick.depth * 4}s` }}
            >
              <img src={image} alt={caption} loading="lazy" className="aspect-[4/3] w-full object-cover" />
            </div>
            <span className="absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-border bg-background/90 px-2.5 py-0.5 text-[10px] font-medium opacity-0 transition-opacity duration-200 group-hover/ph:opacity-100">
              {caption}
            </span>
          </>
        )
        const style: React.CSSProperties = {
          left: `${pick.x * 100}%`,
          top: `${pick.y * 100}%`,
          width: pick.w,
          transform: `translate3d(calc(var(--px, 0) * ${(pick.depth * 40).toFixed(0)}px), calc(var(--py, 0) * ${(pick.depth * 40).toFixed(0)}px), 0) rotate(${pick.rot}deg)`,
        }
        const cls = 'group/ph pointer-events-auto absolute block'
        return external ? (
          <a key={pick.id} href={href} target="_blank" rel="noreferrer" className={cls} style={style} aria-label={caption}>
            {inner}
          </a>
        ) : (
          <Link key={pick.id} to={href} className={cls} style={style} aria-label={caption}>
            {inner}
          </Link>
        )
      })}
    </div>
  )
}
