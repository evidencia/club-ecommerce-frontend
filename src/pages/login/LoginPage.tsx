import { useForm } from 'react-hook-form'
import { BsGoogle } from "react-icons/bs";
import { FiLogIn } from "react-icons/fi";
import validator from 'validator'

import CustomButton from "../../components/Custom-button/Custom-button";
import CustomInput from "../../components/Custom-Input/Custom-Input";
import Header from "../../components/Header/Header";
import InputErrorMessage from "../../components/Input-error-message/Input-error-message";

import { LoginContainer, LoginHeadline, LoginInputContainer, LoginSubtitle } from "./Login.styles";

function LoginPAge() {
  const { register, formState: {errors}, handleSubmit } = useForm()

  const handleSubmitPress = (data: any) =>{

  }

  return ( 
    <>
      <Header />

      <LoginContainer>
        <LoginHeadline>Entre com sua conta</LoginHeadline>

        <CustomButton  startIcon={<BsGoogle size={18} />}>
          Entrar com o Google
        </CustomButton>

        <LoginSubtitle>ou entre com o seu e-mail</LoginSubtitle>

        <LoginInputContainer>
          <p>E-mail</p>
          <CustomInput 
            hasError={!!errors?.email}
            placeholder="Digite o seu email" 
            {...register('email', { 
              required: true, 
              validate: (value: any)=> {
                return validator.isEmail(value)
              }
            })}
          />
          {errors?.email?.type === 'required' && (
            <InputErrorMessage>O email é obrigatória.</InputErrorMessage>
          )}

          {errors?.email?.type === 'validate' && (
            <InputErrorMessage>Por favor, insira um email válido</InputErrorMessage>
          )}
        </LoginInputContainer>

        <LoginInputContainer>
          <p>Senha</p>
          <CustomInput 
            hasError={!!errors?.password}
            placeholder="Digite sua senha" 
            {...register('passaword', { required: true })}
          />

          {errors?.password?.type === 'required' && (
            <InputErrorMessage>A senha é obrigatória.</InputErrorMessage>
          )}
        </LoginInputContainer>

        <CustomButton 
          startIcon={<FiLogIn size={18} />}
          onClick={() => handleSubmit(handleSubmitPress)}
        >
          Entrar
        </CustomButton>
      </LoginContainer>
    </>
  );
}

export default LoginPAge;