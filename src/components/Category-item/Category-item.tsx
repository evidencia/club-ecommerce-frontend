import Category from "../../types/categories.types";

import './Category.styles.css'

interface CategoryItemProps {
  category: Category
}

function CategoryItem({ category }: CategoryItemProps) {
  return (
    <div 
      className="category-item-container"
      style={{backgroundImage: `url('${category.imageUrl}')`}}
    >
      <div className="category-name-container">
        <p>{category.displayName}</p>
        <p>Explorar</p>
      </div>
    </div>
  );
}

export default CategoryItem;