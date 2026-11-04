// Mockup telefono in CSS + schermate NutraIntel (dati illustrativi dai mockup originali)
export function Phone({ children, className = '' }) {
  return (
    <div className={`ph ${className}`}>
      <div className="ph-screen">
        <div className="ph-island" />
        <div className="ph-status"><span>9:41</span><span className="ph-status-r"><i /><i /><i /></span></div>
        {children}
      </div>
    </div>
  );
}

const Spark = ({ pts = [62, 58, 60, 54, 55, 49, 47, 44, 45, 40], h = 90 }) => {
  const max = Math.max(...pts), min = Math.min(...pts);
  const d = pts.map((p, i) => `${(i / (pts.length - 1)) * 100},${((p - min) / (max - min || 1)) * (h - 16) + 8}`).join(' ');
  return (
    <svg className="spark" viewBox={`0 0 100 ${h}`} preserveAspectRatio="none" aria-hidden="true">
      <defs><linearGradient id="sg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#1BC8A1" stopOpacity=".35" /><stop offset="1" stopColor="#1BC8A1" stopOpacity="0" /></linearGradient></defs>
      <polygon points={`0,${h} ${d} 100,${h}`} fill="url(#sg)" />
      <polyline points={d} fill="none" stroke="#1BC8A1" strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
  );
};

export const ScreenWeight = () => (
  <div className="scr scr-dark">
    <div className="scr-top"><small>NUTRAINTEL</small><b className="pill-live">AGGIORNATO ORA</b></div>
    <small className="scr-label">PESO</small>
    <div className="scr-big">72,4<em>kg</em></div>
    <div className="scr-delta">−1,8 kg dall'inizio del percorso</div>
    <Spark />
    <div className="scr-grid">
      <span><small>IDRATAZIONE</small><b>52%</b></span>
      <span><small>PASSI</small><b>6.842</b></span>
    </div>
  </div>
);

export const ScreenScale = () => (
  <div className="scr scr-dark">
    <div className="scr-top"><small>BILANCIA SMART</small><b className="pill-live">CONNESSA</b></div>
    <div className="scale-ring"><div><small>72.4</small><b>kg</b></div></div>
    <div className="scr-row"><span className="dot ok" /><div><b>Misurazione ricevuta</b><small>Sincronizzata con NutraIntel</small></div></div>
    <div className="scr-row"><span className="dot" /><div><b>Composizione corporea</b><small>Disponibile nel portale</small></div></div>
  </div>
);

export const ScreenHydration = () => (
  <div className="scr scr-dark">
    <div className="scr-top"><small>IDRATAZIONE</small><b className="pill-live">OGGI</b></div>
    <div className="ring" style={{ '--p': 52 }}><div><strong>52%</strong><small>acqua corporea</small></div></div>
    <div className="scr-bars">{[40, 55, 48, 62, 52, 58, 52].map((v, i) => <i key={i} style={{ height: v + '%' }} />)}</div>
    <div className="scr-days"><span>L</span><span>M</span><span>M</span><span>G</span><span>V</span><span>S</span><span>D</span></div>
  </div>
);

export const ScreenSteps = () => (
  <div className="scr scr-dark">
    <div className="scr-top"><small>PASSI</small><b className="pill-live">OGGI</b></div>
    <small className="scr-label">PASSI GIORNALIERI</small>
    <div className="scr-big">6.842</div>
    <div className="scr-bars tall">{[52, 70, 44, 86, 64, 92, 68].map((v, i) => <i key={i} style={{ height: v + '%' }} />)}</div>
    <div className="scr-days"><span>L</span><span>M</span><span>M</span><span>G</span><span>V</span><span>S</span><span>D</span></div>
  </div>
);

