import { useEffect, useRef } from 'react'
import { useTheme } from '../../hooks/theme'

/**
 * Custom cursor accent — a brand-colored dot glued to the pointer plus a
 * trailing ring that lerps behind it and expands over interactive elements.
 * Desktop pointers only; renders nothing on touch or reduced-motion.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let raf = 0
    const target = { x: -100, y: -100 }
    const pos = { x: -100, y: -100 }
    let hovering = false

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX
      target.y = e.clientY
      const t = e.target as HTMLElement | null
      hovering = !!t?.closest('a, button, [role="button"], input, textarea, select, [data-cursor]')
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.16
      pos.y += (target.y - pos.y) * 0.16
      dot.style.transform = `translate(${target.x}px, ${target.y}px) translate(-50%, -50%)`
      ring.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%) scale(${hovering ? 1.8 : 1})`
      ring.style.opacity = hovering ? '0.9' : '0.55'
      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  const accent = theme === 'dark' ? 'hsl(199 89% 48%)' : 'hsl(199 89% 42%)'

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100] hidden md:block">
      <div
        ref={ringRef}
        className="fixed left-0 top-0 h-8 w-8 rounded-full border"
        style={{ borderColor: accent, opacity: 0.55, transition: 'opacity 0.2s' }}
      />
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full"
        style={{ background: accent }}
      />
    </div>
  )
}
