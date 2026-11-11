import BlurText from './BlurText.jsx';
import HumanCutout from './HumanCutout.jsx';
import { useLanguage } from '../i18n.jsx';

export default function Consequences() {
  const { t } = useLanguage();

  return (
    <section
      className="consequences"
      id="impatto"
      aria-labelledby="consequences-title"
      data-section="4"
    >
      <header className="consequences-head">
        <BlurText
          as="h2"
          id="consequences-title"
          data-blur
          className="t-display"
          text={t('impact.title')}
        />
      </header>

      <div className="consequence-columns">
        <article className="consequence-card consequence-professional" data-fade>
          <div className="consequence-image">
            <HumanCutout
              src="./images/cutouts/nutritionist-computer.webp"
              alt={t('impact.professionalAlt')}
            />
          </div>

          <div className="consequence-copy">
            <span className="consequence-eyebrow">
              {t('impact.professionalEyebrow')}
            </span>
            <h3>
              <strong>{t('impact.professionalStrong')}</strong>
              <span>{t('impact.professionalRest')}</span>
            </h3>
          </div>
        </article>

        <article className="consequence-card consequence-patient" data-fade>
          <div className="consequence-image">
            <HumanCutout
              src="./images/cutouts/patient.webp"
              alt={t('impact.patientAlt')}
            />
          </div>

          <div className="consequence-copy">
            <span className="consequence-eyebrow">
              {t('impact.patientEyebrow')}
            </span>
            <h3>
              <strong>{t('impact.patientStrong')}</strong>
              <span>{t('impact.patientRest')}</span>
            </h3>
          </div>
        </article>
      </div>
    </section>
  );
}
