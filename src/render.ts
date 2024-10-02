import { CategoriesGrid, Category } from "./app";

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
