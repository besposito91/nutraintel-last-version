import BlurText from './BlurText.jsx';

const problems = [
  {
    n: '01', label: 'Dati frammentati',
    title: 'Dove sono finite le ultime misurazioni?',
    text: 'Un valore in chat, un’analisi in una mail, un appunto da riportare alla visita. Quando le informazioni vivono in luoghi diversi, ricostruire il percorso richiede tempo.',
    visual: <div className="pr-data" aria-hidden="true"><span>CHAT <b>72,4 kg</b></span><span>EMAIL <b>Analisi.pdf</b></span><span>APPUNTI <b>−1,8 kg</b></span></div>,
  },
  {
    n: '02', label: 'Distanza',
    title: 'Il paziente si sente seguito anche dopo la visita?',
    text: 'Dubbi, giornate difficili e piccoli progressi accadono tra un incontro e l’altro. Senza un punto di riferimento, il paziente può sentirsi solo proprio quando il percorso prende forma.',
    visual: <div className="pr-distance" aria-hidden="true"><span>ULTIMA VISITA</span><i /><strong>14 giorni</strong><i /><span>PROSSIMO INCONTRO</span><b>Sto andando nella direzione giusta?</b></div>,
  },
  {
    n: '03', label: 'Segnali mancanti',
    title: 'E se ciò che manca emergesse troppo tardi?',
    text: 'Una misurazione saltata, un documento non aggiornato, un’abitudine che cambia. Senza continuità, alcuni segnali diventano visibili solo al controllo successivo.',
    visual: <div className="pr-signals" aria-hidden="true"><span><i />Misurazioni aggiornate</span><span className="missing"><i />Nessun dato da 14 giorni</span><span><i />Prossimo follow-up</span></div>,
  },
];

export default function ProblemStory() {
  return (
    <section className="problems split-problems" id="problema" aria-labelledby="problem-title" data-section="1">
      <div className="mesh mesh-soft" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="grain" aria-hidden="true" />
      <header className="problems-head">
        <span className="problems-kicker" data-fade>Il filo si spezza</span>
        <BlurText as="h2" id="problem-title" data-blur className="t-display" text="Quando informazioni e relazione si separano, il percorso perde continuità." />
        <p data-fade>La quotidianità del paziente continua. Ma senza un filo tra dati, professionista e persona, una parte importante del percorso rischia di restare invisibile.</p>
      </header>
      <div className="problems-list">
        {problems.map((item) => (
          <article className="problem-card" key={item.n} data-fade>
            <div className="problem-card-top"><span>{item.n}</span><small>{item.label}</small></div>
            <h3>{item.title}</h3><p>{item.text}</p>
            <div className="problem-card-visual">{item.visual}</div>
          </article>
        ))}
      </div>
      <div className="problems-answer" data-fade>
        <span>La risposta NutraIntel</span>
        <h3>Rimettere in connessione il percorso.</h3>
        <p>Quando i due punti si ritrovano, dati e relazione tornano a muoversi insieme.</p>
        <a href="#monitoraggio" className="arrow-link">Guarda la connessione <span>↓</span></a>
      </div>
    </section>
  );
}
