
import { Route, Routes } from "react-router-dom"
import Home from "./pages/home/Home"
import LoginPage from "./pages/login/LoginPage"
import SignUp from "./pages/Sign-up/Sign-up.page"
import { onAuthStateChanged } from "firebase/auth"
import { auth, db } from "./config/firebase.config"
import { UserContext } from "./contexts/user.context"
import { useContext, useState } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { userConverter } from "./converters/firebase.converters"
import Loading from "./components/Loading/Loading"
import ExplorePage from "./pages/explore/explore.page"

function App() {
  const [isInitializing, setIsInitializing] = useState(true) 
  const {isAuthenticated, loginUser, logoutUser} = useContext(UserContext)

  onAuthStateChanged(auth, async(user) => {
    const isSigningOut = isAuthenticated && !user
    if (isSigningOut) {
      logoutUser()
      return setIsInitializing(false)
    }

    const isSigningIn = !isAuthenticated && user
    if (isSigningIn) {
      const querySnapshot = await getDocs(
        query(collection(db, 'users').withConverter(userConverter), where('id', '==', user.uid))
      )

      const userFromFirestore = querySnapshot.docs[0]?.data()
      loginUser(userFromFirestore)
      return setIsInitializing(false)
    }

    setIsInitializing(false)
  })
  
  if (isInitializing) return <Loading />

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/explore' element={<ExplorePage />} />
    </Routes>
  )
}

export default App
