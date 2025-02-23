import { BsCartCheck } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

// Utilities
import { useAppSelector } from '../../hooks/redux.hooks'
import { toggleCart } from '../../store/reducers/cart/cart.actions'

// Components
import CartItem from '../cart-item/cart-item.component'

// Styles
import {
  CartContainer,
  CartContent,
  CartEscapeArea,
  CartTitle,
  CartTotal
} from './cart.styles'
import CustomButton from '../Custom-button/Custom-button'
import { selectProductsCount, selectProductsTotalPrice } from '../../store/reducers/cart/cart.selectors'

const Cart = () => {
  const { isVisible, products } = useAppSelector((state) => state.cartReducer)
  
  const productsCount = useAppSelector(selectProductsCount)
  const productsTotalPrice = useAppSelector(selectProductsTotalPrice) 

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const handleGoToCheckoutClick = () => {
    navigate('/checkout')
    dispatch(toggleCart())
  }

  const handleEscapeAreaClick = () => {
    dispatch(toggleCart())
  }

  return (
    <CartContainer isVisible={isVisible}>
      <CartEscapeArea onClick={handleEscapeAreaClick} />
      <CartContent>
        <CartTitle>Seu Carrinho</CartTitle>

        {/* produtos */}
        {products.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}

        {productsCount > 0 && (
          <CartTotal>Total: R${productsTotalPrice}</CartTotal>
        )}

        {productsCount > 0 && (
          <CustomButton
            startIcon={<BsCartCheck />}
            onClick={handleGoToCheckoutClick}>
            Ir para o Checkout
          </CustomButton>
        )}

        {productsCount === 0 && <p>Seu carrinho está vazio!</p>}
      </CartContent>
    </CartContainer>
  )
}

export default Cart