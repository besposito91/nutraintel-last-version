import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HumanCutout from './HumanCutout.jsx';
import { useLanguage } from '../i18n.jsx';

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
  const { t } = useLanguage();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const ctx = gsap.context(() => {
      const elements = [
        section.querySelector('.consequences-head'),
        ...section.querySelectorAll('.consequence-card'),
      ];

      if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(elements, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 64%',
          end: 'top 30%',
          scrub: .55,
          invalidateOnRefresh: true,
        },
      })
        .fromTo(
          elements[0],
          { autoAlpha: 0, y: 34 },
          { autoAlpha: 1, y: 0, duration: .54, ease: 'power2.out', immediateRender: true },
        )
        .fromTo(
          elements.slice(1),
          { autoAlpha: 0, y: 42 },
          { autoAlpha: 1, y: 0, duration: .46, stagger: .1, ease: 'power2.out', immediateRender: true },
          .2,
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
      <header className="consequences-head">
        <h2 id="consequences-title" className="t-display">
          {t('impact.titleBefore')}
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
    </section>
  );
}
