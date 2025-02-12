import Category from "../../types/categories.types";
import ProductItem from "../product-item/product-item";
import { CategoryContainer, CategoryTitle, ProductsContainer } from "./Category-overview.styles";

interface CategoryOverviewProps {
  category: Category
}

function CategoryOverview({ category }: CategoryOverviewProps) {
  return (
    <CategoryContainer>
      <CategoryTitle>{category.displayName}</CategoryTitle>

      <ProductsContainer>
        {category.products.slice(0, 4).map((product) => (
          <ProductItem key={product.id} product={product}/>
        ))}
      </ProductsContainer>
    </CategoryContainer>
  );
}

export default CategoryOverview;