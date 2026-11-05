// "Come fare per…": le operazioni più comuni, con passi brevi e collegamenti.
// Nei passi {n} è un pallino cliccabile (scheda del comando n).
// links: { label, page (id della pagina), section? (titolo di una sezione "Dal manuale"), query? (ricerca in una lista) }

export const HOWTO = [
  {
    id: "accendere", title: "Accendere e regolare il volume",
    steps: ["Premi {1} per accendere (o spegnere).", "Gira {2} per il volume.", "Con le cuffie collegate a {45} i diffusori si escludono."],
    links: [{ label: "Spegnimento automatico", page: "fig-11", control: 1 }],
  },
  {
    id: "timbro", title: "Cambiare suono (timbro)",
    steps: ["Premi {13} (TONE).", "Digita il numero a tre cifre con {17} (es. 0, 0, 1).", "Per un pianoforte o un organo al volo: {27}."],
    links: [{ label: "Elenco dei timbri", page: "timbri" }],
  },
  {
    id: "duesuoni", title: "Suonare due suoni insieme o dividere la tastiera",
    steps: ["Scegli il primo timbro con {13}.", "Premi {25} (LAYER) per sovrapporre un secondo timbro, oppure {24} (SPLIT) per dare un timbro diverso alla parte sinistra.", "Scegli il secondo timbro con {17}."],
    links: [],
  },
  {
    id: "ritmo", title: "Suonare con un ritmo",
    steps: ["Premi {14} (RHYTHM) e digita il numero del ritmo.", "Premi {10} (START/STOP) per avviarlo e fermarlo.", "Regola la velocità con {12} (TEMPO)."],
    links: [{ label: "Lista dei ritmi", page: "ritmi" }],
  },
  {
    id: "accordi", title: "Accompagnamento automatico con accordi",
    steps: ["Avvia un ritmo ({14} e {10}).", "Premi {11} (ACCOMP): la parte sinistra diventa la tastiera degli accordi.", "Suona gli accordi con la sinistra e la melodia con la destra.", "Introduzione {6}, variazione {8}, finale {9}."],
    links: [{ label: "Modi degli accordi e CASIO CHORD", page: "fig-38", section: "Esecuzione di tutte le parti" }],
  },
  {
    id: "preset", title: "Usare un brano preinstallato (Music Preset)",
    steps: ["Tieni premuto {13} finché compare il preset.", "Digita il numero con {17} (001–305).", "Suona un accordo con la sinistra: parte l'accompagnamento."],
    links: [{ label: "Lista dei brani preinstallati", page: "preset" }],
  },
  {
    id: "ascoltare", title: "Ascoltare un brano incorporato",
    steps: ["Premi {15} (SONG BANK) e digita il numero (001–152).", "Premi {10} (PLAY/STOP) per avviarlo e fermarlo.", "Per i brani dimostrativi premi insieme {10} e {11}."],
    links: [{ label: "Banca di brani", page: "preset" }],
  },
  {
    id: "lezioni", title: "Imparare un brano con le lezioni",
    steps: ["Scegli il brano con {15}, la mano con {11}.", "Lezione 1 {18}: ascolta. Lezione 2 {19}: suona seguendo la guida. Lezione 3 {20}: suona a memoria.", "Oppure {22} per la lezione automatica, frase per frase."],
    links: [{ label: "Come funziona la lezione progressiva", page: "fig-31", section: "Svolgimento della lezione progressiva" }],
  },
  {
    id: "metronomo", title: "Metronomo e velocità",
    steps: ["Premi {5} per avviare e fermare il metronomo.", "Tienilo premuto per le battute per misura.", "Cambia la velocità con {12}."],
    links: [],
  },
  {
    id: "registrare", title: "Registrare ciò che suoni",
    steps: ["Premi {14}, poi due volte {3}: la tastiera attende la registrazione.", "Suona: la registrazione parte con la prima nota.", "{10} ferma la registrazione; premilo di nuovo per riascoltare."],
    links: [{ label: "Registrare per tracce", page: "fig-45", section: "Uso delle tracce per registrare e missare le parti" }],
  },
  {
    id: "trasporre", title: "Cambiare tonalità o intonazione",
    steps: ["Premi {29} (FUNCTION): la prima voce è la trasposizione (Trans.).", "Cambia con [–] e [+] di {17} (da –12 a +12 semitoni).", "Per l'intonazione fine (Tune) scorri il menu con [4] e [6]."],
    links: [{ label: "Trasposizione, intonazione, ottava", page: "fig-15", section: "Cambio del pitch (Trasposizione, intonazione, cambiamento dell’ottava)" }],
  },
  {
    id: "effetti", title: "Riverbero, chorus e risposta al tocco",
    steps: ["Premi {29} (FUNCTION) e scorri con [4] e [6] di {17} fino a Reverb, Chorus o Touch.", "Cambia il valore con [–] e [+]."],
    links: [{ label: "Tutte le funzioni del menu", page: "fig-5", section: "Funzioni del pulsante FUNCTION" }],
  },
  {
    id: "campionare", title: "Campionare un suono col microfono",
    steps: ["Collega il microfono a {42} e regolane il volume con {41}.", "Premi {13} e scegli un timbro tra 601 e 605.", "Premi insieme {27} e {28}, poi emetti il suono."],
    links: [{ label: "Campionamento della batteria e altre funzioni", page: "fig-20", section: "Altre funzioni di campionamento" }],
  },
  {
    id: "scheda", title: "Riprodurre brani da una scheda SD",
    steps: ["Inserisci la scheda in {38} fino al clic.", "Premi brevemente {16} (CARD) e scegli il brano con {17}.", "Premi {10} per avviarlo. I file devono stare nella cartella MUSICDAT."],
    links: [{ label: "Cartella MUSICDAT", page: "fig-54", section: "Posizioni dei file sulla scheda (cartella MUSICDAT)" }],
  },
  {
    id: "computer", title: "Collegare la tastiera al computer",
    steps: ["Spegni la tastiera e avvia il computer.", "Collega un cavo USB A-B alla porta {39}.", "Accendi la tastiera, poi avvia il programma musicale."],
    links: [{ label: "Impostazioni MIDI", page: "fig-60", section: "Impostazioni MIDI" }],
  },
  {
    id: "problemi", title: "Risolvere un problema",
    steps: ["Cerca il sintomo nella tabella dei problemi.", "Se compare un messaggio sul display (Err …), cercalo nella tabella dei messaggi."],
    links: [
      { label: "Risoluzione dei problemi", page: "foto", section: "Risoluzione dei problemi" },
      { label: "Messaggi di errore", page: "foto", section: "Messaggi di errore" },
    ],
  },
  {
    id: "ripristino", title: "Tornare alle impostazioni di fabbrica",
    steps: ["Spegni la tastiera.", "Tieni premuti {15} (SONG BANK) e il tasto [1] di {17} e accendi.", "Rilascia quando compare “Pls wait”."],
    links: [{ label: "Procedura completa", page: "fig-5", section: "Ripristino della tastiera digitale alle sue impostazioni iniziali di fabbrica" }],
  },
];
