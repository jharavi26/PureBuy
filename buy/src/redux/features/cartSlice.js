import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  cartItems: [], // Array to store cart products
  // totalQuantity: 0,
  totalPrice: 0,
};

// Cart slice
const cartSlice = createSlice({
  name: "cartslice",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const ItemIndex = state.cartItems.findIndex((item)=> item.id === action.payload.id);
      if(ItemIndex >=0 )
      {
        state.cartItems[ItemIndex].qty += 1
      }

      else{
        const temp = {...action.payload , qty :1}
        state.cartItems.push(temp);
      }

      state.totalPrice = state.cartItems.reduce((total, item) => total + item.price * item.qty, 0);
    },

    updateQuantity: (state, action) => {
      const { id, qty } = action.payload;
      const item = state.cartItems.find((product) => product.id === id);

      if (item) {
        item.qty = qty; // Update quantity
      }

      state.totalPrice = state.cartItems.reduce((total, item) => total + item.price * item.qty, 0);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.id);

      state.totalPrice = state.cartItems.reduce((total, item) => total + item.price * item.qty, 0);
    },
    
  },
});

    
   

// Export actions
export const { addToCart , updateQuantity , removeFromCart} = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
