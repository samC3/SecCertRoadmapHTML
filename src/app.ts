import load from "./certificates_loader.js";
import createCertificatesGrid from "./create_certificate_grid.js";
import { renderCategoriesGrid, renderCertificates } from "./render.js";
import { CategoriesGrid, CategoryColumn } from "./types";

const main = (): void => {
  const cetegoriesGrid: CategoriesGrid = {
    skilllevel: { start: 1, span: 1, hidden: false },
    network: { start: 2, span: 3, hidden: false },
    iam: { start: 5, span: 1, hidden: false },
    engineer: { start: 6, span: 7, hidden: false },
    asset: { start: 13, span: 2, hidden: false },
    mgmt: { start: 15, span: 9, hidden: false },
    test: { start: 24, span: 3, hidden: false },
    software: { start: 27, span: 1, hidden: false },
    ops: { start: 28, span: 12, hidden: false },
  };

  const certificates = load();
  const numberOfColumns = countColumns(cetegoriesGrid);
  const certificateGrid = createCertificatesGrid(certificates, cetegoriesGrid, numberOfColumns);

  renderCategoriesGrid(cetegoriesGrid);
  renderCertificates(certificateGrid, numberOfColumns);
};

const countColumns = (categories: CategoriesGrid): number => {
  return Object.values(categories).reduce((acc: number, col: CategoryColumn) => (col.hidden ? acc : acc + col.span), 0);
};

main();
