import { useContext, useEffect } from "react";
import { Container } from "./categories-overview.styles";
import { CategoryContext } from "../../contexts/category.context";
import CategoryOverview from "../category-overview/Category-overview";
import Loading from "../Loading/Loading";

function CategoriesOverview() {
  const { categories, isLoading, fetchCategories } = useContext(CategoryContext)

  useEffect(()=> {
    if(categories.length === 0) {
      fetchCategories()
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