import React, { useContext } from "react";
import { StoreContext } from "../../context/storeContext";
import FoodItem from "../FoodItem/FoodItem";
import "./FoodDisplay.css";
const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext);
    return (
        <div className="food-display" id="food-display">
            <h2>Top dishes near you</h2>
            <div className="food-display-list">
                {food_list.map((food, idx) => {
                    if (food.category === category || category === "All") {
                        return <FoodItem key={idx} food={food} />;
                    }
                })}
            </div>
        </div>
    );
};

export default FoodDisplay;
