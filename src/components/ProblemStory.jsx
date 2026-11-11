import { useRef } from 'react';
import { useLanguage } from '../i18n.jsx';


const images = ['./images/cutouts/patient-case-1.webp', './images/cutouts/patient-case-2.webp', './images/cutouts/patient-case-4.webp'];


export default function ProblemStory() {
  const ref = useRef(null);
  const { t } = useLanguage();
  const problems = t('challenge.cards').map((item, index) => ({ ...item, image: images[index] }));




  return (
    <section className="problems split-problems" id="problema" ref={ref} aria-labelledby="problem-title" data-section="1">
      <div className="mesh mesh-soft" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="grain" aria-hidden="true" />
      <header className="problems-head">
        <h2 id="problem-title" data-blur className="t-display">
          {t('challenge.titleBefore')}
          <strong className="highlight">{t('challenge.titleHighlight')}</strong>
        </h2>
        <p data-fade>
          {t('challenge.introBefore')}
          <strong>{t('challenge.introEmphasis')}</strong>
          {t('challenge.introAfter')}
        </p>
      </header>
      <div className="problems-list">
        {problems.map((item) => (
          <article className="problem-card" key={item.title}>
            <div className="problem-card-image"><img src={item.image} alt={item.alt} loading="lazy" decoding="async" /></div>
            <div className="problem-card-body">
              <h3>{item.title}</h3>
              <p>
                {item.textBefore}
                <strong>{item.textEmphasis}</strong>
                {item.textAfter}
              </p>
            </div>
          </article>
        ))}
      </div>
      <div className="problems-answer" data-fade>
        <span>{t('challenge.answerKicker')}</span>
        <h3>{t('challenge.answerTitle')}</h3>
        <p>{t('challenge.answerText')}</p>
        <a href="#monitoraggio" className="arrow-link">{t('challenge.answerLink')} <span>↓</span></a>
      </div>
    </section>
  );
}
