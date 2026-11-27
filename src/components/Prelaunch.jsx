import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../i18n.jsx';

export default function Prelaunch() {
  const sectionRef = useRef(null);
  const [formReady, setFormReady] = useState(false);
  const { t, language } = useLanguage();
  const titleParts = t('pre.title').match(/^(.*?)(,\s|\s–\s)([^,–]+)$/);
  const titleBefore = titleParts ? `${titleParts[1]}${titleParts[2].trim()}` : t('pre.title');
  const titleHighlight = titleParts?.[3] || '';
  const cardFocus = {
    it: 'Il tuo prossimo vantaggio competitivo inizia qui.',
    en: 'Do not wait',
    de: 'Warten Sie nicht',
  }[language] || '';
  const cardTitle = t('pre.cardTitle');
  const cardTitleRest = cardFocus && cardTitle.startsWith(cardFocus)
    ? cardTitle.slice(cardFocus.length)
    : cardTitle;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const revealForm = () => setFormReady(true);
    const checkProximity = () => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight + 900 && rect.bottom >= -900) revealForm();
    };
    const onFormCta = (event) => {
      if (event.target.closest?.('a[href="#prelancio"]')) revealForm();
    };

    const observer = 'IntersectionObserver' in window
      ? new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          revealForm();
          observer.disconnect();
        },
        { rootMargin: '900px 0px' },
      )
      : null;

    observer?.observe(section);
    document.addEventListener('click', onFormCta, true);
    window.addEventListener('scroll', checkProximity, { passive: true });
    window.addEventListener('resize', checkProximity, { passive: true });
    window.addEventListener('hashchange', checkProximity);
    const initialCheck = window.requestAnimationFrame(checkProximity);

    return () => {
      window.cancelAnimationFrame(initialCheck);
      observer?.disconnect();
      document.removeEventListener('click', onFormCta, true);
      window.removeEventListener('scroll', checkProximity);
      window.removeEventListener('resize', checkProximity);
      window.removeEventListener('hashchange', checkProximity);
    };
  }, []);

  useEffect(() => {
    if (!formReady) return undefined;

    const src = 'https://api.digitisuite.io/js/form_embed.js';
    if (document.querySelector(`script[src="${src}"]`)) return;

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
    return undefined;
  }, [formReady]);

  return (
    <section ref={sectionRef} className="pre" id="prelancio" aria-labelledby="pre-title" data-section="7">
      <div className="pre-head">
        <h2 id="pre-title" data-blur className="t-display">
          {titleBefore}
          {titleHighlight && <><br /><span className="highlight">{titleHighlight}</span></>}
        </h2>
      </div>
      <div className="pre-grid">
        <div className="pcard pcard-info" data-fade>
          
          <h3>{cardFocus && cardTitle.startsWith(cardFocus) && <strong>{cardFocus}</strong>}{cardTitleRest}</h3>
          <p>{t('pre.cardText')}</p>
          <ul className="pre-hooks">
            {t('pre.hooks').map(([focus, rest]) => <li key={focus}><strong>{focus}</strong> {rest}</li>)}
          </ul>
          
        </div>
        <div className="pcard pform pform-embed" data-fade>
          {formReady ? (
            <iframe
              className="digitisuite-form-embed"
              src="https://api.digitisuite.io/widget/form/feIEsg9uiZD6VjWi0cv4"
              loading="lazy"
              style={{ width: '100%', height: '708px', border: 'none', borderRadius: '8px' }}
              id="inline-form-feIEsg9uiZD6VjWi0cv4"
              data-layout="{'id':'INLINE'}"
              data-form-name="Optin Landing NutraIntel"
              data-height="708"
              data-layout-iframe-id="inline-form-feIEsg9uiZD6VjWi0cv4"
              data-form-id="feIEsg9uiZD6VjWi0cv4"
              data-cookie-consent="true"
              data-cookie-consent-provider="auto"
              title="Optin Landing NutraIntel"
            />
          ) : (
            <div className="digitisuite-form-placeholder" style={{ minHeight: '708px' }} aria-hidden="true" />
          )}
        </div>
      </div>
    </section>
  );
}
