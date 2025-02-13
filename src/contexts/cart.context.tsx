import { createContext, ReactNode, useState } from "react"
import CartProduct from "../types/cart.types"

interface IcartContext {
  isVisible: boolean
  products: CartProduct[]
  toogleCart: () => void
}

interface CartContextProps {
  children: ReactNode
}

const CartContext = createContext<IcartContext>({
  isVisible: false,
  products: [],
  toogleCart: () => {}
})

const CartContextProvider = ({ children }: CartContextProps) => {
  const [isVisible, setVisible] = useState(false)
  const [products, setProducts] = useState<CartProduct[]>([])

  const toogleCart = () => {
    setVisible((prevState) => !prevState)
  }

  return (
    <CartContext.Provider value={{isVisible, products, toogleCart}}>
      {children}
    </CartContext.Provider>
  )
}


export default CartContextProvider