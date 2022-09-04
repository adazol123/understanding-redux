import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { incremented, decremented, amountAdded, toggleState } from './features/store/store-slice'
import { auth } from './api/firebase'
import { fetchUser, login, logout, selectUser } from './features/user/user-auth-slice'
import ChildComponent from './components/ChildComponent'
import Login from './components/Login'
import { onAuthStateChanged } from 'firebase/auth'
import { fetchProducts, selectAllProducts } from './features/shop/products-slice'
import useFirebaseFetcher from './hooks/useFirebaseFetcher'
function App() {
  const user = useAppSelector(selectUser)
  let productStatus = useAppSelector(state => state.shop.status)
  let authStatus = useAppSelector(state => state.auth.status)

  useFirebaseFetcher(productStatus, fetchProducts())

  useFirebaseFetcher(authStatus, fetchUser())

  return (
    <div className=" w-full">
      {user ? <ChildComponent /> : <Login />}
    </div>
  )
}

export default App
