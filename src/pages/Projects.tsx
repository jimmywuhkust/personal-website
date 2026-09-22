import { useState } from 'react'
import { useLang } from '../i18n'
import { getContent } from '../content'
import type { ProjectCategory } from '../content/types'
import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/effects/Reveal'
import { cn } from '@/lib/utils'

const CATS: (ProjectCategory | 'all')[] = ['all', 'hardware', 'software', 'research', 'design']

export default function Projects() {
  const { t } = useLang()
  const { projects } = getContent()
  const [cat, setCat] = useState<ProjectCategory | 'all'>('all')
  const filtered = cat === 'all' ? projects : projects.filter((p) => p.category === cat)

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-32 sm:px-6">
      <Reveal>
        <h1 className="font-display text-4xl font-bold sm:text-5xl">
          {t('section.projects')}
          <span className="text-gradient">.</span>
        </h1>
        <p className="mt-3 text-muted-foreground">{t('section.projects.sub')}</p>
      </Reveal>

      <Reveal delay={120} className="mt-8 flex flex-wrap gap-2">
        {CATS.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={cn(
              'rounded-full border px-4 py-1.5 text-sm transition-all',
              cat === c
                ? 'border-foreground bg-foreground text-background'
                : 'border-border text-muted-foreground hover:border-foreground/50 hover:text-foreground',
            )}
          >
            {c === 'all' ? 'All' : t(`cat.${c}`)}
          </button>
        ))}
      </Reveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, i) => (
          <Reveal key={p.id} delay={i * 80}>
            <ProjectCard project={p} index={i} />
          </Reveal>
        ))}
      </div>
    </div>
  )
}
