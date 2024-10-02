import { renderCategoriesGrid } from "./render.js";

export type Category = "skilllevel" | "network" | "iam" | "engineer" | "asset" | "mgmt" | "test" | "software" | "ops";

export type CategoriesGrid = {
  [Cat in Category]: CategoryColumn;
};

interface CategoryColumn {
  start: number;
  span: number;
}

const main = (): void => {
  const cetegoriesGrid: CategoriesGrid = {
    skilllevel: { start: 1, span: 1 },
    network: { start: 2, span: 4 },
    iam: { start: 6, span: 2 },
    engineer: { start: 8, span: 8 },
    asset: { start: 16, span: 3 },
    mgmt: { start: 19, span: 10 },
    test: { start: 29, span: 4 },
    software: { start: 33, span: 2 },
    ops: { start: 35, span: 13 },
  };

  renderCategoriesGrid(cetegoriesGrid);
};

main();
