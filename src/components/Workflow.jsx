
import { useEffect, useState } from 'react';
import { useLanguage } from '../i18n.jsx';

const caseImages = [
  ['./images/usecases/slide-1-left.webp', './images/usecases/slide-1-right.webp'],
  ['./images/usecases/slide-2-left.webp', './images/usecases/slide-2-right.webp'],
  ['./images/usecases/slide-3-left.webp', './images/usecases/slide-3-right.webp'],
  ['./images/usecases/slide-4-left.webp', './images/usecases/slide-4-right.webp'],
  ['./images/usecases/slide-5-left.webp', './images/usecases/slide-5-right.webp'],
  ['./images/usecases/slide-6-left.webp', './images/usecases/slide-6-right.webp'],
];

function ActorPanel({ src, position, visible = true }) {
  return (
    <article className={`uc-actor-panel side-${position} usecase-composite-panel ${visible ? 'is-visible' : 'is-waiting'}`}>
      <img
        className="usecase-composite"
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
      />
    </article>
  );
}

export default function Workflow() {
  const [step, setStep] = useState(0);
  const [revealedStep, setRevealedStep] = useState(-1);

  const { t } = useLanguage();

  const cases = t('usecases.cases').map((copy, index) => ({
    ...copy,
    images: caseImages[index],
  }));

  // Animazione di comparsa delle immagini a ogni cambio schermata
  useEffect(() => {
    setRevealedStep(-1);

    const compactInput = window.matchMedia(
      '(max-width: 720px), (pointer: coarse)'
    ).matches;

    const revealDelay = compactInput ? 650 : 1100;

    const timer = window.setTimeout(() => {
      setRevealedStep(step);
    }, revealDelay);

    return () => window.clearTimeout(timer);
  }, [step]);

  // Navigazione circolare
  const goToStep = (direction) => {
    setStep((current) => (
      (current + direction + cases.length) % cases.length
    ));
  };

  const item = cases[step];

  return (
    <section
      className="usecases wf"
      id="use-case"
      aria-labelledby="usecase-title"
      data-section="3"
      style={{
        '--slides': cases.length,
        '--active-step': step,
      }}
    >
      <div className="usecases-sticky">

        <header className="usecases-head" aria-live="polite">
          <h2 id="usecase-title">{item.title}</h2>
          <p>{item.description}</p>
        </header>

        <div className="usecases-scenes">
          {cases.map((caseItem, index) => (
            <div
              className={`usecases-scene ${index === step ? 'is-active' : ''}`}
              key={caseItem.title}
              aria-hidden={index !== step}
            >
              <div className="usecases-stage">

                <ActorPanel
                  src={caseItem.images[0]}
                  position="left"
                />

                <ActorPanel
                  src={caseItem.images[1]}
                  position="right"
                  visible={index === step && revealedStep === step}
                />

              </div>
            </div>
          ))}
        </div>

        {/* Frecce di navigazione */}
        <nav className="solution-controls" aria-label="Navigazione casi d'uso">

          <button
            type="button"
            className="solution-arrow solution-arrow-prev"
            onClick={() => goToStep(-1)}
            aria-label="Caso precedente"
          >
            <span aria-hidden="true">‹</span>
          </button>

          <button
            type="button"
            className="solution-arrow solution-arrow-next"
            onClick={() => goToStep(1)}
            aria-label="Caso successivo"
          >
            <span aria-hidden="true">›</span>
          </button>

        </nav>

        <div className="usecases-progress" aria-hidden="true">
          {cases.map((caseItem, index) => (
            <i
              key={caseItem.title}
              className={index === step ? 'on' : ''}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
