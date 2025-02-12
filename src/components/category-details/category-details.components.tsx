import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { BiChevronLeft } from "react-icons/bi";
import { categoryConverter } from "../../converters/firebase.converters";
import { db } from "../../config/firebase.config";


import { ProductContainer } from "../product-item/product-item.styles";
import Category from "../../types/categories.types";
import Loading from "../Loading/Loading";
import ProductItem from "../product-item/product-item";


import { CategoryTitle, Container, IconContainer, ProductsContainer } from "./category-details.styles";
import { useNavigate } from "react-router-dom";

interface CategoryDetailSProps {
  categoryId: string
}

function CategoryDetails({ categoryId}: CategoryDetailSProps) {
  const [category, setCategory] = useState<Category | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()


  const handleBackClick = () => {
    navigate('/')
  }

  useEffect(() => {
    const fetchCategory = async () => {
      try{
        setIsLoading(true)
        const querySnapshot = await getDocs(
          query(
            collection(db, 'categories').withConverter(categoryConverter),
            where('id', '==', categoryId)
          )
        )

        const category = querySnapshot.docs[0]?.data()
        setCategory(category)
      } catch (error){
        console.log(error)
      }finally {
        setIsLoading(false)
      }
    }

    fetchCategory()
  }, [])

  if (isLoading) return <Loading />

  return (
    <Container>
      <CategoryTitle>
        <IconContainer onClick={handleBackClick}>
          <BiChevronLeft size={36} />
        </IconContainer>
        <p>Explorar {category?.displayName}</p>
      </CategoryTitle>

      <ProductsContainer>
        {category?.products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ProductsContainer>
    </Container>
  )
}

export default CategoryDetails;