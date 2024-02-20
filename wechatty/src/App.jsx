import React from 'react'
import {BrowserRouter ,Routes ,Route } from 'react-router-dom'
import Chat from './Chat'
import Login from './Login'
import Register from './Register'
import SetAvatar from './SetAvatar'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path = '/' element = {<Chat/>}/>
          <Route path = '/login' element = {<Login/>}/>
          <Route path = '/register' element = {<Register/>}/>
          <Route path = '/setavatar' element = {<SetAvatar/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
