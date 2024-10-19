import { Category, SubCategoryMap } from "./types";

export const orderedCategories: Category[] = [
  "network",
  "iam",
  "cloud_sec_ops",
  "nix",
  "ics_iot",
  "engineer",
  "asset",
  "mgmt",
  "grc",
  "test",
  "software",
  "blueops",
  "forensics",
  "incident_handling",
  "pen_testing",
  "exploit",
];

export const mainCategories: Category[] = [
  "skilllevel",
  "network",
  "iam",
  "engineer",
  "asset",
  "mgmt",
  "test",
  "software",
  "blueops",
  "redops",
];

export const subCategories: SubCategoryMap = {
  engineer: ["cloud_sec_ops", "nix", "ics_iot"],
  mgmt: ["grc"],
  blueops: ["forensics", "incident_handling"],
  redops: ["pen_testing", "exploit"],
};