export const ScreenTrend = () => (
  <div className="scr scr-dark">
    <div className="scr-top"><small>ANDAMENTO</small><b className="pill-live">30 GIORNI</b></div>
    <div className="scr-big">72,4<em>kg</em></div>
    <Spark pts={[66, 64, 65, 61, 60, 58, 59, 55, 53, 50, 49]} h={120} />
    <div className="scr-row"><span className="dot ok" /><div><b>Obiettivo del percorso</b><small>In linea con il piano</small></div></div>
  </div>
);

export const ScreenRecord = () => (
  <div className="scr scr-light">
    <div className="rec-head"><span className="avatar">MB</span><div><b>Maria B.</b><small>Scheda paziente</small></div><em>ATTIVO</em></div>
    <div className="rec-stats">
      <span><small>ULTIMA MISURAZIONE</small><b>72,4 kg</b></span>
      <span><small>VARIAZIONE</small><b>−1,8 kg</b></span>
      <span><small>FOLLOW-UP</small><b>12 giorni</b></span>
    </div>
    <small className="scr-label dark">STORICO MISURAZIONI</small>
    <div className="rec-hist">{[74.2, 73.8, 73.5, 73.1, 72.9, 72.4].map((v, i) => <span key={i}><i style={{ height: (v - 71) * 26 + '%' }} /><small>{v.toFixed(1).replace('.', ',')}</small></span>)}</div>
  </div>
);

export const ScreenAlerts = () => (
  <div className="scr scr-light">
    <small className="scr-label dark">AVVISI</small>
    <div className="alert"><span className="dot warn" /><div><small>MISURAZIONI</small><b>Nessuna nuova misurazione</b><p>Ultimo aggiornamento 14 giorni fa</p></div><em>!</em></div>
    <div className="alert"><span className="dot" /><div><small>ANALISI CLINICHE</small><b>Documentazione da aggiornare</b><p>Verifica gli elementi richiesti</p></div><em>↗</em></div>
    <div className="alert soft"><span className="dot ok" /><div><small>FOLLOW-UP</small><b>Percorso sotto controllo</b><p>Continuità monitorata</p></div><em>✓</em></div>
  </div>
);

export const ScreenPatients = () => (
  <div className="scr scr-light">
    <small className="scr-label dark">I TUOI PAZIENTI</small>
    {[['MB', 'Maria B.', '72,4 kg', 'ok'], ['LR', 'Luca R.', '81,0 kg', 'ok'], ['GT', 'Giulia T.', '—', 'warn'], ['AF', 'Andrea F.', '68,7 kg', 'ok'], ['SC', 'Sara C.', '59,3 kg', '']].map(([a, n, v, s]) => (
      <div className="pt-row" key={n}><span className="avatar sm">{a}</span><b>{n}</b><small>{v}</small><span className={`dot ${s}`} /></div>
    ))}
  </div>
);

export function Laptop() {
  return (
    <div className="lap">
      <div className="lap-screen">
        <aside><b className="lap-logo">Nutra<span>Intel</span></b>{['Pazienti', 'Misurazioni', 'Avvisi', 'Analisi'].map((t, i) => <span key={t} className={i === 0 ? 'on' : ''}>{t}</span>)}</aside>
        <div className="lap-main">
          <div className="lap-head"><b>Pazienti</b><small>Portale professionale</small></div>
          <div className="lap-kpis"><span><small>PAZIENTI ATTIVI</small><b>48</b></span><span><small>MISURAZIONI OGGI</small><b>17</b></span><span><small>AVVISI</small><b>3</b></span></div>
          <div className="lap-table">
            {[['Maria B.', '72,4 kg', '12 gg'], ['Luca R.', '81,0 kg', '5 gg'], ['Giulia T.', '—', '14 gg'], ['Andrea F.', '68,7 kg', '2 gg']].map((r) => (
              <div key={r[0]}><b>{r[0]}</b><span>{r[1]}</span><span>{r[2]}</span></div>
            ))}
          </div>
        </div>
      </div>
      <div className="lap-base" />
    </div>
  );
}
