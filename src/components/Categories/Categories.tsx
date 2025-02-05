import { useEffect, useState } from "react";
import { collection, getDocs } from 'firebase/firestore'

import Category from "../../types/categories.types";
import CategoryItem from "../Category-item/Category-item";
import { CategoriesContainer, CategoriesContent } from "./Categpories.styles";
import { db } from "../../config/firebase.config";
import { categoryConverter } from "../../converters/firebase.converters";

function Categories() {
  const [categories, setCategories] = useState<Category[]>([])

  const fetchCategories = async () => {
    try {
      const categoriesFromFirestore: Category[] = []

      const querySnapshort = await getDocs(
        collection(db, 'categories').withConverter(categoryConverter)
      )

      querySnapshort.forEach((doc) => {
        categoriesFromFirestore.push(doc.data())
     })

      setCategories(categoriesFromFirestore)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return ( 
    <CategoriesContainer>
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