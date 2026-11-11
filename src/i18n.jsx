import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const messages = {
  it: {
    meta: { title: 'NutraIntel · Pre-lancio', description: 'NutraIntel collega portale professionale, app per il paziente e bilancia connessa in un unico ecosistema digitale.' },
    nav: { challenge: 'La sfida', solution: 'La soluzione', usecases: 'Cosa fa NutraIntel', video: 'Video', faq: 'FAQ', cta: 'Diventa early adopter', aria: 'Navigazione NutraIntel', sections: 'Sezioni', home: 'NutraIntel - torna all’inizio', skip: 'Vai al contenuto' },
    hero: { tag: 'Il follow-up, oltre la visita', title: 'La nutrizione evolve. La relazione con il paziente anche.', titleLine1: 'La nutrizione evolve.', titleHighlight: 'La relazione con il paziente', titleTail: 'anche.', subtitle: 'Vai oltre la visita: coinvolgi i tuoi pazienti giorno dopo giorno e segui l’andamento del percorso nutrizionale, con tutte le informazioni a portata di mano.', cta: 'Diventa early adopter', discover: 'Scopri NutraIntel', scroll: 'Scorri per scoprire' },
    challenge: {
      kicker: 'Il filo si spezza', title: 'Quando informazioni e relazione si separano, il percorso perde continuità.', intro: 'La quotidianità del paziente continua. Ma senza un filo tra dati, professionista e persona, una parte importante del percorso rischia di restare invisibile.',
      cards: [
        { title: 'Dove sono finite le ultime misurazioni?', text: 'Un valore in chat, un’analisi in una mail, un appunto da riportare alla visita. Quando le informazioni vivono in luoghi diversi, ricostruire il percorso richiede tempo.', alt: 'Una paziente effettua una misurazione a casa.' },
        { title: 'Il paziente si sente seguito anche dopo la visita?', text: 'Dubbi, giornate difficili e piccoli progressi accadono tra un incontro e l’altro. Senza un punto di riferimento, il paziente può sentirsi solo proprio quando il percorso prende forma.', alt: 'Un paziente consulta lo smartphone tra una visita e l’altra.' },
        { title: 'E se ciò che manca emergesse troppo tardi?', text: 'Una misurazione saltata, un documento non aggiornato, un’abitudine che cambia. Senza continuità, alcuni segnali diventano visibili solo al controllo successivo.', alt: 'Un paziente fotografa un documento con lo smartphone.' },
      ],
      answerKicker: 'La risposta NutraIntel', answerTitle: 'Rimettere in connessione il percorso.', answerText: 'Quando i due punti si ritrovano, dati e relazione tornano a muoversi insieme.', answerLink: 'Guarda la connessione',
    },
    ecosystem: { stages: [
      { title: 'Bilancia connessa', text: 'Il paziente effettua le misurazioni attraverso la bilancia intelligente.' },
      { title: 'Portale professionale', text: 'Il professionista monitora i dati del paziente e organizza il suo lavoro.' },
      { title: 'App paziente', text: 'Il paziente visualizza le proprie misurazioni, segue l’andamento dei dati nel tempo e aggiorna le sue abitudini.' },
    ] },
    usecases: {
      cases: [
        { title: 'Ogni misurazione racconta un progresso.', description: 'Il dato registrato dal paziente diventa subito parte del percorso seguito dal professionista.' },
        { title: 'Anche un’assenza può diventare un segnale.', description: 'Il professionista individua l’interruzione e riapre il contatto con il paziente.' },
        { title: 'Il prossimo incontro è già parte del percorso.', description: 'L’appuntamento fissato dal portale arriva al paziente con le stesse informazioni.' },
        { title: 'Le informazioni importanti non vanno perse.', description: 'Il documento caricato dal paziente è disponibile al professionista nel suo spazio di lavoro.' },
        { title: 'Il progresso diventa incoraggiamento.', description: 'Il professionista legge l’andamento e restituisce al paziente una presenza concreta.' },
        { title: 'Anche la quotidianità entra nel percorso.', description: 'Una foto del diario alimentare diventa un’informazione organizzata e consultabile.' },
      ],
      professionalAlt: 'Il professionista consulta il percorso del paziente.', patientAlt: 'Il paziente partecipa al proprio percorso nutrizionale.',
      panels: {
        weightApp: ['Dato del peso', 'Misurazione sincronizzata'], weightReceived: ['Peso ricevuto', 'Adesso'], missingAlert: ['Alert mancata pesata', 'giorni', 'Nessuna nuova misurazione'], professionalMessage: ['Come sta andando?', 'È da qualche giorno che non ricevo nuove misurazioni.'], setAppointment: ['Fissa appuntamento', 'NOV', 'Ore 16:30 · Conferma'], newAppointment: ['14 novembre', 'Visita nutrizionale'], uploadDocument: ['Carica documento', 'Caricamento completato ✓'], documentReceived: ['Documento ricevuto', 'Associato al paziente'], trendPortal: ['Grafico andamento', '−1,8 kg dall’inizio'], keepGoing: ['Continua così!', 'I dati mostrano che stai andando nella direzione giusta.'], foodPhoto: ['Diario alimentare', 'Foto del pranzo · oggi'], foodTable: ['Diario alimentare', 'Pranzo', 'Oggi · 13:05', 'Verdure e cereali', 'Foto ricevuta', 'Nota', 'Porzione completa'],
      },
    },
    impact: { title: 'Una relazione continua per un percorso nutrizionale più consapevole.', professionalEyebrow: 'Per il professionista', professionalStrong: 'Più segnali.', professionalRest: 'Più contesto. Più continuità.', patientEyebrow: 'Per il paziente', patientStrong: 'Più presenza.', patientRest: 'Più consapevolezza. Più partecipazione.', professionalAlt: 'Un nutrizionista consulta al computer le informazioni del paziente.', patientAlt: 'Una paziente consulta il proprio percorso sullo smartphone.' },
    video: { title: 'Guarda come NutraIntel rimette in connessione il percorso.', iframe: 'Video NutraIntel', play: 'Riproduci il video NutraIntel', missing: 'Collega il link o l’embed del video per attivarlo', label: 'Video di presentazione' },
    faq: { title: 'Le domande più frequenti.', items: [
      ['A chi è rivolto NutraIntel?', 'NutraIntel è pensato per studi associati, centri di nutrizione clinica e strutture specializzate nella gestione dell’obesità e delle patologie metaboliche, che desiderano seguire i propri pazienti con maggiore continuità, anche tra una visita e l’altra. Si rivolge anche a nutrizionisti, dietisti e dietologi che vogliono monitorare i progressi dei pazienti, favorirne il coinvolgimento e valorizzare il proprio servizio professionale attraverso un ecosistema digitale integrato.'],
      ['In che modo NutraIntel può aiutarmi a gestire più pazienti in modo semplice ed efficiente?', 'NutraIntel ti permette di avere le informazioni dei tuoi pazienti a portata di mano, in un unico ambiente. Puoi consultare le misurazioni, visualizzare lo storico e seguire l’andamento dei percorsi anche a distanza, riducendo la necessità di recuperare continuamente dati da fonti differenti e semplificando il lavoro quotidiano.'],
      ['Come funziona concretamente il collegamento tra la bilancia, l’app del paziente e il mio portale?', 'La bilancia intelligente si collega tramite Bluetooth all’app del paziente, che raccoglie le misurazioni e altre informazioni relative al percorso. I dati vengono resi disponibili nel portale NutraIntel, dove puoi consultarli, visualizzarne lo storico e seguirne l’andamento nel tempo, anche tra una visita e l’altra.'],
      ['Devo acquistare una bilancia intelligente per utilizzare NutraIntel?', 'La bilancia smart fa parte dell’ecosistema NutraIntel e permette di raccogliere le misurazioni del paziente. Le modalità di utilizzo e le eventuali configurazioni disponibili saranno illustrate in occasione del lancio.'],
      ['NutraIntel mi aiuta a capire se un paziente sta perdendo motivazione e smette di seguire attivamente il percorso?', 'NutraIntel ti aiuta a individuare possibili segnali di discontinuità, ad esempio quando un paziente non effettua misurazioni per un periodo prolungato o non fornisce i documenti richiesti. Attraverso gli avvisi sul portale, puoi accorgerti di queste situazioni e valutare se intervenire per comprendere le difficoltà del paziente e aiutarlo a ritrovare continuità nel percorso.'],
      ['Posso già utilizzare NutraIntel nel mio studio?', 'NutraIntel è attualmente in fase di pre-lancio. Lascia i tuoi contatti per ricevere aggiornamenti sulla disponibilità del prodotto e scoprire come potrà integrarsi nella tua attività professionale.'],
    ] },
    pre: { title: 'Porta il follow-up oltre la visita, prima degli altri.', kicker: 'Accesso in anteprima', cardTitle: 'Non aspettare che il futuro della nutrizione diventi lo standard.', cardText: 'Entra nella community dei professionisti interessati a un percorso più continuo, partecipato e connesso.', hooks: [['Sii tra i primi', 'a scoprire NutraIntel.'], ['Accedi alle novità', 'e alle opportunità del lancio.'], ['Resta aggiornato', 'senza alcun impegno.']], interest: 'Manifestazione di interesse', formTitle: 'Voglio essere tra i primi', name: 'Nome e cognome *', email: 'Email *', phone: 'Telefono *', profession: 'Professione / struttura', privacy: 'Ho letto l’informativa privacy e acconsento al trattamento dei dati per la gestione della mia richiesta. *', marketing: 'Acconsento a ricevere comunicazioni di aggiornamento e marketing relative a NutraIntel.', submit: 'Richiedi l’accesso in anteprima', note: 'Inserire qui il link all’informativa privacy definitiva prima della pubblicazione.', sending: 'Invio in corso…', ready: 'Modulo pronto: collega prima un endpoint CRM/form reale per attivare l’invio.', success: 'Grazie. La tua richiesta è stata registrata.', error: 'Invio non riuscito. Riprova o contattaci direttamente.' },
    footer: { back: 'Torna su', instagram: 'NutraIntel su Instagram', copyright: '© 2026 NutraIntel · Pre-lancio' },
    mockup: { patients: 'Pazienti', measurements: 'Misurazioni', alerts: 'Avvisi', analyses: 'Analisi', professionalPortal: 'Portale professionale', activePatients: 'PAZIENTI ATTIVI', measurementsToday: 'MISURAZIONI OGGI', trend: 'ANDAMENTO', days30: '30 GIORNI', goal: 'Obiettivo del percorso', onTrack: 'In linea con il piano' },
  },
  en: {
    meta: { title: 'NutraIntel · Early access', description: 'NutraIntel connects the professional portal, patient app and connected scale in one digital ecosystem.' },
    nav: { challenge: 'The challenge', solution: 'The solution', usecases: 'What NutraIntel does', video: 'Video', faq: 'FAQ', cta: 'Become an early adopter', aria: 'NutraIntel navigation', sections: 'Sections', home: 'NutraIntel - back to top', skip: 'Skip to content' },
    hero: { tag: 'Follow-up beyond the appointment', title: 'Nutrition evolves. So does the relationship with the patient.', titleLine1: 'Nutrition evolves.', titleHighlight: 'The relationship with the patient', titleTail: 'evolves too.', subtitle: 'Go beyond the appointment: engage your patients day by day and follow the progress of their nutrition journey, with all the information at your fingertips.', cta: 'Become an early adopter', discover: 'Discover NutraIntel', scroll: 'Scroll to discover' },
    challenge: { kicker: 'The connection breaks', title: 'When information and relationships separate, the journey loses continuity.', intro: 'The patient’s daily life continues. But without a connection between data, professional and person, an important part of the journey can remain invisible.', cards: [
      { title: 'Where did the latest measurements go?', text: 'A value in a chat, a report in an email, a note to bring to the next appointment. When information lives in different places, rebuilding the journey takes time.', alt: 'A patient takes a measurement at home.' },
      { title: 'Does the patient still feel supported after the appointment?', text: 'Questions, difficult days and small achievements happen between appointments. Without a point of reference, patients may feel alone just when their journey is taking shape.', alt: 'A patient checks a smartphone between appointments.' },
      { title: 'What if missing information emerged too late?', text: 'A skipped measurement, an outdated document, a changing habit. Without continuity, some signals only become visible at the next check-up.', alt: 'A patient photographs a document with a smartphone.' },
    ], answerKicker: 'The NutraIntel answer', answerTitle: 'Reconnect the journey.', answerText: 'When the two points meet again, data and relationships start moving together.', answerLink: 'See the connection' },
    ecosystem: { stages: [
      { title: 'Connected scale', text: 'The patient takes measurements using the smart scale.' },
      { title: 'Professional portal', text: 'The professional monitors patient data and organises their work.' },
      { title: 'Patient app', text: 'The patient views measurements, follows trends over time and updates daily habits.' },
    ] },
    usecases: { cases: [
      { title: 'Every measurement tells a story of progress.', description: 'Data recorded by the patient immediately becomes part of the journey followed by the professional.' },
      { title: 'Even an absence can become a signal.', description: 'The professional identifies the interruption and reopens communication with the patient.' },
      { title: 'The next appointment is already part of the journey.', description: 'An appointment set in the portal reaches the patient with the same information.' },
      { title: 'Important information should never be lost.', description: 'A document uploaded by the patient is available in the professional workspace.' },
      { title: 'Progress becomes encouragement.', description: 'The professional reads the trend and gives the patient a tangible sense of support.' },
      { title: 'Everyday life becomes part of the journey.', description: 'A food diary photo becomes organised, accessible information.' },
    ], professionalAlt: 'The professional reviews the patient journey.', patientAlt: 'The patient actively participates in the nutrition journey.', panels: { weightApp: ['Weight data', 'Measurement synced'], weightReceived: ['Weight received', 'Now'], missingAlert: ['Missed weigh-in alert', 'days', 'No new measurement'], professionalMessage: ['How is it going?', 'I have not received any new measurements for a few days.'], setAppointment: ['Schedule appointment', 'NOV', '4:30 PM · Confirm'], newAppointment: ['14 November', 'Nutrition appointment'], uploadDocument: ['Upload document', 'Upload complete ✓'], documentReceived: ['Document received', 'Linked to patient'], trendPortal: ['Progress chart', '−1.8 kg since the start'], keepGoing: ['Keep it up!', 'The data shows that you are moving in the right direction.'], foodPhoto: ['Food diary', 'Lunch photo · today'], foodTable: ['Food diary', 'Lunch', 'Today · 1:05 PM', 'Vegetables and grains', 'Photo received', 'Note', 'Full portion'] } },
    impact: { title: 'An ongoing relationship for a more informed nutrition journey.', professionalEyebrow: 'For the professional', professionalStrong: 'More signals.', professionalRest: 'More context. More continuity.', patientEyebrow: 'For the patient', patientStrong: 'More presence.', patientRest: 'More awareness. More participation.', professionalAlt: 'A nutritionist reviews patient information on a computer.', patientAlt: 'A patient views the journey on a smartphone.' },
    video: { title: 'See how NutraIntel reconnects the journey.', iframe: 'NutraIntel video', play: 'Play the NutraIntel video', missing: 'Add the video link or embed to activate it', label: 'Introduction video' },
    faq: { title: 'Frequently asked questions.', items: [
      ['Who is NutraIntel designed for?', 'NutraIntel is designed for group practices, clinical nutrition centres and facilities specialising in the management of obesity and metabolic conditions that want to support their patients with greater continuity, including between appointments. It is also intended for nutritionists, dietitians and physicians specialising in nutrition who want to monitor patient progress, encourage engagement and enhance their professional service through an integrated digital ecosystem.'],
      ['How can NutraIntel help me manage more patients simply and efficiently?', 'NutraIntel gives you your patients’ information at your fingertips in one environment. You can review measurements, view history and follow progress remotely, reducing the need to retrieve data from different sources and simplifying daily work.'],
      ['How does the connection between the scale, patient app and my portal work?', 'The smart scale connects via Bluetooth to the patient app, which collects measurements and other journey information. The data becomes available in the NutraIntel portal, where you can review history and follow progress between appointments.'],
      ['Do I need to purchase a smart scale to use NutraIntel?', 'The smart scale is part of the NutraIntel ecosystem and collects patient measurements. Usage options and available configurations will be explained at launch.'],
      ['Can NutraIntel help me understand when a patient is losing motivation?', 'NutraIntel helps identify possible signs of discontinuity, such as a prolonged period without measurements or missing documents. Portal alerts let you recognise these situations and decide whether to intervene and help the patient regain continuity.'],
      ['Can I already use NutraIntel in my practice?', 'NutraIntel is currently in pre-launch. Leave your contact details to receive availability updates and learn how it can fit into your professional practice.'],
    ] },
    pre: { title: 'Take follow-up beyond the appointment, before everyone else.', kicker: 'Early access', cardTitle: 'Do not wait for the future of nutrition to become the standard.', cardText: 'Join a community of professionals interested in a more continuous, participatory and connected journey.', hooks: [['Be among the first', 'to discover NutraIntel.'], ['Access news', 'and launch opportunities.'], ['Stay informed', 'with no commitment.']], interest: 'Expression of interest', formTitle: 'I want to be among the first', name: 'Full name *', email: 'Email *', phone: 'Phone *', profession: 'Profession / organisation', privacy: 'I have read the privacy notice and consent to the processing of my data to manage my request. *', marketing: 'I agree to receive NutraIntel updates and marketing communications.', submit: 'Request early access', note: 'Add the final privacy policy link here before publication.', sending: 'Sending…', ready: 'The form is ready: connect a real CRM/form endpoint to enable submission.', success: 'Thank you. Your request has been registered.', error: 'Submission failed. Please try again or contact us directly.' },
    footer: { back: 'Back to top', instagram: 'NutraIntel on Instagram', copyright: '© 2026 NutraIntel · Pre-launch' },
    mockup: { patients: 'Patients', measurements: 'Measurements', alerts: 'Alerts', analyses: 'Reports', professionalPortal: 'Professional portal', activePatients: 'ACTIVE PATIENTS', measurementsToday: 'MEASUREMENTS TODAY', trend: 'PROGRESS', days30: '30 DAYS', goal: 'Journey goal', onTrack: 'On track with the plan' },
  },
  de: {
    meta: { title: 'NutraIntel · Vorabzugang', description: 'NutraIntel verbindet das professionelle Portal, die Patienten-App und die vernetzte Waage in einem digitalen Ökosystem.' },
    nav: { challenge: 'Die Herausforderung', solution: 'Die Lösung', usecases: 'Was NutraIntel leistet', video: 'Video', faq: 'FAQ', cta: 'Early Adopter werden', aria: 'NutraIntel Navigation', sections: 'Bereiche', home: 'NutraIntel - zurück zum Anfang', skip: 'Zum Inhalt springen' },
    hero: { tag: 'Betreuung über den Termin hinaus', title: 'Ernährung entwickelt sich weiter. Die Beziehung zum Patienten ebenso.', titleLine1: 'Ernährung entwickelt sich weiter.', titleHighlight: 'Die Beziehung zum Patienten', titleTail: 'ebenso.', subtitle: 'Gehen Sie über den Termin hinaus: Begleiten Sie Ihre Patienten Tag für Tag und verfolgen Sie den Verlauf ihrer Ernährungstherapie – mit allen Informationen jederzeit griffbereit.', cta: 'Early Adopter werden', discover: 'NutraIntel entdecken', scroll: 'Scrollen und entdecken' },
    challenge: { kicker: 'Die Verbindung reißt ab', title: 'Wenn Informationen und Beziehung auseinanderfallen, verliert der Weg seine Kontinuität.', intro: 'Der Alltag des Patienten geht weiter. Doch ohne Verbindung zwischen Daten, Fachkraft und Mensch bleibt ein wichtiger Teil des Weges unsichtbar.', cards: [
      { title: 'Wo sind die letzten Messwerte geblieben?', text: 'Ein Wert im Chat, ein Befund per E-Mail, eine Notiz für den nächsten Termin. Wenn Informationen an verschiedenen Orten liegen, kostet die Rekonstruktion des Verlaufs Zeit.', alt: 'Eine Patientin führt zu Hause eine Messung durch.' },
      { title: 'Fühlt sich der Patient auch nach dem Termin begleitet?', text: 'Fragen, schwierige Tage und kleine Fortschritte entstehen zwischen den Terminen. Ohne Bezugspunkt können sich Patienten gerade dann allein fühlen, wenn ihr Weg Gestalt annimmt.', alt: 'Ein Patient schaut zwischen zwei Terminen auf sein Smartphone.' },
      { title: 'Was, wenn fehlende Informationen zu spät auffallen?', text: 'Eine ausgelassene Messung, ein veraltetes Dokument, eine veränderte Gewohnheit. Ohne Kontinuität werden manche Signale erst beim nächsten Termin sichtbar.', alt: 'Ein Patient fotografiert ein Dokument mit dem Smartphone.' },
    ], answerKicker: 'Die Antwort von NutraIntel', answerTitle: 'Den Weg wieder verbinden.', answerText: 'Wenn beide Punkte wieder zusammenfinden, bewegen sich Daten und Beziehung gemeinsam.', answerLink: 'Verbindung ansehen' },
    ecosystem: { stages: [
      { title: 'Vernetzte Waage', text: 'Der Patient führt Messungen mit der intelligenten Waage durch.' },
      { title: 'Professionelles Portal', text: 'Die Fachkraft überwacht Patientendaten und organisiert ihre Arbeit.' },
      { title: 'Patienten-App', text: 'Der Patient sieht seine Messwerte, verfolgt Entwicklungen und aktualisiert seine Gewohnheiten.' },
    ] },
    usecases: { cases: [
      { title: 'Jede Messung erzählt von einem Fortschritt.', description: 'Die vom Patienten erfassten Daten werden sofort Teil des von der Fachkraft begleiteten Weges.' },
      { title: 'Auch eine Pause kann zum Signal werden.', description: 'Die Fachkraft erkennt die Unterbrechung und nimmt den Kontakt zum Patienten wieder auf.' },
      { title: 'Der nächste Termin ist bereits Teil des Weges.', description: 'Ein im Portal geplanter Termin erreicht den Patienten mit denselben Informationen.' },
      { title: 'Wichtige Informationen dürfen nicht verloren gehen.', description: 'Ein vom Patienten hochgeladenes Dokument steht der Fachkraft im Arbeitsbereich zur Verfügung.' },
      { title: 'Fortschritt wird zu Ermutigung.', description: 'Die Fachkraft erkennt die Entwicklung und gibt dem Patienten spürbare Unterstützung.' },
      { title: 'Auch der Alltag wird Teil des Weges.', description: 'Ein Foto aus dem Ernährungstagebuch wird zu einer geordneten, abrufbaren Information.' },
    ], professionalAlt: 'Die Fachkraft prüft den Verlauf des Patienten.', patientAlt: 'Der Patient nimmt aktiv an seinem Ernährungsweg teil.', panels: { weightApp: ['Gewichtsdaten', 'Messung synchronisiert'], weightReceived: ['Gewicht empfangen', 'Jetzt'], missingAlert: ['Hinweis: Messung fehlt', 'Tage', 'Keine neue Messung'], professionalMessage: ['Wie läuft es?', 'Seit einigen Tagen habe ich keine neuen Messungen erhalten.'], setAppointment: ['Termin festlegen', 'NOV', '16:30 Uhr · Bestätigen'], newAppointment: ['14. November', 'Ernährungstermin'], uploadDocument: ['Dokument hochladen', 'Upload abgeschlossen ✓'], documentReceived: ['Dokument empfangen', 'Dem Patienten zugeordnet'], trendPortal: ['Verlaufsgrafik', '−1,8 kg seit Beginn'], keepGoing: ['Weiter so!', 'Die Daten zeigen, dass Sie auf dem richtigen Weg sind.'], foodPhoto: ['Ernährungstagebuch', 'Foto vom Mittagessen · heute'], foodTable: ['Ernährungstagebuch', 'Mittagessen', 'Heute · 13:05', 'Gemüse und Getreide', 'Foto empfangen', 'Notiz', 'Vollständige Portion'] } },
    impact: { title: 'Eine kontinuierliche Beziehung für einen bewussteren Ernährungsweg.', professionalEyebrow: 'Für die Fachkraft', professionalStrong: 'Mehr Signale.', professionalRest: 'Mehr Kontext. Mehr Kontinuität.', patientEyebrow: 'Für den Patienten', patientStrong: 'Mehr Nähe.', patientRest: 'Mehr Bewusstsein. Mehr Beteiligung.', professionalAlt: 'Ein Ernährungsberater prüft Patientendaten am Computer.', patientAlt: 'Eine Patientin sieht ihren Verlauf auf dem Smartphone.' },
    video: { title: 'Sehen Sie, wie NutraIntel den Weg wieder verbindet.', iframe: 'NutraIntel Video', play: 'NutraIntel Video abspielen', missing: 'Video-Link oder Einbettung hinzufügen, um es zu aktivieren', label: 'Präsentationsvideo' },
    faq: { title: 'Häufig gestellte Fragen.', items: [
      ['Für wen ist NutraIntel gedacht?', 'NutraIntel richtet sich an Gemeinschaftspraxen, Zentren für klinische Ernährung und Einrichtungen, die auf die Behandlung von Adipositas und Stoffwechselerkrankungen spezialisiert sind und ihre Patienten kontinuierlicher begleiten möchten – auch zwischen den Terminen. Darüber hinaus richtet es sich an Ernährungsberater, Diätassistenten und Fachärzte für Ernährungsmedizin, die den Fortschritt ihrer Patienten überwachen, deren Beteiligung fördern und ihre professionelle Leistung durch ein integriertes digitales Ökosystem aufwerten möchten.'],
      ['Wie hilft mir NutraIntel, mehr Patienten einfach und effizient zu betreuen?', 'NutraIntel bündelt die Informationen Ihrer Patienten in einer einzigen Umgebung. Sie können Messungen und Verläufe einsehen und die Entwicklung auch aus der Ferne verfolgen. Das reduziert die Suche in verschiedenen Quellen und vereinfacht den Arbeitsalltag.'],
      ['Wie funktioniert die Verbindung zwischen Waage, Patienten-App und Portal?', 'Die intelligente Waage verbindet sich per Bluetooth mit der Patienten-App, die Messungen und weitere Informationen sammelt. Die Daten stehen im NutraIntel-Portal zur Verfügung, wo Sie den Verlauf auch zwischen den Terminen verfolgen können.'],
      ['Muss ich eine intelligente Waage kaufen, um NutraIntel zu nutzen?', 'Die Smart-Waage ist Teil des NutraIntel-Ökosystems und ermöglicht die Erfassung der Messwerte. Nutzungsmodelle und verfügbare Konfigurationen werden zum Start vorgestellt.'],
      ['Hilft NutraIntel zu erkennen, wenn ein Patient an Motivation verliert?', 'NutraIntel hilft, mögliche Anzeichen von Unterbrechungen zu erkennen, etwa wenn längere Zeit keine Messung erfolgt oder Dokumente fehlen. Hinweise im Portal machen diese Situationen sichtbar, damit Sie bei Bedarf unterstützen können.'],
      ['Kann ich NutraIntel bereits in meiner Praxis einsetzen?', 'NutraIntel befindet sich derzeit in der Vorabphase. Hinterlassen Sie Ihre Kontaktdaten, um Informationen zur Verfügbarkeit und zur Integration in Ihre Arbeit zu erhalten.'],
    ] },
    pre: { title: 'Begleiten Sie Patienten über den Termin hinaus – früher als andere.', kicker: 'Vorabzugang', cardTitle: 'Warten Sie nicht, bis die Zukunft der Ernährung zum Standard wird.', cardText: 'Werden Sie Teil einer Community von Fachkräften, die einen kontinuierlicheren, aktiveren und vernetzten Weg gestalten möchten.', hooks: [['Gehören Sie zu den Ersten', 'die NutraIntel entdecken.'], ['Erhalten Sie Neuigkeiten', 'und Chancen rund um den Start.'], ['Bleiben Sie informiert', 'ganz unverbindlich.']], interest: 'Interessenbekundung', formTitle: 'Ich möchte zu den Ersten gehören', name: 'Vor- und Nachname *', email: 'E-Mail *', phone: 'Telefon *', profession: 'Beruf / Einrichtung', privacy: 'Ich habe die Datenschutzerklärung gelesen und stimme der Verarbeitung meiner Daten zur Bearbeitung meiner Anfrage zu. *', marketing: 'Ich möchte Neuigkeiten und Marketinginformationen zu NutraIntel erhalten.', submit: 'Vorabzugang anfragen', note: 'Vor der Veröffentlichung hier den endgültigen Link zur Datenschutzerklärung einfügen.', sending: 'Wird gesendet…', ready: 'Das Formular ist bereit: Verbinden Sie einen echten CRM-/Formular-Endpunkt, um den Versand zu aktivieren.', success: 'Vielen Dank. Ihre Anfrage wurde registriert.', error: 'Senden fehlgeschlagen. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.' },
    footer: { back: 'Nach oben', instagram: 'NutraIntel auf Instagram', copyright: '© 2026 NutraIntel · Vorabphase' },
    mockup: { patients: 'Patienten', measurements: 'Messungen', alerts: 'Hinweise', analyses: 'Befunde', professionalPortal: 'Professionelles Portal', activePatients: 'AKTIVE PATIENTEN', measurementsToday: 'MESSUNGEN HEUTE', trend: 'VERLAUF', days30: '30 TAGE', goal: 'Ziel des Weges', onTrack: 'Im Einklang mit dem Plan' },
  },
};

const LanguageContext = createContext(null);
const supported = ['it', 'en', 'de'];

const getInitialLanguage = () => {
  try {
    const saved = localStorage.getItem('nutraintel-language');
    if (supported.includes(saved)) return saved;
  } catch { /* storage unavailable */ }
  const browserLanguage = navigator.language?.slice(0, 2).toLowerCase();
  return supported.includes(browserLanguage) ? browserLanguage : 'it';
};

const resolve = (object, path) => path.split('.').reduce((value, key) => value?.[key], object);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage);
  const value = useMemo(() => ({
    language,
    setLanguage: (next) => { if (supported.includes(next)) setLanguage(next); },
    t: (path) => resolve(messages[language], path) ?? resolve(messages.it, path) ?? path,
  }), [language]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = messages[language].meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', messages[language].meta.description);
    try { localStorage.setItem('nutraintel-language', language); } catch { /* storage unavailable */ }
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}

export const languageOptions = [
  { code: 'it', short: 'IT', label: 'Italiano' },
  { code: 'en', short: 'EN', label: 'English' },
  { code: 'de', short: 'DE', label: 'Deutsch' },
];
