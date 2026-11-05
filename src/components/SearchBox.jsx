import { useEffect, useMemo, useRef, useState } from "react";
import { search } from "../search.js";

// Ricerca globale nella barra in alto: schede, testi del manuale, "Come fare", liste.
export default function SearchBox({ onGo }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [sel, setSel] = useState(0);
  const boxRef = useRef(null);
  const results = useMemo(() => (q.trim().length >= 2 ? search(q) : []), [q]);

  useEffect(() => setSel(0), [q]);
  useEffect(() => {
    const onDoc = (e) => { if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => {
      if (e.key === "/" && !/INPUT|SELECT|TEXTAREA/.test(document.activeElement?.tagName || "")) {
        e.preventDefault(); boxRef.current?.querySelector("input")?.focus();
      }
    };
    document.addEventListener("mousedown", onDoc);
    window.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); window.removeEventListener("keydown", onKey); };
  }, []);

  const go = (r) => { onGo(r.target); setOpen(false); };
  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSel((s) => Math.min(s + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
    else if (e.key === "Enter" && results[sel]) { e.preventDefault(); go(results[sel]); }
    else if (e.key === "Escape") { setOpen(false); e.currentTarget.blur(); }
  };

  return (
    <div className="gsearch" ref={boxRef}>
      <input
        id="global-search"
        type="search"
        value={q}
        placeholder="Cerca nel manuale (es. trasposizione, Err Format, Fur Elise)…"
        aria-label="Cerca nel manuale"
        autoComplete="off"
        onChange={(e) => { setQ(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
      />
      {open && q.trim().length >= 2 && (
        <div className="gresults" role="listbox">
          {results.length === 0 && <div className="gempty">Nessun risultato per “{q}”.</div>}
          {results.map((r, i) => (
            <button
              key={i}
              role="option"
              aria-selected={i === sel}
              className={"gres" + (i === sel ? " on" : "")}
              onMouseEnter={() => setSel(i)}
              onClick={() => go(r)}
            >
              <span className="gkind">{r.kind}</span>
              <span className="gtitle">{r.title}</span>
              <span className="gwhere">{r.where}</span>
              {r.snippet && <span className="gsnip">{r.snippet}</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
