import { createContext, ReactNode, useState } from "react"
import CartProduct from "../types/cart.types"
import Product from "../types/product.types"
import { it } from "node:test"

interface IcartContext {
  isVisible: boolean
  products: CartProduct[]
  toggleCart: () => void
  addProductToCart: (product: Product) => void
  removeProductFromCart: (productId: string) => void

}

interface CartContextProps {
  children: ReactNode
}

export const CartContext = createContext<IcartContext>({
  isVisible: false,
  products: [],
  toggleCart: () => {},
  addProductToCart: () => {},
  removeProductFromCart : () => {}
})

const CartContextProvider = ({ children }: CartContextProps) => {
  const [isVisible, setVisible] = useState(false)
  const [products, setProducts] = useState<CartProduct[]>([])

  const toggleCart = () => {
    setVisible((prevState) => !prevState)
  }

  const addProductToCart = (product: Product) => {
    //verificar se o produto já esta no carrinho
    const productAlreadyInCart = products.some(
      (item) => item.id === product.id
    )

    //se sim -> aumentar sua quantidade
    if(productAlreadyInCart) {
      return setProducts((products) => {
        return (
          products.map((item) => {
            return (
              item.id === product.id ? {...item, quantity: item.quantity + 1} : item
            )
          })
        )
      })
    }

    //se não -> adicioná-lo
    setProducts((prevState) => [...prevState, {...product, quantity: 1}])
  }

  const removeProductFromCart = (productId: string) => {
    setProducts((products) => 
      products.filter((product) => product.id !== productId)
    )
  }

  return (
    <CartContext.Provider value={{ isVisible, products, toggleCart, addProductToCart, removeProductFromCart }}>
      {children}
    </CartContext.Provider>
  )
}


export default CartContextProvider