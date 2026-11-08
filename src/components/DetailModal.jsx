import { Fragment, useEffect, useRef } from "react";
import RichText from "./RichText.jsx";
import { CONTROLS } from "../data/controls.js";
import { DETAILS } from "../data/details.js";
import { FIGURES } from "../data/figures.js";

// Su schermi larghi il pannello sta accanto alla figura (che resta usabile); su schermi stretti si sovrappone.
const SPLIT = window.matchMedia("(min-width: 1100px)");

// Comandi che hanno un elenco completo nell'Appendice.
const LISTS = {
  13: ["timbri", "Elenco dei timbri"], 35: ["timbri", "Elenco dei timbri"],
  14: ["ritmi", "Lista dei ritmi"], 34: ["ritmi", "Lista dei ritmi"],
  33: ["preset", "Lista dei brani preinstallati"],
  37: ["batteria", "Lista di assegnazione suoni di batteria"],
};

export default function DetailModal({ n, onNavigate, onClose, onGo }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const [name, , pages] = CONTROLS[n];
  const detail = DETAILS[n] || { intro: CONTROLS[n][1], sezioni: [] };
  const inFigures = FIGURES.filter((f) => f.dots.some((d) => d[0] === n));
  const list = LISTS[n];

  useEffect(() => {
    const prevFocus = document.activeElement;
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && dialogRef.current && !SPLIT.matches) {
        // focus trap
        const f = dialogRef.current.querySelectorAll("button, a[href]");
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.classList.add("modal-open");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("modal-open");
      prevFocus?.focus?.();
    };
  }, []);

  useEffect(() => {
    dialogRef.current?.querySelector(".modal-body")?.scrollTo(0, 0);
  }, [n]);

  return (
    <div className="backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal={SPLIT.matches ? "false" : "true"} aria-labelledby="modal-title" ref={dialogRef}>
        <div className="modal-head">
          <span className="badge big">{n}</span>
          <div className="modal-titles">
            <h2 id="modal-title">{name}</h2>
            {pages && <div className="modal-pages">Manuale, pag. {pages}</div>}
          </div>
          <button className="close" onClick={onClose} ref={closeRef} aria-label="Chiudi">
            ✕
          </button>
        </div>

        <div className="modal-body">
          <p className="intro">
            <RichText text={detail.intro} onNavigate={onNavigate} onGo={onGo} />
          </p>

          {detail.sezioni.map((s, i) => (
            <section key={i}>
              {s.titolo && <h3>{s.titolo}</h3>}
              {s.passi && (
                <ol className="steps">
                  {s.passi.map((t, k) => (
                    <li key={k}>
                      <RichText text={t} onNavigate={onNavigate} onGo={onGo} />
                    </li>
                  ))}
                </ol>
              )}
              {s.note && (
                <ul className="notes">
                  {s.note.map((t, k) => (
                    <li key={k}>
                      <RichText text={t} onNavigate={onNavigate} onGo={onGo} />
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {list && (
            <div className="seen">
              Elenco completo nell'Appendice:{" "}
              <a href={"#" + list[0]} onClick={onClose}>{list[1]}</a>
            </div>
          )}

          {inFigures.length > 0 && (
            <div className="seen">
              Compare nelle figure:{" "}
              {inFigures.map((f, i) => (
                <Fragment key={f.id}>
                  {i > 0 && ", "}
                  <a href={"#" + f.id} onClick={onClose}>
                    {f.page.startsWith("I-") ? `${f.page} ${f.title}` : f.title}
                  </a>
                </Fragment>
              ))}
            </div>
          )}
        </div>

        <div className="modal-foot">
          <button onClick={() => onNavigate(n - 1)} disabled={n <= 1}>
            ← {n > 1 ? `${n - 1} ${CONTROLS[n - 1][0]}` : ""}
          </button>
          <button onClick={() => onNavigate(n + 1)} disabled={n >= 45}>
            {n < 45 ? `${n + 1} ${CONTROLS[n + 1][0]}` : ""} →
          </button>
        </div>
      </div>
    </div>
  );
}
