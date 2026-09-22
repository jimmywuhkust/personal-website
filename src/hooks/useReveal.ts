import { useCallback, useEffect, useRef } from 'react'

/**
 * Adds `.is-visible` when the element scrolls into view.
 * Pair with the `.reveal` / `.timeline-*` CSS classes.
 *
 * Implemented as a callback ref so it still works when the element is mounted
 * conditionally (e.g. after a media-query switch) — a plain useEffect+ref
 * would observe `null` if the first render didn't attach the element.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ioRef = useRef<IntersectionObserver | null>(null)

  const ref = useCallback((el: T | null) => {
    ioRef.current?.disconnect()
    ioRef.current = null
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    ioRef.current = io
  }, [])

  useEffect(() => () => ioRef.current?.disconnect(), [])
  return ref
}
