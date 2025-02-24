import { useEffect } from "react";
import { Container } from "./categories-overview.styles";
import CategoryOverview from "../category-overview/Category-overview";
import Loading from "../Loading/Loading";
import { useAppSelector } from "../../hooks/redux.hooks";
import { useDispatch } from "react-redux";
import { fetchCategories } from "../../store/toolkit/category/category.slice";

function CategoriesOverview() {
  const { categories, isLoading } = useAppSelector(state =>state.categoryReducer )

  const dispatch = useDispatch()  

  useEffect(()=> {
    if(categories.length === 0) {
      dispatch(fetchCategories() as any)
    }
  }, [])

  if (isLoading) return <Loading />

  return (
    <Container>
      {categories.map((category) => (
        <CategoryOverview key={category.id} category={category} />
      ))}
    </Container>
  );
}

export default CategoriesOverview;