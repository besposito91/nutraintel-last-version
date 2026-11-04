export default function HumanCutout({ src, alt = '', className = '', eager = false }) {
  return (
    <span className={`human-cutout ${className}`}>
      <img className="human-photo" src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />
    </span>
  );
}
