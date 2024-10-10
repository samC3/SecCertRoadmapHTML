import load from "./certificates_loader.js";
import { updateCertificatesOnControlChange } from "./controls.js";
import { createCategoriesGrid } from "./create_categories_grid.js";
import createCertificatesGrid from "./create_certificate_grid.js";
import { countColumns } from "./helpers.js";
import { renderCategoriesGrid, renderCertificates, renderControlCheckbox } from "./render.js";
import { CategoriesGrid } from "./types";

const main = (): void => {
  const certificates = load();
  const categoriesGrid = createCategoriesGrid(certificates);
  const numberOfColumns = countColumns(categoriesGrid);
  const certificateGrid = createCertificatesGrid(certificates, categoriesGrid, numberOfColumns);

  renderCategoriesGrid(categoriesGrid, ["beginner", "intermediate", "expert"]);
  renderCertificates(certificateGrid, numberOfColumns);

  Object.entries(categoriesGrid).forEach(([name, cat]) => {
    if (cat.renderControl)
      renderControlCheckbox("category-controls", name, cat.displayName, "category-checkbox", !cat.hidden);
  });

  ["beginner", "intermediate", "expert"].forEach((skillLevel) => {
    renderControlCheckbox("skill-level-controls", skillLevel, skillLevel, "skill-level-checkbox", true);
  });

  document
    .getElementById("controls")!
    .addEventListener("input", (_e) => updateCertificatesOnControlChange(certificates));
};

main();
