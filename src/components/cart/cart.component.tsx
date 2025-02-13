import { useContext } from 'react'
import { BsCartCheck } from 'react-icons/bs'


// Styles
import {
  CartContainer,
  CartContent,
  CartEscapeArea,
  CartTitle,
  CartTotal
} from './cart.styles'
import { CartContext } from '../../contexts/cart.context'
import CustomButton from '../Custom-button/Custom-button'
import CartItem from '../cart-item/cart-item.component'

const Cart = () => {
  const { isVisible, products, toggleCart } = useContext(CartContext)

  return (
    <CartContainer isVisible={isVisible}>
      <CartEscapeArea onClick={toggleCart} />
      <CartContent>
        <CartTitle>Seu Carrinho</CartTitle>

        {/* produtos */}
        {products.map((product)=> {
          return (
            <CartItem key={product.id} product={product} />
          )
        })}

        <CartTotal>Total: R$999</CartTotal>

        <CustomButton startIcon={<BsCartCheck />}>
          Ir para o Checkout
        </CustomButton>
      </CartContent>
    </CartContainer>
  )
}

export default Cart