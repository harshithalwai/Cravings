import React from "react";
import "./Sidebar.css";
import { assets } from "../../assets/admin_assets/assets.js";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.URL || "https://cravings-backend.vercel.app/";
  const removeAll = async () => {
    axios.delete(`${BACKEND_URL}/food/removeAll`)
      .then((res) => {
        if (res.data.success) {
          toast.dark(res.data.message);
        } else {
          toast.error("Error removing all items");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error removing all items");
      });
      navigate("/add")
  }
  return (
    <>
      <div className="sidebar">
        <div className="sidebar-options">
          <NavLink to="/add" className="sidebar-option">
            <img src={assets.add_icon} alt="" />
            <p>Add item</p>
          </NavLink>
          <NavLink to="/list" className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>List items</p>
          </NavLink>
         
          <div className="sidebar-option" onClick={removeAll}>
            <img src={assets.remove_image} className="remove_img" alt="" />
            <p>Remove All</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
