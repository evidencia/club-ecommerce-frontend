import { Dispatch } from "redux"
import { db } from "../../../converters/config/firebase.config"
import { categoryConverter } from "../../../converters/firebase.converters"
import { collection, getDocs } from "firebase/firestore"
import Category from "../../../types/categories.types"
import CategoryActionTypes from "./category.action-types"

export const fetchCatagories = () => {
  return async(dispatch: Dispatch) => {
    dispatch({type: CategoryActionTypes.FETCH_CATEGORIES_START})

    try {
      const categoriesFromFirestore: Category[] = []

      const querySnapshort = await getDocs(
        collection(db, 'categories').withConverter(categoryConverter)
      )

      querySnapshort.forEach((doc) => {
        categoriesFromFirestore.push(doc.data())
      })

      dispatch({
        type: CategoryActionTypes.FETCH_CATEGORIES_SUCCESS,
        payload: categoriesFromFirestore
      })
    } catch (error) {
      dispatch({
        type: CategoryActionTypes.FETCH_CATEGORIES_FAILURE
      })
    }
  }
} 