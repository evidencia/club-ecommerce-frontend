import { BsGoogle } from "react-icons/bs";
import CustomButton from "../../components/Custom-button/Custom-button";
import Header from "../../components/Header/Header";
import { FiLogIn } from "react-icons/fi";
import CustomInput from "../../components/Custom-Input/Custom-Input";
import { LoginContainer, LoginHeadline, LoginInputContainer, LoginSubtitle } from "./Login.styles";

function LoginPAge() {
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
          <CustomInput placeholder="Digite o seu email" />
        </LoginInputContainer>

        <LoginInputContainer>
          <p>Senha</p>
          <CustomInput placeholder="Digite sua senha" />
        </LoginInputContainer>

        <CustomButton startIcon={<FiLogIn size={18} />}>
          Entrar
        </CustomButton>
      </LoginContainer>
    </>
  );
}

export default LoginPAge;