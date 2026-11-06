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
      // Keep every narrative transition locked to the real scroll position.
      // A numeric scrub adds a small chase animation which feels pleasant with a
      // mouse wheel, but becomes visible as lag when a finger moves slowly.
      const storyScrub = true;
      const consequenceScrub = true;
      const heroFillScale = () => compactMotion ? 1.42 : 4.4;
      const clamp = gsap.utils.clamp;
      const mix = gsap.utils.interpolate;
      const smooth = (start, end, value) => {
        const t = clamp(0, 1, (value - start) / (end - start));
        return t * t * (3 - 2 * t);
      };
      const sampleCurve = (points, value) => {
        const scaled = clamp(0, 1, value) * (points.length - 1);
        const index = Math.min(points.length - 2, Math.floor(scaled));
        const t = scaled - index;
        const p0 = points[Math.max(0, index - 1)];
        const p1 = points[index];
        const p2 = points[index + 1];
        const p3 = points[Math.min(points.length - 1, index + 2)];
        const t2 = t * t;
        const t3 = t2 * t;
        return {
          x: .5 * ((2 * p1.x) + (-p0.x + p2.x) * t + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
          y: .5 * ((2 * p1.y) + (-p0.y + p2.y) * t + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
        };
      };
      let measuredLogo = logoSize();
      const desktopReach = compactMotion ? .54 : .40;
      const doctorPath = [
        { x: .214, y: -.373 }, { x: .29, y: -.29 },
        { x: desktopReach, y: .04 }, { x: desktopReach * .98, y: .70 },
        { x: .24, y: .60 }, { x: .075, y: .20 }, { x: 0, y: 0 },
      ];
      const patientPath = [
        { x: -.224, y: -.253 }, { x: -.30, y: -.20 },
        { x: -desktopReach, y: .09 }, { x: -desktopReach * .98, y: .65 },
        { x: -.24, y: .57 }, { x: -.075, y: .18 }, { x: 0, y: 0 },
      ];
      const renderHero = (progress) => {
        const pathProgress = clamp(0, 1, progress / .57);
        const doctorPoint = sampleCurve(doctorPath, pathProgress);
        const patientPoint = sampleCurve(patientPath, pathProgress);
        const travelScale = mix(.275, .31, smooth(.04, .25, progress));
        const gatherScale = mix(travelScale, .23, smooth(.34, .53, progress));
        const particleScale = mix(gatherScale, .055, smooth(.53, .59, progress));
        const particleAlpha = 1 - smooth(.535, .59, progress);

        gsap.set(doctor, {
          x: doctorPoint.x * measuredLogo,
          y: doctorPoint.y * measuredLogo,
          scale: particleScale,
          rotation: pathProgress * 305,
          autoAlpha: particleAlpha,
        });
        gsap.set(patient, {
          x: patientPoint.x * measuredLogo,
          y: patientPoint.y * measuredLogo,
          scale: particleScale * .94,
          rotation: pathProgress * -305,
          autoAlpha: particleAlpha,
        });

        const logoFade = smooth(.27, .47, progress);
        gsap.set(logo, {
          y: mix(0, -28, logoFade),
          scale: mix(1, .94, logoFade),
          rotation: 0,
          autoAlpha: 1 - logoFade,
        });

        let coreScale = .14;
        let coreAlpha = 0;
        if (progress >= .54 && progress < .62) {
          const t = smooth(.54, .62, progress);
          coreScale = mix(.14, .20, t);
          coreAlpha = mix(0, .62, t);
        } else if (progress >= .62 && progress < .70) {
          const t = smooth(.62, .70, progress);
          coreScale = mix(.20, .48, t);
          coreAlpha = mix(.62, .98, t);
        } else if (progress >= .70 && progress < .84) {
          const t = smooth(.70, .84, progress);
          coreScale = mix(.48, heroFillScale(), t);
          coreAlpha = mix(.98, .96, t);
        } else if (progress >= .84 && progress < .91) {
          coreScale = heroFillScale();
          coreAlpha = .96;
        } else if (progress >= .91) {
          const t = smooth(.91, 1, progress);
          coreScale = mix(heroFillScale(), .18, t);
          coreAlpha = mix(.96, 1, t);
        }
        gsap.set(core, {
          x: 0,
          y: 0,
          scale: coreScale,
          rotation: mix(0, 118, smooth(.55, 1, progress)),
          autoAlpha: coreAlpha,
        });
      };

      // Other section timelines share the same energy sphere. ScrollTrigger
      // evaluates all of them in one update; committing the active hero state
      // at the end of the browser frame prevents an inactive following section
      // from briefly restoring its own starting transform.
      let heroFrame = 0;
      const queueHeroRender = (progress) => {
        if (heroFrame) cancelAnimationFrame(heroFrame);
        heroFrame = requestAnimationFrame(() => {
          heroFrame = 0;
          renderHero(progress);
        });
      };

      const heroTrigger = ScrollTrigger.create({
        trigger: hero,
        start: 'top top',
        end: 'bottom bottom',
        invalidateOnRefresh: true,
        onRefreshInit: () => { measuredLogo = logoSize(); },
        onRefresh: ({ progress, isActive }) => {
          if (isActive || progress === 0) queueHeroRender(progress);
        },
        onUpdate: ({ progress, isActive }) => {
          if (isActive) queueHeroRender(progress);
        },
      });
      renderHero(heroTrigger.progress);

      const splitTimeline = gsap.timeline({
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
        .to(fracture, { autoAlpha: 0, scale: 1.65, rotation: 25, duration: .14, ease: 'power2.in' }, .095)
        .to(core, { autoAlpha: 0, scale: .08, duration: .08, ease: 'power2.in' }, .10)
        .set(pair, { rotation: 0 }, .11)
        .fromTo(doctor, { x: 0, y: 0, scale: .1, autoAlpha: 0 }, { x: () => -Math.min(innerWidth * .39, 620), y: () => innerHeight * .14, scale: 1.06, autoAlpha: 1, duration: .35, ease: 'power2.out', immediateRender: false }, .11)
        .fromTo(patient, { x: 0, y: 0, scale: .1, autoAlpha: 0 }, { x: () => Math.min(innerWidth * .39, 620), y: () => innerHeight * .21, scale: 1.06, autoAlpha: 1, duration: .35, ease: 'power2.out', immediateRender: false }, .11)
        .to(doctor, { x: () => -Math.min(innerWidth * .32, 520), y: () => innerHeight * .28, scale: .88, duration: .48, ease: 'power1.inOut' }, .50)
        .to(patient, { x: () => Math.min(innerWidth * .32, 520), y: () => innerHeight * .28, scale: .88, duration: .48, ease: 'power1.inOut' }, .50);

      // The two expanding rings are a useful desktop accent, but they force a
      // large extra paint on mobile. The fracture itself remains visible.
      if (!compactMotion) {
        splitTimeline
          .to(rings, { autoAlpha: .75, scale: 1.7, stagger: .014, duration: .08, ease: 'power2.out' }, .035)
          .to(rings, { autoAlpha: 0, scale: 2.25, duration: .07, ease: 'power2.in' }, .10);
      }

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

      const consequenceTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: consequences,
          start: 'top bottom',
          end: compactMotion ? 'top -12%' : 'top 12%',
          scrub: consequenceScrub,
          invalidateOnRefresh: true,
          onEnter: () => root.classList.add('is-closing'),
          onEnterBack: () => root.classList.add('is-closing'),
          onLeaveBack: () => root.classList.remove('is-closing'),
        },
      })
        .to(core, { x: 0, y: 0, scale: expandedScale, autoAlpha: .9, rotation: 382, duration: .78, ease: 'sine.inOut' }, 0);
      if (!compactMotion) {
        consequenceTimeline
          .to(shade, { autoAlpha: .05, duration: .68, ease: 'power2.inOut' }, .18)
          .to(rings, { autoAlpha: 0, scale: 1.12, stagger: .04, duration: .46, ease: 'power2.out' }, .22);
      }
      consequenceTimeline.to(core, { rotation: 405, duration: .22, ease: 'none' }, .78);

      return () => {
        if (heroFrame) cancelAnimationFrame(heroFrame);
        heroTrigger.kill();
        usecaseTrigger.kill();
        root.classList.remove('is-closing');
      };
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
