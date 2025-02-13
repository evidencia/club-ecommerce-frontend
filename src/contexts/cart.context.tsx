import { createContext, ReactNode, useState } from "react"
import CartProduct from "../types/cart.types"

interface IcartContext {
  isVisible: boolean
  products: CartProduct[]
  toggleCart: () => void
}

interface CartContextProps {
  children: ReactNode
}

export const CartContext = createContext<IcartContext>({
  isVisible: false,
  products: [],
  toggleCart: () => {}
})

const CartContextProvider = ({ children }: CartContextProps) => {
  const [isVisible, setVisible] = useState(false)
  const [products, setProducts] = useState<CartProduct[]>([])

  const toggleCart = () => {
    setVisible((prevState) => !prevState)
  }

  return (
    <CartContext.Provider value={{ isVisible, products, toggleCart }}>
      {children}
    </CartContext.Provider>
  )
}


export default CartContextProvider