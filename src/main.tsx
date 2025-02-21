import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App.tsx'
import './main.styles.css'
import UserContextProvider from './contexts/user.context.tsx'
import CategoryContextProvider from './contexts/category.context.tsx'
import CartContextProvider from './contexts/cart.context.tsx'
import Cart from './components/cart/cart.component.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <CategoryContextProvider>
          <CartContextProvider>
            <App />
            <Cart />
          </CartContextProvider>
        </CategoryContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
