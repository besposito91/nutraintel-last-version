import { useState } from 'react';
import { NUTRAINTEL_CONFIG } from '../config.js';
import BlurText from './BlurText.jsx';

export default function Video() {
  const [playing, setPlaying] = useState(false);
  const [missing, setMissing] = useState(false);
  const url = (NUTRAINTEL_CONFIG.videoUrl || '').trim();
  return (
    <section className="vid" id="video" aria-labelledby="vid-title" data-section="5">
      <div className="vid-head">
        <BlurText as="h2" id="vid-title" data-blur className="t-display" text="Guarda come NutraIntel rimette in connessione il percorso." />
      </div>
      <div className="vid-card" data-fade>
        {playing ? (
          <iframe src={url} title="Video NutraIntel" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
        ) : (
          <button className="vid-poster" type="button" aria-label="Riproduci il video NutraIntel" onClick={() => (url ? setPlaying(true) : setMissing(true))}>
            <span className="vid-play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg></span>
            <span className="vid-note">{missing ? 'Collega il link o l’embed del video per attivarlo' : 'Video di presentazione'}</span>
          </button>
        )}
      </div>
    </section>
  );
}
