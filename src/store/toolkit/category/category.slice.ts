import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../converters/config/firebase.config";
import { categoryConverter } from "../../../converters/firebase.converters";
import Category from "../../../types/categories.types";

 export const fetchCategories = createAsyncThunk('categories/fetch', 
  async () => {
    const categoriesFromFirestore: Category[] = []

    const querySnapshort = await getDocs(
      collection(db, 'categories').withConverter(categoryConverter)
    )

    querySnapshort.forEach((doc) => {
      categoriesFromFirestore.push(doc.data())
    })

    return categoriesFromFirestore
  }
)

interface InitialState {
  categories: Category[]
  isLoading: boolean
}

const initialState: InitialState = {
  categories: [],
  isLoading: false
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.isLoading = true
    })

    //sucesso
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload
      state.isLoading = false
    })

    //error
    builder.addCase(fetchCategories.rejected, (state) => {
      state.isLoading = false
    })
  }
})

export default categorySlice.reducer