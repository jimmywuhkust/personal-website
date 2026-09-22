import { useState } from 'react'
import { cn } from '@/lib/utils'

/**
 * Brand logo chip: shows the real logo image when available,
 * otherwise falls back to a monogram tile with the first letter.
 * Logos live in public/logos/.
 */
export default function BrandLogo({
  src,
  name,
  size = 40,
  className,
}: {
  src?: string
  name: string
  size?: number
  className?: string
}) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <span
        className={cn(
          'flex shrink-0 select-none items-center justify-center rounded-xl border border-border bg-gradient-to-br from-[hsl(var(--brand))] to-[hsl(var(--brand-2))] font-display font-bold text-white',
          className,
        )}
        style={{ width: size, height: size, fontSize: size * 0.42 }}
        aria-label={name}
      >
        {name.trim().charAt(0).toUpperCase()}
      </span>
    )
  }

  return (
    <span
      className={cn(
        'flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-white p-1',
        className,
      )}
      style={{ width: size, height: size }}
    >
      <img
        src={src}
        alt={`${name} logo`}
        loading="lazy"
        className="max-h-full max-w-full object-contain"
        onError={() => setFailed(true)}
      />
    </span>
  )
}
