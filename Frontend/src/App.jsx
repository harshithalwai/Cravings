import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Component/Navbar/Navbar.jsx'
import Home from "./Pages/Home/Home.jsx"
import Cart from './Pages/Cart/Cart.jsx'
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder.jsx'
import Footer from './Component/Footer/Footer.jsx'
import LoginPopup from './Component/LoginPopup/LoginPopup.jsx'

const App = () => {
  const [Showlogin, setShowLogin] = useState(false);
  return (
    <>
    {
      Showlogin && <LoginPopup setShowLogin={setShowLogin}/>
    }
      <div className="app">
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App    