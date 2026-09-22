import { useEffect, useRef, useState } from 'react'

/**
 * PDF flipbook — renders a PDF (pitch deck, slides, catalogue) as a 3D
 * page-turn book. pdfjs renders each page to a canvas; page-flip supplies the
 * turn animation. Both libraries are dynamically imported so they never load
 * unless a project actually has a deckUrl.
 */
export default function Flipbook({ url }: { url: string }) {
  const hostRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    let flip: { destroy?: () => void } | null = null

    ;(async () => {
      try {
        const pdfjs = await import('pdfjs-dist')
        pdfjs.GlobalWorkerOptions.workerSrc = (
          await import('pdfjs-dist/build/pdf.worker.min.mjs?url')
        ).default
        const { PageFlip } = await import('page-flip')

        const doc = await pdfjs.getDocument({ url }).promise
        const host = hostRef.current
        if (!host || cancelled) return
        host.innerHTML = ''

        let pageW = 0
        let pageH = 0
        const pageEls: HTMLElement[] = []
        for (let p = 1; p <= doc.numPages; p++) {
          const page = await doc.getPage(p)
          const vp = page.getViewport({ scale: 1.5 })
          const canvas = document.createElement('canvas')
          canvas.width = vp.width
          canvas.height = vp.height
          canvas.style.width = '100%'
          canvas.style.height = '100%'
          await page.render({ canvas, viewport: vp }).promise
          const wrapper = document.createElement('div')
          wrapper.className = 'flipbook-page'
          wrapper.appendChild(canvas)
          host.appendChild(wrapper)
          pageEls.push(wrapper)
          if (p === 1) {
            pageW = vp.width
            pageH = vp.height
          }
        }
        if (cancelled) return

        // display at half the render scale, capped to the container
        const maxW = Math.min(host.parentElement?.clientWidth ?? 900, 900)
        const dispW = maxW / 2
        const dispH = (pageH / pageW) * dispW

        const pf = new PageFlip(host, {
          width: dispW,
          height: dispH,
          size: 'stretch' as import('page-flip').SizeType,
          showCover: true,
          maxShadowOpacity: 0.35,
          mobileScrollSupport: false,
          usePortrait: window.innerWidth < 768,
        })
        pf.loadFromHTML(pageEls)
        flip = pf
        setLoading(false)
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e))
        setLoading(false)
      }
    })()

    return () => {
      cancelled = true
      flip?.destroy?.()
    }
  }, [url])

  if (error) {
    return (
      <div className="text-center">
        <a href={url} target="_blank" rel="noreferrer" className="text-[hsl(var(--brand))] hover:underline">
          Open the PDF →
        </a>
        <p className="mt-1 text-xs text-muted-foreground/60">{error}</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      {loading && <div className="py-16 text-sm text-muted-foreground">Loading deck…</div>}
      <div ref={hostRef} className="w-full [&_.flipbook-page]:overflow-hidden [&_.flipbook-page]:rounded-md [&_.flipbook-page]:bg-white" />
      <p className="mt-3 text-xs text-muted-foreground">Drag a corner to flip · 拖動頁角翻頁</p>
    </div>
  )
}
