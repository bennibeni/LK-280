import { Fragment } from "react";
import { CONTROLS } from "../data/controls.js";

// Trasforma "premere {13} (TONE)" in testo con pallini cliccabili.
export default function RichText({ text, onNavigate }) {
  const parts = text.split(/\{(\d+)\}/);
  return parts.map((p, i) =>
    i % 2 === 1 && CONTROLS[p] ? (
      <button key={i} className="ref" onClick={() => onNavigate(Number(p))} title={CONTROLS[p][0]}>
        {p}
      </button>
    ) : (
      <Fragment key={i}>{p}</Fragment>
    )
  );
}
