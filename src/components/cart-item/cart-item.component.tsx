import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import CartProduct from "../../types/cart.types";
import { CartItemContainer, CartItemImage, CartItemInfo, CartItemQuantity, RemoveButton } from "./cart-item.styles";
import { useDispatch } from "react-redux";
import { decreaseCartProductQuantity, increaseCartProductQuantity, removeProductFromCart } from "../../store/toolkit/cart/cart.slice";

interface CartItemProps {
  product: CartProduct
}

function CartItem({ product }: CartItemProps) {
  const dispatch = useDispatch() 

  const handleRemoveProductFromCart = () => {
    dispatch(removeProductFromCart(product.id))
  }

  const handleIncreaseClick = () => {
    dispatch(increaseCartProductQuantity(product.id))
  }

  const handleDecreaseClick = () => {
    dispatch(decreaseCartProductQuantity(product.id))
  }

  return (
    <CartItemContainer>
      <CartItemImage imageUrl={product.imageUrl} />

      <CartItemInfo>
        <p>{product.name}</p>
        <p>{product.price}</p>

        <CartItemQuantity>
          <AiOutlineMinus size={20} onClick={handleDecreaseClick}/>
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