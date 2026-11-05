import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, ScreenTrend, Laptop } from './Phone.jsx';
import { useLanguage } from '../i18n.jsx';

function Scale() {
  return <div className="triangle-scale"><div><small>72.4</small><b>kg</b></div></div>;
}

export default function SeeDeeper() {
  const ref = useRef(null);
  const [step, setStep] = useState(0);
  const { t } = useLanguage();
  const stages = t('ecosystem.stages').map((item, index) => ({ ...item, n: `0${index + 1}` }));
  const nodes = [
    { key: 'scale', label: stages[0].title, content: <Scale /> },
    { key: 'portal', label: stages[1].title, content: <Laptop /> },
    { key: 'app', label: stages[2].title, content: <Phone><ScreenTrend /></Phone> },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.solution-orbit', { opacity: 0, scale: .88 }, { opacity: 1, scale: 1, duration: .8, ease: 'power2.out', scrollTrigger: { trigger: ref.current, start: 'top 70%', end: 'top 15%', scrub: true } });

      let activeStep = -1;
      ScrollTrigger.create({
        trigger: ref.current, start: 'top top', end: 'bottom bottom',
        onUpdate: (state) => {
          const next = Math.min(2, Math.floor(state.progress * 2.999));
          if (next !== activeStep) { activeStep = next; setStep(next); }
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="solution-triangle-section" id="monitoraggio" ref={ref} aria-labelledby="solution-title" data-section="2">
      <div className="solution-sticky">
        <div className="mesh mesh-soft" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="grain" aria-hidden="true" />
        <header className="solution-copy" aria-live="polite">
          <h2 id="solution-title">{stages[step].title}</h2>
          <p>{stages[step].text}</p>
        </header>
        <div className="solution-stage">
          <div className="solution-orbit">
            <svg viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden="true"><ellipse cx="50" cy="30" rx="46" ry="24" /></svg>
            {nodes.map((node, index) => (
              <figure key={node.key} aria-label={node.label} className={`solution-node solution-node-${index} orbit-pos-${(index - step + nodes.length) % nodes.length} ${step === index ? 'active' : ''}`}>
                <div className="solution-node-inner">{node.content}</div>
              </figure>
            ))}
          </div>
        </div>
        <div className="solution-progress" aria-hidden="true">{stages.map((item, index) => <i key={item.n} className={index === step ? 'on' : ''} />)}</div>
      </div>
    </section>
  );
}
