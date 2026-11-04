import { useEffect, useState } from "react";
import { FIGURES } from "./data/figures.js";
import { APPENDIX } from "./data/appendix.js";
import Figure from "./components/Figure.jsx";
import Legend from "./components/Legend.jsx";
import DetailModal from "./components/DetailModal.jsx";
import ManualText from "./components/ManualText.jsx";
import AppendixPage from "./components/AppendixPage.jsx";

// Pagine dell'app: le figure del manuale, poi le liste dell'Appendice.
const PAGES = [
  ...FIGURES.map((f) => ({ ...f, type: "fig", tab: f.page })),
  ...APPENDIX.map((a) => ({ ...a, type: "appx" })),
];

// La pagina corrente è nell'hash (#fig-20, #timbri) così ogni pagina ha un suo indirizzo.
function indexFromHash() {
  const id = window.location.hash.slice(1);
  const i = PAGES.findIndex((p) => p.id === id);
  return i >= 0 ? i : 0;
}

export default function App() {
  const [index, setIndex] = useState(indexFromHash);
  const [active, setActive] = useState(null); // comando evidenziato (hover/focus)
  const [open, setOpen] = useState(null); // comando mostrato nella modale
  const page = PAGES[index];

  const go = (j) => {
    if (j >= 0 && j < PAGES.length) {
      setIndex(j);
      setActive(null);
    }
  };

  useEffect(() => {
    if (window.location.hash.slice(1) !== page.id) {
      history.replaceState(null, "", "#" + page.id);
    }
  }, [page.id]);

  useEffect(() => {
    const onHash = () => {
      setIndex(indexFromHash());
      setActive(null);
    };
    const onKey = (e) => {
      if (open != null) return; // la modale gestisce i propri tasti
      if (/INPUT|SELECT|TEXTAREA/.test(e.target?.tagName || "")) return;
      if (e.key === "ArrowRight") go(index + 1);
      if (e.key === "ArrowLeft") go(index - 1);
    };
    window.addEventListener("hashchange", onHash);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("keydown", onKey);
    };
  }, [index, open]);

  const isFig = page.type === "fig";
  const numbers = isFig ? [...new Set(page.dots.map((d) => d[0]))] : [];
  const firstAppx = FIGURES.length;

  let eyebrow;
  if (isFig) {
    eyebrow = `Figura ${index + 1} di ${FIGURES.length}` +
      (page.page.startsWith("I-") ? ` · pagina ${page.page}` : " · foto") + ` · ${numbers.length} comandi`;
  } else {
    eyebrow = `Appendice · lista ${index - firstAppx + 1} di ${APPENDIX.length}`;
  }

  return (
    <>
      <header className="bar">
        <div className="bar-in">
          <div className="brand">
            LK<span>·</span>280
          </div>
          <nav className="tabs" aria-label="Pagine">
            {PAGES.map((p, j) => (
              <button
                key={p.id}
                className={"tab" + (j === firstAppx ? " tab-sep" : "") + (p.type === "appx" ? " tab-appx" : "")}
                aria-current={j === index ? "true" : "false"}
                title={p.title}
                onClick={() => go(j)}
              >
                {p.tab}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <div className={"wrap" + (page.markers ? " full" : "")}>
          <div className="head">
            <div>
              <div className="eyebrow">{eyebrow}</div>
              <h1>{page.title}</h1>
            </div>
            <div className="nav">
              <button onClick={() => go(index - 1)} disabled={index === 0}>
                ← Precedente
              </button>
              <button onClick={() => go(index + 1)} disabled={index === PAGES.length - 1}>
                Successiva →
              </button>
            </div>
          </div>

          {isFig ? (
            <>
              <div className={"grid" + (page.markers ? " stacked" : "")}>
                <Figure fig={page} active={active} setActive={setActive} onOpen={setOpen} />
                <Legend numbers={numbers} active={active} setActive={setActive} onOpen={setOpen} />
              </div>
              <ManualText key={page.id} figId={page.id} onNavigate={setOpen} />
            </>
          ) : (
            <AppendixPage key={page.id} section={page} />
          )}
        </div>
      </main>

      {open != null && <DetailModal n={open} onNavigate={setOpen} onClose={() => setOpen(null)} />}
    </>
  );
}
