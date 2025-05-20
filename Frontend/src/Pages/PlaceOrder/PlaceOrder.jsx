import React, { useContext } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/storeContext.jsx";
const PlaceOrder = () => {
  const { getCartTotal } = useContext(StoreContext);
  return (
    <>
      <div className="placeorder">
        <div className="placeOrder-left">
          <h1>Delivery Information</h1>
          <form className="order-details">
            <div className="names inp">
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
                required
              />
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                required
              />
            </div>
            <div className="inp email">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="E-Mail"
                required
              />
            </div>
            <div className="inp street">
              <input
                type="text"
                name="street"
                id="street"
                placeholder="Street"
                required
              />
            </div>
            <div className="city-state inp">
              <input
                type="text"
                name="city"
                id="city"
                placeholder="City"
                required
              />
              <input
                type="text"
                name="state"
                id="state"
                placeholder="State"
                required
              />
            </div>
            <div className="zip-country inp">
              <input
                type="number"
                name="zip"
                id="zip"
                placeholder="Zip Code"
                required
              />
              <input
                type="text"
                name="country"
                id="country"
                placeholder="Country"
                required
              />
            </div>
            <div className="telephone inp">
              <input
                type="tel"
                name="teliphone"
                id="telephone"
                placeholder="Phone"
                required
              />
            </div>
          </form>
        </div>
        <div className="placeOrder-right">
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
              <button className="PaymentBtn">PROCEED TO PAYMENT</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
