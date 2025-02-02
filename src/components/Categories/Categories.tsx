import { useEffect, useState } from "react";
import "./Categories.styles.css"
import Category from "../../types/categories.types";
import axios from "axios";
import env from "../../config/env.config";
import CategoryItem from "../Category-item/Category-item";

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
    <div className="categories-contaner">
      <div className="categories-content">
        {categories.map((category) => (
          <div key={category.id}>
            <CategoryItem category={category} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;