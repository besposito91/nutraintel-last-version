import BlurText from './BlurText.jsx';

const questions = [
  {
    question: 'In che modo NutraIntel può aiutarmi a gestire più pazienti in modo semplice ed efficiente?',
    answer: 'NutraIntel ti permette di avere le informazioni dei tuoi pazienti a portata di mano, in un unico ambiente. Puoi consultare le misurazioni, visualizzare lo storico e seguire l’andamento dei percorsi anche a distanza, riducendo la necessità di recuperare continuamente dati da fonti differenti e semplificando il lavoro quotidiano.',
  },
  {
    question: 'Come funziona concretamente il collegamento tra la bilancia, l’app del paziente e il mio portale?',
    answer: 'La bilancia intelligente si collega tramite Bluetooth all’app del paziente, che raccoglie le misurazioni e altre informazioni relative al percorso. I dati vengono resi disponibili nel portale NutraIntel, dove puoi consultarli, visualizzarne lo storico e seguirne l’andamento nel tempo, anche tra una visita e l’altra.',
  },
  {
    question: 'Devo acquistare una bilancia intelligente per utilizzare NutraIntel?',
    answer: 'La bilancia smart fa parte dell’ecosistema NutraIntel e permette di raccogliere le misurazioni del paziente. Le modalità di utilizzo e le eventuali configurazioni disponibili saranno illustrate in occasione del lancio.',
  },
  {
    question: 'NutraIntel mi aiuta a capire se un paziente sta perdendo motivazione e smette di seguire attivamente il percorso?',
    answer: 'NutraIntel ti aiuta a individuare possibili segnali di discontinuità, ad esempio quando un paziente non effettua misurazioni per un periodo prolungato o non fornisce i documenti richiesti. Attraverso gli avvisi sul portale, puoi accorgerti di queste situazioni e valutare se intervenire per comprendere le difficoltà del paziente e aiutarlo a ritrovare continuità nel percorso.',
  },
  {
    question: 'Posso già utilizzare NutraIntel nel mio studio?',
    answer: 'NutraIntel è attualmente in fase di pre-lancio. Lascia i tuoi contatti per ricevere aggiornamenti sulla disponibilità del prodotto e scoprire come potrà integrarsi nella tua attività professionale.',
  },
];

export default function Faq() {
  return (
    <section className="faq" id="faq" aria-labelledby="faq-title" data-section="6">
      <header className="faq-head">
        <BlurText as="h2" id="faq-title" data-blur className="t-display" text="Le domande più frequenti." />
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
