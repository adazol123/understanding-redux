import './App.css'
import { useAppSelector } from './app/hooks'
import { fetchUser, selectUser } from './features/user/user-auth-slice'
import ChildComponent from './components/ChildComponent'
import Login from './components/Login'
import { fetchProducts, selectAllProducts } from './features/shop/products-slice'
import { useFirebaseFetcher } from './hooks/useFirebaseFetcher'
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
