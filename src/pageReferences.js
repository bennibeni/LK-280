import { FIGURES } from "./data/figures.js";
import { EXTRA } from "./data/extra.js";

// Le pagine del manuale sono raccolte per argomento nell'app.
export function pageReference(label) {
  const number = Number(label.slice(2));
  if (!Number.isInteger(number) || number < 4 || number > 70) return null;
  for (const [page, sections] of Object.entries(EXTRA)) {
    const section = sections.find((s) => s.pages.includes(label));
    if (section) return { page, section: section.title };
  }
  const figure = FIGURES.find((f) => f.page === label);
  if (figure) return { page: figure.id };
  const preceding = FIGURES.filter((f) => f.page.startsWith("I-") && Number(f.page.slice(2)) <= number).at(-1);
  return preceding ? { page: preceding.id } : null;
}
