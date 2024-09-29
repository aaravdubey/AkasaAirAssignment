import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Orders from './pages/Orders'
import Payment from './pages/Payment'
import Success from './pages/Success'
import Failure from './pages/Failure'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order/success" element={<Success />} />
        <Route path="/order/failure" element={<Failure />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
