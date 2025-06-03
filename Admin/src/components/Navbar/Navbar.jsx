import React from 'react'
import { assets } from '../../assets/admin_assets/assets'
import './Navbar.css'

const Navbar = () => {
  return (
    <>
    <nav className="navbar">
      <div className="admin-left">
        <img src={assets.logo} alt="" />
      </div>
      <div className="admin-right">
      <div className="img">
        <img src={assets.profile_image} alt="" />
      </div>
      </div>
    </nav>
    </>
  )
}

export default Navbar
