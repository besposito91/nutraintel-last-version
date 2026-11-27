
import { useLayoutEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../i18n.jsx';
import useSlideGestureSnap from '../lib/useSlideGestureSnap.js';
import useHorizontalSwipe from '../lib/useHorizontalSwipe.js';

const caseImages = [
  ['./images/usecases/slide-1-left.webp', './images/usecases/slide-1-right.webp'],
  ['./images/usecases/slide-2-left.webp', './images/usecases/slide-2-right.webp'],
  ['./images/usecases/slide-3-left.webp', './images/usecases/slide-3-right.webp'],
  ['./images/usecases/slide-4-left.webp', './images/usecases/slide-4-right.webp'],
  ['./images/usecases/slide-5-left.webp', './images/usecases/slide-5-right.webp'],
  ['./images/usecases/slide-6-left.webp', './images/usecases/slide-6-right.webp'],
];

function ActorPanel({ src, position, shouldLoad, onReady }) {
  const handleLoad = (event) => {
    const image = event.currentTarget;
    if (typeof image.decode !== 'function') {
      onReady();
      return;
    }

    image.decode().catch(() => undefined).finally(onReady);
  };

  return (
    <article className={`uc-actor-panel side-${position} usecase-composite-panel is-visible`}>
      {shouldLoad && (
        <img
          className="usecase-composite"
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          style={{ objectFit: 'cover', overflow: 'visible' }}
          onLoad={handleLoad}
          onError={onReady}
          width="1600"
          height="1600"
        />
      )}
    </article>
  );
}

function UsecaseScene({ caseItem, index, step }) {
  const [loaded, setLoaded] = useState([false, false]);
  const active = index === step;
  const ready = loaded[0] && loaded[1];
  const positionClass = active ? 'is-active' : index < step ? 'is-before' : 'is-after';
  const distance = Math.abs(index - step);
  const shouldLoad = distance <= 1;
  const proximityClass = distance === 1 ? 'is-neighbor' : distance > 1 ? 'is-distant' : '';

  const markReady = (imageIndex) => {
    setLoaded((current) => {
      if (current[imageIndex]) return current;
      const next = [...current];
      next[imageIndex] = true;
      return next;
    });
  };

  return (
    <div
      className={`usecases-scene ${positionClass} ${proximityClass} ${ready ? 'is-ready' : 'is-loading'}`}
      aria-hidden={!active}
    >
      <header className="usecases-card-head" aria-hidden="true">
        <h3>
          {caseItem.titleBefore}
          <strong>{caseItem.titleEmphasis}</strong>
          {caseItem.titleAfter}
        </h3>
        <p className="usecase-slide-description">{caseItem.description}</p>
      </header>
      <div className="usecases-stage">
        <ActorPanel
          src={caseItem.images[0]}
          position="left"
          shouldLoad={shouldLoad}
          onReady={() => markReady(0)}
        />
        <ActorPanel
          src={caseItem.images[1]}
          position="right"
          shouldLoad={shouldLoad}
          onReady={() => markReady(1)}
        />
      </div>
    </div>
  );
}

export default function Workflow() {
  const ref = useRef(null);
  const [step, setStep] = useState(0);

  const { t } = useLanguage();

  const cases = t('usecases.cases').map((copy, index) => ({
    ...copy,
    images: caseImages[index],
  }));

  useSlideGestureSnap(ref, cases.length, 64, { desktopOnly: true });
  useHorizontalSwipe(ref, step, setStep, cases.length, {
    lockUntilComplete: false,
  });

  // MODALITA INFINITE SCROLL: slide e progress seguono la sezione sticky.
  useLayoutEffect(() => {
    if (window.matchMedia('(max-width: 720px)').matches) return undefined;

    let activeStep = -1;
    const syncStep = (state) => {
      const scaledProgress = Math.min(
        cases.length - Number.EPSILON,
        state.progress * cases.length,
      );
      const next = Math.min(cases.length - 1, Math.floor(scaledProgress));
      if (next !== activeStep) {
        activeStep = next;
        setStep(next);
      }
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

        // Le due immagini fanno ora parte dello stesso ingresso di slide.
      },
      onRefresh: syncStep,
      onUpdate: syncStep,
    });

    return () => {
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
            <UsecaseScene
              key={caseItem.title}
              caseItem={caseItem}
              index={index}
              step={step}
            />
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

