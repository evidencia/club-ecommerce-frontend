import { BsGoogle } from "react-icons/bs";
import CustomButton from "../../components/Custom-button/Custom-button";
import Header from "../../components/Header/Header";
import { FiLogIn } from "react-icons/fi";
import CustomInput from "../../components/Custom-Input/Custom-Input";
import { useForm } from 'react-hook-form'
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
            {...register('email', { required: true })}
          />
        </LoginInputContainer>

        <LoginInputContainer>
          <p>Senha</p>
          <CustomInput 
            hasError={!!errors?.password}
            placeholder="Digite sua senha" 
            {...register('passaword', { required: true })}
          />
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