import { createContext, ReactNode, useMemo, useState } from "react"
import CartProduct from "../types/cart.types"
import Product from "../types/product.types"

interface IcartContext {
  isVisible: boolean
  products: CartProduct[]
  productsTotalPrice: number
  productsCount: number
  toggleCart: () => void
  addProductToCart: (product: Product) => void
  removeProductFromCart: (productId: string) => void
  increaseProductQuantity: (productId: string) => void
  decreaseProductQuantity: (productId: string) => void
}

interface CartContextProps {
  children: ReactNode
}

export const CartContext = createContext<IcartContext>({
  isVisible: false,
  productsTotalPrice: 0,
  productsCount: 0,
  products: [],
  toggleCart: () => {},
  addProductToCart: () => {},
  removeProductFromCart: () => {},
  increaseProductQuantity: () => {},
  decreaseProductQuantity: () => {},
})

const CartContextProvider = ({ children }: CartContextProps) => {
  const [isVisible, setVisible] = useState(false)
  const [products, setProducts] = useState<CartProduct[]>([])

  const productsTotalPrice = useMemo(()=>{
    return products.reduce((acc, currentProduct) => {
      return acc + currentProduct.price * currentProduct.quantity
    }, 0)
  }, [products])

  const productsCount = useMemo(()=>{
    return products.reduce((acc, currentProduct) => {
      return acc + currentProduct.quantity
    }, 0)
  }, [products])

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

  const increaseProductQuantity = (productId: string) => {
    setProducts((products) => 
      products.map((product) => 
        product.id === productId 
          ? {...product, quantity: product.quantity + 1} 
          : product
      )
    )
  }

  const decreaseProductQuantity = (productId: string) => {
    setProducts((products) =>
      products.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity - 1 }
          : product
      ).filter(product => product.quantity > 0)
    )
  }

  return (
    <CartContext.Provider 
      value={{ 
        isVisible, 
        productsTotalPrice,
        productsCount,
        products, 
        toggleCart, 
        addProductToCart, 
        removeProductFromCart, 
        increaseProductQuantity,
        decreaseProductQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}


export default CartContextProvider