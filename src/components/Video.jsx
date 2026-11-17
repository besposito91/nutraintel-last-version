import { NUTRAINTEL_CONFIG } from '../config.js';
import { useLanguage } from '../i18n.jsx';

export default function Video() {
  const { t } = useLanguage();
  const url = (NUTRAINTEL_CONFIG.videoUrl || '').trim();
  const isDirectVideo = /\.(mp4|webm|ogg)(?:[?#].*)?$/i.test(url);

  return (
    <section className="vid" id="video" aria-labelledby="vid-title" data-section="5">
      <div className="vid-head">
        <h2 id="vid-title" data-blur className="t-display">
          {t('video.titleBefore')}
          <strong>{t('video.titleEmphasis')}</strong>
        </h2>
      </div>
      <div className="vid-card" data-fade>
        {isDirectVideo ? (
          <video className="vid-player" controls playsInline preload="metadata">
            <source src={url} type="video/mp4" />
            {t('video.missing')}
          </video>
        ) : url ? (
          <iframe src={url} title={t('video.iframe')} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
        ) : (
          <p className="vid-note">{t('video.missing')}</p>
        )}
      </div>
    </section>
  );
}
