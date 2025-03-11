import { createContext , useContext , useReducer} from "react";
import { cartReducer } from "./Reducer";

const Cart = createContext();

function ContextProvider({children}) {
  const initialState = {
    cart: []
  };


  const [state, dispatch] = useReducer(cartReducer, initialState);


  return (
    <Cart.Provider value={{ state, dispatch }}>
    {children}
  </Cart.Provider>
  )
}

export default ContextProvider


export const useCart = () => {
  return useContext(Cart);
};




