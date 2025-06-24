import { useEffect, useState } from 'react'
import './App.css'
import Login from './Components/Login'
import { get_cookie } from './utils'
import Register from './Components/Register'
import Todo from './Components/Todo'

function App() {

  const [isRegister, setIsRegister] = useState(false)
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    setIsLogin((get_cookie('user')?.id !== undefined))
  }, [])

  if (!isLogin) {
    return <div className='app'>
      {
        isRegister ?
          <Register
            setIsRegister={setIsRegister}
          />
          :
          <Login
            setIsRegister={setIsRegister}
            setIsLogin={setIsLogin}
          />
      }
    </div>
  }

  return <div className='app-1'>
    <Todo />
  </div>
}

export default App
