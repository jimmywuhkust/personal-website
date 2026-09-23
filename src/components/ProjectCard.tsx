import { Link } from 'react-router'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../content/types'
import { useLang } from '../i18n'
import TiltCard from './effects/TiltCard'
import { cn } from '@/lib/utils'

const CAT_GRADIENT: Record<Project['category'], string> = {
  hardware: 'from-sky-500/25 via-cyan-400/10 to-transparent',
  software: 'from-violet-500/25 via-fuchsia-400/10 to-transparent',
  research: 'from-amber-500/25 via-orange-400/10 to-transparent',
  design: 'from-emerald-500/25 via-teal-400/10 to-transparent',
}

export default function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const { t, lt } = useLang()

  return (
    <Link to={`/projects/${project.id}`} className="group block">
      <TiltCard className={cn('card-sheen flex h-full flex-col overflow-hidden')}>
        {/* visual header band */}
        <div
          className={cn(
            'relative h-36 overflow-hidden bg-gradient-to-br',
            CAT_GRADIENT[project.category],
            'flex items-end justify-between p-5',
          )}
        >
          {project.image && (
            <img
              src={project.image}
              alt={lt(project.title)}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
          <span className="relative font-display text-5xl font-bold text-foreground/15 transition-colors duration-500 group-hover:text-foreground/30">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="relative rounded-full border border-border/70 bg-background/60 px-3 py-1 text-xs backdrop-blur">
            {t(`cat.${project.category}`)}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-xl font-bold leading-tight">{lt(project.title)}</h3>
            <ArrowUpRight
              size={18}
              className="mt-1 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[hsl(var(--brand))]"
            />
          </div>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{lt(project.tagline)}</p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted-foreground">{project.year}</span>
            <span className="text-xs text-muted-foreground/50">·</span>
            <span className="text-xs text-muted-foreground">{lt(project.role)}</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </TiltCard>
    </Link>
  )
}
