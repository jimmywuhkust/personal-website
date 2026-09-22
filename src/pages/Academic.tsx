import { ExternalLink } from 'lucide-react'
import { useLang } from '../i18n'
import { getContent } from '../content'
import Reveal from '../components/effects/Reveal'
import BrandLogo from '../components/BrandLogo'

const TYPE_LABEL: Record<string, { en: string; zhHant: string; zhHans: string }> = {
  conference: { en: 'Conference', zhHant: '會議論文', zhHans: '会议论文' },
  journal: { en: 'Journal', zhHant: '期刊論文', zhHans: '期刊论文' },
  workshop: { en: 'Workshop', zhHant: '工作坊', zhHans: '工作坊' },
  art: { en: 'Art Paper', zhHant: '藝術論文', zhHans: '艺术论文' },
  demo: { en: 'Demo', zhHant: '示範論文', zhHans: '示范论文' },
}

/** Renders the author list with Jimmy's own name highlighted. */
function Authors({ authors }: { authors: string }) {
  const NAMES = ['Chun Ming Wu', 'C.M. Wu', 'CM Wu', 'C. M. Wu']
  const pattern = new RegExp(`(${NAMES.map((n) => n.replace(/[.]/g, '\\.')).join('|')})`, 'g')
  const parts = authors.split(pattern)
  return (
    <p className="mt-1.5 text-sm text-muted-foreground">
      {parts.map((part, i) =>
        NAMES.includes(part) ? (
          <strong key={i} className="font-semibold text-foreground underline decoration-[hsl(var(--brand))] decoration-2 underline-offset-4">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </p>
  )
}

export default function Academic() {
  const { t, lt, lang } = useLang()
  const { publications } = getContent()

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-32 sm:px-6">
      <Reveal>
        <h1 className="font-display text-4xl font-bold sm:text-5xl">
          {t('section.academic')}
          <span className="text-gradient">.</span>
        </h1>
        <p className="mt-3 text-muted-foreground">{t('section.academic.sub')}</p>
      </Reveal>

      <div className="mt-12 space-y-5">
        {publications.map((p, i) => (
          <Reveal key={p.id} delay={i * 80}>
            <div className="glass-card group flex gap-5 p-6">
              <BrandLogo src={p.logo} name={p.venue} size={48} className="hidden sm:flex" />
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded-full bg-secondary px-2.5 py-0.5 text-secondary-foreground">
                    {TYPE_LABEL[p.type]?.[lang] ?? p.type}
                  </span>
                  <span className="text-muted-foreground">{p.year}</span>
                  {p.firstAuthor && (
                    <span className="rounded-full bg-[hsl(var(--brand))] px-2.5 py-0.5 font-semibold text-white">
                      {t('academic.firstAuthor')}
                    </span>
                  )}
                  {p.note && (
                    <span className="rounded-full border border-[hsl(var(--brand-2))]/50 px-2.5 py-0.5 text-[hsl(var(--brand-2))]">
                      {lt(p.note)}
                    </span>
                  )}
                </div>
                <h2 className="mt-2 font-display text-lg font-semibold leading-snug">{p.title}</h2>
                <Authors authors={p.authors} />
                <p className="mt-1 text-sm italic text-muted-foreground/80">{p.venue}</p>
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm text-[hsl(var(--brand))] hover:underline"
                  >
                    {t('academic.view')} <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
