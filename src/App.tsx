
import { Route, Routes } from "react-router-dom"
import Home from "./pages/home/Home"
import LoginPage from "./pages/login/LoginPage"
import SignUp from "./pages/Sign-up/Sign-up.page"
import { onAuthStateChanged } from "firebase/auth"
import { auth, db } from "./converters/config/firebase.config"
import { collection, getDocs, query, where } from "firebase/firestore"
import { userConverter } from "./converters/firebase.converters"
import Loading from "./components/Loading/Loading"
import ExplorePage from "./pages/explore/explore.page"
import CategoryDetailsPage from "./pages/category-details/category-details.page"
import CheckoutPage from "./pages/checkout/checkout.page"
import AuthenticationGuards from "./guards/authentication.guards"
import PaymentConfirmationPage from "./pages/payment-confirmation/payment-confirmation.component"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { loginUser, logoutUser } from "./store/reducers/user/user.actions"
import { useAppSelector } from "./hooks/redux.hooks"


function App() {
  const [isInitializing, setIsInitializing] = useState(true)
  const dispatch = useDispatch()

  const { isAuthenticated } = useAppSelector(
    (rootReducer: any) => rootReducer.userReducer
  )


  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      const isSigningOut = isAuthenticated && !user

      if (isSigningOut) {
        dispatch(logoutUser() as any)

        return setIsInitializing(false)
      }

      const isSigningIn = !isAuthenticated && user

      if (isSigningIn) {
        const querySnapshot = await getDocs(
          query(
            collection(db, 'users').withConverter(userConverter),
            where('id', '==', user.uid)
          )
        )

        const userFromFirestore = querySnapshot.docs[0]?.data()

        dispatch(loginUser(userFromFirestore) as any)

        return setIsInitializing(false)
      }

      return setIsInitializing(false)
    })
  }, [dispatch])

  if (isInitializing) return <Loading />

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/explore' element={<ExplorePage />} />
      <Route path='/category/:id' element={<CategoryDetailsPage />} />
      <Route
        path='/checkout'
        element={
          <AuthenticationGuards>
            <CheckoutPage />
          </AuthenticationGuards>
        }
      />
      <Route path='/payment-confirmation' element={<PaymentConfirmationPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/sign-up' element={<SignUp />} />
    </Routes>
  )
}

export default App
