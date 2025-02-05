
import { Route, Routes } from "react-router-dom"
import Home from "./pages/home/Home"
import LoginPage from "./pages/login/LoginPage"
import SignUp from "./pages/Sign-up/Sign-up.page"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./config/firebase.config"

function App() {
  onAuthStateChanged(auth, (user) => {
    console.log(user)
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
