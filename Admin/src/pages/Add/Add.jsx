import React, { useState,useEffect } from "react";
import "./Add.css";
import { assets } from "../../assets/admin_assets/assets.js";
import { toast } from "react-toastify";
import axios from "axios";
const Add = () => {
  const BACKEND_URL = import.meta.env.URL || "http://localhost:4000";
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "Food provides essential nutrients for overall health and well-being",
    category: "",
    price: "",
  });
  const handelChange = (e) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }
  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.warning("Please upload an image");
      return;
    }
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", parseFloat(data.price));
    formData.append("image", image);
    formData.append("category", data.category);

    const responce = await axios.post(`${BACKEND_URL}/food/add/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (responce.data.success) {
      setData({
        name: "",
        description: "Food provides essential nutrients for overall health and well-being",
        category: "",
        price: "",
      })
      setImage(false);
      toast.success(responce.data.message);
    } else {
      toast.error(responce.data.message);
    }

  }
    useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
        e.preventDefault()
        handelSubmit(e);
      }
    }

    document.addEventListener("keydown", handleKey);
    return ()=>{
      document.removeEventListener("keydown", handleKey);
    }
  })
  return (
    <>
      <div className="add">
        <h1>Admin Panel</h1>
        <form className="flex-col" onSubmit={handelSubmit}>
          <div className="add-img-upload flex-col">
            <p>Upload Image</p>
            <label htmlFor="image">
              <img
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt="Upload"
              />
            </label>
            <input
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              name="image"
              type="file"
              id="image"
              accept="image/*"
              hidden
            />
          </div>
          <div className="add-product-name flex-col">
            <label htmlFor="product-name">Product Name</label>
            <input
              onChange={handelChange}
              value={data.name}
              name="name"
              type="text"
              id="product-name"
              placeholder="Product name"
              required
            />
          </div>
          <div className="add-product-description flex-col">
            <label htmlFor="product-desc">Product Description</label>
            <textarea
              onChange={handelChange}
              value={data.description}
              name="description"
              id="product-desc"
              placeholder="Write content here.."
              rows={6}
              required
            ></textarea>
          </div>
          <div className="add-category-price">
            <div className="add-category flex-col">
              <label htmlFor="category">Product category</label>
              <select
                onChange={handelChange}
                name="category"
                id="category"
                value={data.category}
                required
              >
                <option value="">Select the category</option>
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
              </select>
            </div>
            <div className="add-price flex-col">
              <label htmlFor="price">Product Price</label>
              <input
                onChange={handelChange}
                value={data.price}
                name="price"
                type="number"
                id="price"
                placeholder="₹ Price"
                required
              />
            </div>
          </div>
          <button type="submit" className="add-btn">
            Add
          </button>
        </form>
      </div>
    </>
  );
};

export default Add;
