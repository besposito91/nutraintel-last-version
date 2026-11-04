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

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useLayoutEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const touchInput = matchMedia('(pointer: coarse)').matches;
    const lenis = new Lenis({
      lerp: touchInput ? .078 : .12,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: .86,
      virtualScroll: (data) => {
        const amount = Math.abs(data.deltaY);
        const trackpad = data.event.deltaMode === 0 && amount < 80;
        if (!trackpad || amount === 0) return true;
        const factor = amount < 5 ? 1.3 : amount > 28 ? .72 : 1;
        data.deltaY = Math.sign(data.deltaY) * Math.min(58, amount * factor);
        return true;
      },
      syncTouch: touchInput,
      syncTouchLerp: .06,
      touchInertiaMultiplier: 15,
      gestureOrientation: 'vertical',
      overscroll: false,
      anchors: { offset: -64 },
      stopInertiaOnNavigate: true,
      respectReducedMotion: true,
    });
    const syncScroll = () => ScrollTrigger.update();
    const tickLenis = (time) => lenis.raf(time * 1000);
    lenis.on('scroll', syncScroll);
    gsap.ticker.add(tickLenis);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      if (!reduced) {
        gsap.fromTo('.nav', { yPercent: -110, opacity: 0 }, { yPercent: 0, opacity: 1, ease: 'power2.out', scrollTrigger: { trigger: '.hero', start: '18% top', end: '24% top', scrub: true } });
        gsap.utils.toArray('[data-fade], [data-blur], [data-blur-simple]').forEach((el) => {
          gsap.fromTo(el, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: .75, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
        });
      }
    });

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh);
    return () => {
      ctx.revert();
      lenis.off('scroll', syncScroll);
      lenis.destroy();
      gsap.ticker.remove(tickLenis);
      gsap.ticker.lagSmoothing(500, 33);
      window.removeEventListener('load', refresh);
    };
  }, []);

  return (
    <>
      <a className="skip" href="#main">Vai al contenuto</a>
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


