import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../i18n.jsx';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const ref = useRef(null);
  const { t } = useLanguage();

  useLayoutEffect(() => {
    let mobileFrame = 0;
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
      const sticky = ref.current?.querySelector('.hero-sticky');
      const mobileFillScale = () => {
        if (!mobileFill) return 1;
        const width = sticky?.clientWidth || innerWidth;
        const height = sticky?.clientHeight || innerHeight;
        const diameter = mobileFill.offsetWidth || Math.max(width, height);
        return (Math.hypot(width, height) / diameter) * 1.12;
      };
      const intro = gsap.timeline({ delay: .15 })
        .fromTo('.hero-bg', { opacity: 0 }, { opacity: 1, duration: 1.1, ease: 'power2.out' });

      if (!compactIntro) {
        intro.fromTo(hint, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .8 }, 1.1);
      }

      if (compactIntro) {
        const wordmark = ref.current?.querySelector('.hero-wm');
        const wordLeft = ref.current?.querySelector('.wm-l');
        const wordRight = ref.current?.querySelector('.wm-r');
        const tag = ref.current?.querySelector('.hero-tag');
        const story = ref.current?.querySelector('.hero-story');
        const storySide = ref.current?.querySelector('.hero-story-side');
        const clamp = gsap.utils.clamp;
        const mix = gsap.utils.interpolate;
        const smooth = (start, end, value) => {
          const amount = clamp(0, 1, (value - start) / (end - start));
          return amount * amount * (3 - 2 * amount);
        };

        gsap.set(mobileFill, { xPercent: -50, yPercent: -50, scale: .12, opacity: 0, force3D: true });
        gsap.set([wordmark, wordLeft, wordRight, tag, story, storySide], { force3D: true });
        gsap.set(wordmark, { yPercent: 0, scale: 1, opacity: 1, transformOrigin: '50% 50%' });
        gsap.set(wordLeft, { xPercent: -18, opacity: 0 });
        gsap.set(wordRight, { xPercent: 18, opacity: 0 });
        gsap.set(tag, { y: 30, opacity: 0 });
        gsap.set(story, { y: 20, scale: 1, opacity: 0, transformOrigin: '50% 50%' });
        gsap.set(storySide, { y: 18, opacity: 0 });
        gsap.set(hint, { y: 0, opacity: 1 });

        const set = {
          fillScale: gsap.quickSetter(mobileFill, 'scale'),
          fillOpacity: gsap.quickSetter(mobileFill, 'opacity'),
          leftX: gsap.quickSetter(wordLeft, 'xPercent'),
          leftOpacity: gsap.quickSetter(wordLeft, 'opacity'),
          rightX: gsap.quickSetter(wordRight, 'xPercent'),
          rightOpacity: gsap.quickSetter(wordRight, 'opacity'),
          wordY: gsap.quickSetter(wordmark, 'yPercent'),
          wordScale: gsap.quickSetter(wordmark, 'scale'),
          wordOpacity: gsap.quickSetter(wordmark, 'opacity'),
          tagY: gsap.quickSetter(tag, 'y', 'px'),
          tagOpacity: gsap.quickSetter(tag, 'opacity'),
          storyY: gsap.quickSetter(story, 'y', 'px'),
          storyScale: gsap.quickSetter(story, 'scale'),
          storyOpacity: gsap.quickSetter(story, 'opacity'),
          sideY: gsap.quickSetter(storySide, 'y', 'px'),
          sideOpacity: gsap.quickSetter(storySide, 'opacity'),
          hintY: gsap.quickSetter(hint, 'y', 'px'),
          hintOpacity: gsap.quickSetter(hint, 'opacity'),
        };

        const renderMobile = (progress) => {
          const leftIn = smooth(.16, .28, progress);
          const rightIn = smooth(.12, .24, progress);
          const tagIn = smooth(.24, .36, progress);
          const lift = smooth(.36, .50, progress);
          const wordOut = smooth(.46, .56, progress);
          const tagOut = smooth(.40, .52, progress);
          const storyIn = smooth(.48, .62, progress);
          const sideIn = smooth(.55, .69, progress);
          const storyOut = smooth(.86, .97, progress);
          const hintOut = smooth(.01, .09, progress);
          const fillIn = smooth(.24, .34, progress);
          const fillGrow = smooth(.31, .45, progress);
          const fillOut = smooth(.86, .99, progress);
          const coverScale = mobileFillScale();
          const enteringScale = mix(.12, .42, fillIn);
          const expandedScale = mix(enteringScale, coverScale, fillGrow);

          set.fillScale(mix(expandedScale, .18, fillOut));
          set.fillOpacity(fillIn);
          set.leftX(mix(-18, 0, leftIn));
          set.leftOpacity(leftIn);
          set.rightX(mix(18, 0, rightIn));
          set.rightOpacity(rightIn);
          set.wordY(mix(0, -150, lift));
          set.wordScale(mix(1, .72, lift));
          set.wordOpacity(1 - wordOut);
          set.tagY(mix(mix(30, 0, tagIn), -30, tagOut));
          set.tagOpacity(tagIn * (1 - tagOut));
          set.storyY(mix(20, 0, storyIn));
          set.storyScale(mix(1, .94, storyOut));
          set.storyOpacity(storyIn * (1 - storyOut));
          set.sideY(mix(18, 0, sideIn));
          set.sideOpacity(sideIn);
          set.hintY(mix(0, -8, hintOut));
          set.hintOpacity(1 - hintOut);
        };

        let pendingProgress = 0;
        const queueMobileRender = (progress) => {
          pendingProgress = progress;
          if (mobileFrame) return;
          mobileFrame = requestAnimationFrame(() => {
            mobileFrame = 0;
            renderMobile(pendingProgress);
          });
        };

        const mobileTrigger = ScrollTrigger.create({
          trigger: ref.current,
          start: 'top top',
          end: 'bottom bottom',
          invalidateOnRefresh: true,
          onUpdate: ({ progress }) => queueMobileRender(progress),
          onRefresh: ({ progress }) => queueMobileRender(progress),
        });
        renderMobile(mobileTrigger.progress);
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          invalidateOnRefresh: true,
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
    return () => {
      if (mobileFrame) cancelAnimationFrame(mobileFrame);
      ctx.revert();
    };
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
