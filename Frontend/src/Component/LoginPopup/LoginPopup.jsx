import React, { useState, useContext } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/storeContext";
import axios from "axios";
import { toast } from 'react-toastify';

const LoginPopup = ({ setShowLogin }) => {
  const { BACKEND_URL, token, setToken } = useContext(StoreContext);
  const [currentState, setCurrentState] = useState("Sign Up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const handelChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    const newURL = currentState === "Sign Up" ? `${BACKEND_URL}/user/register` : `${BACKEND_URL}/user/login`;
    const responce = await axios.post(newURL, data);

    if (responce.data.success) {
      setToken(responce.data.token);
      localStorage.setItem("token", responce.data.token);
      setShowLogin(false);
      toast.success(responce.data.message);
    }
    else {
      toast.error(responce.data.message);
    }
  }
  return (
    <>
      <div className="login-popup" onClick={() => setShowLogin(false)}>
        <form onSubmit={submitHandler} onClick={(e) => e.stopPropagation()} className="login-popup-container">
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
                value={data.name}
                onChange={handelChange}
                type="text"
                placeholder="Name"
                name="name"
                id="name"
                required
              />
            )}

            <input
              value={data.email}
              onChange={handelChange}
              type="email"
              placeholder="E-Mail"
              name="email"
              id="email"
              required
            />
            <input
              value={data.password}
              onChange={handelChange}
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              required
            />
          </div>

          <button type="submit">
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
