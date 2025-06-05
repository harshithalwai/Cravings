import React, { useState, useEffect } from "react";
import { assets } from "../../assets/admin_assets/assets.js";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
const Edit = () => {
    const navigate = useNavigate();
    //using the useLocation hook to get the state passed from the List component
    const location = useLocation();
    const item = location.state.item;

    //setting the initial state of the image and data
    useEffect(() => {
        setImage(item.image);
        setData({
            name: item.name,
            description: item.description,
            category: item.category,
            price: item.price,
        });
    }, [item]);
   useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
        e.preventDefault()
        submitEditHandel(e);
      }
    }

    document.addEventListener("keydown", handleKey);
    return ()=>{
      document.removeEventListener("keydown", handleKey);
    }
  })
    //backend URL
    const BACKEND_URL = import.meta.env.URL || "http://localhost:4000";
    //state for image and data
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
    const submitEditHandel = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", image);
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("category", data.category);
        formData.append("price", data.price);
        const responce = await axios.patch(`${BACKEND_URL}/food/edit/${item._id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        if (responce.data.success) {
            toast.success(responce.data.message);
            navigate("/list");
        } else {
            toast.error(responce.data.message);
        }
    }
    return (
        <>
            <div className="add">
                <h1>Edit Panel</h1>
                <form className="flex-col" onSubmit={submitEditHandel}>
                    <div className="add-img-upload flex-col">
                        <p>Upload Image</p>
                        <label htmlFor="image">
                            <img
                                src={
                                    image
                                        ? typeof image === "string"
                                            ? `${BACKEND_URL}/images/${image}`
                                            : URL.createObjectURL(image)
                                        : assets.upload_area
                                }
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
                        Edit
                    </button>
                </form>
            </div>
        </>
    )
}

export default Edit
