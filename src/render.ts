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

  certificatesGridElement.style.gridTemplateColumns = `1.6rem repeat(${numberOfColumns - 1}, minmax(0, 1fr))`;

  certificatesGrid.certificates.forEach((cert) => {
    const certElement = document.createElement("div");
    certElement.className = `cert ${cert.mainCategory}`;
    certElement.style.gridColumn = `${cert.colStart} / ${cert.colEnd}`;
    certElement.style.gridRow = `${cert.row} / span 1`;
    certElement.innerHTML = `<span>${cert.content}</span>`;
    certElement.onclick = () => showToast(cert.content, cert.tooltiptext);
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

const showToast = (title: string, message: string): void => {
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
