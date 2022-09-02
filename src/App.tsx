import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { incremented, decremented, amountAdded, toggleState } from './features/store/store-slice'
import { auth, onAuthStateChanged } from './api/firebase'
import { login, logout } from './features/user/user-auth-slice'
import ChildComponent from './components/ChildComponent'
import Login from './components/Login'
function App() {
  const user = useAppSelector(state => state.user.user)
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(login({
          email: userAuth.email,
          uid: userAuth.uid,
          displayName: userAuth.displayName,
          photoUrl: userAuth.photoURL
        }))
      } else {
        dispatch(logout())
      }
    })
  }, [user])



  return (
    <div className="App">
      {user ? <ChildComponent /> : <Login />}
    </div>
  )
}

export default App
