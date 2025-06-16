
// 4. FIXED PlaceOrder.jsx - Better error handling and form validation
import React, { useContext, useEffect, useRef, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/storeContext.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { getCartTotal, food_list, cartItem, BACKEND_URL, token } = useContext(StoreContext);
  const formRef = useRef();

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

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    // Redirect if no items in cart
    const hasItems = Object.values(cartItem).some((qty) => qty > 0);
    if (!hasItems) {
      navigate("/cart");
    }
    
    // Redirect if not logged in
    if (!token) {
      toast.error("Please login to place an order");
      navigate("/");
    }
  }, [cartItem, token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    
    if (loading) return;
    setLoading(true);

    try {
      let orderItem = [];
      food_list.forEach((item) => {
        if (cartItem[item._id] > 0) {
          orderItem.push({
            ...item,
            quantity: cartItem[item._id],
          });
        }
      });

      if (orderItem.length === 0) {
        toast.error("No items in cart");
        navigate("/cart");
        return;
      }

      const orderData = {
        address: data,
        items: orderItem,
        amount: getCartTotal() + 30
      }

      const response = await axios.post(
        `${BACKEND_URL}/order/place`,
        { orderData },
        { headers: { token } }
      );

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    formRef.current?.requestSubmit();
  };

  return (
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
          <h1>Cart Total</h1>
          <div className="cart-total-details">
            <div className="details">
              <p>Subtotal</p>
              <p>₹ {getCartTotal()}</p>
            </div>
            <div className="details">
              <p>Delivery fee</p>
              <p>₹ 30</p>
            </div>
            <div className="total">
              <h4>Total</h4>
              <p>₹ {getCartTotal() + 30}</p>
            </div>
            <button 
              className="PaymentBtn" 
              onClick={handleButtonClick}
              disabled={loading}
            >
              {loading ? "PROCESSING..." : "PROCEED TO PAYMENT"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;