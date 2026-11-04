import { useState } from "react";
import { PRESET_GUESS } from "../data/presetGuess.js";
import { SONG_BANK } from "../data/songbank.js";

// Pagina di una lista dell'Appendice (timbri, batteria, ritmi, brani preinstallati) con ricerca.
export default function AppendixPage({ section }) {
  const [q, setQ] = useState("");
  const [set, setSet] = useState(-1); // solo per la batteria: -1 = tutti i set
  const query = q.trim().toLowerCase();

  if (section.kind === "drums") {
    const cols = section.columns.slice(2);
    const shown = set < 0 ? cols.map((_, i) => i) : [set];
    const rows = section.rows.filter(
      (r) => !query || r.key.toLowerCase() === query || r.note === query || shown.some((i) => r.cells[i].toLowerCase().includes(query))
    );
    return (
      <div className="appx">
        <div className="appx-tools">
          <label>
            <span>Cerca</span>
            <input id="appx-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Suono, tasto (es. C4) o numero di nota" />
          </label>
          <label>
            <span>Set</span>
            <select id="appx-set" value={set} onChange={(e) => setSet(Number(e.target.value))}>
              <option value={-1}>Tutti i set</option>
              {cols.map((c, i) => <option key={i} value={i}>{c}</option>)}
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
                {shown.map((i) => <th key={i}>{cols[i]}</th>)}
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
  if (section.id === "preset") return <PresetPage section={section} q={q} setQ={setQ} query={query} />;
  const rows = filterRows(section.items, query, null);
  return (
    <div className="appx">
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
    const g = guess && guess[it.n] ? guess[it.n].join(" ").toLowerCase() : "";
    const hay = [it.n, it.name, cat, ...(it.cols || [])].join(" ").toLowerCase();
    if (!query || hay.includes(query) || g.includes(query)) out.push({ ...it, catName: cat });
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
function PresetPage({ section, q, setQ, query }) {
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
        </section>
        <section className="cmp cmp-bank">
          <h2>Banca di brani <span>SONG BANK · 001–162</span></h2>
          <p>Si apre con <b>SONG BANK</b> e si avvia con PLAY/STOP. Sono brani completi che la tastiera suona da sola:
            si possono ascoltare, suonare insieme e usare per le lezioni. 001–102 brani, 103–152 esercizi,
            153–162 brani caricati da te (scheda SD o computer).</p>
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
