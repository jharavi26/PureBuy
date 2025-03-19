import { createSlice } from "@reduxjs/toolkit";


const loadCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : []; // Return parsed cart if available
};

// Function to save cart to localStorage
const saveCartToLocalStorage = (cartItems) => {
  localStorage.setItem("cart", JSON.stringify(cartItems));
};

const initialState = {
  cartItems: loadCartFromLocalStorage(),
  totalPrice: 0, // Load cart on startup
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

      saveCartToLocalStorage(state.cartItems); 

      state.totalPrice = state.cartItems.reduce((total, item) => total + item.price * item.qty, 0);
    },

    updateQuantity: (state, action) => {
      const { id, qty } = action.payload;
      const item = state.cartItems.find((product) => product.id === id);

      if (item) {
        item.qty = qty; // Update quantity
      }

      saveCartToLocalStorage(state.cartItems); 

      state.totalPrice = state.cartItems.reduce((total, item) => total + item.price * item.qty, 0);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.id);

      state.totalPrice = state.cartItems.reduce((total, item) => total + item.price * item.qty, 0);

      saveCartToLocalStorage(state.cartItems); 
    },

  emptyCart:(state,action)=>{
    state.cartItems = [];
    localStorage.removeItem("cart");  
} , 

removeSingleItem: (state, action) => {
  const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload);

  if (itemIndex !== -1) {
    if (state.cartItems[itemIndex].qty > 1) {
      state.cartItems[itemIndex].qty -= 1;
    } else {
      state.cartItems.splice(itemIndex, 1); // Remove item if qty reaches 0
    }
  }

  
  saveCartToLocalStorage(state.cartItems); 
},

    
  },
});
 

// Export actions
export const { addToCart , updateQuantity , removeFromCart , emptyCart , removeSingleItem} = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
