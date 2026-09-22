import { useRef, type ReactNode, type CSSProperties } from 'react'
import { cn } from '@/lib/utils'

/**
 * 3D tilt wrapper — the card rotates toward the pointer (desktop only).
 * Disabled automatically on touch devices / small screens.
 */
export default function TiltCard({
  children,
  className,
  max = 7,
  style,
}: {
  children: ReactNode
  className?: string
  max?: number
  style?: CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current
    if (!el || e.pointerType !== 'mouse') return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateY(-4px)`
  }

  const onLeave = () => {
    const el = ref.current
    if (el) el.style.transform = ''
  }

  return (
    <div ref={ref} className={cn('glass-card', className)} style={style} onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
    </div>
  )
}
