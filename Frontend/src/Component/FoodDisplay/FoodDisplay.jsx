import React, { useContext } from 'react'
import "./FoodDisplay.css"
import { storeContext } from "../context/storeContext.jsx"
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category, setCategory }) => {

    const { food_list } = useContext(storeContext);

    return (
        <div className="food-display" id="food-display">
            <h2>Top dishes near you</h2>
            <div className="food-display-list" id="food-display-list">
                {
                    food_list.map((food, index) => {
                        return <FoodItem key={index} food={food} />
                    })
                }
            </div>
        </div>
    )
}

export default FoodDisplay
