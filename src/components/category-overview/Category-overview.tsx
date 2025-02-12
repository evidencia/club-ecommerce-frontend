import Category from "../../types/categories.types";
import { CategoryContainer, CategoryTitle, ProductsContainer } from "./Category-overview.styles";

interface CategoryOverviewProps {
  category: Category
}

function CategoryOverview({ category }: CategoryOverviewProps) {
  return (
    <CategoryContainer>
      <CategoryTitle>{category.displayName}</CategoryTitle>

      <ProductsContainer></ProductsContainer>
    </CategoryContainer>
  );
}

export default CategoryOverview;