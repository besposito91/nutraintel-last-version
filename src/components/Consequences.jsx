import BlurText from './BlurText.jsx';
import HumanCutout from './HumanCutout.jsx';

export default function Consequences() {
  return (
    <section className="consequences" id="impatto" aria-labelledby="consequences-title" data-section="4">
      <header className="consequences-head">
        <BlurText as="h2" id="consequences-title" data-blur className="t-display" text="Una relazione continua per un percorso nutrizionale più consapevole." />
      </header>
      <div className="consequence-rows">
        <article className="consequence-row consequence-professional" data-fade>
          <div className="consequence-copy"><h3><strong>Più segnali.</strong> Più contesto. Più continuità.</h3></div>
          <HumanCutout src="./images/cutouts/nutritionist-computer.webp" alt="Un nutrizionista consulta al computer le informazioni del paziente." />
        </article>
        <article className="consequence-row consequence-patient" data-fade>
          <HumanCutout src="./images/cutouts/patient.webp" alt="Una paziente consulta il proprio percorso sullo smartphone." />
          <div className="consequence-copy"><h3><strong>Più presenza.</strong> Più consapevolezza. Più partecipazione.</h3></div>
        </article>
      </div>
    </section>
  );
}
