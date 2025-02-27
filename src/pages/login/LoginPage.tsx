import { BsGoogle } from 'react-icons/bs'
import { FiLogIn } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import validator from 'validator'


// Styles
import {
  LoginContainer,
  LoginContent,
  LoginHeadline,
  LoginInputContainer,
  LoginSubtitle
} from './Login.styles'
import Header from '../../components/Header/Header'
import CustomButton from '../../components/Custom-button/Custom-button'
import CustomInput from '../../components/Custom-Input/Custom-Input'
import InputErrorMessage from '../../components/Input-error-message/Input-error-message'
import { AuthError, AuthErrorCodes, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, db, googleProvider } from '../../converters/config/firebase.config'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '../../components/Loading/Loading'
import { useAppSelector } from '../../hooks/redux.hooks'

interface LoginForm {
  email: string
  password: string
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<LoginForm>()

  const [isLoading, setIsLoading] = useState(false)

  const { isAuthenticated } = useAppSelector(
    (rootReducer: any) => rootReducer.userReducer
  )

  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated])

  const handleSubmitPress = async (data: LoginForm) => {
    try {
      setIsLoading(true)
      const userCredentials = await signInWithEmailAndPassword(auth, data.email, data.password)
      console.log({ userCredentials })

    } catch (error) {
      const _error = error as AuthError

      if (_error.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
        return setError('password', { type: 'mismatch' })
      }

      if (_error.code === AuthErrorCodes.USER_DELETED) {
        return setError('password', { type: 'notFound' })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignInWithGooglePress = async () => {
    try {
      setIsLoading(true)
      const userCredentials = await signInWithPopup(auth, googleProvider)

      const querySnapshot = await getDocs(
        query(
          collection(db, 'users'),
          where('id', '==', userCredentials.user.uid)
        )
      )
      const user = querySnapshot.docs[0]?.data()

      if (!user) {
        const firstName = userCredentials.user.displayName?.split(' ')[0]
        const lastName = userCredentials.user.displayName?.split(' ')[1]

        await addDoc(collection(db, 'users'), {
          id: userCredentials.user.uid,
          email: userCredentials.user.email,
          firstName,
          lastName,
          provider: 'google'
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Header />

      {isLoading && <Loading />}
      <LoginContainer>
        <LoginContent>
          <LoginHeadline>Entre com a sua conta</LoginHeadline>

          <CustomButton
            onClick={handleSignInWithGooglePress}
            startIcon={<BsGoogle size={18} />}
          >
            Entrar com o Google
          </CustomButton>

          <LoginSubtitle>ou entre com o seu e-mail</LoginSubtitle>

          <LoginInputContainer>
            <p>E-mail</p>
            <CustomInput
              hasError={!!errors?.email}
              placeholder="Digite seu e-mail"
              {...register('email', {
                required: true,
                validate: (value) => {
                  return validator.isEmail(value)
                }
              })}
            />

            {errors?.email?.type === 'required' && (
              <InputErrorMessage>O e-mail é obrigatório.</InputErrorMessage>
            )}

            {errors?.email?.type === 'notFound' && (
              <InputErrorMessage>O e-mail não foi encontrado.</InputErrorMessage>
            )}

            {errors?.email?.type === 'validate' && (
              <InputErrorMessage>
                Por favor, insira um e-mail válido.
              </InputErrorMessage>
            )}
          </LoginInputContainer>

          <LoginInputContainer>
            <p>Senha</p>
            <CustomInput
              hasError={!!errors?.password}
              placeholder="Digite sua senha"
              type="password"
              {...register('password', { required: true })}
            />

            {errors?.password?.type === 'required' && (
              <InputErrorMessage>A senha é obrigatória.</InputErrorMessage>
            )}

            {errors?.password?.type === 'mismatch' && (
              <InputErrorMessage>A senha é invalida.</InputErrorMessage>
            )}

          </LoginInputContainer>

          <CustomButton
            startIcon={<FiLogIn size={18} />}
            onClick={() => handleSubmit(handleSubmitPress)()}>
            Entrar
          </CustomButton>
        </LoginContent>
      </LoginContainer>

    </>
  )
}

export default LoginPage