import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App.tsx'
import './main.styles.css'
import UserContextProvider from './contexts/user.context.tsx'
import CategoryContextProvider from './contexts/category.context.tsx'
import CartContextProvider from './contexts/cart.context.tsx'
import Cart from './components/cart/cart.component.tsx'
import store from './store/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <UserContextProvider>
        <CategoryContextProvider>
          <CartContextProvider>
            <App />
            <Cart />
          </CartContextProvider>
        </CategoryContextProvider>
      </UserContextProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
