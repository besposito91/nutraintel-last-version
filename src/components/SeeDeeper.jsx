import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../i18n.jsx';

export default function SeeDeeper() {
  const ref = useRef(null);
  const [step, setStep] = useState(0);
  const { t } = useLanguage();
  const stages = t('ecosystem.stages').map((item, index) => ({ ...item, n: `0${index + 1}` }));
  const nodes = [
    { key: 'scale', label: stages[0].title, src: './images/ecosystem/scale.png' },
    { key: 'portal', label: stages[1].title, src: './images/ecosystem/portal.png' },
    { key: 'app', label: stages[2].title, src: './images/ecosystem/app.png' },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.solution-orbit', { opacity: 0, scale: .88 }, { opacity: 1, scale: 1, duration: .8, ease: 'power2.out', scrollTrigger: { trigger: ref.current, start: 'top 70%', end: 'top 15%', scrub: true } });
    }, ref);
    return () => ctx.revert();
  }, []);

  const goToStep = (nextStep) => {
    setStep((nextStep + stages.length) % stages.length);
  };

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
        <div className="solution-progress" aria-hidden="true">{stages.map((item, index) => <i key={item.n} className={index === step ? 'on' : ''} />)}</div>
      </div>
    </section>
  );
}
