import { CategoriesGrid, Category, CertificateGrid } from "./types";

export const renderCategoriesGrid = (categories: CategoriesGrid) => {
  const categoriesGridElement = document.getElementById("categories")!;
  categoriesGridElement.innerHTML = "";

  let gridTemplateColumns = "";

  Object.keys(categories).forEach((cat: string) => {
    const category = cat as Category;
    gridTemplateColumns += `[${category}-start] ${categories[category].span}fr `;

    const categoryElement = document.createElement("div");
    categoryElement.className = `category cat-${category}`;
    categoriesGridElement.appendChild(categoryElement);
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
