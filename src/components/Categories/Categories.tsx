import { useEffect, useState } from "react";
import axios from "axios";

import Category from "../../types/categories.types";
import env from "../../config/env.config";
import CategoryItem from "../Category-item/Category-item";
import { CategoriesContainer, CategoriesContent } from "./Categpories.styles";

function Categories() {
  const [categories, setCategories] = useState<Category[]>([])

  const fetchCategories = async () => {
    try {
      const {data} = await axios.get(`${env.apiUrl}/api/category`)
      console.log({data})

      setCategories(data)
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