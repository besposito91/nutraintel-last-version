import { useEffect, useState } from 'react';
import { languageOptions, useLanguage } from '../i18n.jsx';

/*function LanguageMenu() {
  const { language, setLanguage } = useLanguage();
  return (
    <label className="language-menu">
      <span className="sr-only">Language</span>
      <select value={language} onChange={(event) => setLanguage(event.target.value)} aria-label="Language">
        {languageOptions.map((item) => <option value={item.code} key={item.code}>{item.short} · {item.label}</option>)}
      </select>
    </label>
  );
}*/

export function Nav() {
  const { t } = useLanguage();
  return (
    <header className="nav" aria-label={t('nav.aria')}>
      <a className="nav-logo" href="#top" aria-label={t('nav.home')}>Nutra<span>Intel</span><sup>®</sup></a>
      <nav className="nav-links" aria-label={t('nav.sections')}>
        <a href="#problema">{t('nav.challenge')}</a><a href="#monitoraggio">{t('nav.solution')}</a><a href="#use-case">{t('nav.usecases')}</a><a href="#video">{t('nav.video')}</a><a href="#faq">{t('nav.faq')}</a>
      </nav>
      <div className="nav-actions"><LanguageMenu /><div className="nav-cta"><a className="btn btn-dark xs" href="#prelancio">{t('nav.cta')}</a></div></div>
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
  const { t } = useLanguage();
  return (
    <section className="outro" aria-labelledby="outro-title">
      <div className="outro-blobs" aria-hidden="true"><i /><i /><i /></div>
      <h2 id="outro-title" data-blur-simple>{t('impact.title')}</h2>
      <div className="btns center" data-fade>
        <a className="btn btn-dark" href="#prelancio">{t('nav.cta')}</a>
        <a className="btn btn-line" href="#video">{t('nav.video')}</a>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="foot">
      <div className="foot-top">
        <div className="foot-brand">
          <a className="nav-logo" href="#top">Nutra<span>Intel</span></a>
          <span className="foot-powered">Powered by <a href="https://digiticompany.it/" target="_blank" rel="noreferrer"><strong>DiGiTi Company srl</strong></a></span>
        </div>
        <nav className="foot-big" aria-label="Footer">
          <a href="#problema">{t('nav.challenge')}</a><a href="#monitoraggio">{t('nav.solution')}</a><a href="#use-case">{t('nav.usecases')}</a><a href="#video">{t('nav.video')}</a><a href="#faq">{t('nav.faq')}</a>
        </nav>
        <div className="foot-actions">
          <a className="foot-instagram" href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label={t('footer.instagram')}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" /></svg>
            <span>Instagram</span>
          </a>
          <a className="foot-back" href="#top">{t('footer.back')} <span>↑</span></a>
        </div>
      </div>
      <div className="foot-bot"><span>{t('footer.copyright')}</span></div>
    </footer>
  );
}

