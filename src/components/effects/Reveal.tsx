import type { ReactNode } from 'react'
import { useReveal } from '../../hooks/useReveal'
import { cn } from '@/lib/utils'

/** Wrapper that fades + slides content in when scrolled into view. */
export default function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const ref = useReveal()
  return (
    <div ref={ref} className={cn('reveal', className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}
