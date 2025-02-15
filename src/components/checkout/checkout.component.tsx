import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { CheckoutContainer, CheckoutProducts, CheckoutTitle, CheckoutTotal } from './checkout.styles'
import CustomButton from "../Custom-button/Custom-button";
import { BsBagCheck } from "react-icons/bs";
import CartItem from "../cart-item/cart-item.component";

function Chechout() {
  const { products, productsTotalPrice } = useContext(CartContext)

  return (
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
          <CustomButton startIcon={<BsBagCheck />}>Finalizar Compra</CustomButton>
        </>
      ): (
        <p>Seu carrinho esta vazio!</p>
      )}
    </CheckoutContainer>
  );
}

export default Chechout;