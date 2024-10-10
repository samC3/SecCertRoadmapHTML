export type Category = "skilllevel" | "network" | "iam" | "engineer" | "asset" | "mgmt" | "test" | "software" | "ops";
export type SkillLevelName = "beginner" | "intermediate" | "expert";

export type CategoriesGrid = {
  [key: string]: CategoryColumn;
};

export interface CategoryColumn {
  start: number;
  span: number;
  hidden: boolean;
  renderControl: boolean;
  displayName: string;
}

export interface Certificate {
  skillLevel: number;
  skillLevelName?: SkillLevelName;
  mainCategory: Category;
  adjacentCategory: Category[];
  content: string;
  tooltiptext: string;
  colStart?: number;
  colEnd?: number;
  row?: number;
}

export interface CertificatesGridValues extends Certificate {
  colStart?: number;
  colEnd?: number;
  row?: number;
}

export interface rowMetadata {
  skillLevel: number;
  columnsOccupied: string[];
}

export interface CertificateGrid {
  rowValues: { [row: number]: rowMetadata };
  certificates: CertificatesGridValues[];
  categoriesGrid: CategoriesGrid;
  numberOfColumns: number;
}
