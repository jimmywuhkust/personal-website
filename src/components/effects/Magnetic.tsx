import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Magnetic wrapper — the child is gently pulled toward the pointer and
 * springs back on leave. Mouse only; inert on touch devices.
 */
export default function Magnetic({
  children,
  className,
  strength = 0.35,
}: {
  children: ReactNode
  className?: string
  strength?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current
    if (!el || e.pointerType !== 'mouse') return
    const rect = el.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    el.style.transition = 'transform 0.1s ease-out'
    el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)'
    el.style.transform = ''
  }

  return (
    <div ref={ref} className={cn('inline-block', className)} onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
    </div>
  )
}
