import { useState } from 'react';
import { NUTRAINTEL_CONFIG } from '../config.js';
import { useLanguage } from '../i18n.jsx';

export default function Video() {
  const [playing, setPlaying] = useState(false);
  const [missing, setMissing] = useState(false);
  const { t } = useLanguage();
  const url = (NUTRAINTEL_CONFIG.videoUrl || '').trim();
  return (
    <section className="vid" id="video" aria-labelledby="vid-title" data-section="5">
      <div className="vid-head">
        <h2 id="vid-title" data-blur className="t-display">
          {t('video.titleBefore')}
          <strong>{t('video.titleEmphasis')}</strong>
        </h2>
      </div>
      <div className="vid-card" data-fade>
        {playing ? (
          <iframe src={url} title={t('video.iframe')} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
        ) : (
          <button className="vid-poster" type="button" aria-label={t('video.play')} onClick={() => (url ? setPlaying(true) : setMissing(true))}>
            <span className="vid-play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg></span>
            <span className="vid-note">{missing ? t('video.missing') : t('video.label')}</span>
          </button>
        )}
      </div>
    </section>
  );
}
