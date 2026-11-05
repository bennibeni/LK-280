import { FIGURES } from "../data/figures.js";
import { CONTROLS } from "../data/controls.js";

const BASE = import.meta.env.BASE_URL;
const FOTO = FIGURES.find((f) => f.id === "foto");
const REAR = FIGURES.find((f) => f.id === "fig-7");

// Ritaglio di una figura che contiene i pallini richiesti, con i pallini evidenziati e cliccabili.
function Crop({ fig, nums, onOpen, label }) {
  const dots = fig.dots.filter((d) => nums.includes(d[0]));
  if (!dots.length) return null;
  const xs = dots.map((d) => d[1]), ys = dots.map((d) => d[2]);
  const ratio = fig.h / fig.w; // altezza/larghezza dell'immagine
  // riquadro attorno ai pallini, con margine e larghezza minima
  let x0 = Math.min(...xs) - 9, x1 = Math.max(...xs) + 9;
  let y0 = Math.min(...ys) - 14, y1 = Math.max(...ys) + 14;
  const minW = 44;
  if (x1 - x0 < minW) { const c = (x0 + x1) / 2; x0 = c - minW / 2; x1 = c + minW / 2; }
  // proporzioni: al massimo 2:1 in altezza rispetto alla larghezza visibile
  const maxH = ((x1 - x0) / ratio) * 0.6;
  if (y1 - y0 < maxH * 0.45) { const c = (y0 + y1) / 2; y0 = c - (maxH * 0.45) / 2; y1 = c + (maxH * 0.45) / 2; }
  const clamp = (a, b) => { const w = b - a; if (a < 0) return [0, Math.min(100, w)]; if (b > 100) return [Math.max(0, 100 - w), 100]; return [a, b]; };
  [x0, x1] = clamp(x0, x1); [y0, y1] = clamp(y0, y1);
  const cw = x1 - x0, ch = y1 - y0;
  const pad = ((ch * ratio) / cw) * 100; // altezza del riquadro in % della sua larghezza
  return (
    <div className="mini">
      <div className="mini-crop" style={{ paddingTop: pad + "%" }}>
        <img
          src={BASE + fig.src}
          alt={label}
          style={{ width: (100 / cw) * 100 + "%", left: (-x0 / cw) * 100 + "%", top: (-y0 / ch) * 100 + "%" }}
          draggable="false"
        />
        {dots.map(([n, x, y], i) => (
          <button
            key={i}
            className={"mini-dot" + (fig.markers ? " mark" : " ring")}
            style={{ left: ((x - x0) / cw) * 100 + "%", top: ((y - y0) / ch) * 100 + "%" }}
            title={`${n} · ${CONTROLS[n][0]}`}
            aria-label={`${n}: ${CONTROLS[n][0]}`}
            onClick={() => onOpen(n)}
          >
            {fig.markers ? n : null}
          </button>
        ))}
      </div>
      <div className="mini-cap">{label}</div>
    </div>
  );
}

// Dove si trovano sulla tastiera i comandi citati: pannello frontale (foto) e, se servono, retro.
export default function MiniMap({ nums, onOpen }) {
  const front = nums.filter((n) => n <= 37);
  const rear = nums.filter((n) => n >= 38);
  return (
    <div className="minimap">
      {front.length > 0 && <Crop fig={FOTO} nums={front} onOpen={onOpen} label="Pannello frontale" />}
      {rear.length > 0 && <Crop fig={REAR} nums={rear} onOpen={onOpen} label="Pannello posteriore" />}
    </div>
  );
}
