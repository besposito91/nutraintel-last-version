import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import BlurText from './BlurText.jsx';
import { useLanguage } from '../i18n.jsx';

export default function Hero() {
  const ref = useRef(null);
  const { t } = useLanguage();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const hint = ref.current?.querySelector('.hero-hint');
      gsap.timeline({ delay: .15 })
        .fromTo('.hero-bg', { opacity: 0 }, { opacity: 1, duration: 1.1, ease: 'power2.out' })
        .fromTo(hint, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .8 }, 1.1);

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      });
      tl.to(hint, { opacity: 0, duration: .05 }, .02)
        .fromTo('.wm-r', { opacity: 0, xPercent: 18 }, { opacity: 1, xPercent: 0, duration: .12 }, .08)
        .fromTo('.wm-l', { opacity: 0, xPercent: -18 }, { opacity: 1, xPercent: 0, duration: .12 }, .16)
        .fromTo('.hero-tag', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .1 }, .24)
        .to('.hero-wm', { yPercent: -150, scale: .72, duration: .16, ease: 'power1.in' }, .38)
        .to('.hero-wm', { opacity: 0, duration: .07 }, .47)
        .to('.hero-tag', { opacity: 0, y: -30, duration: .07 }, .38)
        .fromTo('.hero-story', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .06 }, .50)
        .fromTo('.hero-story-side', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .07 }, .57)
        .to({}, { duration: .08 }, .8)
        .to('.hero-story', { scale: .94, opacity: 0, duration: .12, ease: 'power2.in' }, .84)
        .to({}, { duration: .06 }, .94);
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero energy-hero" id="top" ref={ref} aria-labelledby="hero-title" data-section="0">
      <div className="hero-sticky">
        <div className="hero-bg mesh" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="grain" aria-hidden="true" />
        <div className="hero-wm" aria-hidden="true"><span className="wm-l">Nutra</span><span className="wm-gap" /><span className="wm-r">Intel<sup>®</sup></span></div>
        <p className="hero-tag">{t('hero.tag')}</p>
        <div className="hero-story">
          <BlurText as="h1" id="hero-title" className="hero-title" text={t('hero.title')} />
          <div className="hero-story-side">
            <p>{t('hero.subtitle')}</p>
            <div className="btns">
              <a className="btn btn-dark" href="#prelancio">{t('hero.cta')}</a>
              <a className="btn btn-line" href="#monitoraggio">{t('hero.discover')}</a>
            </div>
          </div>
        </div>
        <div className="hero-hint" aria-hidden="true"><span>{t('hero.scroll')}</span><i><b /></i></div>
      </div>
    </section>
  );
}
