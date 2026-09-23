import { useEffect, useRef } from 'react'
import { useTheme } from '../../hooks/theme'

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, summary, [data-cursor]'
const PAD = 5 // px outset around the hovered element

/**
 * Custom cursor accent.
 * - A brand-colored dot glued to the pointer.
 * - A ring that floats behind it — and when the pointer moves over something
 *   interactive, the ring MORPHS onto that element: it glides to the element's
 *   position, size and border-radius, becoming its outline. It stays glued to
 *   the element while the page scrolls, then melts back into a circle.
 * - Clicking anywhere spawns a ripple shockwave (even on empty space), and the
 *   dot pops on press.
 * Desktop pointers only; renders nothing on touch or reduced-motion.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const layerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const dot = dotRef.current
    const ring = ringRef.current
    const layer = layerRef.current
    if (!dot || !ring || !layer) return

    let raf = 0
    const pointer = { x: -100, y: -100 }
    const pos = { x: -100, y: -100 }
    let target: HTMLElement | null = null
    let pressing = false

    const ringTransition = 'left 0.22s cubic-bezier(0.22,1,0.36,1), top 0.22s cubic-bezier(0.22,1,0.36,1), width 0.22s cubic-bezier(0.22,1,0.36,1), height 0.22s cubic-bezier(0.22,1,0.36,1), border-radius 0.22s cubic-bezier(0.22,1,0.36,1), border-color 0.2s, opacity 0.2s'

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX
      pointer.y = e.clientY
      const el = (e.target as HTMLElement | null)?.closest?.(INTERACTIVE) as HTMLElement | null
      target = el && el.isConnected ? el : null
    }

    const onDown = (e: PointerEvent) => {
      pressing = true
      // ripple shockwave at the click point — works even on empty space
      const rip = document.createElement('div')
      rip.className = 'cursor-ripple'
      rip.style.left = `${e.clientX}px`
      rip.style.top = `${e.clientY}px`
      layer.appendChild(rip)
      rip.addEventListener('animationend', () => rip.remove())
    }
    const onUp = () => {
      pressing = false
    }
    // pointer leaving the window — hide everything
    const onLeave = () => {
      pointer.x = -100
      pointer.y = -100
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)

    const tick = () => {
      // dot rides the pointer, squashed a little while pressing
      dot.style.transform = `translate(${pointer.x}px, ${pointer.y}px) translate(-50%, -50%) scale(${pressing ? 2.2 : 1})`
      dot.style.opacity = pointer.x < 0 ? '0' : '1'

      if (target && target.isConnected) {
        // morph: become the element's outline
        const r = target.getBoundingClientRect()
        const radius = window.getComputedStyle(target).borderRadius
        ring.style.transition = ringTransition
        ring.style.left = `${r.left - PAD}px`
        ring.style.top = `${r.top - PAD}px`
        ring.style.width = `${r.width + PAD * 2}px`
        ring.style.height = `${r.height + PAD * 2}px`
        ring.style.borderRadius = radius === '0px' ? '6px' : radius
        ring.style.opacity = '0.9'
        // keep the free-follow position in sync so the melt-back starts nearby
        pos.x = r.left + r.width / 2
        pos.y = r.top + r.height / 2
      } else {
        // free follow: lerp behind the pointer as a plain circle
        pos.x += (pointer.x - pos.x) * 0.16
        pos.y += (pointer.y - pos.y) * 0.16
        ring.style.transition = 'border-color 0.2s, opacity 0.2s'
        ring.style.left = `${pos.x - 16}px`
        ring.style.top = `${pos.y - 16}px`
        ring.style.width = '32px'
        ring.style.height = '32px'
        ring.style.borderRadius = '50%'
        ring.style.opacity = pointer.x < 0 ? '0' : '0.55'
      }
      if (target && !target.isConnected) target = null
      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  const accent = theme === 'dark' ? 'hsl(199 89% 48%)' : 'hsl(199 89% 42%)'

  return (
    <div ref={layerRef} aria-hidden className="pointer-events-none fixed inset-0 z-[100] hidden md:block">
      <div
        ref={ringRef}
        className="fixed left-0 top-0 border"
        style={{ borderColor: accent, borderWidth: 1.5, opacity: 0, willChange: 'left, top, width, height' }}
      />
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full"
        style={{ background: accent, opacity: 0, transition: 'opacity 0.2s' }}
      />
    </div>
  )
}
