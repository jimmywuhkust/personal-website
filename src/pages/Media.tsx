import { useLang } from '../i18n'
import { getContent } from '../content'
import MediaTimeline from '../components/MediaTimeline'
import Reveal from '../components/effects/Reveal'

export default function Media() {
  const { t } = useLang()
  const { media } = getContent()

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-32 sm:px-6">
      <Reveal>
        <h1 className="font-display text-4xl font-bold sm:text-5xl">
          {t('section.media')}
          <span className="text-gradient">.</span>
        </h1>
        <p className="mt-3 text-muted-foreground">{t('section.media.sub')}</p>
      </Reveal>
      <div className="mt-8">
        <MediaTimeline items={media} />
      </div>
    </div>
  )
}
