import React from 'react'

import {BrowserRouter, Route, Routes} from "react-router-dom"
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import AddProduct from './pages/AddProduct'
import ClientPage from './pages/ClientPage'


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/signup' element={<SignupPage/>}/>
      <Route path='/addproduct' element={<AddProduct/>}/>
      <Route path='/show' element={<ClientPage/>}/>
     
    </Routes>

    </BrowserRouter>
  )
}

export default App