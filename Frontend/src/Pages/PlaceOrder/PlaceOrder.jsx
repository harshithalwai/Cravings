import React, { useContext, useEffect, useRef, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/storeContext.jsx";
import { toast } from "react-toastify";
import axios from "axios";
const PlaceOrder = () => {
  const { getCartTotal, food_list, cartItem,BACKEND_URL,token } = useContext(StoreContext);
  const formRef = useRef(); // ✅ form ref

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const placeOrder = async (e) => {
    e.preventDefault(); // ✅ prevent actual form submission

    let orderItem = [];
    food_list.forEach((item) => {
      if (cartItem[item._id] > 0) {
        orderItem.push({
          ...item,
          quantity: cartItem[item._id],
        });
      }
    });
    const orderData = {
      address: data,
      items: orderItem,
      amount: getCartTotal() + 30
    }
    let responce=await axios.post(`${BACKEND_URL}/order/place`,{orderData},{headers:{token}})
    if (responce.data.success) {
      const {session_url}=responce.data
      window.location.replace(session_url)
    }else{
      toast("Something went wrong");
    }
  };

  const handleButtonClick = () => {
    formRef.current?.requestSubmit(); // ✅ trigger form submission with validation
  };

  return (
    <>
      <div className="placeorder">
        <div className="placeOrder-left">
          <h1>Delivery Information</h1>
          <form ref={formRef} className="order-details" onSubmit={placeOrder}>
            <div className="names inp">
              <input
                type="text"
                name="firstName"
                value={data.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
              />
              <input
                type="text"
                name="lastName"
                value={data.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
              />
            </div>
            <div className="inp email">
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="E-Mail"
                required
              />
            </div>
            <div className="inp street">
              <input
                type="text"
                name="street"
                value={data.street}
                onChange={handleChange}
                placeholder="Street"
                required
              />
            </div>
            <div className="city-state inp">
              <input
                type="text"
                name="city"
                value={data.city}
                onChange={handleChange}
                placeholder="City"
                required
              />
              <input
                type="text"
                name="state"
                value={data.state}
                onChange={handleChange}
                placeholder="State"
                required
              />
            </div>
            <div className="zip-country inp">
              <input
                type="number"
                name="zip"
                value={data.zip}
                onChange={handleChange}
                placeholder="Zip Code"
                required
              />
              <input
                type="text"
                name="country"
                value={data.country}
                onChange={handleChange}
                placeholder="Country"
                required
              />
            </div>
            <div className="phone inp">
              <input
                type="tel"
                name="phone"
                value={data.phone}
                onChange={handleChange}
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
                <p>&#8377; {getCartTotal() + 30}</p>
              </div>

              {/* ✅ Keep button outside form, but trigger validation */}
              <button className="PaymentBtn" onClick={handleButtonClick}>
                PROCEED TO PAYMENT
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
