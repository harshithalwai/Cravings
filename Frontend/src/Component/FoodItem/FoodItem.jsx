import React from "react";
import "./FoodItem.css";
import { assets } from "../../assets/frontend_assets/assets";

const FoodItem = ({ food }) => {
  return (
    <>
      <div className="food-item" id="food-item">
        <div className="food-item-img-cont">
          <img src={food.image} alt={food.name} />
        </div>
        <div className="food-item-info">
          <div className="food-item-name-rating">
            <h3>{food.name}</h3>
            <img src={assets.rating_stars} alt="Stars" />
          </div>
          <div className="food-item-description">
            <p>{food.description}</p>
          </div>
          <div className="food-item-price">
            <p>₹ {food.price}</p>
          </div></div>
      </div>
    </>
  );
};

export default FoodItem;
//     {
//         _id: "1",
//         name: "Greek salad",
//         image: food_1,
//         price: 12,
//         description: "Food provides essential nutrients for overall health and well-being",
//         category: "Salad"
//     },
