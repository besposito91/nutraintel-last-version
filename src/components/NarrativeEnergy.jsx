import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const get = (selector) => document.querySelector(selector);

export default function NarrativeEnergy() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const root = ref.current;
    const hero = get('.hero');
    const problems = get('.split-problems');
    const solution = get('.solution-triangle-section');
    const usecases = get('.usecases');
    const consequences = get('.consequences');
    if (!root || !hero || !problems || !solution || !usecases || !consequences) return undefined;

    const core = root.querySelector('.narrative-core');
    const logo = root.querySelector('.narrative-logo');
    const pair = root.querySelector('.narrative-pair');
    const doctor = root.querySelector('.narrative-particle-doctor');
    const patient = root.querySelector('.narrative-particle-patient');
    const particles = [doctor, patient];
    const rings = root.querySelectorAll('.narrative-ring');
    const shade = root.querySelector('.narrative-shade');
    const fracture = root.querySelector('.narrative-fracture');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const compactMotion = matchMedia('(max-width: 720px), (pointer: coarse)').matches;
    const logoSize = () => logo.getBoundingClientRect().width;
    const blueHead = () => ({ x: logoSize() * .214, y: logoSize() * -.373 });
    const greenHead = () => ({ x: logoSize() * -.224, y: logoSize() * -.253 });

    const ctx = gsap.context(() => {
      gsap.set(core, { xPercent: -50, yPercent: -50, x: 0, y: 0, scale: .14, rotation: 0, autoAlpha: 0, force3D: true });
      gsap.set(logo, { xPercent: -50, yPercent: -50, x: 0, y: 0, scale: 1, rotation: 0, autoAlpha: 1, force3D: true });
      gsap.set(pair, { xPercent: -50, yPercent: -50, rotation: 0, autoAlpha: 1 });
      gsap.set(doctor, { x: () => blueHead().x, y: () => blueHead().y, scale: .275, rotation: 0, autoAlpha: 1, force3D: true });
      gsap.set(patient, { x: () => greenHead().x, y: () => greenHead().y, scale: .24, rotation: 0, autoAlpha: 1, force3D: true });
      gsap.set(rings, { scale: .5, autoAlpha: 0 });
      gsap.set(shade, { autoAlpha: 0 });
      gsap.set(fracture, { xPercent: -50, yPercent: -50, scale: .45, rotation: -16, autoAlpha: 0 });

      if (reduced) {
        gsap.set(core, { autoAlpha: 0 });
        gsap.set(logo, { autoAlpha: 1, scale: 1 });
        return;
      }

      const orbit = gsap.to(pair, { rotation: 360, duration: 7.5, repeat: -1, ease: 'none', paused: true });
      const storyScrub = compactMotion ? .08 : true;
      const heroFillScale = () => compactMotion ? 1.42 : 4.4;
      const intro = compactMotion ? {
        logo: .01, detach: .02, sweep: .052, fall: .105, gather: .165,
        gatherTight: .215, logoOut: .12, coreIn: .23, merge: .255,
        form: .27, fill: .34, hold: .48, close: .58,
        logoDuration: .06, detachDuration: .035, sweepDuration: .07,
        fallDuration: .085, gatherDuration: .07, tightDuration: .05,
        logoOutDuration: .045,
        coreDuration: .055, mergeDuration: .045, formDuration: .075,
        fillDuration: .15, holdDuration: .10, closeDuration: .16,
      } : {
        logo: .02, detach: .04, sweep: .10, fall: .19, gather: .31,
        gatherTight: .405, logoOut: .245, coreIn: .43, merge: .475,
        form: .49, fill: .59, hold: .74, close: .82,
        logoDuration: .14, detachDuration: .07, sweepDuration: .13,
        fallDuration: .17, gatherDuration: .14, tightDuration: .095,
        logoOutDuration: .08,
        coreDuration: .10, mergeDuration: .075, formDuration: .13,
        fillDuration: .22, holdDuration: .14, closeDuration: .18,
      };

      gsap.timeline({
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom bottom', scrub: storyScrub, invalidateOnRefresh: true },
      })
        .to(logo, { y: -6, scale: .99, duration: intro.logoDuration, ease: 'power1.inOut' }, intro.logo)
        .to(doctor, { x: () => logoSize() * .39, y: () => logoSize() * -.27, rotation: 24, duration: intro.detachDuration, ease: 'power1.in' }, intro.detach)
        .to(patient, { x: () => logoSize() * -.39, y: () => logoSize() * -.17, rotation: -24, duration: intro.detachDuration, ease: 'power1.in' }, intro.detach)
        .to(doctor, { x: () => logoSize() * .67, y: () => logoSize() * .22, rotation: 94, scale: .31, duration: intro.sweepDuration, ease: 'sine.inOut' }, intro.sweep)
        .to(patient, { x: () => logoSize() * -.67, y: () => logoSize() * .28, rotation: -94, scale: .31, duration: intro.sweepDuration, ease: 'sine.inOut' }, intro.sweep)
        .to(doctor, { x: () => logoSize() * .72, y: () => logoSize() * .94, rotation: 188, scale: .31, duration: intro.fallDuration, ease: 'sine.inOut' }, intro.fall)
        .to(patient, { x: () => logoSize() * -.72, y: () => logoSize() * .86, rotation: -188, scale: .31, duration: intro.fallDuration, ease: 'sine.inOut' }, intro.fall)
        .to(logo, { y: -28, scale: .94, autoAlpha: 0, duration: intro.logoOutDuration, ease: 'power2.in' }, intro.logoOut)
        .to(doctor, { x: () => logoSize() * .34, y: () => logoSize() * .62, rotation: 265, scale: .27, duration: intro.gatherDuration, ease: 'sine.inOut' }, intro.gather)
        .to(patient, { x: () => logoSize() * -.34, y: () => logoSize() * .58, rotation: -265, scale: .27, duration: intro.gatherDuration, ease: 'sine.inOut' }, intro.gather)
        .to(doctor, { x: 18, y: 22, rotation: 310, scale: .24, duration: intro.tightDuration, ease: 'power2.inOut' }, intro.gatherTight)
        .to(patient, { x: -18, y: 18, rotation: -310, scale: .24, duration: intro.tightDuration, ease: 'power2.inOut' }, intro.gatherTight)
        .to(core, { autoAlpha: .58, scale: .18, duration: intro.coreDuration, ease: 'power2.out' }, intro.coreIn)
        .to(particles, { x: 0, y: 0, scale: .06, autoAlpha: 0, duration: intro.mergeDuration, ease: 'power2.in' }, intro.merge)
        .to(core, { scale: .48, rotation: 24, duration: intro.formDuration, ease: 'power2.inOut' }, intro.form)
        .to(core, { scale: heroFillScale, autoAlpha: .96, rotation: 78, duration: intro.fillDuration, ease: 'power2.inOut' }, intro.fill)
        .to(core, { scale: heroFillScale, autoAlpha: .96, rotation: 96, duration: intro.holdDuration, ease: 'none' }, intro.hold)
        .to(core, { scale: .18, autoAlpha: 1, rotation: 118, duration: intro.closeDuration, ease: 'power2.inOut' }, intro.close);

      gsap.timeline({
        scrollTrigger: {
          trigger: problems,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: storyScrub,
          invalidateOnRefresh: true,
          onEnter: () => { orbit.pause(); gsap.set(pair, { rotation: 0 }); },
          onLeaveBack: () => { orbit.pause(); gsap.set(pair, { rotation: 0 }); },
        },
      })
        .to(core, { autoAlpha: 1, scale: .22, rotation: 132, duration: .05 }, 0)
        .fromTo(fracture, { autoAlpha: 0, scale: .45, rotation: -16 }, { autoAlpha: 1, scale: 1.05, rotation: 8, duration: .09, ease: 'power3.out', immediateRender: false }, .025)
        .to(rings, { autoAlpha: .75, scale: 1.7, stagger: .014, duration: .08, ease: 'power2.out' }, .035)
        .to(fracture, { autoAlpha: 0, scale: 1.65, rotation: 25, duration: .14, ease: 'power2.in' }, .095)
        .to(rings, { autoAlpha: 0, scale: 2.25, duration: .07, ease: 'power2.in' }, .10)
        .to(core, { autoAlpha: 0, scale: .08, duration: .08, ease: 'power2.in' }, .10)
        .set(pair, { rotation: 0 }, .11)
        .fromTo(doctor, { x: 0, y: 0, scale: .1, autoAlpha: 0 }, { x: () => -Math.min(innerWidth * .39, 620), y: () => innerHeight * .14, scale: 1.06, autoAlpha: 1, duration: .35, ease: 'power2.out', immediateRender: false }, .11)
        .fromTo(patient, { x: 0, y: 0, scale: .1, autoAlpha: 0 }, { x: () => Math.min(innerWidth * .39, 620), y: () => innerHeight * .21, scale: 1.06, autoAlpha: 1, duration: .35, ease: 'power2.out', immediateRender: false }, .11)
        .to(doctor, { x: () => -Math.min(innerWidth * .32, 520), y: () => innerHeight * .28, scale: .88, duration: .48, ease: 'power1.inOut' }, .50)
        .to(patient, { x: () => Math.min(innerWidth * .32, 520), y: () => innerHeight * .28, scale: .88, duration: .48, ease: 'power1.inOut' }, .50);

      const expandedScale = () => {
        if (compactMotion) {
          const diameter = core.offsetWidth || Math.max(innerWidth, innerHeight);
          return (Math.hypot(innerWidth, innerHeight) / diameter) * 1.06;
        }
        const coreDiameter = Math.min(Math.max(innerWidth, innerHeight) * .7, 1020);
        return (Math.hypot(innerWidth, innerHeight) / coreDiameter) * 1.12;
      };
      const ecosystemScale = () => {
        if (innerWidth <= 720) return .82;
        if (innerWidth <= 1100) return .96;
        return 1.08;
      };

      gsap.timeline({
        scrollTrigger: { trigger: solution, start: 'top bottom', end: 'bottom bottom', scrub: storyScrub, invalidateOnRefresh: true },
      })
        .to(particles, { x: 0, y: 0, scale: .68, duration: .09, ease: 'power2.inOut' }, 0)
        .to(core, { autoAlpha: 1, scale: .17, rotation: 160, duration: .07, ease: 'power2.out' }, .045)
        .set(particles, { autoAlpha: 0, scale: .06 }, .075)
        .to(core, { scale: ecosystemScale, autoAlpha: .16, rotation: 215, duration: .18, ease: 'power3.out' }, .08)
        .to(core, { scale: ecosystemScale, autoAlpha: .14, rotation: 246, duration: .48, ease: 'none' }, .26)
        .to(core, { x: () => -innerWidth * .415, y: () => innerHeight * .40, scale: .038, autoAlpha: 1, rotation: 292, duration: .2, ease: 'power2.inOut' }, .80);

      const setX = gsap.quickSetter(core, 'x', 'px');
      const setY = gsap.quickSetter(core, 'y', 'px');
      const setRotation = gsap.quickSetter(core, 'rotation', 'deg');
      const markerPoint = (progress = 0) => {
        const progressBar = get('.usecases-progress');
        if (!progressBar) return { x: -innerWidth * .415, y: innerHeight * .4 };
        const rect = progressBar.getBoundingClientRect();
        const clampedProgress = gsap.utils.clamp(0, 1, progress);
        return {
          x: rect.left + rect.width * clampedProgress - innerWidth / 2,
          y: rect.top + rect.height / 2 - innerHeight / 2,
        };
      };

      const entryPoint = () => ({ x: -innerWidth * .415, y: innerHeight * .40 });
      const placeUsecaseEntry = (progress) => {
        const start = entryPoint();
        const end = markerPoint(0);
        const eased = gsap.parseEase('power2.inOut')(progress);
        setX(gsap.utils.interpolate(start.x, end.x, eased));
        setY(gsap.utils.interpolate(start.y, end.y, eased));
        setRotation(gsap.utils.interpolate(292, 318, eased));
        gsap.set(core, { autoAlpha: 1, scale: .038 });
      };

      ScrollTrigger.create({
        trigger: usecases,
        start: 'top bottom',
        end: 'top top',
        invalidateOnRefresh: true,
        onEnter: ({ progress }) => placeUsecaseEntry(progress),
        onEnterBack: ({ progress }) => placeUsecaseEntry(progress),
        onUpdate: ({ progress }) => placeUsecaseEntry(progress),
      });

      const usecaseTrigger = ScrollTrigger.create({
        trigger: usecases,
        start: 'top top',
        end: 'bottom bottom',
        invalidateOnRefresh: true,
        onEnter: () => {
          const point = markerPoint(0);
          gsap.set(core, { autoAlpha: 1, scale: .038, x: point.x, y: point.y, rotation: 292 });
        },
        onEnterBack: ({ progress }) => {
          const point = markerPoint(progress);
          gsap.set(core, { autoAlpha: 1, scale: .038, x: point.x, y: point.y, rotation: 292 + progress * 250 });
        },
        onRefresh: ({ progress, isActive }) => {
          if (!isActive) return;
          const point = markerPoint(progress);
          setX(point.x); setY(point.y); setRotation(292 + progress * 250);
        },
        onUpdate: ({ progress, isActive }) => {
          if (!isActive) return;
          const point = markerPoint(progress);
          setX(point.x); setY(point.y); setRotation(292 + progress * 250);
        },
      });

      gsap.delayedCall(.2, () => {
        if (!usecaseTrigger.isActive) return;
        const point = markerPoint(usecaseTrigger.progress);
        gsap.set(core, { autoAlpha: 1, scale: .038, x: point.x, y: point.y, rotation: 292 + usecaseTrigger.progress * 250 });
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: consequences,
          start: 'top bottom',
          end: 'top 12%',
          scrub: storyScrub,
          invalidateOnRefresh: true,
          onEnter: () => root.classList.add('is-closing'),
          onEnterBack: () => root.classList.add('is-closing'),
          onLeaveBack: () => root.classList.remove('is-closing'),
        },
      })
        .to(core, { x: 0, y: 0, scale: expandedScale, autoAlpha: .9, rotation: 382, duration: .78, ease: 'power2.inOut' }, 0)
        .to(shade, { autoAlpha: .05, duration: .68, ease: 'power2.inOut' }, .18)
        .to(rings, { autoAlpha: 0, scale: 1.12, stagger: .04, duration: .46, ease: 'power2.out' }, .22)
        .to(core, { rotation: 405, duration: .22, ease: 'none' }, .78);

      return () => { usecaseTrigger.kill(); root.classList.remove('is-closing'); };
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div className="narrative-energy" ref={ref} aria-hidden="true">
      <div className="narrative-logo"><img src="./images/brand/nutraintel-product-logo.svg" alt="" /></div>
      <div className="narrative-core"><i /><i /><span className="narrative-shade" /><span className="narrative-ring narrative-ring-a" /><span className="narrative-ring narrative-ring-b" /></div>
      <div className="narrative-fracture"><i /><i /><i /><i /><b /></div>
      <div className="narrative-pair">
        <i className="narrative-particle narrative-particle-doctor" />
        <i className="narrative-particle narrative-particle-patient" />
      </div>
    </div>
  );
}
