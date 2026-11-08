import { Fragment } from "react";
import { CONTROLS } from "../data/controls.js";
import { pageReference } from "../pageReferences.js";

// Trasforma "premere {13} (TONE)" in testo con pallini cliccabili.
export default function RichText({ text, onNavigate, onGo }) {
  const parts = text.split(/(\{\d+\}|\bI-\d+\b)/);
  return parts.map((p, i) => {
    const control = /^\{(\d+)\}$/.exec(p)?.[1];
    const target = /^I-\d+$/.test(p) && pageReference(p);
    if (target && onGo) return (
      <a key={i} href={`#${target.page}`} onClick={(e) => {
        if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        onGo(target);
      }}>{p}</a>
    );
    return control && CONTROLS[control] ? (
      <button key={i} className="ref" onClick={() => onNavigate(Number(control))} title={CONTROLS[control][0]}>
        {control}
      </button>
    ) : (
      <Fragment key={i}>{p}</Fragment>
    );
  });
}
