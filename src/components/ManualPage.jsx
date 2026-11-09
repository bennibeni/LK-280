import { manualPageContent } from "../pageReferences.js";
import ManualText from "./ManualText.jsx";

export default function ManualPage({ label, onOpen, onGo }) {
  const { controls, sections, figures } = manualPageContent(label);
  return (
    <div>
      <p>Contenuti dell’app riferiti a pagina {label}. Questa raccolta non è la riproduzione integrale della pagina del manuale.</p>
      {controls.length > 0 && <section className="manual">
        <h2>Comandi riferiti a questa pagina</h2>
        <ul>{controls.map(([n, [name, description]]) => <li key={n}>
          <button className="ref" onClick={() => onOpen(Number(n))} aria-label={`Apri ${n}: ${name}`}>{n}</button>{" "}
          <button onClick={() => onOpen(Number(n))}>{name}</button> — {description}
        </li>)}</ul>
      </section>}
      {figures.map((f) => <p key={f.id}><a className="page-link" href={`#${f.id}`} onClick={(e) => {
        if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
        e.preventDefault(); onGo({ page: f.id });
      }}>Figura: {f.title}</a></p>)}
      <ManualText figId={`manual-${label}`} sections={sections} initiallyOpen onNavigate={onOpen} onGo={onGo} />
      {!controls.length && !sections.length && !figures.length && <p>Non sono presenti contenuti associati a questa pagina nell’app.</p>}
    </div>
  );
}
