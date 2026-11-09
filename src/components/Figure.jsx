import { useLayoutEffect, useRef, useState } from "react";
import { CONTROLS } from "../data/controls.js";
import RichText from "./RichText.jsx";

const BASE = import.meta.env.BASE_URL;

// Immagine della figura con un pulsante trasparente sopra ogni pallino.
// Hover/focus: tooltip sintetico. Click: descrizione completa (modale).
export default function Figure({ fig, active, setActive, onOpen, onGo }) {
  const stageRef = useRef(null);
  const [box, setBox] = useState(null);
  const dot = active != null ? fig.dots.find((d) => d[0] === active) : null;

  useLayoutEffect(() => {
    if (!dot || !stageRef.current) return setBox(null);
    const st = stageRef.current.getBoundingClientRect();
    setBox({
      x: (dot[1] / 100) * st.width,
      y: (dot[2] / 100) * st.height,
      r: (fig.r / 100) * st.width,
      w: st.width,
      below: dot[2] < 45,
    });
  }, [active, fig]);

  const size = `${fig.r * 2}%`;
  return (
    <div className={"plate" + (fig.markers ? " wide" : "")}>
      <div className="stage" ref={stageRef} onMouseLeave={() => setActive(null)}>
        <img src={BASE + fig.src} alt={"Figura: " + fig.title} width={fig.w} height={fig.h} draggable="false" />
        {fig.dots.map(([n, x, y], k) => (
          <button
            key={k}
            className={"hot" + (fig.markers ? " mark" : "") + (active === n ? " on" : "")}
            style={{ left: x + "%", top: y + "%", width: fig.markers ? undefined : size }}
            aria-label={`${n}: ${CONTROLS[n][0]}. Apri la descrizione completa`}
            onMouseEnter={() => setActive(n)}
            onFocus={() => setActive(n)}
            onClick={() => onOpen(n)}
          >
            {fig.markers ? n : null}
          </button>
        ))}
        {dot && box && <Tooltip n={dot[0]} box={box} onGo={onGo} />}
      </div>
      <p className="hint">Passa sopra un pallino per un riassunto, cliccalo per la descrizione completa.</p>
    </div>
  );
}

function Tooltip({ n, box, onGo }) {
  const ref = useRef(null);
  const [left, setLeft] = useState(box.x);
  useLayoutEffect(() => {
    const w = ref.current ? ref.current.offsetWidth : 240;
    setLeft(Math.max(0, Math.min(box.w - w, box.x - w / 2)));
  }, [n, box]);
  const [name, desc, pages] = CONTROLS[n];
  const style = box.below
    ? { left, top: box.y + box.r + 8 }
    : { left, bottom: `calc(100% - ${box.y - box.r - 8}px)` };
  return (
    <div className="tip" ref={ref} style={style} role="tooltip">
      <b>
        <span className="n">{n}</span>
        {name}
      </b>
      {desc}
      {pages && <span className="pg">Manuale, pag. <RichText text={pages} onGo={onGo} /></span>}
      <span className="more">Clic per i dettagli</span>
    </div>
  );
}
