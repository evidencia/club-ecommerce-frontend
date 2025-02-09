import { useContext, useEffect } from "react";
import CategoryItem from "../Category-item/Category-item";
import { CategoriesContainer, CategoriesContent } from "./Categpories.styles";
import { CategoryContext } from "../../contexts/category.context";
import Loading from "../Loading/Loading";

function Categories() {
  const {categories, fetchCategories, isLoading} = useContext(CategoryContext)

  

  useEffect(() => {
    fetchCategories()
  }, [])

  return ( 
    <CategoriesContainer>
      {isLoading && <Loading />}
      <CategoriesContent>
        {categories.map((category) => (
          <div key={category.id}>
            <CategoryItem category={category} />
          </div>
        ))}
      </CategoriesContent>
    </CategoriesContainer>
  );
}

export default Categories;