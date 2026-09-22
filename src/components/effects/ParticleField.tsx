import { useEffect, useRef } from 'react'
import { useTheme } from '../../hooks/theme'

/**
 * Lightweight canvas particle field — floating "drone swarm" dots with faint
 * constellation links, gently drifting toward the pointer.
 * Desktop only: the component renders nothing on small screens or when the
 * user prefers reduced motion.
 */
export default function ParticleField({ density = 70 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.innerWidth < 768) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let w = 0
    let h = 0
    const mouse = { x: -9999, y: -9999 }

    const resize = () => {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio
      h = canvas.height = canvas.offsetHeight * devicePixelRatio
    }
    resize()
    window.addEventListener('resize', resize)

    const dots = Array.from({ length: density }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00045,
      vy: (Math.random() - 0.5) * 0.00045,
      r: 0.8 + Math.random() * 1.8,
    }))

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = (e.clientX - rect.left) / rect.width
      mouse.y = (e.clientY - rect.top) / rect.height
    }
    window.addEventListener('pointermove', onMove)

    const accent = theme === 'dark' ? '56,189,248' : '2,132,199'

    const tick = () => {
      ctx.clearRect(0, 0, w, h)
      const linkDist = 0.09

      for (const d of dots) {
        // drift + slight attraction to pointer
        d.x += d.vx + (mouse.x > 0 ? (mouse.x - d.x) * 0.00018 : 0)
        d.y += d.vy + (mouse.y > 0 ? (mouse.y - d.y) * 0.00018 : 0)
        if (d.x < 0 || d.x > 1) d.vx *= -1
        if (d.y < 0 || d.y > 1) d.vy *= -1
        d.x = Math.min(1, Math.max(0, d.x))
        d.y = Math.min(1, Math.max(0, d.y))

        ctx.beginPath()
        ctx.arc(d.x * w, d.y * h, d.r * devicePixelRatio, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${accent},0.75)`
        ctx.fill()
      }

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i]
          const b = dots[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < linkDist) {
            ctx.beginPath()
            ctx.moveTo(a.x * w, a.y * h)
            ctx.lineTo(b.x * w, b.y * h)
            ctx.strokeStyle = `rgba(${accent},${0.16 * (1 - dist / linkDist)})`
            ctx.lineWidth = devicePixelRatio * 0.7
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
    }
  }, [density, theme])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
      aria-hidden
    />
  )
}
