import type { MediaItem } from '../content/types'

/**
 * Scrolling strip of outlet logos, derived from media items that have a logo.
 * Logos stay in colour and each one links to that outlet's coverage.
 * Deduped by outlet; the list is doubled for a seamless marquee loop.
 */
export default function PressStrip({ items }: { items: MediaItem[] }) {
  const seen = new Set<string>()
  const logos = items
    .filter((m) => m.logo)
    .filter((m) => {
      if (seen.has(m.outlet)) return false
      seen.add(m.outlet)
      return true
    })
  if (logos.length === 0) return null

  return (
    <div className="marquee-mask overflow-hidden">
      <div className="marquee-track flex w-max items-center gap-14 px-7">
        {[...logos, ...logos].map((m, i) => (
          <a
            key={`${m.id}-${i}`}
            href={m.url}
            target="_blank"
            rel="noreferrer"
            aria-label={m.outlet}
            className="marquee-logo"
          >
            <img src={m.logo} alt={m.outlet} loading="lazy" className="h-7 w-auto object-contain sm:h-8" />
          </a>
        ))}
      </div>
    </div>
  )
}
