import { lazy, Suspense } from 'react'
import { Link, useParams } from 'react-router'
import { ArrowLeft, ExternalLink, Users, Sparkles, Link2, Medal, Box, BookOpen } from 'lucide-react'

const Flipbook = lazy(() => import('../components/Flipbook'))
import { useLang } from '../i18n'
import { getContent } from '../content'
import Reveal from '../components/effects/Reveal'
import { cn } from '@/lib/utils'

const CAT_GRADIENT: Record<string, string> = {
  hardware: 'from-sky-500/30 via-cyan-400/10',
  software: 'from-violet-500/30 via-fuchsia-400/10',
  research: 'from-amber-500/30 via-orange-400/10',
  design: 'from-emerald-500/30 via-teal-400/10',
}

export default function ProjectDetail() {
  const { id } = useParams()
  const { t, lt } = useLang()
  const content = getContent()
  const project = content.projects.find((p) => p.id === id)
  const relatedAwards = content.awards.filter((a) => a.project === id)

  if (!project) {
    return (
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-40 sm:px-6">
        <p className="text-muted-foreground">{t('project.notFound')}</p>
        <Link to="/projects" className="mt-4 inline-flex items-center gap-2 text-[hsl(var(--brand))]">
          <ArrowLeft size={16} /> {t('project.back')}
        </Link>
      </div>
    )
  }

  return (
    <div className="pb-24">
      {/* hero band */}
      <div className={cn('relative overflow-hidden bg-gradient-to-br to-transparent pt-32', CAT_GRADIENT[project.category])}>
        {project.image && (
          <>
            <img
              src={project.image}
              alt={lt(project.title)}
              className="absolute inset-0 h-full w-full object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
          </>
        )}
        <div className="relative mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <Reveal>
            <Link to="/projects" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft size={15} /> {t('project.back')}
            </Link>
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="rounded-full border border-border bg-background/60 px-3 py-1 backdrop-blur">
                {t(`cat.${project.category}`)}
              </span>
              <span>{project.year}</span>
              <span>·</span>
              <span>{lt(project.status)}</span>
            </div>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-6xl">{lt(project.title)}</h1>
            <p className="mt-4 max-w-3xl text-lg text-muted-foreground">{lt(project.tagline)}</p>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* awards attached to this project */}
        {relatedAwards.length > 0 && (
          <Reveal className="mt-10">
            <div className="glass-card flex flex-wrap items-center gap-4 p-5">
              <Medal className="text-[hsl(var(--brand-2))]" size={26} />
              <div>
                {relatedAwards.map((a) => (
                  <p key={a.id} className="font-medium">
                    {lt(a.title)} — <span className="text-muted-foreground">{lt(a.issuer)}</span>
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        <div className="mt-12 grid gap-10 lg:grid-cols-[2fr_1fr]">
          {/* main column */}
          <div className="space-y-10">
            {project.videoUrl && (
              <Reveal>
                <div className="glass-card aspect-video overflow-hidden p-0">
                  <iframe
                    src={project.videoUrl}
                    title={lt(project.title)}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </Reveal>
            )}

            {project.images && project.images.length > 0 && (
              <Reveal>
                <div className="grid gap-4 sm:grid-cols-2">
                  {project.images.map((src, i) => (
                    <img
                      key={src}
                      src={src}
                      alt={`${lt(project.title)} — ${i + 1}`}
                      loading="lazy"
                      className={cn(
                        'glass-card w-full object-cover',
                        i === 0 && project.images!.length % 2 === 1 ? 'sm:col-span-2 aspect-video' : 'aspect-[4/3]',
                      )}
                    />
                  ))}
                </div>
              </Reveal>
            )}

            <Reveal>
              <p className="text-lg leading-relaxed text-muted-foreground">{lt(project.description)}</p>
            </Reveal>

            {/* 3D model preview (GLB/GLTF, e.g. exported PCB) — reserved slot */}
            {project.modelUrl && (
              <Reveal>
                <h2 className="mb-4 flex items-center gap-2 font-display text-2xl font-bold">
                  <Box size={20} className="text-[hsl(var(--brand))]" /> {t('project.model3d')}
                </h2>
                <div className="glass-card overflow-hidden p-0">
                  <model-viewer
                    src={project.modelUrl}
                    alt={lt(project.title)}
                    camera-controls
                    auto-rotate
                    shadow-intensity="1"
                    loading="lazy"
                    style={{ width: '100%', height: '420px', background: 'transparent' }}
                  />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{t('project.model3d.hint')}</p>
              </Reveal>
            )}

            {/* PDF deck flipbook (pitch decks, slides) — reserved slot */}
            {project.deckUrl && (
              <Reveal>
                <h2 className="mb-4 flex items-center gap-2 font-display text-2xl font-bold">
                  <BookOpen size={20} className="text-[hsl(var(--brand))]" /> {t('project.deck')}
                </h2>
                <div className="glass-card p-4 sm:p-6">
                  <Suspense fallback={<div className="py-16 text-center text-sm text-muted-foreground">Loading deck…</div>}>
                    <Flipbook url={project.deckUrl} />
                  </Suspense>
                </div>
              </Reveal>
            )}

            {project.highlights.length > 0 && (
              <Reveal>
                <h2 className="mb-4 flex items-center gap-2 font-display text-2xl font-bold">
                  <Sparkles size={20} className="text-[hsl(var(--brand))]" /> {t('project.highlights')}
                </h2>
                <ul className="space-y-3">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="glass-card flex items-start gap-3 p-4">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(var(--brand))]" />
                      <span className="text-sm leading-relaxed">{lt(h)}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            <Reveal>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* side column */}
          <div className="space-y-6">
            <Reveal>
              <div className="glass-card p-5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {t('project.role')}
                </h3>
                <p className="mt-2 font-medium">{lt(project.role)}</p>
              </div>
            </Reveal>

            {project.collaborators.length > 0 && (
              <Reveal delay={80}>
                <div className="glass-card p-5">
                  <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <Users size={13} /> {t('project.team')}
                  </h3>
                  <ul className="mt-3 space-y-3">
                    {project.collaborators.map((c) => (
                      <li key={c.name}>
                        {c.url ? (
                          <a href={c.url} target="_blank" rel="noreferrer" className="font-medium hover:text-[hsl(var(--brand))]">
                            {c.name}
                          </a>
                        ) : (
                          <p className="font-medium">{c.name}</p>
                        )}
                        <p className="text-xs text-muted-foreground">{lt(c.role)}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}

            {project.links.length > 0 && (
              <Reveal delay={160}>
                <div className="glass-card p-5">
                  <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <Link2 size={13} /> {t('project.links')}
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {project.links.map((l) => (
                      <li key={l.url}>
                        <a
                          href={l.url}
                          target="_blank"
                          rel="noreferrer"
                          className="group flex items-center gap-1.5 text-sm text-[hsl(var(--brand))] hover:underline"
                        >
                          {lt(l.label)}
                          <ExternalLink size={12} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
