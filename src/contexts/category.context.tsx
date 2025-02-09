import { createContext, ReactNode, useState } from "react";
import Category from "../types/categories.types";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase.config";
import { categoryConverter } from "../converters/firebase.converters";

interface ICategoryContext{
  categories: Category[]
  fetchCategories: () => Promise<void>
  isLoading: boolean
}

interface CategoryContextProps {
  children: ReactNode
}

export const CategoryContext = createContext<ICategoryContext>({
  categories: [],
  fetchCategories: () => Promise.resolve(),
  isLoading: false
})

const CategoryContextProvider = ({ children }: CategoryContextProps) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchCategories = async () => {
    try {
      setIsLoading(true)
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
    } finally {
      setIsLoading(false)
    }
  }

  return ( 
    <CategoryContext.Provider 
      value={{categories, fetchCategories, isLoading}}
    >
      {children}
    </CategoryContext.Provider>
  ) 
}

export default CategoryContextProvider