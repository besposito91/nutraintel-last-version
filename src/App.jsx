import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import Hero from './components/HeroNew.jsx';
import SeeDeeper from './components/SeeDeeper.jsx';
import ProblemStory from './components/ProblemStory.jsx';
import Workflow from './components/Workflow.jsx';
import Consequences from './components/Consequences.jsx';
import Video from './components/Video.jsx';
import Faq from './components/Faq.jsx';
import Prelaunch from './components/Prelaunch.jsx';
import NarrativeEnergy from './components/NarrativeEnergy.jsx';
import { Nav, Progress, Footer } from './components/Chrome.jsx';
import { useLanguage } from './i18n.jsx';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const { t } = useLanguage();
  useLayoutEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const touchInput = matchMedia('(pointer: coarse)').matches;
    const mobileViewport = matchMedia('(max-width: 720px)').matches;
    // The mobile browser bar changes the visual viewport while the user drags.
    // Ignoring those tiny resizes keeps scrubbed scenes locked to the finger
    // instead of refreshing their measurements halfway through the gesture.
    ScrollTrigger.config({ ignoreMobileResize: mobileViewport });
    const lenis = mobileViewport ? null : new Lenis({
        lerp: touchInput ? .105 : .12,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: touchInput ? 1.14 : 1,
        virtualScroll: (data) => {
          const amount = Math.abs(data.deltaY);
          const trackpad = data.event.deltaMode === 0 && amount < 80;
          if (!trackpad || amount === 0) return true;
          const factor = amount < 5 ? 1.3 : amount > 28 ? .72 : 1;
          data.deltaY = Math.sign(data.deltaY) * Math.min(58, amount * factor);
          return true;
        },
        syncTouch: false,
        gestureOrientation: 'vertical',
        overscroll: false,
        anchors: { offset: -64 },
        stopInertiaOnNavigate: true,
        respectReducedMotion: true,
      });
    const syncScroll = () => ScrollTrigger.update();
    const tickLenis = (time) => lenis.raf(time * 1000);
    if (lenis) {
      lenis.on('scroll', syncScroll);
      gsap.ticker.add(tickLenis);
    }
    // Keep the already crisp desktop response, but avoid large catch-up frames
    // after a busy paint on phones and tablets.
    if (touchInput) gsap.ticker.lagSmoothing(500, 33);
    else gsap.ticker.lagSmoothing(0);

    const navigateTo = (event) => {
      const target = event.detail?.target;
      if (!Number.isFinite(target)) return;
      if (lenis) lenis.scrollTo(target, { duration: .9, easing: (value) => 1 - Math.pow(1 - value, 3) });
      else window.scrollTo({ top: target, behavior: 'smooth' });
    };
    window.addEventListener('nutraintel:scroll-to', navigateTo);

    const ctx = gsap.context(() => {
      if (!reduced) {
        gsap.fromTo('.nav', { yPercent: -110, opacity: 0 }, { yPercent: 0, opacity: 1, ease: 'power2.out', scrollTrigger: { trigger: '.hero', start: '18% top', end: '24% top', scrub: true } });
        gsap.utils.toArray('[data-fade], [data-blur], [data-blur-simple]').forEach((el) => {
          gsap.fromTo(el, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: .75, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
        });
      }
    });

    let refreshFrame = 0;
    const refresh = () => {
      if (refreshFrame) cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(() => {
        refreshFrame = 0;
        ScrollTrigger.refresh(true);
        ScrollTrigger.update();
      });
    };
    document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh);
    window.addEventListener('pageshow', refresh);
    window.addEventListener('orientationchange', refresh);
    return () => {
      ctx.revert();
      if (lenis) {
        lenis.off('scroll', syncScroll);
        lenis.destroy();
        gsap.ticker.remove(tickLenis);
      }
      gsap.ticker.lagSmoothing(500, 33);
      if (refreshFrame) cancelAnimationFrame(refreshFrame);
      window.removeEventListener('nutraintel:scroll-to', navigateTo);
      window.removeEventListener('load', refresh);
      window.removeEventListener('pageshow', refresh);
      window.removeEventListener('orientationchange', refresh);
    };
  }, []);

  return (
    <>
      <a className="skip" href="#main">{t('nav.skip')}</a>
      <Nav />
      <Progress />
      <NarrativeEnergy />
      <main id="main">
        <Hero />
        <ProblemStory />
        <SeeDeeper />
        <Workflow />
        <Consequences />
        <Video />
        <Faq />
        <Prelaunch />
      </main>
      <Footer />
    </>
  );
}


