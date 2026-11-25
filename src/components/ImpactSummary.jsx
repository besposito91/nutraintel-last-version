import { useLanguage } from '../i18n.jsx';

export default function ImpactSummary() {
  const { t } = useLanguage();

  return (
    <section
      className="impact-summary"
      id="impact-summary"
      aria-label={t('impact.titleHighlight')}
    >
      <p className="consequences-summary">
        {t('impact.summaryBefore')}
        <strong>{t('impact.summaryEmphasis')}</strong>
      </p>
    </section>
  );
}
