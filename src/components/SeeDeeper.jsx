import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../i18n.jsx';
import useSlideGestureSnap from '../lib/useSlideGestureSnap.js';

export default function SeeDeeper() {
  const ref = useRef(null);
  const [step, setStep] = useState(0);
  const { t } = useLanguage();
  const stages = t('ecosystem.stages').map((item, index) => ({ ...item, n: `0${index + 1}` }));
  const nodes = [
    { key: 'scale', label: stages[0].title, src: './images/ecosystem/scale.png' },
    { key: 'portal', label: stages[1].title, src: './images/ecosystem/portal.webp' },
    { key: 'app', label: stages[2].title, src: './images/ecosystem/app.webp?v=20261123' },
  ];

  useSlideGestureSnap(ref, stages.length, 0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.matchMedia('(max-width: 720px)').matches;

      if (isMobile) {
        // Su mobile lo sticky e' gia' visibile mentre entra nel viewport.
        // Mostrare subito l'orbit evita il passaggio vuoto prima del primo device.
        gsap.set('.solution-orbit', { opacity: 1, scale: 1 });
      } else {
        gsap.fromTo(
          '.solution-orbit',
          { opacity: 0, scale: .88 },
          {
            opacity: 1,
            scale: 1,
            duration: .8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 70%',
              end: 'top 15%',
              scrub: true,
            },
          },
        );
      }

      // MODALITA INFINITE SCROLL: lo stato segue il progresso della sezione.
      // Per ripristinare le frecce, rimuovere questo trigger e riattivare i
      // blocchi "NAVIGAZIONE CON FRECCE" commentati più sotto.
      let activeStep = -1;
      const syncStep = ({ progress }) => {
        const next = Math.min(stages.length - 1, Math.floor(progress * stages.length * .999));
        if (next === activeStep) return;
        activeStep = next;
        setStep(next);
      };
      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top top',
        end: 'bottom bottom',
        onRefresh: syncStep,
        onUpdate: syncStep,
      });
    }, ref);
    return () => ctx.revert();
  }, [stages.length]);

  /* NAVIGAZIONE CON FRECCE — conservata per un eventuale ripristino.
  const goToStep = (nextStep) => {
    setStep((nextStep + stages.length) % stages.length);
  };
  */

  return (
    <section className="solution-triangle-section" id="ecosistema" ref={ref} aria-labelledby="solution-title" data-section="2">
      <div className="solution-sticky">
        <div className="mesh mesh-soft" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="grain" aria-hidden="true" />
        <header className="solution-copy" aria-live="polite">
          <h2 id="solution-title">{stages[step].title}</h2>
          <p>
            {stages[step].textBefore}
            <strong>{stages[step].textEmphasis}</strong>
            {stages[step].textAfter}
          </p>
        </header>
        <div className="solution-stage">
          <div className="solution-orbit">
            <svg viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden="true"><ellipse cx="50" cy="30" rx="46" ry="24" /></svg>
            {nodes.map((node, index) => (
              <figure key={node.key} aria-label={node.label} className={`solution-node solution-node-${index} orbit-pos-${(index - step + nodes.length) % nodes.length} ${step === index ? 'active' : ''}`}>
                <div className="solution-node-inner">
                  <img className={`ecosystem-product ecosystem-${node.key}`} src={node.src} alt="" decoding="async" />
                </div>
              </figure>
            ))}
          </div>
        </div>
        {/* NAVIGAZIONE CON FRECCE — nascosta durante il test infinite scroll.
        <nav className="solution-controls" aria-label="Navigazione ecosistema">
  <button
    type="button"
    className="solution-arrow solution-arrow-prev"
    onClick={() => goToStep(step - 1)}
    aria-label="Precedente"
  >
    <span aria-hidden="true">‹</span>
  </button>

  <button
    type="button"
    className="solution-arrow solution-arrow-next"
    onClick={() => goToStep(step + 1)}
    aria-label="Successivo"
  >
    <span aria-hidden="true">›</span>
  </button>
</nav>
        */}
        <div className="solution-progress" aria-hidden="true">{stages.map((item, index) => <i key={item.n} className={index === step ? 'on' : ''} />)}</div>
      </div>
    </section>
  );
}
