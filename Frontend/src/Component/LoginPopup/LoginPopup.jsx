import React, { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/frontend_assets/assets";
const LoginPopup = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("Sign Up");
  return (
    <>
      <div className="login-popup">
        <form action="#" className="login-popup-container">
          <div className="login-popup-title">
            <h2>{currentState}</h2>
            <img
              src={assets.cross_icon}
              onClick={() => {
                setShowLogin(false);
              }}
              alt="Close"
            />
          </div>

          <div className="login-popup-input">
            {currentState === "Sign Up" && (
              <input
                type="text"
                placeholder="Name"
                name="name"
                id="name"
                required
              />
            )}

            <input
              type="email"
              placeholder="E-Mail"
              name="email"
              id="email"
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              required
            />
          </div>

          <button>
            {currentState === "Sign Up" ? "Create Account" : "Login"}
          </button>

          <div className="login-popup-condition">
            <input type="checkbox" name="terms" id="terms" required />
            <label htmlFor="terms">
              By continuing, i agree to the terms of use & privacy policy.
            </label>
          </div>

          {currentState === "Sign Up" ? (
            <p>
              Already have an account ?{" "}
              <span
                onClick={() => {
                  setCurrentState("Login");
                }}
              >
                Click here
              </span>
            </p>
          ) : (
            <p>
              Create a new account ?{" "}
              <span
                onClick={() => {
                  setCurrentState("Sign Up");
                }}
              >
                Click here
              </span>
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default LoginPopup;
