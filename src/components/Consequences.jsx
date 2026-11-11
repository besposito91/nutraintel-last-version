import BlurText from './BlurText.jsx';
import HumanCutout from './HumanCutout.jsx';
import { useLanguage } from '../i18n.jsx';

function ImpactLines({ strong, rest }) {
  const lines = `${strong} ${rest}`
    .split('.')
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <h3>
      {lines.map((line, index) => (
        <span className={index === 0 ? 'is-strong' : ''} key={line}>
          {line}{index === lines.length - 1 ? '.' : ''}
        </span>
      ))}
    </h3>
  );
}

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
            <ImpactLines
              strong={t('impact.professionalStrong')}
              rest={t('impact.professionalRest')}
            />
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
            <ImpactLines
              strong={t('impact.patientStrong')}
              rest={t('impact.patientRest')}
            />
          </div>
        </article>
      </div>
    </section>
  );
}
