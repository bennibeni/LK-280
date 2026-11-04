import { CONTROLS } from "../data/controls.js";

// Elenco dei comandi presenti nella figura corrente.
export default function Legend({ numbers, active, setActive, onOpen }) {
  return (
    <aside className="legend" aria-label="Comandi in questa figura">
      <h2>In questa figura</h2>
      <ul>
        {numbers.map((n) => (
          <li key={n}>
            <button
              className={active === n ? "on" : ""}
              onMouseEnter={() => setActive(n)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(n)}
              onClick={() => onOpen(n)}
            >
              <span className="badge">{n}</span>
              <span>
                <span className="nm">{CONTROLS[n][0]}</span>
                <span className="ds">{CONTROLS[n][1]}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
