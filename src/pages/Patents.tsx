import { FileBadge, ExternalLink } from 'lucide-react'
import { Link } from 'react-router'
import { useLang } from '../i18n'
import { getContent } from '../content'
import Reveal from '../components/effects/Reveal'

export default function Patents() {
  const { t, lt } = useLang()
  const { patents } = getContent()

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-32 sm:px-6">
      <Reveal>
        <h1 className="font-display text-4xl font-bold sm:text-5xl">
          {t('section.patents')}
          <span className="text-gradient">.</span>
        </h1>
        <p className="mt-3 text-muted-foreground">{t('section.patents.sub')}</p>
      </Reveal>

      {patents.length === 0 ? (
        <Reveal delay={120}>
          <div className="glass-card mt-12 flex flex-col items-center gap-4 p-12 text-center">
            <FileBadge size={36} className="text-muted-foreground" />
            <p className="max-w-md text-muted-foreground">{t('empty.patents')}</p>
            <Link to="/admin" className="text-sm text-[hsl(var(--brand))] hover:underline">
              {t('nav.admin')} →
            </Link>
          </div>
        </Reveal>
      ) : (
        <div className="mt-12 space-y-5">
          {patents.map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <div className="glass-card p-6">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded-full bg-secondary px-2.5 py-0.5 text-secondary-foreground">{lt(p.status)}</span>
                  <span className="text-muted-foreground">{p.date}</span>
                  <span className="font-mono text-muted-foreground/70">{p.number}</span>
                </div>
                <h2 className="mt-2 font-display text-lg font-semibold">{lt(p.title)}</h2>
                <p className="mt-1.5 text-sm text-muted-foreground">{p.inventors}</p>
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm text-[hsl(var(--brand))] hover:underline"
                  >
                    View <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  )
}
