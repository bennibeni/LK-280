// Descrizioni complete dei comandi della Casio LK-280, ricavate dalla Guida dell'utilizzatore (italiano).
// Nei testi, {n} è un riferimento al comando numero n: nell'app diventa un pallino cliccabile.
// Struttura: { intro, sezioni: [{ titolo, passi?: [], note?: [] }] }

export const DETAILS = {
  1: {
    intro: "Accende e spegne la tastiera digitale.",
    sezioni: [
      { titolo: "Accensione ed esecuzione", passi: [
        "Premere {1} per accendere la tastiera.",
        "Suonare qualche brano. Usare {2} per regolare il volume.",
        "Premere di nuovo {1} per spegnere.",
      ], note: [
        "Allo spegnimento si annullano le impostazioni più recenti: alla riaccensione la tastiera riparte dalle impostazioni iniziali. Fa eccezione la protezione dei suoni campionati, che resta attiva finché non la si disattiva.",
        "Mentre il display mostra “Pls wait” è in corso un salvataggio: non spegnere la tastiera e non togliere la scheda di memoria, altrimenti i dati possono andare persi.",
      ] },
      { titolo: "Spegnimento automatico", note: [
        "Se non si tocca nulla, la tastiera si spegne da sola dopo 6 minuti con le pile e dopo 30 minuti con il trasformatore CA.",
        "Per disattivarlo (per esempio durante un concerto) accendere la tastiera tenendo premuto {13} (TONE).",
      ] },
      { titolo: "Avviso di accensione", note: [
        "Con il trasformatore CA, dopo circa sei minuti di inattività i tasti si illuminano per ricordare che la tastiera è accesa. Si disattiva da {29} (FUNCTION) → “OTHER” → [9] (ENTER) → “Demo2” → [–] (OFF).",
      ] },
      { titolo: "Durante la Sfida musicale", note: [
        "Mentre un gioco è in corso restano attivi solo {1}, {10} e {23}.",
      ] },
    ],
  },
  2: {
    intro: "Manopola del volume generale della tastiera.",
    sezioni: [
      { note: [
        "Girare la manopola per regolare il volume mentre si suona.",
        "Abbassare il volume prima di collegare le cuffie a {45}.",
        "Il volume del brano e quello dell'accompagnamento rispetto a ciò che si suona si regolano a parte, con {29} (FUNCTION) → “Song Vol” e “AcompVol”.",
      ] },
    ],
  },
  3: {
    intro: "Registra ciò che si suona, compreso l'auto-accompagnamento, e lo riproduce.",
    sezioni: [
      { titolo: "Registrare e riascoltare", passi: [
        "Premere {14} (RHYTHM).",
        "Premere {3}: l'indicatore si illumina.",
        "Premere di nuovo {3}: la tastiera entra in attesa di registrazione (l'indicatore lampeggia).",
        "Scegliere timbro, ritmo e le altre impostazioni.",
        "Iniziare a suonare: la registrazione parte con la prima nota.",
        "Premere {10} per fermare la registrazione.",
        "Premere di nuovo {10} per riascoltare. Ogni pressione di {10} avvia o ferma la riproduzione.",
        "Premere due volte {3} per uscire dal registratore.",
      ], note: [
        "Ogni pressione di {3} passa ciclicamente tra registratore spento, attesa di riproduzione e attesa di registrazione.",
        "La memoria del registratore contiene circa 12.000 note. Quando ne restano meno di 100 l'indicatore lampeggia più velocemente.",
        "Una nuova registrazione cancella quella precedente. Spegnere la tastiera durante la registrazione cancella tutto il contenuto del registratore.",
      ] },
      { titolo: "Cancellare la registrazione", note: [
        "In attesa di registrazione, tenere premuto {3} senza toccare la tastiera finché appare “Tr.Del?”, poi premere [+] (YES) per cancellare o [–] (NO) per annullare.",
      ] },
      { titolo: "Registrare per tracce", note: [
        "Si può registrare un brano a parti separate su sei tracce (la traccia originale più cinque aggiuntive) e missarle insieme (pagina I-45).",
      ] },
    ],
  },
  4: {
    intro: "Attiva la funzione Karaoke: abbassa la melodia del brano così che tu possa cantarla al microfono.",
    sezioni: [
      { titolo: "Usare il Karaoke", passi: [
        "Collegare il microfono a {42} e regolarne il volume con {41}.",
        "Scegliere un brano della banca di brani tra 001 e 052, quindi premere {4}: la funzione si attiva.",
        "Premere {10} per avviare il brano.",
        "Cantare al microfono.",
      ], note: [
        "Volume e timbro della melodia vengono riprodotti in modo da rendere facile cantare insieme.",
        "Con la trasposizione (pagina I-17) si adatta la tonalità del brano a quella del cantante.",
        "Premere di nuovo {4} per disattivare il Karaoke: l'indicatore sul display si spegne.",
      ] },
    ],
  },
  5: {
    intro: "Metronomo: dà una battuta regolare per aiutarti a tenere il tempo. Tenuto premuto, imposta il numero di battute per misura.",
    sezioni: [
      { titolo: "Avvio e arresto", passi: [
        "Premere {5} per avviare il metronomo.",
        "Premere di nuovo {5} per fermarlo.",
      ] },
      { titolo: "Battute per misura (BEAT)", passi: [
        "Tenere premuto {5} finché appare la schermata “Beat”.",
        "Con {17} inserire il numero di battute per misura: 0 oppure da 2 a 6.",
      ], note: [
        "Il primo battito di ogni misura suona con una campanella. Con 0 la campanella non suona e tutti i battiti sono un clic.",
        "Con un brano incorporato le battute per misura si impostano da sole in base al brano.",
        "Se non si fa nulla per qualche secondo, il display torna alla schermata precedente.",
      ] },
      { titolo: "Tempo e volume", note: [
        "Il tempo del metronomo si cambia con {12}.",
        "Il volume del metronomo segue quello dell'auto-accompagnamento o del brano e non si regola separatamente.",
      ] },
    ],
  },
  6: {
    intro: "Con i brani: attiva e disattiva la ripetizione e ripete un tratto scelto. Con l'auto-accompagnamento: esegue l'introduzione.",
    sezioni: [
      { titolo: "Ripetizione del brano", note: [
        "Un brano riparte da capo finché non si preme {10}. Premere {6} per annullare la ripetizione.",
      ] },
      { titolo: "Ripetere alcune misure", passi: [
        "Premere {6} per disattivare momentaneamente la ripetizione del brano.",
        "Quando il brano arriva alla misura iniziale desiderata, premere {6}.",
        "Quando arriva alla misura finale, premere di nuovo {6}: le misure scelte vengono ripetute.",
        "Premere ancora {6} per tornare alla riproduzione normale.",
      ], note: [
        "Durante la ripetizione si possono usare {9} (pausa), {8} (avanti) e {7} (indietro).",
        "Cambiando brano si annullano misura iniziale e finale.",
      ] },
      { titolo: "Introduzione (INTRO)", note: [
        "Con l'auto-accompagnamento, premere {6} per suonare un'introduzione di alcune misure; al termine parte il pattern normale.",
        "Se durante l'introduzione si preme {8}, al termine parte il pattern variazione.",
        "In attesa di avvio sincronizzato ({9}), premere {6} per partire dall'introduzione.",
      ] },
      { titolo: "Nelle lezioni", note: [
        "Nelle Lezioni 1, 2 e 3, premere {6} per disattivare la ripetizione della frase.",
      ] },
    ],
  },
  7: {
    intro: "Con i brani: torna indietro di una misura. Con l'auto-accompagnamento: pattern normale e relativo fill-in.",
    sezioni: [
      { titolo: "Salto indietro", note: [
        "Durante la riproduzione, ogni pressione di {7} torna indietro di una misura. Tenendolo premuto si torna indietro velocemente.",
        "A brano fermo, {7} torna indietro di una frase nella funzione lezioni.",
      ] },
      { titolo: "Pattern normale e fill-in", note: [
        "Premere {7} per tornare dal pattern variazione al pattern normale.",
        "Mentre suona il pattern normale, premere {7} per eseguire un fill-in (stacco), poi il pattern normale riprende.",
        "{7} avvia anche il ritmo, come {10}.",
      ] },
    ],
  },
  8: {
    intro: "Con i brani: avanza di una misura. Con l'auto-accompagnamento: pattern variazione e relativo fill-in.",
    sezioni: [
      { titolo: "Salto in avanti", note: [
        "Durante la riproduzione, ogni pressione di {8} avanza di una misura. Tenendolo premuto si avanza velocemente.",
        "A brano fermo, {8} avanza di una frase nella funzione lezioni.",
      ] },
      { titolo: "Pattern variazione e fill-in", note: [
        "Premere {8} per passare al pattern variazione.",
        "Mentre suona il pattern variazione, premere {8} per eseguire il suo fill-in, poi la variazione riprende.",
        "In attesa di avvio sincronizzato ({9}), premere {8} per partire dalla variazione.",
      ] },
    ],
  },
  9: {
    intro: "Con i brani: pausa. Con l'auto-accompagnamento: avvio sincronizzato e finale.",
    sezioni: [
      { titolo: "Pausa", passi: [
        "Premere {9} per mettere in pausa il brano.",
        "Premere di nuovo {9} per riprendere dal punto in cui ci si era fermati.",
      ] },
      { titolo: "Avvio sincronizzato (SYNCHRO)", passi: [
        "Premere {9}: la tastiera aspetta che si suoni un accordo.",
        "Suonare un accordo: l'accompagnamento completo parte subito.",
      ], note: [
        "Prima di suonare l'accordo si può premere {6} per partire dall'introduzione o {8} per partire dalla variazione.",
      ] },
      { titolo: "Finale (ENDING)", note: [
        "Mentre l'auto-accompagnamento suona, premere {9}: viene eseguito il finale e poi l'accompagnamento si ferma da solo.",
      ] },
    ],
  },
  10: {
    intro: "Avvia e ferma il brano selezionato o il ritmo dell'auto-accompagnamento.",
    sezioni: [
      { titolo: "Brani", passi: [
        "Premere {15} (SONG BANK) e scegliere il brano con {17}.",
        "Premere {10} per avviarlo.",
        "Premere di nuovo {10} per fermarlo.",
      ] },
      { titolo: "Brani dimostrativi", passi: [
        "Premere {10} e {11} insieme: parte la dimostrazione, sempre dal brano 001.",
        "Durante la dimostrazione si cambia brano con i tasti [–] e [+] di {17} (non con i numeri).",
        "Premere {10} per fermarla.",
      ] },
      { titolo: "Ritmo", note: [
        "Dopo aver scelto un ritmo con {14}, premere {10} (o {7}) per avviarlo e di nuovo {10} per fermarlo.",
      ] },
      { titolo: "Altri usi", note: [
        "Ferma le lezioni ({18}, {19}, {20}, {22}) e la Sfida musicale ({23}).",
        "Con il registratore ({3}) ferma la registrazione e avvia o ferma la riproduzione.",
      ] },
    ],
  },
  11: {
    intro: "Nei brani sceglie quale mano esercitare. Con l'auto-accompagnamento attiva gli accordi; tenuto premuto sceglie il modo di introduzione degli accordi.",
    sezioni: [
      { titolo: "Escludere una mano (brani)", passi: [
        "Premere {11} più volte per scegliere la parte da disattivare: mano destra, mano sinistra, entrambe, nessuna.",
        "Premere {10} per avviare il brano e suonare la parte esclusa.",
      ], note: [
        "Durante la riproduzione il display mostra solo le note della parte disattivata.",
        "Nelle lezioni {11} sceglie la parte da esercitare: destra, sinistra o entrambe.",
      ] },
      { titolo: "Accompagnamento con accordi (ACCOMP)", passi: [
        "Avviare il ritmo dell'auto-accompagnamento.",
        "Premere {11}: si illumina l'indicatore ACCOMP e la parte sinistra della tastiera diventa la tastiera degli accordi.",
        "Suonare gli accordi con la sinistra: si aggiungono basso e armonia.",
        "Premere di nuovo {11} per tornare al solo ritmo.",
      ] },
      { titolo: "Modo di introduzione degli accordi (CHORDS)", passi: [
        "Tenere premuto {11} finché appare “Chord”.",
        "Con [–] e [+] di {17} scegliere FINGERED 1, 2, 3, CASIO CHORD o FULL RANGE CHORD.",
      ] },
      { titolo: "Brani dimostrativi", note: [
        "Premere {10} e {11} insieme per avviare i brani dimostrativi.",
      ] },
    ],
  },
  12: {
    intro: "Pulsanti del tempo: rallentano (∨) o velocizzano (∧) brani, ritmi e metronomo.",
    sezioni: [
      { titolo: "Cambiare il tempo", passi: [
        "Premere {12}: il valore del tempo lampeggia sul display.",
        "Usare ∨ per rallentare e ∧ per velocizzare. Tenendo premuto si cambia velocemente.",
      ], note: [
        "Mentre il valore lampeggia lo si può scrivere con {17}, con tre cifre (89 si scrive 089).",
        "Premendo ∨ e ∧ insieme si torna al tempo originale del brano o del ritmo.",
        "Cambiando brano, il brano torna al suo tempo originale.",
        "Il tempo dei brani della Sfida musicale non si può cambiare.",
      ] },
    ],
  },
  13: {
    intro: "Seleziona il timbro (il suono di strumento) della tastiera. Tenuto premuto richiama i brani preinstallati (MUSIC PRESET).",
    sezioni: [
      { titolo: "Scegliere un timbro", passi: [
        "Premere {13}.",
        "Con {17} inserire il numero del timbro a tre cifre (per 001: 0, 0, 1).",
        "Suonare: si sente lo strumento scelto.",
      ], note: [
        "Con i set batteria, ogni tasto suona una percussione diversa (lista {37}).",
        "La lista completa dei timbri è nell'Appendice separata e stampata sul pannello ({35}).",
      ] },
      { titolo: "Altri usi", note: [
        "Accendendo la tastiera con {13} premuto si disattiva lo spegnimento automatico.",
        "{13} è il primo passo per sovrapporre ({25}) o dividere ({24}) i timbri e per scegliere dove salvare un suono campionato (timbri 601-605).",
        "Chiude il libro di accordi e cancella il punteggio della Sfida musicale.",
      ] },
    ],
  },
  14: {
    intro: "Seleziona il ritmo dell'auto-accompagnamento. Tenuto premuto applica la preselezione “One-Touch”.",
    sezioni: [
      { titolo: "Suonare solo il ritmo", passi: [
        "Premere {14}.",
        "Con {17} inserire il numero del ritmo a tre cifre.",
        "Premere {10} (o {7}) per avviarlo e suonare a tempo.",
        "Premere di nuovo {10} per fermarlo.",
      ], note: [
        "L'auto-accompagnamento ha tre parti: ritmo, basso e armonia. Con {11} si aggiungono basso e armonia.",
      ] },
      { titolo: "Preselezione One-Touch", passi: [
        "Tenere premuto {14} finché il display mostra il timbro attuale: la tastiera imposta timbro, tempo e altri parametri adatti al ritmo scelto.",
        "Suonare un accordo: l'accompagnamento parte da solo.",
      ] },
      { titolo: "Altri usi", note: [
        "{14} è il primo passo per registrare ({3}) e per la riproduzione continua di un suono campionato.",
      ] },
    ],
  },
  15: {
    intro: "Seleziona uno dei brani incorporati della banca di brani.",
    sezioni: [
      { titolo: "Riprodurre un brano", passi: [
        "Premere {15}.",
        "Con {17} inserire il numero del brano a tre cifre (lista a pagina I-68 e sul pannello, {31}).",
        "Premere {10} per avviarlo; si può suonare insieme.",
      ] },
      { titolo: "Suonare con il timbro del brano", note: [
        "Dopo aver scelto un brano, tenere premuto {15} per circa due secondi: alla tastiera viene assegnato il timbro del brano (della mano destra, se le mani hanno timbri diversi).",
      ] },
      { titolo: "Altri usi", note: [
        "{15} è il primo passo per la Sfida musicale ({23}).",
        "Si possono aggiungere brani da scheda di memoria o da computer (pagine I-56 e I-62).",
      ] },
    ],
  },
  16: {
    intro: "Funzioni della scheda di memoria SD. Premuto brevemente mostra i brani della scheda da riprodurre; tenuto premuto apre il salvataggio e il caricamento dei dati.",
    sezioni: [
      { titolo: "Riprodurre i brani dalla scheda", passi: [
        "Inserire la scheda nello slot {38}, con l'etichetta verso l'alto, finché si blocca con un clic.",
        "Premere brevemente {16}: il display mostra il numero del file e il nome del brano.",
        "Con {17} scegliere il brano.",
        "Premere {10} per avviarlo. Ogni pressione di {10} avvia o ferma la riproduzione.",
      ], note: [
        "La tastiera vede solo i file nella cartella “MUSICDAT” della scheda, direttamente lì: non quelli in altre cartelle né in sottocartelle di MUSICDAT.",
        "Si riproducono i file MIDI standard (.MID) di formato 0 o 1 e i brani CASIO (.CM2).",
        "La cartella MUSICDAT viene creata quando si formatta la scheda sulla tastiera. Si può anche crearla dal computer e copiarci i file .mid.",
        "Se la cartella non c'è o è vuota compare “No File”. Prima di formattare, controlla la scheda sul computer: la formattazione cancella tutto quello che contiene.",
      ] },
      { titolo: "Messaggi più comuni", note: [
        "Err No Card: la scheda non è inserita bene; toglierla e reinserirla fino al clic.",
        "No File / Err No File: manca la cartella MUSICDAT o è vuota.",
        "Err NotSMF01: il file è un MIDI di formato 2; sono supportati solo i formati 0 e 1.",
        "Err Format: scheda non formattata per la tastiera, danneggiata o di tipo SDXC (usare SD o SDHC fino a 32 GB).",
        "La tabella completa dei messaggi è nella pagina Foto, sotto “Dal manuale”.",
      ] },
      { titolo: "Salvare sulla scheda", passi: [
        "Selezionare i dati da salvare: il numero del suono campionato, il brano registrato (in attesa di riproduzione) oppure un timbro qualsiasi per salvare tutti i dati.",
        "Inserire la scheda nello slot {38}.",
        "Tenere premuto {16} finché appare la schermata di salvataggio.",
        "Con i tasti [4] e [6] di {17} scegliere “SmplTone”, “Rec.Song”, “SMF 0” o “All Data”.",
        "Premere [9] (ENTER), inserire il nome del file e premere di nuovo [9] (ENTER).",
      ], note: [
        "Per annullare, premere di nuovo {16}.",
        "I brani caricati da un dispositivo esterno non si possono salvare sulla scheda.",
      ] },
      { titolo: "Formattare la scheda", passi: [
        "Inserire la scheda (con la protezione da scrittura disattivata).",
        "Premere {16} e {29} insieme: appare “Format”.",
        "Premere [9] (ENTER), poi [+] (YES) alla domanda “Sure?”.",
      ], note: [
        "La formattazione cancella i dati della scheda. Per annullare premere [–] (NO) o [7] (EXIT).",
      ] },
      { titolo: "Requisiti", note: [
        "Schede SD o SDHC fino a 32 GB.",
        "Chiude anche il libro di accordi ({28}).",
      ] },
    ],
  },
  17: {
    intro: "Tastierino a 10 tasti: inserisce numeri e cambia i valori con [–] e [+]. Alcuni tasti hanno funzioni speciali nei menu.",
    sezioni: [
      { titolo: "Tasti numerici", note: [
        "Servono per scrivere numeri di timbro, ritmo, brano e altri valori. Inserire sempre lo stesso numero di cifre del valore mostrato (001, non 1).",
        "Non permettono valori negativi: in quel caso usare [–] e [+].",
      ] },
      { titolo: "Tasti [–] e [+]", note: [
        "[–] diminuisce e [+] aumenta il valore. Tenuti premuti scorrono il valore.",
        "Premuti insieme riportano il valore a quello iniziale o consigliato.",
        "Nelle conferme valgono come [–] NO e [+] YES.",
      ] },
      { titolo: "Tasti speciali nei menu", note: [
        "[4] (←) e [6] (→) scorrono le voci del menu di {29} (FUNCTION).",
        "[9] è ENTER (apre un sottomenu o conferma), [7] è EXIT (lo chiude).",
        "Nel libro di accordi ({28}) i tasti da [0] a [4] mostrano i rivolti dell'accordo.",
      ] },
    ],
  },
  18: {
    intro: "Lezione 1: ascolti il brano di esempio per familiarizzare con ciò che dovrai suonare.",
    sezioni: [
      { titolo: "Prima di iniziare", passi: [
        "Scegliere il brano con {15}.",
        "Scegliere la frase con {21} (o {8}) e {7}.",
        "Scegliere la mano da esercitare con {11}.",
      ] },
      { titolo: "Lezione 1", passi: [
        "Premere {18}: parte l'esecuzione di esempio.",
        "Premere {18} o {10} per fermare la lezione.",
      ] },
      { titolo: "Le tre lezioni", note: [
        "Lezione 1 {18}: ascolto. Lezione 2 {19}: il brano aspetta la nota giusta, con guida dei tasti e delle dita. Lezione 3 {20}: si suona a memoria.",
      ] },
    ],
  },
  19: {
    intro: "Lezione 2: suoni seguendo la guida; il brano aspetta finché non premi la nota giusta.",
    sezioni: [
      { titolo: "Lezione 2", passi: [
        "Premere {19} per avviare la lezione.",
        "Suonare seguendo il display e la guida vocale alla diteggiatura: il tasto da premere lampeggia, la voce indica il dito da usare.",
        "Premere {19} o {10} per fermare la lezione.",
      ], note: [
        "Se sbagli nota, il brano attende: il tasto passa da lampeggiante a fisso, si sente la nota corretta e la voce suggerisce il dito.",
        "Alla fine appare un punteggio: “Bravo!” significa promosso, “Again!” invita a riprovare.",
        "La guida vocale si disattiva da {29} (FUNCTION) → “LESSON” → [9] (ENTER) → “Speak” → [–] (OFF).",
      ] },
    ],
  },
  20: {
    intro: "Lezione 3: suoni a memoria. Il brano aspetta la nota giusta ma non mostra più quale suonare.",
    sezioni: [
      { titolo: "Lezione 3", passi: [
        "Premere {20} per avviare la lezione.",
        "Suonare insieme al brano ricordando ciò che si è imparato nella Lezione 2.",
        "Premere {20} o {10} per fermare la lezione.",
      ], note: [
        "Se non trovi il tasto giusto, la tastiera ti aiuta come nella Lezione 2: illumina il tasto e la voce indica il dito.",
        "Alla fine appare il punteggio, come nella Lezione 2.",
      ] },
      { titolo: "Suonare il brano completo", note: [
        "Superate tutte le frasi, usare {11} per disattivare entrambe le mani e premere {10}: si suona il brano intero e la tastiera valuta l'esecuzione.",
      ] },
    ],
  },
  21: {
    intro: "Passa alla frase successiva del brano nelle lezioni. Tenuto premuto richiama l'ultima frase esercitata.",
    sezioni: [
      { note: [
        "Premere {21} (o {8}) per avanzare di una frase, {7} per tornare indietro. Tenendo premuto {8} o {7} le frasi scorrono velocemente.",
        "La tastiera ricorda l'ultima frase esercitata per un massimo di 20 brani: tenere premuto {21} per richiamarla.",
        "Il display mostra “<Phrase>” con il numero della frase e la sua prima misura.",
      ] },
    ],
  },
  22: {
    intro: "Lezione progressiva automatica: la tastiera ti guida da sola, frase dopo frase, attraverso le Lezioni 1, 2 e 3.",
    sezioni: [
      { titolo: "Usare la lezione automatica", passi: [
        "Scegliere il brano e la mano da esercitare.",
        "Premere {22}: si ascolta la prima frase nella Lezione 1.",
        "La lezione prosegue da sola e si ferma quando hai superato tutte le lezioni.",
      ], note: [
        "Nelle Lezioni 2 e 3 si passa alla lezione successiva solo ottenendo “Bravo!”.",
        "Dopo ogni nuova frase si ripassano insieme tutte le frasi precedenti nella Lezione 3.",
        "Per annullare, premere {22} o {10}.",
        "Durante la lezione si possono cambiare passo e frase con {7}, {8} e da {18} a {21}.",
        "La ripetizione della frase e la valutazione restano sempre attive durante la lezione automatica.",
      ] },
    ],
  },
  23: {
    intro: "Sfida musicale: gioco che misura la velocità con cui premi i tasti che si illuminano.",
    sezioni: [
      { titolo: "Giocare", passi: [
        "Premere {15} (SONG BANK).",
        "Premere {23}: un tasto inizia a lampeggiare e parte il brano del gioco.",
        "Quando il tasto smette di lampeggiare e resta acceso, premilo il più in fretta possibile con il dito indicato sul display.",
        "Il gioco finisce dopo 20 note: il display mostra il tempo totale e poi il punteggio.",
      ], note: [
        "Premere un tasto mentre lampeggia ancora non fa avanzare.",
        "Il display mostra il tempo di reazione in decimi di secondo: più è breve, più alto è il punteggio.",
        "Per annullare il gioco premere {23} o {10}. Per cancellare il punteggio premere {13}, {14} o {15}.",
        "Durante il gioco funzionano solo {1}, {10} e {23}.",
      ] },
    ],
  },
  24: {
    intro: "Divide la tastiera in due parti con due timbri diversi, come un duo di strumenti.",
    sezioni: [
      { titolo: "Dividere la tastiera", passi: [
        "Premere {13} (TONE) e scegliere con {17} il timbro per la parte destra (es. 303 FLUTE 1).",
        "Premere {24}: l'indicatore si illumina.",
        "Con {17} scegliere il timbro per la parte sinistra (es. 064 VIBRAPHONE 1).",
        "Suonare: le due parti hanno timbri diversi.",
        "Premere di nuovo {24} per tornare a un solo timbro.",
      ], note: [
        "Il punto di divisione predefinito è F3.",
        "Se sono attive sia la divisione sia la sovrapposizione ({25}), la sovrapposizione vale solo per la parte destra.",
      ] },
      { titolo: "Cambiare il punto di divisione", note: [
        "Tenendo premuto {24}, premere il tasto da cui deve iniziare la parte destra (es. C4, il Do centrale).",
        "Il punto di divisione stabilisce anche l'ampiezza della tastiera degli accordi per l'auto-accompagnamento.",
      ] },
    ],
  },
  25: {
    intro: "Sovrappone due timbri: ogni tasto li suona insieme (per esempio pianoforte e archi).",
    sezioni: [
      { titolo: "Sovrapporre due timbri", passi: [
        "Premere {13} (TONE) e scegliere con {17} il primo timbro (es. 032 ELEC.PIANO 1).",
        "Premere {25}: l'indicatore si illumina.",
        "Con {17} scegliere il secondo timbro (es. 205 STRINGS).",
        "Suonare: i due timbri suonano insieme.",
        "Premere di nuovo {25} per tornare al solo primo timbro.",
      ] },
    ],
  },
  26: {
    intro: "Un solo pulsante per due funzioni alternative: auto-harmonize (aggiunge armonie alla melodia) e arpeggiatore (suona arpeggi in automatico). Tenuto premuto sceglie il tipo.",
    sezioni: [
      { titolo: "Auto-harmonize", passi: [
        "Premere {11} per attivare l'accompagnamento con gli accordi (ACCOMP acceso).",
        "Tenere premuto {26} finché appare il tipo (es. “Duet 1”).",
        "Con [–] e [+] di {17} scegliere un tipo tra 001 e 012 (Duet, Country, Octave, 5th, Strings, Big Band…).",
        "Premere {26} per attivarlo: suonando accordi con la sinistra e melodia con la destra, alla melodia si aggiungono note di armonia.",
      ], note: [
        "Non funziona con il modo accordi FULL RANGE CHORD.",
        "Premere di nuovo {26} per disattivarlo.",
      ] },
      { titolo: "Arpeggiatore", passi: [
        "Tenere premuto {26} finché appare il tipo.",
        "Con [–] e [+] scegliere un tipo tra 013 e 102: Up, Down, U/D A, U/D B, Random.",
        "Premere {26} per attivarlo: suonando un accordo parte l'arpeggio.",
      ], note: [
        "Il tempo dell'arpeggio è quello del metronomo.",
        "Per far continuare l'arpeggio dopo aver rilasciato i tasti: {29} (FUNCTION) → “OTHER” → [9] (ENTER) → “ArpegHld” → [+] (ON).",
      ] },
    ],
  },
  27: {
    intro: "Passa con un tocco a un timbro di pianoforte (001) o di organo (079), con impostazioni adatte.",
    sezioni: [
      { titolo: "Pianoforte o organo", note: [
        "Ogni pressione di {27} alterna pianoforte e organo.",
        "Insieme al timbro imposta altri parametri adatti: per esempio riverbero 06, pedale in sustain, ritmo 161 (pianoforte) o 094 (organo) e accompagnamento con il solo ritmo.",
      ] },
      { titolo: "Campionamento", note: [
        "Premere {27} e {28} insieme per avviare e fermare il campionamento di un suono dal microfono.",
        "Premere {27} e {29} insieme per la riproduzione continua di un suono campionato.",
      ] },
    ],
  },
  28: {
    intro: "Libro di accordi: mostra le note di un accordo che non sai suonare.",
    sezioni: [
      { titolo: "Cercare un accordo", passi: [
        "Premere {28}: appare “ChordBk”.",
        "Sulla tastiera degli accordi premere la nota fondamentale (es. C).",
        "Con [–] e [+] di {17} scegliere il tipo: M, m, dim, aug, sus4, sus2, 7th, m7, M7, m7♭5, 7♭5, 7sus4, add9, madd9, mM7, dim7, 69, 6th, m6.",
        "L'accordo suona, il display lo mostra e i suoi tasti si illuminano.",
        "Premere {28} per chiudere.",
      ], note: [
        "Con i tasti da [0] a [4] di {17} si vedono la forma normale e i rivolti dal primo al quarto.",
        "Il libro si chiude anche premendo {13}, {14}, {15} o {16}.",
      ] },
      { titolo: "Campionamento", note: [
        "{27} e {28} premuti insieme avviano e fermano il campionamento.",
      ] },
    ],
  },
  29: {
    intro: "Apre il menu delle funzioni (riverbero, chorus, trasposizione, volumi, impostazioni varie). Tenuto premuto accende o spegne la guida luminosa dei tasti.",
    sezioni: [
      { titolo: "Usare il menu", passi: [
        "Premere {29}: appare il menu (la prima voce è la trasposizione, “Trans.”).",
        "Con i tasti [4] (←) e [6] (→) di {17} scegliere la funzione.",
        "Cambiare il valore con [–] e [+].",
        "Premere di nuovo {29} per uscire.",
      ], note: [
        "Le voci con sottomenu (OTHER, LESSON…) si aprono con [9] (ENTER) e si chiudono con [7] (EXIT).",
      ] },
      { titolo: "Voci principali", note: [
        "Trans.: trasposizione da –12 a +12 semitoni.",
        "Touch: risposta al tocco (off, 1 normale, 2 più sensibile).",
        "Reverb: riverbero da 1 a 10, oppure off. Chorus: cinque tipi, oppure off.",
        "Song Vol e AcompVol: volume del brano e dell'accompagnamento rispetto a ciò che suoni.",
        "LESSON → Speak: guida vocale alla diteggiatura.",
        "OTHER: effetto del pedale (Jack), contrasto del display (Contrast), avviso di accensione (Demo2), arpeggio mantenuto (ArpegHld).",
        "L'elenco completo delle 13 funzioni del menu è nella pagina I-4, sotto “Dal manuale” → “Funzioni del pulsante FUNCTION”.",
      ] },
      { titolo: "Combinazioni", note: [
        "{16} + {29}: formattazione della scheda di memoria.",
        "{27} + {29}: riproduzione continua di un suono campionato.",
      ] },
    ],
  },
  30: { intro: "Diffusori incorporati. Si escludono collegando le cuffie a {45}.", sezioni: [] },
  31: { intro: "Elenco dei brani della banca di brani stampato sul pannello. I brani si scelgono con {15}; la lista completa è a pagina I-68.", sezioni: [] },
  32: {
    intro: "Il display mostra numeri e nomi di timbri, ritmi e brani, il pentagramma con le note, la diteggiatura, il tempo, la misura e gli indicatori delle funzioni attive.",
    sezioni: [ { note: [
      "Il contrasto si regola da {29} (FUNCTION) → “OTHER” → [9] (ENTER) → “Contrast”, con valori da 01 a 17.",
      "Quando le pile sono quasi scariche lampeggia l'indicatore di pila debole.",
    ] } ],
  },
  33: { intro: "Elenco dei brani preinstallati (MUSIC PRESET) stampato sul pannello. Si richiamano tenendo premuto {13}.", sezioni: [] },
  34: { intro: "Elenco dei ritmi stampato sul pannello. I ritmi si scelgono con {14}; la lista completa è nell'Appendice.", sezioni: [] },
  35: { intro: "Elenco dei timbri stampato sul pannello. I timbri si scelgono con {13}; la lista completa è nell'Appendice.", sezioni: [] },
  36: {
    intro: "Nomi delle note fondamentali stampati sopra la parte sinistra della tastiera, usata come tastiera degli accordi.",
    sezioni: [ { note: [
      "Servono con l'auto-accompagnamento ({11}) e con il libro di accordi ({28}) per trovare la nota fondamentale dell'accordo.",
    ] } ],
  },
  37: {
    intro: "Indica quale strumento a percussione suona ciascun tasto quando è selezionato un set batteria.",
    sezioni: [ { note: [ "I set batteria si scelgono come gli altri timbri, con {13}." ] } ],
  },
  38: {
    intro: "Slot per la scheda di memoria SD o SDHC (fino a 32 GB).",
    sezioni: [
      { titolo: "Inserire e togliere la scheda", passi: [
        "Con il lato superiore della scheda rivolto verso l'alto, inserirla nello slot finché si blocca con un clic.",
        "Per toglierla, premerla e rilasciarla: viene espulsa in parte e si può estrarre.",
      ], note: [
        "Non forzare la scheda nello slot e non toccarne i contatti.",
        "Non togliere la scheda e non usare la tastiera mentre si salvano o caricano dati.",
        "Prima dell'uso formattare la scheda sulla tastiera ({16} + {29}).",
      ] },
    ],
  },
  39: {
    intro: "Porta USB per collegare la tastiera al computer e scambiare dati MIDI.",
    sezioni: [
      { titolo: "Collegare il computer", passi: [
        "Spegnere la tastiera e accendere il computer, senza avviare ancora il software musicale.",
        "Collegare un cavo USB tipo A-B dal computer alla porta USB della tastiera.",
        "Accendere la tastiera: al primo collegamento il computer installa da solo il driver.",
        "Avviare il software musicale.",
      ], note: [
        "Dal computer si possono anche caricare nuovi brani nella tastiera (pagina I-62).",
      ] },
    ],
  },
  40: {
    intro: "Presa per un pedale opzionale.",
    sezioni: [
      { titolo: "Effetto del pedale", passi: [
        "{29} (FUNCTION) → “OTHER” → [9] (ENTER) → “Jack”.",
        "Con [–] e [+] scegliere l'effetto.",
      ], note: [
        "SUS (sustain): prolunga le note mentre il pedale è premuto.",
        "SoS (sostenuto): prolunga solo le note già premute quando si preme il pedale.",
        "SFt (sordina): attenua leggermente le note.",
        "rHy (ritmo): il pedale avvia e ferma l'accompagnamento o il brano.",
      ] },
    ],
  },
  41: {
    intro: "Regola il volume del microfono collegato a {42}.",
    sezioni: [ { note: [
      "Si usa per il campionamento dei suoni e per il Karaoke ({4}).",
      "Dopo l'accensione servono alcuni secondi prima che il microfono funzioni.",
    ] } ],
  },
  42: {
    intro: "Presa per il microfono: serve per cantare con il Karaoke e per campionare suoni.",
    sezioni: [
      { titolo: "Collegare il microfono", passi: [
        "Spegnere microfono e tastiera.",
        "Collegare il microfono a {42}.",
        "Abbassare il volume della tastiera.",
        "Accendere il microfono e poi la tastiera.",
        "Regolare il livello con {41}.",
      ] },
      { titolo: "Campionare un suono", passi: [
        "Premere {13} (TONE) e scegliere un numero di timbro tra 601 e 605.",
        "Premere {27} e {28} insieme: appare “Waiting”.",
        "Emettere il suono verso il microfono: il campionamento parte da solo.",
        "Premere di nuovo {27} e {28} insieme per fermarlo (si ferma comunque dopo 10 secondi).",
        "Suonare: il Do centrale (C4) riproduce il suono originale, gli altri tasti lo suonano più acuto o più grave.",
      ], note: [
        "Si possono memorizzare fino a cinque suoni (timbri 601-605). Un nuovo campionamento cancella il suono già presente con lo stesso numero.",
        "I suoni sono registrati in mono. I suoni che arrivano da {43} non si possono campionare.",
      ] },
    ],
  },
  43: {
    intro: "Ingresso audio per un lettore esterno: il suono esce dai diffusori della tastiera.",
    sezioni: [ { note: [ "Non è possibile campionare i suoni che entrano da questa presa: per campionare usare il microfono su {42}." ] } ],
  },
  44: {
    intro: "Presa per il trasformatore CA.",
    sezioni: [
      { note: [
        "Usare solo il trasformatore CASIO AD-E95100L, che si acquista a parte.",
        "Spegnere la tastiera prima di collegarlo o scollegarlo.",
        "Il trasformatore si scalda dopo un uso prolungato: è normale.",
        "In alternativa la tastiera funziona con sei pile AA (non ricaricabili, non Oxyride o al nichel).",
      ] },
    ],
  },
  45: {
    intro: "Presa per cuffie o per un amplificatore esterno. Con le cuffie collegate i diffusori si escludono.",
    sezioni: [ { note: [
      "Abbassare il volume ({2}) prima di collegare le cuffie.",
      "Non ascoltare in cuffia a volume alto per molto tempo.",
      "Se le cuffie usano un adattatore, non lasciarlo nella presa quando si tolgono le cuffie.",
    ] } ],
  },
};
