import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HumanCutout from './HumanCutout.jsx';
import { useLanguage } from '../i18n.jsx';
import useHorizontalSwipe from '../lib/useHorizontalSwipe.js';
import MobileSwipeHint from './MobileSwipeHint.jsx';

gsap.registerPlugin(ScrollTrigger);

function ImpactLines({ strong, rest }) {
  const lines = `${strong} ${rest}`
    .split('.')
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <h3>
      {lines.map((line, index) => (
        <span className={index === 0 ? 'is-strong' : ''} key={line}>
          {line}{index === lines.length - 1 ? '.' : ''}
        </span>
      ))}
    </h3>
  );
}

export default function Consequences() {
  const sectionRef = useRef(null);
  const [mobileStep, setMobileStep] = useState(0);
  const { t, language } = useLanguage();

  // Il titolo resta visibile: professionista e paziente sono i due passaggi.
  const mobileLocked = useHorizontalSwipe(
    sectionRef,
    mobileStep,
    setMobileStep,
    2,
    { lockUntilComplete: true },
  );

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const ctx = gsap.context(() => {
      const head = section.querySelector('.consequences-head');
      const professional = section.querySelector('.consequence-professional');
      const patient = section.querySelector('.consequence-patient');
      const elements = [head, professional, patient];
      const compact = matchMedia('(max-width: 720px)').matches;

      // Su mobile lo stato e' controllato dallo swipe orizzontale, non dalla
      // posizione verticale della pagina.
      if (compact) {
        gsap.set(elements, { clearProps: 'all' });
        return;
      }

      if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(elements, { autoAlpha: 1, y: 0 });
        return;
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: compact ? 'top 54px' : 'top 64px',
          end: 'bottom bottom',
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .fromTo(
          head,
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: .18, ease: 'none', immediateRender: true },
        )
        .fromTo(
          professional,
          { autoAlpha: 0, x: compact ? 0 : -36, y: compact ? 34 : 0 },
          { autoAlpha: 1, x: 0, y: 0, duration: compact ? .24 : .30, ease: 'none', immediateRender: true },
          compact ? .25 : .12,
        );

      if (compact) {
        timeline.to(
          professional,
          { autoAlpha: 0, y: -28, duration: .12, ease: 'none' },
          .54,
        );
      }

      timeline.fromTo(
          patient,
          { autoAlpha: 0, x: compact ? 0 : 36, y: compact ? 34 : 0 },
          { autoAlpha: 1, x: 0, y: 0, duration: compact ? .24 : .30, ease: 'none', immediateRender: true },
          compact ? .68 : .58,
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className={`consequences mobile-impact-step-${mobileStep}`}
      id="impatto"
      ref={sectionRef}
      aria-labelledby="consequences-title"
      data-section="4"
    >
      <div className="consequences-sticky">
      <header className="consequences-head">
        <h2 id="consequences-title" className="t-display">
          {t('impact.titleBefore')}
          {language === 'it' && <br />}
          <span className="highlight">{t('impact.titleHighlight')}</span>
          {t('impact.titleAfter')}
        </h2>
      </header>

      <div className="consequence-columns">
        <article className="consequence-card consequence-professional">
          <div className="consequence-image">
            <HumanCutout
              src="./images/cutouts/nutritionist-computer.webp"
              alt={t('impact.professionalAlt')}
            />
          </div>

          <div className="consequence-copy">
            <span className="consequence-eyebrow">
              {t('impact.professionalEyebrow')}
            </span>
            <ImpactLines
              strong={t('impact.professionalStrong')}
              rest={t('impact.professionalRest')}
            />
          </div>
        </article>

        <article className="consequence-card consequence-patient">
          <div className="consequence-image">
            <HumanCutout
              src="./images/cutouts/patient.webp"
              alt={t('impact.patientAlt')}
            />
          </div>

          <div className="consequence-copy">
            <span className="consequence-eyebrow">
              {t('impact.patientEyebrow')}
            </span>
            <ImpactLines
              strong={t('impact.patientStrong')}
              rest={t('impact.patientRest')}
            />
          </div>
        </article>
      </div>
      <MobileSwipeHint
        visible={mobileLocked || mobileStep === 1}
        label={mobileStep === 1 ? t('carousel.back') : t('carousel.swipe')}
        current={mobileStep + 1}
        total={2}
      />
      </div>
    </section>
  );
}
