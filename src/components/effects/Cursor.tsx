import { useEffect, useRef } from 'react'
import { useTheme } from '../../hooks/theme'

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, summary, [data-cursor]'
const N = 64 // perimeter sample points of the ring

type Pt = { x: number; y: number }

function circlePts(cx: number, cy: number, r: number): Pt[] {
  const pts: Pt[] = []
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2
    pts.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r })
  }
  return pts
}

/**
 * Exactly n points along a rounded rect (local coords, clockwise from the top
 * edge). Corner arcs get a FIXED share of points each — an even arc-length
 * distribution would starve small radii and turn them into chamfers.
 */
function roundedRectSample(w: number, h: number, radii: number[], n: number): Pt[] {
  const [tl, tr, br, bl] = radii
  const cornerN = Math.max(6, Math.floor(n / 8))
  const edgeLens = [w - tl - tr, h - tr - br, w - br - bl, h - bl - tl].map((l) => Math.max(0, l))
  const totalEdge = edgeLens.reduce((s, l) => s + l, 0)
  const edgeBudget = n - 4 * cornerN
  // largest-remainder apportioning so counts sum exactly to edgeBudget
  const raw = edgeLens.map((l) => (totalEdge > 0 ? (edgeBudget * l) / totalEdge : edgeBudget / 4))
  const counts = raw.map(Math.floor)
  let rem = edgeBudget - counts.reduce((s, c) => s + c, 0)
  const order = raw.map((r, i) => [r - counts[i], i] as const).sort((a, b) => b[0] - a[0])
  for (let k = 0; rem > 0; k = (k + 1) % 4, rem--) counts[order[k][1]]++

  const pts: Pt[] = []
  const edge = (x0: number, y0: number, x1: number, y1: number, c: number) => {
    for (let i = 0; i < c; i++) {
      const t = i / c
      pts.push({ x: x0 + (x1 - x0) * t, y: y0 + (y1 - y0) * t })
    }
  }
  const arc = (cx: number, cy: number, r: number, a0: number, a1: number) => {
    for (let i = 0; i < cornerN; i++) {
      const a = a0 + ((a1 - a0) * i) / (cornerN - 1)
      pts.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r })
    }
  }
  edge(tl, 0, w - tr, 0, counts[0])
  arc(w - tr, tr, tr, -Math.PI / 2, 0)
  edge(w, tr, w, h - br, counts[1])
  arc(w - br, h - br, br, 0, Math.PI / 2)
  edge(w - br, h, bl, h, counts[2])
  arc(bl, h - bl, bl, Math.PI / 2, Math.PI)
  edge(0, h - bl, 0, tl, counts[3])
  arc(tl, tl, tl, Math.PI, Math.PI * 1.5)
  return pts
}

function cornerRadii(el: HTMLElement, w: number, h: number): number[] {
  const cs = getComputedStyle(el)
  const names = [
    'borderTopLeftRadius',
    'borderTopRightRadius',
    'borderBottomRightRadius',
    'borderBottomLeftRadius',
  ] as const
  const maxR = Math.min(w, h) / 2
  return names.map((n) => {
    const v = cs[n].split(' ')[0]
    const r = v.endsWith('%') ? (parseFloat(v) / 100) * Math.min(w, h) : parseFloat(v) || 0
    return Math.min(r, maxR)
  })
}

/**
 * The element's own outline — border box WITH its border-radius — in viewport
 * coordinates. Every point is pushed through the FULL offsetParent chain:
 * each ancestor's own transform (3D tilt, parallax, rotation, scale) is
 * applied in turn, so the ring traces the exact visible shape even inside
 * transformed/animated containers.
 */
interface ChainLink {
  m: DOMMatrix | null
  ox: number
  oy: number
  lx: number
  ly: number
  sx: number
  sy: number
}

function chainOf(el: HTMLElement): { chain: ChainLink[]; fixed: boolean } {
  const chain: ChainLink[] = []
  let fixed = false
  let node: HTMLElement | null = el
  while (node) {
    const cs = getComputedStyle(node)
    let m: DOMMatrix | null = null
    let ox = 0
    let oy = 0
    if (cs.transform && cs.transform !== 'none') {
      m = new DOMMatrix(cs.transform)
      const [a, b] = cs.transformOrigin.split(' ').map(parseFloat)
      ox = a || 0
      oy = b || 0
    }
    chain.push({ m, ox, oy, lx: node.offsetLeft, ly: node.offsetTop, sx: node.scrollLeft, sy: node.scrollTop })
    if (cs.position === 'fixed') fixed = true
    node = node.offsetParent as HTMLElement | null
  }
  return { chain, fixed }
}

function applyLink(l: ChainLink, x: number, y: number): Pt {
  let px = x
  let py = y
  if (l.m) {
    const lx = px - l.ox
    const ly = py - l.oy
    const m = l.m
    const w = m.m14 * lx + m.m24 * ly + m.m44 || 1
    px = l.ox + (m.m11 * lx + m.m21 * ly + m.m41) / w
    py = l.oy + (m.m12 * lx + m.m22 * ly + m.m42) / w
  }
  return { x: px + l.lx, y: py + l.ly }
}

function shapePoints(el: HTMLElement): Pt[] {
  const w = el.offsetWidth
  const h = el.offsetHeight
  const local = roundedRectSample(w, h, cornerRadii(el, w, h), N)
  const { chain, fixed } = chainOf(el)
  return local.map((p) => {
    let out = p
    for (let i = 0; i < chain.length; i++) {
      out = applyLink(chain[i], out.x, out.y)
      // a scrollable parent shifts its content — including body as a
      // scroll container (body overflow-x:hidden scrolls programmatically,
      // which window.scrollX does NOT reflect)
      const parent = chain[i + 1]
      if (parent) out = { x: out.x - parent.sx, y: out.y - parent.sy }
    }
    if (!fixed) {
      out = { x: out.x - window.scrollX, y: out.y - window.scrollY }
    }
    return out
  })
}

/**
 * What to frame: the interactive target itself, or its near-full-size child
 * (the TiltCard div inside Link/button — the element that visibly tilts).
 * Never a nested icon/image.
 */
function visualShapeOf(target: HTMLElement): HTMLElement {
  const child = target.firstElementChild as HTMLElement | null
  if (child) {
    const cr = child.getBoundingClientRect()
    const tr = target.getBoundingClientRect()
    if (tr.width > 0 && cr.width * cr.height >= tr.width * tr.height * 0.6) return child
  }
  return target
}

/**
 * Custom cursor accent.
 * - A brand-colored dot glued to the pointer.
 * - A ring drawn as an SVG path through 64 sample points. Over interactive
 *   elements it becomes THAT element's own outline — same border, same
 *   border-radius, same live 3D tilt — traced point-by-point through the
 *   element's transform matrix. Shapes morph fluidly (per-point lerp).
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
      const el = (e.target as HTMLElement | null)?.closest?.(INTERACTIVE) as HTMLElement | null
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
        const shape = visualShapeOf(target)
        want = shapePoints(shape)
        const sum = want.reduce((s, p) => ({ x: s.x + p.x, y: s.y + p.y }), { x: 0, y: 0 })
        pos.x = sum.x / want.length
        pos.y = sum.y / want.length
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
