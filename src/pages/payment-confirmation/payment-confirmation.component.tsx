import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineHome } from "react-icons/ai";
import Header from "../../components/Header/Header";
import { PaymentConfirmationContainer, PaymentConfirmationContent } from "./payment-confirmation.styles";
import { useNavigate, useSearchParams } from "react-router-dom";
import Colors from "../../theme/theme.colors";
import CustomButton from "../../components/Custom-button/Custom-button";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCartProduct } from "../../store/toolkit/cart/cart.slice"

function PaymentConfirmationPage() {
  const [ searchParams ] = useSearchParams()
  const status = searchParams.get('success')
  const isCanceled = searchParams.get('canceled') === 'true'

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleGoToHomePageClick = () => {
    navigate('/')
  } 

  useEffect(()=> {
    if(status === 'true') {
      dispatch(clearCartProduct())
    }
  }, [status])

  return (
    <>
      <Header />

      <PaymentConfirmationContainer>
        <PaymentConfirmationContent>
          {status === 'true' && (
            <>
              <AiOutlineCheckCircle  size={120} color={Colors.success}/>
              <p>Sua compra foi finalizada com sucesso!</p>
            </>
          )}

          {(status === 'false' || isCanceled) && (
            <>
              <AiOutlineCloseCircle size={120} color={Colors.error} />
              <p>Ocorreu um erro ao finalizar sua compra. Por favor, tente novamente</p>
            </>
          )}

          <CustomButton 
            startIcon={<AiOutlineHome />}
            onClick={handleGoToHomePageClick}
          >
            Ir para a página inicial
          </CustomButton>
        </PaymentConfirmationContent>
      </PaymentConfirmationContainer>
    </>
  );
}

export default PaymentConfirmationPage;