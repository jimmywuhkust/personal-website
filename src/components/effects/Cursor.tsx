import { useEffect, useRef } from 'react'
import { useTheme } from '../../hooks/theme'

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, summary, [data-cursor]'
const PAD = 5 // px outset around the hovered element
const N = 28 // perimeter sample points of the ring

type Pt = { x: number; y: number }

function circlePts(cx: number, cy: number, r: number): Pt[] {
  const pts: Pt[] = []
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2
    pts.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r })
  }
  return pts
}

/** Distribute N points evenly along a quadrilateral's perimeter. */
function quadPts(corners: Pt[]): Pt[] {
  const pts: Pt[] = []
  const lens = corners.map((c, i) => {
    const b = corners[(i + 1) % 4]
    return Math.hypot(b.x - c.x, b.y - c.y)
  })
  const total = lens.reduce((s, l) => s + l, 0) || 1
  for (let i = 0; i < N; i++) {
    let d = (i / N) * total
    let ei = 0
    while (ei < 3 && d > lens[ei]) {
      d -= lens[ei]
      ei++
    }
    const a = corners[ei]
    const b = corners[(ei + 1) % 4]
    const t = lens[ei] ? d / lens[ei] : 0
    pts.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t })
  }
  return pts
}

/**
 * The element's border-box corners in viewport coordinates, honouring its OWN
 * transform — including 3D perspective tilts (TiltCard), scales and rotations.
 * For untransformed elements this is just the bounding rect.
 * (Assumes no transformed/fixed ancestors, which holds for this site.)
 */
function shapeCorners(el: HTMLElement): Pt[] {
  const r = el.getBoundingClientRect()
  const t = getComputedStyle(el).transform
  if (!t || t === 'none') {
    return [
      { x: r.left - PAD, y: r.top - PAD },
      { x: r.right + PAD, y: r.top - PAD },
      { x: r.right + PAD, y: r.bottom + PAD },
      { x: r.left - PAD, y: r.bottom + PAD },
    ]
  }
  // untransformed border-box origin, in viewport coords
  let x = el.offsetLeft
  let y = el.offsetTop
  let p = el.offsetParent as HTMLElement | null
  let fixed = false
  while (p) {
    x += p.offsetLeft
    y += p.offsetTop
    if (getComputedStyle(p).position === 'fixed') fixed = true
    p = p.offsetParent as HTMLElement | null
  }
  if (!fixed) {
    x -= window.scrollX
    y -= window.scrollY
  }
  const m = new DOMMatrix(t)
  const cs = getComputedStyle(el)
  const [ox, oy] = cs.transformOrigin.split(' ').map(parseFloat)
  const w = el.offsetWidth
  const h = el.offsetHeight
  const project = (cx: number, cy: number): Pt => {
    const pt = m.transformPoint(new DOMPoint(cx - ox, cy - oy))
    const dw = pt.w || 1
    return { x: x + ox + pt.x / dw, y: y + oy + pt.y / dw }
  }
  // outset each corner away from the quad centre by PAD
  const raw = [project(0, 0), project(w, 0), project(w, h), project(0, h)]
  const c = {
    x: raw.reduce((s, p2) => s + p2.x, 0) / 4,
    y: raw.reduce((s, p2) => s + p2.y, 0) / 4,
  }
  return raw.map((p2) => {
    const dx = p2.x - c.x
    const dy = p2.y - c.y
    const len = Math.hypot(dx, dy) || 1
    return { x: p2.x + (dx / len) * PAD, y: p2.y + (dy / len) * PAD }
  })
}

/** Nearest element that actually has a transform, else the interactive target. */
function visualShapeOf(deep: HTMLElement | null, target: HTMLElement): HTMLElement {
  let el: HTMLElement | null = deep
  while (el && el !== target.parentElement) {
    const t = getComputedStyle(el).transform
    if (t && t !== 'none') return el
    if (el === target) break
    el = el.parentElement
  }
  return target
}

/**
 * Custom cursor accent.
 * - A brand-colored dot glued to the pointer.
 * - A ring drawn as an SVG path through 28 sample points. Over interactive
 *   elements it MORPHS into that element's true outline — including live 3D
 *   tilt: the corners are projected through the element's own transform
 *   matrix every frame, so the ring hugs the tilted card exactly, not its
 *   axis-aligned DOM box. Shapes interpolate point-by-point, so the ring
 *   flows fluidly between a circle and any quad.
 * - Clicking anywhere spawns a ripple shockwave; the dot pops on press.
 * Desktop pointers only; renders nothing on touch or reduced-motion.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const layerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const dot = dotRef.current
    const path = pathRef.current
    const svg = svgRef.current
    const layer = layerRef.current
    if (!dot || !path || !svg || !layer) return

    let raf = 0
    const pointer = { x: -100, y: -100 }
    const pos = { x: -100, y: -100 }
    let ring: Pt[] = circlePts(-100, -100, 16)
    let target: HTMLElement | null = null
    let deep: HTMLElement | null = null
    let pressing = false

    const onResize = () => {
      svg.setAttribute('width', String(window.innerWidth))
      svg.setAttribute('height', String(window.innerHeight))
    }
    onResize()
    window.addEventListener('resize', onResize)

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX
      pointer.y = e.clientY
      deep = e.target as HTMLElement | null
      const el = deep?.closest?.(INTERACTIVE) as HTMLElement | null
      target = el && el.isConnected ? el : null
    }

    const onDown = (e: PointerEvent) => {
      pressing = true
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
    const onLeave = () => {
      pointer.x = -100
      pointer.y = -100
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)

    const tick = () => {
      dot.style.transform = `translate(${pointer.x}px, ${pointer.y}px) translate(-50%, -50%) scale(${pressing ? 2.2 : 1})`
      dot.style.opacity = pointer.x < 0 ? '0' : '1'

      let want: Pt[]
      if (target && target.isConnected) {
        const shape = visualShapeOf(deep, target)
        want = quadPts(shapeCorners(shape))
        const c = shapeCorners(shape)
        pos.x = c.reduce((s, p) => s + p.x, 0) / 4
        pos.y = c.reduce((s, p) => s + p.y, 0) / 4
        path.style.opacity = '0.95'
      } else {
        pos.x += (pointer.x - pos.x) * 0.16
        pos.y += (pointer.y - pos.y) * 0.16
        want = circlePts(pos.x, pos.y, 16)
        path.style.opacity = pointer.x < 0 ? '0' : '0.55'
      }
      if (target && !target.isConnected) target = null

      // point-by-point fluid morph toward the wanted shape
      for (let i = 0; i < N; i++) {
        ring[i].x += (want[i].x - ring[i].x) * 0.32
        ring[i].y += (want[i].y - ring[i].y) * 0.32
      }
      path.setAttribute(
        'd',
        `M ${ring.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' L ')} Z`,
      )
      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  const accent = theme === 'dark' ? 'hsl(199 89% 48%)' : 'hsl(199 89% 42%)'

  return (
    <div ref={layerRef} aria-hidden className="pointer-events-none fixed inset-0 z-[100] hidden md:block">
      <svg ref={svgRef} className="fixed inset-0" style={{ overflow: 'visible' }}>
        <path
          ref={pathRef}
          fill="none"
          stroke={accent}
          strokeWidth={1.5}
          strokeLinejoin="round"
          strokeLinecap="round"
          style={{ opacity: 0, transition: 'opacity 0.2s' }}
        />
      </svg>
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full"
        style={{ background: accent, opacity: 0, transition: 'opacity 0.2s' }}
      />
    </div>
  )
}
