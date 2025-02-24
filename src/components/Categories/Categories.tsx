import { useEffect } from "react";
import CategoryItem from "../Category-item/Category-item";
import { CategoriesContainer, CategoriesContent } from "./Categpories.styles";
import Loading from "../Loading/Loading";
import { useDispatch } from "react-redux";
import { fetchCategories } from "../../store/toolkit/category/category.slice";
import { useAppSelector } from "../../hooks/redux.hooks";

function Categories() {
  const { categories, isLoading } = useAppSelector(state =>state.categoryReducer )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCategories() as any)
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