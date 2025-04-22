import { createContext, useState } from "react";
import { food_list } from "../../assets/frontend_assets/assets.js"

export const storeContext = createContext(null);

const StoreContextProvider = (props) => {
    // Add your context values here
    const [cartItems, setCartItems] = useState({});

    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems(() => {
                cartItems[itemId] = 1
            })
        } else {
            setCartItems((prev) => ({
                ...prev, [itemId]: [itemId] + 1
            }))
        }
    }

    const contextValue = {
        food_list
    }

    return (
        <storeContext.Provider value={contextValue}>
            {props.children}
        </storeContext.Provider>
    )
}

export default StoreContextProvider;
