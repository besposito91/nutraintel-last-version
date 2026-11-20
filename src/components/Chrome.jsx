import { useEffect, useState } from 'react';
import { languageOptions, useLanguage } from '../i18n.jsx';
 
function LanguageMenu() {
  const { language, setLanguage } = useLanguage();
  return (
    <label className="language-menu">
      <span className="sr-only">Language</span>
      <select value={language} onChange={(event) => setLanguage(event.target.value)} aria-label="Language">
        {languageOptions.map((item) => <option value={item.code} key={item.code}>{item.short} · {item.label}</option>)}
      </select>
    </label>
  );
}
export function Nav() {
  const { t } = useLanguage();
  return (
    <header className="nav" aria-label={t('nav.aria')}>
      <a className="nav-logo" href="#top" aria-label={t('nav.home')}>
        <img src="./images/brand/nutraintel-logo.svg" alt="NutraIntel" />
      </a>
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
          <a className="nav-logo" href="#top" aria-label={t('nav.home')}>
            <img src="./images/brand/nutraintel-logo-white.svg" alt="NutraIntel" />
          </a>
          <span className="foot-powered">Powered by <a href="https://digiticompany.it/" target="_blank" rel="noreferrer"><strong>DiGiTi Company srl</strong></a></span>
        </div>
        <nav className="foot-big" aria-label="Footer">
          <a href="#problema">{t('nav.challenge')}</a><a href="#monitoraggio">{t('nav.solution')}</a><a href="#use-case">{t('nav.usecases')}</a><a href="#video">{t('nav.video')}</a><a href="#faq">{t('nav.faq')}</a>
        </nav>
        <div className="foot-actions">
          <div className="foot-socials">
            <a className="foot-social foot-instagram" href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label={t('footer.instagram')}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" /></svg>
            </a>
            <a className="foot-social foot-social-mobile" href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v5h4v-5h3l1-4h-4V9c0-.7.3-1 1-1Z" /></svg>
            </a>
            <a className="foot-social foot-social-mobile" href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 10v7M8 7.5v.01M12 17v-7M12 13.5c0-2 1-3.5 3-3.5s3 1.5 3 4v3" /></svg>
            </a>
          </div>
          <a className="foot-back" href="#top">
  <span aria-hidden="true">↑</span>
  {t('footer.back')}
</a>
        </div>
      </div>
      <div className="foot-bot"><span>{t('footer.copyright')}</span></div>
    </footer>
  );
}
