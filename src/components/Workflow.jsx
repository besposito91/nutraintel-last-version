
import { useLayoutEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
  const ref = useRef(null);
  const [step, setStep] = useState(0);
  const [revealedStep, setRevealedStep] = useState(-1);

  const { t } = useLanguage();

  const cases = t('usecases.cases').map((copy, index) => ({
    ...copy,
    images: caseImages[index],
  }));

  // MODALITA INFINITE SCROLL: slide e progress seguono la sezione sticky.
  useLayoutEffect(() => {
    let activeStep = -1;
    let scheduledStep = -1;
    let revealTimer;
    const compactInput = matchMedia('(max-width: 720px), (pointer: coarse)').matches;
    const revealDelay = compactInput ? 420 : 700;

    const queueReveal = (next) => {
      window.clearTimeout(revealTimer);
      scheduledStep = next;
      setRevealedStep(-1);
      revealTimer = window.setTimeout(() => setRevealedStep(next), revealDelay);
    };
    const syncStep = (state) => {
      const next = Math.min(cases.length - 1, Math.floor(state.progress * cases.length * .999));
      if (next !== activeStep) {
        activeStep = next;
        setStep(next);
      }
      if (state.isActive && next !== scheduledStep) queueReveal(next);
    };
    const resetReveal = () => {
      window.clearTimeout(revealTimer);
      scheduledStep = -1;
      setRevealedStep(-1);
    };
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 64px',
      end: 'bottom bottom',
      onToggle: (state) => {
        if (state.isActive) {
          syncStep(state);
          return;
        }

        // Uscendo verso il basso manteniamo visibile l'ultima slide fino a
        // quando la sezione ha lasciato davvero il viewport. Il reset serve
        // soltanto quando si torna prima dell'inizio del carosello.
        if (state.progress <= 0) resetReveal();
      },
      onRefresh: syncStep,
      onUpdate: syncStep,
    });

    return () => {
      window.clearTimeout(revealTimer);
      trigger.kill();
    };
  }, [cases.length]);

  /* NAVIGAZIONE CON FRECCE — conservata per un eventuale ripristino.
  const goToStep = (direction) => {
    setStep((current) => (
      (current + direction + cases.length) % cases.length
    ));
  };
  */

  const item = cases[step];

  return (
    <section
      className="usecases wf"
      id="use-case"
      ref={ref}
      aria-labelledby="usecase-title"
      data-section="3"
      style={{
        '--slides': cases.length,
        '--active-step': step,
      }}
    >
      <div className="usecases-sticky">

        <header key={step} className="usecases-head usecases-head-animated" aria-live="polite">
          <h2 id="usecase-title">
            {item.titleBefore}
            <strong>{item.titleEmphasis}</strong>
            {item.titleAfter}
          </h2>
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

        {/* NAVIGAZIONE CON FRECCE — nascosta durante il test infinite scroll.
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
        */}

        
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

