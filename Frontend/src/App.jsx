import React from 'react'

import {BrowserRouter, Route, Routes} from "react-router-dom"
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import UserPage from './pages/UserPage'
import AdminPage from "./pages/AdminPage"
import ClientPage from "./pages/ClientPage"

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/signup' element={<SignupPage/>}/>
      <Route path='/user' element={<UserPage/>}/>
      <Route path='/admin' element={<AdminPage/>}/>
      <Route path='/client' element={<ClientPage/>}/>
    </Routes>

    </BrowserRouter>
  )
}

export default App