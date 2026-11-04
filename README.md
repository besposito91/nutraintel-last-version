# NutraIntel — landing narrativa

Landing React + Vite costruita intorno a un unico filo visivo: professionista e paziente nascono come due particelle, diventano una relazione, si separano davanti alle difficoltà e tornano a connettersi grazie all’ecosistema NutraIntel.

## Struttura

1. Hero: due particelle orbitano e si fondono.
2. Problemi: la relazione si spezza in due sfere.
3. Soluzione: le sfere si ricongiungono e introducono bilancia, portale e app.
4. Use case: una sola sfera accompagna i sei flussi causa-effetto.
5. Conseguenze: la sfera si espande e racchiude la relazione tra professionista e paziente.
6. Call to action e modulo early adopter.

## Avvio

```bash
npm ci
npm run dev
npm run build
npm run preview
```

## Configurazione

- `VITE_VIDEO_URL`: URL embed del video.
- `VITE_FORM_ENDPOINT`: endpoint POST JSON del modulo.

Le figure umane distribuite dal sito sono WebP trasparenti in `public-site/images/cutouts/`. La cartella `public/images/` conserva soltanto le sorgenti di lavorazione e non entra nella build. I mockup e i messaggi sono elementi HTML modificabili in `Workflow.jsx`.

Prima della pubblicazione restano da collegare il video, l’endpoint del modulo e l’informativa privacy definitiva.
