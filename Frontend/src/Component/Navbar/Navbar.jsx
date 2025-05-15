import React, { useState } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import "./Navbar.css";
const Navbar = ({setShowLogin}) => {
    const [menu, setMenu] = useState("home");
    return (
        <nav className="navbar">
            <img src={assets.logo} alt="Cravings" className="logo" />
            <ul className="navbar-menu">
                <li
                    onClick={() => setMenu("home")}
                    className={menu === "home" ? "active" : ""}
                >
                    <a href="/">Home</a>
                </li>
                <li
                    onClick={() => setMenu("menu")}
                    className={menu === "menu" ? "active" : ""}
                >
                    <a href="#explore-menu">Menu</a>
                </li>
                <li
                    onClick={() => setMenu("mobile-app")}
                    className={menu === "mobile-app" ? "active" : ""}
                >
                    <a href="#app-download">Mobile Apps</a>
                </li>
                <li
                    onClick={() => setMenu("contact-us")}
                    className={menu === "contact-us" ? "active" : ""}
                >
                    <a href="#footer">Contact Us</a>
                </li>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="Search Bar" />
                <div className="navbar-search-icon">
                    <img src={assets.basket_icon} alt="Basket" />
                    <div className="dot"></div>
                </div>
                <button onClick={()=>{
                    setShowLogin(true);
                }}>Sign in </button>
            </div>
        </nav>
    );
};

export default Navbar;
