import { useEffect, useRef, useState } from 'react';
import { NUTRAINTEL_CONFIG } from '../config.js';
import BlurText from './BlurText.jsx';
import { useLanguage } from '../i18n.jsx';

const UTM = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
const store = {
  get: (k) => { try { return sessionStorage.getItem(k); } catch { return null; } },
  set: (k, v) => { try { sessionStorage.setItem(k, v); } catch { /* bloccato */ } },
};

export default function Prelaunch() {
  const formRef = useRef(null);
  const [utm, setUtm] = useState({});
  const [status, setStatus] = useState({ key: '', tone: '' });
  const { t } = useLanguage();

  useEffect(() => {
    const params = new URLSearchParams(location.search); const next = {};
    UTM.forEach((k) => { const v = params.get(k); if (v) store.set('ni_' + k, v); next[k] = v || store.get('ni_' + k) || ''; });
    setUtm(next);
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form.reportValidity()) return;
    const endpoint = (NUTRAINTEL_CONFIG.formEndpoint || '').trim();
    if (!endpoint) { setStatus({ key: 'pre.ready', tone: 'warn' }); return; }
    setStatus({ key: 'pre.sending', tone: '' });
    try {
      const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(form).entries())) });
      if (!res.ok) throw new Error();
      setStatus({ key: 'pre.success', tone: 'ok' }); form.reset();
    } catch { setStatus({ key: 'pre.error', tone: 'err' }); }
  };

  return (
    <section className="pre" id="prelancio" aria-labelledby="pre-title" data-section="7">
      <div className="pre-head">
        <BlurText as="h2" id="pre-title" data-blur className="t-display" text={t('pre.title')} />
      </div>
      <div className="pre-grid">
        <div className="pcard pcard-info" data-fade>
          <small className="pre-card-kicker">{t('pre.kicker')}</small>
          <h3>{t('pre.cardTitle')}</h3>
          <p>{t('pre.cardText')}</p>
          <ul className="pre-hooks">
            {t('pre.hooks').map(([focus, rest]) => <li key={focus}><strong>{focus}</strong> {rest}</li>)}
          </ul>
          <div className="pcard-foot"><i /><span>{t('pre.interest')}</span></div>
        </div>
        <form className="pcard pform" noValidate ref={formRef} onSubmit={onSubmit} data-fade>
          <h3>{t('pre.formTitle')}</h3>
          <label><span>{t('pre.name')}</span><input type="text" name="name" autoComplete="name" required /></label>
          <label><span>{t('pre.email')}</span><input type="email" name="email" autoComplete="email" required /></label>
          <label><span>{t('pre.phone')}</span><input type="tel" name="phone" autoComplete="tel" required /></label>
          <label><span>{t('pre.profession')}</span><input type="text" name="profession" autoComplete="organization-title" /></label>
          {UTM.map((k) => <input key={k} type="hidden" name={k} value={utm[k] || ''} readOnly />)}
          <label className="chk"><input type="checkbox" name="privacy" required /><span>{t('pre.privacy')}</span></label>
          <label className="chk"><input type="checkbox" name="marketing" /><span>{t('pre.marketing')}</span></label>
          <button className="btn btn-dark wide" type="submit">{t('pre.submit')}</button>
          <p className={`pform-status ${status.tone}`} role="status" aria-live="polite">{status.key ? t(status.key) : ''}</p>
          <p className="pform-note">{t('pre.note')}</p>
        </form>
      </div>
    </section>
  );
}
