import { useLayoutEffect } from 'react';

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

/**
 * Ferma una sola volta la pagina quando il centro della sezione raggiunge il
 * centro del viewport. Il gesto che ha portato alla sezione viene assorbito;
 * il gesto verticale successivo rilascia la pagina nella stessa direzione.
 */
export default function useSectionAttentionPause(ref) {
  useLayoutEffect(() => {
    const section = ref.current;
    if (!section) return undefined;

    let hasPaused = false;
    let locked = false;
    let readyForRelease = false;
    let previousScrollY = window.scrollY;
    let previousCenter = section.getBoundingClientRect().top
      + section.getBoundingClientRect().height / 2;
    let releaseNotBefore = 0;
    let lastBlockedInput = 0;
    let armTimer = 0;
    let touchStartX = 0;
    let touchStartY = 0;
    let touchTracking = false;

    const sectionTarget = () => {
      const rect = section.getBoundingClientRect();
      const pageTop = window.scrollY + rect.top;
      const documentEnd = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      return clamp(
        pageTop + rect.height / 2 - window.innerHeight / 2,
        0,
        documentEnd,
      );
    };

    const dispatchScroll = (target) => {
      window.dispatchEvent(new CustomEvent('nutraintel:scroll-to', {
        detail: { target },
      }));
    };

    const scheduleArm = () => {
      window.clearTimeout(armTimer);
      const now = performance.now();
      const waitForSettle = Math.max(0, releaseNotBefore - now);
      const waitForQuiet = Math.max(0, 220 - (now - lastBlockedInput));
      armTimer = window.setTimeout(() => {
        if (!locked) return;
        const currentTime = performance.now();
        if (currentTime < releaseNotBefore || currentTime - lastBlockedInput < 210) {
          scheduleArm();
          return;
        }
        readyForRelease = true;
      }, Math.max(waitForSettle, waitForQuiet, 16));
    };

    const activate = () => {
      if (hasPaused) return;
      hasPaused = true;
      locked = true;
      readyForRelease = false;
      lastBlockedInput = performance.now();
      releaseNotBefore = lastBlockedInput + 760;
      section.dataset.attentionPaused = 'true';
      dispatchScroll(sectionTarget());
      scheduleArm();
    };

    const release = (direction) => {
      if (!locked || !readyForRelease) return;
      locked = false;
      readyForRelease = false;
      touchTracking = false;
      window.clearTimeout(armTimer);
      delete section.dataset.attentionPaused;

      const focusTarget = sectionTarget();
      const travel = Math.min(window.innerHeight * .62, 620);
      const documentEnd = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const target = clamp(focusTarget + direction * travel, 0, documentEnd);
      dispatchScroll(target);
    };

    const block = (event) => {
      if (event.cancelable) event.preventDefault();
      event.stopImmediatePropagation();
    };

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const currentScrollY = window.scrollY;
      const direction = Math.sign(currentScrollY - previousScrollY);

      if (!hasPaused) {
        const crossedGoingDown = direction > 0
          && previousCenter > viewportCenter
          && center <= viewportCenter;
        const crossedGoingUp = direction < 0
          && previousCenter < viewportCenter
          && center >= viewportCenter;
        if (crossedGoingDown || crossedGoingUp) activate();
      }

      previousCenter = center;
      previousScrollY = currentScrollY;
    };

    const onWheel = (event) => {
      if (!locked) return;
      block(event);

      if (!readyForRelease) {
        lastBlockedInput = performance.now();
        scheduleArm();
        return;
      }

      if (Math.abs(event.deltaY) < 3 || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      release(Math.sign(event.deltaY));
    };

    const onTouchStart = (event) => {
      if (!locked) return;
      const touch = event.touches[0];
      if (!touch) return;
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      touchTracking = true;
    };

    const onTouchMove = (event) => {
      if (!locked) return;
      block(event);

      if (!readyForRelease || !touchTracking) {
        lastBlockedInput = performance.now();
        scheduleArm();
        return;
      }

      const touch = event.touches[0];
      if (!touch) return;
      const deltaX = touch.clientX - touchStartX;
      const deltaY = touch.clientY - touchStartY;
      if (Math.abs(deltaY) < 44 || Math.abs(deltaY) <= Math.abs(deltaX) * 1.12) return;

      // Il dito che sale prosegue verso il basso nella pagina.
      release(deltaY < 0 ? 1 : -1);
    };

    const onTouchEnd = () => {
      touchTracking = false;
      if (locked && !readyForRelease) scheduleArm();
    };

    const initialCheck = window.requestAnimationFrame(() => {
      const rect = section.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      if (Math.abs(center - window.innerHeight / 2) <= window.innerHeight * .08) activate();
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: false, capture: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true, capture: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false, capture: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true, capture: true });
    window.addEventListener('touchcancel', onTouchEnd, { passive: true, capture: true });

    return () => {
      window.cancelAnimationFrame(initialCheck);
      window.clearTimeout(armTimer);
      delete section.dataset.attentionPaused;
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', onWheel, true);
      window.removeEventListener('touchstart', onTouchStart, true);
      window.removeEventListener('touchmove', onTouchMove, true);
      window.removeEventListener('touchend', onTouchEnd, true);
      window.removeEventListener('touchcancel', onTouchEnd, true);
    };
  }, [ref]);
}
