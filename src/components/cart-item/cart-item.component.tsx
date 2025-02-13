import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import CartProduct from "../../types/cart.types";
import { CartItemContainer, CartItemImage, CartItemInfo, CartItemQuantity, RemoveButton } from "./cart-item.styles";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

interface CartItemProps {
  product: CartProduct
}

function CartItem({ product }: CartItemProps) {
  const { removeProductFromCart, increaseProductQuantity } = useContext(CartContext)

  const handleRemoveProductFromCart = () => {
    removeProductFromCart(product.id)
  }

  const handleIncreaseClick = () => {
    increaseProductQuantity(product.id)
  }


  return (
    <CartItemContainer>
      <CartItemImage imageUrl={product.imageUrl} />

      <CartItemInfo>
        <p>{product.name}</p>
        <p>{product.price}</p>

        <CartItemQuantity>
          <AiOutlineMinus size={20}/>
          <p>{product.quantity}</p>
          <AiOutlinePlus size={20} onClick={handleIncreaseClick}/>
        </CartItemQuantity>
      </CartItemInfo>

      <RemoveButton onClick={handleRemoveProductFromCart}>
        <AiOutlineClose size={25}/>
      </RemoveButton>
    </CartItemContainer>
  );
}

export default CartItem;