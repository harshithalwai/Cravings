<<<<<<< HEAD
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Component/Navbar/Navbar.jsx";
import Home from "./Pages/Home/Home.jsx";
import Cart from "./Pages/Cart/Cart.jsx";
import PlaceOrder from "./Pages/PlaceOrder/PlaceOrder.jsx";
import Footer from "./Component/Footer/Footer.jsx";
import LoginPopup from "./Component/LoginPopup/LoginPopup.jsx";
import { ToastContainer } from "react-toastify";
=======
// 1. FIXED App.jsx - Added proper imports and error handling
import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Component/Navbar/Navbar.jsx'
import Home from "./Pages/Home/Home.jsx"
import Cart from './Pages/Cart/Cart.jsx'
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder.jsx'
import Footer from './Component/Footer/Footer.jsx'
import LoginPopup from './Component/LoginPopup/LoginPopup.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' // Added missing CSS import
>>>>>>> 92878726fc981a92d046ce49216a06d1a6141516

const App = () => {
  const [Showlogin, setShowLogin] = useState(false)
  
  return (
    
    <>
<<<<<<< HEAD
      {Showlogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
=======
      {Showlogin && <LoginPopup setShowLogin={setShowLogin}/>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin}/>

>>>>>>> 92878726fc981a92d046ce49216a06d1a6141516
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
        </Routes>
      </div>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

<<<<<<< HEAD
export default App;
=======
export default App
>>>>>>> 92878726fc981a92d046ce49216a06d1a6141516
