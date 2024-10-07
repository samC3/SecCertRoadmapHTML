import { CategoriesGrid, Category, CertificateGrid, SkillLevelName } from "./types";

export const renderCategoriesGrid = (categories: CategoriesGrid, enabledSkillLevels: SkillLevelName[]) => {
  const categoriesGridElement = document.getElementById("categories")!;
  categoriesGridElement.innerHTML = "";

  let gridTemplateColumns = "";

  Object.keys(categories).forEach((cat: string) => {
    const category = cat as Category;

    if (categories[category].hidden) return;

    let columnWidth = categories[category].span.toString() + "fr";
    let className = `category cat-${category}`;

    if (category === "skilllevel") {
      columnWidth = "1.5rem";
      className = "skill-levels";
    }

    gridTemplateColumns += `[${category}-start] ${columnWidth} `;

    const categoryElement = document.createElement("div");
    categoryElement.className = className;
    categoriesGridElement.appendChild(categoryElement);
  });

  const skillLevels = document.getElementsByClassName("skill-levels")[0];

  enabledSkillLevels.forEach((level) => {
    const skillLevel = document.createElement("span");
    skillLevel.innerHTML = level;
    skillLevels.appendChild(skillLevel);
  });

  categoriesGridElement.style.gridTemplateColumns = gridTemplateColumns;
};

export const renderCertificates = (certificatesGrid: CertificateGrid, numberOfColumns: number) => {
  const certificatesGridElement = document.getElementById("certificates")!;
  certificatesGridElement.innerHTML = "";

  certificatesGridElement.style.gridTemplateColumns = `repeat(${numberOfColumns}, minmax(0, 1fr))`;

  certificatesGrid.certificates.forEach((cert) => {
    const certElement = document.createElement("div");
    certElement.className = `cert ${cert.mainCategory}`;
    certElement.style.gridColumn = `${cert.colStart} / ${cert.colEnd}`;
    certElement.style.gridRow = `${cert.row} / span 1`;
    certElement.innerHTML = `<span>${cert.content}</span>`;
    certificatesGridElement.appendChild(certElement);
  });
};

export const renderControlCheckbox = (
  controlGroup: string,
  checkboxName: string,
  labelName: string,
  classes: string,
  checked: boolean
) => {
  const control = document.getElementById("controls")!;

  const controlGroupElement = getOrCreateControlGroup(control, controlGroup);
  const label = document.createElement("label");
  const checkbox = document.createElement("input");

  label.innerHTML = labelName;
  label.className = `control-label ${checkboxName}-label`;
  label.htmlFor = checkboxName;

  checkbox.type = "checkbox";
  checkbox.id = checkboxName;
  checkbox.name = checkboxName;
  checkbox.className = classes;
  checkbox.checked = checked;
  checkbox.hidden = true;

  controlGroupElement.appendChild(checkbox);
  controlGroupElement.appendChild(label);
};

const getOrCreateControlGroup = (control: HTMLElement, controlGroup: string): Element => {
  const existingControlGroupElement = control.getElementsByClassName(controlGroup);

  if (existingControlGroupElement.length > 0) return existingControlGroupElement[0];

  const controlGroupElement = document.createElement("div");

  controlGroupElement.className = controlGroup;
  control.appendChild(controlGroupElement);

  return controlGroupElement;
};
