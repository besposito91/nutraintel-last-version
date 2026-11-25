import { useLayoutEffect } from 'react';

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export default function useSlideGestureSnap(ref, slideCount, startOffset = 0) {
  useLayoutEffect(() => {
    const section = ref.current;
    if (!section || slideCount < 2) return undefined;

    let locked = false;
    let unlockTimer = 0;
    let touchStartX = 0;
    let touchStartY = 0;
    let touchConsumed = false;

    const offset = () => (
      typeof startOffset === 'function' ? startOffset() : startOffset
    );

    const metrics = () => {
      const rect = section.getBoundingClientRect();
      const pageTop = window.scrollY + rect.top;
      const start = pageTop - offset();
      const end = pageTop + section.offsetHeight - window.innerHeight;
      const range = Math.max(1, end - start);
      const progress = clamp((window.scrollY - start) / range, 0, 1);
      const step = clamp(Math.floor(progress * slideCount), 0, slideCount - 1);
      const active = window.scrollY >= start - 3 && window.scrollY <= end + 3;
      return { start, end, range, step, active };
    };

    const scheduleUnlock = (delay = 650) => {
      window.clearTimeout(unlockTimer);
      unlockTimer = window.setTimeout(() => {
        locked = false;
      }, delay);
    };

    const move = (direction) => {
      const state = metrics();
      if (!state.active) return false;

      if (locked) {
        scheduleUnlock(220);
        return true;
      }

      locked = true;
      scheduleUnlock();

      const next = state.step + direction;
      let target;

      if (next < 0) {
        target = state.start - window.innerHeight * .9;
      } else if (next >= slideCount) {
        target = state.end + window.innerHeight * .9;
      } else {
        // Il centro di ogni intervallo evita soste a cavallo tra due slide.
        target = state.start + state.range * ((next + .5) / slideCount);
      }

      window.dispatchEvent(new CustomEvent('nutraintel:scroll-to', {
        detail: { target },
      }));
      return true;
    };

    const blockGesture = (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
    };

    const onWheel = (event) => {
      if (Math.abs(event.deltaY) < 2 || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      if (!move(Math.sign(event.deltaY))) return;
      blockGesture(event);
    };

    const onTouchStart = (event) => {
      const touch = event.touches[0];
      if (!touch) return;
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      touchConsumed = false;
    };

    const onTouchMove = (event) => {
      const touch = event.touches[0];
      if (!touch) return;

      if (touchConsumed) {
        blockGesture(event);
        return;
      }

      const deltaX = touch.clientX - touchStartX;
      const deltaY = touch.clientY - touchStartY;
      if (Math.abs(deltaY) < 42 || Math.abs(deltaY) <= Math.abs(deltaX) * 1.15) return;

      // Il dito sale per avanzare, scende per tornare alla slide precedente.
      if (!move(deltaY < 0 ? 1 : -1)) return;
      touchConsumed = true;
      blockGesture(event);
    };

    const onTouchEnd = () => {
      touchConsumed = false;
      if (locked) scheduleUnlock();
    };

    window.addEventListener('wheel', onWheel, { passive: false, capture: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true, capture: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false, capture: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true, capture: true });
    window.addEventListener('touchcancel', onTouchEnd, { passive: true, capture: true });

    return () => {
      window.clearTimeout(unlockTimer);
      window.removeEventListener('wheel', onWheel, true);
      window.removeEventListener('touchstart', onTouchStart, true);
      window.removeEventListener('touchmove', onTouchMove, true);
      window.removeEventListener('touchend', onTouchEnd, true);
      window.removeEventListener('touchcancel', onTouchEnd, true);
    };
  }, [ref, slideCount, startOffset]);
}
