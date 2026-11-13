import { useLanguage } from '../i18n.jsx';

export default function Faq() {
  const { t } = useLanguage();
  const questions = t('faq.items').map(([question, answer]) => ({ question, answer }));
  const title = t('faq.title');
  const titleMatch = title.match(/domande|questions|Fragen/i);
  const titleBefore = titleMatch ? title.slice(0, titleMatch.index) : title;
  const titleFocus = titleMatch?.[0] || '';
  const titleAfter = titleMatch ? title.slice(titleMatch.index + titleMatch[0].length) : '';
  return (
    <section className="faq" id="faq" aria-labelledby="faq-title" data-section="6">
      <header className="faq-head">
        <h2 id="faq-title" data-blur className="t-display">
          {titleBefore}<strong>{titleFocus}</strong>{titleAfter}
        </h2>
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
