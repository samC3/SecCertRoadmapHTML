import createCertificatesGrid from "./create_certificate_grid.js";
import { countColumns, skillLevelName } from "./helpers.js";
import { renderCategoriesGrid, renderCertificates } from "./render.js";
import { CategoriesGrid, Category, Certificate, SkillLevelName } from "./types";

export const updateCertificatesOnControlChange = (certificates: Certificate[], categoriesGrid: CategoriesGrid) => {
  const controlsForm = document.getElementById("controls")!;
  const checkboxes = controlsForm.querySelectorAll(".category-checkbox");
  const checkboxValues: { [key: string]: boolean } = {};

  const skillCheckboxes = controlsForm.querySelectorAll(".skill-level-checkbox");
  const skillLevelCheckbox: { [key: string]: boolean } = {};

  checkboxes.forEach((checkbox) => {
    const inputElement = checkbox as HTMLInputElement;
    const inputName = inputElement.name as Category;
    checkboxValues[inputName] = inputElement.checked;
    categoriesGrid[inputName].hidden = !inputElement.checked;
  });

  skillCheckboxes.forEach((checkbox) => {
    const inputElement = checkbox as HTMLInputElement;
    skillLevelCheckbox[inputElement.name] = inputElement.checked;
  });

  const filteredCerts = certificates
    .filter((cert) => checkboxValues[cert.mainCategory])
    .map((cert) => {
      const adjacentCats = cert.adjacentCategory.filter((cat) => checkboxValues[cat]);

      return {
        ...cert,
        adjacent_category: adjacentCats,
      };
    })
    .filter((cert) => skillLevelCheckbox[skillLevelName(cert.skillLevel)]);

  const numberOfColumns = countColumns(categoriesGrid);
  const updatedGrid = createCertificatesGrid(filteredCerts, categoriesGrid, numberOfColumns);
  const enabledSkillLevels = Object.keys(skillLevelCheckbox)
    .filter((level) => skillLevelCheckbox[level])
    .map((level) => level as SkillLevelName);

  renderCategoriesGrid(categoriesGrid, enabledSkillLevels);
  renderCertificates(updatedGrid, numberOfColumns);
};
