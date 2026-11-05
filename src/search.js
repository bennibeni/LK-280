// Indice per la ricerca globale: schede dei comandi, testi "Dal manuale", "Come fare", figure e liste dell'Appendice.
import { CONTROLS } from "./data/controls.js";
import { DETAILS } from "./data/details.js";
import { EXTRA } from "./data/extra.js";
import { FIGURES } from "./data/figures.js";
import { APPENDIX } from "./data/appendix.js";
import { SONG_BANK } from "./data/songbank.js";
import { PRESET_GUESS } from "./data/presetGuess.js";
import { HOWTO } from "./data/howto.js";

export const norm = (s) =>
  (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[’']/g, "'");

const clean = (s) =>
  (s || "")
    .replace(/\{(\d+)\}\s*\(([^)]*)\)/g, "$2")
    .replace(/\{(\d+)\}/g, (_, n) => (CONTROLS[n] ? CONTROLS[n][0].split(" · ")[0] : n));

function blockText(b) {
  if (b.text) return b.text;
  if (b.alt) return b.alt;
  if (b.cells) return b.cells.join(" ");
  if (b.k) return b.k + " " + b.v;
  if (b.rows) return b.rows.map((r) => [r.tipo, r.esempio, r.text].join(" ")).join(" ");
  return "";
}

const figTitle = Object.fromEntries(FIGURES.map((f) => [f.id, `${f.page.startsWith("I-") ? f.page + " " : ""}${f.title}`]));

function build() {
  const E = [];
  // Come fare
  for (const h of HOWTO) {
    E.push({ kind: "Come fare", title: h.title, where: "Come fare per…", text: clean(h.steps.join(" ")), target: { page: "come", section: h.id }, w: 3 });
  }
  // Schede dei comandi
  for (const [n, [name, desc, pages]] of Object.entries(CONTROLS)) {
    const d = DETAILS[n];
    const body = d ? [d.intro, ...d.sezioni.flatMap((s) => [s.titolo, ...(s.passi || []), ...(s.note || [])])].join(" ") : desc;
    E.push({ kind: "Comando", title: `${n} · ${name}`, where: pages ? `scheda · pag. ${pages}` : "scheda", text: clean(desc + " " + body), target: { control: Number(n) }, w: 3 });
  }
  // Testi "Dal manuale"
  for (const [fig, secs] of Object.entries(EXTRA)) {
    for (const s of secs) {
      E.push({ kind: "Dal manuale", title: s.title, where: `${figTitle[fig]} · pag. ${s.pages.join("–")}`,
        text: clean(s.blocks.map(blockText).join(" ")), target: { page: fig, section: s.title }, w: 2 });
    }
  }
  // Figure
  for (const f of FIGURES) E.push({ kind: "Figura", title: f.title, where: f.page, text: "", target: { page: f.id }, w: 2 });
  // Liste dell'Appendice
  for (const a of APPENDIX) {
    E.push({ kind: "Lista", title: a.title, where: "Appendice", text: "", target: { page: a.id }, w: 2 });
    if (a.kind === "list") {
      let cat = "";
      const label = { timbri: "Timbro", ritmi: "Ritmo", preset: "Preset" }[a.id];
      for (const it of a.items) {
        if (it.cat) { cat = it.cat; continue; }
        const g = a.id === "preset" && PRESET_GUESS[it.n] ? ` (${PRESET_GUESS[it.n][0]} – ${PRESET_GUESS[it.n][1]})` : "";
        E.push({ kind: label, title: `${it.n} ${it.name}${g}`, where: `${a.title} · ${cat}`, text: cat, target: { page: a.id, query: it.n }, w: 1 });
      }
    } else {
      // batteria: un risultato per suono distinto
      const seen = new Set();
      for (const r of a.rows) {
        r.cells.forEach((c, i) => {
          if (!c || c === "»" || seen.has(c)) return;
          seen.add(c);
          E.push({ kind: "Batteria", title: c, where: `tasto ${r.key} · ${584 + i} ${a.columns[2 + i]}`, text: "", target: { page: a.id, query: c }, w: 1 });
        });
      }
    }
  }
  for (const it of SONG_BANK.items) {
    if (it.n) E.push({ kind: "Banca di brani", title: `${it.n} ${it.name}`, where: "SONG BANK", text: "", target: { page: "preset", query: it.name }, w: 1 });
  }
  for (const e of E) { e.nt = norm(e.title); e.nx = norm(e.text); }
  return E;
}

let INDEX = null;

export function search(q, limit = 14) {
  INDEX = INDEX || build();
  const words = norm(q).split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  const res = [];
  for (const e of INDEX) {
    let score = 0, ok = true;
    for (const w of words) {
      const t = e.nt.indexOf(w);
      if (t >= 0) score += t === 0 ? 6 : 4;
      else if (e.nx.includes(w)) score += 1;
      else { ok = false; break; }
    }
    if (ok) res.push({ e, score: score * e.w });
  }
  res.sort((a, b) => b.score - a.score || a.e.title.length - b.e.title.length);
  return res.slice(0, limit).map((r) => ({ ...r.e, snippet: snippet(r.e, words) }));
}

function snippet(e, words) {
  if (!e.text || words.some((w) => e.nt.includes(w))) return "";
  const i = e.nx.indexOf(words[0]);
  if (i < 0) return "";
  const a = Math.max(0, i - 50);
  return (a > 0 ? "…" : "") + e.text.slice(a, i + 80) + "…";
}
