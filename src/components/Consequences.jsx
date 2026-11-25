import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HumanCutout from './HumanCutout.jsx';
import { useLanguage } from '../i18n.jsx';
import useSlideGestureSnap from '../lib/useSlideGestureSnap.js';

gsap.registerPlugin(ScrollTrigger);

const mobileImpactSnapPoints = [0, .2, .5, .94];

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
  const { t, language } = useLanguage();

  // Ingresso, testo, professionista, paziente: un passaggio per ogni swipe.
  useSlideGestureSnap(sectionRef, mobileImpactSnapPoints.length, 54, {
    snapPoints: mobileImpactSnapPoints,
    mobileOnly: true,
  });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const ctx = gsap.context(() => {
      const head = section.querySelector('.consequences-head');
      const professional = section.querySelector('.consequence-professional');
      const patient = section.querySelector('.consequence-patient');
      const elements = [head, professional, patient];

      if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(elements, { autoAlpha: 1, y: 0 });
        return;
      }

      const compact = matchMedia('(max-width: 720px)').matches;
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
      className="consequences"
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
        <p className="consequences-summary">
          {t('impact.summaryBefore')}
          <strong>{t('impact.summaryEmphasis')}</strong>
        </p>
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
      </div>
    </section>
  );
}
