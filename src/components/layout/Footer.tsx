import { useLang } from '../../i18n'
import { getContent } from '../../content'

export default function Footer() {
  const { t, lt } = useLang()
  const { profile } = getContent()

  return (
    <footer className="border-t border-border/60 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 sm:px-6 md:flex-row">
        <div className="text-center md:text-left">
          <p className="font-display font-bold">{lt(profile.name)}</p>
          <p className="text-sm text-muted-foreground">{lt(profile.affiliation)}</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
          {profile.links.map((l) => (
            <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="hover:text-foreground">
              {l.label}
            </a>
          ))}
          {/* Admin is intentionally NOT linked here — it lives at /admin behind a password gate. */}
        </div>
      </div>
      <p className="mt-8 text-center text-xs text-muted-foreground/70">
        © {new Date().getFullYear()} {lt(profile.name)} · {t('footer.madeWith')}
      </p>
    </footer>
  )
}
