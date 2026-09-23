import { useState } from 'react'
import { Link } from 'react-router'
import { ArrowRight, ArrowDown, ArrowUpRight, ChevronDown, MapPin, Download } from 'lucide-react'
import { useLang } from '../i18n'
import { getContent } from '../content'
import ParticleField from '../components/effects/ParticleField'
import FloatingGallery from '../components/effects/FloatingGallery'
import Reveal from '../components/effects/Reveal'
import Magnetic from '../components/effects/Magnetic'
import TiltCard from '../components/effects/TiltCard'
import ProjectCard from '../components/ProjectCard'
import MediaTimeline from '../components/MediaTimeline'
import PressStrip from '../components/PressStrip'
import { cn } from '@/lib/utils'

export default function Home() {
  const { t, lt, lang } = useLang()
  const content = getContent()
  const { profile } = content
  const featured = content.projects.filter((p) => p.featured)
  const latestMedia = content.media.slice(0, 5)

  // Toolbox: selected skill expands to show the projects that use it
  const [activeSkill, setActiveSkill] = useState<string | null>(null)
  const projectsUsing = (skillId: string) => content.projects.filter((p) => p.skills?.includes(skillId))

  return (
    <div>
      {/* ---------- HERO ---------- */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden">
        {/* ambient glows */}
        <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-[hsl(var(--brand))] opacity-20 blur-[120px] floaty" />
        <div
          className="pointer-events-none absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-[hsl(var(--brand-2))] opacity-15 blur-[120px] floaty"
          style={{ animationDelay: '-4s' }}
        />
        <ParticleField />
        <FloatingGallery />

        <div className="pointer-events-none relative z-10 mx-auto w-full max-w-6xl px-4 pb-24 pt-28 sm:px-6">
          <Reveal>
            <p className="mb-4 flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-[hsl(var(--brand))]">
              <MapPin size={14} /> {lt(profile.location)}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl lg:text-8xl">
              {/* Given name carries the gradient accent: "Jimmy" / 駿銘 / 骏铭 */}
              {(() => {
                const name = lt(profile.name)
                if (lang === 'en') {
                  const [first, ...rest] = name.split(' ')
                  return (
                    <>
                      <span className="text-gradient">{first}</span> {rest.join(' ')}
                      <span className="text-gradient">.</span>
                    </>
                  )
                }
                return (
                  <>
                    {name.slice(0, 1)}
                    <span className="text-gradient">{name.slice(1)}</span>
                  </>
                )
              })()}
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">{lt(profile.role)}</p>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-3 max-w-2xl font-display text-2xl font-medium leading-snug sm:text-3xl">
              {lt(profile.tagline)}
            </p>
          </Reveal>
          <Reveal delay={400}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Magnetic className="pointer-events-auto">
                <Link
                  to="/projects"
                  className="group flex items-center gap-2 rounded-full bg-foreground px-6 py-3 font-medium text-background transition-transform hover:scale-105"
                >
                  {t('hero.viewProjects')}
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </Magnetic>
              <Magnetic className="pointer-events-auto">
                <a
                  href="/cv.pdf"
                  download
                  className="flex items-center gap-2 rounded-full border border-border px-6 py-3 font-medium transition-colors hover:border-[hsl(var(--brand))] hover:text-[hsl(var(--brand))]"
                >
                  <Download size={16} /> {t('hero.downloadCV')}
                </a>
              </Magnetic>
              {profile.email && (
                <Magnetic className="pointer-events-auto">
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-2 rounded-full border border-border px-6 py-3 font-medium transition-colors hover:border-[hsl(var(--brand))] hover:text-[hsl(var(--brand))]"
                  >
                    {profile.email}
                  </a>
                </Magnetic>
              )}
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-muted-foreground">
          <div className="flex flex-col items-center gap-2 text-xs uppercase tracking-widest">
            {t('hero.scroll')}
            <ArrowDown size={14} className="animate-bounce" />
          </div>
        </div>
      </section>

      {/* ---------- ABOUT ---------- */}
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
          <Reveal>
            {profile.portrait && (
              <TiltCard className="mb-8 max-w-[240px] overflow-hidden p-0">
                <img
                  src={profile.portrait}
                  alt={lt(profile.name)}
                  className="aspect-square w-full object-cover"
                  loading="lazy"
                />
              </TiltCard>
            )}
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              {t('home.about')}
              <span className="text-gradient">.</span>
            </h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {profile.researchInterests.map((r) => (
                <span key={r} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                  {r}
                </span>
              ))}
            </div>
          </Reveal>
          <div className="space-y-5">
            {profile.bio.map((p, i) => (
              <Reveal key={i} delay={i * 120}>
                <p className="leading-relaxed text-muted-foreground">{lt(p)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- EXPERIENCE ---------- */}
      <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        <Reveal className="mb-8">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            {t('home.experience')}
            <span className="text-gradient">.</span>
          </h2>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {content.experience.map((e, i) => (
            <Reveal key={e.id} delay={i * 60}>
              <div className="glass-card flex items-start justify-between gap-4 p-5">
                <div>
                  <h3 className="font-display font-semibold leading-snug">{lt(e.role)}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{lt(e.org)}</p>
                </div>
                <span className="shrink-0 rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
                  {e.period}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- TOOLBOX (click a skill → projects that use it) ---------- */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal className="mb-8">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            {t('home.toolbox')}
            <span className="text-gradient">.</span>
          </h2>
        </Reveal>
        {(['pro', 'learning'] as const).map((level) => {
          const levelSkills = content.skills.filter((s) => s.level === level)
          const selected = levelSkills.find((s) => s.id === activeSkill)
          return (
            <div key={level} className="mb-8 last:mb-0">
              <Reveal>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                  {t(`toolbox.${level}`)}
                </p>
              </Reveal>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
                {levelSkills.map((s, i) => {
                  const isActive = activeSkill === s.id
                  const linked = projectsUsing(s.id)
                  return (
                    <Reveal key={s.id} delay={i * 50}>
                      <button
                        type="button"
                        onClick={() => setActiveSkill(isActive ? null : s.id)}
                        className="block w-full text-left"
                        aria-expanded={isActive}
                      >
                        <TiltCard
                          className={cn(
                            'flex flex-col items-center gap-2.5 p-4 text-center transition-colors',
                            isActive && 'border-[hsl(var(--brand))]',
                          )}
                          max={10}
                        >
                          {s.icon ? (
                            <span className="flex h-10 w-10 items-center justify-center">
                              <img src={s.icon} alt={`${s.name} logo`} loading="lazy" className="max-h-full max-w-full object-contain" />
                            </span>
                          ) : (
                            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[hsl(var(--brand))] to-[hsl(var(--brand-2))] font-display text-lg font-bold text-white">
                              {s.name.charAt(0)}
                            </span>
                          )}
                          <span className="text-xs font-medium leading-tight">{s.name}</span>
                          <ChevronDown
                            size={12}
                            className={cn(
                              'text-muted-foreground transition-transform duration-300',
                              isActive && 'rotate-180 text-[hsl(var(--brand))]',
                              linked.length === 0 && 'opacity-30',
                            )}
                          />
                        </TiltCard>
                      </button>
                    </Reveal>
                  )
                })}
              </div>
              {/* expansion strip for the selected skill in this level */}
              {selected && (
                <div className="glass-card mt-4 flex flex-wrap items-center gap-3 p-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {selected.name} · {t('toolbox.usedIn')}
                  </span>
                  {projectsUsing(selected.id).length === 0 ? (
                    <span className="text-sm text-muted-foreground">{t('toolbox.noProjects')}</span>
                  ) : (
                    projectsUsing(selected.id).map((p) => (
                      <Link
                        key={p.id}
                        to={`/projects/${p.id}`}
                        className="group flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm transition-colors hover:border-[hsl(var(--brand))] hover:text-[hsl(var(--brand))]"
                      >
                        {lt(p.title)}
                        <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>
          )
        })}
      </section>

      {/* ---------- FEATURED PROJECTS ---------- */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal className="mb-10 flex items-end justify-between">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            {t('home.featuredProjects')}
            <span className="text-gradient">.</span>
          </h2>
          <Link to="/projects" className="group flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            {t('home.allProjects')}
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 120}>
              <ProjectCard project={p} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- MEDIA PREVIEW ---------- */}
      {latestMedia.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <Reveal className="mb-4 flex items-end justify-between">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              {t('home.latestMedia')}
              <span className="text-gradient">.</span>
            </h2>
            <Link to="/media" className="group flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              {t('home.allMedia')}
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
          <div className="mb-10">
            <PressStrip items={content.media} />
          </div>
          <MediaTimeline items={latestMedia} />
        </section>
      )}
    </div>
  )
}
