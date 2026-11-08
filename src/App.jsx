import { useEffect, useState } from "react";
import { FIGURES } from "./data/figures.js";
import { APPENDIX } from "./data/appendix.js";
import Figure from "./components/Figure.jsx";
import Legend from "./components/Legend.jsx";
import DetailModal from "./components/DetailModal.jsx";
import ManualText from "./components/ManualText.jsx";
import AppendixPage from "./components/AppendixPage.jsx";
import HowtoPage from "./components/HowtoPage.jsx";
import SearchBox from "./components/SearchBox.jsx";

// Pagine dell'app: "Come fare", le figure del manuale, poi le liste dell'Appendice.
const PAGES = [
  { id: "come", type: "howto", tab: "Come fare", title: "Come fare per…" },
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
  const [focus, setFocus] = useState(null); // { section?, query?, tick } dove portare dopo una ricerca o un link
  const page = PAGES[index];

  const go = (j) => {
    if (j >= 0 && j < PAGES.length) {
      setIndex(j);
      setActive(null);
      setFocus(null);
    }
  };

  // Destinazione di ricerca e collegamenti: { page?, section?, query?, control? }
  const navigate = (t) => {
    if (t.page) {
      const j = PAGES.findIndex((p) => p.id === t.page);
      if (j >= 0) { setIndex(j); setActive(null); }
    }
    setFocus(t.section || t.query ? { section: t.section, query: t.query, tick: Date.now() } : null);
    if (t.control) setOpen(t.control);
    else if (t.page) setOpen(null);
    if (!t.section) window.scrollTo({ top: 0 });
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
      setFocus(null);
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
  const firstAppx = FIGURES.length + 1;

  let eyebrow;
  if (page.type === "howto") {
    eyebrow = "Guida rapida";
  } else if (isFig) {
    eyebrow = `Figura ${index} di ${FIGURES.length}` +
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
          <SearchBox onGo={navigate} />
          <nav className="tabs" aria-label="Pagine">
            {PAGES.map((p, j) => (
              <button
                key={p.id}
                className={"tab" + (j === firstAppx || j === 1 ? " tab-sep" : "") + (p.type !== "fig" ? " tab-appx" : "") + (p.type === "howto" ? " tab-home" : "")}
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
        <div className={"wrap" + (isFig ? " full" : "")}>
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

          {page.type === "howto" ? (
            <HowtoPage onOpen={setOpen} onGo={navigate} focus={focus?.section} />
          ) : isFig ? (
            <>
              <div className="grid stacked">
                <Figure fig={page} active={active} setActive={setActive} onOpen={setOpen} />
                <Legend numbers={numbers} active={active} setActive={setActive} onOpen={setOpen} />
              </div>
              <ManualText key={page.id} figId={page.id} onNavigate={setOpen} onGo={navigate} focus={focus} />
            </>
          ) : (
            <AppendixPage key={page.id + (focus?.tick || "")} section={page} onOpen={setOpen} initialQuery={focus?.query || ""} />
          )}
        </div>
      </main>

      {open != null && <DetailModal n={open} onNavigate={setOpen} onGo={navigate} onClose={() => setOpen(null)} />}
    </>
  );
}
