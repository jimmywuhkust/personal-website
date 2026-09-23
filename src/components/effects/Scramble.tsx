import { useEffect, useRef, useState } from 'react'

const GLYPHS = '!<>-_\\/[]{}—=+*^?#________'

/**
 * Decode/scramble text reveal — characters cycle through random glyphs and
 * settle left-to-right. Re-runs when `text` changes (e.g. language switch).
 * Disabled for prefers-reduced-motion: the text renders immediately.
 */
export default function Scramble({
  text,
  className,
  speed = 30,
}: {
  text: string
  className?: string
  speed?: number
}) {
  const [output, setOutput] = useState(text)
  const frameRef = useRef(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOutput(text)
      return
    }
    let frame = 0
    const total = text.length
    const interval = window.setInterval(() => {
      frame++
      const settled = Math.floor(frame / 2.2)
      let next = ''
      for (let i = 0; i < total; i++) {
        const ch = text[i]
        if (i < settled || ch === ' ' || ch === '，' || ch === '。') {
          next += ch
        } else {
          next += GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        }
      }
      setOutput(next)
      if (settled >= total) window.clearInterval(interval)
    }, speed)
    frameRef.current = frame
    return () => window.clearInterval(interval)
  }, [text, speed])

  return (
    <span className={className} aria-label={text}>
      {output}
    </span>
  )
}
