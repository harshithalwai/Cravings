import { createContext, useState } from "react";
import { food_list } from "../assets/frontend_assets/assets";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

  const [cartItem, setCartItem] = useState({});
  const BACKEND_URL="http://localhost:4000"

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
    BACKEND_URL
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
