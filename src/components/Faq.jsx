import BlurText from './BlurText.jsx';
import { useLanguage } from '../i18n.jsx';

export default function Faq() {
  const { t } = useLanguage();
  const questions = t('faq.items').map(([question, answer]) => ({ question, answer }));
  return (
    <section className="faq" id="faq" aria-labelledby="faq-title" data-section="6">
      <header className="faq-head">
        <BlurText as="h2" id="faq-title" data-blur className="t-display" text={t('faq.title')} />
      </header>
      <div className="faq-list">
        {questions.map((item) => (
          <details className="faq-item" key={item.question} data-fade>
            <summary><span>{item.question}</span><i aria-hidden="true" /></summary>
            <div className="faq-answer"><p>{item.answer}</p></div>
          </details>
        ))}
      </div>
    </section>
  );
}
