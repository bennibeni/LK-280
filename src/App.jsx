import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FIGURES } from "./data/figures.js";
import { APPENDIX } from "./data/appendix.js";
import Figure from "./components/Figure.jsx";
import Legend from "./components/Legend.jsx";
import DetailModal from "./components/DetailModal.jsx";
import ManualText from "./components/ManualText.jsx";
import AppendixPage from "./components/AppendixPage.jsx";
import HowtoPage from "./components/HowtoPage.jsx";
import RichText from "./components/RichText.jsx";
import SearchBox from "./components/SearchBox.jsx";
import ManualPage from "./components/ManualPage.jsx";
import { MANUAL_PAGES } from "./pageReferences.js";

// Pagine dell'app: "Come fare", le figure del manuale, poi le liste dell'Appendice.
const PAGES = [
  { id: "come", type: "howto", tab: "Come fare", title: "Come fare per…" },
  ...FIGURES.map((f) => ({ ...f, type: "fig", tab: f.page })),
  ...APPENDIX.map((a) => ({ ...a, type: "appx" })),
  ...MANUAL_PAGES,
];

// La pagina corrente è nell'hash (#fig-20, #timbri) così ogni pagina ha un suo indirizzo.
function indexFromHash() {
  const id = window.location.hash.slice(1).split("?")[0];
  const i = PAGES.findIndex((p) => p.id === id);
  return i >= 0 ? i : 0;
}

export default function App() {
  const [index, setIndex] = useState(indexFromHash);
  const [active, setActive] = useState(null); // comando evidenziato (hover/focus)
  const [open, setOpen] = useState(() => Number(new URLSearchParams(window.location.hash.split("?")[1]).get("control")) || null); // comando mostrato nella modale
  const [detailSection, setDetailSection] = useState(null);
  const [focus, setFocus] = useState(null); // { section?, query?, tick } dove portare dopo una ricerca o un link
  const page = PAGES[index];
  const visits = useRef({ entries: [], cursor: -1 });
  const [historyState, setHistoryState] = useState({ back: false, forward: false });
  const [restore, setRestore] = useState(null);

  const snapshot = () => ({
    index, open, detailSection, focus, scrollY: window.scrollY,
    expanded: [...document.querySelectorAll("main details[id][open]")].map((el) => el.id),
  });
  const updateHistory = () => {
    const { entries, cursor } = visits.current;
    setHistoryState({
      back: cursor > 0,
      forward: cursor >= 0 && cursor < entries.length - 1,
      backTitle: entries[cursor - 1] ? PAGES[entries[cursor - 1].index].title : null,
      forwardTitle: entries[cursor + 1] ? PAGES[entries[cursor + 1].index].title : null,
    });
  };
  const remember = () => {
    const h = visits.current;
    if (h.cursor < 0) h.cursor = 0;
    h.entries[h.cursor] = snapshot();
    h.entries = h.entries.slice(0, h.cursor + 1);
    h.entries.push(null); // La nuova pagina verrà salvata quando la si lascia.
    h.cursor = h.entries.length - 1;
    updateHistory();
  };
  const travel = (direction) => {
    const h = visits.current;
    // La voce corrente viene salvata prima di lasciare la pagina.
    h.entries[h.cursor] = snapshot();
    const next = h.cursor + direction;
    const saved = h.entries[next];
    if (!saved) return;
    h.cursor = next;
    setIndex(saved.index);
    setOpen(saved.open);
    setDetailSection(saved.detailSection);
    setActive(null);
    setFocus(saved.focus);
    setRestore({ ...saved, tick: Date.now() });
    updateHistory();
  };

  useLayoutEffect(() => {
    if (!restore) return;
    for (const el of document.querySelectorAll("main details[id]")) {
      el.open = restore.expanded.includes(el.id);
    }
    window.scrollTo({ top: restore.scrollY, behavior: "instant" });
    // Attende anche lo scorrimento della sezione richiesto dai componenti figli.
    const timer = setTimeout(() => window.scrollTo({ top: restore.scrollY, behavior: "instant" }), 150);
    return () => clearTimeout(timer);
  }, [restore]);

  const go = (j) => {
    if (j >= 0 && j < PAGES.length) {
      if (j !== index) remember();
      setIndex(j);
      setActive(null);
      setFocus(null);
    }
  };

  // Destinazione di ricerca e collegamenti: { page?, section?, query?, control? }
  const navigate = (t) => {
    if (t.page || t.control) remember();
    setDetailSection(t.detailSection || null);
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
      remember();
      setIndex(indexFromHash());
      const control = Number(new URLSearchParams(window.location.hash.split("?")[1]).get("control"));
      setOpen(Number.isInteger(control) && control >= 1 && control <= 45 ? control : null);
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
  }, [index, open, focus, detailSection]);

  const isFig = page.type === "fig";
  const numbers = isFig ? [...new Set(page.dots.map((d) => d[0]))] : [];
  const firstAppx = FIGURES.length + 1;

  let eyebrow;
  if (page.type === "howto") {
    eyebrow = "Guida rapida";
  } else if (isFig) {
    eyebrow = `Figura ${index} di ${FIGURES.length}` +
      (page.page.startsWith("I-") ? ` · pagina ${page.page}` : " · foto") + ` · ${numbers.length} comandi`;
  } else if (page.type === "manual") {
    eyebrow = "Riferimenti al manuale";
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
          <div className="visit-nav" role="group" aria-label="Cronologia delle pagine visitate">
            <span className="visit-nav-label">Cronologia</span>
            <button onClick={() => travel(-1)} disabled={!historyState.back} title={historyState.backTitle ? `Torna a ${historyState.backTitle}` : "Nessuna pagina precedente nella cronologia"}>← Torna indietro</button>
            <button onClick={() => travel(1)} disabled={!historyState.forward} title={historyState.forwardTitle ? `Vai a ${historyState.forwardTitle}` : "Nessuna pagina successiva nella cronologia"}>Vai avanti →</button>
          </div>
          <nav className="tabs" aria-label="Pagine">
            {PAGES.map((p, j) => p.type !== "manual" && (
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
              <div className="eyebrow"><RichText text={eyebrow} onNavigate={setOpen} onGo={navigate} /></div>
              <h1>{page.title}</h1>
            </div>
            <div className="nav">
              <button onClick={() => go(index - 1)} disabled={index === 0}>
                ← Pagina precedente
              </button>
              <button onClick={() => go(index + 1)} disabled={index === PAGES.length - 1}>
                Pagina successiva →
              </button>
            </div>
          </div>

          {page.type === "howto" ? (
            <HowtoPage onOpen={setOpen} onGo={navigate} focus={focus?.section} />
          ) : page.type === "manual" ? (
            <ManualPage key={page.id} label={page.label} onOpen={setOpen} onGo={navigate} />
          ) : isFig ? (
            <>
              <div className="grid stacked">
                <Figure fig={page} active={active} setActive={setActive} onOpen={setOpen} onGo={navigate} />
                <Legend numbers={numbers} active={active} setActive={setActive} onOpen={setOpen} />
              </div>
              <ManualText key={page.id} figId={page.id} onNavigate={setOpen} onGo={navigate} focus={focus} />
            </>
          ) : (
            <AppendixPage key={page.id + (focus?.tick || "")} section={page} onOpen={setOpen} initialQuery={focus?.query || ""} />
          )}
        </div>
      </main>

      {open != null && <DetailModal n={open} detailSection={detailSection} onNavigate={setOpen} onGo={navigate} onClose={() => setOpen(null)} />}
    </>
  );
}
