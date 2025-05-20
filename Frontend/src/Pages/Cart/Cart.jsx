import React, { useContext, useEffect } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/storeContext.jsx";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItem, food_list, removeCartItem, getCartTotal } = useContext(StoreContext);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const hasItems = Object.values(cartItem).some((qty) => qty > 0);
  if (!hasItems) {
    navigate("/");
  }

  return (
    <>
      <div className="cart">
        <div className="cart-items">
          <div className="cart-items-title">
            <p>Item</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total </p>
            <p>Remove</p>
          </div>
          <hr />
          {food_list.map((food) => {
            if (cartItem[food._id]) {
              return (
                <div className="cart-items-title cart-item" key={food._id}>
                  <img src={food.image} alt={food.name} />
                  <p>{food.name}</p>
                  <p>&#8377; {food.price}</p>
                  <p>{cartItem[food._id]}</p>
                  <p>&#8377; {getCartTotal()}</p>
                  <span
                    onClick={() => removeCartItem(food._id)}
                    className="removeBtn"
                  >
                    X
                  </span>
                </div>
              );
            }
          })}
        </div>
        <div className="cart-bottom">
          <div className="cart-total">
            <h1>Cart Total </h1>
            <div className="cart-total-details">
              <div className="details">
                <p>Subtotal</p>
                <p>&#8377; {getCartTotal()}</p>
              </div>
              <div className="details">
                <p>Delivery fee</p>
                <p>&#8377; 30</p>
              </div>
              <div className="total">
                <h4>Total</h4>
                <p>&#8377;
                  {getCartTotal() + 30}
                </p>
              </div>
              <button
                onClick={() => {
                  navigate("/order");
                }}
                className="checkoutBtn"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
          <div className="cart-promo-code">
            <span>If You have a PROMO CODE , Enter Here </span>
            <div className="promo-inp-submit">
              <input
                type="text"
                name="promo"
                id="promo"
                placeholder="Your Promo Code "
              />
              <button className="promo-submit-btn">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
