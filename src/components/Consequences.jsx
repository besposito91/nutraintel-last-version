import BlurText from './BlurText.jsx';
import HumanCutout from './HumanCutout.jsx';
import { useLanguage } from '../i18n.jsx';

export default function Consequences() {
  const { t } = useLanguage();
  return (
    <section className="consequences" id="impatto" aria-labelledby="consequences-title" data-section="4">
      <header className="consequences-head">
        <BlurText as="h2" id="consequences-title" data-blur className="t-display" text={t('impact.title')} />
      </header>
      <div className="consequence-rows">
        <article className="consequence-row consequence-professional" data-fade>
          <div className="consequence-copy"><h3><strong>{t('impact.professionalStrong')}</strong> {t('impact.professionalRest')}</h3></div>
          <HumanCutout src="./images/cutouts/nutritionist-computer.webp" alt={t('impact.professionalAlt')} />
        </article>
        <article className="consequence-row consequence-patient" data-fade>
          <HumanCutout src="./images/cutouts/patient.webp" alt={t('impact.patientAlt')} />
          <div className="consequence-copy"><h3><strong>{t('impact.patientStrong')}</strong> {t('impact.patientRest')}</h3></div>
        </article>
      </div>
    </section>
  );
}
