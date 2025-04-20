import React, { useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/frontend_assets/assets.js";

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  return (
    <>
      <nav className="navbar">
        <div className="nav-logo">
          <img src={assets.logo} alt="Carvings" />
        </div>

        <ul className="nav-menu">
          <li
            onClick={() => {
              setMenu("home");
            }}
            className={menu === "home" ? "active" : ""}
          >
            <a href="#">Home</a>
          </li>

          <li
            onClick={() => {
              setMenu("menu");
            }}
            className={menu === "menu" ? "active" : ""}
          >
            <a href="#">Menu</a>
          </li>

          <li
            onClick={() => {
              setMenu("mobile-apps");
            }}
            className={menu === "mobile-apps" ? "active" : ""}
          >
            <a href="#">Mobile Apps</a>
          </li>

          <li
            onClick={() => {
              setMenu("contact-us");
            }}
            className={menu === "contact-us" ? "active" : ""}
          >
            <a href="#">Contact Us</a>
          </li>
        </ul>


        <div className="nav-right">
          <img src={assets.search_icon} alt="Search Icon" className='nav-search' />
          <div className="navbar-cart">
            <img src={assets.basket_icon} alt="" />
            <div className="dot"></div>
          </div>
          <button className="signin">Sign In</button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
