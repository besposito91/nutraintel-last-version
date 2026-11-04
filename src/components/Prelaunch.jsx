import { useEffect, useRef, useState } from 'react';
import { NUTRAINTEL_CONFIG } from '../config.js';
import BlurText from './BlurText.jsx';

const UTM = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
const store = {
  get: (k) => { try { return sessionStorage.getItem(k); } catch { return null; } },
  set: (k, v) => { try { sessionStorage.setItem(k, v); } catch { /* bloccato */ } },
};

export default function Prelaunch() {
  const formRef = useRef(null);
  const [utm, setUtm] = useState({});
  const [status, setStatus] = useState({ text: '', tone: '' });

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
    if (!endpoint) { setStatus({ text: 'Modulo pronto: collega prima un endpoint CRM/form reale per attivare l’invio.', tone: 'warn' }); return; }
    setStatus({ text: 'Invio in corso…', tone: '' });
    try {
      const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(form).entries())) });
      if (!res.ok) throw new Error();
      setStatus({ text: 'Grazie. La tua richiesta è stata registrata.', tone: 'ok' }); form.reset();
    } catch { setStatus({ text: 'Invio non riuscito. Riprova o contattaci direttamente.', tone: 'err' }); }
  };

  return (
    <section className="pre" id="prelancio" aria-labelledby="pre-title" data-section="7">
      <div className="pre-head">
        <BlurText as="h2" id="pre-title" data-blur className="t-display" text="Porta il follow-up oltre la visita, prima degli altri." />
      </div>
      <div className="pre-grid">
        <div className="pcard pcard-info" data-fade>
          <small className="pre-card-kicker">Accesso in anteprima</small>
          <h3>Non aspettare che il futuro della nutrizione diventi lo standard.</h3>
          <p>Entra nella community dei professionisti interessati a un percorso più continuo, partecipato e connesso.</p>
          <ul className="pre-hooks">
            <li><strong>Sii tra i primi</strong> a scoprire NutraIntel.</li>
            <li><strong>Accedi alle novità</strong> e alle opportunità del lancio.</li>
            <li><strong>Resta aggiornato</strong>, senza alcun impegno.</li>
          </ul>
          <div className="pcard-foot"><i /><span>Manifestazione di interesse</span></div>
        </div>
        <form className="pcard pform" noValidate ref={formRef} onSubmit={onSubmit} data-fade>
          <h3>Voglio essere tra i primi</h3>
          <label><span>Nome e cognome *</span><input type="text" name="name" autoComplete="name" required /></label>
          <label><span>Email *</span><input type="email" name="email" autoComplete="email" required /></label>
          <label><span>Telefono *</span><input type="tel" name="phone" autoComplete="tel" required /></label>
          <label><span>Professione / struttura</span><input type="text" name="profession" autoComplete="organization-title" /></label>
          {UTM.map((k) => <input key={k} type="hidden" name={k} value={utm[k] || ''} readOnly />)}
          <label className="chk"><input type="checkbox" name="privacy" required /><span>Ho letto l'informativa privacy e acconsento al trattamento dei dati per la gestione della mia richiesta. *</span></label>
          <label className="chk"><input type="checkbox" name="marketing" /><span>Acconsento a ricevere comunicazioni di aggiornamento e marketing relative a NutraIntel.</span></label>
          <button className="btn btn-dark wide" type="submit">Richiedi l’accesso in anteprima</button>
          <p className={`pform-status ${status.tone}`} role="status" aria-live="polite">{status.text}</p>
          <p className="pform-note">Inserire qui il link all'informativa privacy definitiva prima della pubblicazione.</p>
        </form>
      </div>
    </section>
  );
}
