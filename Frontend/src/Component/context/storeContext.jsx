import { createContext } from "react";
import { food_list } from "../../assets/frontend_assets/assets.js"

export const storeContext = createContext(null);

const StoreContextProvider = (props) => {
    // Add your context values here
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
