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
      <img className="usecase-composite" src={src} alt="" loading="lazy" decoding="async" />
    </article>
  );
}

export default function Workflow() {
  const ref = useRef(null);
  const [step, setStep] = useState(0);
  const [revealedStep, setRevealedStep] = useState(-1);
  const { t } = useLanguage();
  const cases = t('usecases.cases').map((copy, index) => ({ ...copy, images: caseImages[index] }));

  useLayoutEffect(() => {
    let activeStep = -1;
    let scheduledStep = -1;
    let revealTimer;
    const compactInput = matchMedia('(max-width: 720px), (pointer: coarse)').matches;
    const revealDelay = compactInput ? 650 : 1100;
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
      start: 'top 65px',
      end: 'bottom bottom',
      onToggle: (state) => state.isActive ? syncStep(state) : resetReveal(),
      onRefresh: syncStep,
      onUpdate: syncStep,
    });
    const entranceTrigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 20%',
      end: 'bottom top',
      onEnter: () => queueReveal(activeStep < 0 ? 0 : activeStep),
      onEnterBack: () => queueReveal(activeStep < 0 ? cases.length - 1 : activeStep),
      onLeaveBack: resetReveal,
    });
    return () => {
      window.clearTimeout(revealTimer);
      trigger.kill();
      entranceTrigger.kill();
    };
  }, [cases.length]);

  const item = cases[step];
  return (
    <section className="usecases wf" id="use-case" ref={ref} aria-labelledby="usecase-title" data-section="3" style={{ '--slides': cases.length, '--active-step': step }}>
      <div className="usecases-sticky">
        <header className="usecases-head" aria-live="polite">
          <h2 id="usecase-title">{item.title}</h2>
          <p>{item.description}</p>
        </header>
        <div className="usecases-scenes">
          {cases.map((caseItem, index) => (
            <div className={`usecases-scene ${index === step ? 'is-active' : ''}`} key={caseItem.title} aria-hidden={index !== step}>
              <div className="usecases-stage">
                <ActorPanel src={caseItem.images[0]} position="left" />
                <ActorPanel src={caseItem.images[1]} position="right" visible={index === step && revealedStep === step} />
              </div>
            </div>
          ))}
        </div>
        <div className="usecases-progress" aria-hidden="true">
          {cases.map((caseItem, index) => <i key={caseItem.title} className={index === step ? 'on' : ''} />)}
        </div>
      </div>
    </section>
  );
}
