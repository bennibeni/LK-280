# LK-280 Pannello Comandi

Applicazione React (Vite) che mostra le figure del manuale della tastiera Casio LK-280, una per pagina.
Ogni pallino numerato ha:

- un **tooltip** con una descrizione sintetica (al passaggio del mouse o con il focus da tastiera);
- una **modale** con la descrizione completa (al clic), ricavata dalla Guida dell'utilizzatore.

## Avvio

```bash
npm install
npm run dev      # sviluppo su http://localhost:5173
npm run build    # build statica in dist/
npm run preview  # anteprima della build
```

## Struttura

```
public/img/            figure ritagliate dal manuale e foto della tastiera (webp)
src/data/figures.js    figure: titolo, pagina, immagine, posizione dei pallini
src/data/controls.js   i 45 comandi: nome, descrizione sintetica, pagine
src/data/details.js    descrizioni complete per la modale
src/data/extra.js      testi del manuale non coperti dalle schede, mostrati in fondo a ogni pagina
src/data/appendix.js   le 4 liste dell'Appendice (solo italiano): timbri, batteria, ritmi, brani preinstallati
src/components/        Figure (immagine + pallini + tooltip), Legend, DetailModal, ManualText, RichText, AppendixPage, SearchBox, HowtoPage
src/App.jsx            navigazione tra le pagine (frecce, schede, hash #come, #fig-N, #timbri…)
src/search.js          indice e punteggio della ricerca globale
src/data/howto.js      la pagina "Come fare per…" (operazioni comuni con passi e collegamenti)
```

### Coordinate dei pallini

In `figures.js` ogni pallino è `[numero, x, y]`, con `x` e `y` in percentuale rispetto all'immagine;
`r` è il raggio in percentuale della larghezza. Nelle figure del manuale le posizioni sono state estratte
dal PDF originale (i pallini sono glifi di un font dedicato), quindi coincidono con quelli stampati.
Con `markers: true` (la foto della tastiera) i pallini non sono stampati nell'immagine: l'app li disegna con il numero,
e le posizioni sono state ricavate confrontando la foto con il pannello frontale di pagina I-4.

### Testi della modale

In `details.js` ogni comando ha `intro` e una lista di `sezioni` con `passi` (numerati) e `note`.
Nei testi `{13}` diventa un pallino cliccabile che apre la scheda del comando 13.

### Testi "Dal manuale"

In fondo a ogni pagina, la sezione "Dal manuale" riporta le parti della Guida dell'utilizzatore
che non compaiono nelle schede dei comandi (procedure, tabelle, lista dei brani, guida alla diteggiatura),
ognuna richiudibile e con le pagine di riferimento. Sono in `src/data/extra.js`, chiave = id della figura.
Tipi di blocco: `h`, `step`, `li`, `p`, `row`, `kv` (voce/valore), `tr`/`thead` (righe di tabella), `img`.

### Appendice

Le quattro liste dell'Appendice separata hanno ciascuna una pagina, con in cima una spiegazione d'uso e gli
ingrandimenti dei pulsanti da premere (TONE, PIANO/ORGAN, RHYTHM, START/STOP, ACCOMP, simboli della batteria) (schede Timbri, Batteria, Ritmi, Preset,
indirizzi `#timbri`, `#batteria`, `#ritmi`, `#preset`), con ricerca per numero, nome o categoria.
Nella lista della batteria si può mostrare un solo set; « » » indica lo stesso suono di STANDARD SET 1.
La pagina Preset spiega la differenza tra brani preinstallati (TONE tenuto premuto) e banca di brani (SONG BANK)
con gli ingrandimenti dei pulsanti TONE, SONG BANK e PLAY/STOP ritagliati dal disegno del pannello a pagina I-4 (`public/img/zoom-*.webp`, cliccabili)
e mostra entrambe le liste con righe di colore diverso (ambra = preinstallati, azzurro = banca di brani;
dati della banca in `src/data/songbank.js`). Nella lista Preset le colonne "Titolo probabile" e "Autore probabile" vengono da `src/data/presetGuess.js`:
sono ipotesi ricavate dai nomi abbreviati (Casio non pubblica i titoli completi) e si possono correggere lì.
Le schede di TONE, RHYTHM, MUSIC PRESET e delle liste stampate rimandano alla lista corrispondente.

### Ricerca e "Come fare"

- La casella in alto cerca in schede dei comandi, testi "Dal manuale", "Come fare", figure e liste dell'Appendice
  (anche senza accenti; tasto `/` per andarci). Il risultato porta alla scheda, apre la sezione giusta o filtra la lista.
- La pagina iniziale `#come` raccoglie le operazioni più comuni; i collegamenti usano `{ page, section, query, control }`.
  Ogni scheda mostra un ritaglio della tastiera (`MiniMap.jsx`) con i pallini citati nei passi: foto per i comandi 1–37,
  pannello posteriore (fig. I-6) per 38–45.
- Nei testi "Dal manuale" le schermate del display sono ritagliate dal PDF (`public/img/lcd-*.webp`, blocco `img` con `cls: "lcdimg"`),
  inserite con lo script `displays.py` accanto al passo che le cita; le poche rimaste testuali compaiono come riquadri verdi (blocco `lcd`).

## Navigazione

- Schede in alto (numero di pagina del manuale), pulsanti Precedente/Successiva, frecce ← →.
- Ogni figura ha un indirizzo: `#fig-5`, `#fig-20`, …
- Nella modale: Esc chiude, i pulsanti in basso passano al comando precedente o successivo.
