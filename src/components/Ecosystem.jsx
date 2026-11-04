import { Phone, ScreenTrend, Laptop } from './Phone.jsx';
import BlurText from './BlurText.jsx';

function ScaleTile() {
  return <div className="tile-scale"><div><small>72.4</small><b>kg</b></div></div>;
}

const cards = [
  { t: 'Portale professionale', v: <div className="tile-lap"><Laptop /></div> },
  { t: 'App per il paziente', v: <div className="tile-phone"><Phone><ScreenTrend /></Phone></div> },
  { t: 'Bilancia connessa', v: <ScaleTile /> },
];

export default function Ecosystem() {
  return (
    <section className="eco" id="ecosistema" aria-labelledby="eco-title" data-section="2">
      <div className="eco-head">
        <BlurText as="h2" id="eco-title" data-blur className="t-h2" text="Dal dato al follow-up, in un unico ecosistema." />
        <p data-fade>NutraIntel collega portale professionale, app per il paziente e bilancia connessa in un unico ecosistema digitale, per rendere disponibili le misurazioni e supportare il follow-up a distanza.</p>
      </div>
      <div className="eco-cards">
        {cards.map((c, i) => (
          <figure key={c.t} className="eco-card" data-parallax={[-40, 30, 90][i]}>
            <div className="eco-tile">{c.v}</div>
            <figcaption>{c.t}</figcaption>
          </figure>
        ))}
      </div>
      <div className="eco-foot" data-fade>
        <p>Vuoi vederlo in azione? Guarda il video.</p>
        <a className="btn btn-line sm" href="#video">Guarda il video</a>
      </div>
    </section>
  );
}
