import React, { useContext, useState } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import "./FoodItem.css";
import { StoreContext } from "../../context/storeContext";
const FoodItem = ({ food }) => {
    const { cartItem, addToCart, removeCartItem,BACKEND_URL } = useContext(StoreContext)
    return (
        <>
            <div className="food-item">
                <div className="food-item-img-container">
                    <img src={`${BACKEND_URL}/images/${food.image}`} alt="" className="food-item-img" />
                    {!cartItem[food._id] ? (
                        <img
                            className="add"
                            onClick={() => {
                                addToCart(food._id)
                            }}
                            src={assets.add_icon_white}
                            alt="Add"
                        />
                    ) : (
                        <div className="food-item-counter">
                            <img
                                onClick={() => {
                                    removeCartItem(food._id)
                                }}
                                src={assets.remove_icon_red}
                                alt=""
                            />
                            <p>{cartItem[food._id]}</p>
                            <img
                                onClick={() => {
                                    addToCart(food._id)
                                }}
                                src={assets.add_icon_green}
                                alt=""
                            />
                        </div>
                    )}
                </div>
                <div className="food-item-info">
                    <div className="food-item-name-rating">
                        <p>{food.name}</p>
                        <img src={assets.rating_stars} alt="" />
                    </div>
                    <p className="food-item-desc">{food.description}</p>
                    <p className="food-item-price">&#8377; {food.price}</p>
                </div>
            </div>
        </>
    );
};

export default FoodItem;
