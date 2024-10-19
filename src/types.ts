export type Category =
  | "skilllevel"
  | "network"
  | "iam"
  | "cloud_sec_ops"
  | "nix"
  | "ics_iot"
  | "engineer"
  | "asset"
  | "mgmt"
  | "grc"
  | "test"
  | "software"
  | "blueops"
  | "redops"
  | "forensics"
  | "incident_handling"
  | "pen_testing"
  | "exploit";

export type CategoryWithSubCategoryKey = Extract<Category, "engineer" | "mgmt" | "blueops" | "redops">;

export type SubCategoryMap = {
  [key in CategoryWithSubCategoryKey]: Category[];
};

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
  categoryStyle: string;
  mainCategory: Category;
  adjacentCategory: Category[];
  content: string;
  tooltiptext: string;
  href: string;
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
