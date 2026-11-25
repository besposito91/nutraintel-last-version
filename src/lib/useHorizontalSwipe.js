import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
let activeMobileGate = null;

export default function useHorizontalSwipe(
  ref,
  step,
  setStep,
  slideCount,
  {
    threshold = 42,
    lockUntilComplete = false,
    navOffset = 54,
  } = {},
) {
  const [locked, setLockedState] = useState(false);
  const lockedRef = useRef(false);
  const stepRef = useRef(step);
  const releaseRef = useRef(() => undefined);

  useEffect(() => {
    stepRef.current = step;

    // L'ultima schermata conclude il percorso e riabilita subito lo scroll
    // verticale. Il gesto successivo prosegue verso la sezione seguente.
    if (lockUntilComplete && step >= slideCount - 1 && lockedRef.current) {
      releaseRef.current();
    }
  }, [lockUntilComplete, slideCount, step]);

  useLayoutEffect(() => {
    const section = ref.current;
    const mobileViewport = matchMedia('(max-width: 720px)').matches;
    if (!section || slideCount < 2 || !mobileViewport) return undefined;

    let startX = 0;
    let startY = 0;
    let gestureAxis = null;
    let consumed = false;
    let lastScrollY = window.scrollY;
    let lockScrollY = 0;
    let scrollFrame = 0;
    let pageStyle = null;

    const freezePage = () => {
      const root = document.documentElement;
      const body = document.body;
      lockScrollY = Math.max(0, sectionTop());
      window.scrollTo(0, lockScrollY);

      pageStyle = {
        rootOverflow: root.style.overflow,
        rootOverscroll: root.style.overscrollBehavior,
        bodyOverflow: body.style.overflow,
      };

      root.style.overflow = 'hidden';
      root.style.overscrollBehavior = 'none';
      body.style.overflow = 'hidden';
    };

    const unfreezePage = () => {
      if (!pageStyle) return;
      const root = document.documentElement;
      const body = document.body;
      const restoreY = lockScrollY;

      root.style.overflow = pageStyle.rootOverflow;
      root.style.overscrollBehavior = pageStyle.rootOverscroll;
      body.style.overflow = pageStyle.bodyOverflow;
      pageStyle = null;
      window.scrollTo(0, restoreY);
    };

    const setLocked = (value) => {
      lockedRef.current = value;
      setLockedState(value);
      section.classList.toggle('is-carousel-locked', value);
      if (value) activeMobileGate = section;
      else if (activeMobileGate === section) activeMobileGate = null;
    };

    const release = () => {
      const wasLocked = lockedRef.current;
      setLocked(false);
      if (wasLocked) unfreezePage();
    };
    releaseRef.current = release;

    const sectionTop = () => (
      section.getBoundingClientRect().top + window.scrollY - navOffset
    );

    const engage = () => {
      if (
        !lockUntilComplete
        || lockedRef.current
        || (activeMobileGate && activeMobileGate !== section)
        || stepRef.current >= slideCount - 1
      ) return;

      setLocked(true);
      freezePage();
    };

    const resetGesture = () => {
      gestureAxis = null;
      consumed = false;
    };

    const sectionIsInFocus = () => {
      const rect = section.getBoundingClientRect();
      return (
        rect.top < window.innerHeight * .55
        && rect.bottom > window.innerHeight * .45
      );
    };

    const onTouchStart = (event) => {
      const touch = event.touches[0];
      if (!touch) return;
      startX = touch.clientX;
      startY = touch.clientY;
      gestureAxis = null;
      consumed = false;
    };

    const onTouchMove = (event) => {
      const touch = event.touches[0];
      if (!touch) return;

      const deltaX = touch.clientX - startX;
      const deltaY = touch.clientY - startY;
      const distanceX = Math.abs(deltaX);
      const distanceY = Math.abs(deltaY);

      if (!gestureAxis && Math.max(distanceX, distanceY) >= 10) {
        gestureAxis = distanceX > distanceY * 1.08 ? 'horizontal' : 'vertical';
      }

      const direction = deltaX < 0 ? 1 : -1;

      if (lockUntilComplete) {
        if (!lockedRef.current) {
          const canRewind = (
            gestureAxis === 'horizontal'
            && direction < 0
            && stepRef.current === slideCount - 1
            && sectionIsInFocus()
          );
          if (!canRewind) return;
        }

        // Durante la sequenza nessun gesto verticale puo' trascinare la pagina.
        // Sull'ultima slide uno swipe inverso riaggancia il carosello.
        event.preventDefault();
        if (gestureAxis !== 'horizontal' || consumed || distanceX < threshold) return;
      } else {
        if (gestureAxis !== 'horizontal') return;
        event.preventDefault();
        if (consumed || distanceX < threshold) return;
      }

      const current = stepRef.current;
      const next = clamp(current + direction, 0, slideCount - 1);
      if (next === current) {
        consumed = true;
        return;
      }

      stepRef.current = next;
      setStep(next);

      if (lockUntilComplete && !lockedRef.current && next < slideCount - 1) {
        engage();
      }
      consumed = true;
    };

    const onWheel = (event) => {
      if (!lockedRef.current) return;
      event.preventDefault();
    };

    const onScroll = () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        const currentY = window.scrollY;
        const direction = currentY - lastScrollY;
        const rect = section.getBoundingClientRect();
        const targetY = sectionTop();

        if (lockedRef.current) {
          lastScrollY = lockScrollY;
          return;
        }

        // Dopo essere risaliti completamente sopra la sezione, prepariamo la
        // sequenza per una futura visita senza ostacolare lo scroll all'indietro.
        if (rect.top > window.innerHeight * .9 && direction < 0) {
          if (stepRef.current !== 0) {
            stepRef.current = 0;
            setStep(0);
          }
        }

        // Il blocco scatta solo entrando dall'alto e quando il pannello occupa
        // ormai il viewport. Anche uno swipe verticale veloce viene ricondotto
        // al bordo esatto della sezione, evitando di saltarla.
        if (
          lockUntilComplete
          && direction > 0
          && stepRef.current < slideCount - 1
          && currentY >= targetY - 56
          && lastScrollY < targetY
        ) {
          engage();
        }

        lastScrollY = window.scrollY;
      });
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', resetGesture, { passive: true });
    window.addEventListener('touchcancel', resetGesture, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scroll', onScroll, { passive: true });

    onScroll();

    return () => {
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
      releaseRef.current = () => undefined;
      release();
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', resetGesture);
      window.removeEventListener('touchcancel', resetGesture);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', onScroll);
    };
  }, [lockUntilComplete, navOffset, ref, setStep, slideCount, threshold]);

  return locked;
}
