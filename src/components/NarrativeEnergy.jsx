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
    const pair = root.querySelector('.narrative-pair');
    const doctor = root.querySelector('.narrative-particle-doctor');
    const patient = root.querySelector('.narrative-particle-patient');
    const particles = [doctor, patient];
    const rings = root.querySelectorAll('.narrative-ring');
    const shade = root.querySelector('.narrative-shade');
    const fracture = root.querySelector('.narrative-fracture');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      gsap.set(core, { xPercent: -50, yPercent: -50, x: 0, y: 0, scale: .14, rotation: 0, autoAlpha: 0 });
      gsap.set(pair, { xPercent: -50, yPercent: -50, rotation: 0, autoAlpha: 1 });
      gsap.set(doctor, { x: -78, y: 0, scale: .29, autoAlpha: 1, force3D: true });
      gsap.set(patient, { x: 78, y: 0, scale: .29, autoAlpha: 1, force3D: true });
      gsap.set(rings, { scale: .5, autoAlpha: 0 });
      gsap.set(shade, { autoAlpha: 0 });
      gsap.set(fracture, { xPercent: -50, yPercent: -50, scale: .45, rotation: -16, autoAlpha: 0 });

      if (reduced) {
        gsap.set(particles, { autoAlpha: 0 });
        gsap.set(core, { autoAlpha: .24, scale: 1, x: 0, y: 0 });
        return;
      }

      const orbit = gsap.to(pair, { rotation: 360, duration: 7.5, repeat: -1, ease: 'none' });

      gsap.timeline({
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom bottom', scrub: true, invalidateOnRefresh: true },
      })
        .to(doctor, { x: -13, y: -4, scale: .25, duration: .16, ease: 'power2.inOut' }, .04)
        .to(patient, { x: 13, y: 4, scale: .25, duration: .16, ease: 'power2.inOut' }, .04)
        .to(core, { autoAlpha: .58, scale: .18, duration: .14, ease: 'power2.out' }, .11)
        .to(particles, { x: 0, y: 0, scale: .06, autoAlpha: 0, duration: .1, ease: 'power2.in' }, .18)
        .to(core, { scale: .48, rotation: 24, duration: .24, ease: 'power2.inOut' }, .23)
        .to(core, { scale: 4.4, autoAlpha: .96, rotation: 78, duration: .28, ease: 'power2.inOut' }, .43)
        .to(core, { scale: 4.4, autoAlpha: .96, rotation: 96, duration: .24, ease: 'none' }, .56)
        .to(core, { scale: .18, autoAlpha: 1, rotation: 118, duration: .2, ease: 'power2.inOut' }, .80);

      gsap.timeline({
        scrollTrigger: {
          trigger: problems,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true,
          invalidateOnRefresh: true,
          onEnter: () => { orbit.pause(); gsap.set(pair, { rotation: 0 }); },
          onLeaveBack: () => orbit.resume(),
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

      gsap.timeline({
        scrollTrigger: { trigger: solution, start: 'top bottom', end: 'bottom bottom', scrub: true, invalidateOnRefresh: true },
      })
        .to(particles, { x: 0, y: 0, scale: .68, duration: .16, ease: 'power2.inOut' }, 0)
        .to(core, { autoAlpha: 1, scale: .17, rotation: 160, duration: .12, ease: 'power2.out' }, .11)
        .to(particles, { autoAlpha: 0, scale: .06, duration: .08, ease: 'power2.in' }, .15)
        .to(core, { scale: .92, autoAlpha: .18, rotation: 215, duration: .42, ease: 'power2.inOut' }, .23)
        .to(core, { scale: .98, autoAlpha: .14, rotation: 246, duration: .2, ease: 'none' }, .65)
        .to(core, { x: () => -innerWidth * .415, y: () => innerHeight * .40, scale: .038, autoAlpha: 1, rotation: 292, duration: .2, ease: 'power2.inOut' }, .80);

      const setX = gsap.quickSetter(core, 'x', 'px');
      const setY = gsap.quickSetter(core, 'y', 'px');
      const setRotation = gsap.quickSetter(core, 'rotation', 'deg');
      const markerPoint = (progress = 0) => {
        const progressBar = get('.usecases-progress');
        if (!progressBar) return { x: -innerWidth * .415, y: innerHeight * .4 };
        const rect = progressBar.getBoundingClientRect();
        const travel = Math.max(0, rect.width - rect.width / 6);
        return {
          x: rect.left + rect.width / 12 + travel * progress - innerWidth / 2,
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

      const expandedScale = () => {
        const coreDiameter = Math.min(Math.max(innerWidth, innerHeight) * .7, 1020);
        return (Math.hypot(innerWidth, innerHeight) / coreDiameter) * 1.12;
      };

      gsap.timeline({
        scrollTrigger: { trigger: consequences, start: 'top bottom', end: 'top 12%', scrub: true, invalidateOnRefresh: true },
      })
        .to(core, { x: 0, y: 0, scale: expandedScale, autoAlpha: .96, rotation: 382, duration: .78, ease: 'power2.inOut' }, 0)
        .to(shade, { autoAlpha: .06, duration: .68, ease: 'power2.inOut' }, .18)
        .to(rings, { autoAlpha: 0, scale: 1.12, stagger: .04, duration: .46, ease: 'power2.out' }, .22)
        .to(core, { rotation: 405, duration: .22, ease: 'none' }, .78);

      return () => usecaseTrigger.kill();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div className="narrative-energy" ref={ref} aria-hidden="true">
      <div className="narrative-core"><i /><i /><span className="narrative-shade" /><span className="narrative-ring narrative-ring-a" /><span className="narrative-ring narrative-ring-b" /></div>
      <div className="narrative-fracture"><i /><i /><i /><i /><b /></div>
      <div className="narrative-pair">
        <i className="narrative-particle narrative-particle-doctor" />
        <i className="narrative-particle narrative-particle-patient" />
      </div>
    </div>
  );
}
