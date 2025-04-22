import React, { useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/frontend_assets/assets";

const FoodItem = ({ food }) => {
  const [foodCount, setFoodCount] = useState(0);
  return (
    <>
      <div className="food-item" id="food-item">
        <div className="food-item-img-cont">
          <img src={food.image} alt={food.name} />

          {!foodCount ? (
            <img
              className="food-item-add"
              onClick={() => {
                setFoodCount((prev) => prev + 1);
              }}
              src={assets.add_icon_white}
              alt="Add Item"
            />
          ) : (
            <div className="food-item-counter">
              <img
                onClick={() => {
                  setFoodCount((prev) => prev - 1);
                }}
                src={assets.remove_icon_red}
                alt="remove item"
              />
              {foodCount}
              <img
                onClick={() => {
                  setFoodCount((prev) => prev + 1);
                }}
                src={assets.add_icon_green}
                alt="Increase item"
              />
            </div>
          )}
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
          </div>
        </div>
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
