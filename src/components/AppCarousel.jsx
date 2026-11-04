import { useEffect, useState } from 'react';
import { Phone, ScreenTrend, ScreenHydration, ScreenSteps } from './Phone.jsx';
import BlurText from './BlurText.jsx';

const slides = [
  { k: 'Andamento', S: ScreenTrend },
  { k: 'Idratazione', S: ScreenHydration },
  { k: 'Passi', S: ScreenSteps },
];

export default function AppCarousel() {
  const [i, setI] = useState(0);
  const n = slides.length;
  useEffect(() => { const t = setInterval(() => setI((v) => (v + 1) % n), 5200); return () => clearInterval(t); }, [i, n]);
  const pos = (j) => ((j - i + n) % n === 0 ? 'c' : (j - i + n) % n === 1 ? 'r' : 'l');

  return (
    <section className="car" id="app" aria-labelledby="car-title" data-section="3">
      <div className="mesh mesh-soft" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="car-head">
        <BlurText as="h2" id="car-title" data-blur className="t-display" text="Rendi il paziente protagonista del suo percorso." />
        <p data-fade>Attraverso l'app NutraIntel, il paziente consulta i propri dati, monitora le proprie abitudini e partecipa attivamente al percorso nutrizionale.</p>
      </div>
      <div className="car-tabs" role="tablist" aria-label="Schermate app">
        {slides.map((s, j) => <button key={s.k} role="tab" aria-selected={j === i} className={j === i ? 'on' : ''} onClick={() => setI(j)}>{s.k}</button>)}
      </div>
      <div className="car-stage" data-fade>
        <button className="car-arrow l" aria-label="Precedente" onClick={() => setI((i - 1 + n) % n)}>‹</button>
        {slides.map(({ k, S }, j) => (
          <div key={k} className={`car-item pos-${pos(j)}`} onClick={() => setI(j)} aria-hidden={j !== i}>
            <Phone><S /></Phone>
          </div>
        ))}
        <button className="car-arrow r" aria-label="Successiva" onClick={() => setI((i + 1) % n)}>›</button>
      </div>
      <div className="car-dots" aria-hidden="true">{slides.map((s, j) => <i key={s.k} className={j === i ? 'on' : ''} />)}</div>
      <a className="arrow-link" href="#funzioni">Scopri le funzionalità <span>→</span></a>
    </section>
  );
}
