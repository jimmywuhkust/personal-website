import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { Menu, X, Moon, Sun, Download } from 'lucide-react'
import { useLang } from '../../i18n'
import { useTheme } from '../../hooks/theme'
import type { Lang } from '../../content/types'
import { cn } from '@/lib/utils'

const LANGS: { id: Lang; label: string }[] = [
  { id: 'en', label: 'EN' },
  { id: 'zhHant', label: '繁' },
  { id: 'zhHans', label: '简' },
]

const NAV_ITEMS = [
  { to: '/projects', key: 'nav.projects' },
  { to: '/academic', key: 'nav.academic' },
  { to: '/awards', key: 'nav.awards' },
  { to: '/patents', key: 'nav.patents' },
  { to: '/media', key: 'nav.media' },
]

export default function Navbar() {
  const { lang, setLang, t } = useLang()
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'border-b border-border/60 bg-background/80 backdrop-blur-xl' : 'bg-transparent',
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="font-display text-lg font-bold tracking-tight">
          <span className="text-gradient">Jimmy</span> Wu
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn('nav-link text-sm text-muted-foreground hover:text-foreground', isActive && 'active text-foreground')
              }
            >
              {t(item.key)}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {/* Language switch */}
          <div className="flex rounded-full border border-border/70 p-0.5 text-xs">
            {LANGS.map((l) => (
              <button
                key={l.id}
                onClick={() => setLang(l.id)}
                className={cn(
                  'rounded-full px-2.5 py-1 transition-colors',
                  lang === l.id ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground',
                )}
                aria-pressed={lang === l.id}
              >
                {l.label}
              </button>
            ))}
          </div>
          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-full border border-border/70 p-2 text-muted-foreground hover:text-foreground"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <a
            href="/cv.pdf"
            download
            className="flex items-center gap-1.5 rounded-full bg-foreground px-4 py-1.5 text-sm font-medium text-background transition-transform hover:scale-105"
          >
            <Download size={14} /> CV
          </a>
        </div>

        {/* Mobile buttons */}
        <div className="flex items-center gap-2 md:hidden">
          <div className="flex rounded-full border border-border/70 p-0.5 text-xs">
            {LANGS.map((l) => (
              <button
                key={l.id}
                onClick={() => setLang(l.id)}
                className={cn(
                  'rounded-full px-2 py-1',
                  lang === l.id ? 'bg-foreground text-background' : 'text-muted-foreground',
                )}
              >
                {l.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-full border border-border/70 p-2 text-muted-foreground"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button onClick={() => setOpen(!open)} className="p-2" aria-label="Menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border/60 bg-background/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col px-6 py-4">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.to} to={item.to} className="border-b border-border/40 py-3 text-base last:border-0">
                {t(item.key)}
              </NavLink>
            ))}
            <a href="/cv.pdf" download className="flex items-center gap-2 py-3 text-base">
              <Download size={16} /> {t('hero.downloadCV')}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
