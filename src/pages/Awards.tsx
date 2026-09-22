import { Link } from 'react-router'
import { ExternalLink } from 'lucide-react'
import { useLang } from '../i18n'
import { getContent } from '../content'
import Reveal from '../components/effects/Reveal'
import BrandLogo from '../components/BrandLogo'

export default function Awards() {
  const { t, lt } = useLang()
  const { awards, projects } = getContent()

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-32 sm:px-6">
      <Reveal>
        <h1 className="font-display text-4xl font-bold sm:text-5xl">
          {t('section.awards')}
          <span className="text-gradient">.</span>
        </h1>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {awards.map((a, i) => {
          const project = a.project ? projects.find((p) => p.id === a.project) : undefined
          return (
            <Reveal key={a.id} delay={i * 100}>
              <div className="glass-card relative overflow-hidden">
                <div className="pointer-events-none absolute -right-10 -top-10 z-10 h-40 w-40 rounded-full bg-[hsl(var(--brand-2))] opacity-10 blur-3xl" />
                {a.image && (
                  <img src={a.image} alt={lt(a.title)} loading="lazy" className="aspect-video w-full object-cover" />
                )}
                <div className="relative flex gap-4 p-6">
                  <BrandLogo src={a.logo} name={lt(a.issuer)} size={48} />
                  <div className="min-w-0 flex-1">
                    <h2 className="font-display text-xl font-bold leading-snug">{lt(a.title)}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">{lt(a.issuer)}</p>
                    <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground/70">{a.date}</p>
                    <div className="mt-4 flex flex-wrap gap-3 text-sm">
                      {project && (
                        <Link to={`/projects/${project.id}`} className="text-[hsl(var(--brand))] hover:underline">
                          {lt(project.title)} →
                        </Link>
                      )}
                      {a.url && (
                        <a
                          href={a.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
                        >
                          Source <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </div>
  )
}
