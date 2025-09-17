import { createContext } from "react";


export const ShopContext = createContext();

const ShopContextProvider = () => {
    const value = {

    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;