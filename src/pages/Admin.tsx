import { useMemo, useRef, useState } from 'react'
import { Plus, Trash2, Download, Upload, RotateCcw, Pencil, Check, X, Lock, LogOut } from 'lucide-react'
import { useLang } from '../i18n'
import { checkAdminPassword, isAdminAuthed, setAdminAuthed } from '../admin-auth'
import {
  getContent,
  saveOverride,
  clearOverride,
  hasOverride,
  type SiteContent,
} from '../content'
import { cn } from '@/lib/utils'

type SectionKey = 'profile' | 'projects' | 'publications' | 'awards' | 'patents' | 'media' | 'experience' | 'skills'
const SECTIONS: SectionKey[] = ['profile', 'projects', 'publications', 'awards', 'patents', 'media', 'experience', 'skills']

/* ------------------------------------------------------------------ */
/* Generic field editors                                               */
/* ------------------------------------------------------------------ */

function isLText(v: unknown): boolean {
  return (
    typeof v === 'object' &&
    v !== null &&
    'en' in v &&
    'zhHant' in v &&
    'zhHans' in v &&
    Object.keys(v as object).every((k) => ['en', 'zhHant', 'zhHans'].includes(k))
  )
}

const inputCls =
  'w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-[hsl(var(--brand))]'

function FieldEditor({
  label,
  value,
  onChange,
}: {
  label: string
  value: unknown
  onChange: (v: unknown) => void
}) {
  // Tri-lingual text
  if (isLText(value)) {
    const v = value as { en: string; zhHant: string; zhHans: string }
    return (
      <div className="space-y-1.5">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        {(['en', 'zhHant', 'zhHans'] as const).map((k) => (
          <div key={k} className="flex items-center gap-2">
            <span className="w-8 shrink-0 text-xs text-muted-foreground">
              {k === 'en' ? 'EN' : k === 'zhHant' ? '繁' : '简'}
            </span>
            <textarea
              className={cn(inputCls, 'min-h-[38px]')}
              rows={v[k].length > 80 ? 3 : 1}
              value={v[k]}
              onChange={(e) => onChange({ ...v, [k]: e.target.value })}
            />
          </div>
        ))}
      </div>
    )
  }
  // Plain string
  if (typeof value === 'string') {
    return (
      <div className="space-y-1.5">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        {value.length > 100 ? (
          <textarea className={inputCls} rows={3} value={value} onChange={(e) => onChange(e.target.value)} />
        ) : (
          <input className={inputCls} value={value} onChange={(e) => onChange(e.target.value)} />
        )}
      </div>
    )
  }
  // Boolean
  if (typeof value === 'boolean') {
    return (
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} />
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
      </label>
    )
  }
  // Array of plain strings → one per line
  if (Array.isArray(value) && value.every((x) => typeof x === 'string')) {
    return (
      <div className="space-y-1.5">
        <p className="text-xs font-medium text-muted-foreground">{label} (one per line)</p>
        <textarea
          className={cn(inputCls, 'font-mono text-xs')}
          rows={Math.max(3, value.length + 1)}
          value={(value as string[]).join('\n')}
          onChange={(e) => onChange(e.target.value.split('\n').map((s) => s.trim()).filter(Boolean))}
        />
      </div>
    )
  }
  // Arrays of objects (collaborators, links, bio, highlights…) → JSON editor
  return <JsonField label={label} value={value} onChange={onChange} />
}

function JsonField({ label, value, onChange }: { label: string; value: unknown; onChange: (v: unknown) => void }) {
  const [text, setText] = useState(JSON.stringify(value, null, 2))
  const [err, setErr] = useState(false)
  return (
    <div className="space-y-1.5">
      <p className="text-xs font-medium text-muted-foreground">
        {label} <span className="opacity-60">(JSON)</span>
        {err && <span className="ml-2 text-destructive">invalid — not applied</span>}
      </p>
      <textarea
        className={cn(inputCls, 'font-mono text-xs', err && 'border-destructive')}
        rows={Math.min(14, Math.max(4, text.split('\n').length))}
        value={text}
        onChange={(e) => {
          setText(e.target.value)
          try {
            onChange(JSON.parse(e.target.value))
            setErr(false)
          } catch {
            setErr(true)
          }
        }}
      />
    </div>
  )
}

