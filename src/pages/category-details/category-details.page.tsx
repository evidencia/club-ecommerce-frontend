import { useParams } from "react-router-dom";
import CategoryDetails from "../../components/category-details/category-details.components";
import Header from "../../components/Header/Header";

function CategoryDetailsPage() {
  const { id } = useParams()

  if (!id) return null

  return (
    <>
      <Header />

      <CategoryDetails categoryId={id} />
    </>
  );
}

export default CategoryDetailsPage;