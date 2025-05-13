import React from "react";
import "./Footer.css";
import { assets } from "../../assets/frontend_assets/assets";
const Footer = () => {
    return (
        <>
            <div className="footer" id="footer">
                <div className="footer-content">
                    <div className="footer-content-left">
                        <img src={assets.logo} alt="Logo" />
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos cum
                            dolor dicta laborum exercitationem iste explicabo pariatur
                            deserunt, dolore harum temporibus, sunt quos omnis nemo
                            consequatur, commodi incidunt eveniet id!
                        </p>
                        <div className="footer-social-icons">
                            <img src={assets.facebook_icon} alt="" />
                            <img src={assets.twitter_icon} alt="" />
                            <img src={assets.linkedin_icon} alt="" />
                        </div>
                    </div>
                    <div className="footer-content-center">
                        <h2>Cravings</h2>
                        <ul>
                            <li>
                                <a href="#">Home</a>
                            </li>
                            <li>
                                <a href="#">About Us</a>
                            </li>
                            <li>
                                <a href="#">Delivery</a>
                            </li>
                            <li>
                                <a href="#">Privacy Policy</a>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-content-right">
                        <h2>Get In Touch</h2>
                        <p>+91-6388163046</p>
                        <p>Harshithalwai001@gmail.com</p>
                    </div>
                </div>
                <hr />
                <p className="footer-copyright">Copyright 2024 © Cravings.com - All Right Reserved.</p>
            </div>
        </>
    );
};

export default Footer;
