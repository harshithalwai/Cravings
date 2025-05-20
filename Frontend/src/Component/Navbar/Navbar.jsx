import React, { useState,useContext } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/storeContext.jsx";
const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("home");
    const {getCartTotal} = useContext(StoreContext);
    return (
        <nav className="navbar">
            <Link to="/">
                <img src={assets.logo} alt="Cravings" className="logo" />
            </Link>
            <ul className="navbar-menu">
                <li
                    onClick={() => setMenu("home")}
                    className={menu === "home" ? "active" : ""}
                >
                    <Link to="/">Home</Link>
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
                    <Link to={getCartTotal()===0?"/":"/cart"}>
                        <img src={assets.basket_icon} alt="Basket" />
                        <div className={getCartTotal()===0?"":"dot"}></div>
                    </Link>
                </div>
                <button
                    onClick={() => {
                        setShowLogin(true);
                    }}
                >
                    Sign in{" "}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
