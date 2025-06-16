import React, { useState, useContext } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/storeContext.jsx";
import { toast } from 'react-toastify';
const Navbar = ({ setShowLogin }) => {
    const navigate = useNavigate();
    const [menu, setMenu] = useState("home");

    const { getCartTotal, token, setToken, setCartItem } = useContext(StoreContext);
    const logout = () => {
        localStorage.removeItem("token");
        setToken("")
        setCartItem({})
        navigate("/")
        toast.success("Logged out successfully")
    }
    const goToCart = () => {
        if (token && getCartTotal() > 0) {
            navigate("/cart")
        } else {
            navigate("/")
            toast.info("Kindly join us !")
            setShowLogin(true)
        }
    }
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
                    <div
                        onClick={goToCart}
                    >
                        <img src={assets.basket_icon} alt="Basket" />
                        <div className={getCartTotal() === 0 ? "" : "dot"}></div>
                    </div>
                </div>
                {!token ? (
                    <button
                        onClick={() => {
                            setShowLogin(true);
                        }}
                    >
                        Sign in{" "}
                    </button>
                ) : (
                    <div className="navbar-profile">
                        <img src={assets.profile_icon} alt="User" />
                        <ul className="nav-profile-dropdown">
                            <li className="nav-profile-dropdown-item">
                                <img src={assets.bag_icon} alt="" />Orders
                            </li>
                            <li className="nav-profile-dropdown-item" onClick={logout}>
                                <img src={assets.logout_icon} alt="" />Logout
                            </li>
                        </ul>{" "}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
