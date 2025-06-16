
// 2. FIXED storeContext.jsx - Added error handling and null checks
import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItem, setCartItem] = useState({});
  const BACKEND_URL = "https://cravings-backend.vercel.app/"
  const [token, setToken] = useState("")
  const [food_list, setFoodList] = useState([])

  const loadCart = async (token) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/cart/items`, {}, { 
        headers: { token } 
      })
      if (response.data && response.data.cartData) {
        setCartItem(response.data.cartData)
      }
    } catch (error) {
      console.error("Error loading cart:", error)
      setCartItem({})
    }
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/food/list`)
      if (response.data && response.data.foods) {
        setFoodList(response.data.foods);
      }
    } catch (error) {
      console.error("Error fetching food data:", error)
      setFoodList([])
    }
  }

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const tokenFromStorage = localStorage.getItem("token");
        await fetchData()
        
        if (tokenFromStorage) {
          setToken(tokenFromStorage);
          await loadCart(tokenFromStorage);
        } else {
          setCartItem({});
          setToken("");
        }
      } catch (error) {
        console.error("Error initializing app:", error)
      }
    }
    
    initializeApp()
  }, []) // Removed token dependency to prevent infinite loop

  const addToCart = async (itemId) => {
    try {
      if (!cartItem[itemId]) {
        setCartItem((prev) => ({
          ...prev,
          [itemId]: 1
        }))
      } else {
        setCartItem((prev) => ({
          ...prev,
          [itemId]: prev[itemId] + 1
        }))
      }
      
      if (token) {
        await axios.post(`${BACKEND_URL}/cart/add`, { itemId }, { 
          headers: { token } 
        })
      }
    } catch (error) {
      console.error("Error adding to cart:", error)
    }
  }

  const removeCartItem = async (itemId) => {
    try {
      setCartItem((prev) => ({
        ...prev,
        [itemId]: Math.max(0, prev[itemId] - 1) // Prevent negative values
      }))
      
      if (token) {
        await axios.post(`${BACKEND_URL}/cart/remove`, { itemId }, { 
          headers: { token } 
        })
      }
    } catch (error) {
      console.error("Error removing from cart:", error)
    }
  }

  const getCartTotal = () => {
    try {
      let total = 0;
      for (const item in cartItem) {
        if (cartItem[item] > 0) {
          const foodItem = food_list.find((food) => food._id === item);
          if (foodItem && foodItem.price) {
            total += foodItem.price * cartItem[item];
          }
        }
      }
      return total;
    } catch (error) {
      console.error("Error calculating cart total:", error)
      return 0;
    }
  }

  const contextValue = {
    getCartTotal,
    food_list,
    cartItem,
    setCartItem,
    addToCart,
    removeCartItem,
    BACKEND_URL,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;