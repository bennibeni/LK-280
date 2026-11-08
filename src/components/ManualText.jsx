import { useEffect, useState } from "react";
import { EXTRA } from "../data/extra.js";
import RichText from "./RichText.jsx";

const BASE = import.meta.env.BASE_URL;

// Raggruppa i blocchi consecutivi dello stesso tipo (passi, punti, righe di tabella).
function group(blocks) {
  const out = [];
  for (const b of blocks) {
    const kind = b.t === "step" ? "ol" : b.t === "li" ? "ul" : b.t === "kv" ? "dl" : ["tr", "thead"].includes(b.t) ? "table" : null;
    const last = out[out.length - 1];
    if (kind && last && last.kind === kind) last.items.push(b);
    else if (b.t === "h" && last && last.kind === "table") last.items.push(b); // categoria dentro una tabella
    else out.push(kind ? { kind, items: [b] } : { kind: b.t, item: b });
  }
  return out;
}

// Celle con più rimedi ("• a • b") diventano un piccolo elenco.
function Cell({ text, rt }) {
  const items = text.split(/\s*•\s*/).filter(Boolean);
  if (!text.trim().startsWith("•") || items.length < 2) return rt(text.replace(/^•\s*/, ""));
  return <ul className="cell-list">{items.map((t, i) => <li key={i}>{rt(t)}</li>)}</ul>;
}

function Block({ g, onNavigate, onGo }) {
  const rt = (t) => <RichText text={t} onNavigate={onNavigate} onGo={onGo} />;
  switch (g.kind) {
    case "ol":
      return (
        <ol className="steps" start={g.items[0].n || 1}>
          {g.items.map((b, i) => (
            <li key={i} value={b.n || undefined}>{rt(b.text)}</li>
          ))}
        </ol>
      );
    case "ul":
      return <ul className="notes">{g.items.map((b, i) => <li key={i}>{rt(b.text)}</li>)}</ul>;
    case "dl":
      return (
        <dl className="kv">
          {g.items.map((b, i) => (
            <div key={i}>
              <dt>{b.k}</dt>
              <dd>{rt(b.v)}</dd>
            </div>
          ))}
        </dl>
      );
    case "table": {
      const width = Math.max(...g.items.filter((b) => b.cells).map((b) => b.cells.length));
      const head = g.items.find((b) => b.t === "thead");
      return (
        <div className="table-wrap">
          <table className="mtable">
            {head && (
              <thead>
                <tr>{head.cells.map((c, i) => <th key={i}>{c}</th>)}</tr>
              </thead>
            )}
            <tbody>
              {g.items
                .filter((b) => b.t !== "thead")
                .map((b, i) =>
                  b.t === "h" ? (
                    <tr key={i} className="cat"><td colSpan={width}>{b.text}</td></tr>
                  ) : (
                    <tr key={i}>{b.cells.map((c, j) => <td key={j}><Cell text={c} rt={rt} /></td>)}</tr>
                  )
                )}
            </tbody>
          </table>
        </div>
      );
    }
    case "chordtable":
      return (
        <div className="table-wrap">
          <table className="mtable chordtable">
            <caption>{g.item.caption}</caption>
            <thead>
              <tr><th>Tipo di accordo</th><th>Esempio</th></tr>
            </thead>
            <tbody>
              {g.item.rows.map((r, i) => (
                <tr key={i}>
                  <td><b>{r.tipo}</b><br />{rt(r.text)}</td>
                  <td>
                    <div className="ex">{r.esempio}</div>
                    <img src={BASE + r.img} alt={`Tasti da premere per ${r.esempio}`} loading="lazy" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "lcd":
      return <div className="lcd" title="Testo sul display">{g.item.text.split(" / ").map((t, i) => <span key={i}>{t}</span>)}</div>;
    case "h":
      return <h4>{g.item.text}</h4>;
    case "img":
      if (g.item.cls === "lcdimg")
        return (
          <figure className="lcdfig">
            <img src={BASE + g.item.src} alt={g.item.alt} title={g.item.alt} loading="lazy" style={{ width: g.item.w * 1.5 + "px" }} />
          </figure>
        );
      return <img className="mimg" src={BASE + g.item.src} alt={g.item.alt} loading="lazy" />;
    case "row":
      return <p className="row">{rt(g.item.text)}</p>;
    default:
      if (g.item.link) {
        const { text, page, section } = g.item.link;
        const start = g.item.text.indexOf(text);
        if (start >= 0) return <p>{rt(g.item.text.slice(0, start))}<a href={`#${page}`} onClick={(e) => { e.preventDefault(); onGo({ page, section }); }}>{text}</a>{rt(g.item.text.slice(start + text.length))}</p>;
      }
      return g.item.text === "↓" ? <div className="flow">↓</div> : <p>{rt(g.item.text)}</p>;
  }
}

// Testi del manuale non coperti dalle schede, in fondo alla pagina della figura.
export default function ManualText({ figId, onNavigate, onGo, focus }) {
  const sections = EXTRA[figId] || [];
  const [allOpen, setAllOpen] = useState(false);
  const [gen, setGen] = useState(0); // forza il ri-render dei <details> quando si apre/chiude tutto
  const target = focus?.section ? sections.findIndex((s) => s.title === focus.section) : -1;

  // Da ricerca o link: apre la sezione richiesta e la porta in vista.
  useEffect(() => {
    if (target < 0) return;
    const el = document.getElementById(`${figId}-sec-${target}`);
    if (!el) return;
    el.open = true;
    let flashTimer;
    const scrollTimer = setTimeout(() => {
      const heading = el.querySelector("summary");
      const bar = document.querySelector(".bar");
      const barStyle = bar && window.getComputedStyle(bar);
      const offset = bar ? bar.getBoundingClientRect().height + (parseFloat(barStyle.top) || 0) : 0;
      heading.style.scrollMarginTop = `${offset + 12}px`;
      heading.scrollIntoView({ behavior: "smooth", block: "start" });
      el.classList.add("flash");
      flashTimer = setTimeout(() => el.classList.remove("flash"), 1600);
    }, 60);
    return () => {
      clearTimeout(scrollTimer);
      clearTimeout(flashTimer);
      el.classList.remove("flash");
    };
  }, [target, focus?.tick]);

  if (!sections.length) return null;
  const toggleAll = () => {
    setAllOpen(!allOpen);
    setGen(gen + 1);
  };
  return (
    <section className="manual" aria-label="Dal manuale">
      <div className="manual-head">
        <h2>Dal manuale</h2>
        <p>Le parti del manuale che non compaiono nelle schede dei comandi.</p>
        <button onClick={toggleAll}>{allOpen ? "Chiudi tutto" : "Apri tutto"}</button>
      </div>
      {sections.map((s, i) => (
        <details key={`${figId}-${i}-${gen}`} id={`${figId}-sec-${i}`} open={allOpen || i === target}>
          <summary>
            <span className="st">{s.title}</span>
            <span className="sp">pag. {s.pages.length > 1 ? `${s.pages[0]}–${s.pages[s.pages.length - 1]}` : s.pages[0]}</span>
          </summary>
          <div className="manual-body">
            {group(s.blocks).map((g, k) => (
              <Block key={k} g={g} onNavigate={onNavigate} onGo={onGo} />
            ))}
          </div>
        </details>
      ))}
    </section>
  );
}
