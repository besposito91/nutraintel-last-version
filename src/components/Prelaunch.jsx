import { useEffect } from 'react';
import { useLanguage } from '../i18n.jsx';

export default function Prelaunch() {
  const { t, language } = useLanguage();
  const titleParts = t('pre.title').match(/^(.*?)(,\s|\s–\s)([^,–]+)$/);
  const titleBefore = titleParts ? `${titleParts[1]}${titleParts[2].trim()}` : t('pre.title');
  const titleHighlight = titleParts?.[3] || '';
  const cardFocus = {
    it: 'Non aspettare',
    en: 'Do not wait',
    de: 'Warten Sie nicht',
  }[language] || '';
  const cardTitle = t('pre.cardTitle');
  const cardTitleRest = cardFocus && cardTitle.startsWith(cardFocus)
    ? cardTitle.slice(cardFocus.length)
    : cardTitle;

  useEffect(() => {
    const src = 'https://api.digitisuite.io/js/form_embed.js';
    if (document.querySelector(`script[src="${src}"]`)) return;

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <section className="pre" id="prelancio" aria-labelledby="pre-title" data-section="7">
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
          <iframe
            className="digitisuite-form-embed"
            src="https://api.digitisuite.io/widget/form/feIEsg9uiZD6VjWi0cv4"
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
        </div>
      </div>
    </section>
  );
}
