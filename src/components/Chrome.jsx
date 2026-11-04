import { useEffect, useState } from 'react';

export function Nav() {
  return (
    <header className="nav" aria-label="Navigazione NutraIntel">
      <a className="nav-logo" href="#top" aria-label="NutraIntel - torna all'inizio">Nutra<span>Intel</span><sup>®</sup></a>
      <nav className="nav-links" aria-label="Sezioni">
        <a href="#problema">La sfida</a><a href="#monitoraggio">La soluzione</a><a href="#use-case">Cosa fa NutraIntel</a><a href="#video">Video</a><a href="#faq">FAQ</a>
      </nav>
      <div className="nav-cta"><a className="btn btn-dark xs" href="#prelancio">Diventa early adopter</a></div>
    </header>
  );
}

export function Progress() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const els = [...document.querySelectorAll('[data-section]')];
    const io = new IntersectionObserver((ents) => {
      ents.forEach((e) => { if (e.isIntersecting) setActive(Number(e.target.dataset.section)); });
    }, { rootMargin: '-50% 0px -50% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return <div className="progress" aria-hidden="true">{[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <i key={i} className={i === active ? 'on' : ''} />)}</div>;
}

export function Outro() {
  return (
    <section className="outro" aria-labelledby="outro-title">
      <div className="outro-blobs" aria-hidden="true"><i /><i /><i /></div>
      <h2 id="outro-title" data-blur-simple>Il percorso, sempre connesso.</h2>
      <div className="btns center" data-fade>
        <a className="btn btn-dark" href="#prelancio">Resta aggiornato</a>
        <a className="btn btn-line" href="#video">Guarda il video</a>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="foot">
      <div className="foot-top">
        <div className="foot-brand">
          <a className="nav-logo" href="#top">Nutra<span>Intel</span></a>
          <span className="foot-powered">Powered by <strong>DiGiTi Company srl</strong></span>
        </div>
        <nav className="foot-big" aria-label="Footer">
          <a href="#problema">La sfida</a><a href="#monitoraggio">La soluzione</a><a href="#use-case">Cosa fa NutraIntel</a><a href="#video">Video</a><a href="#faq">FAQ</a>
        </nav>
        <div className="foot-actions">
          <a className="foot-instagram" href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="NutraIntel su Instagram">
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" /></svg>
            <span>Instagram</span>
          </a>
          <a className="foot-back" href="#top">Torna su <span>↑</span></a>
        </div>
      </div>
      <div className="foot-bot"><span>© 2026 NutraIntel · Pre-lancio</span></div>
    </footer>
  );
}

