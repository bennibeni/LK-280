import { useState } from "react";
import { PRESET_GUESS } from "../data/presetGuess.js";
import { SONG_BANK } from "../data/songbank.js";
import { norm } from "../search.js";

// Pagina di una lista dell'Appendice (timbri, batteria, ritmi, brani preinstallati) con ricerca.
export default function AppendixPage({ section, onOpen, initialQuery = "" }) {
  const [q, setQ] = useState(initialQuery);
  const [set, setSet] = useState(-1); // solo per la batteria: -1 = tutti i set
  const query = norm(q.trim());

  if (section.kind === "drums") {
    const cols = section.columns.slice(2);
    const shown = set < 0 ? cols.map((_, i) => i) : [set];
    const rows = section.rows.filter(
      (r) => !query || norm(r.key) === query || r.note === query || shown.some((i) => norm(r.cells[i]).includes(query))
    );
    return (
      <div className="appx">
        <Guide id="batteria" onOpen={onOpen} />
        <div className="appx-tools">
          <label>
            <span>Cerca</span>
            <input id="appx-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Suono, tasto (es. C4) o numero di nota" />
          </label>
          <label>
            <span>Set</span>
            <select id="appx-set" value={set} onChange={(e) => setSet(Number(e.target.value))}>
              <option value={-1}>Tutti i set</option>
              {cols.map((c, i) => <option key={i} value={i}>{584 + i} {c}</option>)}
            </select>
          </label>
          <span className="appx-count">{rows.length} tasti</span>
        </div>
        <p className="appx-note">{section.note}</p>
        <div className="table-wrap appx-scroll">
          <table className="mtable drums">
            <thead>
              <tr>
                <th className="stick">{section.columns[0]}</th>
                <th className="stick2">{section.columns[1]}</th>
                {shown.map((i) => <th key={i}><span className="setno">{584 + i}</span> {cols[i]}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.note}>
                  <td className="stick mono">{r.key}</td>
                  <td className="stick2 mono">{r.note}</td>
                  {shown.map((i) => (
                    <td key={i} className={r.cells[i] === "»" ? "same" : ""}>
                      {r.cells[i] === "»" && set >= 0 ? `» ${r.cells[0]}` : r.cells[i]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // liste numerate con categorie
  if (section.id === "preset") return <PresetPage section={section} q={q} setQ={setQ} query={query} onOpen={onOpen} />;
  const rows = filterRows(section.items, query, null);
  return (
    <div className="appx">
      <Guide id={section.id} onOpen={onOpen} />
      <Search q={q} setQ={setQ} placeholder="Numero, nome o categoria" count={rows.filter((r) => r.n).length} />
      <ListTable columns={section.columns} rows={rows} query={query} />
    </div>
  );
}

function Search({ q, setQ, placeholder, count }) {
  return (
    <div className="appx-tools">
      <label>
        <span>Cerca</span>
        <input id="appx-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={placeholder} />
      </label>
      {count != null && <span className="appx-count">{count} voci</span>}
    </div>
  );
}

// Righe visibili: con una ricerca attiva si nascondono le intestazioni di categoria.
function filterRows(items, query, guess) {
  let cat = "";
  const out = [];
  for (const it of items) {
    if (it.cat) { cat = it.cat; if (!query) out.push(it); continue; }
    const g = guess && guess[it.n] ? norm(guess[it.n].join(" ")) : "";
    const hay = norm([it.n, it.name, cat, ...(it.cols || [])].join(" "));
    if (!query || query.split(/\s+/).every((w) => hay.includes(w) || g.includes(w))) out.push({ ...it, catName: cat });
  }
  return out;
}

function ListTable({ columns, rows, query, guess, tone }) {
  const ncols = columns.length + (guess ? 2 : 0) + (query ? 1 : 0);
  return (
    <div className="table-wrap">
      <table className={"mtable appx-list" + (tone ? " tone-" + tone : "")}>
        <thead>
          <tr>
            {columns.map((c, i) => <th key={i} className={i > 1 ? "num" : ""}>{c}</th>)}
            {guess && <th className="guess-h">Titolo probabile</th>}
            {guess && <th className="guess-h">Autore probabile</th>}
            {query && <th>Categoria</th>}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr><td colSpan={ncols} className="muted">Nessuna voce corrisponde alla ricerca.</td></tr>
          )}
          {rows.map((r, i) =>
            r.cat ? (
              <tr key={"c" + i} className="cat"><td colSpan={ncols}>{r.cat}</td></tr>
            ) : (
              <tr key={r.n + "-" + i} className="item">
                <td className="mono">{r.n}</td>
                <td>{r.name}</td>
                {columns.length > 2 && (r.cols || []).map((c, j) => <td key={j} className="num mono">{c}</td>)}
                {guess && <td className="guess">{guess[r.n]?.[0] || ""}</td>}
                {guess && <td className="guess muted">{guess[r.n]?.[1] || ""}</td>}
                {query && <td className="muted">{r.catName}</td>}
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

// Pagina Preset: spiega la differenza con la banca di brani e mostra le due liste con colori diversi.
const BASE = import.meta.env.BASE_URL;

// Ingrandimento di un pulsante (ritaglio del disegno del pannello, pagina I-4; pulsante evidenziato in rosso); clic = scheda del comando.
function Zoom({ img, n, caption, onOpen, w, h }) {
  return (
    <figure className="zoom">
      <button onClick={() => onOpen?.(n)} title="Apri la scheda del comando">
        <img src={BASE + img} alt={caption} width={w} height={h} style={{ maxWidth: Math.round(w * 0.6) }} />
      </button>
      <figcaption><span className="znum">{n}</span>{caption}</figcaption>
    </figure>
  );
}

// Spiegazioni e ingrandimenti dei pulsanti per le pagine Timbri, Batteria e Ritmi.
const GUIDES = {
  timbri: {
    title: "Come scegliere un timbro",
    text: [
      <>Il <b>timbro</b> è il suono di strumento della tastiera. Premi <b>TONE</b> e digita il numero a tre cifre
        col tastierino (per esempio 0, 0, 1 per STEREO GRAND PIANO): il nome compare sul display. <b>PIANO/ORGAN</b> richiama
        con un tocco un pianoforte (001) o un organo (079).</>,
      <>I numeri sono divisi così: <b>001–455</b> timbri della tastiera, <b>456–583</b> timbri General MIDI,
        <b> 584–600</b> set di batteria (vedi la scheda Batteria), <b>601–605</b> suoni campionati da te col microfono,
        <b> 606–608</b> set di batteria campionati.</>,
      <><b>Cambiamento programma</b> e <b>MSB di selezione banco</b> sono i numeri MIDI del timbro: servono solo per
        sceglierlo da un computer collegato via USB (prima il banco, poi il programma). Per suonare dalla tastiera basta il numero.</>,
    ],
    zooms: [
      { img: "img/zoom-tone.webp", n: 13, w: 1000, h: 572, caption: "1. Premi TONE e digita il numero" },
      { img: "img/zoom-pianoorgan.webp", n: 27, w: 1055, h: 327, caption: "Oppure PIANO/ORGAN: pianoforte o organo con un tocco" },
    ],
  },
  batteria: {
    title: "Come suonare un set di batteria",
    text: [
      <>Premi <b>TONE</b> e scegli un numero tra <b>584 e 600</b> (per esempio 584 STANDARD SET 1): ogni tasto suona
        una percussione diversa. I simboli stampati sotto i tasti ricordano quale.</>,
      <>La tabella dice che suono c'è su ogni tasto in ciascuno dei 17 set; il numero accanto al nome del set è quello
        da digitare. <b>»</b> vuol dire "stesso suono di STANDARD SET 1"; scegliendo un solo set nel menu compare il nome del suono.
        I set di batteria campionati (606–608) li crei tu col microfono.</>,
    ],
    zooms: [
      { img: "img/zoom-tone.webp", n: 13, w: 1000, h: 572, caption: "1. Premi TONE e digita 584–600" },
      { img: "img/zoom-drumstrip.webp", n: 37, w: 1111, h: 311, caption: "I simboli sotto i tasti indicano la percussione" },
    ],
  },
  ritmi: {
    title: "Come avviare un ritmo",
    text: [
      <>Premi <b>RHYTHM</b> e digita il numero a tre cifre del ritmo, poi <b>START/STOP</b> per avviarlo e fermarlo.
        Così suona solo la batteria del ritmo.</>,
      <>Con <b>ACCOMP</b> (il pulsante PART SELECT) la parte sinistra della tastiera diventa la tastiera degli accordi:
        suonando un accordo si aggiungono basso e armonia. Tenendo premuto RHYTHM si applica la preselezione One-Touch
        (timbro e tempo adatti al ritmo).</>,
    ],
    zooms: [
      { img: "img/zoom-rhythm.webp", n: 14, w: 1000, h: 572, caption: "1. Premi RHYTHM e digita il numero" },
      { img: "img/zoom-playstop.webp", n: 10, w: 1111, h: 269, caption: "2. Avvia e ferma con START/STOP" },
      { img: "img/zoom-accomp.webp", n: 11, w: 1111, h: 269, caption: "3. ACCOMP aggiunge basso e armonia agli accordi" },
    ],
  },
};

function Guide({ id, onOpen }) {
  const g = GUIDES[id];
  if (!g) return null;
  return (
    <section className="guide">
      <div className="guide-text">
        <h2>{g.title}</h2>
        {g.text.map((t, i) => <p key={i}>{t}</p>)}
      </div>
      <div className="zooms guide-zooms">
        {g.zooms.map((z) => <Zoom key={z.img + z.n} {...z} onOpen={onOpen} />)}
      </div>
    </section>
  );
}

function PresetPage({ section, q, setQ, query, onOpen }) {
  const presetRows = filterRows(section.items, query, PRESET_GUESS);
  const bankRows = filterRows(SONG_BANK.items, query, null);
  const nP = presetRows.filter((r) => r.n).length;
  const nB = bankRows.filter((r) => r.n).length;
  return (
    <div className="appx">
      <div className="compare">
        <section className="cmp cmp-preset">
          <h2>Brani preinstallati <span>Music Preset · 001–305</span></h2>
          <p>Si aprono <b>tenendo premuto TONE</b>. Non sono brani da ascoltare: ognuno è una configurazione pronta
            (timbro, ritmo, tempo e progressione di accordi) ispirata a un brano. La tastiera aspetta che tu suoni un
            accordo con la sinistra, poi parte l'accompagnamento e la melodia la suoni tu.</p>
          <div className="zooms">
            <Zoom img="img/zoom-tone.webp" n={13} w={1000} h={572} onOpen={onOpen} caption="Tieni premuto TONE, poi digita il numero" />
          </div>
        </section>
        <section className="cmp cmp-bank">
          <h2>Banca di brani <span>SONG BANK · 001–162</span></h2>
          <p>Si apre con <b>SONG BANK</b> e si avvia con PLAY/STOP. Sono brani completi che la tastiera suona da sola:
            si possono ascoltare, suonare insieme e usare per le lezioni. 001–102 brani, 103–152 esercizi,
            153–162 brani caricati da te (scheda SD o computer).</p>
          <div className="zooms">
            <Zoom img="img/zoom-songbank.webp" n={15} w={1000} h={572} onOpen={onOpen} caption="1. Premi SONG BANK e digita il numero" />
            <Zoom img="img/zoom-playstop.webp" n={10} w={1111} h={269} onOpen={onOpen} caption="2. Avvia e ferma con PLAY/STOP" />
          </div>
        </section>
      </div>
      <p className="appx-note">Lo stesso numero indica cose diverse nelle due liste: con SONG BANK il 005 è LONG LONG AGO,
        tenendo premuto TONE è ILoveHer; il 199 esiste solo tra i brani preinstallati.</p>

      <Search q={q} setQ={setQ} placeholder="Numero, nome, titolo, autore o categoria" />

      <h2 className="list-h tone-preset-h">Brani preinstallati <span>{nP} voci</span></h2>
      <p className="appx-note">
        Casio pubblica solo i nomi abbreviati del display. <b>Titolo probabile</b> e <b>Autore probabile</b> sono ipotesi
        ricavate da quelle abbreviazioni, non dati ufficiali; dove l'abbreviazione non è chiara sono vuoti.
      </p>
      <ListTable columns={section.columns} rows={presetRows} query={query} guess={PRESET_GUESS} tone="preset" />

      <h2 className="list-h tone-bank-h">Banca di brani <span>{nB} voci</span></h2>
      <ListTable columns={SONG_BANK.columns} rows={bankRows} query={query} tone="bank" />
    </div>
  );
}
