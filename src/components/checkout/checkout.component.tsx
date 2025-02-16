import { useContext, useState } from "react";
import { CartContext } from "../../contexts/cart.context";
import { CheckoutContainer, CheckoutProducts, CheckoutTitle, CheckoutTotal } from './checkout.styles'
import CustomButton from "../Custom-button/Custom-button";
import { BsBagCheck } from "react-icons/bs";
import CartItem from "../cart-item/cart-item.component";
import axios from "axios";
import Loading from "../Loading/Loading";

function Chechout() {
  const { products, productsTotalPrice } = useContext(CartContext)
  const [isLoading, setIsLoading] = useState(false)

  const handleFinishPurchaseClick = async () => {
    try {
      setIsLoading(true)
      const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/create-checkout-session`!, { products })
      window.location.href= data.url
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {isLoading && <Loading />}
      <CheckoutContainer>
        <CheckoutTitle>Chechout</CheckoutTitle>

        {products.length > 0 ? (
          <>
            <CheckoutProducts>
              {products.map((product) => (
                <CartItem key={product.id} product={product} />
              ))}
            </CheckoutProducts>

            <CheckoutTotal>Total: R${productsTotalPrice}</CheckoutTotal>
            <CustomButton startIcon={<BsBagCheck />} onClick={handleFinishPurchaseClick}>Finalizar Compra</CustomButton>
          </>
        ) : (
          <p>Seu carrinho esta vazio!</p>
        )}
      </CheckoutContainer>
    </>
  );
}

export default Chechout;