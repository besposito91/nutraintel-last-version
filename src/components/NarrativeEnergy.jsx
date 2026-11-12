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
    // Keep the established desktop choreography untouched. The lighter,
    // finger-locked renderer is used only by the actual mobile layout.
    const compactMotion = matchMedia('(max-width: 720px)').matches;
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
      const linear = (start, end, value) => clamp(0, 1, (value - start) / (end - start));
      const cubicPoint = (start, controlA, controlB, end, value) => {
        const t = clamp(0, 1, value);
        const inverse = 1 - t;
        return {
          x: inverse ** 3 * start.x + 3 * inverse * inverse * t * controlA.x + 3 * inverse * t * t * controlB.x + t ** 3 * end.x,
          y: inverse ** 3 * start.y + 3 * inverse * inverse * t * controlA.y + 3 * inverse * t * t * controlB.y + t ** 3 * end.y,
        };
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
      // Touch input benefits from a longer gesture, while the desktop wheel
      // needs a shorter, denser opening. Keeping the two timing maps separate
      // avoids slowing down the desktop animation without changing mobile.
      const heroPhases = compactMotion ? {
        pathEnd: .57,
        travelStart: .04, travelEnd: .25,
        gatherStart: .34, gatherEnd: .53,
        fadeStart: .53, fadeEnd: .59,
        logoStart: .27, logoEnd: .47,
        coreStart: .54, coreIntroEnd: .62,
        coreGrowEnd: .70, coreFillEnd: .84, coreHoldEnd: .91,
        rotationStart: .55,
      } : {
        pathEnd: .37,
        travelStart: .025, travelEnd: .13,
        gatherStart: .16, gatherEnd: .32,
        fadeStart: .31, fadeEnd: .38,
        logoStart: .14, logoEnd: .31,
        coreStart: .34, coreIntroEnd: .40,
        coreGrowEnd: .47, coreFillEnd: .62, coreHoldEnd: .82,
        rotationStart: .35,
      };

      // ScrollTrigger already runs its updates on the browser animation frame.
      // On mobile, quick setters avoid rebuilding GSAP tweens for every tiny
      // touch delta and keep all writes limited to compositor-only properties.
      const mobileSet = compactMotion ? {
        doctorX: gsap.quickSetter(doctor, 'x', 'px'),
        doctorY: gsap.quickSetter(doctor, 'y', 'px'),
        doctorScale: gsap.quickSetter(doctor, 'scale'),
        doctorOpacity: gsap.quickSetter(doctor, 'opacity'),
        patientX: gsap.quickSetter(patient, 'x', 'px'),
        patientY: gsap.quickSetter(patient, 'y', 'px'),
        patientScale: gsap.quickSetter(patient, 'scale'),
        patientOpacity: gsap.quickSetter(patient, 'opacity'),
        logoY: gsap.quickSetter(logo, 'y', 'px'),
        logoScale: gsap.quickSetter(logo, 'scale'),
        logoOpacity: gsap.quickSetter(logo, 'opacity'),
        coreScale: gsap.quickSetter(core, 'scale'),
        coreOpacity: gsap.quickSetter(core, 'opacity'),
      } : null;
      if (compactMotion) core.style.visibility = 'visible';

      const renderHero = (progress) => {
        /*
         * Mobile uses a deliberately lighter path. Two quadratic arcs replace
         * the seven-point spline and the sphere grows in one continuous pass.
         * This keeps the visual story intact while making slow finger scrolling
         * track the gesture without the former frame-to-frame jumps.
         */
        if (compactMotion) {
          const pathProgress = linear(.015, .405, progress);
          const doctorStart = { x: .214, y: -.373 };
          const patientStart = { x: -.224, y: -.253 };
          const doctorPoint = cubicPoint(doctorStart, { x: .42, y: -.08 }, { x: .46, y: .55 }, { x: 0, y: 0 }, pathProgress);
          const patientPoint = cubicPoint(patientStart, { x: -.43, y: -.02 }, { x: -.45, y: .53 }, { x: 0, y: 0 }, pathProgress);
          const particleGrowth = linear(.04, .20, progress);
          const particleMerge = linear(.30, .415, progress);
          const particleScale = mix(mix(.275, .315, particleGrowth), .055, particleMerge);
          const particleAlpha = 1 - linear(.355, .425, progress);

          mobileSet.doctorX(doctorPoint.x * measuredLogo);
          mobileSet.doctorY(doctorPoint.y * measuredLogo);
          mobileSet.doctorScale(particleScale);
          mobileSet.doctorOpacity(particleAlpha);
          mobileSet.patientX(patientPoint.x * measuredLogo);
          mobileSet.patientY(patientPoint.y * measuredLogo);
          mobileSet.patientScale(particleScale * .94);
          mobileSet.patientOpacity(particleAlpha);

          const logoFade = linear(.14, .34, progress);
          mobileSet.logoY(mix(0, -18, logoFade));
          mobileSet.logoScale(mix(1, .965, logoFade));
          mobileSet.logoOpacity(1 - logoFade);

          const coreIntro = linear(.335, .445, progress);
          const coreFill = linear(.425, .61, progress);
          // The filled sphere now stays stable, then closes in a shorter
          // continuous interval. This removes the long, slow "rubber" phase.
          const coreExit = linear(.90, .992, progress);
          const introScale = mix(.12, .42, coreIntro);
          const filledScale = mix(introScale, heroFillScale(), coreFill);
          mobileSet.coreScale(mix(filledScale, .18, coreExit));
          mobileSet.coreOpacity(mix(coreIntro, 1, coreFill));
          return;
        }

        const pathProgress = clamp(0, 1, progress / heroPhases.pathEnd);
        const doctorPoint = sampleCurve(doctorPath, pathProgress);
        const patientPoint = sampleCurve(patientPath, pathProgress);
        const travelScale = mix(.275, .31, smooth(heroPhases.travelStart, heroPhases.travelEnd, progress));
        const gatherScale = mix(travelScale, .23, smooth(heroPhases.gatherStart, heroPhases.gatherEnd, progress));
        const particleScale = mix(gatherScale, .055, smooth(heroPhases.fadeStart, heroPhases.fadeEnd, progress));
        const particleAlpha = 1 - smooth(heroPhases.fadeStart + .005, heroPhases.fadeEnd, progress);

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

        const logoFade = smooth(heroPhases.logoStart, heroPhases.logoEnd, progress);
        gsap.set(logo, {
          y: mix(0, -28, logoFade),
          scale: mix(1, .94, logoFade),
          rotation: 0,
          autoAlpha: 1 - logoFade,
        });

        let coreScale = .14;
        let coreAlpha = 0;
        if (progress >= heroPhases.coreStart && progress < heroPhases.coreIntroEnd) {
          const t = smooth(heroPhases.coreStart, heroPhases.coreIntroEnd, progress);
          coreScale = mix(.14, .20, t);
          coreAlpha = mix(0, .62, t);
        } else if (progress >= heroPhases.coreIntroEnd && progress < heroPhases.coreGrowEnd) {
          const t = smooth(heroPhases.coreIntroEnd, heroPhases.coreGrowEnd, progress);
          coreScale = mix(.20, .48, t);
          coreAlpha = mix(.62, .98, t);
        } else if (progress >= heroPhases.coreGrowEnd && progress < heroPhases.coreFillEnd) {
          const t = smooth(heroPhases.coreGrowEnd, heroPhases.coreFillEnd, progress);
          coreScale = mix(.48, heroFillScale(), t);
          coreAlpha = mix(.98, .96, t);
        } else if (progress >= heroPhases.coreFillEnd && progress < heroPhases.coreHoldEnd) {
          coreScale = heroFillScale();
          coreAlpha = .96;
        } else if (progress >= heroPhases.coreHoldEnd) {
          const t = smooth(heroPhases.coreHoldEnd, 1, progress);
          coreScale = mix(heroFillScale(), .18, t);
          coreAlpha = mix(.96, 1, t);
        }
        gsap.set(core, {
          x: 0,
          y: 0,
          scale: coreScale,
          rotation: mix(0, 118, smooth(heroPhases.rotationStart, 1, progress)),
          autoAlpha: coreAlpha,
        });
      };

      // Other section timelines share the same energy sphere. ScrollTrigger
      // evaluates all of them in one update; committing the active hero state
      // at the end of the browser frame prevents an inactive following section
      // from briefly restoring its own starting transform.
      let heroFrame = 0;
      let pendingHeroProgress = 0;
      const queueHeroRender = (progress) => {
        pendingHeroProgress = progress;
        if (heroFrame) return;
        heroFrame = requestAnimationFrame(() => {
          heroFrame = 0;
          renderHero(pendingHeroProgress);
        });
      };
      // Batch both wheel and touch updates into a single paint. Calling
      // gsap.set() directly for every touchmove event can produce several
      // transform writes inside the same frame on mobile browsers.
      // ScrollTrigger is already frame-synchronised. Rendering directly on
      // phones removes the extra one-frame delay that was perceptible while
      // dragging slowly; desktop retains its existing batching behaviour.
      const commitHeroRender = compactMotion ? renderHero : queueHeroRender;

      const heroTrigger = ScrollTrigger.create({
        trigger: hero,
        start: 'top top',
        end: 'bottom bottom',
        invalidateOnRefresh: true,
        onRefreshInit: () => { measuredLogo = logoSize(); },
        onRefresh: ({ progress, isActive }) => {
          if (compactMotion) {
            if (isActive || window.scrollY <= 1) commitHeroRender(progress);
            return;
          }
          const rect = hero.getBoundingClientRect();
          if (isActive || rect.bottom > 0) commitHeroRender(progress);
        },
        onUpdate: ({ progress, isActive }) => {
          if (compactMotion) {
            if (isActive) commitHeroRender(progress);
            return;
          }
          const rect = hero.getBoundingClientRect();
          if (isActive || (rect.top >= -1 && rect.top < innerHeight)) commitHeroRender(progress);
        },
      });
      if (hero.getBoundingClientRect().bottom > 0) renderHero(heroTrigger.progress);

      const splitTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: problems,
          start: 'top bottom',
          // Complete the mobile break sooner; the previous 82vh-long split
          // made the response feel delayed even though it was scroll-linked.
          end: compactMotion ? 'top 52%' : 'bottom bottom',
          scrub: storyScrub,
          invalidateOnRefresh: true,
          onEnter: () => { orbit.pause(); gsap.set(pair, { rotation: 0 }); },
          onLeaveBack: () => { orbit.pause(); gsap.set(pair, { rotation: 0 }); },
        },
      });

      if (compactMotion) {
        splitTimeline
          .to(core, { autoAlpha: .96, scale: .20, rotation: 0, duration: .16, ease: 'none' }, 0)
          .to(core, { autoAlpha: 0, scale: .09, duration: .12, ease: 'none' }, .15)
          .set(pair, { rotation: 0 }, .19)
          .fromTo(doctor, { x: 0, y: 0, scale: .10, autoAlpha: 0 }, { x: () => -innerWidth * .34, y: () => innerHeight * .23, scale: .76, autoAlpha: 1, duration: .66, ease: 'none', immediateRender: false }, .19)
          .fromTo(patient, { x: 0, y: 0, scale: .10, autoAlpha: 0 }, { x: () => innerWidth * .34, y: () => innerHeight * .25, scale: .76, autoAlpha: 1, duration: .66, ease: 'none', immediateRender: false }, .19);
      } else {
        splitTimeline
          .to(core, { autoAlpha: 1, scale: .22, rotation: 132, duration: .05 }, 0)
          .fromTo(fracture, { autoAlpha: 0, scale: .45, rotation: -16 }, { autoAlpha: 1, scale: 1.05, rotation: 8, duration: .09, ease: 'power3.out', immediateRender: false }, .025)
          .to(fracture, { autoAlpha: 0, scale: 1.65, rotation: 25, duration: .14, ease: 'power2.in' }, .095)
          .to(core, { autoAlpha: 0, scale: .08, duration: .08, ease: 'power2.in' }, .10)
          .set(pair, { rotation: 0 }, .11)
          .fromTo(doctor, { x: 0, y: 0, scale: .1, autoAlpha: 0 }, { x: () => -Math.min(innerWidth * .39, 620), y: () => innerHeight * .14, scale: 1.06, autoAlpha: 1, duration: .35, ease: 'power2.out', immediateRender: false }, .11)
          .fromTo(patient, { x: 0, y: 0, scale: .1, autoAlpha: 0 }, { x: () => Math.min(innerWidth * .39, 620), y: () => innerHeight * .21, scale: 1.06, autoAlpha: 1, duration: .35, ease: 'power2.out', immediateRender: false }, .11)
          .to(doctor, { x: () => -Math.min(innerWidth * .32, 520), y: () => innerHeight * .28, scale: .88, duration: .48, ease: 'power1.inOut' }, .50)
          .to(patient, { x: () => Math.min(innerWidth * .32, 520), y: () => innerHeight * .28, scale: .88, duration: .48, ease: 'power1.inOut' }, .50)
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

      const solutionTimeline = gsap.timeline({
        scrollTrigger: { trigger: solution, start: 'top bottom', end: 'top top', scrub: storyScrub, invalidateOnRefresh: true },
      })
        .to(particles, { x: 0, y: 0, scale: .68, duration: .09, ease: 'power2.inOut' }, 0)
        .to(core, { autoAlpha: 1, scale: .17, rotation: 160, duration: .07, ease: 'power2.out' }, .045)
        .set(particles, { autoAlpha: 0, scale: .06 }, .075)
        .to(core, { scale: ecosystemScale, autoAlpha: .16, rotation: 215, duration: .18, ease: 'power3.out' }, .08)
        .to(core, { scale: ecosystemScale, autoAlpha: .14, rotation: 246, duration: .74, ease: 'none' }, .26);

      const setX = gsap.quickSetter(core, 'x', 'px');
      const setY = gsap.quickSetter(core, 'y', 'px');
      const setRotation = gsap.quickSetter(core, 'rotation', 'deg');
      const setScale = gsap.quickSetter(core, 'scale');
      const setOpacity = gsap.quickSetter(core, 'opacity');
      const usecasePoint = () => ({
        x: 0,
        y: innerHeight * (compactMotion ? .1 : .12),
      });
      const usecaseSphereScale = () => compactMotion ? .075 : .05;
      const usecaseSphereOpacity = .36;

      const placeUsecaseEntry = (progress) => {
        const end = usecasePoint();
        const eased = gsap.parseEase('power2.inOut')(progress);
        setX(0);
        setY(gsap.utils.interpolate(0, end.y, eased));
        setRotation(gsap.utils.interpolate(246, 305, eased));
        setScale(gsap.utils.interpolate(ecosystemScale(), usecaseSphereScale(), eased));
        setOpacity(gsap.utils.interpolate(.14, usecaseSphereOpacity, eased));
        core.style.visibility = 'inherit';
      };

      const usecaseEntryTrigger = ScrollTrigger.create({
        trigger: usecases,
        start: 'top bottom',
        end: 'top top',
        invalidateOnRefresh: true,
        onEnter: ({ progress }) => placeUsecaseEntry(progress),
        onEnterBack: ({ progress }) => placeUsecaseEntry(progress),
        onUpdate: ({ progress, isActive }) => {
          if (isActive) placeUsecaseEntry(progress);
        },
      });

      const usecaseTrigger = ScrollTrigger.create({
        trigger: usecases,
        // The sphere is already animated continuously by usecaseEntryTrigger
        // while the use-case section crosses the viewport.  Activate the
        // steady slide state only after that transition has fully completed;
        // otherwise this trigger would force the final small scale halfway
        // through the movement and create a visible jump in both directions.
        start: 'top top',
        end: 'bottom 50%',
        invalidateOnRefresh: true,
        onEnter: () => {
          const point = usecasePoint();
          gsap.set(core, { autoAlpha: usecaseSphereOpacity, scale: usecaseSphereScale(), x: point.x, y: point.y, rotation: 305 });
        },
        onEnterBack: () => {
          const point = usecasePoint();
          gsap.set(core, { autoAlpha: usecaseSphereOpacity, scale: usecaseSphereScale(), x: point.x, y: point.y, rotation: 305 });
        },
        onRefresh: ({ isActive }) => {
          const rect = usecases.getBoundingClientRect();
          if (!isActive && !(rect.top <= 1 && rect.bottom > 0)) return;
          const point = usecasePoint();
          setX(point.x); setY(point.y); setRotation(305);
          setScale(usecaseSphereScale()); setOpacity(usecaseSphereOpacity); core.style.visibility = 'inherit';
        },
      });

      const initialMarkerCall = gsap.delayedCall(.2, () => {
        const rect = usecases.getBoundingClientRect();
        if (!usecaseTrigger.isActive && !(rect.top <= 1 && rect.bottom > 0)) return;
        const point = usecasePoint();
        gsap.set(core, { autoAlpha: usecaseSphereOpacity, scale: usecaseSphereScale(), x: point.x, y: point.y, rotation: 305 });
      });

      const restoreUsecaseSphere = () => {
        const point = usecasePoint();
        gsap.set([logo, fracture], { autoAlpha: 0 });
        gsap.set(particles, { autoAlpha: 0 });
        gsap.set(core, {
          x: point.x,
          y: point.y,
          scale: usecaseSphereScale(),
          autoAlpha: usecaseSphereOpacity,
          rotation: 305,
        });
      };
      
      const consequenceTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: consequences,
          start: 'top bottom',
          end: compactMotion ? 'top 10%' : 'top 12%',
          scrub: consequenceScrub,
          invalidateOnRefresh: true,
      
          onEnter: () => {
            root.classList.add('is-closing');
            consequenceTimeline.invalidate();
          },
      
          onEnterBack: () => {
            root.classList.add('is-closing');
          },
      
          onLeaveBack: () => {
            root.classList.remove('is-closing');
            restoreUsecaseSphere();
          },
        },
      })
        .fromTo(
          core,
          {
            x: () => usecasePoint().x,
            y: () => usecasePoint().y,
            scale: () => usecaseSphereScale(),
            autoAlpha: usecaseSphereOpacity,
            rotation: 305,
          },
          {
            x: 0,
            y: 0,
            scale: expandedScale,
            autoAlpha: 0.9,
            rotation: 382,
            duration: 0.78,
            ease: 'sine.inOut',
            immediateRender: false,
          },
          0
        );
      if (!compactMotion) {
        consequenceTimeline
          .to(shade, { autoAlpha: .05, duration: .68, ease: 'power2.inOut' }, .18)
          .to(rings, { autoAlpha: 0, scale: 1.12, stagger: .04, duration: .46, ease: 'power2.out' }, .22);
      }
      consequenceTimeline.to(core, { rotation: 405, duration: .22, ease: 'none' }, .78);

      /*
       * A browser refresh can restore the scroll position before images,
       * fonts and ScrollTrigger have finished measuring the document. Since
       * every chapter controls the same fixed sphere, the last refresh
       * callback used to win even when it belonged to a section above the
       * viewport. Reconcile the visual state from the current chapter after
       * all triggers have refreshed instead of relying on callback order.
       */
      const applyTimelineAtScroll = (timeline) => {
        const progress = timeline.scrollTrigger?.progress ?? 0;
        timeline.invalidate().progress(progress, true);
      };

      const reconcileNarrativeState = () => {
        measuredLogo = logoSize();

        const consequenceRect = consequences.getBoundingClientRect();
        const consequenceProgress = consequenceTimeline.scrollTrigger?.progress ?? 0;
        if (consequenceProgress > 0 || consequenceRect.top < innerHeight * .98) {
          root.classList.add('is-closing');
          gsap.set([logo, fracture], { autoAlpha: 0 });
          gsap.set(particles, { autoAlpha: 0 });
          applyTimelineAtScroll(consequenceTimeline);
          return;
        }

        root.classList.remove('is-closing');
        const usecaseRect = usecases.getBoundingClientRect();
        // Leave a small boundary tolerance: fractional viewport pixels can
        // otherwise make the following section appear "visible" while the
        // ecosystem still occupies the whole screen after a hash refresh.
        if (usecaseRect.top < innerHeight * .95 && usecaseRect.bottom > innerHeight * .05) {
          gsap.set([logo, fracture], { autoAlpha: 0 });
          gsap.set(particles, { autoAlpha: 0 });
          if (usecaseEntryTrigger.progress < 1 && usecaseRect.top > 0) {
            placeUsecaseEntry(usecaseEntryTrigger.progress);
          } else {
            restoreUsecaseSphere();
          }
          return;
        }

        const solutionRect = solution.getBoundingClientRect();
        const solutionProgress = solutionTimeline.scrollTrigger?.progress ?? 0;
        if (solutionProgress > 0 || solutionRect.top < innerHeight) {
          gsap.set([logo, fracture], { autoAlpha: 0 });
          applyTimelineAtScroll(solutionTimeline);
          return;
        }

        const problemRect = problems.getBoundingClientRect();
        const problemProgress = splitTimeline.scrollTrigger?.progress ?? 0;
        if (problemProgress > 0 || problemRect.top < innerHeight) {
          gsap.set(logo, { autoAlpha: 0 });
          applyTimelineAtScroll(splitTimeline);
          return;
        }

        renderHero(heroTrigger.progress);
      };

      let reconcileFrame = 0;
      let settleFrame = 0;
      const scheduleReconcile = () => {
        if (reconcileFrame) cancelAnimationFrame(reconcileFrame);
        if (settleFrame) cancelAnimationFrame(settleFrame);
        reconcileFrame = requestAnimationFrame(() => {
          reconcileFrame = 0;
          // The second frame lets restored scroll position and the visual
          // viewport settle before reading section bounds.
          settleFrame = requestAnimationFrame(() => {
            settleFrame = 0;
            reconcileNarrativeState();
          });
        });
      };
      const reconcileWhenVisible = () => {
        if (document.visibilityState === 'visible') scheduleReconcile();
      };

      ScrollTrigger.addEventListener('refresh', scheduleReconcile);
      window.addEventListener('pageshow', scheduleReconcile);
      window.addEventListener('load', scheduleReconcile);
      window.addEventListener('hashchange', scheduleReconcile);
      window.addEventListener('popstate', scheduleReconcile);
      document.addEventListener('visibilitychange', reconcileWhenVisible);
      scheduleReconcile();

      return () => {
        if (heroFrame) cancelAnimationFrame(heroFrame);
        if (reconcileFrame) cancelAnimationFrame(reconcileFrame);
        if (settleFrame) cancelAnimationFrame(settleFrame);
        initialMarkerCall.kill();
        heroTrigger.kill();
        usecaseEntryTrigger.kill();
        usecaseTrigger.kill();
        ScrollTrigger.removeEventListener('refresh', scheduleReconcile);
        window.removeEventListener('pageshow', scheduleReconcile);
        window.removeEventListener('load', scheduleReconcile);
        window.removeEventListener('hashchange', scheduleReconcile);
        window.removeEventListener('popstate', scheduleReconcile);
        document.removeEventListener('visibilitychange', reconcileWhenVisible);
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
