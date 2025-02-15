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
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const { isVisible, products, toggleCart, productsTotalPrice, productsCount } = useContext(CartContext)
  const navigate = useNavigate()

  const handleGoToCheckoutClick = () => {
    navigate('/checkout')
    toggleCart()
  }

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

        { productsCount > 0 && (
          <CartTotal>Total: R${productsTotalPrice}</CartTotal>
        )}

        {productsCount > 0 && (
          <CustomButton 
            onClick={handleGoToCheckoutClick} 
            startIcon={<BsCartCheck />}
          >
            Ir para o Checkout
          </CustomButton>
        )}

        {productsCount === 0 && <p>O seu carrinho esta vazio</p>}
      </CartContent>
    </CartContainer>
  )
}

export default Cart