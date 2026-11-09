import { CONTROLS } from "./data/controls.js";
import { EXTRA } from "./data/extra.js";
import { FIGURES } from "./data/figures.js";

export function manualPageContent(label) {
  return {
    controls: Object.entries(CONTROLS).filter(([, c]) => (c[2].match(/I-\d+/g) || []).includes(label)),
    sections: [
      ...Object.values(EXTRA).flat().filter((s) => s.pages.includes(label)),
      ...Object.values(EXTRA).flat().filter((s) => s.title === "Funzioni del pulsante FUNCTION").flatMap((s) =>
        s.blocks.filter((b) => b.t === "tr" && b.cells?.at(-1) === label).map((b) => ({
          title: b.cells[1], pages: [label], blocks: [{ t: "p", text: `Nel menu {29} (FUNCTION), selezionare “${b.cells[2]}”.` }],
        }))),
    ],
    figures: FIGURES.filter((f) => f.page === label),
  };
}

// Una destinazione distinta per ogni pagina, senza ripiegare sulla figura precedente.
export function pageReference(label) {
  if (!/^I-\d+$/.test(label)) return null;
  const number = Number(label.slice(2));
  return Number.isInteger(number) && number >= 3 && number <= 70
    ? { page: `manual-${label}` } : null;
}

export const MANUAL_PAGES = Array.from({ length: 68 }, (_, i) => ({
  id: `manual-I-${i + 3}`, type: "manual", label: `I-${i + 3}`, title: `Manuale, pagina I-${i + 3}`,
}));
