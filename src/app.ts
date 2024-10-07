import load from "./certificates_loader.js";
import { updateCertificatesOnControlChange } from "./controls.js";
import createCertificatesGrid from "./create_certificate_grid.js";
import { countColumns } from "./helpers.js";
import { renderCategoriesGrid, renderCertificates, renderControlCheckbox } from "./render.js";
import { CategoriesGrid } from "./types";

const main = (): void => {
  const categoriesGrid: CategoriesGrid = {
    skilllevel: { start: 1, span: 1, hidden: false, displayName: "", renderControl: false },
    network: { start: 2, span: 3, hidden: false, displayName: "Network", renderControl: true },
    iam: { start: 5, span: 1, hidden: false, displayName: "IAM", renderControl: true },
    engineer: { start: 6, span: 7, hidden: false, displayName: "Engineering", renderControl: true },
    asset: { start: 13, span: 2, hidden: false, displayName: "Asset", renderControl: true },
    mgmt: { start: 15, span: 9, hidden: false, displayName: "Management", renderControl: true },
    test: { start: 24, span: 3, hidden: false, displayName: "Testing", renderControl: true },
    software: { start: 27, span: 1, hidden: false, displayName: "Software", renderControl: true },
    ops: { start: 28, span: 12, hidden: false, displayName: "Ops", renderControl: true },
  };

  const certificates = load();
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
    .addEventListener("input", (_e) => updateCertificatesOnControlChange(certificates, categoriesGrid));
};

main();
