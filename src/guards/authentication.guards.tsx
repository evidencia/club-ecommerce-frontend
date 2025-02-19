import { useEffect, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header/Header'
import Loading from '../components/Loading/Loading'
import { useSelector } from 'react-redux'

interface AuthProps {
  children: ReactNode
}

function AuthenticationGuards({ children }: AuthProps) {
  const { isAuthenticated } = useSelector(
    (rootReducer: any) => rootReducer.userReducer
  )

  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    }
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return (
      <>
        <Header />

        <Loading message='Você precisa estar logado para acessar esta página. Você será redirecionado para a página de login em instantes...' />
      </>
    )
  }

  return <>{children}</>
}

export default AuthenticationGuards
