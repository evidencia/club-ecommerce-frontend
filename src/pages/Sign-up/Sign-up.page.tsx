
import { useForm } from "react-hook-form";
import { FiLogIn } from "react-icons/fi";

import CustomButton from "../../components/Custom-button/Custom-button";
import CustomInput from "../../components/Custom-Input/Custom-Input";
import Header from "../../components/Header/Header";

import { SignUpContainer, SignUpContent, SignUpHeadline, SignUpInputContainer } from "./Sign-up.styles";
import InputErrorMessage from "../../components/Input-error-message/Input-error-message";

interface SignUpForm{
  name: string
  lastName: string
  email: string
  password: string
  passwordConfirmation: string
}

function SignUp() {
  const { register, handleSubmit, formState: {errors}, watch} = useForm<SignUpForm>()

  const watchPassword = watch('password')

  const handleSubmitPress = (data: SignUpForm) => {

  }

  return (
    <>
      <Header />

      <SignUpContainer>
        <SignUpContent>
          <SignUpHeadline>Criar sua conta</SignUpHeadline>

          <SignUpInputContainer>
            <p>Nome</p>
            <CustomInput 
              hasError={!!errors?.name}
              placeholder="Digite seu nome"
              {...register('name'), {required: true}}
            />

            {errors?.name?.type === 'required' && (
              <InputErrorMessage>O nome é obrigatória</InputErrorMessage>
            )}
          </SignUpInputContainer>

          <SignUpInputContainer>
            <p>Sobrenome</p>
            <CustomInput 
              hasError={!!errors?.lastName}
              placeholder="Digite seu sobrenome" 
              {...register('lastName'), { required: true }}
            />

            {errors?.lastName?.type === 'required' && (
              <InputErrorMessage>O sobrenome é obrigatória</InputErrorMessage>
            )}
          </SignUpInputContainer>

          <SignUpInputContainer>
            <p>Email</p>
            <CustomInput 
              hasError={!!errors?.email}
              placeholder="Digite seu email" 
              {...register('email'), { required: true }}
            />

            {errors?.email?.type === 'required' && (
              <InputErrorMessage>O email é obrigatória</InputErrorMessage>
            )}

            {errors?.email?.type === 'validate' && (
              <InputErrorMessage>Por favor, insira o email válido.</InputErrorMessage>
            )}
          </SignUpInputContainer>

          <SignUpInputContainer>
            <p>Senha</p>
            <CustomInput 
              hasError={!!errors?.password}
              type="password"
              placeholder="Digite sua senha" 
              {...register('password'), { required: true }}
            />

            {errors?.password?.type === 'required' && (
              <InputErrorMessage>A senha é obrigatória</InputErrorMessage>
            )}
          </SignUpInputContainer>

          <SignUpInputContainer>
            <p>Confirmação de senha</p>
            <CustomInput 
              hasError={!!errors?.passwordConfirmation}
              type="password"
              placeholder="Digite novamente sua senha" 
              {...register('passwordConfirmation'), { 
                required: true, 
                validate: (value: any) => {
                  return value === watchPassword
                }
              }}
            />

            {errors?.passwordConfirmation?.type === 'required' && (
              <InputErrorMessage>A confirmação de senha é obrigatória</InputErrorMessage>
            )}

            {errors?.passwordConfirmation?.type === 'validate' && (
              <InputErrorMessage>A confirmação de senha precisa ser igual a senha</InputErrorMessage>
            )}
          </SignUpInputContainer>

          <CustomButton 
            startIcon={<FiLogIn size={18}/>}
            onClick={() => handleSubmit(handleSubmitPress)}
          >
            Criar conta
          </CustomButton>
        </SignUpContent>
      </SignUpContainer>
    </>
  );
}

export default SignUp;