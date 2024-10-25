import { mainCategories, subCategoryMapping, mainCategoryWithSubCategory, SKILL_LEVEL } from "./constants.js";
import { CategoriesGrid, Category, CategoryWithSubCategoryKey, CertificateGrid, SkillLevelName } from "./types";

export const renderCategoriesGrid = (categories: CategoriesGrid, enabledSkillLevels: SkillLevelName[]) => {
  const categoriesGridElement = document.getElementById("categories")!;
  categoriesGridElement.innerHTML = "";

  let gridTemplateColumns = "";

  [SKILL_LEVEL, ...mainCategories].forEach((cat: string) => {
    const category = cat as Category;
    const categoryData = categories[category] || { span: 0 };

    if (categoryData.hidden) return;

    let subWidths = 0;

    if (mainCategoryWithSubCategory.includes(category)) {
      subWidths =
        subCategoryMapping[category as CategoryWithSubCategoryKey]?.reduce((acc, subCategory) => {
          return categories[subCategory].span + acc;
        }, 0) || 0;
    }

    let columnWidth = (categoryData.span + subWidths).toString() + "fr";
    let className = `category cat-${category}`;

    if (category === SKILL_LEVEL) {
      columnWidth = "1.5rem";
      className = "skill-levels";
    }

    gridTemplateColumns += `[${category}-start] ${columnWidth} `;

    const categoryElement = document.createElement("div");
    categoryElement.className = className;
    categoriesGridElement.appendChild(categoryElement);
  });

  const subCategoryMappingGridElement = document.getElementById("sub-categories")!;
  subCategoryMappingGridElement.innerHTML = "";

  let subCatGridTemplateColumns = "1.6rem ";
  let lastFilledCol = 2;

  const skillLevelSubCategoryElement = document.createElement("div");
  skillLevelSubCategoryElement.className = "skilllevel-sub-category-col";
  subCategoryMappingGridElement.appendChild(skillLevelSubCategoryElement);

  Object.values(subCategoryMapping)
    .flat()
    .forEach((subCat) => {
      if (categories[subCat].hidden) return;

      const subCatWidth = categories[subCat].span;

      if (lastFilledCol < categories[subCat].start) {
        const blankColsStart = lastFilledCol;
        const blankColsEnd = categories[subCat].start;

        subCatGridTemplateColumns += `${blankColsEnd - blankColsStart}fr `;

        const blankSubCategoryElement = document.createElement("div");
        blankSubCategoryElement.className = "blank-sub-category";
        subCategoryMappingGridElement.appendChild(blankSubCategoryElement);
      }

      subCatGridTemplateColumns += `[${subCat}-start] ${categories[subCat].span}fr `;

      const subCategoryElement = document.createElement("div");
      subCategoryElement.className = `sub-category ${subCat}-sub-category`;
      subCategoryMappingGridElement.appendChild(subCategoryElement);

      lastFilledCol = categories[subCat].start + subCatWidth;
    });

  const skillLevels = document.getElementsByClassName("skill-levels")[0];

  enabledSkillLevels.forEach((level) => {
    const skillLevel = document.createElement("span");
    skillLevel.innerHTML = level;
    skillLevels.appendChild(skillLevel);
  });

  categoriesGridElement.style.gridTemplateColumns = gridTemplateColumns;
  subCategoryMappingGridElement.style.gridTemplateColumns = subCatGridTemplateColumns;
};

export const renderCertificates = (certificatesGrid: CertificateGrid, numberOfColumns: number) => {
  const certificatesGridElement = document.getElementById("certificates")!;
  certificatesGridElement.innerHTML = "";

  certificatesGridElement.style.gridTemplateColumns = `1.6rem repeat(${numberOfColumns - 1}, minmax(0, 1fr))`;

  let certCells: HTMLDivElement[] = [];

  certificatesGrid.certificates.forEach((cert) => {
    const certElement = document.createElement("div");
    certElement.className = `cert ${cert.parentCategory || cert.mainCategory}`;
    certElement.style.gridColumn = `${cert.colStart} / ${cert.colEnd}`;
    certElement.style.gridRow = `${cert.row} / span 1`;
    certElement.innerHTML = `<span>${cert.content}</span>`;
    certElement.onclick = () => showToast(cert.content, cert.tooltiptext, cert.href);
    certificatesGridElement.appendChild(certElement);
    certCells.push(certElement);
  });

  const smallestWidth = getSmallestCellSize(certCells);
  const baseFontSize = smallestWidth / 6;
  const fontSize = Math.min(Math.max(baseFontSize, 7.5), 22);

  certCells.forEach((cell) => {
    cell.style.fontSize = `${fontSize}px`;
  });
};

export const renderControlCheckbox = (
  controlGroup: string,
  checkboxName: string,
  labelName: string,
  classes: string,
  checked: boolean,
  hideControl: boolean
) => {
  const control = document.getElementById("controls")!;

  const controlGroupElement = getOrCreateControlGroup(control, controlGroup);
  const container = document.createElement("div");
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

  container.hidden = hideControl;

  controlGroupElement.appendChild(container);
  container.appendChild(checkbox);
  container.appendChild(label);
};

const getOrCreateControlGroup = (control: HTMLElement, controlGroup: string): Element => {
  const existingControlGroupElement = control.getElementsByClassName(controlGroup);

  if (existingControlGroupElement.length > 0) return existingControlGroupElement[0];

  const controlGroupElement = document.createElement("div");

  controlGroupElement.className = `control-group ${controlGroup}`;
  control.appendChild(controlGroupElement);

  return controlGroupElement;
};

const showToast = (title: string, message: string, href: string): void => {
  let overlay = document.querySelector(".overlay");

  if (!overlay) {
    overlay = document.createElement("div");
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);
  }

  const toast = document.createElement("div");
  toast.classList.add("toast");

  const heading = document.createElement("h3");
  heading.textContent = title;
  toast.appendChild(heading);

  const text = document.createElement("p");
  text.textContent = message;
  toast.appendChild(text);

  const link = document.createElement("a");
  link.href = href;
  link.textContent = href;
  toast.appendChild(link);

  const closeButton = document.createElement("button");
  closeButton.classList.add("close-btn");
  closeButton.innerHTML = "&times;"; // '×' symbol
  toast.appendChild(closeButton);

  document.body.appendChild(toast);

  setTimeout(() => {
    overlay.classList.add("show");
    toast.classList.add("show");
  }, 100);

  closeButton.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent bubbling to the body
    closeToast(toast, overlay);
  });

  overlay.addEventListener(
    "click",
    () => {
      closeToast(toast, overlay);
    },
    { once: true }
  );
};

const closeToast = (toast: HTMLDivElement, overlay: Element): void => {
  toast.classList.remove("show");
  overlay.classList.remove("show");

  setTimeout(() => {
    document.body.removeChild(toast);
    document.body.removeChild(overlay);
  }, 400);
};

function getSmallestCellSize(cells: HTMLDivElement[]): number {
  let smallestWidth = Infinity;

  cells.forEach((cell) => {
    const cellWidth = cell.clientWidth;

    if (cellWidth < smallestWidth) {
      smallestWidth = cellWidth;
    }
  });

  return smallestWidth;
}
