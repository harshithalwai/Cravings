import { createContext, useEffect, useState } from "react";
import axios from 'axios';
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItem, setCartItem] = useState({});
  const BACKEND_URL = "http://localhost:4000"
  const [token, setToken] = useState("")
  const [food_list, setFoodList] = useState([])
  const fetchData = async () => {
    const responce = await axios.get(`${BACKEND_URL}/food/list`)
    setFoodList(responce.data.foods);
  }
  useEffect(() => {
    (async () => {
      await fetchData()
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"))
      }
    })()
  }, [])

  const addToCart = (itemId) => {
    if (!cartItem[itemId]) {
      setCartItem((prev) => ({
        ...prev,
        [itemId]: 1
      }))
    }
    else {
      setCartItem((prev) => ({
        ...prev,
        [itemId]: prev[itemId] + 1
      }))
    }
  }

  const removeCartItem = (itemId) => {
    setCartItem((prev) => ({
      ...prev,
      [itemId]: prev[itemId] - 1
    }))
  }


  const getCartTotal = () => {
    let total = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        const foodItem = food_list.find((food) => food._id === item);
        total += foodItem.price * cartItem[item];
      }
    }
    return total;
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
