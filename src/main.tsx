import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App.tsx'
import './main.styles.css'
import UserContextProvider from './contexts/user.context.tsx'
import Cart from './components/cart/cart.component.tsx'
import { store, persistedStore } from './store/store.ts'
//@ts-ignore
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <Provider store={store}>
          <PersistGate persistor={persistedStore}>
            <App />
            <Cart />
          </PersistGate>
        </Provider>
      </UserContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
