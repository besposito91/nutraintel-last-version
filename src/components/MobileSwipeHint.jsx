export default function MobileSwipeHint({ visible, label, current, total }) {
  return (
    <div
      className={`mobile-swipe-hint ${visible ? 'is-visible' : ''}`}
      role="status"
      aria-live="polite"
      aria-hidden={!visible}
    >
      <span className="mobile-swipe-hint-icon" aria-hidden="true">↔</span>
      <span>{label}</span>
      <small>{current}/{total}</small>
    </div>
  );
}
