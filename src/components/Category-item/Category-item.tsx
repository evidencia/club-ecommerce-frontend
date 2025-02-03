import Category from "../../types/categories.types";
import { CategoryItemContainer, CategoryName } from "./Category.styles";

interface CategoryItemProps {
  category: Category
}

function CategoryItem({ category }: CategoryItemProps) {
  return (
    <CategoryItemContainer backgroundImage={category.imageUrl}>
      <CategoryName className="category-name-container">
        <p>{category.displayName}</p>
        <p>Explorar</p>
      </CategoryName>
    </CategoryItemContainer>
  );
}

export default CategoryItem;