import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import BlurText from './BlurText.jsx';
import { useLanguage } from '../i18n.jsx';

export default function Hero() {
  const ref = useRef(null);
  const { t } = useLanguage();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const compactIntro = matchMedia('(max-width: 720px), (pointer: coarse)').matches;
      const timing = compactIntro ? {
        wordRight: .23, wordLeft: .27, tagIn: .33, wordLift: .49,
        wordOut: .56, tagOut: .49, storyIn: .62, sideIn: .69,
        pause: .78, storyOut: .86, end: .96,
      } : {
        wordRight: .39, wordLeft: .45, tagIn: .52, wordLift: .61,
        wordOut: .69, tagOut: .61, storyIn: .71, sideIn: .77,
        pause: .84, storyOut: .89, end: .97,
      };
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
        .fromTo('.wm-r', { opacity: 0, xPercent: 18 }, { opacity: 1, xPercent: 0, duration: compactIntro ? .055 : .08 }, timing.wordRight)
        .fromTo('.wm-l', { opacity: 0, xPercent: -18 }, { opacity: 1, xPercent: 0, duration: compactIntro ? .055 : .08 }, timing.wordLeft)
        .fromTo('.hero-tag', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: compactIntro ? .06 : .07 }, timing.tagIn)
        .to('.hero-wm', { yPercent: -150, scale: .72, duration: .12, ease: 'power1.in' }, timing.wordLift)
        .to('.hero-wm', { opacity: 0, duration: .06 }, timing.wordOut)
        .to('.hero-tag', { opacity: 0, y: -30, duration: .06 }, timing.tagOut)
        .fromTo('.hero-story', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .055 }, timing.storyIn)
        .fromTo('.hero-story-side', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .06 }, timing.sideIn)
        .to({}, { duration: .04 }, timing.pause)
        .to('.hero-story', { scale: .94, opacity: 0, duration: .09, ease: 'power2.in' }, timing.storyOut)
        .to({}, { duration: .03 }, timing.end);
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
