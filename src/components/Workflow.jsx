import { useLayoutEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Laptop } from './Phone.jsx';
import HumanCutout from './HumanCutout.jsx';

const cases = [
  { title: 'Ogni misurazione racconta un progresso.', description: 'Il dato registrato dal paziente diventa subito parte del percorso seguito dal professionista.', left: { actor: 'patient', ui: 'weightApp' }, right: { actor: 'professional', ui: 'weightReceived' } },
  { title: 'Anche un’assenza può diventare un segnale.', description: 'Il professionista individua l’interruzione e riapre il contatto con il paziente.', left: { actor: 'professional', ui: 'missingAlert' }, right: { actor: 'patient', ui: 'professionalMessage' } },
  { title: 'Il prossimo incontro è già parte del percorso.', description: 'L’appuntamento fissato dal portale arriva al paziente con le stesse informazioni.', left: { actor: 'professional', ui: 'setAppointment' }, right: { actor: 'patient', ui: 'newAppointment' } },
  { title: 'Le informazioni importanti non vanno perse.', description: 'Il documento caricato dal paziente è disponibile al professionista nel suo spazio di lavoro.', left: { actor: 'patient', ui: 'uploadDocument' }, right: { actor: 'professional', ui: 'documentReceived' } },
  { title: 'Il progresso diventa incoraggiamento.', description: 'Il professionista legge l’andamento e restituisce al paziente una presenza concreta.', left: { actor: 'professional', ui: 'trendPortal' }, right: { actor: 'patient', ui: 'keepGoing' } },
  { title: 'Anche la quotidianità entra nel percorso.', description: 'Una foto del diario alimentare diventa un’informazione organizzata e consultabile.', left: { actor: 'patient', ui: 'foodPhoto' }, right: { actor: 'professional', ui: 'foodTable' } },
];

function DataPanel({ type }) {
  if (type === 'weightApp') return <div className="uc-ui app"><b>Dato del peso</b><strong>72,4 <em>kg</em></strong><span>Misurazione sincronizzata</span></div>;
  if (type === 'weightReceived') return <div className="uc-ui bubble"><b>Peso ricevuto</b><strong>72,4 <em>kg</em></strong><span>Adesso</span></div>;
  if (type === 'missingAlert') return <div className="uc-ui portal warning"><b>Alert mancata pesata</b><strong>14 <em>giorni</em></strong><span>Nessuna nuova misurazione</span></div>;
  if (type === 'professionalMessage') return <div className="uc-ui bubble"><b>Come sta andando?</b><span>È da qualche giorno che non ricevo nuove misurazioni.</span></div>;
  if (type === 'setAppointment') return <div className="uc-ui portal"><b>Fissa appuntamento</b><strong>14 <em>NOV</em></strong><span>Ore 16:30 · Conferma</span></div>;
  if (type === 'newAppointment') return <div className="uc-ui bubble"><b>14 novembre</b><strong>16:30</strong><span>Visita nutrizionale</span></div>;
  if (type === 'uploadDocument') return <div className="uc-ui app"><b>Carica documento</b><strong className="uc-file-name">Analisi.pdf</strong><span>Caricamento completato ✓</span></div>;
  if (type === 'documentReceived') return <div className="uc-ui bubble"><b>Documento ricevuto</b><strong className="uc-file-name">Analisi.pdf</strong><span>Associato al paziente</span></div>;
  if (type === 'trendPortal') return <div className="uc-ui portal trend"><b>Grafico andamento</b><svg viewBox="0 0 180 54" aria-hidden="true"><path d="M2 47 C28 42 35 45 54 32 S87 37 103 24 S133 21 178 5" /></svg><span>−1,8 kg dall’inizio</span></div>;
  if (type === 'keepGoing') return <div className="uc-ui bubble success"><b>Continua così!</b><span>I dati mostrano che stai andando nella direzione giusta.</span></div>;
  if (type === 'foodPhoto') return <div className="uc-ui app camera"><b>Diario alimentare</b><div className="uc-camera-frame"><i /></div><span>Foto del pranzo · oggi</span></div>;
  return <div className="uc-ui portal food-table"><b>Diario alimentare</b><div><span>Pranzo</span><span>Oggi · 13:05</span></div><div><span>Verdure e cereali</span><span>Foto ricevuta</span></div><div><span>Nota</span><span>Porzione completa</span></div></div>;
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
  const professional = side.actor === 'professional';
  const src = professional ? './images/cutouts/nutritionist-computer.webp' : `./images/cutouts/patient-case-${index + 1}.webp`;
  return (
    <article className={`uc-actor-panel side-${position} ${professional ? 'professional' : 'patient'} ${visible ? 'is-visible' : 'is-waiting'}`}>
      <HumanCutout src={src} alt={professional ? 'Il professionista consulta il percorso del paziente.' : 'Il paziente partecipa al proprio percorso nutrizionale.'} />
      <ProductDevice type={side.ui} actor={side.actor} />
    </article>
  );
}

export default function Workflow() {
  const ref = useRef(null);
  const [step, setStep] = useState(0);
  const [revealedStep, setRevealedStep] = useState(-1);

  useLayoutEffect(() => {
    let activeStep = -1;
    let scheduledStep = -1;
    let revealTimer;
    const queueReveal = (next) => {
      window.clearTimeout(revealTimer);
      scheduledStep = next;
      setRevealedStep(-1);
      revealTimer = window.setTimeout(() => setRevealedStep(next), 1100);
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
        <div className="usecases-scene" key={step}>
          <div className="usecases-stage">
            <ActorPanel side={item.left} index={step} position="left" />
            <ActorPanel side={item.right} index={step} position="right" visible={revealedStep === step} />
          </div>
        </div>
        <div className="usecases-progress" aria-hidden="true">
          {cases.map((caseItem, index) => <i key={caseItem.title} className={index === step ? 'on' : ''} />)}
        </div>
      </div>
    </section>
  );
}
