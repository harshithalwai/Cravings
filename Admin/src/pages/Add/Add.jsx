import React,{useState} from "react";
import "./Add.css";
import { assets } from "../../assets/admin_assets/assets.js";
const Add = () => {
  const [Image, setImage] = useState(false);
  return (
    <>
      <div className="add">
        <h1>Admin Panel</h1>
        <form className="flex-col">
          <div className="add-img-upload flex-col">
            <p>Upload Image</p>
            <label htmlFor="image">
              <img src={assets.upload_area} alt="Upload" />
            </label>
            <input
              onChange={(e) => {
                console.log(e);

              }}
              name="image"
              type="file"
              id="image"
              accept="image/*"
              hidden
              required
            />
          </div>
          <div className="add-product-name flex-col">
            <label htmlFor="product-name">Product Name</label>
            <input
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
              <select name="category" id="category" required>
                <option value="">Select the category</option>
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodels">Noodels</option>
              </select>
            </div>
            <div className="add-price flex-col">
              <label htmlFor="price">Product Price</label>
              <input
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
