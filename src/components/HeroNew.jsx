import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLanguage } from '../i18n.jsx';

export default function Hero() {
  const ref = useRef(null);
  const { t } = useLanguage();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const compactIntro = matchMedia('(max-width: 720px), (pointer: coarse)').matches;
      const timing = compactIntro ? {
        wordRight: .17, wordLeft: .21, tagIn: .27, wordLift: .39,
        wordOut: .45, tagOut: .40, storyIn: .49, sideIn: .55,
        pause: .77, storyOut: .87, end: .96,
      } : {
        wordRight: .39, wordLeft: .45, tagIn: .52, wordLift: .61,
        wordOut: .69, tagOut: .61, storyIn: .71, sideIn: .77,
        pause: .84, storyOut: .89, end: .97,
      };
      const hint = ref.current?.querySelector('.hero-hint');
      const mobileFill = ref.current?.querySelector('.hero-mobile-fill');
      const mobileFillScale = () => {
        if (!mobileFill) return 1;
        const diameter = mobileFill.offsetWidth || Math.max(innerWidth, innerHeight);
        return (Math.hypot(innerWidth, innerHeight) / diameter) * 1.18;
      };
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
          invalidateOnRefresh: true,
          ...(compactIntro ? {
            snap: {
              snapTo: [0, .145, .36, .60, .86, 1],
              duration: { min: .18, max: .42 },
              delay: .035,
              ease: 'power2.out',
              directional: true,
            },
          } : {}),
        },
      });
      if (compactIntro && mobileFill) {
        // On mobile the Hero owns its sphere. Keeping it separate from the
        // shared narrative sphere prevents the following section timelines
        // from overwriting its scale while the Hero is still visible.
        tl.fromTo(
          mobileFill,
          { opacity: 0, scale: .12 },
          { opacity: 1, scale: .42, duration: .04, immediateRender: true },
          .27,
        )
          .to(mobileFill, { opacity: 1, scale: mobileFillScale, duration: .05 }, .31)
          .to(mobileFill, { opacity: 1, scale: .18, duration: .085 }, .90);
      }
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
        <div className="hero-mobile-fill" aria-hidden="true" />
        <div className="hero-wm" aria-hidden="true"><span className="wm-l">Nutra</span><span className="wm-gap" /><span className="wm-r">Intel<sup>®</sup></span></div>
        <p className="hero-tag">{t('hero.tag')}</p>
        <div className="hero-story">
          <h1 id="hero-title" className="hero-title">
            <span className="hero-title-line">{t('hero.titleLine1')}</span>
            <span className="hero-title-line">
              <span>{t('hero.titlePrefix')} </span>
              <span className="highlight">{t('hero.titleHighlight')}</span>{' '}
              <span>{t('hero.titleTail')}</span>
            </span>
          </h1>
          <div className="hero-story-side">
            <p>
              {t('hero.subtitleBefore')}
              <strong>{t('hero.subtitleEmphasis')}</strong>
              {t('hero.subtitleAfter')}
            </p>
            <div className="btns">
              <a className="btn btn-dark" href="#prelancio">{t('hero.cta')}</a>
              <a className="btn btn-line" href="#problema">
                {t('hero.discover')} <span className="discover-arrow" aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
        </div>
        <div className="hero-hint" aria-hidden="true"><span>{t('hero.scroll')}</span><i><b /></i></div>
      </div>
    </section>
  );
}
