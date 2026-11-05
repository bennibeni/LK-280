import { useEffect } from "react";
import { HOWTO } from "../data/howto.js";
import RichText from "./RichText.jsx";
import MiniMap from "./MiniMap.jsx";

// Numeri dei comandi citati nei passi, nell'ordine in cui compaiono.
const numsOf = (steps) => [...new Set(steps.join(" ").match(/\{(\d+)\}/g)?.map((m) => Number(m.slice(1, -1))) || [])];

// Pagina iniziale "Come fare per…": operazioni comuni con passi brevi e collegamenti.
export default function HowtoPage({ onOpen, onGo, focus }) {
  useEffect(() => {
    if (!focus) return;
    const el = document.getElementById("howto-" + focus);
    if (el) { el.scrollIntoView({ behavior: "smooth", block: "center" }); el.classList.add("flash"); setTimeout(() => el.classList.remove("flash"), 1600); }
  }, [focus]);

  return (
    <div className="howto">
      <p className="howto-intro">
        Le operazioni più comuni in pochi passi. Clicca un pallino numerato per la scheda completa del comando,
        oppure usa la ricerca in alto per trovare qualsiasi argomento del manuale.
      </p>
      <div className="howto-grid">
        {HOWTO.map((h) => (
          <section className="howto-card" key={h.id} id={"howto-" + h.id}>
            <h2>{h.title}</h2>
            <MiniMap nums={numsOf(h.steps)} onOpen={onOpen} />
            <ol className="steps">
              {h.steps.map((s, i) => <li key={i}><RichText text={s} onNavigate={onOpen} /></li>)}
            </ol>
            {h.links.length > 0 && (
              <div className="howto-links">
                {h.links.map((l, i) => (
                  <button key={i} onClick={() => onGo(l)}>{l.label} →</button>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