/** Generic object editor: renders a FieldEditor per key. */
function ObjectEditor<T extends Record<string, unknown>>({
  obj,
  onChange,
}: {
  obj: T
  onChange: (o: T) => void
}) {
  return (
    <div className="space-y-4">
      {Object.entries(obj).map(([key, value]) => (
        <FieldEditor
          key={key}
          label={key}
          value={value}
          onChange={(v) => onChange({ ...obj, [key]: v })}
        />
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Templates for "Add item"                                            */
/* ------------------------------------------------------------------ */

const L = { en: '', zhHant: '', zhHans: '' }
const TEMPLATES: Record<string, () => Record<string, unknown>> = {
  projects: () => ({
    id: `project-${Date.now()}`,
    title: { ...L },
    tagline: { ...L },
    description: { ...L },
    category: 'software',
    year: String(new Date().getFullYear()),
    role: { ...L },
    status: { ...L },
    collaborators: [],
    links: [],
    tags: [],
    highlights: [],
    featured: false,
  }),
  publications: () => ({
    id: `pub-${Date.now()}`,
    title: '',
    authors: '',
    venue: '',
    year: String(new Date().getFullYear()),
    type: 'conference',
    url: '',
  }),
  awards: () => ({
    id: `award-${Date.now()}`,
    title: { ...L },
    issuer: { ...L },
    date: new Date().toISOString().slice(0, 7),
    project: '',
    url: '',
  }),
  patents: () => ({
    id: `pat-${Date.now()}`,
    title: { ...L },
    number: '',
    status: { ...L },
    date: new Date().toISOString().slice(0, 7),
    inventors: '',
    url: '',
  }),
  media: () => ({
    id: `media-${Date.now()}`,
    date: new Date().toISOString().slice(0, 10),
    outlet: '',
    title: { ...L },
    summary: { ...L },
    url: '',
    kind: 'article',
  }),
  experience: () => ({
    id: `exp-${Date.now()}`,
    role: { ...L },
    org: { ...L },
    period: '',
    kind: 'work',
  }),
  skills: () => ({
    id: `skill-${Date.now()}`,
    name: '',
    level: 'learning',
    icon: '',
  }),
}

function itemLabel(item: Record<string, unknown>): string {
  const cand = item.title ?? item.name ?? item.role ?? item.id
  if (isLText(cand)) return (cand as { en: string }).en || '(untitled)'
  return String(cand ?? '(untitled)')
}

/* ------------------------------------------------------------------ */
/* Admin page                                                          */
/* ------------------------------------------------------------------ */

export default function Admin() {
  const { t } = useLang()
  const [authed, setAuthed] = useState(isAdminAuthed())
  const [pw, setPw] = useState('')
  const [pwError, setPwError] = useState(false)
  const [section, setSection] = useState<SectionKey>('profile')
  const [data, setData] = useState<SiteContent>(() => getContent())
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [rawMode, setRawMode] = useState(false)
  const [rawText, setRawText] = useState('')
  const [notice, setNotice] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const tryLogin = async () => {
    if (await checkAdminPassword(pw)) {
      setAdminAuthed(true)
      setAuthed(true)
    } else {
      setPwError(true)
    }
  }

  if (!authed) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4 pt-16">
        <div className="glass-card w-full max-w-sm p-8">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border">
              <Lock size={16} />
            </span>
            <h1 className="font-display text-xl font-bold">{t('admin.title')}</h1>
          </div>
          <input
            type="password"
            autoFocus
            placeholder="Password"
            value={pw}
            onChange={(e) => {
              setPw(e.target.value)
              setPwError(false)
            }}
            onKeyDown={(e) => e.key === 'Enter' && tryLogin()}
            className={cn(
              'w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none',
              pwError ? 'border-destructive' : 'border-border focus:border-[hsl(var(--brand))]',
            )}
          />
          {pwError && <p className="mt-2 text-xs text-destructive">Wrong password.</p>}
          <button
            onClick={tryLogin}
            className="mt-4 w-full rounded-full bg-foreground py-2.5 text-sm font-medium text-background"
          >
            {t('admin.login')}
          </button>
        </div>
      </div>
    )
  }

  const flash = (msg: string) => {
    setNotice(msg)
    window.setTimeout(() => setNotice(''), 2600)
  }

  const isArraySection = section !== 'profile'

  const currentList = useMemo(
    () => (isArraySection ? (data[section] as unknown as Record<string, unknown>[]) : null),
    [data, section, isArraySection],
  )

  const commit = (next: SiteContent, msg?: string) => {
    setData(next)
    saveOverride({ [section]: next[section] } as Partial<SiteContent>)
    flash(msg ?? t('admin.saved'))
  }

  const enterRaw = () => {
    setRawText(JSON.stringify(data[section], null, 2))
    setRawMode(true)
  }

  const saveRaw = () => {
    try {
      const parsed = JSON.parse(rawText)
      commit({ ...data, [section]: parsed } as SiteContent)
      setRawMode(false)
    } catch {
      flash(t('admin.invalidJson'))
    }
  }

  const exportAll = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'site-content.json'
    a.click()
    URL.revokeObjectURL(a.href)
  }

  const importAll = (file: File) => {
    file.text().then((text) => {
      try {
        const parsed = JSON.parse(text) as Partial<SiteContent>
        const next = { ...data }
        for (const key of SECTIONS) {
          if (parsed[key] !== undefined) {
            ;(next as Record<string, unknown>)[key] = parsed[key]
          }
        }
        setData(next)
        saveOverride(parsed)
        flash(t('admin.saved'))
      } catch {
        flash(t('admin.invalidJson'))
      }
    })
  }

  return (
    <div className="mx-auto max-w-5xl px-4 pb-24 pt-32 sm:px-6">
      <h1 className="font-display text-4xl font-bold">
        {t('admin.title')}
        <span className="text-gradient">.</span>
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{t('admin.hint')}</p>
      {hasOverride() && (
        <p className="mt-2 text-xs text-[hsl(var(--brand-2))]">● local edits active</p>
      )}

      {/* toolbar */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button onClick={exportAll} className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:border-[hsl(var(--brand))]">
          <Download size={14} /> {t('admin.export')}
        </button>
        <button onClick={() => fileRef.current?.click()} className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:border-[hsl(var(--brand))]">
          <Upload size={14} /> {t('admin.import')}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && importAll(e.target.files[0])}
        />
        <button
          onClick={() => {
            clearOverride()
            setData(getContent())
            setEditingIndex(null)
            flash(t('admin.resetDone'))
          }}
          className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:border-destructive hover:text-destructive"
        >
          <RotateCcw size={14} /> {t('admin.reset')}
        </button>
        <button
          onClick={() => {
            setAdminAuthed(false)
            setAuthed(false)
          }}
          className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <LogOut size={14} /> {t('admin.logout')}
        </button>
        {notice && <span className="text-sm text-[hsl(var(--brand))]">{notice}</span>}
      </div>

      {/* section tabs */}
      <div className="mt-8 flex flex-wrap gap-2 border-b border-border pb-4">
        {SECTIONS.map((s) => (
          <button
            key={s}
            onClick={() => {
              setSection(s)
              setEditingIndex(null)
              setRawMode(false)
            }}
            className={cn(
              'rounded-full px-4 py-1.5 text-sm transition-colors',
              section === s ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {t(`admin.section.${s}`)}
          </button>
        ))}
      </div>

      {/* editor area */}
      <div className="mt-8">
        {rawMode ? (
          <div>
            <textarea
              className={cn(inputCls, 'min-h-[420px] font-mono text-xs')}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
            />
            <div className="mt-4 flex gap-3">
              <button onClick={saveRaw} className="rounded-full bg-foreground px-5 py-2 text-sm text-background">
                {t('admin.save')}
              </button>
              <button onClick={() => setRawMode(false)} className="rounded-full border border-border px-5 py-2 text-sm">
                {t('admin.cancel')}
              </button>
            </div>
          </div>
        ) : section === 'profile' ? (
          <div className="glass-card p-6">
            <ObjectEditor
              obj={data.profile as unknown as Record<string, unknown>}
              onChange={(o) => commit({ ...data, profile: o as unknown as SiteContent['profile'] })}
            />
            <RawToggle onClick={enterRaw} label={t('admin.raw')} />
          </div>
        ) : editingIndex !== null && currentList ? (
          /* ---- single item editing ---- */
          <div className="glass-card p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold">
                {t('admin.edit')}: {itemLabel(currentList[editingIndex])}
              </h2>
              <button onClick={() => setEditingIndex(null)} className="rounded-full border border-border p-2" aria-label="close">
                <X size={14} />
              </button>
            </div>
            <ObjectEditor
              obj={currentList[editingIndex]}
              onChange={(o) => {
                const nextList = [...currentList]
                nextList[editingIndex] = o
                commit({ ...data, [section]: nextList } as SiteContent)
              }}
            />
          </div>
        ) : (
          /* ---- list of items ---- */
          <div>
            <div className="mb-4 flex items-center gap-3">
              <button
                onClick={() => {
                  const nextList = [...(currentList ?? []), TEMPLATES[section]()]
                  commit({ ...data, [section]: nextList } as SiteContent)
                  setEditingIndex(nextList.length - 1)
                }}
                className="flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm text-background"
              >
                <Plus size={14} /> {t('admin.item.add')}
              </button>
              <RawToggle onClick={enterRaw} label={t('admin.raw')} />
            </div>
            <div className="space-y-3">
              {(currentList ?? []).map((item, i) => (
                <div key={String(item.id ?? i)} className="glass-card flex items-center justify-between gap-4 p-4">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{itemLabel(item)}</p>
                    <p className="truncate text-xs text-muted-foreground">{String(item.id)}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      onClick={() => setEditingIndex(i)}
                      className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs hover:border-[hsl(var(--brand))]"
                    >
                      <Pencil size={12} /> {t('admin.edit')}
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(t('admin.item.confirmDelete'))) {
                          const nextList = (currentList ?? []).filter((_, j) => j !== i)
                          commit({ ...data, [section]: nextList } as SiteContent)
                        }
                      }}
                      className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground hover:border-destructive hover:text-destructive"
                    >
                      <Trash2 size={12} /> {t('admin.item.delete')}
                    </button>
                  </div>
                </div>
              ))}
              {(currentList ?? []).length === 0 && (
                <p className="py-10 text-center text-sm text-muted-foreground">— empty —</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* restore defaults helper */}
      <p className="mt-12 text-xs text-muted-foreground/70">
        Default content lives in <code>src/content/*.ts</code>. Export JSON after editing and hand it to your AI to
        merge back permanently.
      </p>
    </div>
  )
}

function RawToggle({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button onClick={onClick} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
      <Check size={12} /> {label}
    </button>
  )
}
