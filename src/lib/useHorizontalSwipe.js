import { useLayoutEffect } from 'react';

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export default function useHorizontalSwipe(ref, setStep, slideCount, threshold = 42) {
  useLayoutEffect(() => {
    const section = ref.current;
    if (!section || slideCount < 2 || !matchMedia('(max-width: 720px)').matches) {
      return undefined;
    }

    let startX = 0;
    let startY = 0;
    let gestureAxis = null;
    let consumed = false;

    const reset = () => {
      gestureAxis = null;
      consumed = false;
    };

    const onTouchStart = (event) => {
      const touch = event.touches[0];
      if (!touch) return;
      startX = touch.clientX;
      startY = touch.clientY;
      reset();
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

      // Il gesto verticale resta completamente nativo: nessun preventDefault,
      // nessun salto programmato e nessuna sezione che possa intrappolare lo scroll.
      if (gestureAxis !== 'horizontal') return;

      event.preventDefault();
      if (consumed || distanceX < threshold) return;

      const direction = deltaX < 0 ? 1 : -1;
      setStep((current) => clamp(current + direction, 0, slideCount - 1));
      consumed = true;
    };

    section.addEventListener('touchstart', onTouchStart, { passive: true });
    section.addEventListener('touchmove', onTouchMove, { passive: false });
    section.addEventListener('touchend', reset, { passive: true });
    section.addEventListener('touchcancel', reset, { passive: true });

    return () => {
      section.removeEventListener('touchstart', onTouchStart);
      section.removeEventListener('touchmove', onTouchMove);
      section.removeEventListener('touchend', reset);
      section.removeEventListener('touchcancel', reset);
    };
  }, [ref, setStep, slideCount, threshold]);
}
