import { useNavigate } from "react-router-dom";
import Category from "../../types/categories.types";
import { CategoryItemContainer, CategoryName } from "./Category.styles";

interface CategoryItemProps {
  category: Category
}

function CategoryItem({ category }: CategoryItemProps) {
  const navigate = useNavigate()

  const handleExploreClick = () => {
    navigate(`/category/${category.id}`)
  }

  return (
    <CategoryItemContainer backgroundImage={category.imageUrl}>
      <CategoryName
        onClick={handleExploreClick} 
        className="category-name-container"
      >
        <p>{category.displayName}</p>
        <p>Explorar</p>
      </CategoryName>
    </CategoryItemContainer>
  );
}

export default CategoryItem;