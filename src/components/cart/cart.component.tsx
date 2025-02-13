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

const Cart = () => {
  const { isVisible, toggleCart } = useContext(CartContext)

  return (
    <CartContainer isVisible={isVisible}>
      <CartEscapeArea onClick={toggleCart} />
      <CartContent>
        <CartTitle>Seu Carrinho</CartTitle>

        {/* produtos */}

        <CartTotal>Total: R$999</CartTotal>

        <CustomButton startIcon={<BsCartCheck />}>
          Ir para o Checkout
        </CustomButton>
      </CartContent>
    </CartContainer>
  )
}

export default Cart