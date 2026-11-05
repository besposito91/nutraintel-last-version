import { useLayoutEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Laptop } from './Phone.jsx';
import HumanCutout from './HumanCutout.jsx';
import { useLanguage } from '../i18n.jsx';

const caseLayout = [
  { left: { actor: 'patient', ui: 'weightApp' }, right: { actor: 'professional', ui: 'weightReceived' } },
  { left: { actor: 'professional', ui: 'missingAlert' }, right: { actor: 'patient', ui: 'professionalMessage' } },
  { left: { actor: 'professional', ui: 'setAppointment' }, right: { actor: 'patient', ui: 'newAppointment' } },
  { left: { actor: 'patient', ui: 'uploadDocument' }, right: { actor: 'professional', ui: 'documentReceived' } },
  { left: { actor: 'professional', ui: 'trendPortal' }, right: { actor: 'patient', ui: 'keepGoing' } },
  { left: { actor: 'patient', ui: 'foodPhoto' }, right: { actor: 'professional', ui: 'foodTable' } },
];

function DataPanel({ type }) {
  const { t } = useLanguage();
  const p = t(`usecases.panels.${type}`);
  if (type === 'weightApp') return <div className="uc-ui app"><b>{p[0]}</b><strong>72,4 <em>kg</em></strong><span>{p[1]}</span></div>;
  if (type === 'weightReceived') return <div className="uc-ui bubble"><b>{p[0]}</b><strong>72,4 <em>kg</em></strong><span>{p[1]}</span></div>;
  if (type === 'missingAlert') return <div className="uc-ui portal warning"><b>{p[0]}</b><strong>14 <em>{p[1]}</em></strong><span>{p[2]}</span></div>;
  if (type === 'professionalMessage') return <div className="uc-ui bubble"><b>{p[0]}</b><span>{p[1]}</span></div>;
  if (type === 'setAppointment') return <div className="uc-ui portal"><b>{p[0]}</b><strong>14 <em>{p[1]}</em></strong><span>{p[2]}</span></div>;
  if (type === 'newAppointment') return <div className="uc-ui bubble"><b>{p[0]}</b><strong>16:30</strong><span>{p[1]}</span></div>;
  if (type === 'uploadDocument') return <div className="uc-ui app"><b>{p[0]}</b><strong className="uc-file-name">Analisi.pdf</strong><span>{p[1]}</span></div>;
  if (type === 'documentReceived') return <div className="uc-ui bubble"><b>{p[0]}</b><strong className="uc-file-name">Analisi.pdf</strong><span>{p[1]}</span></div>;
  if (type === 'trendPortal') return <div className="uc-ui portal trend"><b>{p[0]}</b><svg viewBox="0 0 180 54" aria-hidden="true"><path d="M2 47 C28 42 35 45 54 32 S87 37 103 24 S133 21 178 5" /></svg><span>{p[1]}</span></div>;
  if (type === 'keepGoing') return <div className="uc-ui bubble success"><b>{p[0]}</b><span>{p[1]}</span></div>;
  if (type === 'foodPhoto') return <div className="uc-ui app camera"><b>{p[0]}</b><div className="uc-camera-frame"><i /></div><span>{p[1]}</span></div>;
  return <div className="uc-ui portal food-table"><b>{p[0]}</b><div><span>{p[1]}</span><span>{p[2]}</span></div><div><span>{p[3]}</span><span>{p[4]}</span></div><div><span>{p[5]}</span><span>{p[6]}</span></div></div>;
}

const portalTypes = new Set(['missingAlert', 'setAppointment', 'trendPortal', 'foodTable']);
const appTypes = new Set(['weightApp', 'uploadDocument', 'foodPhoto']);

function ProductDevice({ type, actor }) {
  if (actor === 'professional') {
    return <div className="uc-product-device professional-device"><DataPanel type={type} /></div>;
  }
  if (portalTypes.has(type)) {
    return <div className="uc-product-device portal-device"><Laptop /><DataPanel type={type} /></div>;
  }
  if (appTypes.has(type)) {
    return <div className="uc-product-device app-device"><Phone><div className="uc-phone-product"><DataPanel type={type} /></div></Phone></div>;
  }
  return <div className="uc-product-device app-device message-device"><Phone><div className="uc-phone-product"><DataPanel type={type} /></div></Phone></div>;
}

function ActorPanel({ side, index, position, visible = true }) {
  const { t } = useLanguage();
  const professional = side.actor === 'professional';
  const src = professional ? './images/cutouts/nutritionist-computer.webp' : `./images/cutouts/patient-case-${index + 1}.webp`;
  return (
    <article className={`uc-actor-panel side-${position} ${professional ? 'professional' : 'patient'} ${visible ? 'is-visible' : 'is-waiting'}`}>
      <HumanCutout src={src} alt={professional ? t('usecases.professionalAlt') : t('usecases.patientAlt')} />
      <ProductDevice type={side.ui} actor={side.actor} />
    </article>
  );
}

export default function Workflow() {
  const ref = useRef(null);
  const [step, setStep] = useState(0);
  const [revealedStep, setRevealedStep] = useState(-1);
  const { t } = useLanguage();
  const cases = t('usecases.cases').map((copy, index) => ({ ...caseLayout[index], ...copy }));

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
      trigger: ref.current, start: 'top 65px', end: 'bottom bottom',
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
  }, []);

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
                <ActorPanel side={caseItem.left} index={index} position="left" />
                <ActorPanel side={caseItem.right} index={index} position="right" visible={index === step && revealedStep === step} />
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
