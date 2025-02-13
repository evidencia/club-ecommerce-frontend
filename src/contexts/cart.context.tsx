import { createContext, ReactNode, useState } from "react"
import CartProduct from "../types/cart.types"
import Product from "../types/product.types"

interface IcartContext {
  isVisible: boolean
  products: CartProduct[]
  toggleCart: () => void
  addProductToCart: (product: Product) => void
}

interface CartContextProps {
  children: ReactNode
}

export const CartContext = createContext<IcartContext>({
  isVisible: false,
  products: [],
  toggleCart: () => {},
  addProductToCart: () => {}

})

const CartContextProvider = ({ children }: CartContextProps) => {
  const [isVisible, setVisible] = useState(false)
  const [products, setProducts] = useState<CartProduct[]>([])

  const toggleCart = () => {
    setVisible((prevState) => !prevState)
  }

  const addProductToCart = (product: Product) => {
    setProducts((prevState) => [...prevState, {...product, quantity: 1}])
  }

  return (
    <CartContext.Provider value={{ isVisible, products, toggleCart, addProductToCart }}>
      {children}
    </CartContext.Provider>
  )
}


export default CartContextProvider