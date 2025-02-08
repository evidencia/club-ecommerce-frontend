
import { Route, Routes } from "react-router-dom"
import Home from "./pages/home/Home"
import LoginPage from "./pages/login/LoginPage"
import SignUp from "./pages/Sign-up/Sign-up.page"
import { onAuthStateChanged } from "firebase/auth"
import { auth, db } from "./config/firebase.config"
import { UserContext } from "./contexts/user.context"
import { useContext } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"

function App() {
  const {isAuthenticated, loginUser, logoutUser} = useContext(UserContext)

  onAuthStateChanged(auth, async(user) => {
    const isSigningOut = isAuthenticated && !user
    if (isSigningOut) {
      return logoutUser()
    }

    const isSigningIn = !isAuthenticated && user
    if (isSigningIn) {
      const querySnapshot = await getDocs(
        query(collection(db, 'users'), where('id', '==', user.uid))
      )

      const userFromFirestore = querySnapshot.docs[0]?.data()
      return loginUser(userFromFirestore as any)
    }
  })
  
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/sign-up' element={<SignUp />} />
    </Routes>
  )
}

export default App
